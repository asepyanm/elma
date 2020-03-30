const initialState = { 
    loaderStatus:false,
    //data des
    dataDesWin:'',
    dataDesWP: '', 
    dataDesDoneWin:'',
    dataDesDoneWP: '',
    dataDesOgpWin:'',
    dataDesOgpWP: '',
    dataOgp3Rev: '',
    dataOgp3Project: '',
    dataOgp6Rev: '',
    dataOgp6Project: '',
    dataOgp7Rev: '',
    dataOgp7Project: '',

    dataDesWinSubs:'',
    dataDesWPSubs: '',
    dataDesDoneWinSubs:'',
    dataDesDoneWPSubs: '',
    dataDesOgpWinSubs:'',
    dataDesOgpWPSubs: '',
    dataOgp3RevSubs: '',
    dataOgp3ProjectSubs: '',
    dataOgp6RevSubs: '',
    dataOgp6ProjectSubs: '',
    dataOgp7RevSubs: '',
    dataOgp7ProjectSubs: '',

    dataDesWinMitra:'',
    dataDesWPMitra: '',
    dataDesDoneWinMitra:'',
    dataDesDoneWPMitra: '',
    dataDesOgpWinMitra:'',
    dataDesOgpWPMitra: '',
    dataOgp3RevMitra: '',
    dataOgp3ProjectMitra: '',
    dataOgp6RevMitra: '',
    dataOgp6ProjectMitra: '',
    dataOgp7RevMitra: '',
    dataOgp7ProjectMitra: '',

    dataDesWinTelkom:'',
    dataDesWPTelkom: '',
    dataDesDoneWinTelkom:'',
    dataDesDoneWPTelkom: '',
    dataDesOgpWinTelkom:'',
    dataDesOgpWPTelkom: '',
    dataOgp3RevTelkom: '',
    dataOgp3ProjectTelkom: '',
    dataOgp6RevTelkom: '',
    dataOgp6ProjectTelkom: '',
    dataOgp7RevTelkom: '',
    dataOgp7ProjectTelkom: '',

    detailDone: [],
    detailDoneSubs: [],
    detailDoneMitra: [],
    detailDoneTelkom: [],

    detailOgp: [],
    detailOgpSubs: [],
    detailOgpMitra: [],
    detailOgpTelkom: [],

    detailOgp3: [],
    detailOgp3Subs: [],
    detailOgp3Mitra: [],
    detailOgp3Telkom: [],

    detailOgp6: [],
    detailOgp6Subs: [],
    detailOgp6Mitra: [],
    detailOgp6Telkom: [],

    detailOgp7: [],
    detailOgp7Subs: [],
    detailOgp7Mitra: [],
    detailOgp7Telkom: [],
    
  };
  
  const MonitorDesReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'MONITOR_KB_DES_REJECTED':
        return{
          ...state, 
        }
      break;
      
      case 'MONITOR_KB_DES_PENDING':
        return{
          ...state, 
        }
      break;
  
      case 'MONITOR_KB_DES_FULFILLED':
        return{
          ...state, 
          //Current status
          dataDesWin:action.payload.data[0].KB_REV,
          dataDesWP: action.payload.data[0].KB_PROJECT
        }
      break;
      case 'MONITOR_KB_DES_SUBS_FULFILLED':
        return{
          ...state, 
          //Current status
          dataDesWinSubs:action.payload.data[0].KB_REV,
          dataDesWPSubs: action.payload.data[0].KB_PROJECT
        }
      break;
      case 'MONITOR_KB_DES_MITRA_FULFILLED':
        return{
          ...state, 
          //Current status
          dataDesWinMitra:action.payload.data[0].KB_REV,
          dataDesWPMitra: action.payload.data[0].KB_PROJECT
        }
      break;
      case 'MONITOR_KB_DES_TELKOM_FULFILLED':
        return{
          ...state, 
          //Current status
          dataDesWinTelkom:action.payload.data[0].KB_REV,
          dataDesWPTelkom: action.payload.data[0].KB_PROJECT
        }
      break;

      case 'MONITOR_KB_DES_DONE_REJECTED':
        return{
          ...state, 
        }
      break;
      
      case 'MONITOR_KB_DES_DONE_PENDING':
        return{
          ...state, 
        }
      break;
  
      case 'MONITOR_KB_DES_DONE_FULFILLED':
        return{
          ...state, 
          //Current status
          dataDesDoneWin:action.payload.data[0].KB_REV,
          dataDesDoneWP: action.payload.data[0].KB_PROJECT
        }
      break;
      case 'MONITOR_KB_DES_DONE_SUBS_FULFILLED':
        return{
          ...state, 
          //Current status
          dataDesDoneWinSubs:action.payload.data[0].KB_REV,
          dataDesDoneWPSubs: action.payload.data[0].KB_PROJECT
        }
      break;
      case 'MONITOR_KB_DES_DONE_MITRA_FULFILLED':
        return{
          ...state, 
          //Current status
          dataDesDoneWinMitra:action.payload.data[0].KB_REV,
          dataDesDoneWPMitra: action.payload.data[0].KB_PROJECT
        }
      break;
      case 'MONITOR_KB_DES_DONE_TELKOM_FULFILLED':
        return{
          ...state, 
          //Current status
          dataDesDoneWinTelkom:action.payload.data[0].KB_REV,
          dataDesDoneWPTelkom: action.payload.data[0].KB_PROJECT
        }
      break;

      case 'MONITOR_KB_DES_OGP_REJECTED':
        return{
          ...state, 
        }
      break;
      
      case 'MONITOR_KB_DES_OGP_PENDING':
        return{
          ...state, 
        }
      break;
  
      case 'MONITOR_KB_DES_OGP_FULFILLED':
        return{
          ...state, 
          //Current status
          dataDesOgpWin:action.payload.data[0].KB_REV,
          dataDesOgpWP: action.payload.data[0].KB_PROJECT
        }
      break;
      case 'MONITOR_KB_DES_OGP_SUBS_FULFILLED':
        return{
          ...state, 
          //Current status
          dataDesOgpWinSubs:action.payload.data[0].KB_REV,
          dataDesOgpWPSubs: action.payload.data[0].KB_PROJECT
        }
      break;
      case 'MONITOR_KB_DES_OGP_MITRA_FULFILLED':
        return{
          ...state, 
          //Current status
          dataDesOgpWinMitra:action.payload.data[0].KB_REV,
          dataDesOgpWPMitra: action.payload.data[0].KB_PROJECT
        }
      break;
      case 'MONITOR_KB_DES_OGP_TELKOM_FULFILLED':
        return{
          ...state, 
          //Current status
          dataDesOgpWinTelkom:action.payload.data[0].KB_REV,
          dataDesOgpWPTelkom: action.payload.data[0].KB_PROJECT
        }
      break;

      case 'MONITOR_KB_DES_OGP_DATA_REJECTED':
        return{
          ...state, 
        }
      break;
      
      case 'MONITOR_KB_DES_OGP_DATA_PENDING':
        return{
          ...state, 
        }
      break;
  
      case 'MONITOR_KB_DES_OGP_DATA_FULFILLED':
        return{
          ...state, 
          //Current status
          dataOgp3Rev: action.payload.data[0].REVENUE,
          dataOgp3Project: action.payload.data[0].PROJECT,
          dataOgp6Rev: action.payload.data[1].REVENUE,
          dataOgp6Project: action.payload.data[1].PROJECT,
          dataOgp7Rev: action.payload.data[2].REVENUE,
          dataOgp7Project: action.payload.data[2].PROJECT
        }
      break;
      case 'MONITOR_KB_DES_OGP_DATA_SUBS_FULFILLED':
        return{
          ...state, 
          //Current status
          dataOgp3RevSubs: action.payload.data[0].REVENUE,
          dataOgp3ProjectSubs: action.payload.data[0].PROJECT,
          dataOgp6RevSubs: action.payload.data[1].REVENUE,
          dataOgp6ProjectSubs: action.payload.data[1].PROJECT,
          dataOgp7RevSubs: action.payload.data[2].REVENUE,
          dataOgp7ProjectSubs: action.payload.data[2].PROJECT
        }
      break;
      case 'MONITOR_KB_DES_OGP_DATA_MITRA_FULFILLED':
        return{
          ...state, 
          //Current status
          dataOgp3RevMitra: action.payload.data[0].REVENUE,
          dataOgp3ProjectMitra: action.payload.data[0].PROJECT,
          dataOgp6RevMitra: action.payload.data[1].REVENUE,
          dataOgp6ProjectMitra: action.payload.data[1].PROJECT,
          dataOgp7RevMitra: action.payload.data[2].REVENUE,
          dataOgp7ProjectMitra: action.payload.data[2].PROJECT
        }
      break;
      case 'MONITOR_KB_DES_OGP_DATA_TELKOM_FULFILLED':
        return{
          ...state, 
          //Current status
          dataOgp3RevTelkom: action.payload.data[0].REVENUE,
          dataOgp3ProjectTelkom: action.payload.data[0].PROJECT,
          dataOgp6RevTelkom: action.payload.data[1].REVENUE,
          dataOgp6ProjectTelkom: action.payload.data[1].PROJECT,
          dataOgp7RevTelkom: action.payload.data[2].REVENUE,
          dataOgp7ProjectTelkom: action.payload.data[2].PROJECT
        }
      break;

      case 'MONITOR_KB_DES_DETAIL_DONE_REJECTED':
        return{
          ...state, 
        }
      break;
      
      case 'MONITOR_KB_DES_DETAIL_DONE_PENDING':
        return{
          ...state, 
        }
      break;
  
      case 'MONITOR_KB_DES_DETAIL_DONE_FULFILLED':
        return{
          ...state, 
          detailDone : action.payload.data
        }
      break;
      case 'MONITOR_KB_DES_DETAIL_DONE_SUBS_FULFILLED':
        return{
          ...state, 
          detailDoneSubs: action.payload.data
        }
      break;
      case 'MONITOR_KB_DES_DETAIL_DONE_MITRA_FULFILLED':
        return{
          ...state, 
          detailDoneMitra : action.payload.data
        }
      break;
      case 'MONITOR_KB_DES_DETAIL_DONE_TELKOM_FULFILLED':
        return{
          ...state, 
          detailDoneTelkom : action.payload.data
        }
      break;

      case 'MONITOR_KB_DES_DETAIL_OGP_REJECTED':
      return{
        ...state, 
      }
     break;
    
      case 'MONITOR_KB_DES_DETAIL_OGP_PENDING':
      return{
        ...state, 
        }
      break;

      case 'MONITOR_KB_DES_DETAIL_OGP_FULFILLED':
      return{
        ...state, 
        //Current status
        detailOgp : action.payload.data
      }
      break;
      case 'MONITOR_KB_DES_DETAIL_OGP_SUBS_FULFILLED':
      return{
        ...state, 
        //Current status
        detailOgpSubs : action.payload.data
      }
      break;
      case 'MONITOR_KB_DES_DETAIL_OGP_MITRA_FULFILLED':
      return{
        ...state, 
        //Current status
        detailOgpMitra : action.payload.data
      }
      break;
      case 'MONITOR_KB_DES_DETAIL_OGP_TELKOM_FULFILLED':
      return{
        ...state, 
        //Current status
        detailOgpTelkom : action.payload.data
      }
      break;
      
      case 'MONITOR_KB_DES_DETAIL_OGP_PROGRESS_3_FULFILLED':
      return{
        ...state, 
        //Current status
        detailOgp3 : action.payload.data
      }
    break;
    case 'MONITOR_KB_DES_DETAIL_OGP_PROGRESS_3_SUBS_FULFILLED':
      return{
        ...state, 
        //Current status
        detailOgp3Subs : action.payload.data
      }
    break;
    case 'MONITOR_KB_DES_DETAIL_OGP_PROGRESS_3_MITRA_FULFILLED':
      return{
        ...state, 
        //Current status
        detailOgp3Mitra : action.payload.data
      }
    break;
    case 'MONITOR_KB_DES_DETAIL_OGP_PROGRESS_3_TELKOM_FULFILLED':
      return{
        ...state, 
        //Current status
        detailOgp3Telkom : action.payload.data
      }
    break;

    case 'MONITOR_KB_DES_DETAIL_OGP_PROGRESS_6_FULFILLED':
      return{
        ...state, 
        //Current status
        detailOgp6 : action.payload.data
      }
    break;
    case 'MONITOR_KB_DES_DETAIL_OGP_PROGRESS_6_SUBS_FULFILLED':
      return{
        ...state, 
        //Current status
        detailOgp6Subs : action.payload.data
      }
    break;
    case 'MONITOR_KB_DES_DETAIL_OGP_PROGRESS_6_MITRA_FULFILLED':
      return{
        ...state, 
        //Current status
        detailOgp6Mitra : action.payload.data
      }
    break;
    case 'MONITOR_KB_DES_DETAIL_OGP_PROGRESS_6_TELKOM_FULFILLED':
      return{
        ...state, 
        //Current status
        detailOgp6Telkom : action.payload.data
      }
    break;

    case 'MONITOR_KB_DES_DETAIL_OGP_PROGRESS_7_FULFILLED':
      return{
        ...state, 
        //Current status
        detailOgp7 : action.payload.data
      }
    break;
    case 'MONITOR_KB_DES_DETAIL_OGP_PROGRESS_7_SUBS_FULFILLED':
      return{
        ...state, 
        //Current status
        detailOgp7Subs : action.payload.data
      }
    break;
    case 'MONITOR_KB_DES_DETAIL_OGP_PROGRESS_7_MITRA_FULFILLED':
      return{
        ...state, 
        //Current status
        detailOgp7Mitra : action.payload.data
      }
    break;
    case 'MONITOR_KB_DES_DETAIL_OGP_PROGRESS_7_TELKOM_FULFILLED':
      return{
        ...state, 
        //Current status
        detailOgp7Telkom : action.payload.data
      }
    break;


      default:
        return state;
    }
  };
  
  export default MonitorDesReducer;