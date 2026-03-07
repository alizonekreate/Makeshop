import { Link, useNavigate } from "react-router-dom";
import { useStore } from "../context/storeContext";
import { formatCurrency } from "../utils/format";
import QuantityStepper from "../components/QuantityStepper";
import EmptyState from "../components/EmptyState";

export default function Cart() {
  const { state, dispatch } = useStore();
  const navigate = useNavigate();

  // Derived totals
  const subtotal = state.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 0 ? 7.99 : 0; 
  const total = subtotal + shipping;

  if (state.cart.length === 0) {
    return (
      <div className="container page">
        <EmptyState
          title="Your cart is empty"
          text="Add something you love 🩷"
        />
      </div>
    );
  }

  return (
    <div className="container page">
      <h1>Cart</h1>

      <div className="cart">
        <div className="cart__items">
          {state.cart.map((item) => (
            <div key={item.id} className="cartItem">
              <img className="cartItem__img" src={item.image} alt={item.title} />

              <div className="cartItem__info">
                <p className="cartItem__title">{item.title}</p>
                <p className="muted">{formatCurrency(item.price)}</p>

                <div className="cartItem__actions">
                  <QuantityStepper
                    value={item.quantity}
                    onDecrease={() =>
                      dispatch({
                        type: "CART_SET_QTY",
                        payload: { id: item.id, quantity: item.quantity - 1 },
                      })
                    }
                    onIncrease={() =>
                      dispatch({
                        type: "CART_SET_QTY",
                        payload: { id: item.id, quantity: item.quantity + 1 },
                      })
                    }
                  />

                  <button
                    className="link danger"
                    onClick={() => dispatch({ type: "CART_REMOVE", payload: item.id })}
                  >
                    Remove
                  </button>
                </div>
              </div>

              <div className="cartItem__right">
                <p className="price">
                  {formatCurrency(item.price * item.quantity)}
                </p>
              </div>
            </div>
          ))}
        </div>

        <aside className="cart__summary">
          <h2>Summary</h2>

          <div className="row">
            <span className="muted">Subtotal</span>
            <span>{formatCurrency(subtotal)}</span>
          </div>

          <div className="row">
            <span className="muted">Shipping</span>
            <span>{formatCurrency(shipping)}</span>
          </div>

          <div className="row row--total">
            <span>Total</span>
            <span>{formatCurrency(total)}</span>
          </div>

          <button className="btn btn--primary" onClick={() => navigate("/checkout")}>
            Checkout
          </button>

          <Link className="btn btn--ghost" to="/">
            Continue shopping
          </Link>

          <button className="btn btn--danger" onClick={() => dispatch({ type: "CART_CLEAR" })}>
            Clear cart
          </button>
        </aside>
      </div>
    </div>
  );
}