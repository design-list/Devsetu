import { USER_DETAILS_RESPONSE, USER_DETAILS_FAILED, ADD_NEW_USER_DETAILS_RESPONSE,ADD_NEW_USER_DETAILS_FAILED } from "../types/userDetailsTypes"


const initialState = {
    allUserDetails: null,
    addedUserDetails: null,
}

export default function reducer(state = initialState, action) {
    switch (action.type) {

        case USER_DETAILS_RESPONSE:
            return { ...state, allUserDetails: action.payload }
        case USER_DETAILS_FAILED:
            return { ...state, allUserDetails: action.payload }

        case ADD_NEW_USER_DETAILS_RESPONSE:
            return { ...state, addedUserDetails: action.payload }
        case ADD_NEW_USER_DETAILS_FAILED:
            return { ...state, addedUserDetails: action.payload }

        default:
            return state
    }
}
