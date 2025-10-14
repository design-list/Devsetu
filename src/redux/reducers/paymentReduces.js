import { PAYMENT_OREDR_RESPONSE, PAYMENT_OREDR_FAILED, PAYMENT_OREDR_VERIFY_RESPONSE, PAYMENT_OREDR_VERIFY_FAILED } from "../types/paymentTypes"


const initialState = {
    paymentOrder: null,
    paymentVerify: null,
}

export default function reducer(state = initialState, action) {
    switch (action.type) {

        case PAYMENT_OREDR_RESPONSE:
            return { ...state, paymentOrder: action.payload }
        case PAYMENT_OREDR_FAILED:
            return { ...state, paymentOrder: action.payload }

        case PAYMENT_OREDR_VERIFY_RESPONSE:
            return { ...state, paymentVerify: action.payload }
        case PAYMENT_OREDR_VERIFY_FAILED:
            return { ...state, paymentVerify: action.payload }

        default:
            return state
    }
}
