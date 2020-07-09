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

//reducer Alert
import alertReducer from '../pages/dashboard/reducer/reducerAlert/reducerAlert';

//reducer Rekap
import rekapReducer from '../pages/dashboard/reducer/rekap/reducerRekap';

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

//reducer home Channel
import EbisReducerChannel from '../pages/dashboard/reducer/reducerChannel/reducerEBIS/reducerEBIS';
import DesReducerChannel from '../pages/dashboard/reducer/reducerChannel/reducerDES/reducerDES';
import DbsReducerChannel from '../pages/dashboard/reducer/reducerChannel/reducerDBS/reducerDBS';
import DgsReducerChannel from '../pages/dashboard/reducer/reducerChannel/reducerDGS/reducerDGS';

//reducer home Big Mega Deal
import EbisReducerBMD from '../pages/dashboard/reducer/reducerBigMegaDeal/reducerEBIS/reducerEBIS';
import DesReducerBMD from '../pages/dashboard/reducer/reducerBigMegaDeal/reducerDES/reducerDES';
import DbsReducerBMD from '../pages/dashboard/reducer/reducerBigMegaDeal/reducerDBS/reducerDBS';
import DgsReducerBMD from '../pages/dashboard/reducer/reducerBigMegaDeal/reducerDGS/reducerDGS';

//reducer detail
import EbisDetailReducer from '../pages/dashboard/reducer/reducerLOP/detailReducer/reducerEBIS/reducerDetailEbis';
import DesDetailReducer from '../pages/dashboard/reducer/reducerLOP/detailReducer/reducerDES/reducerDetailDes';
import DbsDetailReducer from '../pages/dashboard/reducer/reducerLOP/detailReducer/reducerDBS/reducerDetailDbs';
import DgsDetailReducer from '../pages/dashboard/reducer/reducerLOP/detailReducer/reducerDGS/reducerDetailDgs';

//monitor reducer
import MonitorEbisReducer from            '../pages/dashboard/reducer/reducerLOP/monitorReducer/monitorKB/reducerEBIS/reducerEbis';
import MonitorEbisProgressOgpReducer from '../pages/dashboard/reducer/reducerLOP/monitorReducer/monitorKB/reducerEBIS/reducerEbisProgressOgp';
import MonitorDesReducer from             '../pages/dashboard/reducer/reducerLOP/monitorReducer/monitorKB/reducerDES/reducerDes';
import MonitorDesProgressOgpReducer  from '../pages/dashboard/reducer/reducerLOP/monitorReducer/monitorKB/reducerDES/reducerDESProgressOgp';
import MonitorDbsReducer from             '../pages/dashboard/reducer/reducerLOP/monitorReducer/monitorKB/reducerDBS/reducerDBS';
import MonitorDbsProgressOgpReducer  from '../pages/dashboard/reducer/reducerLOP/monitorReducer/monitorKB/reducerDBS/reducerDBSProgressOgp';
import MonitorDgsReducer from             '../pages/dashboard/reducer/reducerLOP/monitorReducer/monitorKB/reducerDGS/reducerDGS';
import MonitorDgsProgressOgpReducer  from '../pages/dashboard/reducer/reducerLOP/monitorReducer/monitorKB/reducerDGS/reducerDGSProgressOgp';

import MonitorEbisReducerKL from            '../pages/dashboard/reducer/reducerLOP/monitorReducer/monitorKL/reducerEBIS/reducerEbis';
import MonitorEbisProgressOgpReducerKL from '../pages/dashboard/reducer/reducerLOP/monitorReducer/monitorKL/reducerEBIS/reducerEbisProgressOgp';
import MonitorDesReducerKL from             '../pages/dashboard/reducer/reducerLOP/monitorReducer/monitorKL/reducerDES/reducerDes';
import MonitorDesProgressOgpReducerKL from  '../pages/dashboard/reducer/reducerLOP/monitorReducer/monitorKL/reducerDES/reducerDESProgressOgp';
import MonitorDbsReducerKL from             '../pages/dashboard/reducer/reducerLOP/monitorReducer/monitorKL/reducerDBS/reducerDBS';
import MonitorDbsProgressOgpReducerKL from  '../pages/dashboard/reducer/reducerLOP/monitorReducer/monitorKL/reducerDBS/reducerDBSProgressOgp';
import MonitorDgsReducerKL from             '../pages/dashboard/reducer/reducerLOP/monitorReducer/monitorKL/reducerDGS/reducerDGS';
import MonitorDgsProgressOgpReducerKL from  '../pages/dashboard/reducer/reducerLOP/monitorReducer/monitorKL/reducerDGS/reducerDGSProgressOgp';

import MonitorEbisReducerDlv         from '../pages/dashboard/reducer/reducerLOP/monitorReducer/monitorDev/reducerEBIS/reducerEbis';
import MonitorEbisProgressReducerDlv from '../pages/dashboard/reducer/reducerLOP/monitorReducer/monitorDev/reducerEBIS/reducerEbisProgressDlv';
import MonitorDesReducerDlv          from '../pages/dashboard/reducer/reducerLOP/monitorReducer/monitorDev/reducerDES/reducerDes';
import MonitorDesProgressReducerDlv  from '../pages/dashboard/reducer/reducerLOP/monitorReducer/monitorDev/reducerDES/reducerDESProgressDlv';
import MonitorDbsReducerDlv          from '../pages/dashboard/reducer/reducerLOP/monitorReducer/monitorDev/reducerDBS/reducerDBS';
import MonitorDbsProgressReducerDlv  from '../pages/dashboard/reducer/reducerLOP/monitorReducer/monitorDev/reducerDBS/reducerDBSProgressDlv';
import MonitorDgsReducerDlv          from '../pages/dashboard/reducer/reducerLOP/monitorReducer/monitorDev/reducerDGS/reducerDGS';
import MonitorDgsProgressReducerDlv  from '../pages/dashboard/reducer/reducerLOP/monitorReducer/monitorDev/reducerDGS/reducerDGSProgressDlv';

//reducer treg LOP
import EbisTregReducer from '../pages/dashboard/screens/tregScreens/screens/LOP/screens/reducer/reducerEbisTreg';
import DesTregReducer from '../pages/dashboard/screens/tregScreens/screens/LOP/screens/reducer/reducerDesTreg';
import DbsTregReducer from '../pages/dashboard/screens/tregScreens/screens/LOP/screens/reducer/reducerDbsTreg';
import DgsTregReducer from '../pages/dashboard/screens/tregScreens/screens/LOP/screens/reducer/reducerDgsTreg';

//reducer treg ABC
import EbisTregReducerAbc from '../pages/dashboard/screens/tregScreens/screens/ABC/screens/reducer/reducerEbisTregAbc';
import DesTregReducerAbc from '../pages/dashboard/screens/tregScreens/screens/ABC/screens/reducer/reducerDesTregAbc';
import DbsTregReducerAbc from '../pages/dashboard/screens/tregScreens/screens/ABC/screens/reducer/reducerDbsTregAbc';
import DgsTregReducerAbc from '../pages/dashboard/screens/tregScreens/screens/ABC/screens/reducer/reducerDgsTregAbc';

//config persist
const config1 = {
  key: "primary",
  storage
};

const LoginReducer = persistReducer(config1, loginReducer);

const rootReducer = combineReducers({
  NavigationReducer,
  LoginReducer,

  //reducer Alert
  alertReducer,

  //reducer Rekap
  rekapReducer,

  //reducer home LOP
  EbisReducer,
  DesReducer,
  DbsReducer,
  DgsReducer,

  //reducer home ABC
  EbisReducerABC,
  DESReducerABC,
  DBSReducerABC,
  DGSReducerABC,

  //reducer home Channel
  EbisReducerChannel,
  DesReducerChannel,
  DbsReducerChannel,
  DgsReducerChannel,

  //reducer home Big Mega Deal
  EbisReducerBMD,
  DesReducerBMD,
  DbsReducerBMD,
  DgsReducerBMD,

  //reducer detail
  EbisDetailReducer,
  DesDetailReducer,
  DbsDetailReducer,
  DgsDetailReducer,

  //monitor reducer kb
  MonitorEbisReducer,
  MonitorEbisProgressOgpReducer,
  MonitorDesReducer,
  MonitorDesProgressOgpReducer,
  MonitorDbsReducer,
  MonitorDbsProgressOgpReducer,
  MonitorDgsReducer,
  MonitorDgsProgressOgpReducer,

  //monitor reducer kl
  MonitorEbisReducerKL,
  MonitorEbisProgressOgpReducerKL,
  MonitorDesReducerKL,
  MonitorDesProgressOgpReducerKL,
  MonitorDbsReducerKL,
  MonitorDbsProgressOgpReducerKL,
  MonitorDgsReducerKL,
  MonitorDgsProgressOgpReducerKL,

  //monitor reducer dev
  MonitorEbisReducerDlv,
  MonitorEbisProgressReducerDlv,
  MonitorDesReducerDlv,
  MonitorDesProgressReducerDlv,
  MonitorDbsReducerDlv,
  MonitorDbsProgressReducerDlv,
  MonitorDgsReducerDlv,
  MonitorDgsProgressReducerDlv,

  //reducer treg LOP
  EbisTregReducer,
  DesTregReducer,
  DbsTregReducer,
  DgsTregReducer,

  //reducer treg ABC
  EbisTregReducerAbc,
  DesTregReducerAbc,
  DbsTregReducerAbc,
  DgsTregReducerAbc
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