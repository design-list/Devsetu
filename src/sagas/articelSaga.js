import { put } from 'redux-saga/effects';
import fetchApi from '../../services/fetchApi';
import { RESET_LOADER, START_LOADING } from '@/redux/types/loader';
import { ADD_NEW_ARTICLES_DATA_FAILED, ADD_NEW_ARTICLES_DATA_RESPONSE, DELETE_ARTICLES_DATA_FAILED, DELETE_ARTICLES_DATA_RESPONSE, 
    ARTICLES_DATA_FAILED, ARTICLES_DATA_RESPONSE, ARTICLES_DETAILS_DATA_FAILED, ARTICLES_DETAILS_DATA_RESPONSE, UPDATE_ARTICLES_DATA_FAILED, 
    UPDATE_ARTICLES_DATA_RESPONSE } from '@/redux/types/articelsTypes';
let api = new fetchApi();

export function* fetchAllArticelSaga({ payload, resolve }) {
    try {
        yield put({ type: START_LOADING, isLoading: true })
        let response = yield api.GetAllArticles(payload);

        console.log("fetchAllArticelSaga", response)
        const {data, status} = response;

        if (status === 200) {
            yield put({ type: ARTICLES_DATA_RESPONSE, payload: data })
            resolve && resolve(response)
            yield put({ type: RESET_LOADER, isLoading: false })
        }
        else {
            console.log("ARTICLES_DATA_FAILED", data);
            yield put({ type: ARTICLES_DATA_FAILED, payload: data })
            resolve && resolve(response)
            yield put({ type: RESET_LOADER, isLoading: false })
        }
    } catch (e) {
        yield put({ type: ARTICLES_DATA_FAILED, payload: e })

    }
}

export function* addNewArticelSaga({ payload, resolve }) {
    try {
        yield put({ type: START_LOADING, isLoading: true })
        let response = yield api.AddNewArticles(payload);

        const {data, status} = response;

        if (status === 200) {
            yield put({ type: ADD_NEW_ARTICLES_DATA_RESPONSE, payload: data })
            resolve && resolve(response)
            yield put({ type: RESET_LOADER, isLoading: false })
        }
        else {
            console.log("ADD_NEW_ARTICLES_DATA_FAILED", data);
            yield put({ type: ADD_NEW_ARTICLES_DATA_FAILED, payload: data })
            resolve && resolve(response)
            yield put({ type: RESET_LOADER, isLoading: false })
        }
    } catch (e) {
        yield put({ type: ADD_NEW_ARTICLES_DATA_FAILED, payload: e })

    }
}


export function* ArticelDetialSaga({ payload, resolve }) {
    try {
        yield put({ type: START_LOADING, isLoading: true })
        let response = yield api.GetArticlesDetails(payload);

        const {data, status} = response;

        if (status === 200) {
            yield put({ type: ARTICLES_DETAILS_DATA_RESPONSE, payload: data })
            resolve && resolve(response)
            yield put({ type: RESET_LOADER, isLoading: false })
        }
        else {
            console.log("ARTICLES_DETAILS_DATA_FAILED", data);
            yield put({ type: ARTICLES_DETAILS_DATA_FAILED, payload: data })
            resolve && resolve(response)
            yield put({ type: RESET_LOADER, isLoading: false })
        }
    } catch (e) {
        yield put({ type: ARTICLES_DETAILS_DATA_FAILED, payload: e })

    }
}


export function* updateArticelSaga({ payload, resolve }) {
    try {
        yield put({ type: START_LOADING, isLoading: true })
        let response = yield api.UpdeteArticles(payload);

        const {data, status} = response;

        if (status === 200) {
            yield put({ type: UPDATE_ARTICLES_DATA_RESPONSE, payload: data })
            resolve && resolve(response)
            yield put({ type: RESET_LOADER, isLoading: false })
        }
        else {
            console.log("UPDATE_ARTICLES_DATA_FAILED", data);
            yield put({ type: UPDATE_ARTICLES_DATA_FAILED, payload: data })
            resolve && resolve(response)
            yield put({ type: RESET_LOADER, isLoading: false })
        }
    } catch (e) {
        yield put({ type: UPDATE_ARTICLES_DATA_FAILED, payload: e })

    }
}

export function* deleteArticelSaga({ payload, resolve }) {
    try {
        yield put({ type: START_LOADING, isLoading: true })
        let response = yield api.DeleteArticles(payload);

        const {data, status} = response;

        if (status === 200) {
            yield put({ type: DELETE_ARTICLES_DATA_RESPONSE, payload: data })
            resolve && resolve(response)
            yield put({ type: RESET_LOADER, isLoading: false })
        }
        else {
            console.log("DELETE_ARTICLES_DATA_FAILED", data);
            yield put({ type: DELETE_ARTICLES_DATA_FAILED, payload: data })
            resolve && resolve(response)
            yield put({ type: RESET_LOADER, isLoading: false })
        }
    } catch (e) {
        yield put({ type: DELETE_ARTICLES_DATA_FAILED, payload: e })

    }
}