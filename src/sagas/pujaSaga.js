import { put } from 'redux-saga/effects';
import fetchApi from '../../services/fetchApi';
import { RESET_LOADER, START_LOADING } from '@/redux/types/loader';
import { ADD_NEW_PUJA_DATA_FAILED, ADD_NEW_PUJA_DATA_RESPONSE, DELETE_PUJA_DATA_FAILED, DELETE_PUJA_DATA_RESPONSE, 
    PUJA_DATA_FAILED, PUJA_DATA_RESPONSE, PUJA_DETAILS_BY_SLUG_FAILED, PUJA_DETAILS_BY_SLUG_RESPONSE, PUJA_DETAILS_DATA_FAILED, PUJA_DETAILS_DATA_RESPONSE, PUJA_PAGE_DATA_FAILED, PUJA_PAGE_DATA_RESPONSE, UPDATE_PUJA_DATA_FAILED, 
    UPDATE_PUJA_DATA_RESPONSE } from '@/redux/types/pujaTypes';
let api = new fetchApi();

export function* fetchAllPujaSaga({ payload, resolve }) {
    try {
        yield put({ type: START_LOADING, isLoading: true })
        let response = yield api.GetAllPuja(payload);

        const {data, status} = response;

        if (status === 200) {
            yield put({ type: PUJA_DATA_RESPONSE, payload: data })
            resolve && resolve(response)
            yield put({ type: RESET_LOADER, isLoading: false })
        }
        else {
            yield put({ type: PUJA_DATA_FAILED, payload: data })
            resolve && resolve(response)
            yield put({ type: RESET_LOADER, isLoading: false })
        }
    } catch (e) {
        yield put({ type: PUJA_DATA_FAILED, payload: e })
        yield put({ type: RESET_LOADER, isLoading: false })
    }
}


export function* fetchAllWebPujaSaga({ payload, resolve }) {
    try {
        yield put({ type: START_LOADING, isLoading: true })
        let response = yield api.GetAllWebPuja(payload);

        const {data, status} = response;

        if (status === 200) {
            yield put({ type: PUJA_PAGE_DATA_RESPONSE, payload: data })
            resolve && resolve(response)
            yield put({ type: RESET_LOADER, isLoading: false })
        }
        else {
            yield put({ type: PUJA_PAGE_DATA_FAILED, payload: data })
            resolve && resolve(response)
            yield put({ type: RESET_LOADER, isLoading: false })
        }
    } catch (e) {
        yield put({ type: PUJA_PAGE_DATA_FAILED, payload: e })
        yield put({ type: RESET_LOADER, isLoading: false })
    }
}

export function* addNewPujaSaga({ payload, resolve }) {
    try {
        yield put({ type: START_LOADING, isLoading: true })
        let response = yield api.AddNewPuja(payload);

        const {data, status} = response;

        if (status === 200) {
            yield put({ type: ADD_NEW_PUJA_DATA_RESPONSE, payload: data })
            resolve && resolve(response)
            yield put({ type: RESET_LOADER, isLoading: false })
        }
        else {
            yield put({ type: ADD_NEW_PUJA_DATA_FAILED, payload: data })
            resolve && resolve(response)
            yield put({ type: RESET_LOADER, isLoading: false })
        }
    } catch (e) {
        yield put({ type: ADD_NEW_PUJA_DATA_FAILED, payload: e })
        yield put({ type: RESET_LOADER, isLoading: false })
    }
}


export function* pujaDetialSaga({ payload, resolve }) {
    try {
        yield put({ type: START_LOADING, isLoading: true })
        let response = yield api.GetPujaDetails(payload);

        const {data, status} = response;

        if (status === 200) {
            yield put({ type: PUJA_DETAILS_DATA_RESPONSE, payload: data })
            resolve && resolve(response)
            yield put({ type: RESET_LOADER, isLoading: false })
        }
        else {
            yield put({ type: PUJA_DETAILS_DATA_FAILED, payload: data })
            resolve && resolve(response)
            yield put({ type: RESET_LOADER, isLoading: false })
        }
    } catch (e) {
        yield put({ type: PUJA_DETAILS_DATA_FAILED, payload: e })
        yield put({ type: RESET_LOADER, isLoading: false })
    }
}

export function* pujaDetialPageSaga({ payload, resolve }) {
    try {
        yield put({ type: START_LOADING, isLoading: true })
        let response = yield api.GetPujaBySlug(payload);

        const {data, status} = response;

        if (status === 200) {
            yield put({ type: PUJA_DETAILS_BY_SLUG_RESPONSE, payload: data })
            resolve && resolve(response)
            yield put({ type: RESET_LOADER, isLoading: false })
        }
        else {
            yield put({ type: PUJA_DETAILS_BY_SLUG_FAILED, payload: data })
            resolve && resolve(response)
            yield put({ type: RESET_LOADER, isLoading: false })
        }
    } catch (e) {
        yield put({ type: PUJA_DETAILS_BY_SLUG_FAILED, payload: e })
        yield put({ type: RESET_LOADER, isLoading: false })
    }
}


export function* updatePujaSaga({ payload, resolve }) {
    try {
        yield put({ type: START_LOADING, isLoading: true })
        let response = yield api.UpdetePuja(payload);

        const {data, status} = response;

        if (status === 200) {
            yield put({ type: UPDATE_PUJA_DATA_RESPONSE, payload: data })
            resolve && resolve(response)
            yield put({ type: RESET_LOADER, isLoading: false })
        }
        else {
            yield put({ type: UPDATE_PUJA_DATA_FAILED, payload: data })
            resolve && resolve(response)
            yield put({ type: RESET_LOADER, isLoading: false })
        }
    } catch (e) {
        yield put({ type: UPDATE_PUJA_DATA_FAILED, payload: e })
        yield put({ type: RESET_LOADER, isLoading: false })
    }
}

export function* deletePujaSaga({ payload, resolve }) {
    try {
        yield put({ type: START_LOADING, isLoading: true })
        let response = yield api.DeletePuja(payload);

        const {data, status} = response;

        if (status === 200) {
            yield put({ type: DELETE_PUJA_DATA_RESPONSE, payload: data })
            resolve && resolve(response)
            yield put({ type: RESET_LOADER, isLoading: false })
        }
        else {
            yield put({ type: DELETE_PUJA_DATA_FAILED, payload: data })
            resolve && resolve(response)
            yield put({ type: RESET_LOADER, isLoading: false })
        }
    } catch (e) {
        yield put({ type: DELETE_PUJA_DATA_FAILED, payload: e })
        yield put({ type: RESET_LOADER, isLoading: false })
    }
}