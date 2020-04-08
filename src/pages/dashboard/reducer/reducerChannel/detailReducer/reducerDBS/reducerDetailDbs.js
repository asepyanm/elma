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

const DbsDetailReducer = (state = initialState, action) => {
  switch (action.type) { 

    //--------------------------prospect
      //detail ALL
      case 'DETAIL_WIN_EBIS_REJECTED':
        return{
          ...state, 
        }
      break;
      case 'DETAIL_WIN_EBIS_PENDING':
        return{
          ...state, 
        }
      break;
      case 'DETAIL_WIN_EBIS_FULFILLED':
        return{
          ...state, 
          //Current status
          dataEbisAll:action.payload.data,
        }
      break;

      case 'DETAIL_WIN_DES_FULFILLED':
        return{
          ...state, 
          //Current status
          dataDesAll:action.payload.data,
        }
      break;
      case 'DETAIL_WIN_DBS_FULFILLED':
        return{
          ...state, 
          //Current status
          dataDbsAll:action.payload.data,
        }
      break;
      case 'DETAIL_WIN_DGS_FULFILLED':
        return{
          ...state, 
          //Current status
          dataDgsAll:action.payload.data,
        }
      break;


      //detail SUBS
      case 'DETAIL_SUBS_WIN_EBIS_REJECTED':
        return{
          ...state, 
        }
      break;
      case 'DETAIL_SUBS_WIN_EBIS_PENDING':
        return{
          ...state, 
        }
      break;
      case 'DETAIL_SUBS_WIN_EBIS_FULFILLED':
        return{
          ...state, 
          //Current status
          dataEbisSubs:action.payload.data,
        }
      break;
      case 'DETAIL_SUBS_WIN_DES_FULFILLED':
        return{
          ...state, 
          //Current status
          dataDesSubs:action.payload.data,
        }
      break;
      case 'DETAIL_SUBS_WIN_DBS_FULFILLED':
        return{
          ...state, 
          //Current status
          dataDbsSubs:action.payload.data,
        }
      break;
      case 'DETAIL_SUBS_WIN_DGS_FULFILLED':
        return{
          ...state, 
          //Current status
          dataDgsSubs:action.payload.data,
        }
      break;

      //detail MITRA
      case 'DETAIL_MITRA_WIN_EBIS_REJECTED':
        return{
          ...state, 
        }
      break;
      case 'DETAIL_MITRA_WIN_EBIS_PENDING':
        return{
          ...state, 
        }
      break;
      case 'DETAIL_MITRA_WIN_EBIS_FULFILLED':
        return{
          ...state, 
          //Current status
          dataEbisMitra:action.payload.data,
        }
      break;
      case 'DETAIL_MITRA_WIN_DES_FULFILLED':
        return{
          ...state, 
          //Current status
          dataDesMitra:action.payload.data,
        }
      break;
      case 'DETAIL_MITRA_WIN_DBS_FULFILLED':
        return{
          ...state, 
          //Current status
          dataDbsMitra:action.payload.data,
        }
      break;
      case 'DETAIL_MITRA_WIN_DGS_FULFILLED':
        return{
          ...state, 
          //Current status
          dataDgsMitra:action.payload.data,
        }
      break;

      //detail TELKOM
      case 'DETAIL_TELKOM_WIN_EBIS_REJECTED':
        return{
          ...state, 
        }
      break;
      case 'DETAIL_TELKOM_WIN_EBIS_PENDING':
        return{
          ...state, 
        }
      break;
      case 'DETAIL_TELKOM_WIN_EBIS_FULFILLED':
        return{
          ...state, 
          //Current status
          dataEbisTelkom:action.payload.data,
        }
      break;
      case 'DETAIL_TELKOM_WIN_DES_FULFILLED':
        return{
          ...state, 
          //Current status
          dataDesTelkom:action.payload.data,
        }
      break;
      case 'DETAIL_TELKOM_WIN_DBS_FULFILLED':
        return{
          ...state, 
          //Current status
          dataDbsTelkom:action.payload.data,
        }
      break;
      case 'DETAIL_TELKOM_WIN_DGS_FULFILLED':
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

export default DbsDetailReducer;