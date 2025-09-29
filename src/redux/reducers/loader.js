import {
    RESET_LOADER,
    START_LOADING
} from "../types/loader";

const initialState = {
    isLoading: false
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case START_LOADING:
            return { ...state, isLoading: action.isLoading }
        case RESET_LOADER:
            return { ...state, isLoading: action.isLoading }
        default:
            return state
    }
}
