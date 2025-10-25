import { ADD_NEW_USER_DETAILS_REQUEST, USER_DETAILS_REQUEST } from "../types/userDetailsTypes"


export const requestUserDetailsAction = (date) => ({
    type: USER_DETAILS_REQUEST,
})

export const addNewUserDetailsAction = (data) => ({
    type: ADD_NEW_USER_DETAILS_REQUEST,
    payload: data
})
