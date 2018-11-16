const initialState = { 
  loaderStatus:false,
  //data ebis
  dataMitra:'',
};

const EbisDetailReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'DETAIL_PROSPECT_EBIS_REJECTED':
      return{
        ...state, 
      }
    break;
    
    case 'DETAIL_PROSPECT_EBIS_PENDING':
      return{
        ...state, 
      }
    break;

    case 'DETAIL_PROSPECT_EBIS_FULFILLED':
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

export default EbisDetailReducer;