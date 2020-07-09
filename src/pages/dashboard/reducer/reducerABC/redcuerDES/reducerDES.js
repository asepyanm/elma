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

const DESReducerABC = (state = initialState, action) => {
  switch (action.type) {

    case 'DES_ABC_REJECTED':
      return{
        ...state, 
        loaderStatus:false,
        statusErrorFrom:false,
      }
    break;
    
    case 'DES_ABC_PENDING':
      return{
        ...state, 
        loaderStatus:true,
      }
    break;

    case 'DES_ABC_FULFILLED':
      const dataJSON1 = JSON.parse(action.payload.data)
      return {
        ...state, 
        loaderStatus:false,
        ebisProspectREVENUE:dataJSON1[0].abc_11_1,
        ebisProspectProject:dataJSON1[0].abc_11_2,
        ebisProspectTargetA:dataJSON1[0].abc_11_3a,
        ebisProspectTargetB:dataJSON1[0].abc_11_3b,
        ebisProspectTargetC:dataJSON1[0].abc_11_3c,
        ebisProspectTargetO:dataJSON1[0].abc_11_3o,

        ebisSubmisionREVENUE :dataJSON1[0].abc_12_1,
        ebisSubmissionProject:dataJSON1[0].abc_12_2,
        ebisSubmissionTargetA:dataJSON1[0].abc_12_3a,
        ebisSubmissionTargetB:dataJSON1[0].abc_12_3b,
        ebisSubmissionTargetC:dataJSON1[0].abc_12_3c,
        ebisSubmissionTargetO:dataJSON1[0].abc_12_3o,

        ebisWinREVENUE:dataJSON1[0].abc_13_1,
        ebisWinProject:dataJSON1[0].abc_13_2,
        ebisWinTargetA:dataJSON1[0].abc_13_3a,
        ebisWinTargetB:dataJSON1[0].abc_13_3b,
        ebisWinTargetC:dataJSON1[0].abc_13_3c,
        ebisWinTargetO:dataJSON1[0].abc_13_3o,

        ebisBillcomREVENUE :dataJSON1[0].abc_14_1bill,
        ebisBillcomeProject:dataJSON1[0].abc_14_2,
        ebisBillcommTargetA:dataJSON1[0].abc_14_3a,
        ebisBillcommTargetB:dataJSON1[0].abc_14_3b,
        ebisBillcommTargetC:dataJSON1[0].abc_14_3c,
        ebisBillcommTargetO:dataJSON1[0].abc_14_3o,

        //submission data
        SubmissionWINRevenue:dataJSON1[0].abc_21_1a,
        SubmissionWINRevenue2:dataJSON1[0].abc_21_1b,
        SubmissionWINRevenue3:dataJSON1[0].abc_21_1c,
        SubmissionWINRevenue4:dataJSON1[0].abc_21_1o,
        SubmissionWINProject:dataJSON1[0].abc_21_2,

        SubmissionLOOSERevenue:dataJSON1[0].abc_22_1a,
        SubmissionLOOSERevenue2:dataJSON1[0].abc_22_1b,
        SubmissionLOOSERevenue3:dataJSON1[0].abc_22_1c,
        SubmissionLOOSERevenue4:dataJSON1[0].abc_22_1o,
        SubmissionLooseProject:dataJSON1[0].abc_22_2,

        SubmissionWaitingRevenue:dataJSON1[0].abc_23_1a,
        SubmissionWaitingRevenue2:dataJSON1[0].abc_23_1b,
        SubmissionWaitingRevenue3:dataJSON1[0].abc_23_1c,
        SubmissionWaitingRevenue4:dataJSON1[0].abc_23_1o,
        SubmissionWaitingProject:dataJSON1[0].abc_23_2,

        SubmissionCancelRevenue:dataJSON1[0].abc_24_1a,
        SubmissionCancelRevenue2:dataJSON1[0].abc_24_1b,
        SubmissionCancelRevenue3:dataJSON1[0].abc_24_1c,
        SubmissionCancelRevenue4:dataJSON1[0].abc_24_1o,
        SubmissionCancekProject:dataJSON1[0].abc_24_2,
      }

    break;

    case 'DES_CURRENT_ABC_REJECTED':
      return{
        ...state, 
      }
    break;
    
    case 'DES_CURRENT_ABC_PENDING':
      return{
        ...state, 
      }
    break;

    case 'DES_CURRENT_ABC_FULFILLED':
      const dataJSON2 = JSON.parse(action.payload.data)
      return{
        ...state, 
        //Current data
        currentProspectRevenue :dataJSON2[0].abc_01_1a,
        currentProspectRevenue2:dataJSON2[0].abc_01_1b,
        currentProspectRevenue3:dataJSON2[0].abc_01_1c,
        currentProspectRevenue4:dataJSON2[0].abc_01_10,
        currentProspectProject :dataJSON2[0].abc_01_2,

        currentSubmissionRevenue :dataJSON2[0].abc_02_1a,
        currentSubmissionRevenue2:dataJSON2[0].abc_02_1b,
        currentSubmissionRevenue3:dataJSON2[0].abc_02_1c,
        currentSubmissionRevenue4:dataJSON2[0].abc_02_1o,
        currentSubmissionProject :dataJSON2[0].abc_02_2,

        currentWINRevenue :dataJSON2[0].abc_03_1a,
        currentWINRevenue2:dataJSON2[0].abc_03_1b,
        currentWINRevenue3:dataJSON2[0].abc_03_1c,
        currentWINRevenue4:dataJSON2[0].abc_03_1o,
        currentWINProject :dataJSON2[0].abc_03_2,

        currentBIllcomRevenue :dataJSON2[0].abc_04_1a,
        currentBIllcomRevenue2:dataJSON2[0].abc_04_1b,
        currentBIllcomRevenue3:dataJSON2[0].abc_04_1c,
        currentBIllcomRevenue4:dataJSON2[0].abc_04_1o,
        currentBillcomProject :dataJSON2[0].abc_04_2,

      }
    break;
    
    default:
      return state;
  }
};


export default DESReducerABC;