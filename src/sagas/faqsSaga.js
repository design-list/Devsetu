import { put } from 'redux-saga/effects';
import fetchApi from '../../services/fetchApi';
import { RESET_LOADER, START_LOADING } from '@/redux/types/loader';
import { ADD_NEW_FAQS_DATA_FAILED, ADD_NEW_FAQS_DATA_RESPONSE, DELETE_FAQS_DATA_FAILED, DELETE_FAQS_DATA_RESPONSE, 
    FAQS_DATA_FAILED, FAQS_DATA_RESPONSE, FAQS_DETAILS_DATA_FAILED, FAQS_DETAILS_DATA_RESPONSE, UPDATE_FAQS_DATA_FAILED, 
    UPDATE_FAQS_DATA_RESPONSE } from '@/redux/types/faqTypes';
let api = new fetchApi();

export function* fetchAllFaqsSaga({ payload, resolve }) {
    try {
        yield put({ type: START_LOADING, isLoading: true })
        let response = yield api.GetAllFaqs(payload);

        const {data, status} = response;

        if (status === 200) {
            yield put({ type: FAQS_DATA_RESPONSE, payload: data })
            resolve && resolve(response)
            yield put({ type: RESET_LOADER, isLoading: false })
        }
        else {
            yield put({ type: FAQS_DATA_FAILED, payload: data })
            resolve && resolve(response)
            yield put({ type: RESET_LOADER, isLoading: false })
        }
    } catch (e) {
        yield put({ type: FAQS_DATA_FAILED, payload: e })
        yield put({ type: RESET_LOADER, isLoading: false })
    }
}


export function* addNewFaqsSaga({ payload, resolve }) {
    try {
        yield put({ type: START_LOADING, isLoading: true })
        let response = yield api.AddNewFaqs(payload);

        const {data, status} = response;

        if (status === 200) {
            yield put({ type: ADD_NEW_FAQS_DATA_RESPONSE, payload: data })
            resolve && resolve(response)
            yield put({ type: RESET_LOADER, isLoading: false })
        }
        else {
            yield put({ type: ADD_NEW_FAQS_DATA_FAILED, payload: data })
            resolve && resolve(response)
            yield put({ type: RESET_LOADER, isLoading: false })
        }
    } catch (e) {
        yield put({ type: ADD_NEW_FAQS_DATA_FAILED, payload: e })
        yield put({ type: RESET_LOADER, isLoading: false })
    }
}


export function* FaqsDetialSaga({ payload, resolve }) {
    try {
        yield put({ type: START_LOADING, isLoading: true })
        let response = yield api.GetFaqsDetails(payload);

        const {data, status} = response;

        if (status === 200) {
            yield put({ type: FAQS_DETAILS_DATA_RESPONSE, payload: data })
            resolve && resolve(response)
            yield put({ type: RESET_LOADER, isLoading: false })
        }
        else {
            yield put({ type: FAQS_DETAILS_DATA_FAILED, payload: data })
            resolve && resolve(response)
            yield put({ type: RESET_LOADER, isLoading: false })
        }
    } catch (e) {
        yield put({ type: FAQS_DETAILS_DATA_FAILED, payload: e })
        yield put({ type: RESET_LOADER, isLoading: false })
    }
}

export function* updateFaqsSaga({ payload, resolve }) {
    try {
        yield put({ type: START_LOADING, isLoading: true })
        let response = yield api.UpdeteFaqs(payload);

        const {data, status} = response;

        if (status === 200) {
            yield put({ type: UPDATE_FAQS_DATA_RESPONSE, payload: data })
            resolve && resolve(response)
            yield put({ type: RESET_LOADER, isLoading: false })
        }
        else {
            yield put({ type: UPDATE_FAQS_DATA_FAILED, payload: data })
            resolve && resolve(response)
            yield put({ type: RESET_LOADER, isLoading: false })
        }
    } catch (e) {
        yield put({ type: UPDATE_FAQS_DATA_FAILED, payload: e })
        yield put({ type: RESET_LOADER, isLoading: false })
    }
}

export function* deleteFaqsSaga({ payload, resolve }) {
    try {
        yield put({ type: START_LOADING, isLoading: true })
        let response = yield api.DeleteFaqs(payload);

        const {data, status} = response;

        if (status === 200) {
            yield put({ type: DELETE_FAQS_DATA_RESPONSE, payload: data })
            resolve && resolve(response)
            yield put({ type: RESET_LOADER, isLoading: false })
        }
        else {
            yield put({ type: DELETE_FAQS_DATA_FAILED, payload: data })
            resolve && resolve(response)
            yield put({ type: RESET_LOADER, isLoading: false })
        }
    } catch (e) {
        yield put({ type: DELETE_FAQS_DATA_FAILED, payload: e })
        yield put({ type: RESET_LOADER, isLoading: false })
    }
}