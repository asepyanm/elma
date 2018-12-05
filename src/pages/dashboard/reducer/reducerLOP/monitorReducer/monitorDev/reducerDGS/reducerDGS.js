const initialState = { 
    loaderStatus:false,
    //data ebis
    dataDgsWin:'',
    dataDgsWP: '',
    dataDgsDoneWin: '',
    dataDgsDoneWP: '',
    dataDgsOgpWin: '',
    dataDgsOgpWP: '',
    dataOgpDgs: [],
    dataScheduleRev: '',
    dataScheduleProject: '',
    dataDelay: '',
    dataDelayProject: '',
    detailDoneDgs: [],
    detailOgpDgs: []
  };
  
  const MonitorDgsReducerDev = (state = initialState, action) => {
    switch (action.type) {
      case 'MONITOR_DEV_DGS_REJECTED':
        return{
          ...state, 
        }
      break;
      
      case 'MONITOR_DEV_DGS_PENDING':
        return{
          ...state, 
        }
      break;
  
      case 'MONITOR_DEV_DGS_FULFILLED':
        return{
          ...state, 
          //Current status
          dataDgsWin:action.payload.data[0].WINREV,
          dataDgsWP: action.payload.data[0].WINPROJECT
        }
      break;

      case 'MONITOR_DEV_DGS_DONE_REJECTED':
        return{
          ...state, 
        }
      break;
      
      case 'MONITOR_DEV_DGS_DONE_PENDING':
        return{
          ...state, 
        }
      break;
  
      case 'MONITOR_DEV_DGS_DONE_FULFILLED':
        return{
          ...state, 
          //Current status
          dataDgsDoneWin:action.payload.data[0].KB_REV,
          dataDgsDoneWP: action.payload.data[0].KB_PROJECT
        }
      break;

      case 'MONITOR_DEV_DGS_OGP_REJECTED':
        return{
          ...state, 
        }
      break;
      
      case 'MONITOR_DEV_DGS_OGP_PENDING':
        return{
          ...state, 
        }
      break;
  
      case 'MONITOR_DEV_DGS_OGP_FULFILLED':
        return{
          ...state, 
          //Current status
          dataDgsOgpWin:action.payload.data[0].KB_REV,
          dataDgsOgpWP: action.payload.data[0].KB_PROJECT
        }
      break;

      case 'MONITOR_DEV_DGS_OGP_DATA_REJECTED':
        return{
          ...state, 
        }
      break;
      
      case 'MONITOR_DEV_DGS_OGP_DATA_PENDING':
        return{
          ...state, 
        }
      break;
  
      case 'MONITOR_DEV_DGS_OGP_DATA_FULFILLED':
        return{
          ...state, 
          //Current status
          dataScheduleRev: action.payload.data[1].WIN,
          dataScheduleProject: action.payload.data[1].PROJECT,
          dataDelay: action.payload.data[0].WIN,
          dataDelayProject: action.payload.data[0].PROJECT
        }
      break;

      case 'MONITOR_DEV_DGS_DETAIL_DONE_REJECTED':
        return{
          ...state, 
        }
      break;
      
      case 'MONITOR_DEV_DGS_DETAIL_DONE_PENDING':
        return{
          ...state, 
        }
      break;
  
      case 'MONITOR_DEV_DGS_DETAIL_DONE_FULFILLED':
        return{
          ...state, 
          //Current status
          detailDoneDgs : action.payload.data
        }
      break;

      case 'MONITOR_DEV_DGS_DETAIL_OGP_REJECTED':
      return{
        ...state, 
      }
     break;
    
      case 'MONITOR_DEV_DGS_DETAIL_OGP_PENDING':
      return{
        ...state, 
        }
      break;

    case 'MONITOR_DEV_DGS_DETAIL_OGP_FULFILLED':
      return{
        ...state, 
        //Current status
        detailOgpDgs : action.payload.data
      }
      break;
      
      default:
        return state;
    }
  };
  
  export default MonitorDgsReducerDev;