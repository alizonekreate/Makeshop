import { Link } from "react-router-dom";
import { formatCurrency } from "../utils/format";

export default function ProductCard({ product, onAdd }) {
  return (
    <div className="card">
      <Link to={`/product/${product.id}`} className="card__media">
        <img src={product.image} alt={product.title} loading="lazy" />
      </Link>

      <div className="card__body">
        <Link to={`/product/${product.id}`} className="card__title">
          {product.title}
        </Link>

        <div className="card__meta">
          <span className="price">{formatCurrency(product.price)}</span>
          <span className="chip">{product.category}</span>
        </div>

        <button className="btn" onClick={() => onAdd(product)}>
          Add to cart
        </button>
      </div>
    </div>
  );
}