import { combineReducers } from 'redux';
import loginReducer from './loginReducer';
import listSellableReducer from './listSellableReducer';

const rootReducer = combineReducers({
  login: loginReducer,
  sellable: listSellableReducer,
});

export default rootReducer;
