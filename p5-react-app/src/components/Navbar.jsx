import { Link, NavLink } from "react-router-dom";
import { useStore } from "../context/storeContext";

export default function Navbar() {
  const { state } = useStore();

  const totalItems = state.cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="nav">
      <div className="container nav__inner">
        <Link to="/" className="brand">
          Make<span className="brand__accent">Shop</span>
        </Link>

        <nav className="nav__links">
          <NavLink to="/" className={({ isActive }) => (isActive ? "active" : "")}>
            Shop
          </NavLink>

          <NavLink
            to="/cart"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Cart
            {totalItems > 0 && <span className="badge">{totalItems}</span>}
          </NavLink>
        </nav>
      </div>
    </header>
  );
}