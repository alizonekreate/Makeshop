import { useState } from "react";
import { Link } from "react-router-dom";
import { useStore } from "../context/storeContext";
import EmptyState from "../components/EmptyState";

export default function Checkout() {
  const { state, dispatch } = useStore();
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [done, setDone] = useState(false);

  if (state.cart.length === 0 && !done) {
    return (
      <div className="container page">
        <EmptyState
          title="Nothing to checkout"
          text="Your cart is empty — add items first."
        />
      </div>
    );
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch({ type: "CART_CLEAR" });
    setDone(true);
  }

  if (done) {
    return (
      <div className="container page">
        <div className="center">
          <h1>Order placed ✅</h1>
          <p className="muted">
          Thanks, {name || "friend"}! Come back and shop with us again anytime! 🩷
          </p>
          <Link className="btn btn--primary" to="/">
            Back to shop
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container page">
      <h1>Checkout</h1>
      <p className="muted">Review your order and complete your purchase.</p>

      <form className="form" onSubmit={handleSubmit}>
        <label className="label">
          Full name
          <input
            className="input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g., Alison Kate"
            required
          />
        </label>

        <label className="label">
          Address
          <input
            className="input"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Street, City, Country"
            required
          />
        </label>

        <button className="btn btn--primary" type="submit">
          Place order
        </button>

        <Link className="btn btn--ghost" to="/cart">
          Back to cart
        </Link>
      </form>
    </div>
  );
}