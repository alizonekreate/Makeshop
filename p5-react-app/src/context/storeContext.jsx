import { createContext, useContext, useEffect, useMemo, useReducer } from "react";
import { initialState, storeReducer } from "../reducers/storeReducer";
import { loadCart, saveCart } from "../utils/storage";

const StoreContext = createContext(null);

export function StoreProvider({ children }) {
  const persistedCart = loadCart();

  const [state, dispatch] = useReducer(storeReducer, {
    ...initialState,
    cart: persistedCart ?? initialState.cart,
  });

  useEffect(() => {
    saveCart(state.cart);
  }, [state.cart]);

  const value = useMemo(() => ({ state, dispatch }), [state]);

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used inside StoreProvider");
  return ctx;
}