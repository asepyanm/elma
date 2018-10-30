const initialState = { 
    loaderStatus:false,
    id: '',
    judul: '',
    konten: '',
    create_by: '',
    create_time: ''
  };
  
  const dashboardDetailReducer = (state = initialState, action) => {
    switch (action.type) {
  
      case 'DASHBOARD_DETAIL_REJECTED':
        return{
          ...state, 
          loaderStatus:false,
        }
      break;
      
      case 'DASHBOARD_DETAIL_PENDING':
        return{
          ...state, 
          loaderStatus:true,
        }
      break;
  
      case 'DASHBOARD_DETAIL_FULFILLED':
        return {
          ...state,
          judul: action.payload.data.judul,
          konten: action.payload.data.konten,
          create_by: action.payload.data.create_by,
          create_time: action.payload.data.create_time,
          loaderStatus:false,
        }
      break;
      
      default:
        return state;
    }
  };
  
  
  export default dashboardDetailReducer;