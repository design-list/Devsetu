import { takeEvery, all, takeLatest } from 'redux-saga/effects';
import { addNewPujaSaga, deletePujaSaga, fetchAllWebPujaSaga, fetchAllPujaSaga, pujaDetialPageSaga, pujaDetialSaga, updatePujaSaga } from './pujaSaga';
import { addNewChadhavaSaga, deleteChadhavaSaga, fetchAllChadhavaSaga, chadhavaDetialSaga, updateChadhavaSaga, fetchAllWebChadhavaSaga, chadhavaWebDetialSaga } from './chadhavaSaga';
import { ADD_NEW_PUJA_DATA_REQUEST, DELETE_PUJA_DATA_REQUEST, PUJA_DATA_REQUEST, PUJA_DETAILS_BY_SLUG_REQUEST, PUJA_DETAILS_DATA_REQUEST, PUJA_PAGE_DATA_REQUEST, UPDATE_PUJA_DATA_REQUEST } from '@/redux/types/pujaTypes';
import { ADD_NEW_CHADHAVA_DATA_REQUEST, DELETE_CHADHAVA_DATA_REQUEST, CHADHAVA_DATA_REQUEST, CHADHAVA_DETAILS_DATA_REQUEST, UPDATE_CHADHAVA_DATA_REQUEST, CHADHAVA_WEB_DATA_REQUEST, CHADHAVA_WEB_DETAILS_DATA_REQUEST } from '@/redux/types/chadhavaTypes';
import { addNewArticelSaga, ArticelDetialSaga, deleteArticelSaga, fetchAllArticelSaga, updateArticelSaga } from './articelSaga';
import { ADD_NEW_ARTICLES_DATA_REQUEST, ARTICLES_DATA_REQUEST, ARTICLES_DETAILS_DATA_REQUEST, UPDATE_ARTICLES_DATA_REQUEST } from '@/redux/types/articelsTypes';
import { fetchAllHomeSaga } from './homeSaga';
import { HOME_DATA_REQUEST } from '@/redux/types/homeTypes';

function* rootSaga() {
    yield all([
        takeLatest(PUJA_DATA_REQUEST, fetchAllPujaSaga),
        takeLatest(PUJA_PAGE_DATA_REQUEST, fetchAllWebPujaSaga),
        takeLatest(ADD_NEW_PUJA_DATA_REQUEST, addNewPujaSaga),
        takeLatest(PUJA_DETAILS_DATA_REQUEST, pujaDetialSaga),
        takeLatest(PUJA_DETAILS_BY_SLUG_REQUEST, pujaDetialPageSaga),
        takeLatest(UPDATE_PUJA_DATA_REQUEST, updatePujaSaga),
        takeLatest(DELETE_PUJA_DATA_REQUEST, deletePujaSaga),

        takeLatest(CHADHAVA_DATA_REQUEST, fetchAllChadhavaSaga),
        takeLatest(CHADHAVA_WEB_DATA_REQUEST, fetchAllWebChadhavaSaga),
        takeLatest(ADD_NEW_CHADHAVA_DATA_REQUEST, addNewChadhavaSaga),
        takeLatest(CHADHAVA_DETAILS_DATA_REQUEST, chadhavaDetialSaga),
        takeLatest(CHADHAVA_WEB_DETAILS_DATA_REQUEST, chadhavaWebDetialSaga),
        takeLatest(UPDATE_CHADHAVA_DATA_REQUEST, updateChadhavaSaga),
        takeLatest(DELETE_CHADHAVA_DATA_REQUEST, deleteChadhavaSaga),

        takeLatest(ARTICLES_DATA_REQUEST, fetchAllArticelSaga),
        takeLatest(ADD_NEW_ARTICLES_DATA_REQUEST, addNewArticelSaga),
        takeLatest(ARTICLES_DETAILS_DATA_REQUEST, ArticelDetialSaga),
        takeLatest(UPDATE_ARTICLES_DATA_REQUEST, deleteArticelSaga),

        takeLatest(HOME_DATA_REQUEST, fetchAllHomeSaga),
    ]);
}

export default rootSaga;