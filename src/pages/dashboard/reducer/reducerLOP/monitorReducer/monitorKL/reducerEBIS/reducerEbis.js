const initialState = { 
    loaderStatus:false,
    //data ebis
    dataEbisWin:'',
    dataEbisWP: '',
    dataEbisDoneWin:'',
    dataEbisDoneWP: '',
    dataEbisOgpWin:'',
    dataEbisOgpWP: '',
    dataOgp3Rev: '',
    dataOgp3Project: '',
    dataOgp6Rev: '',
    dataOgp6Project: '',
    dataOgp7Rev: '',
    dataOgp7Project: '',
    dataOgp: [],
    detailDone: [],
    detailOgp: []
  };
  
  const MonitorEbisReducerKL = (state = initialState, action) => {
    switch (action.type) {
      case 'MONITOR_KL_EBIS_REJECTED':
        return{
          ...state, 
        }
      break;
      
      case 'MONITOR_KL_EBIS_PENDING':
        return{
          ...state, 
        }
      break;
  
      case 'MONITOR_KL_EBIS_FULFILLED':
        return{
          ...state, 
          //Current status
          dataEbisWin:action.payload.data[0].WINREV,
          dataEbisWP: action.payload.data[0].WINPROJECT
        }
      break;
      
      case 'MONITOR_KL_EBIS_DONE_REJECTED':
        return{
          ...state, 
        }
      break;
      
      case 'MONITOR_KL_EBIS_DONE_PENDING':
        return{
          ...state, 
        }
      break;
  
      case 'MONITOR_KL_EBIS_DONE_FULFILLED':
        return{
          ...state, 
          //Current status
          dataEbisDoneWin:action.payload.data[0].KB_REV,
          dataEbisDoneWP: action.payload.data[0].KB_PROJECT
        }
      break;

      case 'MONITOR_KL_EBIS_OGP_REJECTED':
        return{
          ...state, 
        }
      break;
      
      case 'MONITOR_KL_EBIS_OGP_PENDING':
        return{
          ...state, 
        }
      break;
  
      case 'MONITOR_KL_EBIS_OGP_FULFILLED':
        return{
          ...state, 
          //Current status
          dataEbisOgpWin:action.payload.data[0].KB_REV,
          dataEbisOgpWP: action.payload.data[0].KB_PROJECT
        }
      break;

      case 'MONITOR_KL_EBIS_OGP_DATA_REJECTED':
        return{
          ...state, 
        }
      break;
      
      case 'MONITOR_KL_EBIS_OGP_DATA_PENDING':
        return{
          ...state, 
        }
      break;
  
      case 'MONITOR_KL_EBIS_OGP_DATA_FULFILLED':
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

      case 'MONITOR_KL_EBIS_DETAIL_DONE_REJECTED':
        return{
          ...state, 
        }
      break;
      
      case 'MONITOR_KL_EBIS_DETAIL_DONE_PENDING':
        return{
          ...state, 
        }
      break;
  
      case 'MONITOR_KL_EBIS_DETAIL_DONE_FULFILLED':
        return{
          ...state, 
          //Current status
          detailDone : action.payload.data
        }
      break;

      case 'MONITOR_KL_EBIS_DETAIL_OGP_REJECTED':
        return{
          ...state, 
        }
      break;
      
      case 'MONITOR_KL_EBIS_DETAIL_OGP_PENDING':
        return{
          ...state, 
        }
      break;
  
      case 'MONITOR_KL_EBIS_DETAIL_OGP_FULFILLED':
        return{
          ...state, 
          //Current status
          detailOgp : action.payload.data
        }
      break;

      default:
        return state;
    }
  };
  
  export default MonitorEbisReducerKL;