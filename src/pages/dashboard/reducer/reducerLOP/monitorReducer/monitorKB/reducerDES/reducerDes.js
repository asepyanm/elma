const initialState = { 
    loaderStatus:false,
    //data des
    dataDesWin:'',
    dataDesWP: '',
    dataDesDoneWin: '',
    dataDesDoneWP: '',
    dataDesOgpWin: '',
    dataDesOgpWP: ''
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
          dataDesWin:action.payload.data[0].WINREV,
          dataDesWP: action.payload.data[0].WINPROJECT
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
          dataDesOgpWin:action.payload.data[0].WINREV,
          dataDesOgpWP: action.payload.data[0].WINPROJECT
        }
      break;
      
      default:
        return state;
    }
  };
  
  export default MonitorDesReducer;