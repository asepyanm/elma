const initialState = { 
  loaderStatus:false,

  //data
  allTOTALPROJECT: '0',
  allTOTALREV: '0',
  winTOTALPROJECT: '0',
  winTOTALREV: '0',
  loseTOTALPROJECT: '0',
  loseTOTALREV: '0',
  
  dataDetailWin: [],
  dataDetailLose: [],

};

const rekapReducer = (state = initialState, action) => {
  switch (action.type) {

    case 'MONITOR_REKAP_ALL_SUMMARY_REJECTED':
      return{
        ...state,
        allTOTALPROJECT: '?',
        allTOTALREV: '?',
    
      }
    break;
    case 'MONITOR_REKAP_WIN_SUMMARY_REJECTED':
      return{
        ...state,
        winTOTALPROJECT: '?',
        winTOTALREV: '?',
     
      }
    break;
    case 'MONITOR_REKAP_LOSE_SUMMARY_REJECTED':
      return{
        ...state,
        loseTOTALPROJECT: '?',
        loseTOTALREV: '?',
     
      }
    break;
    
    case 'MONITOR_REKAP_ALL_SUMMARY_PENDING':
      return{
        ...state, 
        loaderStatus:true,
        allTOTALPROJECT: '?',
        allTOTALREV: '?',
      
      }
    break;
    case 'MONITOR_REKAP_WIN_SUMMARY_PENDING':
      return{
        ...state, 
        loaderStatus:true,
        winTOTALPROJECT: '?',
        winTOTALREV: '?',
      
      }
    break;
    case 'MONITOR_REKAP_LOSE_SUMMARY_PENDING':
      return{
        ...state, 
        loaderStatus:true,
        loseTOTALPROJECT: '?',
        loseTOTALREV: '?',
      
      }
    break;

    case 'MONITOR_REKAP_SUMMARY_FULFILLED':
      return {
        ...state, 
        allTOTALPROJECT: action.payload.data[0].TOTALPROJECT,
        allTOTALREV: action.payload.data[0].TOTALREV,
        winTOTALPROJECT: action.payload.data[1].TOTALPROJECT,
        winTOTALREV: action.payload.data[1].TOTALREV,
        loseTOTALPROJECT: action.payload.data[2].TOTALPROJECT,
        loseTOTALREV: action.payload.data[2].TOTALREV,
     
      }
    break;

    case 'MONITOR_REKAP_ALL_SUMMARY_FULFILLED':
      return {
        ...state, 
        allTOTALPROJECT: action.payload.data[0].TOTALPROJECT,
        allTOTALREV: action.payload.data[0].TOTALREV,
    
      }
    break;
    case 'MONITOR_REKAP_WIN_SUMMARY_FULFILLED':
      return {
        ...state, 
        winTOTALPROJECT: action.payload.data[1].TOTALPROJECT,
        winTOTALREV: action.payload.data[1].TOTALREV,
     
      }
    break;
    case 'MONITOR_REKAP_LOSE_SUMMARY_FULFILLED':
      return {
        ...state, 
        loseTOTALPROJECT: action.payload.data[2].TOTALPROJECT,
        loseTOTALREV: action.payload.data[2].TOTALREV,
     
      }
    break;

    case 'DETAIL_REKAP_WIN_REJECTED':
      return {
        ...state, 
      }
    break;

    case 'DETAIL_REKAP_WIN_PENDING':
      return {
        ...state, 
        loaderStatus:true,
      }
    break;

    case 'DETAIL_REKAP_WIN_FULFILLED':
      return {
        ...state, 
        dataDetailWin: action.payload.data,
      }
    break;

    case 'DETAIL_REKAP_LOSE_REJECTED':
      return {
        ...state, 
      }
    break;

    case 'DETAIL_REKAP_LOSE_PENDING':
      return {
        ...state, 
        loaderStatus:true,
      }
    break;

    case 'DETAIL_REKAP_LOSE_FULFILLED':
      return {
        ...state, 
        dataDetailLose: action.payload.data,
      }
    break;
    
    default:
      return state;
  }
};

export default rekapReducer;