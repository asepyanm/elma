const initialState = { 
  loaderStatus:false,

  //data ebis prospect
  dataAll:'',
  dataSubs:'',
  dataMitra:'',
  dataTelkom:'',

  //data ebis submission
  dataAll2:'',
  dataSubs2:'',
  dataMitra2:'',
  dataTelkom2:'',

  //data ebis win
  dataAll3:'',
  dataSubs3:'',
  dataMitra3:'',
  dataTelkom3:'',

  //data ebis billcom
  dataAll4:'',
  dataSubs4:'',
  dataMitra4:'',
  dataTelkom4:'',
};

const EbisDetailReducer = (state = initialState, action) => {
  switch (action.type) {
    //--------------------------prospect
      //detail ALL
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
          dataAll:action.payload.data,
        }
      break;

      //detail SUBS
      case 'DETAIL_SUBS_PROSPECT_EBIS_REJECTED':
        return{
          ...state, 
        }
      break;
      case 'DETAIL_SUBS_PROSPECT_EBIS_PENDING':
        return{
          ...state, 
        }
      break;
      case 'DETAIL_SUBS_PROSPECT_EBIS_FULFILLED':
        return{
          ...state, 
          //Current status
          dataSubs:action.payload.data,
        }
      break;

      //detail MITRA
      case 'DETAIL_MITRA_PROSPECT_EBIS_REJECTED':
        return{
          ...state, 
        }
      break;
      case 'DETAIL_MITRA_PROSPECT_EBIS_PENDING':
        return{
          ...state, 
        }
      break;
      case 'DETAIL_MITRA_PROSPECT_EBIS_FULFILLED':
        return{
          ...state, 
          //Current status
          dataMitra:action.payload.data,
        }
      break;

      //detail TELKOM
      case 'DETAIL_TELKOM_PROSPECT_EBIS_REJECTED':
        return{
          ...state, 
        }
      break;
      case 'DETAIL_TELKOM_PROSPECT_EBIS_PENDING':
        return{
          ...state, 
        }
      break;
      case 'DETAIL_TELKOM_PROSPECT_EBIS_FULFILLED':
        return{
          ...state, 
          //Current status
          dataTelkom:action.payload.data,
        }
      break;
    //--------------------------prospect
    







    //--------------------------submission
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
          dataAll2:action.payload.data,
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
          dataSubs2:action.payload.data,
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
          dataMitra2:action.payload.data,
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
          dataTelkom2:action.payload.data,
        }
      break;
    //--------------------------submission
    







    //---------------------------win
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
          dataAll3:action.payload.data,
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
          dataSubs3:action.payload.data,
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
          dataMitra3:action.payload.data,
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
          dataTelkom3:action.payload.data,
        }
      break;
    //---------------------------win









    //----------------------------billcom
      //detail ALL
      case 'DETAIL_BILLCOM_EBIS_REJECTED':
        return{
          ...state, 
        }
      break;
      case 'DETAIL_BILLCOM_EBIS_PENDING':
        return{
          ...state, 
        }
      break;
      case 'DETAIL_BILLCOM_EBIS_FULFILLED':
        return{
          ...state, 
          //Current status
          dataAll4:action.payload.data,
        }
      break;

      //detail SUBS
      case 'DETAIL_SUBS_BILLCOM_EBIS_REJECTED':
        return{
          ...state, 
        }
      break;
      case 'DETAIL_SUBS_BILLCOM_EBIS_PENDING':
        return{
          ...state, 
        }
      break;
      case 'DETAIL_SUBS_BILLCOM_EBIS_FULFILLED':
        return{
          ...state, 
          //Current status
          dataSubs3:action.payload.data,
        }
      break;

      //detail MITRA
      case 'DETAIL_MITRA_BILLCOM_EBIS_REJECTED':
        return{
          ...state, 
        }
      break;
      case 'DETAIL_MITRA_BILLCOM_EBIS_PENDING':
        return{
          ...state, 
        }
      break;
      case 'DETAIL_MITRA_BILLCOM_EBIS_FULFILLED':
        return{
          ...state, 
          //Current status
          dataMitra3:action.payload.data,
        }
      break;

      //detail TELKOM
      case 'DETAIL_TELKOM_BILLCOM_EBIS_REJECTED':
        return{
          ...state, 
        }
      break;
      case 'DETAIL_TELKOM_BILLCOM_EBIS_PENDING':
        return{
          ...state, 
        }
      break;
      case 'DETAIL_TELKOM_BILLCOM_EBIS_FULFILLED':
        return{
          ...state, 
          //Current status
          dataTelkom3:action.payload.data,
        }
      break;
    //----------------------------billcom

    
    default:
      return state;
  }
};

export default EbisDetailReducer;