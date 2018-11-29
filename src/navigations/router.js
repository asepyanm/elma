import React from 'react'
import { Animated, Easing } from 'react-native'
import { StackNavigator, DrawerNavigator } from "react-navigation";

//drawer component
import DrawerComponent from '../navigations/components/drawerComponent';

//Login Screen
import Login from '../pages/login/screen/login/login';

//main dashboard
import Dashboard from '../pages/dashboard/dashboard';

//detail screen LOP
import EbisDetailScreen from '../pages/dashboard/screens/homeScreens/screens/LOP/screens/detail_screens/EbisDetail';
import DesDetailScreen from '../pages/dashboard/screens/homeScreens/screens/LOP/screens/detail_screens/DesDetail';
import DbsDetailScreen from '../pages/dashboard/screens/homeScreens/screens/LOP/screens/detail_screens/DbsDetail';
import DgsDetailScreen from '../pages/dashboard/screens/homeScreens/screens/LOP/screens/detail_screens/DgsDetail';

//monitor_kb LOP
import MonitorKB from '../pages/dashboard/screens/homeScreens/screens/LOP/screens/monitorkb_screen/index.js';
import DetailMonitorDone from '../pages/dashboard/screens/homeScreens/screens/LOP/screens/monitorkb_screen/detailMonitor';
import DetailMonitorOgp from '../pages/dashboard/screens/homeScreens/screens/LOP/screens/monitorkb_screen/detailMonitorOgp';

//monitor_kl LOP
import MonitorKL from '../pages/dashboard/screens/homeScreens/screens/LOP/screens/monitorkl_screen/index.js';
import DetailMonitorDoneKL from '../pages/dashboard/screens/homeScreens/screens/LOP/screens/monitorkl_screen/detailMonitor';
import DetailMonitorOgpKL from '../pages/dashboard/screens/homeScreens/screens/LOP/screens/monitorkl_screen/detailMonitorOgp';

const noTransitionConfig = () => ({
  transitionSpec: {
    duration: 0,
    timing: Animated.timing,
    easing: Easing.step0
  }
})

// Drawer stack
const MainStack = StackNavigator({
  MainDashboard: { screen: Dashboard},

  //detail screen
  EbisDetailLOP:{screen:EbisDetailScreen},
  DesDetailLOP :{screen:DesDetailScreen},
  DbsDetailLOP :{screen:DbsDetailScreen},
  DgsDetailLOP :{screen:DgsDetailScreen},
},{
  navigationOptions:{
    header:null
  }
})

//primary stack
const navigator = StackNavigator({
  login: {
    screen: Login,
    navigationOptions:{
      header:null
    }
  },
  Main:{
    screen:MainStack,
    navigationOptions:{
      header:null
    }
  },
  MonitorKB: {
    screen: MonitorKB,
    navigationOptions: {
      header: null
    }
  },
  DetailMonitorDone: {
    screen: DetailMonitorDone,
    navigationOptions: {
      header: null
    }
  },
  DetailMonitorOgp: {
    screen: DetailMonitorOgp,
    navigationOptions: {
      header: null
    }
  },
  MonitorKL: {
    screen: MonitorKL,
    navigationOptions: {
      header: null
    }
  },
  DetailMonitorDoneKL: {
    screen: DetailMonitorDoneKL,
    navigationOptions: {
      header: null
    }
  },
  DetailMonitorOgpKL: {
    screen: DetailMonitorOgpKL,
    navigationOptions: {
      header: null
    }
  }
},{
  transitionConfig: noTransitionConfig
});

export default navigator;