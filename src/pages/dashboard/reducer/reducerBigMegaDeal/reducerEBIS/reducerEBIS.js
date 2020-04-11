const initialState = { 
  loaderStatus:false,
  //data ebis
  ebisProspectREVENUE:'',
  ebisProspectProject:'',
  ebisProspectTarget:'',
  ebisPROSPECT_GTMA: '',
  ebisPROSPECT_GTMA_PROJECT: '',
  PROSPECT_OC: '',
  PROSPECT_OC_PROJECT: '',

  ebisSubmisionREVENUE:'',
  ebisSubmissionProject:'',
  ebisSubmissionTarget:'',
  ebisSUBMISSION_GTMA:'',
  ebisSUBMISSION_GTMA_PROJECT:'',
  ebisSUBMISSION_OC: '',
  ebisSUBMISSION_OC_PROJECT: '',

  ebisWinREVENUE:'',
  ebisWinProject:'',
  ebisWinTarget:'',
  ebisWIN_GTMA: '',
  ebisWIN_GTMA_PROJECT: '',
  ebisWIN_OC: '',
  ebisWIN_OC_PROJECT: '',

  ebisBillcomREVENUE:'',
  ebisBillcomeProject:'',
  ebisBillcommTarget:'',
  ebisBILLCOM_GTMA: '',
  ebisBILLCOM_GTMA_PROJECT: '',
  ebisBILLCOM_OC: '',
  ebisBILLCOM_OC_PROJECT: '',

  SubmissionWINRevenue:'',
  SubmissionWINProject:'',
  SubmissionLOOSERevenue:'',
  SubmissionLooseProject:'',
  SubmissionWaitingRevenue:'',
  SubmissionWaitingProject:'',
  SubmissionCancelRevenue:'',
  SubmissionCancekProject:'',

  currentProspectRevenue:'',
  currentProspectProject:'',
  currentSubmissionRevenue:'',
  currentSubmissionProject:'',
  currentWINRevenue:'',
  currentWINProject:'',
  currentBIllcomRevenue:'',
  currentBillcomProject:'',

  ebisLastupdate: '',

  dataDownloadEbis:null,
};

const EbisReducerBMD = (state = initialState, action) => {
  switch (action.type) {

    //data last update 
    case 'EBIS_LASTUPDATE_BMD_FULFILLED':
      return {
        ...state, 
        ebisLastupdate: action.payload.data[0].RECTIME,
      }
    break;
    
    //reducer data ebis
    case 'EBIS_HOME_BMD_REJECTED':
      return{
        ...state, 
        loaderStatus:false,
        statusErrorFrom:false,
      }
    break;
    
    case 'EBIS_HOME_BMD_PENDING':
      return{
        ...state, 
        loaderStatus:true,
      }
    break;

    case 'EBIS_HOME_BMD_FULFILLED':
      return {
        ...state, 
        loaderStatus:false,

        ebisProspectREVENUE:action.payload.data.PROSPECT.TOTAL,
        ebisProspectProject:action.payload.data.PROSPECT.JML_PROJECT,
        ebisPROSPECT_GTMA: action.payload.data.PROSPECT_BIGDEAL.TOTAL,
        ebisPROSPECT_GTMA_PROJECT: action.payload.data.PROSPECT_BIGDEAL.JML_PROJECT,
        PROSPECT_OC: action.payload.data.PROSPECT_MEGADEAL.TOTAL,
        PROSPECT_OC_PROJECT: action.payload.data.PROSPECT_MEGADEAL.JML_PROJECT,

        ebisSubmisionREVENUE:action.payload.data.SUBMISSION.TOTAL,
        ebisSubmissionProject:action.payload.data.SUBMISSION.JML_PROJECT,
        ebisSUBMISSION_GTMA:action.payload.data.SUBMISSION_BIGDEAL.TOTAL,
        ebisSUBMISSION_GTMA_PROJECT:action.payload.data.SUBMISSION_BIGDEAL.JML_PROJECT,
        ebisSUBMISSION_OC: action.payload.data.SUBMISSION_MEGADEAL.TOTAL,
        ebisSUBMISSION_OC_PROJECT: action.payload.data.SUBMISSION_MEGADEAL.JML_PROJECT,

        ebisWinREVENUE:action.payload.data.WIN.TOTAL,
        ebisWinProject:action.payload.data.WIN.JML_PROJECT,
        ebisWIN_GTMA: action.payload.data.WIN_BIGDEAL.TOTAL,
        ebisWIN_GTMA_PROJECT: action.payload.data.WIN_BIGDEAL.JML_PROJECT,
        ebisWIN_OC: action.payload.data.WIN_MEGADEAL.TOTAL,
        ebisWIN_OC_PROJECT: action.payload.data.WIN_MEGADEAL.JML_PROJECT,
      
        ebisBillcomREVENUE:action.payload.data.BILLCOM.TOTAL,
        ebisBillcomeProject:action.payload.data.BILLCOM.JML_PROJECT,
        ebisBILLCOM_GTMA: action.payload.data.BILLCOM_BIGDEAL.TOTAL,
        ebisBILLCOM_GTMA_PROJECT: action.payload.data.BILLCOM_BIGDEAL.JML_PROJECT,
        ebisBILLCOM_OC: action.payload.data.BILLCOM_MEGADEAL.TOTAL,
        ebisBILLCOM_OC_PROJECT: action.payload.data.BILLCOM_MEGADEAL.JML_PROJECT,
      }
    break;

    //reducer submission 
    case 'EBIS_HOME_SUBMISSION_BMD_REJECTED':
      return{
        ...state, 
        loaderStatus:false,
        statusErrorFrom:false,
      }
    break;
    
    case 'EBIS_HOME_SUBMISSION_BMD_PENDING':
      return{
        ...state, 
        loaderStatus:true,
      }
    break;

    case 'EBIS_HOME_SUBMISSION_BMD_FULFILLED':
      return{
        ...state, 
        //Current status
        SubmissionWINRevenue:action.payload.data.WIN.TOTAL,
        SubmissionWINProject:action.payload.data.WIN.JML_PROJECT,

        SubmissionLOOSERevenue:action.payload.data.LOSE.TOTAL,
        SubmissionLooseProject:action.payload.data.LOSE.JML_PROJECT,

        SubmissionWaitingRevenue:action.payload.data.WAITING.TOTAL,
        SubmissionWaitingProject:action.payload.data.WAITING.JML_PROJECT,

        SubmissionCancelRevenue:action.payload.data.CANCEL.TOTAL,
        SubmissionCancekProject:action.payload.data.CANCEL.JML_PROJECT,
      }
    break;

    //reducer current
    case 'EBIS_HOME_CURRENT_BMD_REJECTED':
      return{
        ...state, 
        loaderStatus:false,
        statusErrorFrom:false,
      }
    break;
    
    case 'EBIS_HOME_CURRENT_BMD_PENDING':
      return{
        ...state, 
        loaderStatus:true,
      }
    break;

    case 'EBIS_HOME_CURRENT_BMD_FULFILLED':
      return{
        ...state, 
        //Current status
        currentProspectRevenue:action.payload.data.PROSPECT.TOTAL,
        currentProspectProject:action.payload.data.PROSPECT.JML_PROJECT,
        currentSubmissionRevenue:action.payload.data.SUBMISSION.TOTAL,
        currentSubmissionProject:action.payload.data.SUBMISSION.JML_PROJECT,
        currentWINRevenue:action.payload.data.WIN.TOTAL,
        currentWINProject:action.payload.data.WIN.JML_PROJECT,
        currentBIllcomRevenue:action.payload.data.BILLCOM.TOTAL,
        currentBillcomProject:action.payload.data.BILLCOM.JML_PROJECT,
      }
    break;

    //--------------------------------------------download excel periode
    
    case 'EBIS_HOME_DOWNLOAD_BMD_REJECTED':
      return{
        ...state, 
      }
    break;
    
    case 'EBIS_HOME_DOWNLOAD_BMD_PENDING':
      return{
        ...state, 
      }
    break;

    case 'EBIS_HOME_DOWNLOAD_BMD_FULFILLED':
      return {
        ...state, 
        dataDownloadEbis:action.payload.data,
      }
    break;

    default:
      return state;
  }
};


export default EbisReducerBMD;