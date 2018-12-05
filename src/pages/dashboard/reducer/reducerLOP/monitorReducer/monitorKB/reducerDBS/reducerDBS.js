const initialState = { 
    loaderStatus:false,
    //data ebis
    dataDbsWin:'',
    dataDbsWP: '',
    dataDbsDoneWin: '',
    dataDbsDoneWP: '',
    dataDbsOgpWin: '',
    dataDbsOgpWP: '',
    dataOgp3Rev: '',
    dataOgp3Project: '',
    dataOgp6Rev: '',
    dataOgp6Project: '',
    dataOgp7Rev: '',
    dataOgp7Project: '',
    dataOgpDbs: [],
    detailDoneDbs: [],
    detailOgpDbs: []
  };
  
  const MonitorDbsReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'MONITOR_KB_DBS_REJECTED':
        return{
          ...state, 
        }
      break;
      
      case 'MONITOR_KB_DBS_PENDING':
        return{
          ...state, 
        }
      break;
  
      case 'MONITOR_KB_DBS_FULFILLED':
        return{
          ...state, 
          //Current status
          dataDbsWin:action.payload.data[0].WINREV,
          dataDbsWP: action.payload.data[0].WINPROJECT
        }
      break;

      case 'MONITOR_KB_DBS_DONE_REJECTED':
        return{
          ...state, 
        }
      break;
      
      case 'MONITOR_KB_DBS_DONE_PENDING':
        return{
          ...state, 
        }
      break;
  
      case 'MONITOR_KB_DBS_DONE_FULFILLED':
        return{
          ...state, 
          //Current status
          dataDbsDoneWin:action.payload.data[0].KB_REV,
          dataDbsDoneWP: action.payload.data[0].KB_PROJECT
        }
      break;

      case 'MONITOR_KB_DBS_OGP_REJECTED':
        return{
          ...state, 
        }
      break;
      
      case 'MONITOR_KB_DBS_OGP_PENDING':
        return{
          ...state, 
        }
      break;
  
      case 'MONITOR_KB_DBS_OGP_FULFILLED':
        return{
          ...state, 
          //Current status
          dataDbsOgpWin:action.payload.data[0].KB_REV,
          dataDbsOgpWP: action.payload.data[0].KB_PROJECT
        }
      break;

      case 'MONITOR_KB_DBS_OGP_DATA_REJECTED':
        return{
          ...state, 
        }
      break;
      
      case 'MONITOR_KB_DBS_OGP_DATA_PENDING':
        return{
          ...state, 
        }
      break;
  
      case 'MONITOR_KB_DBS_OGP_DATA_FULFILLED':
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

      case 'MONITOR_KB_DBS_DETAIL_DONE_REJECTED':
        return{
          ...state, 
        }
      break;
      
      case 'MONITOR_KB_DBS_DETAIL_DONE_PENDING':
        return{
          ...state, 
        }
      break;
  
      case 'MONITOR_KB_DBS_DETAIL_DONE_FULFILLED':
        return{
          ...state, 
          //Current status
          detailDoneDbs : action.payload.data
        }
      break;

      case 'MONITOR_KB_DBS_DETAIL_OGP_REJECTED':
      return{
        ...state, 
      }
     break;
    
      case 'MONITOR_KB_DBS_DETAIL_OGP_PENDING':
      return{
        ...state, 
        }
      break;

    case 'MONITOR_KB_DBS_DETAIL_OGP_FULFILLED':
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
  
  export default MonitorDbsReducer;