const initialState = { 
  loaderStatus:false,
  //data ebis
  dataMitra:'',
};

const DesDetailReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'DETAIL_PROSPECT_DES_REJECTED':
      return{
        ...state, 
      }
    break;
    
    case 'DETAIL_PROSPECT_DES_PENDING':
      return{
        ...state, 
      }
    break;

    case 'DETAIL_PROSPECT_DES_FULFILLED':
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

export default DesDetailReducer;