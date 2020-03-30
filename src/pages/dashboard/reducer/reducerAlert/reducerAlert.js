const initialState = { 
  loaderStatus:false,

  //data
  headerTOTALPROJECT: '',
  headerTOTALREV: '',
  dataDetail: [],

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

const alertReducer = (state = initialState, action) => {
  switch (action.type) {

    case 'ALERT_WINLOSE_HEADER_REJECTED':
      return{
        ...state,
      }
    break;
    
    case 'ALERT_WINLOSE_HEADER_PENDING':
      return{
        ...state, 
        loaderStatus:true,
      }
    break;

    case 'ALERT_WINLOSE_HEADER_FULFILLED':
      return {
        ...state, 
        headerTOTALPROJECT: action.payload.data[0].TOTALPROJECT,
        headerTOTALREV: action.payload.data[0].TOTALREV,
      }
    break;

    case 'ALERT_WINLOSE_DETAIL_REJECTED':
      return{
        ...state, 
      }
    break;
    
    case 'ALERT_WINLOSE_DETAIL_PENDING':
      return{
        ...state, 
        loaderStatus:true,
      }
    break;

    case 'ALERT_WINLOSE_DETAIL_FULFILLED':
      return {
        ...state, 
        dataDetail: action.payload.data,
      }
    break;  

    case 'ALERT_REKAP_ALL_SUMMARY_REJECTED':
      return{
        ...state,
        allTOTALPROJECT: '?',
        allTOTALREV: '?',
      }
    break;
    case 'ALERT_REKAP_ALL_SUMMARY_PENDING':
      return{
        ...state, 
        loaderStatus:true,
      }
    break;
    case 'ALERT_REKAP_ALL_SUMMARY_FULFILLED':
      return {
        ...state, 
        allTOTALPROJECT: action.payload.data[0].TOTALPROJECT,
        allTOTALREV: action.payload.data[0].TOTALREV,
   
      }
    break;

    case 'ALERT_REKAP_WIN_SUMMARY_REJECTED':
      return{
        ...state,
        allTOTALPROJECT: '?',
        allTOTALREV: '?',
    
      }
    break;
    case 'ALERT_REKAP_WIN_SUMMARY_PENDING':
      return{
        ...state, 
        loaderStatus:true,
      }
    break;
    case 'ALERT_REKAP_WIN_SUMMARY_FULFILLED':
      return {
        ...state, 
        allTOTALPROJECT: action.payload.data[1].TOTALPROJECT,
        allTOTALREV: action.payload.data[1].TOTALREV,
   
      }
    break;

    case 'ALERT_REKAP_LOSE_SUMMARY_REJECTED':
      return{
        ...state,
        allTOTALPROJECT: '?',
        allTOTALREV: '?',
    
      }
    break;
    case 'ALERT_REKAP_LOSE_SUMMARY_PENDING':
      return{
        ...state, 
        loaderStatus:true,
      
      }
    break;
    case 'ALERT_REKAP_LOSE_SUMMARY_FULFILLED':
      return {
        ...state, 
        allTOTALPROJECT: action.payload.data[2].TOTALPROJECT,
        allTOTALREV: action.payload.data[2].TOTALREV,
   
      }
    break;

    default:
      return state;
  }
};

export default alertReducer;