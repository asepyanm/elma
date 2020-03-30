const initialState = { 
    loaderStatus:false,

    //data DBS
    dataDbsWin:'',
    dataDbsWP: '',
    dataDbsDoneWin:'',
    dataDbsDoneWP: '',
    dataDbsOgpWin:'',
    dataDbsOgpWP: '',
    dataOgp3Rev: '',
    dataOgp3Project: '',
    dataOgp6Rev: '',
    dataOgp6Project: '',
    dataOgp7Rev: '',
    dataOgp7Project: '',

    dataDbsWinSubs:'',
    dataDbsWPSubs: '',
    dataDbsDoneWinSubs:'',
    dataDbsDoneWPSubs: '',
    dataDbsOgpWinSubs:'',
    dataDbsOgpWPSubs: '',
    dataOgp3RevSubs: '',
    dataOgp3ProjectSubs: '',
    dataOgp6RevSubs: '',
    dataOgp6ProjectSubs: '',
    dataOgp7RevSubs: '',
    dataOgp7ProjectSubs: '',

    dataDbsWinMitra:'',
    dataDbsWPMitra: '',
    dataDbsDoneWinMitra:'',
    dataDbsDoneWPMitra: '',
    dataDbsOgpWinMitra:'',
    dataDbsOgpWPMitra: '',
    dataOgp3RevMitra: '',
    dataOgp3ProjectMitra: '',
    dataOgp6RevMitra: '',
    dataOgp6ProjectMitra: '',
    dataOgp7RevMitra: '',
    dataOgp7ProjectMitra: '',

    dataDbsWinTelkom:'',
    dataDbsWPTelkom: '',
    dataDbsDoneWinTelkom:'',
    dataDbsDoneWPTelkom: '',
    dataDbsOgpWinTelkom:'',
    dataDbsOgpWPTelkom: '',
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
  
  const MonitorDbsReducerDlv = (state = initialState, action) => {
    switch (action.type) {
      case 'MONITOR_DLV_DBS_REJECTED':
        return{
          ...state, 
        }
      break;
      
      case 'MONITOR_DLV_DBS_PENDING':
        return{
          ...state, 
        }
      break;
  
      case 'MONITOR_DLV_DBS_FULFILLED':
        return{
          ...state, 
          //Current status
          dataDbsWin:action.payload.data[0].WINREV,
          dataDbsWP: action.payload.data[0].WINPROJECT
        }
      break;
      case 'MONITOR_DLV_DBS_SUBS_FULFILLED':
        return{
          ...state, 
          //Current status
          dataDbsWinSubs:action.payload.data[0].WINREV,
          dataDbsWPSubs: action.payload.data[0].WINPROJECT
        }
      break;
      case 'MONITOR_DLV_DBS_MITRA_FULFILLED':
        return{
          ...state, 
          //Current status
          dataDbsWinMitra:action.payload.data[0].WINREV,
          dataDbsWPMitra: action.payload.data[0].WINPROJECT
        }
      break;
      case 'MONITOR_DLV_DBS_TELKOM_FULFILLED':
        return{
          ...state, 
          //Current status
          dataDbsWinTelkom:action.payload.data[0].WINREV,
          dataDbsWPTelkom: action.payload.data[0].WINPROJECT
        }
      break;

      case 'MONITOR_DLV_DBS_DONE_REJECTED':
        return{
          ...state, 
        }
      break;
      
      case 'MONITOR_DLV_DBS_DONE_PENDING':
        return{
          ...state, 
        }
      break;
  
      case 'MONITOR_DLV_DBS_DONE_FULFILLED':
        return{
          ...state, 
          //Current status
          dataDbsDoneWin:action.payload.data[0].KB_REV,
          dataDbsDoneWP: action.payload.data[0].KB_PROJECT
        }
      break;
      case 'MONITOR_DLV_DBS_DONE_SUBS_FULFILLED':
        return{
          ...state, 
          //Current status
          dataDbsDoneWinSubs:action.payload.data[0].KB_REV,
          dataDbsDoneWPSubs: action.payload.data[0].KB_PROJECT
        }
      break;
      case 'MONITOR_DLV_DBS_DONE_MITRA_FULFILLED':
        return{
          ...state, 
          //Current status
          dataDbsDoneWinMitra:action.payload.data[0].KB_REV,
          dataDbsDoneWPMitra: action.payload.data[0].KB_PROJECT
        }
      break;
      case 'MONITOR_DLV_DBS_DONE_TELKOM_FULFILLED':
        return{
          ...state, 
          //Current status
          dataDbsDoneWinTelkom:action.payload.data[0].KB_REV,
          dataDbsDoneWPTelkom: action.payload.data[0].KB_PROJECT
        }
      break;

      case 'MONITOR_DLV_DBS_OGP_REJECTED':
        return{
          ...state, 
        }
      break;
      
      case 'MONITOR_DLV_DBS_OGP_PENDING':
        return{
          ...state, 
        }
      break;
  
      case 'MONITOR_DLV_DBS_OGP_FULFILLED':
        return{
          ...state, 
          //Current status
          dataDbsOgpWin:action.payload.data[0].KB_REV,
          dataDbsOgpWP: action.payload.data[0].KB_PROJECT
        }
      break;
      case 'MONITOR_DLV_DBS_OGP_SUBS_FULFILLED':
        return{
          ...state, 
          //Current status
          dataDbsOgpWinSubs:action.payload.data[0].KB_REV,
          dataDbsOgpWPSubs: action.payload.data[0].KB_PROJECT
        }
      break;
      case 'MONITOR_DLV_DBS_OGP_MITRA_FULFILLED':
        return{
          ...state, 
          //Current status
          dataDbsOgpWinMitra:action.payload.data[0].KB_REV,
          dataDbsOgpWPMitra: action.payload.data[0].KB_PROJECT
        }
      break;
      case 'MONITOR_DLV_DBS_OGP_TELKOM_FULFILLED':
        return{
          ...state, 
          //Current status
          dataDbsOgpWinTelkom:action.payload.data[0].KB_REV,
          dataDbsOgpWPTelkom: action.payload.data[0].KB_PROJECT
        }
      break;

      case 'MONITOR_DLV_DBS_OGP_DATA_REJECTED':
        return{
          ...state, 
        }
      break;
      
      case 'MONITOR_DLV_DBS_OGP_DATA_PENDING':
        return{
          ...state, 
        }
      break;
  
      case 'MONITOR_DLV_DBS_OGP_DATA_FULFILLED':
        return{
          ...state, 
          //Current status
          dataOgp3Rev: action.payload.data[1].WIN,
          dataOgp3Project: action.payload.data[1].PROJECT,
          dataOgp7Rev: action.payload.data[0].WIN,
          dataOgp7Project: action.payload.data[0].PROJECT,

        }
      break;
      case 'MONITOR_DLV_DBS_OGP_DATA_SUBS_FULFILLED':
        return{
          ...state, 
          //Current status
          dataOgp3RevSubs: action.payload.data[1].WIN,
          dataOgp3ProjectSubs: action.payload.data[1].PROJECT,
          dataOgp7RevSubs: action.payload.data[0].WIN,
          dataOgp7ProjectSubs: action.payload.data[0].PROJECT,

        }
      break;
      case 'MONITOR_DLV_DBS_OGP_DATA_MITRA_FULFILLED':
        return{
          ...state, 
          //Current status
          dataOgp3RevMitra: action.payload.data[1].WIN,
          dataOgp3ProjectMitra: action.payload.data[1].PROJECT,
          dataOgp7RevMitra: action.payload.data[0].WIN,
          dataOgp7ProjectMitra: action.payload.data[0].PROJECT,

        }
      break;
      case 'MONITOR_DLV_DBS_OGP_DATA_TELKOM_FULFILLED':
        return{
          ...state, 
          //Current status
          dataOgp3RevTelkom: action.payload.data[1].WIN,
          dataOgp3ProjectTelkom: action.payload.data[1].PROJECT,
          dataOgp7RevTelkom: action.payload.data[0].WIN,
          dataOgp7ProjectTelkom: action.payload.data[0].PROJECT,

        }
      break;

      case 'MONITOR_DLV_DBS_DETAIL_DONE_FULFILLED':
        return{
          ...state, 
          //Current status
          detailDone : action.payload.data
        }
      break;
      case 'MONITOR_DLV_DBS_DETAIL_DONE_SUBS_FULFILLED':
        return{
          ...state, 
          //Current status
          detailDoneSubs : action.payload.data
        }
      break;
      case 'MONITOR_DLV_DBS_DETAIL_DONE_MITRA_FULFILLED':
        return{
          ...state, 
          //Current status
          detailDoneMitra : action.payload.data
        }
      break;
      case 'MONITOR_DLV_DBS_DETAIL_DONE_TELKOM_FULFILLED':
        return{
          ...state, 
          //Current status
          detailDoneTelkom : action.payload.data
        }
      break;

      case 'MONITOR_DLV_DBS_DETAIL_OGP_FULFILLED':
      return{
        ...state, 
        //Current status
        detailOgp : action.payload.data
      }
      break;
      case 'MONITOR_DLV_DBS_DETAIL_OGP_SUBS_FULFILLED':
        return{
          ...state, 
          //Current status
          detailOgpSubs : action.payload.data
        }
      break;
      case 'MONITOR_DLV_DBS_DETAIL_OGP_MITRA_FULFILLED':
        return{
          ...state, 
          //Current status
          detailOgpMitra : action.payload.data
        }
      break;
      case 'MONITOR_DLV_DBS_DETAIL_OGP_TELKOM_FULFILLED':
        return{
          ...state, 
          //Current status
          detailOgpTelkom : action.payload.data
        }
      break;

      case 'MONITOR_DLV_DBS_DETAIL_OGP_PROGRESS_3_FULFILLED':
      return{
        ...state, 
        //Current status
        detailOgp3 : action.payload.data
      }
      break;
      case 'MONITOR_DLV_DBS_DETAIL_OGP_PROGRESS_3_SUBS_FULFILLED':
        return{
          ...state, 
          //Current status
          detailOgp3Subs : action.payload.data
        }
      break;
      case 'MONITOR_DLV_DBS_DETAIL_OGP_PROGRESS_3_MITRA_FULFILLED':
        return{
          ...state, 
          //Current status
          detailOgp3Mitra : action.payload.data
        }
      break;
      case 'MONITOR_DLV_DBS_DETAIL_OGP_PROGRESS_3_TELKOM_FULFILLED':
        return{
          ...state, 
          //Current status
          detailOgp3Telkom : action.payload.data
        }
      break;

      case 'MONITOR_DLV_DBS_DETAIL_OGP_PROGRESS_6_FULFILLED':
        return{
          ...state, 
          //Current status
          detailOgp6 : action.payload.data
        }
      break;
      case 'MONITOR_DLV_DBS_DETAIL_OGP_PROGRESS_6_SUBS_FULFILLED':
        return{
          ...state, 
          //Current status
          detailOgp6Subs : action.payload.data
        }
      break;
      case 'MONITOR_DLV_DBS_DETAIL_OGP_PROGRESS_6_MITRA_FULFILLED':
        return{
          ...state, 
          //Current status
          detailOgp6Mitra : action.payload.data
        }
      break;
      case 'MONITOR_DLV_DBS_DETAIL_OGP_PROGRESS_6_TELKOM_FULFILLED':
        return{
          ...state, 
          //Current status
          detailOgp6Telkom : action.payload.data
        }
      break;

      case 'MONITOR_DLV_DBS_DETAIL_OGP_PROGRESS_7_FULFILLED':
        return{
          ...state, 
          //Current status
          detailOgp7 : action.payload.data
        }
      break;
      case 'MONITOR_DLV_DBS_DETAIL_OGP_PROGRESS_7_SUBS_FULFILLED':
        return{
          ...state, 
          //Current status
          detailOgp7Subs : action.payload.data
        }
      break;
      case 'MONITOR_DLV_DBS_DETAIL_OGP_PROGRESS_7_MITRA_FULFILLED':
        return{
          ...state, 
          //Current status
          detailOgp7Mitra : action.payload.data
        }
      break;
      case 'MONITOR_DLV_DBS_DETAIL_OGP_PROGRESS_7_TELKOM_FULFILLED':
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
  
  export default MonitorDbsReducerDlv;