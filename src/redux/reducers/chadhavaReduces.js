import { ADD_NEW_CHADHAVA_DATA_FAILED, ADD_NEW_CHADHAVA_DATA_RESPONSE, CHADHAVA_DATA_RESPONSE, CHADHAVA_DATA_FAILED, CHADHAVA_DETAILS_DATA_RESPONSE, CHADHAVA_DETAILS_DATA_FAILED } from "../types/chadhavaTypes"


const initialState = {
    allChadhava: null,
    addedChadhava: null,
    chadhavaDetail: null,
}

export default function reducer(state = initialState, action) {
    switch (action.type) {

        case CHADHAVA_DATA_RESPONSE:
            return { ...state, allChadhava: action.payload }
        case CHADHAVA_DATA_FAILED:
            return { ...state, allChadhava: action.payload }

        case ADD_NEW_CHADHAVA_DATA_RESPONSE:
            return { ...state, addedChadhava: action.payload }
        case ADD_NEW_CHADHAVA_DATA_FAILED:
            return { ...state, addedChadhava: action.payload }

        case CHADHAVA_DETAILS_DATA_RESPONSE:
            return { ...state, chadhavaDetail: action.payload }
        case CHADHAVA_DETAILS_DATA_FAILED:
            return { ...state, chadhavaDetail: action.payload }

        default:
            return state
    }
}
