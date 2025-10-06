import { ADD_NEW_PUJA_DATA_FAILED, ADD_NEW_PUJA_DATA_RESPONSE, PUJA_DATA_RESPONSE, PUJA_DATA_FAILED, PUJA_DETAILS_DATA_RESPONSE, 
    PUJA_DETAILS_DATA_FAILED, PUJA_DETAILS_BY_SLUG_RESPONSE, PUJA_DETAILS_BY_SLUG_FAILED, PUJA_PAGE_DATA_RESPONSE, PUJA_PAGE_DATA_FAILED } from "../types/pujaTypes"


const initialState = {
    allPuja: null,
    allWebPujaData: null,
    heroBanner: null,
    pujaCard: null,
    addedPuja: null,
    pujaDetail: null,
    pujaDetailPage: null,
}

export default function reducer(state = initialState, action) {
    switch (action.type) {

        case PUJA_DATA_RESPONSE:
            return { ...state, allPuja: action.payload }
        case PUJA_DATA_FAILED:
            return { ...state, allPuja: action.payload }

        case PUJA_PAGE_DATA_RESPONSE:
            return { ...state, allWebPujaData: action.payload, heroBanner: action.payload.heroBanner, pujaCard: action.payload.pujaCard }
        case PUJA_PAGE_DATA_FAILED:
            return { ...state, allWebPujaData: action.payload }

        case ADD_NEW_PUJA_DATA_RESPONSE:
            return { ...state, addedPuja: action.payload }
        case ADD_NEW_PUJA_DATA_FAILED:
            return { ...state, addedPuja: action.payload }

        case PUJA_DETAILS_DATA_RESPONSE:
            return { ...state, pujaDetail: action.payload }
        case PUJA_DETAILS_DATA_FAILED:
            return { ...state, pujaDetail: action.payload }

        case PUJA_DETAILS_BY_SLUG_RESPONSE:
            return { ...state, pujaDetailPage: action.payload }
        case PUJA_DETAILS_BY_SLUG_FAILED:
            return { ...state, pujaDetailPage: action.payload }

        default:
            return state
    }
}
