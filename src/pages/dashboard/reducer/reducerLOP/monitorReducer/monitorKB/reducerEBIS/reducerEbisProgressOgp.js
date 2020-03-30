const initialState = { 
    loaderStatus:false,
    //data ebis


  };
  
  const MonitorEbisProgressOgpReducer = (state = initialState, action) => {
    switch (action.type) {

      case 'MONITOR_KB_EBIS_DETAIL_DONE_REJECTED':
        return{
          ...state, 
        }
      break;
      
      case 'MONITOR_KB_EBIS_DETAIL_DONE_PENDING':
        return{
          ...state, 
        }
      break;
  

      case 'MONITOR_KB_EBIS_DETAIL_OGP_REJECTED':
        return{
          ...state, 
        }
      break;
      
      case 'MONITOR_KB_EBIS_DETAIL_OGP_PENDING':
        return{
          ...state, 
        }
      break;
  
      default:
        return state;
    }
  };
  
  export default MonitorEbisProgressOgpReducer;