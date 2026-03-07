const BASE_URL = "https://dummyjson.com";

function normalizeProduct(p) {
  return {
    id: p.id, 
    title: p.title,
    price: Number(p.price) || 0,
    category: p.category || "beauty",
    description: p.description || "",
    image: p.thumbnail || (Array.isArray(p.images) ? p.images[0] : ""),
  };
}

function normalizeLocalProduct(p) {
  return {
    id: p.id,
    title: p.title,
    price: Number(p.price) || 0,
    category: p.category || "makeup",
    description: p.description || "",
    image: p.image || "",
  };
}

export async function fetchProducts({
  category = "beauty",
  limit = 24,
  skip = 0,
  search = "",
  includeLocal = true, 
} = {}) {
  let url = "";

  if (search && search.trim().length > 0) {
    const q = encodeURIComponent(search.trim());
    url = `${BASE_URL}/products/search?q=${q}&limit=${limit}&skip=${skip}`;
  } else {
    url = `${BASE_URL}/products/category/${encodeURIComponent(
      category
    )}?limit=${limit}&skip=${skip}`;
  }

  const [dummyRes, localRes] = await Promise.allSettled([
    fetch(url),
    includeLocal ? fetch("/makeup.json") : Promise.resolve(null),
  ]);

  let dummyProducts = [];
  if (dummyRes.status === "fulfilled" && dummyRes.value?.ok) {
    const dummyData = await dummyRes.value.json();
    const products = Array.isArray(dummyData.products) ? dummyData.products : [];
    dummyProducts = products.map(normalizeProduct);
  } else {
    dummyProducts = [];
  }

  let localProducts = [];
  if (includeLocal && localRes.status === "fulfilled" && localRes.value?.ok) {
    const localData = await localRes.value.json();
    const items = Array.isArray(localData) ? localData : [];
    localProducts = items.map(normalizeLocalProduct);
  }

  const merged = [...localProducts, ...dummyProducts];

  const map = new Map();
  for (const p of merged) map.set(String(p.id), p);

  return Array.from(map.values());
}

export async function fetchProductById(id) {
  const strId = String(id);

  if (strId.startsWith("local-")) {
    const localRes = await fetch("/makeup.json");
    if (!localRes.ok) throw new Error("Failed to load local products.");
    const localData = await localRes.json();

    const match = (Array.isArray(localData) ? localData : []).find(
      (p) => String(p.id) === strId
    );

    if (!match) throw new Error("Local product not found.");
    return normalizeLocalProduct(match);
  }

  const res = await fetch(`${BASE_URL}/products/${strId}`);
  if (!res.ok) throw new Error("Failed to fetch product details.");

  const data = await res.json();
  return normalizeProduct(data);
}