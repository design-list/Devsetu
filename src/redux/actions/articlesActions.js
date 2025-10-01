import { ADD_NEW_ARTICLES_DATA_REQUEST, DELETE_ARTICLES_DATA_REQUEST, ARTICLES_DATA_REQUEST, ARTICLES_DETAILS_DATA_REQUEST, UPDATE_ARTICLES_DATA_REQUEST } from "../types/articelsTypes"


export const requestArticlesDataAction = (date) => ({
    type: ARTICLES_DATA_REQUEST,
})

export const addNewArticlesDataAction = (data) => ({
    type: ADD_NEW_ARTICLES_DATA_REQUEST,
    payload: data
})

export const fetchArticlesDetailAction = (data) => ({
    type: ARTICLES_DETAILS_DATA_REQUEST,
    payload: data
})

export const deleteArticlesAction = (data) => ({
    type: DELETE_ARTICLES_DATA_REQUEST,
    payload: data
})

export const updateArticlesAction = (data) => ({
    type: UPDATE_ARTICLES_DATA_REQUEST,
    payload: data
})
