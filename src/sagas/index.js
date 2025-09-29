import { takeEvery, all, takeLatest } from 'redux-saga/effects';
import { addNewPujaSaga, deletePujaSaga, fetchAllPujaSaga, pujaDetialSaga, updatePujaSaga } from './pujaSaga';
import { addNewChadhavaSaga, deleteChadhavaSaga, fetchAllChadhavaSaga, chadhavaDetialSaga, updateChadhavaSaga } from './chadhavaSaga';
import { ADD_NEW_PUJA_DATA_REQUEST, DELETE_PUJA_DATA_REQUEST, PUJA_DATA_REQUEST, PUJA_DETAILS_DATA_REQUEST, UPDATE_PUJA_DATA_REQUEST } from '@/redux/types/pujaTypes';
import { ADD_NEW_CHADHAVA_DATA_REQUEST, DELETE_CHADHAVA_DATA_REQUEST, CHADHAVA_DATA_REQUEST, CHADHAVA_DETAILS_DATA_REQUEST, UPDATE_CHADHAVA_DATA_REQUEST } from '@/redux/types/chadhavaTypes';

function* rootSaga() {
    yield all([
        takeLatest(PUJA_DATA_REQUEST, fetchAllPujaSaga),
        takeLatest(ADD_NEW_PUJA_DATA_REQUEST, addNewPujaSaga),
        takeLatest(PUJA_DETAILS_DATA_REQUEST, pujaDetialSaga),
        takeLatest(UPDATE_PUJA_DATA_REQUEST, updatePujaSaga),
        takeLatest(DELETE_PUJA_DATA_REQUEST, deletePujaSaga),

        takeLatest(CHADHAVA_DATA_REQUEST, fetchAllChadhavaSaga),
        takeLatest(ADD_NEW_CHADHAVA_DATA_REQUEST, addNewChadhavaSaga),
        takeLatest(CHADHAVA_DETAILS_DATA_REQUEST, chadhavaDetialSaga),
        takeLatest(UPDATE_CHADHAVA_DATA_REQUEST, updateChadhavaSaga),
        takeLatest(DELETE_CHADHAVA_DATA_REQUEST, deleteChadhavaSaga),
    ]);
}

export default rootSaga;