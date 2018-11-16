const initialState = { 
  loaderStatus:false,
  //data ebis
  dataMitra:'',
};

const DbsDetailReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'DETAIL_PROSPECT_DBS_REJECTED':
      return{
        ...state, 
      }
    break;
    
    case 'DETAIL_PROSPECT_DBS_PENDING':
      return{
        ...state, 
      }
    break;

    case 'DETAIL_PROSPECT_DBS_FULFILLED':
      return{
        ...state, 
        //Current status
        dataMitra:action.payload.data,
      }
    break;
    
    default:
      return state;
  }
};

export default DbsDetailReducer;