import { put } from 'redux-saga/effects';
import fetchApi from '../../services/fetchApi';
import { RESET_LOADER, START_LOADING } from '@/redux/types/loader';
import { PAYMENT_OREDR_FAILED, PAYMENT_OREDR_RESPONSE, PAYMENT_OREDR_VERIFY_FAILED, PAYMENT_OREDR_VERIFY_RESPONSE } from '@/redux/types/paymentTypes';
let api = new fetchApi();

export function* paymentOrderSaga({ payload, resolve }) {
    try {
        yield put({ type: START_LOADING, isLoading: true })
        let response = yield api.PaymentOrder(payload);

        const {data, status} = response;

        if (status === 200) {
            yield put({ type: PAYMENT_OREDR_RESPONSE, payload: data })
            resolve && resolve(response)
            yield put({ type: RESET_LOADER, isLoading: false })
        }
        else {
            yield put({ type: PAYMENT_OREDR_FAILED, payload: data })
            resolve && resolve(response)
            yield put({ type: RESET_LOADER, isLoading: false })
        }
    } catch (e) {
        yield put({ type: PAYMENT_OREDR_FAILED, payload: e })
        yield put({ type: RESET_LOADER, isLoading: false })
    }
}


export function* paymentOrderVerifySaga({ payload, resolve }) {
    try {
        yield put({ type: START_LOADING, isLoading: true })
        let response = yield api.PaymentVerify(payload);

        const {data, status} = response;

        if (status === 200) {
            yield put({ type: PAYMENT_OREDR_VERIFY_RESPONSE, payload: data })
            resolve && resolve(response)
            yield put({ type: RESET_LOADER, isLoading: false })
        }
        else {
            yield put({ type: PAYMENT_OREDR_VERIFY_FAILED, payload: data })
            resolve && resolve(response)
            yield put({ type: RESET_LOADER, isLoading: false })
        }
    } catch (e) {
        yield put({ type: PAYMENT_OREDR_VERIFY_FAILED, payload: e })
        yield put({ type: RESET_LOADER, isLoading: false })
    }
}
