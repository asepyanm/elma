const initialState = { 
  loaderStatus:false,

  //data DBS prospect
  dataAll:'',
  dataSubs:'',
  dataMitra:'',
  dataTelkom:'',

  //data DBS submission
  dataAll2:'',
  dataSubs2:'',
  dataMitra2:'',
  dataTelkom2:'',

  //data DBS win
  dataAll3:'',
  dataSubs3:'',
  dataMitra3:'',
  dataTelkom3:'',

  //data DBS billcom
  dataAll4:'',
  dataSubs4:'',
  dataMitra4:'',
  dataTelkom4:'',
};

const DbsDetailReducer = (state = initialState, action) => {
  switch (action.type) {
    //detail all
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
        dataAll:action.payload.data,
      }
    break;
    
    //detail SUBS
    case 'DETAIL_SUBS_PROSPECT_DBS_REJECTED':
      return{
        ...state, 
      }
    break;
    case 'DETAIL_SUBS_PROSPECT_DBS_PENDING':
      return{
        ...state, 
      }
    break;
    case 'DETAIL_SUBS_PROSPECT_DBS_FULFILLED':
      return{
        ...state, 
        //Current status
        dataSubs:action.payload.data,
      }
    break;

    //detail MITRA
    case 'DETAIL_MITRA_PROSPECT_DBS_REJECTED':
      return{
        ...state, 
      }
    break;
    case 'DETAIL_MITRA_PROSPECT_DBS_PENDING':
      return{
        ...state, 
      }
    break;
    case 'DETAIL_MITRA_PROSPECT_DBS_FULFILLED':
      return{
        ...state, 
        //Current status
        dataMitra:action.payload.data,
      }
    break;

    //detail TELKOM
    case 'DETAIL_TELKOM_PROSPECT_DBS_REJECTED':
      return{
        ...state, 
      }
    break;
    case 'DETAIL_TELKOM_PROSPECT_DBS_PENDING':
      return{
        ...state, 
      }
    break;
    case 'DETAIL_TELKOM_PROSPECT_DBS_FULFILLED':
      return{
        ...state, 
        //Current status
        dataTelkom:action.payload.data,
      }
    break;
  //--------------------------prospect








  //--------------------------submission
    //detail ALL
    case 'DETAIL_SUBMISSION_DBS_REJECTED':
      return{
        ...state, 
      }
    break;
    case 'DETAIL_SUBMISSION_DBS_PENDING':
      return{
        ...state, 
      }
    break;
    case 'DETAIL_SUBMISSION_DBS_FULFILLED':
      return{
        ...state, 
        //Current status
        dataAll2:action.payload.data,
      }
    break;

    //detail SUBS
    case 'DETAIL_SUBS_SUBMISSION_DBS_REJECTED':
      return{
        ...state, 
      }
    break;
    case 'DETAIL_SUBS_SUBMISSION_DBS_PENDING':
      return{
        ...state, 
      }
    break;
    case 'DETAIL_SUBS_SUBMISSION_DBS_FULFILLED':
      return{
        ...state, 
        //Current status
        dataSubs2:action.payload.data,
      }
    break;

    //detail MITRA
    case 'DETAIL_MITRA_SUBMISSION_DBS_REJECTED':
      return{
        ...state, 
      }
    break;
    case 'DETAIL_MITRA_SUBMISSION_DBS_PENDING':
      return{
        ...state, 
      }
    break;
    case 'DETAIL_MITRA_SUBMISSION_DBS_FULFILLED':
      return{
        ...state, 
        //Current status
        dataMitra2:action.payload.data,
      }
    break;

    //detail TELKOM
    case 'DETAIL_TELKOM_SUBMISSION_DBS_REJECTED':
      return{
        ...state, 
      }
    break;
    case 'DETAIL_TELKOM_SUBMISSION_DBS_PENDING':
      return{
        ...state, 
      }
    break;
    case 'DETAIL_TELKOM_SUBMISSION_DBS_FULFILLED':
      return{
        ...state, 
        //Current status
        dataTelkom2:action.payload.data,
      }
    break;
  //--------------------------submission








  //---------------------------win
    //detail ALL
    case 'DETAIL_WIN_DBS_REJECTED':
      return{
        ...state, 
      }
    break;
    case 'DETAIL_WIN_DBS_PENDING':
      return{
        ...state, 
      }
    break;
    case 'DETAIL_WIN_DBS_FULFILLED':
      return{
        ...state, 
        //Current status
        dataAll3:action.payload.data,
      }
    break;

    //detail SUBS
    case 'DETAIL_SUBS_WIN_DBS_REJECTED':
      return{
        ...state, 
      }
    break;
    case 'DETAIL_SUBS_WIN_DBS_PENDING':
      return{
        ...state, 
      }
    break;
    case 'DETAIL_SUBS_WIN_DBS_FULFILLED':
      return{
        ...state, 
        //Current status
        dataSubs3:action.payload.data,
      }
    break;

    //detail MITRA
    case 'DETAIL_MITRA_WIN_DBS_REJECTED':
      return{
        ...state, 
      }
    break;
    case 'DETAIL_MITRA_WIN_DBS_PENDING':
      return{
        ...state, 
      }
    break;
    case 'DETAIL_MITRA_WIN_DBS_FULFILLED':
      return{
        ...state, 
        //Current status
        dataMitra3:action.payload.data,
      }
    break;

    //detail TELKOM
    case 'DETAIL_TELKOM_WIN_DBS_REJECTED':
      return{
        ...state, 
      }
    break;
    case 'DETAIL_TELKOM_WIN_DBS_PENDING':
      return{
        ...state, 
      }
    break;
    case 'DETAIL_TELKOM_WIN_DBS_FULFILLED':
      return{
        ...state, 
        //Current status
        dataTelkom3:action.payload.data,
      }
    break;
  //---------------------------win









  //----------------------------billcom
    //detail ALL
    case 'DETAIL_BILLCOM_DBS_REJECTED':
      return{
        ...state, 
      }
    break;
    case 'DETAIL_BILLCOM_DBS_PENDING':
      return{
        ...state, 
      }
    break;
    case 'DETAIL_BILLCOM_DBS_FULFILLED':
      return{
        ...state, 
        //Current status
        dataAll4:action.payload.data,
      }
    break;

    //detail SUBS
    case 'DETAIL_SUBS_BILLCOM_DBS_REJECTED':
      return{
        ...state, 
      }
    break;
    case 'DETAIL_SUBS_BILLCOM_DBS_PENDING':
      return{
        ...state, 
      }
    break;
    case 'DETAIL_SUBS_BILLCOM_DBS_FULFILLED':
      return{
        ...state, 
        //Current status
        dataSubs4:action.payload.data,
      }
    break;

    //detail MITRA
    case 'DETAIL_MITRA_BILLCOM_DBS_REJECTED':
      return{
        ...state, 
      }
    break;
    case 'DETAIL_MITRA_BILLCOM_DBS_PENDING':
      return{
        ...state, 
      }
    break;
    case 'DETAIL_MITRA_BILLCOM_DBS_FULFILLED':
      return{
        ...state, 
        //Current status
        dataMitra4:action.payload.data,
      }
    break;

    //detail TELKOM
    case 'DETAIL_TELKOM_BILLCOM_DBS_REJECTED':
      return{
        ...state, 
      }
    break;
    case 'DETAIL_TELKOM_BILLCOM_DBS_PENDING':
      return{
        ...state, 
      }
    break;
    case 'DETAIL_TELKOM_BILLCOM_DBS_FULFILLED':
      return{
        ...state, 
        //Current status
        dataTelkom4:action.payload.data,
      }
    break;
  //----------------------------billcom


    
    default:
      return state;
  }
};

export default DbsDetailReducer;