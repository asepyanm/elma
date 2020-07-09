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
      const dataJSON1 = JSON.parse(action.payload.data)
      return {
        ...state, 
        headerTOTALPROJECT: dataJSON1[0].TOTALPROJECT,
        headerTOTALREV: dataJSON1[0].TOTALREV,
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
      const dataJSON2 = JSON.parse(action.payload.data)
      return {
        ...state, 
        dataDetail: dataJSON2,
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
      const dataJSON3 = JSON.parse(action.payload.data)
      return {
        ...state, 
        allTOTALPROJECT: dataJSON3[0].TOTALPROJECT,
        allTOTALREV: dataJSON3[0].TOTALREV,
   
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
      const dataJSON4 = JSON.parse(action.payload.data)
      return {
        ...state, 
        allTOTALPROJECT: dataJSON4[1].TOTALPROJECT,
        allTOTALREV: dataJSON4[1].TOTALREV,
   
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
      const dataJSON5 = JSON.parse(action.payload.data)
      return {
        ...state, 
        allTOTALPROJECT: dataJSON5[2].TOTALPROJECT,
        allTOTALREV: dataJSON5[2].TOTALREV,
   
      }
    break;

    default:
      return state;
  }
};

export default alertReducer;