import {
  ADD_PACKAGE_REQUEST,
  ADD_OFFERING_REQUEST,
  UPDATE_OFFERING_COUNT_REQUEST,
  DELETE_CART_RESPONSE,
  DELETE_CART_FAILED,
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

    case DELETE_CART_RESPONSE:
    case DELETE_CART_FAILED:
      return { ...state, deletedCart: action.payload };

    default:
      return state;
  }
}


// Helper: calculate grand total
const calculateGrandTotal = (cart) => {
  const packageTotal = cart.package
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

// Helper: update cart and recalc grand_total
const updateCart = (state, updatedCart) => ({
  ...state,
  allCarts: {
    ...updatedCart,
    grand_total: calculateGrandTotal(updatedCart),
  },
});



// import { 
//   CART_DATA_RESPONSE, CART_DATA_FAILED,
//   CART_DETAILS_RESPONSE, CART_DETAILS_FAILED,
//   ADD_NEW_CART_RESPONSE, ADD_NEW_CART_FAILED,
//   UPDATE_CART_RESPONSE, UPDATE_CART_FAILED,
//   DELETE_CART_RESPONSE, DELETE_CART_FAILED,
// } from "../types/cartTypes";

// const initialState = {
//   allCarts: [],
//   cartDetail: null,
//   addedCart: null,
//   updatedCart: null,
//   deletedCart: null,
//   totalQuantity: 0,
//   totalPrice: 0,
// };

// export default function reducer(state = initialState, action) {
//   switch (action.type) {

//     // 🔹 Fetch all cart items
//     case CART_DATA_RESPONSE: {
//       const carts = action.payload || [];
//       const totalQuantity = carts.reduce((sum, item) => sum + (item.quantity || 0), 0);
//       const totalPrice = carts.reduce((sum, item) => sum + (item.quantity * item.price || 0), 0);
//       return { ...state, allCarts: carts, totalQuantity, totalPrice };
//     }

//     case CART_DATA_FAILED:
//       return { ...state, allCarts: [], totalQuantity: 0, totalPrice: 0 };

//     // 🔹 Get details of one cart (e.g., for checkout page)
//     case CART_DETAILS_RESPONSE:
//       return { ...state, cartDetail: action.payload };

//     case CART_DETAILS_FAILED:
//       return { ...state, cartDetail: null };

//     // 🔹 Add item to cart
//     case ADD_NEW_CART_RESPONSE: {
//       const newItem = action.payload;
//       const existingItem = state.allCarts.find(item => item.id === newItem.id);

//       let updatedCarts;
//       if (existingItem) {
//         updatedCarts = state.allCarts.map(item =>
//           item.id === newItem.id
//             ? { ...item, quantity: item.quantity + (newItem.quantity || 1) }
//             : item
//         );
//       } else {
//         updatedCarts = [...state.allCarts, { ...newItem, quantity: newItem.quantity || 1 }];
//       }

//       const totalQuantity = updatedCarts.reduce((sum, i) => sum + i.quantity, 0);
//       const totalPrice = updatedCarts.reduce((sum, i) => sum + i.quantity * i.price, 0);

//       return { 
//         ...state,
//         allCarts: updatedCarts,
//         addedCart: newItem,
//         totalQuantity,
//         totalPrice,
//       };
//     }

//     case ADD_NEW_CART_FAILED:
//       return { ...state, addedCart: action.payload };

//     // 🔹 Update item quantity or info
//     case UPDATE_CART_RESPONSE: {
//       const updatedItem = action.payload;
//       const updatedCarts = state.allCarts.map(item =>
//         item.id === updatedItem.id ? { ...item, ...updatedItem } : item
//       );

//       const totalQuantity = updatedCarts.reduce((sum, i) => sum + i.quantity, 0);
//       const totalPrice = updatedCarts.reduce((sum, i) => sum + i.quantity * i.price, 0);

//       return { 
//         ...state,
//         allCarts: updatedCarts,
//         updatedCart: updatedItem,
//         totalQuantity,
//         totalPrice,
//       };
//     }

//     case UPDATE_CART_FAILED:
//       return { ...state, updatedCart: action.payload };

//     // 🔹 Remove item from cart
//     case DELETE_CART_RESPONSE: {
//       const itemId = action.payload?.id;
//       const updatedCarts = state.allCarts.filter(item => item.id !== itemId);

//       const totalQuantity = updatedCarts.reduce((sum, i) => sum + i.quantity, 0);
//       const totalPrice = updatedCarts.reduce((sum, i) => sum + i.quantity * i.price, 0);

//       return { 
//         ...state,
//         allCarts: updatedCarts,
//         deletedCart: action.payload,
//         totalQuantity,
//         totalPrice,
//       };
//     }

//     case DELETE_CART_FAILED:
//       return { ...state, deletedCart: action.payload };

//     default:
//       return state;
//   }
// }
