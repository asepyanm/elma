const initialState = { 
  loaderStatus:false,

  //BILLCOM
  //EBIS
  headerEbisValue: '0',
  headerEbisProject: '0',
  //DES
  headerDesValue: '0',
  headerDesProject: '0',
  //DBS
  headerDbsValue: '0',
  headerDbsProject: '0',
  //DGS
  headerDgsValue: '0',
  headerDgsProject: '0',       
 
 //data ebis
 dataEbisAll:[],
 dataEbisSubs:[],
 dataEbisMitra:[],
 dataEbisTelkom:[],

 //data des
 dataDesAll:[],
 dataDesSubs:[],
 dataDesMitra:[],
 dataDesTelkom:[],

 //data dbs
 dataDbsAll:[],
 dataDbsSubs:[],
 dataDbsMitra:[],
 dataDbsTelkom:[],

 //data dgs
 dataDgsAll:[],
 dataDgsSubs:[],
 dataDgsMitra:[],
 dataDgsTelkom:[],
};

const DgsDetailReducer = (state = initialState, action) => {
  switch (action.type) {

      //--------------------------prospect
      //detail ALL
      case 'DETAIL_BILLCOM_EBIS_REJECTED':
        return{
          ...state, 
        }
      break;
      case 'DETAIL_BILLCOM_EBIS_PENDING':
        return{
          ...state, 
        }
      break;
      case 'DETAIL_BILLCOM_EBIS_FULFILLED':
        const dataJSON1 = JSON.parse(action.payload.data)
        return{
          ...state, 
          //Current status
          dataEbisAll:dataJSON1,
        }
      break;

      case 'DETAIL_BILLCOM_DES_FULFILLED':
        const dataJSON2 = JSON.parse(action.payload.data)
        return{
          ...state, 
          //Current status
          dataDesAll:dataJSON2,
        }
      break;
      case 'DETAIL_BILLCOM_DBS_FULFILLED':
        const dataJSON3 = JSON.parse(action.payload.data)
        return{
          ...state, 
          //Current status
          dataDbsAll:dataJSON3,
        }
      break;
      case 'DETAIL_BILLCOM_DGS_FULFILLED':
        const dataJSON4 = JSON.parse(action.payload.data)
        return{
          ...state, 
          //Current status
          dataDgsAll:dataJSON4,
        }
      break;


      //detail SUBS
      case 'DETAIL_SUBS_BILLCOM_EBIS_REJECTED':
        return{
          ...state, 
        }
      break;
      case 'DETAIL_SUBS_BILLCOM_EBIS_PENDING':
        return{
          ...state, 
        }
      break;
      case 'DETAIL_SUBS_BILLCOM_EBIS_FULFILLED':
        const dataJSON5 = JSON.parse(action.payload.data)
        return{
          ...state, 
          //Current status
          dataEbisSubs:dataJSON5,
        }
      break;
      case 'DETAIL_SUBS_BILLCOM_DES_FULFILLED':
        const dataJSON6 = JSON.parse(action.payload.data)
        return{
          ...state, 
          //Current status
          dataDesSubs:dataJSON6,
        }
      break;
      case 'DETAIL_SUBS_BILLCOM_DBS_FULFILLED':
        const dataJSON7 = JSON.parse(action.payload.data)
        return{
          ...state, 
          //Current status
          dataDbsSubs:dataJSON7,
        }
      break;
      case 'DETAIL_SUBS_BILLCOM_DGS_FULFILLED':
        const dataJSON8 = JSON.parse(action.payload.data)
        return{
          ...state, 
          //Current status
          dataDgsSubs:dataJSON8,
        }
      break;

      //detail MITRA
      case 'DETAIL_MITRA_BILLCOM_EBIS_REJECTED':
        return{
          ...state, 
        }
      break;
      case 'DETAIL_MITRA_BILLCOM_EBIS_PENDING':
        return{
          ...state, 
        }
      break;
      case 'DETAIL_MITRA_BILLCOM_EBIS_FULFILLED':
        const dataJSON9 = JSON.parse(action.payload.data)
        return{
          ...state, 
          //Current status
          dataEbisMitra:dataJSON9,
        }
      break;
      case 'DETAIL_MITRA_BILLCOM_DES_FULFILLED':
        const dataJSON10 = JSON.parse(action.payload.data)
        return{
          ...state, 
          //Current status
          dataDesMitra:dataJSON10,
        }
      break;
      case 'DETAIL_MITRA_BILLCOM_DBS_FULFILLED':
        const dataJSON11 = JSON.parse(action.payload.data)
        return{
          ...state, 
          //Current status
          dataDbsMitra:dataJSON11,
        }
      break;
      case 'DETAIL_MITRA_BILLCOM_DGS_FULFILLED':
        const dataJSON12 = JSON.parse(action.payload.data)
        return{
          ...state, 
          //Current status
          dataDgsMitra:dataJSON12,
        }
      break;

      //detail TELKOM
      case 'DETAIL_TELKOM_BILLCOM_EBIS_REJECTED':
        return{
          ...state, 
        }
      break;
      case 'DETAIL_TELKOM_BILLCOM_EBIS_PENDING':
        return{
          ...state, 
        }
      break;
      case 'DETAIL_TELKOM_BILLCOM_EBIS_FULFILLED':
        const dataJSON13 = JSON.parse(action.payload.data)
        return{
          ...state, 
          //Current status
          dataEbisTelkom:dataJSON13,
        }
      break;
      case 'DETAIL_TELKOM_BILLCOM_DES_FULFILLED':
        const dataJSON14 = JSON.parse(action.payload.data)
        return{
          ...state, 
          //Current status
          dataDesTelkom:dataJSON14,
        }
      break;
      case 'DETAIL_TELKOM_BILLCOM_DBS_FULFILLED':
        const dataJSON15 = JSON.parse(action.payload.data)
        return{
          ...state, 
          //Current status
          dataDbsTelkom:dataJSON15,
        }
      break;
      case 'DETAIL_TELKOM_BILLCOM_DGS_FULFILLED':
        const dataJSON16 = JSON.parse(action.payload.data)
        return{
          ...state, 
          //Current status
          dataDgsTelkom:dataJSON16,
        }
      break;

 
    default:
      return state;
  }
  
};

export default DgsDetailReducer;