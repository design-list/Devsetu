import { put } from 'redux-saga/effects';
import fetchApi from '../../services/fetchApi';
import { RESET_LOADER, START_LOADING } from '@/redux/types/loader';
import { HOME_DATA_RESPONSE,HOME_DATA_FAILED } from '@/redux/types/homeTypes';
let api = new fetchApi();

export function* fetchAllHomeSaga({ payload, resolve }) {
    try {
        yield put({ type: START_LOADING, isLoading: true })
        let response = yield api.GetAllHome(payload);

        console.log("fetchAllHomeSaga", response)
        const {data, status} = response;

        if (status === 200) {
            yield put({ type: HOME_DATA_RESPONSE, payload: data })
            resolve && resolve(response)
            yield put({ type: RESET_LOADER, isLoading: false })
        }
        else {
            console.log("HOME_DATA_FAILED", data);
            yield put({ type: HOME_DATA_FAILED, payload: data })
            resolve && resolve(response)
            yield put({ type: RESET_LOADER, isLoading: false })
        }
    } catch (e) {
        yield put({ type: HOME_DATA_FAILED, payload: e })

    }
}
