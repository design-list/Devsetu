import { put } from 'redux-saga/effects';
import fetchApi from '../../services/fetchApi';
import { RESET_LOADER, START_LOADING } from '@/redux/types/loader';
import { OTP_VERIFY_RESPONSE,OTP_VERIFY_FAILED } from '@/redux/types/loginTypes';
import { saveState } from '../../utils/localstorage';
let api = new fetchApi();

export function* loginByOtpSaga({ payload, resolve }) {
    try {
        yield put({ type: START_LOADING, isLoading: true })
        let response = yield api.VerifyMobileOtp(payload);

        const {status, token,phone } = response;
        console.log("response", response)

        if (status === 200) {
            saveState('token', token);
            saveState('phone', phone);
            yield put({ type: OTP_VERIFY_RESPONSE, payload: response })
            resolve && resolve(response)
            yield put({ type: RESET_LOADER, isLoading: false })
        }
        else {
            yield put({ type: OTP_VERIFY_FAILED, payload: response })
            resolve && resolve(response)
            yield put({ type: RESET_LOADER, isLoading: false })
        }
    } catch (e) {
        yield put({ type: OTP_VERIFY_FAILED, payload: e })

    }
}

