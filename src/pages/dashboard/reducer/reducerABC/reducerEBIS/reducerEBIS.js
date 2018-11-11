const initialState = { 
  loaderStatus:false,
  data:'',

  //data ebis
  ebisProspectREVENUE:'',
  ebisProspectProject:'',
  ebisProspectTargetA:'',
  ebisProspectTargetB:'',
  ebisProspectTargetC:'',
  ebisProspectTargetO:'',

  ebisSubmisionREVENUE:'',
  ebisSubmissionProject:'',
  ebisSubmissionTargetA:'',
  ebisSubmissionTargetB:'',
  ebisSubmissionTargetC:'',
  ebisSubmissionTargetO:'',

  ebisWinREVENUE:'',
  ebisWinProject:'',
  ebisWinTargetA:'',
  ebisWinTargetB:'',
  ebisWinTargetC:'',
  ebisWinTargetO:'',

  ebisBillcomREVENUE:'',
  ebisBillcomeProject:'',
  ebisBillcommTargetA:'',
  ebisBillcommTargetB:'',
  ebisBillcommTargetC:'',
  ebisBillcommTargetO:'',

  //data submission
  SubmissionWINRevenue:'',
  SubmissionWINRevenue2:'',
  SubmissionWINRevenue3:'',
  SubmissionWINRevenue4:'',
  SubmissionWINProject:'',

  SubmissionLOOSERevenue:'',
  SubmissionLOOSERevenue2:'',
  SubmissionLOOSERevenue3:'',
  SubmissionLOOSERevenue4:'',
  SubmissionLooseProject:'',

  SubmissionWaitingRevenue:'',
  SubmissionWaitingRevenue2:'',
  SubmissionWaitingRevenue3:'',
  SubmissionWaitingRevenue4:'',
  SubmissionWaitingProject:'',

  SubmissionCancelRevenue:'',
  SubmissionCancelRevenue2:'',
  SubmissionCancelRevenue3:'',
  SubmissionCancelRevenue4:'',
  SubmissionCancekProject:'',

  //data current
  currentProspectRevenue:'',
  currentProspectRevenue2:'',
  currentProspectRevenue3:'',
  currentProspectRevenue4:'',
  currentProspectProject:'',

  currentSubmissionRevenue:'',
  currentSubmissionRevenue2:'',
  currentSubmissionRevenue3:'',
  currentSubmissionRevenue4:'',
  currentSubmissionProject:'',

  currentWINRevenue:'',
  currentWINRevenue2:'',
  currentWINRevenue3:'',
  currentWINRevenue4:'',
  currentWINProject:'',

  currentBIllcomRevenue:'',
  currentBIllcomRevenue2:'',
  currentBIllcomRevenue3:'',
  currentBIllcomRevenue4:'',
  currentBillcomProject:'',
};

const EbisReducerABC = (state = initialState, action) => {
  switch (action.type) {

    case 'EBIS_ABC_REJECTED':
      return{
        ...state, 
        loaderStatus:false,
        statusErrorFrom:false,
      }
    break;
    
    case 'EBIS_ABC_PENDING':
      return{
        ...state, 
        loaderStatus:true,
      }
    break;

    case 'EBIS_ABC_FULFILLED':
      return {
        ...state, 
        loaderStatus:false,
        ebisProspectREVENUE:action.payload.data[0].abc_11_1,
        ebisProspectProject:action.payload.data[0].abc_11_2,
        ebisProspectTargetA:action.payload.data[0].abc_11_3a,
        ebisProspectTargetB:action.payload.data[0].abc_11_3b,
        ebisProspectTargetC:action.payload.data[0].abc_11_3c,
        ebisProspectTargetO:action.payload.data[0].abc_11_3o,

        ebisSubmisionREVENUE :action.payload.data[0].abc_12_1,
        ebisSubmissionProject:action.payload.data[0].abc_12_2,
        ebisSubmissionTargetA:action.payload.data[0].abc_12_3a,
        ebisSubmissionTargetB:action.payload.data[0].abc_12_3b,
        ebisSubmissionTargetC:action.payload.data[0].abc_12_3c,
        ebisSubmissionTargetO:action.payload.data[0].abc_12_3o,

        ebisWinREVENUE:action.payload.data[0].abc_13_1,
        ebisWinProject:action.payload.data[0].abc_13_2,
        ebisWinTargetA:action.payload.data[0].abc_13_3a,
        ebisWinTargetB:action.payload.data[0].abc_13_3b,
        ebisWinTargetC:action.payload.data[0].abc_13_3c,
        ebisWinTargetO:action.payload.data[0].abc_13_3o,

        ebisBillcomREVENUE :action.payload.data[0].abc_14_1bill,
        ebisBillcomeProject:action.payload.data[0].abc_14_2,
        ebisBillcommTargetA:action.payload.data[0].abc_14_3a,
        ebisBillcommTargetB:action.payload.data[0].abc_14_3b,
        ebisBillcommTargetC:action.payload.data[0].abc_14_3c,
        ebisBillcommTargetO:action.payload.data[0].abc_14_3o,

        //submission data
        SubmissionWINRevenue:action.payload.data[0].abc_21_1a,
        SubmissionWINRevenue2:action.payload.data[0].abc_21_1b,
        SubmissionWINRevenue3:action.payload.data[0].abc_21_1c,
        SubmissionWINRevenue4:action.payload.data[0].abc_21_1o,
        SubmissionWINProject:action.payload.data[0].abc_21_2,

        SubmissionLOOSERevenue:action.payload.data[0].abc_22_1a,
        SubmissionLOOSERevenue2:action.payload.data[0].abc_22_1b,
        SubmissionLOOSERevenue3:action.payload.data[0].abc_22_1c,
        SubmissionLOOSERevenue4:action.payload.data[0].abc_22_1o,
        SubmissionLooseProject:action.payload.data[0].abc_22_2,

        SubmissionWaitingRevenue:action.payload.data[0].abc_23_1a,
        SubmissionWaitingRevenue2:action.payload.data[0].abc_23_1b,
        SubmissionWaitingRevenue3:action.payload.data[0].abc_23_1c,
        SubmissionWaitingRevenue4:action.payload.data[0].abc_23_1o,
        SubmissionWaitingProject:action.payload.data[0].abc_23_2,

        SubmissionCancelRevenue:action.payload.data[0].abc_24_1a,
        SubmissionCancelRevenue2:action.payload.data[0].abc_24_1b,
        SubmissionCancelRevenue3:action.payload.data[0].abc_24_1c,
        SubmissionCancelRevenue4:action.payload.data[0].abc_24_1o,
        SubmissionCancekProject:action.payload.data[0].abc_24_2,
      }

    break;

    case 'EBIS_CURRENT_ABC_REJECTED':
      return{
        ...state, 
      }
    break;
    
    case 'EBIS_CURRENT_ABC_PENDING':
      return{
        ...state, 
      }
    break;

    case 'EBIS_CURRENT_ABC_FULFILLED':
      return{
        ...state, 
        //Current data
        currentProspectRevenue :action.payload.data[0].abc_01_1a,
        currentProspectRevenue2:action.payload.data[0].abc_01_1b,
        currentProspectRevenue3:action.payload.data[0].abc_01_1c,
        currentProspectRevenue4:action.payload.data[0].abc_01_10,
        currentProspectProject :action.payload.data[0].abc_01_2,

        currentSubmissionRevenue :action.payload.data[0].abc_02_1a,
        currentSubmissionRevenue2:action.payload.data[0].abc_02_1b,
        currentSubmissionRevenue3:action.payload.data[0].abc_02_1c,
        currentSubmissionRevenue4:action.payload.data[0].abc_02_1o,
        currentSubmissionProject :action.payload.data[0].abc_02_2,

        currentWINRevenue :action.payload.data[0].abc_03_1a,
        currentWINRevenue2:action.payload.data[0].abc_03_1b,
        currentWINRevenue3:action.payload.data[0].abc_03_1c,
        currentWINRevenue4:action.payload.data[0].abc_03_1o,
        currentWINProject :action.payload.data[0].abc_03_2,

        currentBIllcomRevenue :action.payload.data[0].abc_04_1a,
        currentBIllcomRevenue2:action.payload.data[0].abc_04_1b,
        currentBIllcomRevenue3:action.payload.data[0].abc_04_1c,
        currentBIllcomRevenue4:action.payload.data[0].abc_04_1o,
        currentBillcomProject :action.payload.data[0].abc_04_2,

      }
    break;
    
    default:
      return state;
  }
};


export default EbisReducerABC;