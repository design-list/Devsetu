import { ADD_NEW_PUJA_DATA_FAILED, ADD_NEW_PUJA_DATA_RESPONSE, PUJA_DATA_RESPONSE, PUJA_DATA_FAILED, PUJA_DETAILS_DATA_RESPONSE, PUJA_DETAILS_DATA_FAILED } from "../types/pujaTypes"


const initialState = {
    allPuja: null,
    addedPuja: null,
    pujaDetail: null,
}

export default function reducer(state = initialState, action) {
    switch (action.type) {

        case PUJA_DATA_RESPONSE:
            return { ...state, allPuja: action.payload }
        case PUJA_DATA_FAILED:
            return { ...state, allPuja: action.payload }

        case ADD_NEW_PUJA_DATA_RESPONSE:
            return { ...state, addedPuja: action.payload }
        case ADD_NEW_PUJA_DATA_FAILED:
            return { ...state, addedPuja: action.payload }

        case PUJA_DETAILS_DATA_RESPONSE:
            return { ...state, pujaDetail: action.payload }
        case PUJA_DETAILS_DATA_FAILED:
            return { ...state, pujaDetail: action.payload }

        default:
            return state
    }
}
