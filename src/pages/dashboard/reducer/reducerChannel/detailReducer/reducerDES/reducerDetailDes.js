const initialState = { 
  loaderStatus:false,     
 
  //data ebis
  dataEbisAll:[],
  dataEbisSubs:[],
  dataEbisMitra:[],
  dataEbisTelkom:[],

  //data des
  dataDesAll:[],
  dataDesSubs:[],
  dataDesMitra:[],
  dataDesTelkom:[],

  //data dbs
  dataDbsAll:[],
  dataDbsSubs:[],
  dataDbsMitra:[],
  dataDbsTelkom:[],

  //data dgs
  dataDgsAll:[],
  dataDgsSubs:[],
  dataDgsMitra:[],
  dataDgsTelkom:[],
};

const DesDetailReducer = (state = initialState, action) => {
  switch (action.type) {

      //--------------------------prospect
      //detail ALL
      case 'DETAIL_SUBMISSION_EBIS_REJECTED':
        return{
          ...state, 
        }
      break;
      case 'DETAIL_SUBMISSION_EBIS_PENDING':
        return{
          ...state, 
        }
      break;
      case 'DETAIL_SUBMISSION_EBIS_FULFILLED':
        return{
          ...state, 
          //Current status
          dataEbisAll:action.payload.data,
        }
      break;

      case 'DETAIL_SUBMISSION_DES_FULFILLED':
        return{
          ...state, 
          //Current status
          dataDesAll:action.payload.data,
        }
      break;
      case 'DETAIL_SUBMISSION_DBS_FULFILLED':
        return{
          ...state, 
          //Current status
          dataDbsAll:action.payload.data,
        }
      break;
      case 'DETAIL_SUBMISSION_DGS_FULFILLED':
        return{
          ...state, 
          //Current status
          dataDgsAll:action.payload.data,
        }
      break;

      //detail SUBS
      case 'DETAIL_SUBS_SUBMISSION_EBIS_REJECTED':
        return{
          ...state, 
        }
      break;
      case 'DETAIL_SUBS_SUBMISSION_EBIS_PENDING':
        return{
          ...state, 
        }
      break;
      case 'DETAIL_SUBS_SUBMISSION_EBIS_FULFILLED':
        return{
          ...state, 
          //Current status
          dataEbisSubs:action.payload.data,
        }
      break;
      case 'DETAIL_SUBS_SUBMISSION_DES_FULFILLED':
        return{
          ...state, 
          //Current status
          dataDesSubs:action.payload.data,
        }
      break;
      case 'DETAIL_SUBS_SUBMISSION_DBS_FULFILLED':
        return{
          ...state, 
          //Current status
          dataDbsSubs:action.payload.data,
        }
      break;
      case 'DETAIL_SUBS_SUBMISSION_DGS_FULFILLED':
        return{
          ...state, 
          //Current status
          dataDgsSubs:action.payload.data,
        }
      break;

      //detail MITRA
      case 'DETAIL_MITRA_SUBMISSION_EBIS_REJECTED':
        return{
          ...state, 
        }
      break;
      case 'DETAIL_MITRA_SUBMISSION_EBIS_PENDING':
        return{
          ...state, 
        }
      break;
      case 'DETAIL_MITRA_SUBMISSION_EBIS_FULFILLED':
        return{
          ...state, 
          //Current status
          dataEbisMitra:action.payload.data,
        }
      break;
      case 'DETAIL_MITRA_SUBMISSION_DES_FULFILLED':
        return{
          ...state, 
          //Current status
          dataDesMitra:action.payload.data,
        }
      break;
      case 'DETAIL_MITRA_SUBMISSION_DBS_FULFILLED':
        return{
          ...state, 
          //Current status
          dataDbsMitra:action.payload.data,
        }
      break;
      case 'DETAIL_MITRA_SUBMISSION_DGS_FULFILLED':
        return{
          ...state, 
          //Current status
          dataDgsMitra:action.payload.data,
        }
      break;

      //detail TELKOM
      case 'DETAIL_TELKOM_SUBMISSION_EBIS_REJECTED':
        return{
          ...state, 
        }
      break;
      case 'DETAIL_TELKOM_SUBMISSION_EBIS_PENDING':
        return{
          ...state, 
        }
      break;
      case 'DETAIL_TELKOM_SUBMISSION_EBIS_FULFILLED':
        return{
          ...state, 
          //Current status
          dataEbisTelkom:action.payload.data,
        }
      break;
      case 'DETAIL_TELKOM_SUBMISSION_DES_FULFILLED':
        return{
          ...state, 
          //Current status
          dataDesTelkom:action.payload.data,
        }
      break;
      case 'DETAIL_TELKOM_SUBMISSION_DBS_FULFILLED':
        return{
          ...state, 
          //Current status
          dataDbsTelkom:action.payload.data,
        }
      break;
      case 'DETAIL_TELKOM_SUBMISSION_DGS_FULFILLED':
        return{
          ...state, 
          //Current status
          dataDgsTelkom:action.payload.data,
        }
      break;
 
    default:
      return state;
  }
  
};

export default DesDetailReducer;