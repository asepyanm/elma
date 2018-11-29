const initialState = { 
    loaderStatus:false,
    //data ebis
    dataDbsWin:'',
    dataDbsWP: '',
    dataDbsDoneWin: '',
    dataDbsDoneWP: '',
    dataDbsOgpWin: '',
    dataDbsOgpWP: '',
    dataOgpDbs: [],
    detailDoneDbs: [],
    detailOgpDbs: []
  };
  
  const MonitorDbsReducerKL = (state = initialState, action) => {
    switch (action.type) {
      case 'MONITOR_KL_DBS_REJECTED':
        return{
          ...state, 
        }
      break;
      
      case 'MONITOR_KL_DBS_PENDING':
        return{
          ...state, 
        }
      break;
  
      case 'MONITOR_KL_DBS_FULFILLED':
        return{
          ...state, 
          //Current status
          dataDbsWin:action.payload.data[0].WINREV,
          dataDbsWP: action.payload.data[0].WINPROJECT
        }
      break;

      case 'MONITOR_KL_DBS_DONE_REJECTED':
        return{
          ...state, 
        }
      break;
      
      case 'MONITOR_KL_DBS_DONE_PENDING':
        return{
          ...state, 
        }
      break;
  
      case 'MONITOR_KL_DBS_DONE_FULFILLED':
        return{
          ...state, 
          //Current status
          dataDbsDoneWin:action.payload.data[0].KB_REV,
          dataDbsDoneWP: action.payload.data[0].KB_PROJECT
        }
      break;

      case 'MONITOR_KL_DBS_OGP_REJECTED':
        return{
          ...state, 
        }
      break;
      
      case 'MONITOR_KL_DBS_OGP_PENDING':
        return{
          ...state, 
        }
      break;
  
      case 'MONITOR_KL_DBS_OGP_FULFILLED':
        return{
          ...state, 
          //Current status
          dataDbsOgpWin:action.payload.data[0].KB_REV,
          dataDbsOgpWP: action.payload.data[0].KB_PROJECT
        }
      break;

      case 'MONITOR_KL_DBS_OGP_DATA_REJECTED':
        return{
          ...state, 
        }
      break;
      
      case 'MONITOR_KL_DBS_OGP_DATA_PENDING':
        return{
          ...state, 
        }
      break;
  
      case 'MONITOR_KL_DBS_OGP_DATA_FULFILLED':
        return{
          ...state, 
          //Current status
          dataOgpDbs : action.payload.data
        }
      break;

      case 'MONITOR_KL_DBS_DETAIL_DONE_REJECTED':
        return{
          ...state, 
        }
      break;
      
      case 'MONITOR_KL_DBS_DETAIL_DONE_PENDING':
        return{
          ...state, 
        }
      break;
  
      case 'MONITOR_KL_DBS_DETAIL_DONE_FULFILLED':
        return{
          ...state, 
          //Current status
          detailDoneDbs : action.payload.data
        }
      break;

      case 'MONITOR_KL_DBS_DETAIL_OGP_REJECTED':
      return{
        ...state, 
      }
     break;
    
      case 'MONITOR_KL_DBS_DETAIL_OGP_PENDING':
      return{
        ...state, 
        }
      break;

    case 'MONITOR_KL_DBS_DETAIL_OGP_FULFILLED':
      return{
        ...state, 
        //Current status
        detailOgpDbs : action.payload.data
      }
      break;
      
      default:
        return state;
    }
  };
  
  export default MonitorDbsReducerKL;