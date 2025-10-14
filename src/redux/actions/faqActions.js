import { ADD_NEW_FAQS_DATA_REQUEST, DELETE_FAQS_DATA_REQUEST, FAQS_DATA_REQUEST, 
    FAQS_DETAILS_DATA_REQUEST, UPDATE_FAQS_DATA_REQUEST,} from "../types/faqTypes"


export const requestFaqsDataAction = (date) => ({
    type: FAQS_DATA_REQUEST,
})

export const addNewFaqsDataAction = (data) => ({
    type: ADD_NEW_FAQS_DATA_REQUEST,
    payload: data
})

export const fetchFaqsDetailAction = (data) => ({
    type: FAQS_DETAILS_DATA_REQUEST,
    payload: data
})


export const deleteFaqsAction = (data) => ({
    type: DELETE_FAQS_DATA_REQUEST,
    payload: data
})

export const updateFaqsAction = (data) => ({
    type: UPDATE_FAQS_DATA_REQUEST,
    payload: data
})
