const initialState = { 
  loaderStatus:false,

  winrevEbis: '0',
  winrevDes: '0',
  winrevDbs: '0',
  winrevDgs: '0',

  winprojectEbis: '0',
  winprojectDes: '0',
  winprojectDbs: '0',
  winprojectDgs: '0',
 
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

const DbsDetailReducer = (state = initialState, action) => {
  switch (action.type) {

    //---------------------------total
    case 'TOTAL_WIN_EBIS_REJECTED':
      return{
        ...state, 
      }
    break;
    case 'TOTAL_WIN_EBIS_PENDING':
      return{
        ...state, 
      }
    break;
    case 'TOTAL_WIN_EBIS_FULFILLED':
        const dataJSON1 = JSON.parse(action.payload.data)

      return{
        ...state, 
        //Current status
        winrevEbis:dataJSON1[0].WINREV,
        winprojectEbis:dataJSON1[0].WINPROJECT,
      }
    break;

    case 'TOTAL_WIN_DES_REJECTED':
      return{
        ...state, 
      }
    break;
    case 'TOTAL_WIN_DES_PENDING':
      return{
        ...state, 
      }
    break;
    case 'TOTAL_WIN_DES_FULFILLED':
        const dataJSON2 = JSON.parse(action.payload.data)

      return{
        ...state, 
        //Current status
        winrevDes:dataJSON2[0].WINREV,
        winprojectDes:dataJSON2[0].WINPROJECT,
      }
    break;
    
    case 'TOTAL_WIN_DBS_REJECTED':
      return{
        ...state, 
      }
    break;
    case 'TOTAL_WIN_DBS_PENDING':
      return{
        ...state, 
      }
    break;
    case 'TOTAL_WIN_DBS_FULFILLED':
        const dataJSON3 = JSON.parse(action.payload.data)

      return{
        ...state, 
        //Current status
        winrevDbs:dataJSON3[0].WINREV,
        winprojectDbs:dataJSON3[0].WINPROJECT,
      }
    break;

    case 'TOTAL_WIN_DGS_REJECTED':
      return{
        ...state, 
      }
    break;
    case 'TOTAL_WIN_DGS_PENDING':
      return{
        ...state, 
      }
    break;
    case 'TOTAL_WIN_DGS_FULFILLED':
        const dataJSON4 = JSON.parse(action.payload.data)

      return{
        ...state, 
        //Current status
        winrevDgs:dataJSON4[0].WINREV,
        winprojectDgs:dataJSON4[0].WINPROJECT,
      }
    break;    

    //--------------------------WIN
      //detail ALL
      case 'DETAIL_WIN_EBIS_REJECTED':
        return{
          ...state, 
        }
      break;
      case 'DETAIL_WIN_EBIS_PENDING':
        return{
          ...state, 
        }
      break;
      case 'DETAIL_WIN_EBIS_FULFILLED':
          const dataJSON5 = JSON.parse(action.payload.data)

        return{
          ...state, 
          //Current status
          dataEbisAll:dataJSON5,
        }
      break;

      case 'DETAIL_WIN_DES_FULFILLED':
          const dataJSON6 = JSON.parse(action.payload.data)

        return{
          ...state, 
          //Current status
          dataDesAll:dataJSON6,
        }
      break;
      case 'DETAIL_WIN_DBS_FULFILLED':
          const dataJSON7 = JSON.parse(action.payload.data)

        return{
          ...state, 
          //Current status
          dataDbsAll:dataJSON7,
        }
      break;
      case 'DETAIL_WIN_DGS_FULFILLED':
          const dataJSON8 = JSON.parse(action.payload.data)

        return{
          ...state, 
          //Current status
          dataDgsAll:dataJSON8,
        }
      break;

      //detail SUBS
      case 'DETAIL_SUBS_WIN_EBIS_REJECTED':
        return{
          ...state, 
        }
      break;
      case 'DETAIL_SUBS_WIN_EBIS_PENDING':
        return{
          ...state, 
        }
      break;
      case 'DETAIL_SUBS_WIN_EBIS_FULFILLED':
          const dataJSON9 = JSON.parse(action.payload.data)

        return{
          ...state, 
          //Current status
          dataEbisSubs:dataJSON9,
        }
      break;
      case 'DETAIL_SUBS_WIN_DES_FULFILLED':
          const dataJSON10 = JSON.parse(action.payload.data)

        return{
          ...state, 
          //Current status
          dataDesSubs:dataJSON10,
        }
      break;
      case 'DETAIL_SUBS_WIN_DBS_FULFILLED':
          const dataJSON11 = JSON.parse(action.payload.data)

        return{
          ...state, 
          //Current status
          dataDbsSubs:dataJSON11,
        }
      break;
      case 'DETAIL_SUBS_WIN_DGS_FULFILLED':
          const dataJSON12 = JSON.parse(action.payload.data)

        return{
          ...state, 
          //Current status
          dataDgsSubs:dataJSON12,
        }
      break;

      //detail MITRA
      case 'DETAIL_MITRA_WIN_EBIS_REJECTED':
        return{
          ...state, 
        }
      break;
      case 'DETAIL_MITRA_WIN_EBIS_PENDING':
        return{
          ...state, 
        }
      break;
      case 'DETAIL_MITRA_WIN_EBIS_FULFILLED':
          const dataJSON13 = JSON.parse(action.payload.data)

        return{
          ...state, 
          //Current status
          dataEbisMitra:dataJSON13,
        }
      break;
      case 'DETAIL_MITRA_WIN_DES_FULFILLED':
          const dataJSON14 = JSON.parse(action.payload.data)

        return{
          ...state, 
          //Current status
          dataDesMitra:dataJSON14,
        }
      break;
      case 'DETAIL_MITRA_WIN_DBS_FULFILLED':
          const dataJSON15 = JSON.parse(action.payload.data)

        return{
          ...state, 
          //Current status
          dataDbsMitra:dataJSON15,
        }
      break;
      case 'DETAIL_MITRA_WIN_DGS_FULFILLED':
          const dataJSON16 = JSON.parse(action.payload.data)

        return{
          ...state, 
          //Current status
          dataDgsMitra:dataJSON16,
        }
      break;

      //detail TELKOM
      case 'DETAIL_TELKOM_WIN_EBIS_REJECTED':
        return{
          ...state, 
        }
      break;
      case 'DETAIL_TELKOM_WIN_EBIS_PENDING':
        return{
          ...state, 
        }
      break;
      case 'DETAIL_TELKOM_WIN_EBIS_FULFILLED':
          const dataJSON17 = JSON.parse(action.payload.data)

        return{
          ...state, 
          //Current status
          dataEbisTelkom:dataJSON17,
        }
      break;
      case 'DETAIL_TELKOM_WIN_DES_FULFILLED':
          const dataJSON18 = JSON.parse(action.payload.data)

        return{
          ...state, 
          //Current status
          dataDesTelkom:dataJSON18,
        }
      break;
      case 'DETAIL_TELKOM_WIN_DBS_FULFILLED':
          const dataJSON19 = JSON.parse(action.payload.data)

        return{
          ...state, 
          //Current status
          dataDbsTelkom:dataJSON19,
        }
      break;
      case 'DETAIL_TELKOM_WIN_DGS_FULFILLED':
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

export default DbsDetailReducer;