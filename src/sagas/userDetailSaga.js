import { put } from 'redux-saga/effects';
import fetchApi from '../../services/fetchApi';
import { RESET_LOADER, START_LOADING } from '@/redux/types/loader';
import { ADD_NEW_USER_DETAILS_FAILED, ADD_NEW_USER_DETAILS_RESPONSE,
    USER_DETAILS_FAILED, USER_DETAILS_RESPONSE } from '@/redux/types/userDetailsTypes';
let api = new fetchApi();

export function* fetchAllUserDetailSaga({ payload, resolve }) {
    try {
        yield put({ type: START_LOADING, isLoading: true })
        let response = yield api.GetAllUserDetail(payload);

        const {data, status} = response;

        if (status === 200) {
            yield put({ type: USER_DETAILS_RESPONSE, payload: data })
            resolve && resolve(response)
            yield put({ type: RESET_LOADER, isLoading: false })
        }
        else {
            yield put({ type: USER_DETAILS_FAILED, payload: data })
            resolve && resolve(response)
            yield put({ type: RESET_LOADER, isLoading: false })
        }
    } catch (e) {
        yield put({ type: USER_DETAILS_FAILED, payload: e })
        yield put({ type: RESET_LOADER, isLoading: false })
    }
}


export function* addNewUserDetailSaga({ payload, resolve }) {
    try {
        yield put({ type: START_LOADING, isLoading: true })
        let response = yield api.AddNewUserDetail(payload);

        const {data, status} = response;

        if (status === 200) {
            yield put({ type: ADD_NEW_USER_DETAILS_RESPONSE, payload: data })
            resolve && resolve(response)
            yield put({ type: RESET_LOADER, isLoading: false })
        }
        else {
            yield put({ type: ADD_NEW_USER_DETAILS_FAILED, payload: data })
            resolve && resolve(response)
            yield put({ type: RESET_LOADER, isLoading: false })
        }
    } catch (e) {
        yield put({ type: ADD_NEW_USER_DETAILS_FAILED, payload: e })
        yield put({ type: RESET_LOADER, isLoading: false })
    }
}
