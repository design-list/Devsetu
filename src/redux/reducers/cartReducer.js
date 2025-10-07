import { 
  CART_DATA_RESPONSE, CART_DATA_FAILED,
  CART_DETAILS_RESPONSE, CART_DETAILS_FAILED,
  ADD_NEW_CART_RESPONSE, ADD_NEW_CART_FAILED,
  UPDATE_CART_RESPONSE, UPDATE_CART_FAILED,
  DELETE_CART_RESPONSE, DELETE_CART_FAILED
} from "../types/cartTypes";

const initialState = {
  allCarts: null,
  cartDetail: null,
  addedCart: null,
  updatedCart: null,
  deletedCart: null,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {

    case CART_DATA_RESPONSE:
      return { ...state, allCarts: action.payload };
    case CART_DATA_FAILED:
      return { ...state, allCarts: action.payload };

    case CART_DETAILS_RESPONSE:
      return { ...state, cartDetail: action.payload };
    case CART_DETAILS_FAILED:
      return { ...state, cartDetail: action.payload };

    case ADD_NEW_CART_RESPONSE:
      return { ...state, addedCart: action.payload };
    case ADD_NEW_CART_FAILED:
      return { ...state, addedCart: action.payload };

    case UPDATE_CART_RESPONSE:
      return { ...state, updatedCart: action.payload };
    case UPDATE_CART_FAILED:
      return { ...state, updatedCart: action.payload };

    case DELETE_CART_RESPONSE:
      return { ...state, deletedCart: action.payload };
    case DELETE_CART_FAILED:
      return { ...state, deletedCart: action.payload };

    default:
      return state;
  }
}



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
