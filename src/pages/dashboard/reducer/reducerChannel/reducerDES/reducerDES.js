const initialState = { 
  loaderStatus:false,
  //data ebis
  ebisProspectREVENUE:'',
  ebisProspectProject:'',
  ebisProspectTarget:'',
  ebisPROSPECT_GTMA: '',
  ebisPROSPECT_GTMA_PROJECT: '',
  ebisPROSPECT_NGTMA: '',
  ebisPROSPECT_NGTMA_PROJECT: '',
  PROSPECT_OC: '',
  PROSPECT_OC_PROJECT: '',

  ebisSubmisionREVENUE:'',
  ebisSubmissionProject:'',
  ebisSubmissionTarget:'',
  ebisSUBMISSION_GTMA:'',
  ebisSUBMISSION_GTMA_PROJECT:'',
  ebisSUBMISSION_NGTMA:'',
  ebisSUBMISSION_NGTMA_PROJECT:'',
  ebisSUBMISSION_OC: '',
  ebisSUBMISSION_OC_PROJECT: '',

  ebisWinREVENUE:'',
  ebisWinProject:'',
  ebisWinTarget:'',
  ebisWIN_GTMA: '',
  ebisWIN_GTMA_PROJECT: '',
  ebisWIN_NGTMA: '',
  ebisWIN_NGTMA_PROJECT: '',
  ebisWIN_OC: '',
  ebisWIN_OC_PROJECT: '',

  ebisBillcomREVENUE:'',
  ebisBillcomeProject:'',
  ebisBillcommTarget:'',
  ebisBILLCOM_GTMA: '',
  ebisBILLCOM_GTMA_PROJECT: '',
  ebisBILLCOM_NGTMA: '',
  ebisBILLCOM_NGTMA_PROJECT: '',
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

const DesReducerChannel = (state = initialState, action) => {
  switch (action.type) {

    //data last update 
    case 'DES_LASTUPDATE_CHANNEL_FULFILLED':
      const dataJSON1 = JSON.parse(action.payload.data)
      return {
        ...state, 
        ebisLastupdate: dataJSON1[0].RECTIME,
      }
    break;
    
    //reducer data ebis
    case 'DES_HOME_CHANNEL_REJECTED':
      return{
        ...state, 
        loaderStatus:false,
        statusErrorFrom:false,
      }
    break;
    
    case 'DES_HOME_CHANNEL_PENDING':
      return{
        ...state, 
        loaderStatus:true,
      }
    break;

    case 'DES_HOME_CHANNEL_FULFILLED':
      const dataJSON2 = JSON.parse(action.payload.data)
      return {
        ...state, 
        loaderStatus:false,

        ebisProspectREVENUE:dataJSON2.PROSPECT.TOTAL,
        ebisProspectProject:dataJSON2.PROSPECT.JML_PROJECT,
        ebisPROSPECT_GTMA: dataJSON2.PROSPECT_GTMA.TOTAL,
        ebisPROSPECT_GTMA_PROJECT: dataJSON2.PROSPECT_GTMA.JML_PROJECT,
        ebisPROSPECT_NGTMA: dataJSON2.PROSPECT_NGTMA.TOTAL,
        ebisPROSPECT_NGTMA_PROJECT: dataJSON2.PROSPECT_NGTMA.JML_PROJECT,
        PROSPECT_OC: dataJSON2.PROSPECT_OC.TOTAL,
        PROSPECT_OC_PROJECT: dataJSON2.PROSPECT_OC.JML_PROJECT,

        ebisSubmisionREVENUE:dataJSON2.SUBMISSION.TOTAL,
        ebisSubmissionProject:dataJSON2.SUBMISSION.JML_PROJECT,
        ebisSUBMISSION_GTMA:dataJSON2.SUBMISSION_GTMA.TOTAL,
        ebisSUBMISSION_GTMA_PROJECT:dataJSON2.SUBMISSION_GTMA.JML_PROJECT,
        ebisSUBMISSION_NGTMA:dataJSON2.SUBMISSION_NGTMA.TOTAL,
        ebisSUBMISSION_NGTMA_PROJECT:dataJSON2.SUBMISSION_NGTMA.JML_PROJECT,
        ebisSUBMISSION_OC: dataJSON2.SUBMISSION_OC.TOTAL,
        ebisSUBMISSION_OC_PROJECT: dataJSON2.SUBMISSION_OC.JML_PROJECT,

        ebisWinREVENUE:dataJSON2.WIN.TOTAL,
        ebisWinProject:dataJSON2.WIN.JML_PROJECT,
        ebisWIN_GTMA: dataJSON2.WIN_GTMA.TOTAL,
        ebisWIN_GTMA_PROJECT: dataJSON2.WIN_GTMA.JML_PROJECT,
        ebisWIN_NGTMA: dataJSON2.WIN_NGTMA.TOTAL,
        ebisWIN_NGTMA_PROJECT: dataJSON2.WIN_NGTMA.JML_PROJECT,
        ebisWIN_OC: dataJSON2.WIN_OC.TOTAL,
        ebisWIN_OC_PROJECT: dataJSON2.WIN_OC.JML_PROJECT,
      
        ebisBillcomREVENUE:dataJSON2.BILLCOM.TOTAL,
        ebisBillcomeProject:dataJSON2.BILLCOM.JML_PROJECT,
        ebisBILLCOM_GTMA: dataJSON2.BILLCOM_GTMA.TOTAL,
        ebisBILLCOM_GTMA_PROJECT: dataJSON2.BILLCOM_GTMA.JML_PROJECT,
        ebisBILLCOM_NGTMA: dataJSON2.BILLCOM_NGTMA.TOTAL,
        ebisBILLCOM_NGTMA_PROJECT: dataJSON2.BILLCOM_NGTMA.JML_PROJECT,
        ebisBILLCOM_OC: dataJSON2.BILLCOM_OC.TOTAL,
        ebisBILLCOM_OC_PROJECT: dataJSON2.BILLCOM_OC.JML_PROJECT,
      }
    break;

    //reducer submission 
    case 'DES_HOME_SUBMISSION_CHANNEL_REJECTED':
      return{
        ...state, 
        loaderStatus:false,
        statusErrorFrom:false,
      }
    break;
    
    case 'DES_HOME_SUBMISSION_CHANNEL_PENDING':
      return{
        ...state, 
        loaderStatus:true,
      }
    break;

    case 'DES_HOME_SUBMISSION_CHANNEL_FULFILLED':
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
    case 'DES_HOME_CURRENT_CHANNEL_REJECTED':
      return{
        ...state, 
        loaderStatus:false,
        statusErrorFrom:false,
      }
    break;
    
    case 'DES_HOME_CURRENT_CHANNEL_PENDING':
      return{
        ...state, 
        loaderStatus:true,
      }
    break;

    case 'DES_HOME_CURRENT_CHANNEL_FULFILLED':
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
    
    case 'DES_HOME_DOWNLOAD_CHANNEL_REJECTED':
      return{
        ...state, 
      }
    break;
    
    case 'DES_HOME_DOWNLOAD_CHANNEL_PENDING':
      return{
        ...state, 
      }
    break;

    case 'DES_HOME_DOWNLOAD_CHANNEL_FULFILLED':
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


export default DesReducerChannel;