import { put } from 'redux-saga/effects';
import fetchApi from '../../services/fetchApi';
import { RESET_LOADER, START_LOADING } from '@/redux/types/loader';
import { ADD_NEW_CHADHAVA_DATA_FAILED, ADD_NEW_CHADHAVA_DATA_RESPONSE, DELETE_CHADHAVA_DATA_FAILED, DELETE_CHADHAVA_DATA_RESPONSE, 
    CHADHAVA_DATA_FAILED, CHADHAVA_DATA_RESPONSE, CHADHAVA_DETAILS_DATA_FAILED, CHADHAVA_DETAILS_DATA_RESPONSE, UPDATE_CHADHAVA_DATA_FAILED, 
    UPDATE_CHADHAVA_DATA_RESPONSE, 
    CHADHAVA_WEB_DATA_RESPONSE,
    CHADHAVA_WEB_DATA_FAILED,
    CHADHAVA_WEB_DETAILS_DATA_RESPONSE,
    CHADHAVA_WEB_DETAILS_DATA_FAILED} from '@/redux/types/chadhavaTypes';
let api = new fetchApi();

export function* fetchAllChadhavaSaga({ payload, resolve }) {
    try {
        yield put({ type: START_LOADING, isLoading: true })
        let response = yield api.GetAllChadhava(payload);

        const {data, status} = response;

        if (status === 200) {
            yield put({ type: CHADHAVA_DATA_RESPONSE, payload: data })
            resolve && resolve(response)
            yield put({ type: RESET_LOADER, isLoading: false })
        }
        else {
            yield put({ type: CHADHAVA_DATA_FAILED, payload: data })
            resolve && resolve(response)
            yield put({ type: RESET_LOADER, isLoading: false })
        }
    } catch (e) {
        yield put({ type: CHADHAVA_DATA_FAILED, payload: e })
        yield put({ type: RESET_LOADER, isLoading: false })
    }
}

export function* fetchAllWebChadhavaSaga({ payload, resolve }) {
    try {
        yield put({ type: START_LOADING, isLoading: true })
        let response = yield api.GetAllWebChadhava(payload);

        const {data, status} = response;

        if (status === 200) {
            yield put({ type: CHADHAVA_WEB_DATA_RESPONSE, payload: data })
            resolve && resolve(response)
            yield put({ type: RESET_LOADER, isLoading: false })
        }
        else {
            yield put({ type: CHADHAVA_WEB_DATA_FAILED, payload: data })
            resolve && resolve(response)
            yield put({ type: RESET_LOADER, isLoading: false })
        }
    } catch (e) {
        yield put({ type: CHADHAVA_WEB_DATA_FAILED, payload: e })
        yield put({ type: RESET_LOADER, isLoading: false })
    }
}

export function* addNewChadhavaSaga({ payload, resolve }) {
    try {
        yield put({ type: START_LOADING, isLoading: true })
        let response = yield api.AddNewChadhava(payload);

        const {data, status} = response;

        if (status === 200) {
            yield put({ type: ADD_NEW_CHADHAVA_DATA_RESPONSE, payload: data })
            resolve && resolve(response)
            yield put({ type: RESET_LOADER, isLoading: false })
        }
        else {
            yield put({ type: ADD_NEW_CHADHAVA_DATA_FAILED, payload: data })
            resolve && resolve(response)
            yield put({ type: RESET_LOADER, isLoading: false })
        }
    } catch (e) {
        yield put({ type: ADD_NEW_CHADHAVA_DATA_FAILED, payload: e })
        yield put({ type: RESET_LOADER, isLoading: false })
    }
}


export function* chadhavaWebDetialSaga({ payload, resolve }) {
    try {
        yield put({ type: START_LOADING, isLoading: true })
        let response = yield api.GetChadhavaWebDetails(payload);

        const {data, status} = response;

        if (status === 200) {
            yield put({ type: CHADHAVA_WEB_DETAILS_DATA_RESPONSE, payload: data })
            resolve && resolve(response)
            yield put({ type: RESET_LOADER, isLoading: false })
        }
        else {
            yield put({ type: CHADHAVA_WEB_DETAILS_DATA_FAILED, payload: data })
            resolve && resolve(response)
            yield put({ type: RESET_LOADER, isLoading: false })
        }
    } catch (e) {
        yield put({ type: CHADHAVA_WEB_DETAILS_DATA_FAILED, payload: e })
        yield put({ type: RESET_LOADER, isLoading: false })
    }
}


export function* chadhavaDetialSaga({ payload, resolve }) {
    try {
        yield put({ type: START_LOADING, isLoading: true })
        let response = yield api.GetChadhavaDetails(payload);

        const {data, status} = response;

        if (status === 200) {
            yield put({ type: CHADHAVA_DETAILS_DATA_RESPONSE, payload: data })
            resolve && resolve(response)
            yield put({ type: RESET_LOADER, isLoading: false })
        }
        else {
            yield put({ type: CHADHAVA_DETAILS_DATA_FAILED, payload: data })
            resolve && resolve(response)
            yield put({ type: RESET_LOADER, isLoading: false })
        }
    } catch (e) {
        yield put({ type: CHADHAVA_DETAILS_DATA_FAILED, payload: e })
        yield put({ type: RESET_LOADER, isLoading: false })
    }
}


export function* updateChadhavaSaga({ payload, resolve }) {
    try {
        yield put({ type: START_LOADING, isLoading: true })
        let response = yield api.UpdeteChadhava(payload);

        const {data, status} = response;

        if (status === 200) {
            yield put({ type: UPDATE_CHADHAVA_DATA_RESPONSE, payload: data })
            resolve && resolve(response)
            yield put({ type: RESET_LOADER, isLoading: false })
        }
        else {
            yield put({ type: UPDATE_CHADHAVA_DATA_FAILED, payload: data })
            resolve && resolve(response)
            yield put({ type: RESET_LOADER, isLoading: false })
        }
    } catch (e) {
        yield put({ type: UPDATE_CHADHAVA_DATA_FAILED, payload: e })
        yield put({ type: RESET_LOADER, isLoading: false })
    }
}

export function* deleteChadhavaSaga({ payload, resolve }) {
    try {
        yield put({ type: START_LOADING, isLoading: true })
        let response = yield api.DeleteChadhava(payload);

        const {data, status} = response;

        if (status === 200) {
            yield put({ type: DELETE_CHADHAVA_DATA_RESPONSE, payload: data })
            resolve && resolve(response)
            yield put({ type: RESET_LOADER, isLoading: false })
        }
        else {
            yield put({ type: DELETE_CHADHAVA_DATA_FAILED, payload: data })
            resolve && resolve(response)
            yield put({ type: RESET_LOADER, isLoading: false })
        }
    } catch (e) {
        yield put({ type: DELETE_CHADHAVA_DATA_FAILED, payload: e })
        yield put({ type: RESET_LOADER, isLoading: false })
    }
}