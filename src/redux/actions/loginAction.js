import { OTP_VERIFY_REQUEST } from "../types/loginTypes";


export const requestOtpVerify = (data) => ({
    type: OTP_VERIFY_REQUEST,
    payload: data
})