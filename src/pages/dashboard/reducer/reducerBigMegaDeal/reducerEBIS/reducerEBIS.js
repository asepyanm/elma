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
      const dataJSON1 = JSON.parse(action.payload.data)
      return {
        ...state, 
        ebisLastupdate: dataJSON1[0].RECTIME,
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
      const dataJSON2 = JSON.parse(action.payload.data)
      return {
        ...state, 
        loaderStatus:false,

        ebisProspectREVENUE:dataJSON2.PROSPECT.TOTAL,
        ebisProspectProject:dataJSON2.PROSPECT.JML_PROJECT,
        ebisPROSPECT_GTMA: dataJSON2.PROSPECT_BIGDEAL.TOTAL,
        ebisPROSPECT_GTMA_PROJECT: dataJSON2.PROSPECT_BIGDEAL.JML_PROJECT,
        PROSPECT_OC: dataJSON2.PROSPECT_MEGADEAL.TOTAL,
        PROSPECT_OC_PROJECT: dataJSON2.PROSPECT_MEGADEAL.JML_PROJECT,

        ebisSubmisionREVENUE:dataJSON2.SUBMISSION.TOTAL,
        ebisSubmissionProject:dataJSON2.SUBMISSION.JML_PROJECT,
        ebisSUBMISSION_GTMA:dataJSON2.SUBMISSION_BIGDEAL.TOTAL,
        ebisSUBMISSION_GTMA_PROJECT:dataJSON2.SUBMISSION_BIGDEAL.JML_PROJECT,
        ebisSUBMISSION_OC: dataJSON2.SUBMISSION_MEGADEAL.TOTAL,
        ebisSUBMISSION_OC_PROJECT: dataJSON2.SUBMISSION_MEGADEAL.JML_PROJECT,

        ebisWinREVENUE:dataJSON2.WIN.TOTAL,
        ebisWinProject:dataJSON2.WIN.JML_PROJECT,
        ebisWIN_GTMA: dataJSON2.WIN_BIGDEAL.TOTAL,
        ebisWIN_GTMA_PROJECT: dataJSON2.WIN_BIGDEAL.JML_PROJECT,
        ebisWIN_OC: dataJSON2.WIN_MEGADEAL.TOTAL,
        ebisWIN_OC_PROJECT: dataJSON2.WIN_MEGADEAL.JML_PROJECT,
      
        ebisBillcomREVENUE:dataJSON2.BILLCOM.TOTAL,
        ebisBillcomeProject:dataJSON2.BILLCOM.JML_PROJECT,
        ebisBILLCOM_GTMA: dataJSON2.BILLCOM_BIGDEAL.TOTAL,
        ebisBILLCOM_GTMA_PROJECT: dataJSON2.BILLCOM_BIGDEAL.JML_PROJECT,
        ebisBILLCOM_OC: dataJSON2.BILLCOM_MEGADEAL.TOTAL,
        ebisBILLCOM_OC_PROJECT: dataJSON2.BILLCOM_MEGADEAL.JML_PROJECT,
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
      const dataJSON3 = JSON.parse(action.payload.data)
      return{
        ...state, 
        //Current status
        SubmissionWINRevenue:dataJSON3.WIN.TOTAL,
        SubmissionWINProject:dataJSON3.WIN.JML_PROJECT,

        SubmissionLOOSERevenue:dataJSON3.LOSE.TOTAL,
        SubmissionLooseProject:dataJSON3.LOSE.JML_PROJECT,

        SubmissionWaitingRevenue:dataJSON3.WAITING.TOTAL,
        SubmissionWaitingProject:dataJSON3.WAITING.JML_PROJECT,

        SubmissionCancelRevenue:dataJSON3.CANCEL.TOTAL,
        SubmissionCancekProject:dataJSON3.CANCEL.JML_PROJECT,
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
      const dataJSON4 = JSON.parse(action.payload.data)
      return{
        ...state, 
        //Current status
        currentProspectRevenue:dataJSON4.PROSPECT.TOTAL,
        currentProspectProject:dataJSON4.PROSPECT.JML_PROJECT,
        currentSubmissionRevenue:dataJSON4.SUBMISSION.TOTAL,
        currentSubmissionProject:dataJSON4.SUBMISSION.JML_PROJECT,
        currentWINRevenue:dataJSON4.WIN.TOTAL,
        currentWINProject:dataJSON4.WIN.JML_PROJECT,
        currentBIllcomRevenue:dataJSON4.BILLCOM.TOTAL,
        currentBillcomProject:dataJSON4.BILLCOM.JML_PROJECT,
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
      const dataJSON5 = JSON.parse(action.payload.data)
      return {
        ...state, 
        dataDownloadEbis:dataJSON5,
      }
    break;

    default:
      return state;
  }
};


export default EbisReducerBMD;