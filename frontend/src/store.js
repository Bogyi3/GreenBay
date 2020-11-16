import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import { composeWithDevTools } from 'redux-devtools-extension';
import storage from 'redux-persist/lib/storage';
import rootReducer from './reducers';

const persistConfig = {
  key: 'rootReducer',
  storage,
};

const presistedReducer = persistReducer(persistConfig, rootReducer);
const store = createStore(presistedReducer,
  composeWithDevTools(applyMiddleware(thunk)));
const persistor = persistStore(store);
export { persistor, store };
