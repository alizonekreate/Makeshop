export const initialState = {
  products: [],    
  productsStatus: "idle",
  productsError: null,   
  cart: [],              
};

export function storeReducer(state, action) {
  switch (action.type) {
    case "PRODUCTS_LOADING":
      return { ...state, productsStatus: "loading", productsError: null };

    case "PRODUCTS_SUCCESS":
      return { ...state, productsStatus: "success", products: action.payload };

    case "PRODUCTS_ERROR":
      return { ...state, productsStatus: "error", productsError: action.payload };

    case "CART_ADD": {
      const item = action.payload;

      const existing = state.cart.find((c) => c.id === item.id);

      if (existing) {
        const updated = state.cart.map((c) =>
          c.id === item.id ? { ...c, quantity: c.quantity + 1 } : c
        );
        return { ...state, cart: updated };
      }

      return { ...state, cart: [...state.cart, { ...item, quantity: 1 }] };
    }

    case "CART_REMOVE": {
      const id = action.payload;
      return { ...state, cart: state.cart.filter((c) => c.id !== id) };
    }

    case "CART_SET_QTY": {
      const { id, quantity } = action.payload;

      if (quantity <= 0) {
        return { ...state, cart: state.cart.filter((c) => c.id !== id) };
      }

      return {
        ...state,
        cart: state.cart.map((c) => (c.id === id ? { ...c, quantity } : c)),
      };
    }

    case "CART_CLEAR":
      return { ...state, cart: [] };

    default:
      return state;
  }
}