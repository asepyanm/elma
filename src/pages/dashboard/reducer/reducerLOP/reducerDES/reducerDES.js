const initialState = { 
  loaderStatus:false,
  //data ebis
  ebisProspectREVENUE:'',
  ebisProspectProject:'',
  ebisProspectTarget:'',

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
  ebisLastupdate: '',
};

const DesReducer = (state = initialState, action) => {
  switch (action.type) {

    case 'DES_LASTUPDATE_FULFILLED':
      return {
        ...state, 
        ebisLastupdate: action.payload.data[0].RECTIME,
      }
    break;

    case 'DES_HOME_REJECTED':
      return{
        ...state, 
        loaderStatus:false,
        statusErrorFrom:false,
      }
    break;
    
    case 'DES_HOME_PENDING':
      return{
        ...state, 
        loaderStatus:true,
      }
    break;

    case 'DES_HOME_FULFILLED':
      return {
        ...state, 
        loaderStatus:false,

        ebisProspectREVENUE:action.payload.data[0].lop_11_1,
        ebisProspectProject:action.payload.data[0].lop_11_2,
        ebisProspectTarget:action.payload.data[0].lop_11_3,

        ebisSubmisionREVENUE:action.payload.data[0].lop_11_6,
        ebisSubmissionProject:action.payload.data[0].lop_12_1,
        ebisSubmissionTarget:action.payload.data[0].lop_12_2,

        ebisWinREVENUE:action.payload.data[0].lop_12_3,
        ebisWinProject:action.payload.data[0].lop_12_6,
        ebisWinTarget:action.payload.data[0].lop_13_1,

        ebisBillcomREVENUE:action.payload.data[0].lop_13_2,
        ebisBillcomeProject:action.payload.data[0].lop_13_3,
        ebisBillcommTarget:action.payload.data[0].lop_13_6,

        ProspectREVENUE:action.payload.data[0].lop_14_1,
        ProspectProject:action.payload.data[0].lop_14_2,
        ProspectTarget:action.payload.data[0].lop_14_3,
        ProspectREVENUE2:action.payload.data[0].lop_14_6,

        //submission status
        SubmissionWINRevenue:action.payload.data[0].lop_21_1,
        SubmissionWINProject:action.payload.data[0].lop_21_2,

        SubmissionLOOSERevenue:action.payload.data[0].lop_22_1,
        SubmissionLooseProject:action.payload.data[0].lop_22_2,

        SubmissionWaitingRevenue:action.payload.data[0].lop_23_1,
        SubmissionWaitingProject:action.payload.data[0].lop_23_2,

        SubmissionCancelRevenue:action.payload.data[0].lop_24_1,
        SubmissionCancekProject:action.payload.data[0].lop_24_2,
      }
    break;

    case 'DES_HOME_CURRENT_REJECTED':
      return{
        ...state, 
      }
    break;
    
    case 'DES_HOME_CURRENT_PENDING':
      return{
        ...state, 
      }
    break;

    case 'DES_HOME_CURRENT_FULFILLED':
      return{
        ...state, 
        //Current status
        currentProspectRevenue:action.payload.data[0].lop_01_1,
        currentProspectProject:action.payload.data[0].lop_01_2,
        currentSubmissionRevenue:action.payload.data[0].lop_02_1,
        currentSubmissionProject:action.payload.data[0].lop_02_2,
        currentWINRevenue:action.payload.data[0].lop_03_1,
        currentWINProject:action.payload.data[0].lop_03_2,
        currentBIllcomRevenue:action.payload.data[0].lop_04_1,
        currentBillcomProject:action.payload.data[0].lop_04_2,
      }
    break;

    //--------------------------------------------filter periode

    case 'DES_HOME_FILTER_PERIODE_REJECTED':
      return{
        ...state, 
        statusErrorFrom:false,
      }
    break;
    
    case 'DES_HOME_FILTER_PERIODE_PENDING':
      return{
        ...state, 
      }
    break;

    case 'DES_HOME_FILTER_PERIODE_FULFILLED':
      return {
        ...state, 
        ebisProspectREVENUE:action.payload.data[0].lop_11_1,
        ebisProspectProject:action.payload.data[0].lop_11_2,
        ebisProspectTarget:action.payload.data[0].lop_11_3,

        ebisSubmisionREVENUE:action.payload.data[0].lop_11_6,
        ebisSubmissionProject:action.payload.data[0].lop_12_1,
        ebisSubmissionTarget:action.payload.data[0].lop_12_2,

        ebisWinREVENUE:action.payload.data[0].lop_12_3,
        ebisWinProject:action.payload.data[0].lop_12_6,
        ebisWinTarget:action.payload.data[0].lop_13_1,

        ebisBillcomREVENUE:action.payload.data[0].lop_13_2,
        ebisBillcomeProject:action.payload.data[0].lop_13_3,
        ebisBillcommTarget:action.payload.data[0].lop_13_6,

        ProspectREVENUE:action.payload.data[0].lop_14_1,
        ProspectProject:action.payload.data[0].lop_14_2,
        ProspectTarget:action.payload.data[0].lop_14_3,
        ProspectREVENUE2:action.payload.data[0].lop_14_6,

        //submission status
        SubmissionWINRevenue:action.payload.data[0].lop_21_1,
        SubmissionWINProject:action.payload.data[0].lop_21_2,

        SubmissionLOOSERevenue:action.payload.data[0].lop_22_1,
        SubmissionLooseProject:action.payload.data[0].lop_22_2,

        SubmissionWaitingRevenue:action.payload.data[0].lop_23_1,
        SubmissionWaitingProject:action.payload.data[0].lop_23_2,

        SubmissionCancelRevenue:action.payload.data[0].lop_24_1,
        SubmissionCancekProject:action.payload.data[0].lop_24_2,
      }
    break;

    default:
      return state;
  }
};


export default DesReducer;