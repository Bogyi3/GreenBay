import { combineReducers } from 'redux';
import loginReducer from './loginReducer';
import listSellableReducer from './listSellableReducer';
import selectItemReducer from './selectItemReducer';

const rootReducer = combineReducers({
  login: loginReducer,
  sellable: listSellableReducer,
  selectedItem: selectItemReducer,
});

export default rootReducer;
