import { createStore, combineReducers, applyMiddleware } from "redux";
import {
  persistCombineReducers,
  persistStore,
  persistReducer
} from "redux-persist";
import logger from 'redux-logger';
import storage from 'redux-persist/es/storage';
import promiseMiddleware from 'redux-promise-middleware';

import NavigationReducer  from '../navigations/reducer/navigationReducers';
import loginReducer       from '../pages/login/reducer/loginReducer';

//config persist
const config1 = {
  key: "primary",
  storage
};

const LoginReducer = persistReducer(config1, loginReducer);

const rootReducer = combineReducers({
  NavigationReducer,
  LoginReducer,
});

const middlewares = applyMiddleware( 
  promiseMiddleware(),
  logger
);

function configureStore() {
  let store = createStore(rootReducer, middlewares);
  let persistor = persistStore(store);
  return { persistor, store };
}

export default configureStore;