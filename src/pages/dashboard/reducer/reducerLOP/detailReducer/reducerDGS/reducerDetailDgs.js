const initialState = { 
  loaderStatus:false,
  //data ebis
  dataMitra:'',
};

const DgsDetailReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'DETAIL_PROSPECT_DGS_REJECTED':
      return{
        ...state, 
      }
    break;
    
    case 'DETAIL_PROSPECT_DGS_PENDING':
      return{
        ...state, 
      }
    break;

    case 'DETAIL_PROSPECT_DGS_FULFILLED':
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

export default DgsDetailReducer;