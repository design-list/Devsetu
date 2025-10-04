import { HOME_DATA_FAILED, HOME_DATA_RESPONSE } from "../types/homeTypes"


const initialState = {
    homeData: null,
    herobanner: null,
    pujacard: null,
    chadhavacard: null
}

export default function reducer(state = initialState, action) {
    switch (action.type) {

        case HOME_DATA_RESPONSE:
            return { ...state, pujaDetail: action.payload,  }
        case HOME_DATA_FAILED:
            return { ...state, pujaDetail: action.payload }

        default:
            return state
    }
}
