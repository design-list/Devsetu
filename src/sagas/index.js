import { takeEvery, all, takeLatest } from 'redux-saga/effects';
import { addNewPujaSaga, deletePujaSaga, fetchAllWebPujaSaga, fetchAllPujaSaga, pujaDetialPageSaga, pujaDetialSaga, updatePujaSaga } from './pujaSaga';
import { addNewChadhavaSaga, deleteChadhavaSaga, fetchAllChadhavaSaga, chadhavaDetialSaga, updateChadhavaSaga, fetchAllWebChadhavaSaga, chadhavaWebDetialSaga } from './chadhavaSaga';
import { ADD_NEW_PUJA_DATA_REQUEST, DELETE_PUJA_DATA_REQUEST, PUJA_DATA_REQUEST, PUJA_DETAILS_BY_SLUG_REQUEST, PUJA_DETAILS_DATA_REQUEST, PUJA_PAGE_DATA_REQUEST, UPDATE_PUJA_DATA_REQUEST } from '@/redux/types/pujaTypes';
import { ADD_NEW_CHADHAVA_DATA_REQUEST, DELETE_CHADHAVA_DATA_REQUEST, CHADHAVA_DATA_REQUEST, CHADHAVA_DETAILS_DATA_REQUEST, UPDATE_CHADHAVA_DATA_REQUEST, CHADHAVA_WEB_DATA_REQUEST, CHADHAVA_WEB_DETAILS_DATA_REQUEST } from '@/redux/types/chadhavaTypes';
import { addNewArticelSaga, ArticelDetialSaga, deleteArticelSaga, fetchAllArticelSaga, updateArticelSaga } from './articelSaga';
import { ADD_NEW_ARTICLES_DATA_REQUEST, ARTICLES_DATA_REQUEST, ARTICLES_DETAILS_DATA_REQUEST, UPDATE_ARTICLES_DATA_REQUEST } from '@/redux/types/articelsTypes';
import { fetchAllHomeSaga } from './homeSaga';
import { HOME_DATA_REQUEST } from '@/redux/types/homeTypes';
import { ADD_NEW_CART_REQUEST, CART_DATA_REQUEST, CART_DETAILS_REQUEST, UPDATE_CART_REQUEST } from '@/redux/types/cartTypes';
import { addNewCartSaga, deleteCartSaga, fetchAllCartSaga, fetchCartDetailSaga, updateCartSaga } from './cartSaga';
import { ADD_NEW_FAQS_DATA_REQUEST, DELETE_FAQS_DATA_REQUEST, FAQS_DATA_REQUEST, FAQS_DETAILS_DATA_REQUEST, UPDATE_FAQS_DATA_REQUEST } from '@/redux/types/faqTypes';
import { addNewFaqsSaga, deleteFaqsSaga, FaqsDetialSaga, fetchAllFaqsSaga, updateFaqsSaga } from './faqsSaga';
import { ADD_NEW_OFFERINGS_DATA_REQUEST, DELETE_OFFERINGS_DATA_REQUEST, OFFERINGS_DATA_REQUEST, OFFERINGS_DETAILS_DATA_REQUEST, UPDATE_OFFERINGS_DATA_REQUEST } from '@/redux/types/offeringTypes';
import { addNewOfferingSaga, deleteOfferingSaga, fetchAllOfferingSaga, OfferingDetialSaga, updateOfferingSaga } from './offeringSaga';
import { ADD_NEW_PACKAGE_DATA_REQUEST, DELETE_PACKAGE_DATA_REQUEST, PACKAGE_DATA_REQUEST, PACKAGE_DETAILS_DATA_REQUEST, UPDATE_PACKAGE_DATA_REQUEST } from '@/redux/types/packageTypes';
import { addNewPackageSaga, deletePackageSaga, fetchAllPackageSaga, PackageDetialSaga, updatePackageSaga } from './packageSaga';
import { addNewUserDetailSaga, fetchAllUserDetailSaga } from './userDetailSaga';
import { ADD_NEW_USER_DETAILS_REQUEST, USER_DETAILS_REQUEST } from '@/redux/types/userDetailsTypes';
import { paymentOrderSaga, paymentOrderVerifySaga } from './paymentSaga';
import { PAYMENT_OREDR_REQUEST, PAYMENT_OREDR_VERIFY_REQUEST } from '@/redux/types/paymentTypes';
import { USER_LOGIN_REQUEST, USER_REGISTRATION_REQUEST } from '@/redux/types/usersLoginTypes';
import { userLoginSaga, userRegistrationSaga } from './userLoginSaga';

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

        takeLatest(FAQS_DATA_REQUEST, fetchAllFaqsSaga),
        takeLatest(ADD_NEW_FAQS_DATA_REQUEST, addNewFaqsSaga),
        takeLatest(FAQS_DETAILS_DATA_REQUEST, FaqsDetialSaga),
        takeLatest(UPDATE_FAQS_DATA_REQUEST, updateFaqsSaga),
        takeLatest(DELETE_FAQS_DATA_REQUEST, deleteFaqsSaga),

        takeLatest(PACKAGE_DATA_REQUEST, fetchAllPackageSaga),
        takeLatest(ADD_NEW_PACKAGE_DATA_REQUEST, addNewPackageSaga),
        takeLatest(PACKAGE_DETAILS_DATA_REQUEST, PackageDetialSaga),
        takeLatest(UPDATE_PACKAGE_DATA_REQUEST, updatePackageSaga),
        takeLatest(DELETE_PACKAGE_DATA_REQUEST, deletePackageSaga),

        takeLatest(OFFERINGS_DATA_REQUEST, fetchAllOfferingSaga),
        takeLatest(ADD_NEW_OFFERINGS_DATA_REQUEST, addNewOfferingSaga),
        takeLatest(OFFERINGS_DETAILS_DATA_REQUEST, OfferingDetialSaga),
        takeLatest(UPDATE_OFFERINGS_DATA_REQUEST, updateOfferingSaga),
        takeLatest(DELETE_OFFERINGS_DATA_REQUEST, deleteOfferingSaga),

        takeLatest(HOME_DATA_REQUEST, fetchAllHomeSaga),

        takeLatest(USER_DETAILS_REQUEST, fetchAllUserDetailSaga),
        takeLatest(ADD_NEW_USER_DETAILS_REQUEST, addNewUserDetailSaga),

        takeLatest(CART_DATA_REQUEST, fetchAllCartSaga),
        takeLatest(CART_DETAILS_REQUEST, fetchCartDetailSaga),
        takeLatest(ADD_NEW_CART_REQUEST, addNewCartSaga),
        takeLatest(UPDATE_CART_REQUEST, updateCartSaga),

        takeLatest(PAYMENT_OREDR_REQUEST, paymentOrderSaga),
        takeLatest(PAYMENT_OREDR_VERIFY_REQUEST, paymentOrderVerifySaga),

        takeLatest(USER_LOGIN_REQUEST, userLoginSaga),
        takeLatest(USER_REGISTRATION_REQUEST, userRegistrationSaga),

    ]);
}

export default rootSaga;