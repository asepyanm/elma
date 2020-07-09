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
      const dataJSON1 = JSON.parse(action.payload.data)
      return {
        ...state, 
        allTOTALPROJECT: dataJSON1[0].TOTALPROJECT,
        allTOTALREV: dataJSON1[0].TOTALREV,
        winTOTALPROJECT: dataJSON1[1].TOTALPROJECT,
        winTOTALREV: dataJSON1[1].TOTALREV,
        loseTOTALPROJECT: dataJSON1[2].TOTALPROJECT,
        loseTOTALREV: dataJSON1[2].TOTALREV,
     
      }
    break;

    case 'MONITOR_REKAP_ALL_SUMMARY_FULFILLED':
      const dataJSON2 = JSON.parse(action.payload.data)
      return {
        ...state, 
        allTOTALPROJECT: dataJSON2[0].TOTALPROJECT,
        allTOTALREV: dataJSON2[0].TOTALREV,
    
      }
    break;
    case 'MONITOR_REKAP_WIN_SUMMARY_FULFILLED':
      const dataJSON3 = JSON.parse(action.payload.data)
      return {
        ...state, 
        winTOTALPROJECT: dataJSON3[1].TOTALPROJECT,
        winTOTALREV: dataJSON3[1].TOTALREV,
     
      }
    break;
    case 'MONITOR_REKAP_LOSE_SUMMARY_FULFILLED':
      const dataJSON4 = JSON.parse(action.payload.data)
      return {
        ...state, 
        loseTOTALPROJECT: dataJSON4[2].TOTALPROJECT,
        loseTOTALREV: dataJSON4[2].TOTALREV,
     
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
      const dataJSON5 = JSON.parse(action.payload.data)
      return {
        ...state, 
        dataDetailWin: dataJSON5,
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
      const dataJSON6 = JSON.parse(action.payload.data)
      return {
        ...state, 
        dataDetailLose: dataJSON6,
      }
    break;
    
    default:
      return state;
  }
};

export default rekapReducer;