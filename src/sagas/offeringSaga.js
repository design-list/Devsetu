import { put } from 'redux-saga/effects';
import fetchApi from '../../services/fetchApi';
import { RESET_LOADER, START_LOADING } from '@/redux/types/loader';
import { ADD_NEW_OFFERINGS_DATA_FAILED, ADD_NEW_OFFERINGS_DATA_RESPONSE, DELETE_OFFERINGS_DATA_FAILED, DELETE_OFFERINGS_DATA_RESPONSE, 
    OFFERINGS_DATA_FAILED, OFFERINGS_DATA_RESPONSE, OFFERINGS_DETAILS_DATA_FAILED, OFFERINGS_DETAILS_DATA_RESPONSE, UPDATE_OFFERINGS_DATA_FAILED, 
    UPDATE_OFFERINGS_DATA_RESPONSE } from '@/redux/types/offeringTypes';
let api = new fetchApi();

export function* fetchAllOfferingSaga({ payload, resolve }) {
    try {
        yield put({ type: START_LOADING, isLoading: true })
        let response = yield api.GetAllOffering(payload);

        const {data, status} = response;


        if (status === 200) {
            yield put({ type: OFFERINGS_DATA_RESPONSE, payload: data })
            resolve && resolve(response)
            yield put({ type: RESET_LOADER, isLoading: false })
        }
        else {
            yield put({ type: OFFERINGS_DATA_FAILED, payload: data })
            resolve && resolve(response)
            yield put({ type: RESET_LOADER, isLoading: false })
        }
    } catch (e) {
        yield put({ type: OFFERINGS_DATA_FAILED, payload: e })
        yield put({ type: RESET_LOADER, isLoading: false })
    }
}


export function* addNewOfferingSaga({ payload, resolve }) {
    try {
        yield put({ type: START_LOADING, isLoading: true })
        let response = yield api.AddNewOffering(payload);

        const {data, status} = response;

        if (status === 200) {
            yield put({ type: ADD_NEW_OFFERINGS_DATA_RESPONSE, payload: data })
            resolve && resolve(response)
            yield put({ type: RESET_LOADER, isLoading: false })
        }
        else {
            yield put({ type: ADD_NEW_OFFERINGS_DATA_FAILED, payload: data })
            resolve && resolve(response)
            yield put({ type: RESET_LOADER, isLoading: false })
        }
    } catch (e) {
        yield put({ type: ADD_NEW_OFFERINGS_DATA_FAILED, payload: e })
        yield put({ type: RESET_LOADER, isLoading: false })
    }
}


export function* OfferingDetialSaga({ payload, resolve }) {
    try {
        yield put({ type: START_LOADING, isLoading: true })
        let response = yield api.GetOfferingDetails(payload);

        const {data, status} = response;

        if (status === 200) {
            yield put({ type: OFFERINGS_DETAILS_DATA_RESPONSE, payload: data })
            resolve && resolve(response)
            yield put({ type: RESET_LOADER, isLoading: false })
        }
        else {
            yield put({ type: OFFERINGS_DETAILS_DATA_FAILED, payload: data })
            resolve && resolve(response)
            yield put({ type: RESET_LOADER, isLoading: false })
        }
    } catch (e) {
        yield put({ type: OFFERINGS_DETAILS_DATA_FAILED, payload: e })
        yield put({ type: RESET_LOADER, isLoading: false })
    }
}

export function* updateOfferingSaga({ payload, resolve }) {
    try {
        yield put({ type: START_LOADING, isLoading: true })
        let response = yield api.UpdeteOffering(payload);

        const {data, status} = response;

        if (status === 200) {
            yield put({ type: UPDATE_OFFERINGS_DATA_RESPONSE, payload: data })
            resolve && resolve(response)
            yield put({ type: RESET_LOADER, isLoading: false })
        }
        else {
            yield put({ type: UPDATE_OFFERINGS_DATA_FAILED, payload: data })
            resolve && resolve(response)
            yield put({ type: RESET_LOADER, isLoading: false })
        }
    } catch (e) {
        yield put({ type: UPDATE_OFFERINGS_DATA_FAILED, payload: e })
        yield put({ type: RESET_LOADER, isLoading: false })
    }
}

export function* deleteOfferingSaga({ payload, resolve }) {
    try {
        yield put({ type: START_LOADING, isLoading: true })
        let response = yield api.DeleteOffering(payload);

        const {data, status} = response;

        if (status === 200) {
            yield put({ type: DELETE_OFFERINGS_DATA_RESPONSE, payload: data })
            resolve && resolve(response)
            yield put({ type: RESET_LOADER, isLoading: false })
        }
        else {
            yield put({ type: DELETE_OFFERINGS_DATA_FAILED, payload: data })
            resolve && resolve(response)
            yield put({ type: RESET_LOADER, isLoading: false })
        }
    } catch (e) {
        yield put({ type: DELETE_OFFERINGS_DATA_FAILED, payload: e })
        yield put({ type: RESET_LOADER, isLoading: false })
    }
}