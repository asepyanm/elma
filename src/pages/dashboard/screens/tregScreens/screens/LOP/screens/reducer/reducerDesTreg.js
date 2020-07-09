const initialState = { 
  loaderStatus:false,
  //data ebis
  ebisProspectREVENUE:'',
  ebisProspectProject:'',
  ebisProspectTarget:'',
  ebisPresentase:'',

  ebisSubmisionREVENUE:'',
  ebisSubmissionProject:'',
  ebisSubmissionTarget:'',

  ebisWinREVENUE:'',
  ebisWinProject:'',
  ebisWinTarget:'',

  ebisBillcomREVENUE:'',
  ebisBillcomeProject:'',
  ebisBillcommTarget:'',

  ProspectREVENUE:'',
  ProspectProject:'',
  ProspectTarget:'',
  ProspectREVENUE2:'',

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
};

const DesTregReducer = (state = initialState, action) => {
  switch (action.type) {

    case 'DES_HOME_TREG_REJECTED':
      return{
        ...state, 
        loaderStatus:false,
        statusErrorFrom:false,
      }
    break;
    
    case 'DES_HOME_TREG_PENDING':
      return{
        ...state, 
        loaderStatus:true,
      }
    break;

    case 'DES_HOME_TREG_FULFILLED':
      const dataJSON1 = JSON.parse(action.payload.data)
      return {
        ...state, 
        loaderStatus:false,

        ebisProspectREVENUE:parseInt(dataJSON1[0].lop_11_1),
        ebisProspectProject:parseInt(dataJSON1[0].lop_11_2),
        ebisProspectTarget:parseInt(dataJSON1[0].lop_11_3),

        ebisSubmisionREVENUE:parseInt(dataJSON1[0].lop_11_6),
        ebisSubmissionProject:parseInt(dataJSON1[0].lop_12_1),
        ebisSubmissionTarget:parseInt(dataJSON1[0].lop_12_2),

        ebisWinREVENUE:parseInt(dataJSON1[0].lop_12_3),
        ebisWinProject:parseInt(dataJSON1[0].lop_12_6),
        ebisWinTarget:parseInt(dataJSON1[0].lop_13_1),

        ebisBillcomREVENUE:parseInt(dataJSON1[0].lop_13_2),
        ebisBillcomeProject:parseInt(dataJSON1[0].lop_13_3),
        ebisBillcommTarget:parseInt(dataJSON1[0].lop_13_6),

        ProspectREVENUE:parseInt(dataJSON1[0].lop_14_1),
        ProspectProject:parseInt(dataJSON1[0].lop_14_2),
        ProspectTarget:parseInt(dataJSON1[0].lop_14_3),
        ProspectREVENUE2:parseInt(dataJSON1[0].lop_14_6),

        //submission status
        SubmissionWINRevenue:parseInt(dataJSON1[0].lop_21_1),
        SubmissionWINProject:parseInt(dataJSON1[0].lop_21_2),

        SubmissionLOOSERevenue:parseInt(dataJSON1[0].lop_22_1),
        SubmissionLooseProject:parseInt(dataJSON1[0].lop_22_2),

        SubmissionWaitingRevenue:parseInt(dataJSON1[0].lop_23_1),
        SubmissionWaitingProject:parseInt(dataJSON1[0].lop_23_2),

        SubmissionCancelRevenue:parseInt(dataJSON1[0].lop_24_1),
        SubmissionCancekProject:parseInt(dataJSON1[0].lop_24_2),
      }
    break;

    case 'DES_HOME_CURRENT_TREG_REJECTED':
      return{
        ...state, 
      }
    break;
    
    case 'DES_HOME_CURRENT_TREG_PENDING':
      return{
        ...state, 
      }
    break;

    case 'DES_HOME_CURRENT_TREG_FULFILLED':
      const dataJSON2 = JSON.parse(action.payload.data)
      return{
        ...state, 
        //Current status
        currentProspectRevenue:parseInt(dataJSON2[0].lop_01_1),
        currentProspectProject:parseInt(dataJSON2[0].lop_01_2),
        currentSubmissionRevenue:parseInt(dataJSON2[0].lop_02_1),
        currentSubmissionProject:parseInt(dataJSON2[0].lop_02_2),
        currentWINRevenue:parseInt(dataJSON2[0].lop_03_1),
        currentWINProject:parseInt(dataJSON2[0].lop_03_2),
        currentBIllcomRevenue:parseInt(dataJSON2[0].lop_04_1),
        currentBillcomProject:parseInt(dataJSON2[0].lop_04_2),
      }
    break;

    //------------------------------------------------------filter periode

    case 'DES_HOME_TREG_PERIODE_REJECTED':
      return{
        ...state, 
        statusErrorFrom:false,
      }
    break;
    
    case 'DES_HOME_TREG_PERIODE_PENDING':
      return{
        ...state, 
      }
    break;

    case 'DES_HOME_TREG_PERIODE_FULFILLED':
      const dataJSON3 = JSON.parse(action.payload.data)
      return {
        ...state, 

        ebisProspectREVENUE:parseInt(dataJSON3[0].lop_11_1),
        ebisProspectProject:parseInt(dataJSON3[0].lop_11_2),
        ebisProspectTarget:parseInt(dataJSON3[0].lop_11_3),

        ebisSubmisionREVENUE:parseInt(dataJSON3[0].lop_11_6),
        ebisSubmissionProject:parseInt(dataJSON3[0].lop_12_1),
        ebisSubmissionTarget:parseInt(dataJSON3[0].lop_12_2),

        ebisWinREVENUE:parseInt(dataJSON3[0].lop_12_3),
        ebisWinProject:parseInt(dataJSON3[0].lop_12_6),
        ebisWinTarget:parseInt(dataJSON3[0].lop_13_1),

        ebisBillcomREVENUE:parseInt(dataJSON3[0].lop_13_2),
        ebisBillcomeProject:parseInt(dataJSON3[0].lop_13_3),
        ebisBillcommTarget:parseInt(dataJSON3[0].lop_13_6),

        ProspectREVENUE:parseInt(dataJSON3[0].lop_14_1),
        ProspectProject:parseInt(dataJSON3[0].lop_14_2),
        ProspectTarget:parseInt(dataJSON3[0].lop_14_3),
        ProspectREVENUE2:parseInt(dataJSON3[0].lop_14_6),

        //submission status
        SubmissionWINRevenue:parseInt(dataJSON3[0].lop_21_1),
        SubmissionWINProject:parseInt(dataJSON3[0].lop_21_2),

        SubmissionLOOSERevenue:parseInt(dataJSON3[0].lop_22_1),
        SubmissionLooseProject:parseInt(dataJSON3[0].lop_22_2),

        SubmissionWaitingRevenue:parseInt(dataJSON3[0].lop_23_1),
        SubmissionWaitingProject:parseInt(dataJSON3[0].lop_23_2),

        SubmissionCancelRevenue:parseInt(dataJSON3[0].lop_24_1),
        SubmissionCancekProject:parseInt(dataJSON3[0].lop_24_2),
      }
    break;
    
    default:
      return state;
  }
};


export default DesTregReducer;