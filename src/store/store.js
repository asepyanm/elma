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

//reducer home LOP
import EbisReducer from '../pages/dashboard/reducer/reducerLOP/reducerEBIS/reducerEBIS';
import DesReducer from '../pages/dashboard/reducer/reducerLOP/reducerDES/reducerDES';
import DbsReducer from '../pages/dashboard/reducer/reducerLOP/reducerDBS/reducerDBS';
import DgsReducer from '../pages/dashboard/reducer/reducerLOP/reducerDGS/reducerDGS';

//reducer home ABC
import EbisReducerABC from '../pages/dashboard/reducer/reducerABC/reducerEBIS/reducerEBIS';
import DESReducerABC from '../pages/dashboard/reducer/reducerABC/redcuerDES/reducerDES';
import DBSReducerABC from '../pages/dashboard/reducer/reducerABC/reducerDBS/reducerDBS';
import DGSReducerABC from '../pages/dashboard/reducer/reducerABC/reducerDGS/reducerDGS';


//config persist
const config1 = {
  key: "primary",
  storage
};

const LoginReducer = persistReducer(config1, loginReducer);

const rootReducer = combineReducers({
  NavigationReducer,
  LoginReducer,

  //reducer home LOP
  EbisReducer,
  DesReducer,
  DbsReducer,
  DgsReducer,

  //reducer home ABC
  EbisReducerABC,
  DESReducerABC,
  DBSReducerABC,
  DGSReducerABC
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