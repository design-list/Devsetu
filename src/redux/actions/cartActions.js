import { 
  ADD_NEW_CART_REQUEST, 
  UPDATE_CART_REQUEST, 
  DELETE_CART_REQUEST, 
  CART_DATA_REQUEST, 
  CART_DETAILS_REQUEST 
} from "../types/cartTypes";

// Fetch all carts
export const requestCartDataAction = (data) => ({
  type: CART_DATA_REQUEST,
  payload: data
});

// Fetch single cart by ID
export const fetchCartDetailAction = (data) => ({
  type: CART_DETAILS_REQUEST,
  payload: data
});

// Add new cart
export const addNewCartAction = (data) => ({
  type: ADD_NEW_CART_REQUEST,
  payload: data
});

// Update cart
export const updateCartAction = (data) => ({
  type: UPDATE_CART_REQUEST,
  payload: data
});

// Delete cart
export const deleteCartAction = (data) => ({
  type: DELETE_CART_REQUEST,
  payload: data
});
