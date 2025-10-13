import { PAYMENT_OREDR_REQUEST, PAYMENT_OREDR_VERIFY_REQUEST } from "../types/paymentTypes"


export const requestPaymentOrderAction = (data) => ({
    type: PAYMENT_OREDR_REQUEST,
    payload: data
})

export const paymentVerifyAction = (data) => ({
    type: PAYMENT_OREDR_VERIFY_REQUEST,
    payload: data
})
