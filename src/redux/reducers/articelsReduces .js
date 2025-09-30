import { ADD_NEW_ARTICLES_DATA_FAILED, ADD_NEW_ARTICLES_DATA_RESPONSE, ARTICLES_DATA_RESPONSE, ARTICLES_DATA_FAILED, ARTICLES_DETAILS_DATA_RESPONSE, ARTICLES_DETAILS_DATA_FAILED } from "../types/articelsTypes"


const initialState = {
    allArticels: null,
    addedArticels: null,
    articelDetail: null,
}

export default function reducer(state = initialState, action) {
    switch (action.type) {

        case ARTICLES_DATA_RESPONSE:
            return { ...state, allARTICELS: action.payload }
        case ARTICLES_DATA_FAILED:
            return { ...state, allARTICELS: action.payload }

        case ADD_NEW_ARTICLES_DATA_RESPONSE:
            return { ...state, addedArticels: action.payload }
        case ADD_NEW_ARTICLES_DATA_FAILED:
            return { ...state, addedArticels: action.payload }

        case ARTICLES_DETAILS_DATA_RESPONSE:
            return { ...state, articelDetail: action.payload }
        case ARTICLES_DETAILS_DATA_FAILED:
            return { ...state, articelDetail: action.payload }

        default:
            return state
    }
}
