import { ADD_NEW_PUJA_DATA_REQUEST, DELETE_PUJA_DATA_REQUEST, PUJA_DATA_REQUEST, PUJA_DETAILS_BY_SLUG_REQUEST, 
    PUJA_DETAILS_DATA_REQUEST, UPDATE_PUJA_DATA_REQUEST, PUJA_PAGE_DATA_REQUEST } from "../types/pujaTypes"


export const requestPujaDataAction = (date) => ({
    type: PUJA_DATA_REQUEST,
})

export const requestPujaWebPageAction = (date) => ({
    type: PUJA_PAGE_DATA_REQUEST,
})

export const addNewPujaDataAction = (data) => ({
    type: ADD_NEW_PUJA_DATA_REQUEST,
    payload: data
})

export const fetchPujaDetailAction = (data) => ({
    type: PUJA_DETAILS_DATA_REQUEST,
    payload: data
})

export const fetchPujaDetailPageAction = (data) => ({
    type: PUJA_DETAILS_BY_SLUG_REQUEST,
    payload: data
})

export const deletePujaAction = (data) => ({
    type: DELETE_PUJA_DATA_REQUEST,
    payload: data
})

export const updatePujaAction = (data) => ({
    type: UPDATE_PUJA_DATA_REQUEST,
    payload: data
})
