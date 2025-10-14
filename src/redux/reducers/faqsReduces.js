import { ADD_NEW_FAQS_DATA_FAILED, ADD_NEW_FAQS_DATA_RESPONSE, FAQS_DATA_RESPONSE, FAQS_DATA_FAILED, FAQS_DETAILS_DATA_RESPONSE, 
    FAQS_DETAILS_DATA_FAILED} from "../types/faqTypes"


const initialState = {
    allFaqs: [],
    pujaFaqs: [],
    chadhavaFaqs: [],
    addedFaqs: null,
    faqsDetail: null,
}

export default function reducer(state = initialState, action) {
    switch (action.type) {

        case FAQS_DATA_RESPONSE:
            return { ...state, allFaqs: action.payload, pujaFaqs: action.payload.filter(item => item.type === "puja"),
                chadhavaFaqs: action.payload.filter(item => item.type === "chadhava" ) }
        case FAQS_DATA_FAILED:
            return { ...state, allFaqs: action.payload }

        case ADD_NEW_FAQS_DATA_RESPONSE:
            return { ...state, addedFaqs: action.payload }
        case ADD_NEW_FAQS_DATA_FAILED:
            return { ...state, addedFaqs: action.payload }

        case FAQS_DETAILS_DATA_RESPONSE:
            return { ...state, faqsDetail: action.payload }
        case FAQS_DETAILS_DATA_FAILED:
            return { ...state, faqsDetail: action.payload }

        default:
            return state
    }
}
