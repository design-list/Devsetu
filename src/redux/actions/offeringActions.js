import { ADD_NEW_OFFERINGS_DATA_REQUEST, DELETE_OFFERINGS_DATA_REQUEST, OFFERINGS_DATA_REQUEST, 
    OFFERINGS_DETAILS_DATA_REQUEST, UPDATE_OFFERINGS_DATA_REQUEST } from "../types/offeringTypes"


export const requestOfferingDataAction = (date) => ({
    type: OFFERINGS_DATA_REQUEST,
})


export const addNewOfferingDataAction = (data) => ({
    type: ADD_NEW_OFFERINGS_DATA_REQUEST,
    payload: data
})

export const fetchOfferingDetailAction = (data) => ({
    type: OFFERINGS_DETAILS_DATA_REQUEST,
    payload: data
})

export const deleteOfferingAction = (data) => ({
    type: DELETE_OFFERINGS_DATA_REQUEST,
    payload: data
})

export const updateOfferingAction = (data) => ({
    type: UPDATE_OFFERINGS_DATA_REQUEST,
    payload: data
})
