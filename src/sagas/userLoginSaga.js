import { put } from 'redux-saga/effects';
import fetchApi from '../../services/fetchApi';
import { RESET_LOADER, START_LOADING } from '@/redux/types/loader';
import { USER_LOGIN_RESPONSE, USER_LOGIN_FAILED, USER_REGISTRATION_RESPONSE, USER_REGISTRATION_FAILED } from '@/redux/types/usersLoginTypes';
import { saveState } from '../../utils/localstorage';
let api = new fetchApi();

export function* userLoginSaga({ payload, resolve }) {
    try {
        yield put({ type: START_LOADING, isLoading: true })
        let response = yield api.CheckLogin(payload);

        const {status, token, user } = response;
        console.log("response", response)

        if (status === 200) {
            saveState('token', token);
            saveState('user', user)
            yield put({ type: USER_LOGIN_RESPONSE, payload: response })
            resolve && resolve(response)
            yield put({ type: RESET_LOADER, isLoading: false })
        }
        else {
            yield put({ type: USER_LOGIN_FAILED, payload: response })
            resolve && resolve(response)
            yield put({ type: RESET_LOADER, isLoading: false })
        }
    } catch (e) {
        yield put({ type: USER_LOGIN_FAILED, payload: e })

    }
}


export function* userRegistrationSaga({ payload, resolve }) {
    try {
        yield put({ type: START_LOADING, isLoading: true })
        let response = yield api.Registration(payload);

        const {data, status} = response;


        if (status === 200) {
            yield put({ type: USER_REGISTRATION_RESPONSE, payload: data })
            resolve && resolve(response)
            yield put({ type: RESET_LOADER, isLoading: false })
        }
        else {
            yield put({ type: USER_REGISTRATION_FAILED, payload: data })
            resolve && resolve(response)
            yield put({ type: RESET_LOADER, isLoading: false })
        }
    } catch (e) {
        yield put({ type: USER_REGISTRATION_FAILED, payload: e })
        yield put({ type: RESET_LOADER, isLoading: false })
    }
}
