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

//detail screen Channel
import EbisDetailChannelScreen from '../pages/dashboard/screens/homeScreens/screens/CHANNEL/screens/detail_screens/EbisDetail';
import DesDetailChannelScreen from '../pages/dashboard/screens/homeScreens/screens/CHANNEL/screens/detail_screens/DesDetail';
import DbsDetailChannelScreen from '../pages/dashboard/screens/homeScreens/screens/CHANNEL/screens/detail_screens/DbsDetail';
import DgsDetailChannelScreen from '../pages/dashboard/screens/homeScreens/screens/CHANNEL/screens/detail_screens/DgsDetail';

//detail screen kolom ebis channel
import ProspectDetailColumnProspectScreens from '../pages/dashboard/screens/homeScreens/screens/CHANNEL/screens/detail_screens/prospectChannel/prospectDetailColomn';
import SubmissionDetailColumnProspectScreens from '../pages/dashboard/screens/homeScreens/screens/CHANNEL/screens/detail_screens/prospectChannel/submissionDetailColomn';
import WinDetailColumnProspectScreens from '../pages/dashboard/screens/homeScreens/screens/CHANNEL/screens/detail_screens/prospectChannel/winDetailColomn';
import BillcomDetailColumnProspectScreens from '../pages/dashboard/screens/homeScreens/screens/CHANNEL/screens/detail_screens/prospectChannel/billcomDetailColomn';

//detail screen BIG MEGA DEAL
import EbisDetailBMDScreen from '../pages/dashboard/screens/homeScreens/screens/BIGMEGADEAL/screens/detail_screens/EbisDetail';
import DesDetailBMDScreen from '../pages/dashboard/screens/homeScreens/screens/BIGMEGADEAL/screens/detail_screens/DesDetail';
import DbsDetailBMDScreen from '../pages/dashboard/screens/homeScreens/screens/BIGMEGADEAL/screens/detail_screens/DbsDetail';
import DgsDetailBMDScreen from '../pages/dashboard/screens/homeScreens/screens/BIGMEGADEAL/screens/detail_screens/DgsDetail';

//detail screen kolom ebis BIG MEGA DEAL
import ProspectDetailColumnProspectBMDScreens from '../pages/dashboard/screens/homeScreens/screens/BIGMEGADEAL/screens/detail_screens/prospectChannel/prospectDetailColomn';
import SubmissionDetailColumnProspectBMDScreens from '../pages/dashboard/screens/homeScreens/screens/BIGMEGADEAL/screens/detail_screens/prospectChannel/submissionDetailColomn';
import WinDetailColumnProspectBMDScreens from '../pages/dashboard/screens/homeScreens/screens/BIGMEGADEAL/screens/detail_screens/prospectChannel/winDetailColomn';
import BillcomDetailColumnProspectBMDScreens from '../pages/dashboard/screens/homeScreens/screens/BIGMEGADEAL/screens/detail_screens/prospectChannel/billcomDetailColomn';

//monitor_kb LOP
import MonitorKB from '../pages/dashboard/screens/homeScreens/screens/LOP/screens/monitorkb_screen/index.js';
import DetailMonitorDone from '../pages/dashboard/screens/homeScreens/screens/LOP/screens/monitorkb_screen/detailMonitor';
import DetailMonitorOgp from '../pages/dashboard/screens/homeScreens/screens/LOP/screens/monitorkb_screen/detailMonitorOgp';
import DetailMonitorProgressOgp3 from '../pages/dashboard/screens/homeScreens/screens/LOP/screens/monitorkb_screen/detailMonitorProgressOgp3';
import DetailMonitorProgressOgp6 from '../pages/dashboard/screens/homeScreens/screens/LOP/screens/monitorkb_screen/detailMonitorProgressOgp6';
import DetailMonitorProgressOgp7 from '../pages/dashboard/screens/homeScreens/screens/LOP/screens/monitorkb_screen/detailMonitorProgressOgp7';

//monitor_kl LOP
import MonitorKL from                   '../pages/dashboard/screens/homeScreens/screens/LOP/screens/monitorkl_screen/index.js';
import DetailMonitorDoneKL from         '../pages/dashboard/screens/homeScreens/screens/LOP/screens/monitorkl_screen/detailMonitor';
import DetailMonitorOgpKL from          '../pages/dashboard/screens/homeScreens/screens/LOP/screens/monitorkl_screen/detailMonitorOgp';
import DetailMonitorProgressOgp3KL from '../pages/dashboard/screens/homeScreens/screens/LOP/screens/monitorkl_screen/detailMonitorProgressOgp3';
import DetailMonitorProgressOgp6KL from '../pages/dashboard/screens/homeScreens/screens/LOP/screens/monitorkl_screen/detailMonitorProgressOgp6';
import DetailMonitorProgressOgp7KL from '../pages/dashboard/screens/homeScreens/screens/LOP/screens/monitorkl_screen/detailMonitorProgressOgp7';

//monitor-dev LOP
import MonitorDev                      from '../pages/dashboard/screens/homeScreens/screens/LOP/screens/monitordev_screen/index.js';
import DetailMonitorDev                from '../pages/dashboard/screens/homeScreens/screens/LOP/screens/monitordev_screen/detailMonitorDev';
import DetailMonitorProgressOnSchedule from '../pages/dashboard/screens/homeScreens/screens/LOP/screens/monitordev_screen/detailMonitorProgressOnSchedule';
import DetailMonitorProgressDelay      from '../pages/dashboard/screens/homeScreens/screens/LOP/screens/monitordev_screen/detailMonitorProgressDelay';

//REKAP
import detailRekapWin  from '../pages/dashboard/screens/rekapScreens/rekap_screens/detailRekapWin'
import detailRekapLose from '../pages/dashboard/screens/rekapScreens/rekap_screens/detailRekapLose'

// chat
import roomList from '../pages/dashboard/screens/chatScreens/roomList'
import detailChatRoomScreens from '../pages/dashboard/screens/chatScreens/detailChatRoomScreens'

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
  roomList: { screen: roomList},
  //detail screen
  EbisDetailLOP:{screen:EbisDetailScreen},
  DesDetailLOP :{screen:DesDetailScreen},
  DbsDetailLOP :{screen:DbsDetailScreen},
  DgsDetailLOP :{screen:DgsDetailScreen},

  //detail screen Channel
  EbisDetailChannel:{screen:EbisDetailChannelScreen},
  DesDetailChannel :{screen:DesDetailChannelScreen},
  DbsDetailChannel :{screen:DbsDetailChannelScreen},
  DgsDetailChannel :{screen:DgsDetailChannelScreen},

  //detail screen kolom ebis channel
  EbisDetailColumnProspect:{screen:ProspectDetailColumnProspectScreens},
  SubmissionDetailColumnProspect:{screen:SubmissionDetailColumnProspectScreens},
  WinDetailColumnProspect:{screen:WinDetailColumnProspectScreens},
  BillcomDetailColumnProspect:{screen:BillcomDetailColumnProspectScreens},

  //detail screen BIG MEGA DEAL
  EbisDetailBMD :{screen:EbisDetailBMDScreen},
  DesDetailBMD :{screen:DesDetailBMDScreen},
  DbsDetailBMD :{screen:DbsDetailBMDScreen},
  DgsDetailBMD :{screen:DgsDetailBMDScreen},

  //detail screen kolom ebis BIG MEGA DEAL
  EbisDetailColumnProspectBMD:{screen:ProspectDetailColumnProspectBMDScreens},
  SubmissionDetailColumnProspectBMD:{screen:SubmissionDetailColumnProspectBMDScreens},
  WinDetailColumnProspectBMD:{screen:WinDetailColumnProspectBMDScreens},
  BillcomDetailColumnProspectBMD:{screen:BillcomDetailColumnProspectBMDScreens},
  
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
   roomList:{
    screen:roomList
    //,
    // navigationOptions:{
    //   header:null
    // }
  },
     detailChatRoomScreens:{
    screen:detailChatRoomScreens
    //,
    // navigationOptions:{
    //   header:null
    // }
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
  DetailMonitorProgressOgp3: {
    screen: DetailMonitorProgressOgp3,
    navigationOptions: {
      header: null
    }
  },
  DetailMonitorProgressOgp6: {
    screen: DetailMonitorProgressOgp6,
    navigationOptions: {
      header: null
    }
  },
  DetailMonitorProgressOgp7: {
    screen: DetailMonitorProgressOgp7,
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
  },
  DetailMonitorProgressOgp3KL: {
    screen: DetailMonitorProgressOgp3KL,
    navigationOptions: {
      header: null
    }
  },
  DetailMonitorProgressOgp6KL: {
    screen: DetailMonitorProgressOgp6KL,
    navigationOptions: {
      header: null
    }
  },
  DetailMonitorProgressOgp7KL: {
    screen: DetailMonitorProgressOgp7KL,
    navigationOptions: {
      header: null
    }
  },
  MonitorDev: {
    screen: MonitorDev,
    navigationOptions: {
      header: null
    }
  },
  DetailMonitorDev: {
    screen: DetailMonitorDev,
    navigationOptions: {
      header: null
    }
  },
  DetailMonitorProgressOnSchedule: {
    screen: DetailMonitorProgressOnSchedule,
    navigationOptions: {
      header: null
    }
  },
  DetailMonitorProgressDelay: {
    screen: DetailMonitorProgressDelay,
    navigationOptions: {
      header: null
    }
  },
  detailRekapWin: {
    screen: detailRekapWin,
    navigationOptions: {
      header: null
    }
  },
  detailRekapLose: {
    screen: detailRekapLose,
    navigationOptions: {
      header: null
    }
  },


},{
  transitionConfig: noTransitionConfig
});

export default navigator;