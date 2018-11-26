const initialState = { 
    loaderStatus:false,
    //data ebis
    dataDbsWin:'',
    dataDbsWP: '',
    dataDbsDoneWin: '',
    dataDbsDoneWP: '',
    dataDbsOgpWin: '',
    dataDbsOgpWP: ''
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
          dataDbsOgpWin:action.payload.data[0].WINREV,
          dataDbsOgpWP: action.payload.data[0].WINPROJECT
        }
      break;
      
      default:
        return state;
    }
  };
  
  export default MonitorDbsReducer;