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
      return{
        ...state, 
        //Current status
        winrevEbis:action.payload.data[0].WINREV,
        winprojectEbis:action.payload.data[0].WINPROJECT,
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
      return{
        ...state, 
        //Current status
        winrevDes:action.payload.data[0].WINREV,
        winprojectDes:action.payload.data[0].WINPROJECT,
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
      return{
        ...state, 
        //Current status
        winrevDbs:action.payload.data[0].WINREV,
        winprojectDbs:action.payload.data[0].WINPROJECT,
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
      return{
        ...state, 
        //Current status
        winrevDgs:action.payload.data[0].WINREV,
        winprojectDgs:action.payload.data[0].WINPROJECT,
      }
    break;    

    //--------------------------prospect
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
        return{
          ...state, 
          //Current status
          dataEbisAll:action.payload.data,
        }
      break;

      case 'DETAIL_WIN_DES_FULFILLED':
        return{
          ...state, 
          //Current status
          dataDesAll:action.payload.data,
        }
      break;
      case 'DETAIL_WIN_DBS_FULFILLED':
        return{
          ...state, 
          //Current status
          dataDbsAll:action.payload.data,
        }
      break;
      case 'DETAIL_WIN_DGS_FULFILLED':
        return{
          ...state, 
          //Current status
          dataDgsAll:action.payload.data,
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
        return{
          ...state, 
          //Current status
          dataEbisSubs:action.payload.data,
        }
      break;
      case 'DETAIL_SUBS_WIN_DES_FULFILLED':
        return{
          ...state, 
          //Current status
          dataDesSubs:action.payload.data,
        }
      break;
      case 'DETAIL_SUBS_WIN_DBS_FULFILLED':
        return{
          ...state, 
          //Current status
          dataDbsSubs:action.payload.data,
        }
      break;
      case 'DETAIL_SUBS_WIN_DGS_FULFILLED':
        return{
          ...state, 
          //Current status
          dataDgsSubs:action.payload.data,
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
        return{
          ...state, 
          //Current status
          dataEbisMitra:action.payload.data,
        }
      break;
      case 'DETAIL_MITRA_WIN_DES_FULFILLED':
        return{
          ...state, 
          //Current status
          dataDesMitra:action.payload.data,
        }
      break;
      case 'DETAIL_MITRA_WIN_DBS_FULFILLED':
        return{
          ...state, 
          //Current status
          dataDbsMitra:action.payload.data,
        }
      break;
      case 'DETAIL_MITRA_WIN_DGS_FULFILLED':
        return{
          ...state, 
          //Current status
          dataDgsMitra:action.payload.data,
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
        return{
          ...state, 
          //Current status
          dataEbisTelkom:action.payload.data,
        }
      break;
      case 'DETAIL_TELKOM_WIN_DES_FULFILLED':
        return{
          ...state, 
          //Current status
          dataDesTelkom:action.payload.data,
        }
      break;
      case 'DETAIL_TELKOM_WIN_DBS_FULFILLED':
        return{
          ...state, 
          //Current status
          dataDbsTelkom:action.payload.data,
        }
      break;
      case 'DETAIL_TELKOM_WIN_DGS_FULFILLED':
        return{
          ...state, 
          //Current status
          dataDgsTelkom:action.payload.data,
        }
      break;

 
    default:
      return state;
  }
  
};

export default DbsDetailReducer;