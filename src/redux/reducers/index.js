import { combineReducers } from 'redux';
import counter from './countReducer';
import loader from './loader';
import pujas from './pujaReduces'
import chadhavas from './chadhavaReduces'
import articels from './articelsReduces '
import home from './homeReduces'
import faqs from './faqsReduces'
import offering from './offeringReduces'
import packages from './packageReduces'
import cart from './cartReducer'
import userDetails from './userDetialsReduces'
import payment from './paymentReduces'
import loginUser from './userLoginReduces'

export default combineReducers({
   count: counter,
   loader,
   pujas,
   chadhavas,
   articels,
   home,
   offering,
   faqs,
   packages,
   cart,
   userDetails,
   payment,
   loginUser
})
