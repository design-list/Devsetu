
import {
    START_LOADING, FINISH_LOADING, RESET_LOADER
} from "../types/loader";

export const startLoading = (payload) => ({
    type: START_LOADING,
    payload
})

export const finishLoading = (payload) => ({
    type: FINISH_LOADING,
    payload
})

export const resetLoader = (payload) => ({
    type: RESET_LOADER,
    payload
})

