import { ADD_NEW_OFFERINGS_DATA_FAILED, ADD_NEW_OFFERINGS_DATA_RESPONSE, OFFERINGS_DATA_RESPONSE, OFFERINGS_DATA_FAILED, OFFERINGS_DETAILS_DATA_RESPONSE, 
    OFFERINGS_DETAILS_DATA_FAILED} from "../types/offeringTypes"


const initialState = {
    allOffering: [],
    addedOffring: null,
    OffringDetail: null,
}

export default function reducer(state = initialState, action) {
    switch (action.type) {

        case OFFERINGS_DATA_RESPONSE:
            return { ...state, allOffering: action.payload }
        case OFFERINGS_DATA_FAILED:
            return { ...state, allOffering: action.payload }

        case ADD_NEW_OFFERINGS_DATA_RESPONSE:
            return { ...state, addedOffring: action.payload }
        case ADD_NEW_OFFERINGS_DATA_FAILED:
            return { ...state, addedOffring: action.payload }

        case OFFERINGS_DETAILS_DATA_RESPONSE:
            return { ...state, OffringDetail: action.payload }
        case OFFERINGS_DETAILS_DATA_FAILED:
            return { ...state, OffringDetail: action.payload }

        default:
            return state
    }
}
