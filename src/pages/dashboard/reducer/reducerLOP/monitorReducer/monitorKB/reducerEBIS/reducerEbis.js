const initialState = { 
    loaderStatus:false,
    //data ebis
    dataEbisWin:'',
    dataEbisWP: '',
    dataEbisDoneWin:'',
    dataEbisDoneWP: '',
    dataEbisOgpWin:'',
    dataEbisOgpWP: '',
    dataOgp3Rev: '',
    dataOgp3Project: '',
    dataOgp6Rev: '',
    dataOgp6Project: '',
    dataOgp7Rev: '',
    dataOgp7Project: '',

    dataEbisWinSubs:'',
    dataEbisWPSubs: '',
    dataEbisDoneWinSubs:'',
    dataEbisDoneWPSubs: '',
    dataEbisOgpWinSubs:'',
    dataEbisOgpWPSubs: '',
    dataOgp3RevSubs: '',
    dataOgp3ProjectSubs: '',
    dataOgp6RevSubs: '',
    dataOgp6ProjectSubs: '',
    dataOgp7RevSubs: '',
    dataOgp7ProjectSubs: '',

    dataEbisWinMitra:'',
    dataEbisWPMitra: '',
    dataEbisDoneWinMitra:'',
    dataEbisDoneWPMitra: '',
    dataEbisOgpWinMitra:'',
    dataEbisOgpWPMitra: '',
    dataOgp3RevMitra: '',
    dataOgp3ProjectMitra: '',
    dataOgp6RevMitra: '',
    dataOgp6ProjectMitra: '',
    dataOgp7RevMitra: '',
    dataOgp7ProjectMitra: '',

    dataEbisWinTelkom:'',
    dataEbisWPTelkom: '',
    dataEbisDoneWinTelkom:'',
    dataEbisDoneWPTelkom: '',
    dataEbisOgpWinTelkom:'',
    dataEbisOgpWPTelkom: '',
    dataOgp3RevTelkom: '',
    dataOgp3ProjectTelkom: '',
    dataOgp6RevTelkom: '',
    dataOgp6ProjectTelkom: '',
    dataOgp7RevTelkom: '',
    dataOgp7ProjectTelkom: '',

    detailDone: [],
    detailDoneSubs: [],
    detailDoneMitra: [],
    detailDoneTelkom: [],

    detailOgp: [],
    detailOgpSubs: [],
    detailOgpMitra: [],
    detailOgpTelkom: [],

    detailOgp3: [],
    detailOgp3Subs: [],
    detailOgp3Mitra: [],
    detailOgp3Telkom: [],

    detailOgp6: [],
    detailOgp6Subs: [],
    detailOgp6Mitra: [],
    detailOgp6Telkom: [],

    detailOgp7: [],
    detailOgp7Subs: [],
    detailOgp7Mitra: [],
    detailOgp7Telkom: [],
    
  };
  
  const MonitorEbisReducer = (state = initialState, action) => {
    switch (action.type) {
      
      case 'MONITOR_KB_EBIS_REJECTED':
        return{
          ...state, 
        }
      break;
      case 'MONITOR_KB_EBIS_PENDING':
        return{
          ...state, 
        }
      break;
      case 'MONITOR_KB_EBIS_FULFILLED':
          const dataJSON1 = JSON.parse(action.payload.data)

        return{
          ...state, 
          //Current status
          dataEbisWin:dataJSON1[0].KB_REV,
          dataEbisWP: dataJSON1[0].KB_PROJECT
        }
      break;
      case 'MONITOR_KB_EBIS_SUBS_FULFILLED':
          const dataJSON2 = JSON.parse(action.payload.data)

        return{
          ...state, 
          //Current status
          dataEbisWinSubs:dataJSON2[0].KB_REV,
          dataEbisWPSubs: dataJSON2[0].WINPROJECT
        }
      break;
      case 'MONITOR_KB_EBIS_MITRA_FULFILLED':
          const dataJSON3 = JSON.parse(action.payload.data)

        return{
          ...state, 
          //Current status
          dataEbisWinMitra:dataJSON3[0].KB_REV,
          dataEbisWPMitra: dataJSON3[0].WINPROJECT
        }
      break;
      case 'MONITOR_KB_EBIS_TELKOM_FULFILLED':
          const dataJSON4 = JSON.parse(action.payload.data)

        return{
          ...state, 
          //Current status
          dataEbisWinTelkom:dataJSON4[0].KB_REV,
          dataEbisWPTelkom: dataJSON4[0].WINPROJECT
        }
      break;
      
      case 'MONITOR_KB_EBIS_DONE_REJECTED':
        return{
          ...state, 
        }
      break;
      
      case 'MONITOR_KB_EBIS_DONE_PENDING':
        return{
          ...state, 
        }
      break;
  
      case 'MONITOR_KB_EBIS_DONE_FULFILLED':
          const dataJSON5 = JSON.parse(action.payload.data)

        return{
          ...state, 
          //Current status
          dataEbisDoneWin:dataJSON5[0].KB_REV,
          dataEbisDoneWP: dataJSON5[0].KB_PROJECT
        }
      break;
      case 'MONITOR_KB_EBIS_DONE_SUBS_FULFILLED':
          const dataJSON6 = JSON.parse(action.payload.data)

        return{
          ...state, 
          //Current status
          dataEbisDoneWinSubs:dataJSON6[0].KB_REV,
          dataEbisDoneWPSubs: dataJSON6[0].KB_PROJECT
        }
      break;
      case 'MONITOR_KB_EBIS_DONE_MITRA_FULFILLED':
          const dataJSON7 = JSON.parse(action.payload.data)

        return{
          ...state, 
          //Current status
          dataEbisDoneWinMitra:dataJSON7[0].KB_REV,
          dataEbisDoneWPMitra: dataJSON7[0].KB_PROJECT
        }
      break;
      case 'MONITOR_KB_EBIS_DONE_TELKOM_FULFILLED':
          const dataJSON8 = JSON.parse(action.payload.data)

        return{
          ...state, 
          //Current status
          dataEbisDoneWinTelkom:dataJSON8[0].KB_REV,
          dataEbisDoneWPTelkom: dataJSON8[0].KB_PROJECT
        }
      break;

      case 'MONITOR_KB_EBIS_OGP_REJECTED':
        return{
          ...state, 
        }
      break;
      
      case 'MONITOR_KB_EBIS_OGP_PENDING':
        return{
          ...state, 
        }
      break;
  
      case 'MONITOR_KB_EBIS_OGP_FULFILLED':
          const dataJSON9 = JSON.parse(action.payload.data)

        return{
          ...state, 
          //Current status
          dataEbisOgpWin:dataJSON9[0].KB_REV,
          dataEbisOgpWP: dataJSON9[0].KB_PROJECT
        }
      break;
      case 'MONITOR_KB_EBIS_OGP_SUBS_FULFILLED':
          const dataJSON10 = JSON.parse(action.payload.data)

        return{
          ...state, 
          //Current status
          dataEbisOgpWinSubs:dataJSON10[0].KB_REV,
          dataEbisOgpWPSubs: dataJSON10[0].KB_PROJECT
        }
      break;
      case 'MONITOR_KB_EBIS_OGP_MITRA_FULFILLED':
          const dataJSON11 = JSON.parse(action.payload.data)

        return{
          ...state, 
          //Current status
          dataEbisOgpWinMitra:dataJSON11[0].KB_REV,
          dataEbisOgpWPMitra: dataJSON11[0].KB_PROJECT
        }
      break;
      case 'MONITOR_KB_EBIS_OGP_TELKOM_FULFILLED':
          const dataJSON12 = JSON.parse(action.payload.data)

        return{
          ...state, 
          //Current status
          dataEbisOgpWinTelkom:dataJSON12[0].KB_REV,
          dataEbisOgpWPTelkom: dataJSON12[0].KB_PROJECT
        }
      break;

      case 'MONITOR_KB_EBIS_OGP_DATA_REJECTED':
        return{
          ...state, 
        }
      break;
      
      case 'MONITOR_KB_EBIS_OGP_DATA_PENDING':
        return{
          ...state, 
        }
      break;
  
      case 'MONITOR_KB_EBIS_OGP_DATA_FULFILLED':
          const dataJSON13 = JSON.parse(action.payload.data)

        return{
          ...state, 
          //Current status
          dataOgp3Rev: dataJSON13[0].REVENUE,
          dataOgp3Project: dataJSON13[0].PROJECT,
          dataOgp6Rev: dataJSON13[1].REVENUE,
          dataOgp6Project: dataJSON13[1].PROJECT,
          dataOgp7Rev: dataJSON13[2].REVENUE,
          dataOgp7Project: dataJSON13[2].PROJECT
        }
      break;
      case 'MONITOR_KB_EBIS_OGP_DATA_SUBS_FULFILLED':
          const dataJSON14 = JSON.parse(action.payload.data)

        return{
          ...state, 
          //Current status
          dataOgp3RevSubs: dataJSON14[0].REVENUE,
          dataOgp3ProjectSubs: dataJSON14[0].PROJECT,
          dataOgp6RevSubs: dataJSON14[1].REVENUE,
          dataOgp6ProjectSubs: dataJSON14[1].PROJECT,
          dataOgp7RevSubs: dataJSON14[2].REVENUE,
          dataOgp7ProjectSubs: dataJSON14[2].PROJECT
        }
      break;
      case 'MONITOR_KB_EBIS_OGP_DATA_MITRA_FULFILLED':
          const dataJSON15 = JSON.parse(action.payload.data)

        return{
          ...state, 
          //Current status
          dataOgp3RevMitra: dataJSON15[0].REVENUE,
          dataOgp3ProjectMitra: dataJSON15[0].PROJECT,
          dataOgp6RevMitra: dataJSON15[1].REVENUE,
          dataOgp6ProjectMitra: dataJSON15[1].PROJECT,
          dataOgp7RevMitra: dataJSON15[2].REVENUE,
          dataOgp7ProjectMitra: dataJSON15[2].PROJECT
        }
      break;
      case 'MONITOR_KB_EBIS_OGP_DATA_TELKOM_FULFILLED':
          const dataJSON16 = JSON.parse(action.payload.data)

        return{
          ...state, 
          //Current status
          dataOgp3RevTelkom: dataJSON16[0].REVENUE,
          dataOgp3ProjectTelkom: dataJSON16[0].PROJECT,
          dataOgp6RevTelkom: dataJSON16[1].REVENUE,
          dataOgp6ProjectTelkom: dataJSON16[1].PROJECT,
          dataOgp7RevTelkom: dataJSON16[2].REVENUE,
          dataOgp7ProjectTelkom: dataJSON16[2].PROJECT
        }
      break;

      case 'MONITOR_KB_EBIS_DETAIL_DONE_FULFILLED':
          const dataJSON17 = JSON.parse(action.payload.data)

        return{
          ...state, 
          //Current status
          detailDone : dataJSON17
        }
      break;
      case 'MONITOR_KB_EBIS_DETAIL_DONE_SUBS_FULFILLED':
          const dataJSON18 = JSON.parse(action.payload.data)

        return{
          ...state, 
          //Current status
          detailDoneSubs : dataJSON18
        }
      break;
      case 'MONITOR_KB_EBIS_DETAIL_DONE_MITRA_FULFILLED':
          const dataJSON19 = JSON.parse(action.payload.data)

        return{
          ...state, 
          //Current status
          detailDoneMitra : dataJSON19
        }
      break;
      case 'MONITOR_KB_EBIS_DETAIL_DONE_TELKOM_FULFILLED':
          const dataJSON20 = JSON.parse(action.payload.data)

        return{
          ...state, 
          //Current status
          detailDoneTelkom : dataJSON20
        }
      break;

      case 'MONITOR_KB_EBIS_DETAIL_OGP_FULFILLED':
          const dataJSON21 = JSON.parse(action.payload.data)

      return{
        ...state, 
        //Current status
        detailOgp : dataJSON21
      }
      break;
      case 'MONITOR_KB_EBIS_DETAIL_OGP_SUBS_FULFILLED':
          const dataJSON22 = JSON.parse(action.payload.data)

        return{
          ...state, 
          //Current status
          detailOgpSubs : dataJSON22
        }
      break;
      case 'MONITOR_KB_EBIS_DETAIL_OGP_MITRA_FULFILLED':
          const dataJSON23 = JSON.parse(action.payload.data)

        return{
          ...state, 
          //Current status
          detailOgpMitra : dataJSON23
        }
      break;
      case 'MONITOR_KB_EBIS_DETAIL_OGP_TELKOM_FULFILLED':
          const dataJSON24 = JSON.parse(action.payload.data)

        return{
          ...state, 
          //Current status
          detailOgpTelkom : dataJSON24
        }
      break;

      case 'MONITOR_KB_EBIS_DETAIL_OGP_PROGRESS_3_FULFILLED':
          const dataJSON25 = JSON.parse(action.payload.data)

      return{
        ...state, 
        //Current status
        detailOgp3 : dataJSON25
      }
      break;
      case 'MONITOR_KB_EBIS_DETAIL_OGP_PROGRESS_3_SUBS_FULFILLED':
          const dataJSON26 = JSON.parse(action.payload.data)

        return{
          ...state, 
          //Current status
          detailOgp3Subs : dataJSON26
        }
      break;
      case 'MONITOR_KB_EBIS_DETAIL_OGP_PROGRESS_3_MITRA_FULFILLED':
          const dataJSON27 = JSON.parse(action.payload.data)

        return{
          ...state, 
          //Current status
          detailOgp3Mitra : dataJSON27
        }
      break;
      case 'MONITOR_KB_EBIS_DETAIL_OGP_PROGRESS_3_TELKOM_FULFILLED':
          const dataJSON28 = JSON.parse(action.payload.data)

        return{
          ...state, 
          //Current status
          detailOgp3Telkom : dataJSON28
        }
      break;

      case 'MONITOR_KB_EBIS_DETAIL_OGP_PROGRESS_6_FULFILLED':
          const dataJSON29 = JSON.parse(action.payload.data)

        return{
          ...state, 
          //Current status
          detailOgp6 : dataJSON29
        }
      break;
      case 'MONITOR_KB_EBIS_DETAIL_OGP_PROGRESS_6_SUBS_FULFILLED':
          const dataJSON30 = JSON.parse(action.payload.data)

        return{
          ...state, 
          //Current status
          detailOgp6Subs : dataJSON30
        }
      break;
      case 'MONITOR_KB_EBIS_DETAIL_OGP_PROGRESS_6_MITRA_FULFILLED':
          const dataJSON31 = JSON.parse(action.payload.data)

        return{
          ...state, 
          //Current status
          detailOgp6Mitra : dataJSON31
        }
      break;
      case 'MONITOR_KB_EBIS_DETAIL_OGP_PROGRESS_6_TELKOM_FULFILLED':
          const dataJSON32 = JSON.parse(action.payload.data)

        return{
          ...state, 
          //Current status
          detailOgp6Telkom : dataJSON32
        }
      break;

      case 'MONITOR_KB_EBIS_DETAIL_OGP_PROGRESS_7_FULFILLED':
          const dataJSON33 = JSON.parse(action.payload.data)

        return{
          ...state, 
          //Current status
          detailOgp7 : dataJSON33
        }
      break;
      case 'MONITOR_KB_EBIS_DETAIL_OGP_PROGRESS_7_SUBS_FULFILLED':
          const dataJSON34 = JSON.parse(action.payload.data)

        return{
          ...state, 
          //Current status
          detailOgp7Subs : dataJSON34
        }
      break;
      case 'MONITOR_KB_EBIS_DETAIL_OGP_PROGRESS_7_MITRA_FULFILLED':
          const dataJSON35 = JSON.parse(action.payload.data)

        return{
          ...state, 
          //Current status
          detailOgp7Mitra : dataJSON35
        }
      break;
      case 'MONITOR_KB_EBIS_DETAIL_OGP_PROGRESS_7_TELKOM_FULFILLED':
          const dataJSON36 = JSON.parse(action.payload.data)

        return{
          ...state, 
          //Current status
          detailOgp7Telkom : dataJSON36
        }
      break;

      default:
        return state;
    }
  };
  
  export default MonitorEbisReducer;