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

    //Header status
    case 'HEADER_BILLCOM_EBIS_FULFILLED':
        const dataJSON1 = JSON.parse(action.payload.data)
      
      return{
        ...state, 
        headerEbisValue: dataJSON1[0].lop_11_1,
        headerEbisProject: dataJSON1[0].lop_11_2,
      }
      break;
    case 'HEADER_BILLCOM_DES_FULFILLED':
        const dataJSON2 = JSON.parse(action.payload.data)

      return{
        ...state, 
        headerDesValue: dataJSON2[0].lop_11_1,
        headerDesProject: dataJSON2[0].lop_11_2,
      }
      break;
    case 'HEADER_BILLCOM_DBS_FULFILLED':
        const dataJSON3 = JSON.parse(action.payload.data)

      return{
        ...state, 
        headerDbsValue: dataJSON3[0].lop_11_1,
        headerDbsProject: dataJSON3[0].lop_11_2,
      }
      break;
    case 'HEADER_BILLCOM_DGS_FULFILLED':
        const dataJSON4 = JSON.parse(action.payload.data)

      return{
        ...state, 
        headerDgsValue: dataJSON4[0].lop_11_1,
        headerDgsProject: dataJSON4[0].lop_11_2,
      }
      break;

    //--------------------------BILLCOM
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
          const dataJSON5 = JSON.parse(action.payload.data)

        return{
          ...state, 
          //Current status
          dataEbisAll:dataJSON5,
        }
      break;

      case 'DETAIL_BILLCOM_DES_FULFILLED':
          const dataJSON6 = JSON.parse(action.payload.data)

        return{
          ...state, 
          //Current status
          dataDesAll:dataJSON6,
        }
      break;
      case 'DETAIL_BILLCOM_DBS_FULFILLED':
          const dataJSON7 = JSON.parse(action.payload.data)

        return{
          ...state, 
          //Current status
          dataDbsAll:dataJSON7,
        }
      break;
      case 'DETAIL_BILLCOM_DGS_FULFILLED':
          const dataJSON8 = JSON.parse(action.payload.data)

        return{
          ...state, 
          //Current status
          dataDgsAll:dataJSON8,
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
          const dataJSON9 = JSON.parse(action.payload.data)

        return{
          ...state, 
          //Current status
          dataEbisSubs:dataJSON9,
        }
      break;
      case 'DETAIL_SUBS_BILLCOM_DES_FULFILLED':
          const dataJSON10 = JSON.parse(action.payload.data)

        return{
          ...state, 
          //Current status
          dataDesSubs:dataJSON10,
        }
      break;
      case 'DETAIL_SUBS_BILLCOM_DBS_FULFILLED':
          const dataJSON11 = JSON.parse(action.payload.data)

        return{
          ...state, 
          //Current status
          dataDbsSubs:dataJSON11,
        }
      break;
      case 'DETAIL_SUBS_BILLCOM_DGS_FULFILLED':
          const dataJSON12 = JSON.parse(action.payload.data)

        return{
          ...state, 
          //Current status
          dataDgsSubs:dataJSON12,
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
          const dataJSON13 = JSON.parse(action.payload.data)

        return{
          ...state, 
          //Current status
          dataEbisMitra:dataJSON13,
        }
      break;
      case 'DETAIL_MITRA_BILLCOM_DES_FULFILLED':
          const dataJSON14 = JSON.parse(action.payload.data)

        return{
          ...state, 
          //Current status
          dataDesMitra:dataJSON14,
        }
      break;
      case 'DETAIL_MITRA_BILLCOM_DBS_FULFILLED':
          const dataJSON15 = JSON.parse(action.payload.data)

        return{
          ...state, 
          //Current status
          dataDbsMitra:dataJSON15,
        }
      break;
      case 'DETAIL_MITRA_BILLCOM_DGS_FULFILLED':
          const dataJSON16 = JSON.parse(action.payload.data)

        return{
          ...state, 
          //Current status
          dataDgsMitra:dataJSON16,
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
          const dataJSON17 = JSON.parse(action.payload.data)

        return{
          ...state, 
          //Current status
          dataEbisTelkom:dataJSON17,
        }
      break;
      case 'DETAIL_TELKOM_BILLCOM_DES_FULFILLED':
          const dataJSON18 = JSON.parse(action.payload.data)

        return{
          ...state, 
          //Current status
          dataDesTelkom:dataJSON18,
        }
      break;
      case 'DETAIL_TELKOM_BILLCOM_DBS_FULFILLED':
          const dataJSON19 = JSON.parse(action.payload.data)

        return{
          ...state, 
          //Current status
          dataDbsTelkom:dataJSON19,
        }
      break;
      case 'DETAIL_TELKOM_BILLCOM_DGS_FULFILLED':
          const dataJSON20 = JSON.parse(action.payload.data)

        return{
          ...state, 
          //Current status
          dataDgsTelkom:dataJSON20,
        }
      break;


 
    default:
      return state;
  }
  
};

export default DgsDetailReducer;