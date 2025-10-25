import { USER_REGISTRATION_RESPONSE, USER_REGISTRATION_FAILED, USER_LOGIN_REQUEST,USER_LOGIN_FAILED } from "../types/usersLoginTypes"


const initialState = {
    users: null,
    registerUser: null,
}

export default function reducer(state = initialState, action) {
    switch (action.type) {

        case USER_REGISTRATION_RESPONSE:
            return { ...state, registerUser: action.payload }
        case USER_REGISTRATION_FAILED:
            return { ...state, registerUser: action.payload }

        case USER_LOGIN_REQUEST:
            return { ...state, users: action.payload }
        case USER_LOGIN_FAILED:
            return { ...state, users: action.payload }

        default:
            return state
    }
}
