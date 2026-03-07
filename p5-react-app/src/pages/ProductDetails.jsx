import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchProductById } from "../api/productsApi"; 
import { useStore } from "../context/storeContext";
import { formatCurrency } from "../utils/format";
import Loader from "../components/Loader";

export default function ProductDetails() {
  const { id } = useParams();
  const { dispatch } = useStore();
  const [status, setStatus] = useState("loading");
  const [product, setProduct] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) {
      setStatus("error");
      setError("Missing product ID in the URL.");
      return;
    }

    const load = async () => {
      try {
        setStatus("loading");
        setError("");

        const data = await fetchProductById(id);

        setProduct(data);
        setStatus("success");
      } catch (err) {
        setStatus("error");
        setError(err?.message || "Failed to load product.");
      }
    };

    load();
  }, [id]);

  if (status === "loading") return <Loader label="Loading product..." />;

  if (status === "error") {
    return (
      <div className="container page">
        <p className="error">{error}</p>
        <Link to="/" className="btn btn--ghost">
          Back to shop
        </Link>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container page">
        <p className="muted">Product not found.</p>
        <Link to="/" className="btn btn--ghost">
          Back to shop
        </Link>
      </div>
    );
  }

  function handleAdd() {
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

  return (
    <div className="container page">
      <Link to="/" className="link">← Back</Link>

      <div className="details">
        <div className="details__media">
          <img src={product.image} alt={product.title} />
        </div>

        <div className="details__info">
          <h1 className="details__title">{product.title}</h1>

          <div className="details__meta">
            <span className="price price--lg">{formatCurrency(product.price)}</span>
            <span className="chip">{product.category}</span>
          </div>

          <p className="muted">{product.description}</p>

          <button className="btn btn--primary" onClick={handleAdd}>
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
}