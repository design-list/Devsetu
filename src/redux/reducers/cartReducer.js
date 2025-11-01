import {
  ADD_PACKAGE_REQUEST,
  ADD_OFFERING_REQUEST,
  UPDATE_OFFERING_COUNT_REQUEST,
  CLEAR_CART,
  REMOVE_FROM_CART_REQUEST,
  REMOVE_PACKAGE_REQUEST,
  CART_DETAILS_RESPONSE,
  CART_DETAILS_FAILED,
  ADD_PANDIT_DAKSHINA,
} from "../types/cartTypes";

const initialState = {
  allCarts: {
    store_id: "",
    package: null,
    add_ons: [],
    tip_amount: null,
    other_charges: {
      service_charge: 0,
      pandit_charge: 0,
      media_handling_charge: 0,
    },
    coupon_code: null,
    grand_total: 0,
  },
  cartDetails: null,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case ADD_PACKAGE_REQUEST: {
      const updatedCart = {
        ...state.allCarts,
        package: { ...action.payload, quantity: 1 },
      };
      return updateCart(state, updatedCart);
    }

    case REMOVE_PACKAGE_REQUEST: {
      const updatedCart = {
        ...state.allCarts,
        package: null,
      };
      return updateCart(state, updatedCart);
    }

    case ADD_OFFERING_REQUEST: {
      const existing = state.allCarts.add_ons.find(
        (item) => item.id === action.payload.id
      );

      const updatedAddOns = existing
        ? state.allCarts.add_ons.map((item) =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        : [...state.allCarts.add_ons, { ...action.payload, quantity: 1 }];

      return updateCart(state, { ...state.allCarts, add_ons: updatedAddOns });
    }

    case UPDATE_OFFERING_COUNT_REQUEST: {
      const { id, changeType } = action.payload;

      let updatedAddOns = state.allCarts.add_ons.map((item) => {
        if (item.id === id) {
          const newQty =
            changeType === "increment"
              ? item.quantity + 1
              : Math.max(item.quantity - 1, 0);
          return { ...item, quantity: newQty };
        }
        return item;
      });

      // Remove items with quantity 0
      updatedAddOns = updatedAddOns.filter((item) => item.quantity > 0);

      return updateCart(state, { ...state.allCarts, add_ons: updatedAddOns });
    }

    // ✅ Add Pandit Dakshina to Cart
    case ADD_PANDIT_DAKSHINA: {
      const updatedCart = {
        ...state.allCarts,
        other_charges: {
          ...state.allCarts.other_charges,
          pandit_charge: action.payload, // ← set pandit charge
        },
      };

      return updateCart(state, updatedCart);
    }

    case CART_DETAILS_RESPONSE:
      return {
        ...state,
        cartDetails: { ...action.payload },
      };

    case CART_DETAILS_FAILED:
      return {
        ...state,
        cartDetails: { ...action.payload },
      };

    case REMOVE_FROM_CART_REQUEST:
      return { ...state };

    case CLEAR_CART:
      return {
        ...state,
        allCarts: { ...initialState.allCarts },
      };

    default:
      return state;
  }
}

// 🧮 Helper: calculate grand total
const calculateGrandTotal = (cart) => {
  const packageTotal =
    cart.package && cart.package.type === "puja"
      ? cart.package.packagePrice * (cart.package.quantity || 1)
      : 0;

  const addOnsTotal = cart.add_ons.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0
  );

  const otherChargesTotal = Object.values(cart.other_charges || {}).reduce(
    (sum, charge) => sum + (charge || 0),
    0
  );

  const tip = cart.tip_amount || 0;

  return packageTotal + addOnsTotal + otherChargesTotal + tip;
};

// ♻️ Helper: update cart and recalc grand_total
const updateCart = (state, updatedCart) => ({
  ...state,
  allCarts: {
    ...updatedCart,
    grand_total: calculateGrandTotal(updatedCart),
  },
});
