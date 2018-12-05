const initialState = { 
    loaderStatus:false,
    //data ebis
    dataDgsWin:'',
    dataDgsWP: '',
    dataDgsDoneWin: '',
    dataDgsDoneWP: '',
    dataDgsOgpWin: '',
    dataDgsOgpWP: '',
    dataOgp3Rev: '',
    dataOgp3Project: '',
    dataOgp6Rev: '',
    dataOgp6Project: '',
    dataOgp7Rev: '',
    dataOgp7Project: '',
    dataOgpDgs: [],
    detailDoneDgs: [],
    detailOgpDgs: []
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
          dataDgsOgpWin:action.payload.data[0].KB_REV,
          dataDgsOgpWP: action.payload.data[0].KB_PROJECT
        }
      break;

      case 'MONITOR_KB_DGS_OGP_DATA_REJECTED':
        return{
          ...state, 
        }
      break;
      
      case 'MONITOR_KB_DGS_OGP_DATA_PENDING':
        return{
          ...state, 
        }
      break;
  
      case 'MONITOR_KB_DGS_OGP_DATA_FULFILLED':
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

      case 'MONITOR_KB_DGS_DETAIL_DONE_REJECTED':
        return{
          ...state, 
        }
      break;
      
      case 'MONITOR_KB_DGS_DETAIL_DONE_PENDING':
        return{
          ...state, 
        }
      break;
  
      case 'MONITOR_KB_DGS_DETAIL_DONE_FULFILLED':
        return{
          ...state, 
          //Current status
          detailDoneDgs : action.payload.data
        }
      break;

      case 'MONITOR_KB_DGS_DETAIL_OGP_REJECTED':
      return{
        ...state, 
      }
     break;
    
      case 'MONITOR_KB_DGS_DETAIL_OGP_PENDING':
      return{
        ...state, 
        }
      break;

    case 'MONITOR_KB_DGS_DETAIL_OGP_FULFILLED':
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
  
  export default MonitorDgsReducer;