import { USER_LOGIN_REQUEST, USER_REGISTRATION_REQUEST } from "../types/usersLoginTypes"


export const userRegistrationAction = (data) => ({
    type: USER_REGISTRATION_REQUEST,
    payload: data
})

export const adminLoginAction = (data) => ({
    type: USER_LOGIN_REQUEST,
    payload: data
})
