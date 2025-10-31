import { 
  ADD_NEW_CART_REQUEST, 
  UPDATE_CART_REQUEST, 
  DELETE_CART_REQUEST, 
  CART_DATA_REQUEST, 
  CART_DETAILS_REQUEST, 
  ADD_PACKAGE_REQUEST,
  ADD_OFFERING_REQUEST,
  UPDATE_OFFERING_COUNT_REQUEST,
  REMOVE_PACKAGE_REQUEST,
  CLEAR_CART,
  ADD_PANDIT_DAKSHINA
} from "../types/cartTypes";

// Fetch all carts
export const requestCartDataAction = (data) => ({
  type: CART_DATA_REQUEST,
  payload: data
});

export const requestClearCartAction = () => ({
  type: CLEAR_CART,
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


// ✅ Add new package
export const addPackageAction = (data) => ({
  type: ADD_PACKAGE_REQUEST,
  payload: data,
});

export const removePackageAction = () => ({
  type: REMOVE_PACKAGE_REQUEST,
});

// ✅ Add new offering
export const addOfferingAction = (data) => ({
  type: ADD_OFFERING_REQUEST,
  payload: data,
});

// ✅ Add new offering
export const addPanditDakshinaAction = (data) => ({
  type: ADD_PANDIT_DAKSHINA,
  payload: data,
});

// ✅ Update offering count (+ / -)
export const updateOfferingCountAction = (id, changeType) => ({
  type: UPDATE_OFFERING_COUNT_REQUEST,
  payload: { id, changeType }, // changeType: "increment" | "decrement"
});