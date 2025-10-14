import { ADD_NEW_USER_DETAILS_REQUEST, DELETE_USER_DETAILS_REQUEST, USER_DETAILS_REQUEST, 
    FAQS_DETAILS_DATA_REQUEST, UPDATE_USER_DETAILS_REQUEST,} from "../types/userDetailsTypes"


export const requestUserDetailsAction = (date) => ({
    type: USER_DETAILS_REQUEST,
})

export const addNewUserDetailsAction = (data) => ({
    type: ADD_NEW_USER_DETAILS_REQUEST,
    payload: data
})

// export const fetchUserDetailsAction = (data) => ({
//     type: FAQS_DETAILS_DATA_REQUEST,
//     payload: data
// })


// export const deleteUserDetailsAction = (data) => ({
//     type: DELETE_USER_DETAILS_REQUEST,
//     payload: data
// })

// export const updateUserDetailsAction = (data) => ({
//     type: UPDATE_USER_DETAILS_REQUEST,
//     payload: data
// })
