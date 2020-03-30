const initialState = { 
    loaderStatus:false,

    //data DGS
    dataDgsWin:'',
    dataDgsWP: '',
    dataDgsDoneWin:'',
    dataDgsDoneWP: '',
    dataDgsOgpWin:'',
    dataDgsOgpWP: '',
    dataOgp3Rev: '',
    dataOgp3Project: '',
    dataOgp6Rev: '',
    dataOgp6Project: '',
    dataOgp7Rev: '',
    dataOgp7Project: '',

    dataDgsWinSubs:'',
    dataDgsWPSubs: '',
    dataDgsDoneWinSubs:'',
    dataDgsDoneWPSubs: '',
    dataDgsOgpWinSubs:'',
    dataDgsOgpWPSubs: '',
    dataOgp3RevSubs: '',
    dataOgp3ProjectSubs: '',
    dataOgp6RevSubs: '',
    dataOgp6ProjectSubs: '',
    dataOgp7RevSubs: '',
    dataOgp7ProjectSubs: '',

    dataDgsWinMitra:'',
    dataDgsWPMitra: '',
    dataDgsDoneWinMitra:'',
    dataDgsDoneWPMitra: '',
    dataDgsOgpWinMitra:'',
    dataDgsOgpWPMitra: '',
    dataOgp3RevMitra: '',
    dataOgp3ProjectMitra: '',
    dataOgp6RevMitra: '',
    dataOgp6ProjectMitra: '',
    dataOgp7RevMitra: '',
    dataOgp7ProjectMitra: '',

    dataDgsWinTelkom:'',
    dataDgsWPTelkom: '',
    dataDgsDoneWinTelkom:'',
    dataDgsDoneWPTelkom: '',
    dataDgsOgpWinTelkom:'',
    dataDgsOgpWPTelkom: '',
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
  
  const MonitorDgsReducerKL = (state = initialState, action) => {
    switch (action.type) {
      case 'MONITOR_KL_DGS_REJECTED':
        return{
          ...state, 
        }
      break;
      
      case 'MONITOR_KL_DGS_PENDING':
        return{
          ...state, 
        }
      break;
  
      case 'MONITOR_KL_DGS_FULFILLED':
        return{
          ...state, 
          //Current status
          dataDgsWin:action.payload.data[0].KB_REV,
          dataDgsWP: action.payload.data[0].KB_PROJECT
        }
      break;
      case 'MONITOR_KL_DGS_SUBS_FULFILLED':
        return{
          ...state, 
          //Current status
          dataDgsWinSubs:action.payload.data[0].WINREV,
          dataDgsWPSubs: action.payload.data[0].WINPROJECT
        }
      break;
      case 'MONITOR_KL_DGS_MITRA_FULFILLED':
        return{
          ...state, 
          //Current status
          dataDgsWinMitra:action.payload.data[0].WINREV,
          dataDgsWPMitra: action.payload.data[0].WINPROJECT
        }
      break;
      case 'MONITOR_KL_DGS_TELKOM_FULFILLED':
        return{
          ...state, 
          //Current status
          dataDgsWinTelkom:action.payload.data[0].KB_REV,
          dataDgsWPTelkom: action.payload.data[0].KB_PROJECT
        }
      break;

      case 'MONITOR_KL_DGS_DONE_REJECTED':
        return{
          ...state, 
        }
      break;
      
      case 'MONITOR_KL_DGS_DONE_PENDING':
        return{
          ...state, 
        }
      break;
  
      case 'MONITOR_KL_DGS_DONE_FULFILLED':
        return{
          ...state, 
          //Current status
          dataDgsDoneWin:action.payload.data[0].KB_REV,
          dataDgsDoneWP: action.payload.data[0].KB_PROJECT
        }
      break;
      case 'MONITOR_KL_DGS_DONE_SUBS_FULFILLED':
        return{
          ...state, 
          //Current status
          dataDgsDoneWinSubs:action.payload.data[0].KB_REV,
          dataDgsDoneWPSubs: action.payload.data[0].KB_PROJECT
        }
      break;
      case 'MONITOR_KL_DGS_DONE_MITRA_FULFILLED':
        return{
          ...state, 
          //Current status
          dataDgsDoneWinMitra:action.payload.data[0].KB_REV,
          dataDgsDoneWPMitra: action.payload.data[0].KB_PROJECT
        }
      break;
      case 'MONITOR_KL_DGS_DONE_TELKOM_FULFILLED':
        return{
          ...state, 
          //Current status
          dataDgsDoneWinTelkom:action.payload.data[0].KB_REV,
          dataDgsDoneWPTelkom: action.payload.data[0].KB_PROJECT
        }
      break;

      case 'MONITOR_KL_DGS_OGP_REJECTED':
        return{
          ...state, 
        }
      break;
      
      case 'MONITOR_KL_DGS_OGP_PENDING':
        return{
          ...state, 
        }
      break;
  
      case 'MONITOR_KL_DGS_OGP_FULFILLED':
        return{
          ...state, 
          //Current status
          dataDgsOgpWin:action.payload.data[0].KB_REV,
          dataDgsOgpWP: action.payload.data[0].KB_PROJECT
        }
      break;
      case 'MONITOR_KL_DGS_OGP_SUBS_FULFILLED':
        return{
          ...state, 
          //Current status
          dataDgsOgpWinSubs:action.payload.data[0].KB_REV,
          dataDgsOgpWPSubs: action.payload.data[0].KB_PROJECT
        }
      break;
      case 'MONITOR_KL_DGS_OGP_MITRA_FULFILLED':
        return{
          ...state, 
          //Current status
          dataDgsOgpWinMitra:action.payload.data[0].KB_REV,
          dataDgsOgpWPMitra: action.payload.data[0].KB_PROJECT
        }
      break;
      case 'MONITOR_KL_DGS_OGP_TELKOM_FULFILLED':
        return{
          ...state, 
          //Current status
          dataDgsOgpWinTelkom:action.payload.data[0].KB_REV,
          dataDgsOgpWPTelkom: action.payload.data[0].KB_PROJECT
        }
      break;

      case 'MONITOR_KL_DGS_OGP_DATA_REJECTED':
        return{
          ...state, 
        }
      break;
      
      case 'MONITOR_KL_DGS_OGP_DATA_PENDING':
        return{
          ...state, 
        }
      break;
  
      case 'MONITOR_KL_DGS_OGP_DATA_FULFILLED':
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
      case 'MONITOR_KL_DGS_OGP_DATA_SUBS_FULFILLED':
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
      case 'MONITOR_KL_DGS_OGP_DATA_MITRA_FULFILLED':
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
      case 'MONITOR_KL_DGS_OGP_DATA_TELKOM_FULFILLED':
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

      case 'MONITOR_KL_DGS_DETAIL_DONE_FULFILLED':
        return{
          ...state, 
          //Current status
          detailDone : action.payload.data
        }
      break;
      case 'MONITOR_KL_DGS_DETAIL_DONE_SUBS_FULFILLED':
        return{
          ...state, 
          //Current status
          detailDoneSubs : action.payload.data
        }
      break;
      case 'MONITOR_KL_DGS_DETAIL_DONE_MITRA_FULFILLED':
        return{
          ...state, 
          //Current status
          detailDoneMitra : action.payload.data
        }
      break;
      case 'MONITOR_KL_DGS_DETAIL_DONE_TELKOM_FULFILLED':
        return{
          ...state, 
          //Current status
          detailDoneTelkom : action.payload.data
        }
      break;

      case 'MONITOR_KL_DGS_DETAIL_OGP_FULFILLED':
      return{
        ...state, 
        //Current status
        detailOgp : action.payload.data
      }
      break;
      case 'MONITOR_KL_DGS_DETAIL_OGP_SUBS_FULFILLED':
        return{
          ...state, 
          //Current status
          detailOgpSubs : action.payload.data
        }
      break;
      case 'MONITOR_KL_DGS_DETAIL_OGP_MITRA_FULFILLED':
        return{
          ...state, 
          //Current status
          detailOgpMitra : action.payload.data
        }
      break;
      case 'MONITOR_KL_DGS_DETAIL_OGP_TELKOM_FULFILLED':
        return{
          ...state, 
          //Current status
          detailOgpTelkom : action.payload.data
        }
      break;

      case 'MONITOR_KL_DGS_DETAIL_OGP_PROGRESS_3_FULFILLED':
      return{
        ...state, 
        //Current status
        detailOgp3 : action.payload.data
      }
      break;
      case 'MONITOR_KL_DGS_DETAIL_OGP_PROGRESS_3_SUBS_FULFILLED':
        return{
          ...state, 
          //Current status
          detailOgp3Subs : action.payload.data
        }
      break;
      case 'MONITOR_KL_DGS_DETAIL_OGP_PROGRESS_3_MITRA_FULFILLED':
        return{
          ...state, 
          //Current status
          detailOgp3Mitra : action.payload.data
        }
      break;
      case 'MONITOR_KL_DGS_DETAIL_OGP_PROGRESS_3_TELKOM_FULFILLED':
        return{
          ...state, 
          //Current status
          detailOgp3Telkom : action.payload.data
        }
      break;

      case 'MONITOR_KL_DGS_DETAIL_OGP_PROGRESS_6_FULFILLED':
        return{
          ...state, 
          //Current status
          detailOgp6 : action.payload.data
        }
      break;
      case 'MONITOR_KL_DGS_DETAIL_OGP_PROGRESS_6_SUBS_FULFILLED':
        return{
          ...state, 
          //Current status
          detailOgp6Subs : action.payload.data
        }
      break;
      case 'MONITOR_KL_DGS_DETAIL_OGP_PROGRESS_6_MITRA_FULFILLED':
        return{
          ...state, 
          //Current status
          detailOgp6Mitra : action.payload.data
        }
      break;
      case 'MONITOR_KL_DGS_DETAIL_OGP_PROGRESS_6_TELKOM_FULFILLED':
        return{
          ...state, 
          //Current status
          detailOgp6Telkom : action.payload.data
        }
      break;

      case 'MONITOR_KL_DGS_DETAIL_OGP_PROGRESS_7_FULFILLED':
        return{
          ...state, 
          //Current status
          detailOgp7 : action.payload.data
        }
      break;
      case 'MONITOR_KL_DGS_DETAIL_OGP_PROGRESS_7_SUBS_FULFILLED':
        return{
          ...state, 
          //Current status
          detailOgp7Subs : action.payload.data
        }
      break;
      case 'MONITOR_KL_DGS_DETAIL_OGP_PROGRESS_7_MITRA_FULFILLED':
        return{
          ...state, 
          //Current status
          detailOgp7Mitra : action.payload.data
        }
      break;
      case 'MONITOR_KL_DGS_DETAIL_OGP_PROGRESS_7_TELKOM_FULFILLED':
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
  
  export default MonitorDgsReducerKL;