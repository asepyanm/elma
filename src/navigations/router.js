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
},{
  transitionConfig: noTransitionConfig
});

export default navigator;