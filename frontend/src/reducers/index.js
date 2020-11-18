import { combineReducers } from 'redux';
import loginReducer from './loginReducer';
import listSellableReducer from './listSellableReducer';
import selectItemReducer from './selectItemReducer';
import userDataReducer from './userDataReducer';

const rootReducer = combineReducers({
  login: loginReducer,
  sellable: listSellableReducer,
  selectedItem: selectItemReducer,
  userData: userDataReducer,
});

export default rootReducer;
