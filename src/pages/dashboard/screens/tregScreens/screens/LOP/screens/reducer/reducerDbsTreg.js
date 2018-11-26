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

const DbsTregReducer = (state = initialState, action) => {
  switch (action.type) {

    case 'DBS_HOME_TREG_REJECTED':
      return{
        ...state, 
        loaderStatus:false,
        statusErrorFrom:false,
      }
    break;
    
    case 'DBS_HOME_TREG_PENDING':
      return{
        ...state, 
        loaderStatus:true,
      }
    break;

    case 'DBS_HOME_TREG_FULFILLED':
      return {
        ...state, 
        loaderStatus:false,

        ebisProspectREVENUE:parseInt(action.payload.data[0].lop_11_1),
        ebisProspectProject:parseInt(action.payload.data[0].lop_11_2),
        ebisProspectTarget:parseInt(action.payload.data[0].lop_11_3),

        ebisSubmisionREVENUE:parseInt(action.payload.data[0].lop_11_6),
        ebisSubmissionProject:parseInt(action.payload.data[0].lop_12_1),
        ebisSubmissionTarget:parseInt(action.payload.data[0].lop_12_2),

        ebisWinREVENUE:parseInt(action.payload.data[0].lop_12_3),
        ebisWinProject:parseInt(action.payload.data[0].lop_12_6),
        ebisWinTarget:parseInt(action.payload.data[0].lop_13_1),

        ebisBillcomREVENUE:parseInt(action.payload.data[0].lop_13_2),
        ebisBillcomeProject:parseInt(action.payload.data[0].lop_13_3),
        ebisBillcommTarget:parseInt(action.payload.data[0].lop_13_6),

        ProspectREVENUE:parseInt(action.payload.data[0].lop_14_1),
        ProspectProject:parseInt(action.payload.data[0].lop_14_2),
        ProspectTarget:parseInt(action.payload.data[0].lop_14_3),
        ProspectREVENUE2:parseInt(action.payload.data[0].lop_14_6),

        //submission status
        SubmissionWINRevenue:parseInt(action.payload.data[0].lop_21_1),
        SubmissionWINProject:parseInt(action.payload.data[0].lop_21_2),

        SubmissionLOOSERevenue:parseInt(action.payload.data[0].lop_22_1),
        SubmissionLooseProject:parseInt(action.payload.data[0].lop_22_2),

        SubmissionWaitingRevenue:parseInt(action.payload.data[0].lop_23_1),
        SubmissionWaitingProject:parseInt(action.payload.data[0].lop_23_2),

        SubmissionCancelRevenue:parseInt(action.payload.data[0].lop_24_1),
        SubmissionCancekProject:parseInt(action.payload.data[0].lop_24_2),
      }
    break;

    case 'DBS_HOME_CURRENT_TREG_REJECTED':
      return{
        ...state, 
      }
    break;
    
    case 'DBS_HOME_CURRENT_TREG_PENDING':
      return{
        ...state, 
      }
    break;

    case 'DBS_HOME_CURRENT_TREG_FULFILLED':
      return{
        ...state, 
        //Current status
        currentProspectRevenue:parseInt(action.payload.data[0].lop_01_1),
        currentProspectProject:parseInt(action.payload.data[0].lop_01_2),
        currentSubmissionRevenue:parseInt(action.payload.data[0].lop_02_1),
        currentSubmissionProject:parseInt(action.payload.data[0].lop_02_2),
        currentWINRevenue:parseInt(action.payload.data[0].lop_03_1),
        currentWINProject:parseInt(action.payload.data[0].lop_03_2),
        currentBIllcomRevenue:parseInt(action.payload.data[0].lop_04_1),
        currentBillcomProject:parseInt(action.payload.data[0].lop_04_2),
      }
    break;
    
    default:
      return state;
  }
};


export default DbsTregReducer;