import { put } from 'redux-saga/effects';
import fetchApi from '../../services/fetchApi';
import { RESET_LOADER, START_LOADING } from '@/redux/types/loader';
import { 
  CART_DATA_RESPONSE, CART_DATA_FAILED,
  CART_DETAILS_RESPONSE, CART_DETAILS_FAILED,
  ADD_NEW_CART_RESPONSE, ADD_NEW_CART_FAILED,
  UPDATE_CART_RESPONSE, UPDATE_CART_FAILED,
} from '@/redux/types/cartTypes';

let api = new fetchApi();

// Fetch all carts
export function* fetchAllCartSaga({ payload, resolve }) {
  try {
    yield put({ type: START_LOADING, isLoading: true });
    let response = yield api.GetAllCart(payload);
    const { data, status } = response;

    if (status === 200) {
      yield put({ type: CART_DATA_RESPONSE, payload: data });
    } else {
      yield put({ type: CART_DATA_FAILED, payload: data });
    }

    resolve && resolve(response);
    yield put({ type: RESET_LOADER, isLoading: false });
  } catch (e) {
    yield put({ type: CART_DATA_FAILED, payload: e });
    yield put({ type: RESET_LOADER, isLoading: false })
  }
}

// Fetch single cart detail
export function* fetchCartDetailSaga({ payload, resolve }) {
  try {
    yield put({ type: START_LOADING, isLoading: true });
    let response = yield api.GetCartDetail(payload);
    const { data, status } = response;

    if (status === 200) {
      yield put({ type: CART_DETAILS_RESPONSE, payload: data });
    } else {
      yield put({ type: CART_DETAILS_FAILED, payload: data });
    }

    resolve && resolve(response);
    yield put({ type: RESET_LOADER, isLoading: false });
  } catch (e) {
    yield put({ type: CART_DETAILS_FAILED, payload: e });
    yield put({ type: RESET_LOADER, isLoading: false })
  }
}

// Add new cart
export function* addNewCartSaga({ payload, resolve }) {
  try {
    yield put({ type: START_LOADING, isLoading: true });
    let response = yield api.AddNewCart(payload);
    const { data, status } = response;

    if (status === 200) {
      yield put({ type: ADD_NEW_CART_RESPONSE, payload: data });
    } else {
      yield put({ type: ADD_NEW_CART_FAILED, payload: data });
    }

    resolve && resolve(response);
    yield put({ type: RESET_LOADER, isLoading: false });
  } catch (e) {
    yield put({ type: ADD_NEW_CART_FAILED, payload: e });
    yield put({ type: RESET_LOADER, isLoading: false })
  }
}

// Update cart
export function* updateCartSaga({ payload, resolve }) {
  try {
    yield put({ type: START_LOADING, isLoading: true });
    let response = yield api.UpdateCart(payload);
    const { data, status } = response;

    if (status === 200) {
      yield put({ type: UPDATE_CART_RESPONSE, payload: data });
    } else {
      yield put({ type: UPDATE_CART_FAILED, payload: data });
    }

    resolve && resolve(response);
    yield put({ type: RESET_LOADER, isLoading: false });
  } catch (e) {
    yield put({ type: UPDATE_CART_FAILED, payload: e });
    yield put({ type: RESET_LOADER, isLoading: false })
  }
}
