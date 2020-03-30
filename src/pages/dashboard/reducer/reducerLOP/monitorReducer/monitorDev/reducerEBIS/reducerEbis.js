const initialState = { 
    loaderStatus:false,
    //data ebis
    dataEbisWin:'',
    dataEbisWP: '',
    dataEbisDoneWin:'',
    dataEbisDoneWP: '',
    dataEbisOgpWin:'',
    dataEbisOgpWP: '',
    dataOgp3Rev: '',
    dataOgp3Project: '',
    dataOgp6Rev: '',
    dataOgp6Project: '',
    dataOgp7Rev: '',
    dataOgp7Project: '',

    dataEbisWinSubs:'',
    dataEbisWPSubs: '',
    dataEbisDoneWinSubs:'',
    dataEbisDoneWPSubs: '',
    dataEbisOgpWinSubs:'',
    dataEbisOgpWPSubs: '',
    dataOgp3RevSubs: '',
    dataOgp3ProjectSubs: '',
    dataOgp6RevSubs: '',
    dataOgp6ProjectSubs: '',
    dataOgp7RevSubs: '',
    dataOgp7ProjectSubs: '',

    dataEbisWinMitra:'',
    dataEbisWPMitra: '',
    dataEbisDoneWinMitra:'',
    dataEbisDoneWPMitra: '',
    dataEbisOgpWinMitra:'',
    dataEbisOgpWPMitra: '',
    dataOgp3RevMitra: '',
    dataOgp3ProjectMitra: '',
    dataOgp6RevMitra: '',
    dataOgp6ProjectMitra: '',
    dataOgp7RevMitra: '',
    dataOgp7ProjectMitra: '',

    dataEbisWinTelkom:'',
    dataEbisWPTelkom: '',
    dataEbisDoneWinTelkom:'',
    dataEbisDoneWPTelkom: '',
    dataEbisOgpWinTelkom:'',
    dataEbisOgpWPTelkom: '',
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
  
  const MonitorEbisReducerDlv = (state = initialState, action) => {
    switch (action.type) {
      case 'MONITOR_DLV_EBIS_REJECTED':
        return{
          ...state, 
        }
      break;
      
      case 'MONITOR_DLV_EBIS_PENDING':
        return{
          ...state, 
        }
      break;
  
      case 'MONITOR_DLV_EBIS_FULFILLED':
        return{
          ...state, 
          //Current status
          dataEbisWin:action.payload.data[0].WINREV,
          dataEbisWP: action.payload.data[0].WINPROJECT,
        }
      break;
      case 'MONITOR_DLV_EBIS_SUBS_FULFILLED':
        return{
          ...state, 
          //Current status
          dataEbisWinSubs:action.payload.data[0].WINREV,
          dataEbisWPSubs: action.payload.data[0].WINPROJECT
        }
      break;
      case 'MONITOR_DLV_EBIS_MITRA_FULFILLED':
        return{
          ...state, 
          //Current status
          dataEbisWinMitra:action.payload.data[0].WINREV,
          dataEbisWPMitra: action.payload.data[0].WINPROJECT
        }
      break;
      case 'MONITOR_DLV_EBIS_TELKOM_FULFILLED':
        return{
          ...state, 
          //Current status
          dataEbisWinTelkom:action.payload.data[0].WINREV,
          dataEbisWPTelkom: action.payload.data[0].WINPROJECT
        }
      break;
      
      case 'MONITOR_DLV_EBIS_DONE_REJECTED':
        return{
          ...state, 
        }
      break;
      
      case 'MONITOR_DLV_EBIS_DONE_PENDING':
        return{
          ...state, 
        }
      break;
  
      case 'MONITOR_DLV_EBIS_DONE_FULFILLED':
        return{
          ...state, 
          //Current status
          dataEbisDoneWin:action.payload.data[0].KB_REV,
          dataEbisDoneWP: action.payload.data[0].KB_PROJECT
        }
      break;
      case 'MONITOR_DLV_EBIS_DONE_SUBS_FULFILLED':
        return{
          ...state, 
          //Current status
          dataEbisDoneWinSubs:action.payload.data[0].KB_REV,
          dataEbisDoneWPSubs: action.payload.data[0].KB_PROJECT
        }
      break;
      case 'MONITOR_DLV_EBIS_DONE_MITRA_FULFILLED':
        return{
          ...state, 
          //Current status
          dataEbisDoneWinMitra:action.payload.data[0].KB_REV,
          dataEbisDoneWPMitra: action.payload.data[0].KB_PROJECT
        }
      break;
      case 'MONITOR_DLV_EBIS_DONE_TELKOM_FULFILLED':
        return{
          ...state, 
          //Current status
          dataEbisDoneWinTelkom:action.payload.data[0].KB_REV,
          dataEbisDoneWPTelkom: action.payload.data[0].KB_PROJECT
        }
      break;

      case 'MONITOR_DLV_EBIS_OGP_REJECTED':
        return{
          ...state, 
        }
      break;
      
      case 'MONITOR_DLV_EBIS_OGP_PENDING':
        return{
          ...state, 
        }
      break;
  
      case 'MONITOR_DLV_EBIS_OGP_FULFILLED':
        return{
          ...state, 
          //Current status
          dataEbisOgpWin:action.payload.data[0].WINREV,
          dataEbisOgpWP: action.payload.data[0].WINPROJECT
        }
      break;
      case 'MONITOR_DLV_EBIS_OGP_SUBS_FULFILLED':
        return{
          ...state, 
          //Current status
          dataEbisOgpWinSubs:action.payload.data[0].WINREV,
          dataEbisOgpWPSubs: action.payload.data[0].WINPROJECT
        }
      break;
      case 'MONITOR_DLV_EBIS_OGP_MITRA_FULFILLED':
        return{
          ...state, 
          //Current status
          dataEbisOgpWinMitra:action.payload.data[0].WINREV,
          dataEbisOgpWPMitra: action.payload.data[0].WINPROJECT
        }
      break;
      case 'MONITOR_DLV_EBIS_OGP_TELKOM_FULFILLED':
        return{
          ...state, 
          //Current status
          dataEbisOgpWinTelkom:action.payload.data[0].WINREV,
          dataEbisOgpWPTelkom: action.payload.data[0].WINPROJECT
        }
      break;

      case 'MONITOR_DLV_EBIS_OGP_DATA_REJECTED':
        return{
          ...state, 
        }
      break;
      
      case 'MONITOR_DLV_EBIS_OGP_DATA_PENDING':
        return{
          ...state, 
        }
      break;
  
      case 'MONITOR_DLV_EBIS_OGP_DATA_FULFILLED':
        return{
          ...state, 
          //Current status
          dataOgp3Rev: action.payload.data[1].WIN,
          dataOgp3Project: action.payload.data[1].PROJECT,
          dataOgp7Rev: action.payload.data[0].WIN,
          dataOgp7Project: action.payload.data[0].PROJECT,

        }
      break;
      case 'MONITOR_DLV_EBIS_OGP_DATA_SUBS_FULFILLED':
        return{
          ...state, 
          //Current status
          dataOgp3RevSubs: action.payload.data[1].WIN,
          dataOgp3ProjectSubs: action.payload.data[1].PROJECT,
          dataOgp7RevSubs: action.payload.data[0].WIN,
          dataOgp7ProjectSubs: action.payload.data[0].PROJECT,
        }
      break;
      case 'MONITOR_DLV_EBIS_OGP_DATA_MITRA_FULFILLED':
        return{
          ...state, 
          //Current status
          dataOgp3RevMitra: action.payload.data[1].WIN,
          dataOgp3ProjectMitra: action.payload.data[1].PROJECT,
          dataOgp7RevMitra: action.payload.data[0].WIN,
          dataOgp7ProjectMitra: action.payload.data[0].PROJECT,
        }
      break;
      case 'MONITOR_DLV_EBIS_OGP_DATA_TELKOM_FULFILLED':
        return{
          ...state, 
          //Current status
          dataOgp3RevTelkom: action.payload.data[1].WIN,
          dataOgp3ProjectTelkom: action.payload.data[1].PROJECT,
          dataOgp7RevTelkom: action.payload.data[0].WIN,
          dataOgp7ProjectTelkom: action.payload.data[0].PROJECT,
        }
      break;
 
      case 'MONITOR_DLV_EBIS_DETAIL_DONE_FULFILLED':
        return{
          ...state, 
          //Current status
          detailDone : action.payload.data
        }
      break;
      case 'MONITOR_DLV_EBIS_DETAIL_DONE_SUBS_FULFILLED':
        return{
          ...state, 
          //Current status
          detailDoneSubs : action.payload.data
        }
      break;
      case 'MONITOR_DLV_EBIS_DETAIL_DONE_MITRA_FULFILLED':
        return{
          ...state, 
          //Current status
          detailDoneMitra : action.payload.data
        }
      break;
      case 'MONITOR_DLV_EBIS_DETAIL_DONE_TELKOM_FULFILLED':
        return{
          ...state, 
          //Current status
          detailDoneTelkom : action.payload.data
        }
      break;

      case 'MONITOR_DLV_EBIS_DETAIL_OGP_FULFILLED':
      return{
        ...state, 
        //Current status
        detailOgp : action.payload.data
      }
      break;
      case 'MONITOR_DLV_EBIS_DETAIL_OGP_SUBS_FULFILLED':
        return{
          ...state, 
          //Current status
          detailOgpSubs : action.payload.data
        }
      break;
      case 'MONITOR_DLV_EBIS_DETAIL_OGP_MITRA_FULFILLED':
        return{
          ...state, 
          //Current status
          detailOgpMitra : action.payload.data
        }
      break;
      case 'MONITOR_DLV_EBIS_DETAIL_OGP_TELKOM_FULFILLED':
        return{
          ...state, 
          //Current status
          detailOgpTelkom : action.payload.data
        }
      break;

      case 'MONITOR_DLV_EBIS_DETAIL_OGP_PROGRESS_3_FULFILLED':
      return{
        ...state, 
        //Current status
        detailOgp3 : action.payload.data
      }
      break;
      case 'MONITOR_DLV_EBIS_DETAIL_OGP_PROGRESS_3_SUBS_FULFILLED':
        return{
          ...state, 
          //Current status
          detailOgp3Subs : action.payload.data
        }
      break;
      case 'MONITOR_DLV_EBIS_DETAIL_OGP_PROGRESS_3_MITRA_FULFILLED':
        return{
          ...state, 
          //Current status
          detailOgp3Mitra : action.payload.data
        }
      break;
      case 'MONITOR_DLV_EBIS_DETAIL_OGP_PROGRESS_3_TELKOM_FULFILLED':
        return{
          ...state, 
          //Current status
          detailOgp3Telkom : action.payload.data
        }
      break;

      case 'MONITOR_DLV_EBIS_DETAIL_OGP_PROGRESS_6_FULFILLED':
        return{
          ...state, 
          //Current status
          detailOgp6 : action.payload.data
        }
      break;
      case 'MONITOR_DLV_EBIS_DETAIL_OGP_PROGRESS_6_SUBS_FULFILLED':
        return{
          ...state, 
          //Current status
          detailOgp6Subs : action.payload.data
        }
      break;
      case 'MONITOR_DLV_EBIS_DETAIL_OGP_PROGRESS_6_MITRA_FULFILLED':
        return{
          ...state, 
          //Current status
          detailOgp6Mitra : action.payload.data
        }
      break;
      case 'MONITOR_DLV_EBIS_DETAIL_OGP_PROGRESS_6_TELKOM_FULFILLED':
        return{
          ...state, 
          //Current status
          detailOgp6Telkom : action.payload.data
        }
      break;

      case 'MONITOR_DLV_EBIS_DETAIL_OGP_PROGRESS_7_FULFILLED':
        return{
          ...state, 
          //Current status
          detailOgp7 : action.payload.data
        }
      break;
      case 'MONITOR_DLV_EBIS_DETAIL_OGP_PROGRESS_7_SUBS_FULFILLED':
        return{
          ...state, 
          //Current status
          detailOgp7Subs : action.payload.data
        }
      break;
      case 'MONITOR_DLV_EBIS_DETAIL_OGP_PROGRESS_7_MITRA_FULFILLED':
        return{
          ...state, 
          //Current status
          detailOgp7Mitra : action.payload.data
        }
      break;
      case 'MONITOR_DLV_EBIS_DETAIL_OGP_PROGRESS_7_TELKOM_FULFILLED':
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
  
  export default MonitorEbisReducerDlv;