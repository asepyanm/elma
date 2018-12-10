const initialState = { 
  loaderStatus:false,

  //data DES prospect
  dataAll:'',
  dataSubs:'',
  dataMitra:'',
  dataTelkom:'',

  //data DES submission
  dataAll2:'',
  dataSubs2:'',
  dataMitra2:'',
  dataTelkom2:'',

  //data DES win
  dataAll3:'',
  dataSubs3:'',
  dataMitra3:'',
  dataTelkom3:'',

  //data DES billcom
  dataAll4:'',
  dataSubs4:'',
  dataMitra4:'',
  dataTelkom4:'',
};

const DesDetailReducer = (state = initialState, action) => {
  switch (action.type) {

    //detail all
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
        dataAll:action.payload.data,
      }
    break;
    
    //detail SUBS
    case 'DETAIL_SUBS_PROSPECT_DES_REJECTED':
      return{
        ...state, 
      }
    break;
    case 'DETAIL_SUBS_PROSPECT_DES_PENDING':
      return{
        ...state, 
      }
    break;
    case 'DETAIL_SUBS_PROSPECT_DES_FULFILLED':
      return{
        ...state, 
        //Current status
        dataSubs:action.payload.data,
      }
    break;

    //detail MITRA
    case 'DETAIL_MITRA_PROSPECT_DES_REJECTED':
      return{
        ...state, 
      }
    break;
    case 'DETAIL_MITRA_PROSPECT_DES_PENDING':
      return{
        ...state, 
      }
    break;
    case 'DETAIL_MITRA_PROSPECT_DES_FULFILLED':
      return{
        ...state, 
        //Current status
        dataMitra:action.payload.data,
      }
    break;

    //detail TELKOM
    case 'DETAIL_TELKOM_PROSPECT_DES_REJECTED':
      return{
        ...state, 
      }
    break;
    case 'DETAIL_TELKOM_PROSPECT_DES_PENDING':
      return{
        ...state, 
      }
    break;
    case 'DETAIL_TELKOM_PROSPECT_DES_FULFILLED':
      return{
        ...state, 
        //Current status
        dataTelkom:action.payload.data,
      }
    break;
  //--------------------------prospect








  //--------------------------submission
    //detail ALL
    case 'DETAIL_SUBMISSION_DES_REJECTED':
      return{
        ...state, 
      }
    break;
    case 'DETAIL_SUBMISSION_DES_PENDING':
      return{
        ...state, 
      }
    break;
    case 'DETAIL_SUBMISSION_DES_FULFILLED':
      return{
        ...state, 
        //Current status
        dataAll2:action.payload.data,
      }
    break;

    //detail SUBS
    case 'DETAIL_SUBS_SUBMISSION_DES_REJECTED':
      return{
        ...state, 
      }
    break;
    case 'DETAIL_SUBS_SUBMISSION_DES_PENDING':
      return{
        ...state, 
      }
    break;
    case 'DETAIL_SUBS_SUBMISSION_DES_FULFILLED':
      return{
        ...state, 
        //Current status
        dataSubs2:action.payload.data,
      }
    break;

    //detail MITRA
    case 'DETAIL_MITRA_SUBMISSION_DES_REJECTED':
      return{
        ...state, 
      }
    break;
    case 'DETAIL_MITRA_SUBMISSION_DES_PENDING':
      return{
        ...state, 
      }
    break;
    case 'DETAIL_MITRA_SUBMISSION_DES_FULFILLED':
      return{
        ...state, 
        //Current status
        dataMitra2:action.payload.data,
      }
    break;

    //detail TELKOM
    case 'DETAIL_TELKOM_SUBMISSION_DES_REJECTED':
      return{
        ...state, 
      }
    break;
    case 'DETAIL_TELKOM_SUBMISSION_DES_PENDING':
      return{
        ...state, 
      }
    break;
    case 'DETAIL_TELKOM_SUBMISSION_DES_FULFILLED':
      return{
        ...state, 
        //Current status
        dataTelkom2:action.payload.data,
      }
    break;
  //--------------------------submission








  //---------------------------win
    //detail ALL
    case 'DETAIL_WIN_DES_REJECTED':
      return{
        ...state, 
      }
    break;
    case 'DETAIL_WIN_DES_PENDING':
      return{
        ...state, 
      }
    break;
    case 'DETAIL_WIN_DES_FULFILLED':
      return{
        ...state, 
        //Current status
        dataAll3:action.payload.data,
      }
    break;

    //detail SUBS
    case 'DETAIL_SUBS_WIN_DES_REJECTED':
      return{
        ...state, 
      }
    break;
    case 'DETAIL_SUBS_WIN_DES_PENDING':
      return{
        ...state, 
      }
    break;
    case 'DETAIL_SUBS_WIN_DES_FULFILLED':
      return{
        ...state, 
        //Current status
        dataSubs3:action.payload.data,
      }
    break;

    //detail MITRA
    case 'DETAIL_MITRA_WIN_DES_REJECTED':
      return{
        ...state, 
      }
    break;
    case 'DETAIL_MITRA_WIN_DES_PENDING':
      return{
        ...state, 
      }
    break;
    case 'DETAIL_MITRA_WIN_DES_FULFILLED':
      return{
        ...state, 
        //Current status
        dataMitra3:action.payload.data,
      }
    break;

    //detail TELKOM
    case 'DETAIL_TELKOM_WIN_DES_REJECTED':
      return{
        ...state, 
      }
    break;
    case 'DETAIL_TELKOM_WIN_DES_PENDING':
      return{
        ...state, 
      }
    break;
    case 'DETAIL_TELKOM_WIN_DES_FULFILLED':
      return{
        ...state, 
        //Current status
        dataTelkom3:action.payload.data,
      }
    break;
  //---------------------------win









  //----------------------------billcom
    //detail ALL
    case 'DETAIL_BILLCOM_DES_REJECTED':
      return{
        ...state, 
      }
    break;
    case 'DETAIL_BILLCOM_DES_PENDING':
      return{
        ...state, 
      }
    break;
    case 'DETAIL_BILLCOM_DES_FULFILLED':
      return{
        ...state, 
        //Current status
        dataAll4:action.payload.data,
      }
    break;

    //detail SUBS
    case 'DETAIL_SUBS_BILLCOM_DES_REJECTED':
      return{
        ...state, 
      }
    break;
    case 'DETAIL_SUBS_BILLCOM_DES_PENDING':
      return{
        ...state, 
      }
    break;
    case 'DETAIL_SUBS_BILLCOM_DES_FULFILLED':
      return{
        ...state, 
        //Current status
        dataSubs4:action.payload.data,
      }
    break;

    //detail MITRA
    case 'DETAIL_MITRA_BILLCOM_DES_REJECTED':
      return{
        ...state, 
      }
    break;
    case 'DETAIL_MITRA_BILLCOM_DES_PENDING':
      return{
        ...state, 
      }
    break;
    case 'DETAIL_MITRA_BILLCOM_DES_FULFILLED':
      return{
        ...state, 
        //Current status
        dataMitra4:action.payload.data,
      }
    break;

    //detail TELKOM
    case 'DETAIL_TELKOM_BILLCOM_DES_REJECTED':
      return{
        ...state, 
      }
    break;
    case 'DETAIL_TELKOM_BILLCOM_DES_PENDING':
      return{
        ...state, 
      }
    break;
    case 'DETAIL_TELKOM_BILLCOM_DES_FULFILLED':
      return{
        ...state, 
        //Current status
        dataTelkom4:action.payload.data,
      }
    break;
  //----------------------------billcom

  //----------------------------detail level 3
    case 'DETAIL_LEVEL_3_DES_REJECTED':
      return{
        ...state, 
        loaderStatus:false
      }
    break;
    case 'DETAIL_LEVEL_3_DES_PENDING':
      return{
        ...state, 
        loaderStatus:true
      }
    break;
    case 'DETAIL_LEVEL_3_DES_FULFILLED':
      return{
        ...state, 
        loaderStatus:false,
        //Current status
        dataDetailLevel3:action.payload.data,
      }
    break;

    default:
      return state;
  }
};

export default DesDetailReducer;