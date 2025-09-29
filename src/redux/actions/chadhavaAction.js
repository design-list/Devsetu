import { ADD_NEW_CHADHAVA_DATA_REQUEST, DELETE_CHADHAVA_DATA_REQUEST, CHADHAVA_DATA_REQUEST, CHADHAVA_DETAILS_DATA_REQUEST, UPDATE_CHADHAVA_DATA_REQUEST } from "../types/chadhavaTypes"


export const requestChadhavaAction = (date) => ({
    type: CHADHAVA_DATA_REQUEST,
})

export const addNewChadhavaAction = (data) => ({
    type: ADD_NEW_CHADHAVA_DATA_REQUEST,
    payload: data
})

export const fetchChadhavaDetailAction = (data) => ({
    type: CHADHAVA_DETAILS_DATA_REQUEST,
    payload: data
})

export const deleteChadhavaAction = (data) => ({
    type: DELETE_CHADHAVA_DATA_REQUEST,
    payload: data
})

export const updateChadhavaAction = (data) => ({
    type: UPDATE_CHADHAVA_DATA_REQUEST,
    payload: data
})
