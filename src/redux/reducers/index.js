import { combineReducers } from 'redux';
import counter from './countReducer';
import loader from './loader';
import pujas from './pujaReduces'
import chadhavas from './chadhavaReduces'

export default combineReducers({
   count: counter,
   loader,
   pujas,
   chadhavas,

})
