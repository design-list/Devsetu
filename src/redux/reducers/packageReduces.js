import { ADD_NEW_PACKAGE_DATA_FAILED, ADD_NEW_PACKAGE_DATA_RESPONSE, PACKAGE_DATA_RESPONSE, PACKAGE_DATA_FAILED, PACKAGE_DETAILS_DATA_RESPONSE, 
    PACKAGE_DETAILS_DATA_FAILED} from "../types/packageTypes"


const initialState = {
    allPackage: [],
    addedPackage: null,
    PackageDetail: null,
}

export default function reducer(state = initialState, action) {
    switch (action.type) {

        case PACKAGE_DATA_RESPONSE:
            return { ...state, allPackage: action.payload }
        case PACKAGE_DATA_FAILED:
            return { ...state, allPackage: action.payload }

        case ADD_NEW_PACKAGE_DATA_RESPONSE:
            return { ...state, addedPackage: action.payload }
        case ADD_NEW_PACKAGE_DATA_FAILED:
            return { ...state, addedPackage: action.payload }

        case PACKAGE_DETAILS_DATA_RESPONSE:
            return { ...state, PackageDetail: action.payload }
        case PACKAGE_DETAILS_DATA_FAILED:
            return { ...state, PackageDetail: action.payload }

        default:
            return state
    }
}
