import { ADD_NEW_PACKAGE_DATA_REQUEST, DELETE_PACKAGE_DATA_REQUEST, PACKAGE_DATA_REQUEST, 
    PACKAGE_DETAILS_DATA_REQUEST, UPDATE_PACKAGE_DATA_REQUEST,} from "../types/packageTypes"


export const requestPackageDataAction = (date) => ({
    type: PACKAGE_DATA_REQUEST,
})

export const addNewPackageDataAction = (data) => ({
    type: ADD_NEW_PACKAGE_DATA_REQUEST,
    payload: data
})

export const fetchPackageDetailAction = (data) => ({
    type: PACKAGE_DETAILS_DATA_REQUEST,
    payload: data
})


export const deletePackageAction = (data) => ({
    type: DELETE_PACKAGE_DATA_REQUEST,
    payload: data
})

export const updatePackageAction = (data) => ({
    type: UPDATE_PACKAGE_DATA_REQUEST,
    payload: data
})
