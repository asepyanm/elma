const initialState = { 
    loaderStatus:false,
    //data ebis
    dataDgsWin:'',
    dataDgsWP: '',
    dataDgsDoneWin: '',
    dataDgsDoneWP: '',
    dataDgsOgpWin: '',
    dataDgsOgpWP: ''
  };
  
  const MonitorDgsReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'MONITOR_KB_DGS_REJECTED':
        return{
          ...state, 
        }
      break;
      
      case 'MONITOR_KB_DGS_PENDING':
        return{
          ...state, 
        }
      break;
  
      case 'MONITOR_KB_DGS_FULFILLED':
        return{
          ...state, 
          //Current status
          dataDgsWin:action.payload.data[0].WINREV,
          dataDgsWP: action.payload.data[0].WINPROJECT
        }
      break;

      case 'MONITOR_KB_DGS_DONE_REJECTED':
        return{
          ...state, 
        }
      break;
      
      case 'MONITOR_KB_DGS_DONE_PENDING':
        return{
          ...state, 
        }
      break;
  
      case 'MONITOR_KB_DGS_DONE_FULFILLED':
        return{
          ...state, 
          //Current status
          dataDgsDoneWin:action.payload.data[0].KB_REV,
          dataDgsDoneWP: action.payload.data[0].KB_PROJECT
        }
      break;

      case 'MONITOR_KB_DGS_OGP_REJECTED':
        return{
          ...state, 
        }
      break;
      
      case 'MONITOR_KB_DGS_OGP_PENDING':
        return{
          ...state, 
        }
      break;
  
      case 'MONITOR_KB_DGS_OGP_FULFILLED':
        return{
          ...state, 
          //Current status
          dataDgsOgpWin:action.payload.data[0].WINREV,
          dataDgsOgpWP: action.payload.data[0].WINPROJECT
        }
      break;
      
      default:
        return state;
    }
  };
  
  export default MonitorDgsReducer;