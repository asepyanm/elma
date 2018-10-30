const initialState = { 
  loaderStatus:false,
  dataListDashboard:[]
};

const dashboardReducer = (state = initialState, action) => {
  switch (action.type) {

    case 'DASHBOARD_LIST_REJECTED':
      return{
        ...state, 
        loaderStatus:false,
      }
    break;
    
    case 'DASHBOARD_LIST_PENDING':
      return{
        ...state, 
        loaderStatus:true,
      }
    break;

    case 'DASHBOARD_LIST_FULFILLED':
      return {
        ...state, 
        dataListDashboard:action.payload.data,
        loaderStatus:false,
      }
    break;
    
    default:
      return state;
  }
};


export default dashboardReducer;