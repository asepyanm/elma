const initialState = { 
    loaderStatus:false,
    //data des
    dataDesWin:'',
    dataDesWP: '',
    dataDesDoneWin: '',
    dataDesDoneWP: '',
    dataDesOgpWin: '',
    dataDesOgpWP: '',
    dataOgpDes: [],
    detailDoneDes: [],
    detailOgpDes: []
  };
  
  const MonitorDesReducerKL = (state = initialState, action) => {
    switch (action.type) {
      case 'MONITOR_KL_DES_REJECTED':
        return{
          ...state, 
        }
      break;
      
      case 'MONITOR_KL_DES_PENDING':
        return{
          ...state, 
        }
      break;
  
      case 'MONITOR_KL_DES_FULFILLED':
        return{
          ...state, 
          //Current status
          dataDesWin:action.payload.data[0].WINREV,
          dataDesWP: action.payload.data[0].WINPROJECT
        }
      break;

      case 'MONITOR_KL_DES_DONE_REJECTED':
        return{
          ...state, 
        }
      break;
      
      case 'MONITOR_KL_DES_DONE_PENDING':
        return{
          ...state, 
        }
      break;
  
      case 'MONITOR_KL_DES_DONE_FULFILLED':
        return{
          ...state, 
          //Current status
          dataDesDoneWin:action.payload.data[0].KB_REV,
          dataDesDoneWP: action.payload.data[0].KB_PROJECT
        }
      break;

      case 'MONITOR_KL_DES_OGP_REJECTED':
        return{
          ...state, 
        }
      break;
      
      case 'MONITOR_KL_DES_OGP_PENDING':
        return{
          ...state, 
        }
      break;
  
      case 'MONITOR_KL_DES_OGP_FULFILLED':
        return{
          ...state, 
          //Current status
          dataDesOgpWin:action.payload.data[0].KB_REV,
          dataDesOgpWP: action.payload.data[0].KB_PROJECT
        }
      break;

      case 'MONITOR_KL_DES_OGP_DATA_REJECTED':
        return{
          ...state, 
        }
      break;
      
      case 'MONITOR_KL_DES_OGP_DATA_PENDING':
        return{
          ...state, 
        }
      break;
  
      case 'MONITOR_KL_DES_OGP_DATA_FULFILLED':
        return{
          ...state, 
          //Current status
          dataOgpDes : action.payload.data
        }
      break;

      case 'MONITOR_KL_DES_DETAIL_DONE_REJECTED':
        return{
          ...state, 
        }
      break;
      
      case 'MONITOR_KL_DES_DETAIL_DONE_PENDING':
        return{
          ...state, 
        }
      break;
  
      case 'MONITOR_KL_DES_DETAIL_DONE_FULFILLED':
        return{
          ...state, 
          //Current status
          detailDoneDes : action.payload.data
        }
      break;

      case 'MONITOR_KL_DES_DETAIL_OGP_REJECTED':
      return{
        ...state, 
      }
     break;
    
      case 'MONITOR_KL_DES_DETAIL_OGP_PENDING':
      return{
        ...state, 
        }
      break;

    case 'MONITOR_KL_DES_DETAIL_OGP_FULFILLED':
      return{
        ...state, 
        //Current status
        detailOgpDes : action.payload.data
      }
      break;
      
      default:
        return state;
    }
  };
  
  export default MonitorDesReducerKL;