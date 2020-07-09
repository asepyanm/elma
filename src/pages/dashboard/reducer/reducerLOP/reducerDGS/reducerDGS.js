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

const DgsReducer = (state = initialState, action) => {
  switch (action.type) {

    case 'DGS_LASTUPDATE_FULFILLED':
      const dataJSON1 = JSON.parse(action.payload.data)

      return {
        ...state, 
        ebisLastupdate: dataJSON1[0].RECTIME,
      }
    break;

    case 'DGS_HOME_REJECTED':
      return{
        ...state, 
        loaderStatus:false,
        statusErrorFrom:false,
      }
    break;
    
    case 'DGS_HOME_PENDING':
      return{
        ...state, 
        loaderStatus:true,
      }
    break;

    case 'DGS_HOME_FULFILLED':
      const dataJSON2 = JSON.parse(action.payload.data)

      return {
        ...state, 
        loaderStatus:false,

        ebisProspectREVENUE:dataJSON2[0].lop_11_1,
        ebisProspectProject:dataJSON2[0].lop_11_2,
        ebisProspectTarget:dataJSON2[0].lop_11_3,

        ebisSubmisionREVENUE:dataJSON2[0].lop_11_6,
        ebisSubmissionProject:dataJSON2[0].lop_12_1,
        ebisSubmissionTarget:dataJSON2[0].lop_12_2,

        ebisWinREVENUE:dataJSON2[0].lop_12_3,
        ebisWinProject:dataJSON2[0].lop_12_6,
        ebisWinTarget:dataJSON2[0].lop_13_1,

        ebisBillcomREVENUE:dataJSON2[0].lop_13_2,
        ebisBillcomeProject:dataJSON2[0].lop_13_3,
        ebisBillcommTarget:dataJSON2[0].lop_13_6,

        ProspectREVENUE:dataJSON2[0].lop_14_1,
        ProspectProject:dataJSON2[0].lop_14_2,
        ProspectTarget:dataJSON2[0].lop_14_3,
        ProspectREVENUE2:dataJSON2[0].lop_14_6,

        //submission status
        SubmissionWINRevenue:dataJSON2[0].lop_21_1,
        SubmissionWINProject:dataJSON2[0].lop_21_2,

        SubmissionLOOSERevenue:dataJSON2[0].lop_22_1,
        SubmissionLooseProject:dataJSON2[0].lop_22_2,

        SubmissionWaitingRevenue:dataJSON2[0].lop_23_1,
        SubmissionWaitingProject:dataJSON2[0].lop_23_2,

        SubmissionCancelRevenue:dataJSON2[0].lop_24_1,
        SubmissionCancekProject:dataJSON2[0].lop_24_2,
      }
    break;

    case 'DGS_HOME_CURRENT_REJECTED':
      return{
        ...state, 
      }
    break;
    
    case 'DGS_HOME_CURRENT_PENDING':
      return{
        ...state, 
      }
    break;

    case 'DGS_HOME_CURRENT_FULFILLED':
      const dataJSON3 = JSON.parse(action.payload.data)

      return{
        ...state, 
        //Current status
        currentProspectRevenue:dataJSON3[0].lop_01_1,
        currentProspectProject:dataJSON3[0].lop_01_2,
        currentSubmissionRevenue:dataJSON3[0].lop_02_1,
        currentSubmissionProject:dataJSON3[0].lop_02_2,
        currentWINRevenue:dataJSON3[0].lop_03_1,
        currentWINProject:dataJSON3[0].lop_03_2,
        currentBIllcomRevenue:dataJSON3[0].lop_04_1,
        currentBillcomProject:dataJSON3[0].lop_04_2,
      }
    break;

    //--------------------------------------------filter periode

    case 'DGS_HOME_FILTER_PERIODE_REJECTED':
      return{
        ...state, 
        statusErrorFrom:false,
      }
    break;
    
    case 'DGS_HOME_FILTER_PERIODE_PENDING':
      return{
        ...state, 
      }
    break;

    case 'DGS_HOME_FILTER_PERIODE_FULFILLED':
      const dataJSON4 = JSON.parse(action.payload.data)

      return {
        ...state, 
        ebisProspectREVENUE:dataJSON4[0].lop_11_1,
        ebisProspectProject:dataJSON4[0].lop_11_2,
        ebisProspectTarget:dataJSON4[0].lop_11_3,

        ebisSubmisionREVENUE:dataJSON4[0].lop_11_6,
        ebisSubmissionProject:dataJSON4[0].lop_12_1,
        ebisSubmissionTarget:dataJSON4[0].lop_12_2,

        ebisWinREVENUE:dataJSON4[0].lop_12_3,
        ebisWinProject:dataJSON4[0].lop_12_6,
        ebisWinTarget:dataJSON4[0].lop_13_1,

        ebisBillcomREVENUE:dataJSON4[0].lop_13_2,
        ebisBillcomeProject:dataJSON4[0].lop_13_3,
        ebisBillcommTarget:dataJSON4[0].lop_13_6,

        ProspectREVENUE:dataJSON4[0].lop_14_1,
        ProspectProject:dataJSON4[0].lop_14_2,
        ProspectTarget:dataJSON4[0].lop_14_3,
        ProspectREVENUE2:dataJSON4[0].lop_14_6,

        //submission status
        SubmissionWINRevenue:dataJSON4[0].lop_21_1,
        SubmissionWINProject:dataJSON4[0].lop_21_2,

        SubmissionLOOSERevenue:dataJSON4[0].lop_22_1,
        SubmissionLooseProject:dataJSON4[0].lop_22_2,

        SubmissionWaitingRevenue:dataJSON4[0].lop_23_1,
        SubmissionWaitingProject:dataJSON4[0].lop_23_2,

        SubmissionCancelRevenue:dataJSON4[0].lop_24_1,
        SubmissionCancekProject:dataJSON4[0].lop_24_2,
      }
    break;
    
    default:
      return state;
  }
};


export default DgsReducer;