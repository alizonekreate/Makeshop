import { useEffect, useMemo, useState } from "react";
import { fetchProducts } from "../api/productsApi";
import { useStore } from "../context/storeContext";
import ProductCard from "../components/ProductCard";
import Loader from "../components/Loader";

export default function Home() {
  const { state, dispatch } = useStore();
  const [query, setQuery] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        dispatch({ type: "PRODUCTS_LOADING" });
        const data = await fetchProducts();
        dispatch({ type: "PRODUCTS_SUCCESS", payload: data });
      } catch (err) {
        dispatch({ type: "PRODUCTS_ERROR", payload: err.message });
      }
    };

    if (state.productsStatus === "idle") load();
  }, [dispatch, state.productsStatus]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return state.products;

    return state.products.filter((p) =>
      `${p.title} ${p.category}`.toLowerCase().includes(q)
    );
  }, [query, state.products]);

  function handleAdd(product) {

    dispatch({
      type: "CART_ADD",
      payload: {
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
      },
    });
  }

  if (state.productsStatus === "loading") return <Loader label="Loading products..." />;

  if (state.productsStatus === "error")
    return (
      <div className="container page">
        <h1>Shop</h1>
        <p className="error">Error: {state.productsError}</p>
      </div>
    );

  return (
    <div className="container page">
      <div className="hero">
        <h1 className="hero__title">Shop Your Glow.</h1>
        <p className="muted">
        Browse our collection and discover your favorites.
        </p>

        <input
          className="input"
          placeholder="Search products..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      <div className="grid">
        {filtered.map((p) => (
          <ProductCard key={p.id} product={p} onAdd={handleAdd} />
        ))}
      </div>
    </div>
  );
}