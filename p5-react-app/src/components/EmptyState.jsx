import { Link } from "react-router-dom";

export default function EmptyState({ title, text, ctaLabel = "Go shopping", to = "/" }) {
  return (
    <div className="center">
      <h2>{title}</h2>
      <p className="muted">{text}</p>
      <Link className="btn btn--ghost" to={to}>
        {ctaLabel}
      </Link>
    </div>
  );
}