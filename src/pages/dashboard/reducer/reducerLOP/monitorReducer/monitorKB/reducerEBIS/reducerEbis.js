const initialState = { 
    loaderStatus:false,
    //data ebis
    dataEbisWin:'',
    dataEbisWP: '',
    dataEbisDoneWin:'',
    dataEbisDoneWP: '',
    dataEbisOgpWin:'',
    dataEbisOgpWP: ''
  };
  
  const MonitorEbisReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'MONITOR_KB_EBIS_REJECTED':
        return{
          ...state, 
        }
      break;
      
      case 'MONITOR_KB_EBIS_PENDING':
        return{
          ...state, 
        }
      break;
  
      case 'MONITOR_KB_EBIS_FULFILLED':
        return{
          ...state, 
          //Current status
          dataEbisWin:action.payload.data[0].WINREV,
          dataEbisWP: action.payload.data[0].WINPROJECT
        }
      break;
      
      case 'MONITOR_KB_EBIS_DONE_REJECTED':
        return{
          ...state, 
        }
      break;
      
      case 'MONITOR_KB_EBIS_DONE_PENDING':
        return{
          ...state, 
        }
      break;
  
      case 'MONITOR_KB_EBIS_DONE_FULFILLED':
        return{
          ...state, 
          //Current status
          dataEbisDoneWin:action.payload.data[0].KB_REV,
          dataEbisDoneWP: action.payload.data[0].KB_PROJECT
        }
      break;

      case 'MONITOR_KB_EBIS_OGP_REJECTED':
        return{
          ...state, 
        }
      break;
      
      case 'MONITOR_KB_EBIS_OGP_PENDING':
        return{
          ...state, 
        }
      break;
  
      case 'MONITOR_KB_EBIS_OGP_FULFILLED':
        return{
          ...state, 
          //Current status
          dataEbisOgpWin:action.payload.data[0].WINREV,
          dataEbisOgpWP: action.payload.data[0].WINPROJECT
        }
      break;

      default:
        return state;
    }
  };
  
  export default MonitorEbisReducer;