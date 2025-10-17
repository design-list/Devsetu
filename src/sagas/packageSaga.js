import { put } from 'redux-saga/effects';
import fetchApi from '../../services/fetchApi';
import { RESET_LOADER, START_LOADING } from '@/redux/types/loader';
import { ADD_NEW_PACKAGE_DATA_FAILED, ADD_NEW_PACKAGE_DATA_RESPONSE, DELETE_PACKAGE_DATA_FAILED, DELETE_PACKAGE_DATA_RESPONSE, 
    PACKAGE_DATA_FAILED, PACKAGE_DATA_RESPONSE, PACKAGE_DETAILS_DATA_FAILED, PACKAGE_DETAILS_DATA_RESPONSE, UPDATE_PACKAGE_DATA_FAILED, 
    UPDATE_PACKAGE_DATA_RESPONSE } from '@/redux/types/packageTypes';
let api = new fetchApi();

export function* fetchAllPackageSaga({ payload, resolve }) {
    try {
        yield put({ type: START_LOADING, isLoading: true })
        let response = yield api.GetAllPackage(payload);

        const {data, status} = response;

        if (status === 200) {
            yield put({ type: PACKAGE_DATA_RESPONSE, payload: data })
            resolve && resolve(response)
            yield put({ type: RESET_LOADER, isLoading: false })
        }
        else {
            yield put({ type: PACKAGE_DATA_FAILED, payload: data })
            resolve && resolve(response)
            yield put({ type: RESET_LOADER, isLoading: false })
        }
    } catch (e) {
        yield put({ type: PACKAGE_DATA_FAILED, payload: e })
        yield put({ type: RESET_LOADER, isLoading: false })
    }
}


export function* addNewPackageSaga({ payload, resolve }) {
    try {
        yield put({ type: START_LOADING, isLoading: true })
        let response = yield api.AddNewPackage(payload);

        const {data, status} = response;

        if (status === 200) {
            yield put({ type: ADD_NEW_PACKAGE_DATA_RESPONSE, payload: data })
            resolve && resolve(response)
            yield put({ type: RESET_LOADER, isLoading: false })
        }
        else {
            yield put({ type: ADD_NEW_PACKAGE_DATA_FAILED, payload: data })
            resolve && resolve(response)
            yield put({ type: RESET_LOADER, isLoading: false })
        }
    } catch (e) {
        yield put({ type: ADD_NEW_PACKAGE_DATA_FAILED, payload: e })
        yield put({ type: RESET_LOADER, isLoading: false })
    }
}


export function* PackageDetialSaga({ payload, resolve }) {
    try {
        yield put({ type: START_LOADING, isLoading: true })
        let response = yield api.GetPackageDetails(payload);

        const {data, status} = response;

        if (status === 200) {
            yield put({ type: PACKAGE_DETAILS_DATA_RESPONSE, payload: data })
            resolve && resolve(response)
            yield put({ type: RESET_LOADER, isLoading: false })
        }
        else {
            yield put({ type: PACKAGE_DETAILS_DATA_FAILED, payload: data })
            resolve && resolve(response)
            yield put({ type: RESET_LOADER, isLoading: false })
        }
    } catch (e) {
        yield put({ type: PACKAGE_DETAILS_DATA_FAILED, payload: e })
        yield put({ type: RESET_LOADER, isLoading: false })
    }
}

export function* updatePackageSaga({ payload, resolve }) {
    try {
        yield put({ type: START_LOADING, isLoading: true })
        let response = yield api.UpdetePackage(payload);

        const {data, status} = response;

        if (status === 200) {
            yield put({ type: UPDATE_PACKAGE_DATA_RESPONSE, payload: data })
            resolve && resolve(response)
            yield put({ type: RESET_LOADER, isLoading: false })
        }
        else {
            yield put({ type: UPDATE_PACKAGE_DATA_FAILED, payload: data })
            resolve && resolve(response)
            yield put({ type: RESET_LOADER, isLoading: false })
        }
    } catch (e) {
        yield put({ type: UPDATE_PACKAGE_DATA_FAILED, payload: e })
        yield put({ type: RESET_LOADER, isLoading: false })
    }
}

export function* deletePackageSaga({ payload, resolve }) {
    try {
        yield put({ type: START_LOADING, isLoading: true })
        let response = yield api.DeletePackage(payload);

        const {data, status} = response;

        if (status === 200) {
            yield put({ type: DELETE_PACKAGE_DATA_RESPONSE, payload: data })
            resolve && resolve(response)
            yield put({ type: RESET_LOADER, isLoading: false })
        }
        else {
            yield put({ type: DELETE_PACKAGE_DATA_FAILED, payload: data })
            resolve && resolve(response)
            yield put({ type: RESET_LOADER, isLoading: false })
        }
    } catch (e) {
        yield put({ type: DELETE_PACKAGE_DATA_FAILED, payload: e })
        yield put({ type: RESET_LOADER, isLoading: false })
    }
}