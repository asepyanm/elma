import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  FlatList,
  ActivityIndicator
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Header, Icon, Left, Right, Body, Button, Title, Tab, Tabs, Content, Container } from 'native-base';
import { connect } from 'react-redux';
import Modal from "react-native-modal";
import axios from 'axios';
import RNFetchBlob from 'rn-fetch-blob'

//global
import renderIf from '../../../../../../../components/renderIf';
import url from '../../../../../../../../config/api_service';

class MonitorKL extends Component {
  constructor(props) {
    super(props);
    this.state = {

      treg: this.props.navigation.state.params.treg,
      witel: this.props.navigation.state.params.witel,      
      startdate : this.props.navigation.state.params.start_date,
      enddate   : this.props.navigation.state.params.end_date,   

      //modal
      visibleModal: false,
      loaderTampilDetail: false,
      dataTampung: [],
      dataEbis: [],
      data: [],
      selected: '',
      statusAll: true,
      statusSubs: false,
      statusMitra: true,
      statusTelkom: true,
    }
  }

  componentWillMount(){

     //Monitor KL
    //EBIS
    this.props.dispatch({
      type: 'MONITOR_KL_EBIS',
      //payload: axios.get(`${url.API}/ebis_getwinsum/div/EBIS/treg/${this.state.treg}/witel/${this.state.witel}/startdate/${this.state.startdate}/enddate/${this.state.enddate}/type/KL/nmitra/ALL`)
    })
    this.props.dispatch({
      type: 'MONITOR_KL_EBIS_SUBS',
      payload: RNFetchBlob.config({
        trusty:true
      }). fetch('GET', `${url.API}/ebis_getwinsum/div/EBIS/treg/${this.state.treg}/witel/${this.state.witel}/startdate/${this.state.startdate}/enddate/${this.state.enddate}/type/KL/nmitra/ALL`)
    })
    this.props.dispatch({
      type: 'MONITOR_KL_EBIS_MITRA',
      payload: RNFetchBlob.config({
        trusty:true
      }). fetch('GET', `${url.API}/ebis_getwinsum/div/EBIS/treg/${this.state.treg}/witel/${this.state.witel}/startdate/${this.state.startdate}/enddate/${this.state.enddate}/type/KL/nmitra/MITRA`)
    })
    this.props.dispatch({
      type: 'MONITOR_KL_EBIS_TELKOM',
      //payload: axios.get(`${url.API}/ebis_getwinsum/div/EBIS/treg/${this.state.treg}/witel/${this.state.witel}/startdate/${this.state.startdate}/enddate/${this.state.enddate}/type/KL/nmitra/TELKOM`)
    })

    //EBIS DONE
    this.props.dispatch({
      type: 'MONITOR_KL_EBIS_DONE',
      //payload: axios.get(`${url.API}/ebis_getKLstatesum/div/EBIS/treg/${this.state.treg}/witel/${this.state.witel}/startdate/${this.state.startdate}/enddate/${this.state.enddate}/state/DONE/nmitra/ALL`)
    })
    this.props.dispatch({
      type: 'MONITOR_KL_EBIS_DONE_SUBS',
      payload: RNFetchBlob.config({
        trusty:true
      }). fetch('GET', `${url.API}/ebis_getKLstatesum/div/EBIS/treg/${this.state.treg}/witel/${this.state.witel}/startdate/${this.state.startdate}/enddate/${this.state.enddate}/state/DONE/nmitra/ALL`)
    })
    this.props.dispatch({
      type: 'MONITOR_KL_EBIS_DONE_MITRA',
      payload: RNFetchBlob.config({
        trusty:true
      }). fetch('GET', `${url.API}/ebis_getKLstatesum/div/EBIS/treg/${this.state.treg}/witel/${this.state.witel}/startdate/${this.state.startdate}/enddate/${this.state.enddate}/state/DONE/nmitra/MITRA`)
    })
    this.props.dispatch({
      type: 'MONITOR_KL_EBIS_DONE_TELKOM',
      //payload: axios.get(`${url.API}/ebis_getKLstatesum/div/EBIS/treg/${this.state.treg}/witel/${this.state.witel}/startdate/${this.state.startdate}/enddate/${this.state.enddate}/state/DONE/nmitra/TELKOM`)
    })

    //EBIS OGP
    this.props.dispatch({
      type: 'MONITOR_KL_EBIS_OGP',
      payload: RNFetchBlob.config({
        trusty:true
      }). fetch('GET', `${url.API}/ebis_getKLstatesum/div/EBIS/treg/${this.state.treg}/witel/${this.state.witel}/startdate/${this.state.startdate}/enddate/${this.state.enddate}/state/OGP/nmitra/ALL`)
    })
    this.props.dispatch({
      type: 'MONITOR_KL_EBIS_OGP_SUBS',
      payload: RNFetchBlob.config({
        trusty:true
      }). fetch('GET', `${url.API}/ebis_getKLstatesum/div/EBIS/treg/${this.state.treg}/witel/${this.state.witel}/startdate/${this.state.startdate}/enddate/${this.state.enddate}/state/OGP/nmitra/CFU`)
    })
    this.props.dispatch({
      type: 'MONITOR_KL_EBIS_OGP_MITRA',
      payload: RNFetchBlob.config({
        trusty:true
      }). fetch('GET', `${url.API}/ebis_getKLstatesum/div/EBIS/treg/${this.state.treg}/witel/${this.state.witel}/startdate/${this.state.startdate}/enddate/${this.state.enddate}/state/OGP/nmitra/MITRA`)
    })
    this.props.dispatch({
      type: 'MONITOR_KL_EBIS_OGP_TELKOM',
      payload: RNFetchBlob.config({
        trusty:true
      }). fetch('GET', `${url.API}/ebis_getKLstatesum/div/EBIS/treg/${this.state.treg}/witel/${this.state.witel}/startdate/${this.state.startdate}/enddate/${this.state.enddate}/state/OGP/nmitra/TELKOM`)
    })

    //EBIS OGP DATA
    this.props.dispatch({
      type: 'MONITOR_KL_EBIS_OGP_DATA',
      //payload: axios.get(`${url.API}/ebis_getklsumperiod/div/EBIS/treg/${this.state.treg}/witel/${this.state.witel}/startdate/${this.state.startdate}/enddate/${this.state.enddate}/state/OGP/nmitra/ALL`)
    })
    this.props.dispatch({
      type: 'MONITOR_KL_EBIS_OGP_DATA_SUBS',
      payload: RNFetchBlob.config({
        trusty:true
      }). fetch('GET', `${url.API}/ebis_getklsumperiod/div/EBIS/treg/${this.state.treg}/witel/${this.state.witel}/startdate/${this.state.startdate}/enddate/${this.state.enddate}/state/OGP/nmitra/ALL`)
    })
    this.props.dispatch({
      type: 'MONITOR_KL_EBIS_OGP_DATA_MITRA',
      payload: RNFetchBlob.config({
        trusty:true
      }). fetch('GET', `${url.API}/ebis_getklsumperiod/div/EBIS/treg/${this.state.treg}/witel/${this.state.witel}/startdate/${this.state.startdate}/enddate/${this.state.enddate}/state/OGP/nmitra/MITRA`)
    })
    this.props.dispatch({
      type: 'MONITOR_KL_EBIS_OGP_DATA_TELKOM',
      //payload: axios.get(`${url.API}/ebis_getklsumperiod/div/EBIS/treg/${this.state.treg}/witel/${this.state.witel}/startdate/${this.state.startdate}/enddate/${this.state.enddate}/state/OGP/nmitra/TELKOM`)
    })


    //DES
    this.props.dispatch({
      type: 'MONITOR_KL_DES',
      payload: RNFetchBlob.config({
        trusty:true
      }). fetch('GET', `${url.API}/ebis_getwinsum/div/DES/treg/${this.state.treg}/witel/${this.state.witel}/startdate/${this.state.startdate}/enddate/${this.state.enddate}/nmitra/ALL`)
    })
    this.props.dispatch({
      type: 'MONITOR_KL_DES_SUBS',
      payload: RNFetchBlob.config({
        trusty:true
      }). fetch('GET', `${url.API}/ebis_getwinsum/div/DES/treg/${this.state.treg}/witel/${this.state.witel}/startdate/${this.state.startdate}/enddate/${this.state.enddate}/nmitra/CFU`)
    })
    this.props.dispatch({
      type: 'MONITOR_KL_DES_MITRA',
      payload: RNFetchBlob.config({
        trusty:true
      }). fetch('GET', `${url.API}/ebis_getwinsum/div/DES/treg/${this.state.treg}/witel/${this.state.witel}/startdate/${this.state.startdate}/enddate/${this.state.enddate}/nmitra/MITRA`)
    })
    this.props.dispatch({
      type: 'MONITOR_KL_DES_TELKOM',
      payload: RNFetchBlob.config({
        trusty:true
      }). fetch('GET', `${url.API}/ebis_getwinsum/div/DES/treg/${this.state.treg}/witel/${this.state.witel}/startdate/${this.state.startdate}/enddate/${this.state.enddate}/nmitra/TELKOM`)
    })

    //DES DONE
    this.props.dispatch({
      type: 'MONITOR_KL_DES_DONE',
      payload: RNFetchBlob.config({
        trusty:true
      }). fetch('GET', `${url.API}/ebis_getKLstatesum/div/DES/treg/${this.state.treg}/witel/${this.state.witel}/startdate/${this.state.startdate}/enddate/${this.state.enddate}/state/DONE/nmitra/ALL`)
    })
    this.props.dispatch({
      type: 'MONITOR_KL_DES_DONE_SUBS',
      payload: RNFetchBlob.config({
        trusty:true
      }). fetch('GET', `${url.API}/ebis_getKLstatesum/div/DES/treg/${this.state.treg}/witel/${this.state.witel}/startdate/${this.state.startdate}/enddate/${this.state.enddate}/state/DONE/nmitra/CFU`)
    })
    this.props.dispatch({
      type: 'MONITOR_KL_DES_DONE_MITRA',
      payload: RNFetchBlob.config({
        trusty:true
      }). fetch('GET', `${url.API}/ebis_getKLstatesum/div/DES/treg/${this.state.treg}/witel/${this.state.witel}/startdate/${this.state.startdate}/enddate/${this.state.enddate}/state/DONE/nmitra/MITRA`)
    })
    this.props.dispatch({
      type: 'MONITOR_KL_DES_DONE_TELKOM',
      payload: RNFetchBlob.config({
        trusty:true
      }). fetch('GET', `${url.API}/ebis_getKLstatesum/div/DES/treg/${this.state.treg}/witel/${this.state.witel}/startdate/${this.state.startdate}/enddate/${this.state.enddate}/state/DONE/nmitra/TELKOM`)
    })

    //DES OGP
    this.props.dispatch({
      type: 'MONITOR_KL_DES_OGP',
      payload: RNFetchBlob.config({
        trusty:true
      }). fetch('GET', `${url.API}/ebis_getKLstatesum/div/DES/treg/${this.state.treg}/witel/${this.state.witel}/startdate/${this.state.startdate}/enddate/${this.state.enddate}/state/OGP/nmitra/ALL`)
    })
    this.props.dispatch({
      type: 'MONITOR_KL_DES_OGP_SUBS',
      payload: RNFetchBlob.config({
        trusty:true
      }). fetch('GET', `${url.API}/ebis_getKLstatesum/div/DES/treg/${this.state.treg}/witel/${this.state.witel}/startdate/${this.state.startdate}/enddate/${this.state.enddate}/state/OGP/nmitra/CFU`)
    })
    this.props.dispatch({
      type: 'MONITOR_KL_DES_OGP_MITRA',
      payload: RNFetchBlob.config({
        trusty:true
      }). fetch('GET', `${url.API}/ebis_getKLstatesum/div/DES/treg/${this.state.treg}/witel/${this.state.witel}/startdate/${this.state.startdate}/enddate/${this.state.enddate}/state/OGP/nmitra/MITRA`)
    })
    this.props.dispatch({
      type: 'MONITOR_KL_DES_OGP_TELKOM',
      payload: RNFetchBlob.config({
        trusty:true
      }). fetch('GET', `${url.API}/ebis_getKLstatesum/div/DES/treg/${this.state.treg}/witel/${this.state.witel}/startdate/${this.state.startdate}/enddate/${this.state.enddate}/state/OGP/nmitra/TELKOM`)
    })

    //DES OGP DATA
    this.props.dispatch({
      type: 'MONITOR_KL_DES_OGP_DATA',
      //payload: axios.get(`${url.API}/ebis_getklsumperiod/div/DES/treg/${this.state.treg}/witel/${this.state.witel}/startdate/${this.state.startdate}/enddate/${this.state.enddate}/state/OGP/nmitra/ALL`)
    })
    this.props.dispatch({
      type: 'MONITOR_KL_DES_OGP_DATA_SUBS',
      payload: RNFetchBlob.config({
        trusty:true
      }). fetch('GET', `${url.API}/ebis_getklsumperiod/div/DES/treg/${this.state.treg}/witel/${this.state.witel}/startdate/${this.state.startdate}/enddate/${this.state.enddate}/state/OGP/nmitra/ALL`)
    })
    this.props.dispatch({
      type: 'MONITOR_KL_DES_OGP_DATA_MITRA',
      payload: RNFetchBlob.config({
        trusty:true
      }). fetch('GET', `${url.API}/ebis_getklsumperiod/div/DES/treg/${this.state.treg}/witel/${this.state.witel}/startdate/${this.state.startdate}/enddate/${this.state.enddate}/state/OGP/nmitra/MITRA`)
    })
    this.props.dispatch({
      type: 'MONITOR_KL_DES_OGP_DATA_TELKOM',
      //payload: axios.get(`${url.API}/ebis_getklsumperiod/div/DES/treg/${this.state.treg}/witel/${this.state.witel}/startdate/${this.state.startdate}/enddate/${this.state.enddate}/state/OGP/nmitra/TELKOM`)
    })

    //DBS
    this.props.dispatch({
      type: 'MONITOR_KL_DBS',
      //payload: axios.get(`${url.API}/ebis_getwinsum/div/DBS/treg/${this.state.treg}/witel/${this.state.witel}/startdate/${this.state.startdate}/enddate/${this.state.enddate}/nmitra/ALL`)
    })
    this.props.dispatch({
      type: 'MONITOR_KL_DBS_SUBS',
      payload: RNFetchBlob.config({
        trusty:true
      }). fetch('GET', `${url.API}/ebis_getwinsum/div/DBS/treg/${this.state.treg}/witel/${this.state.witel}/startdate/${this.state.startdate}/enddate/${this.state.enddate}/nmitra/CFU`)
    })
    this.props.dispatch({
      type: 'MONITOR_KL_DBS_MITRA',
      payload: RNFetchBlob.config({
        trusty:true
      }). fetch('GET', `${url.API}/ebis_getwinsum/div/DBS/treg/${this.state.treg}/witel/${this.state.witel}/startdate/${this.state.startdate}/enddate/${this.state.enddate}/nmitra/MITRA`)
    })
    this.props.dispatch({
      type: 'MONITOR_KL_DBS_TELKOM',
      //payload: axios.get(`${url.API}/ebis_getwinsum/div/DBS/treg/${this.state.treg}/witel/${this.state.witel}/startdate/${this.state.startdate}/enddate/${this.state.enddate}/nmitra/TELKOM`)
    })

    //DBS DONE
    this.props.dispatch({
      type: 'MONITOR_KL_DBS_DONE',
      //payload: axios.get(`${url.API}/ebis_getKLstatesum/div/DBS/treg/${this.state.treg}/witel/${this.state.witel}/startdate/${this.state.startdate}/enddate/${this.state.enddate}/state/DONE/nmitra/ALL`)
    })
    this.props.dispatch({
      type: 'MONITOR_KL_DBS_DONE_SUBS',
      payload: RNFetchBlob.config({
        trusty:true
      }). fetch('GET', `${url.API}/ebis_getKLstatesum/div/DBS/treg/${this.state.treg}/witel/${this.state.witel}/startdate/${this.state.startdate}/enddate/${this.state.enddate}/state/DONE/nmitra/CFU`)
    })
    this.props.dispatch({
      type: 'MONITOR_KL_DBS_DONE_MITRA',
      payload: RNFetchBlob.config({
        trusty:true
      }). fetch('GET', `${url.API}/ebis_getKLstatesum/div/DBS/treg/${this.state.treg}/witel/${this.state.witel}/startdate/${this.state.startdate}/enddate/${this.state.enddate}/state/DONE/nmitra/MITRA`)
    })
    this.props.dispatch({
      type: 'MONITOR_KL_DBS_DONE_TELKOM',
      //payload: axios.get(`${url.API}/ebis_getKLstatesum/div/DBS/treg/${this.state.treg}/witel/${this.state.witel}/startdate/${this.state.startdate}/enddate/${this.state.enddate}/state/DONE/nmitra/TELKOM`)
    })

    //DBS OGP
    this.props.dispatch({
      type: 'MONITOR_KL_DBS_OGP',
      //payload: axios.get(`${url.API}/ebis_getKLstatesum/div/DBS/treg/${this.state.treg}/witel/${this.state.witel}/startdate/${this.state.startdate}/enddate/${this.state.enddate}/state/OGP/nmitra/ALL`)
    })
    this.props.dispatch({
      type: 'MONITOR_KL_DBS_OGP_SUBS',
      payload: RNFetchBlob.config({
        trusty:true
      }). fetch('GET', `${url.API}/ebis_getKLstatesum/div/DBS/treg/${this.state.treg}/witel/${this.state.witel}/startdate/${this.state.startdate}/enddate/${this.state.enddate}/state/OGP/nmitra/CFU`)
    })
    this.props.dispatch({
      type: 'MONITOR_KL_DBS_OGP_MITRA',
      payload: RNFetchBlob.config({
        trusty:true
      }). fetch('GET', `${url.API}/ebis_getKLstatesum/div/DBS/treg/${this.state.treg}/witel/${this.state.witel}/startdate/${this.state.startdate}/enddate/${this.state.enddate}/state/OGP/nmitra/MITRA`)
    })
    this.props.dispatch({
      type: 'MONITOR_KL_DBS_OGP_TELKOM',
      //payload: axios.get(`${url.API}/ebis_getKLstatesum/div/DBS/treg/${this.state.treg}/witel/${this.state.witel}/startdate/${this.state.startdate}/enddate/${this.state.enddate}/state/OGP/nmitra/TELKOM`)
    })

    //DBS OGP DATA
    this.props.dispatch({
      type: 'MONITOR_KL_DBS_OGP_DATA',
      //payload: axios.get(`${url.API}/ebis_getklsumperiod/div/DBS/treg/${this.state.treg}/witel/${this.state.witel}/startdate/${this.state.startdate}/enddate/${this.state.enddate}/state/OGP/nmitra/ALL`)
    })
    this.props.dispatch({
      type: 'MONITOR_KL_DBS_OGP_DATA_SUBS',
      payload: RNFetchBlob.config({
        trusty:true
      }). fetch('GET', `${url.API}/ebis_getklsumperiod/div/DBS/treg/${this.state.treg}/witel/${this.state.witel}/startdate/${this.state.startdate}/enddate/${this.state.enddate}/state/OGP/nmitra/ALL`)
    })
    this.props.dispatch({
      type: 'MONITOR_KL_DBS_OGP_DATA_MITRA',
      payload: RNFetchBlob.config({
        trusty:true
      }). fetch('GET', `${url.API}/ebis_getklsumperiod/div/DBS/treg/${this.state.treg}/witel/${this.state.witel}/startdate/${this.state.startdate}/enddate/${this.state.enddate}/state/OGP/nmitra/MITRA`)
    })
    this.props.dispatch({
      type: 'MONITOR_KL_DBS_OGP_DATA_TELKOM',
      //payload: axios.get(`${url.API}/ebis_getklsumperiod/div/DBS/treg/${this.state.treg}/witel/${this.state.witel}/startdate/${this.state.startdate}/enddate/${this.state.enddate}/state/OGP/nmitra/TELKOM`)
    })

    //DGS
    this.props.dispatch({
      type: 'MONITOR_KL_DGS',
      //payload: axios.get(`${url.API}/ebis_getwinsum/div/DGS/treg/${this.state.treg}/witel/${this.state.witel}/startdate/${this.state.startdate}/enddate/${this.state.enddate}/nmitra/ALL`)
    })
    this.props.dispatch({
      type: 'MONITOR_KL_DGS_SUBS',
      payload: RNFetchBlob.config({
        trusty:true
      }). fetch('GET', `${url.API}/ebis_getwinsum/div/DGS/treg/${this.state.treg}/witel/${this.state.witel}/startdate/${this.state.startdate}/enddate/${this.state.enddate}/nmitra/CFU`)
    })
    this.props.dispatch({
      type: 'MONITOR_KL_DGS_MITRA',
      payload: RNFetchBlob.config({
        trusty:true
      }). fetch('GET', `${url.API}/ebis_getwinsum/div/DGS/treg/${this.state.treg}/witel/${this.state.witel}/startdate/${this.state.startdate}/enddate/${this.state.enddate}/nmitra/MITRA`)
    })
    this.props.dispatch({
      type: 'MONITOR_KL_DGS_TELKOM',
      //payload: axios.get(`${url.API}/ebis_getwinsum/div/DGS/treg/${this.state.treg}/witel/${this.state.witel}/startdate/${this.state.startdate}/enddate/${this.state.enddate}/nmitra/TELKOM`)
    })

    //DGS DONE
    this.props.dispatch({
      type: 'MONITOR_KL_DGS_DONE',
      //payload: axios.get(`${url.API}/ebis_getKLstatesum/div/DGS/treg/${this.state.treg}/witel/${this.state.witel}/startdate/${this.state.startdate}/enddate/${this.state.enddate}/state/DONE/nmitra/ALL`)
    })
    this.props.dispatch({
      type: 'MONITOR_KL_DGS_DONE_SUBS',
      payload: RNFetchBlob.config({
        trusty:true
      }). fetch('GET', `${url.API}/ebis_getKLstatesum/div/DGS/treg/${this.state.treg}/witel/${this.state.witel}/startdate/${this.state.startdate}/enddate/${this.state.enddate}/state/DONE/nmitra/CFU`)
    })
    this.props.dispatch({
      type: 'MONITOR_KL_DGS_DONE_MITRA',
      payload: RNFetchBlob.config({
        trusty:true
      }). fetch('GET', `${url.API}/ebis_getKLstatesum/div/DGS/treg/${this.state.treg}/witel/${this.state.witel}/startdate/${this.state.startdate}/enddate/${this.state.enddate}/state/DONE/nmitra/MITRA`)
    })
    this.props.dispatch({
      type: 'MONITOR_KL_DGS_DONE_TELKOM',
      //payload: axios.get(`${url.API}/ebis_getKLstatesum/div/DGS/treg/${this.state.treg}/witel/${this.state.witel}/startdate/${this.state.startdate}/enddate/${this.state.enddate}/state/DONE/nmitra/TELKOM`)
    })

    //DGS OGP
    this.props.dispatch({
      type: 'MONITOR_KL_DGS_OGP',
      //payload: axios.get(`${url.API}/ebis_getKLstatesum/div/DGS/treg/${this.state.treg}/witel/${this.state.witel}/startdate/${this.state.startdate}/enddate/${this.state.enddate}/state/OGP/nmitra/ALL`)
    })
    this.props.dispatch({
      type: 'MONITOR_KL_DGS_OGP_SUBS',
      payload: RNFetchBlob.config({
        trusty:true
      }). fetch('GET', `${url.API}/ebis_getKLstatesum/div/DGS/treg/${this.state.treg}/witel/${this.state.witel}/startdate/${this.state.startdate}/enddate/${this.state.enddate}/state/OGP/nmitra/CFU`)
    })
    this.props.dispatch({
      type: 'MONITOR_KL_DGS_OGP_MITRA',
      payload: RNFetchBlob.config({
        trusty:true
      }). fetch('GET', `${url.API}/ebis_getKLstatesum/div/DGS/treg/${this.state.treg}/witel/${this.state.witel}/startdate/${this.state.startdate}/enddate/${this.state.enddate}/state/OGP/nmitra/MITRA`)
    })
    this.props.dispatch({
      type: 'MONITOR_KL_DGS_OGP_TELKOM',
      //payload: axios.get(`${url.API}/ebis_getKLstatesum/div/DGS/treg/${this.state.treg}/witel/${this.state.witel}/startdate/${this.state.startdate}/enddate/${this.state.enddate}/state/OGP/nmitra/TELKOM`)
    })

    //DGS OGP DATA
    this.props.dispatch({
      type: 'MONITOR_KL_DGS_OGP_DATA',
      //payload: axios.get(`${url.API}/ebis_getklsumperiod/div/DGS/treg/${this.state.treg}/witel/${this.state.witel}/startdate/${this.state.startdate}/enddate/${this.state.enddate}/state/OGP/nmitra/ALL`)
    })
    this.props.dispatch({
      type: 'MONITOR_KL_DGS_OGP_DATA_SUBS',
      payload: RNFetchBlob.config({
        trusty:true
      }). fetch('GET', `${url.API}/ebis_getklsumperiod/div/DGS/treg/${this.state.treg}/witel/${this.state.witel}/startdate/${this.state.startdate}/enddate/${this.state.enddate}/state/OGP/nmitra/ALL`)
    })
    this.props.dispatch({
      type: 'MONITOR_KL_DGS_OGP_DATA_MITRA',
      payload: RNFetchBlob.config({
        trusty:true
      }). fetch('GET', `${url.API}/ebis_getklsumperiod/div/DGS/treg/${this.state.treg}/witel/${this.state.witel}/startdate/${this.state.startdate}/enddate/${this.state.enddate}/state/OGP/nmitra/MITRA`)
    })
    this.props.dispatch({
      type: 'MONITOR_KL_DGS_OGP_DATA_TELKOM',
      //payload: axios.get(`${url.API}/ebis_getklsumperiod/div/DGS/treg/${this.state.treg}/witel/${this.state.witel}/startdate/${this.state.startdate}/enddate/${this.state.enddate}/state/OGP/nmitra/TELKOM`)
    })
    
  }
 
  buttonAll() {
    if (this.state.statusAll === false) {
      this.setState({
        statusAll: false
      })
    } else {
      this.setState({
        statusAll: !this.state.statusAll,
        statusTelkom: true,
        statusSubs: true,
        statusMitra: true,
      })
    }
  }
  buttonSubs() {
    if (this.state.statusSubs === false) {
      this.setState({
        statusSubs: false
      })
    } else {
      this.setState({
        statusSubs: !this.state.statusSubs,
        statusAll: true,
        statusMitra: true,
        statusTelkom: true,
      })
    }
  }
  buttonMitra() {
    if (this.state.statusMitra === false) {
      this.setState({
        statusMitra: false
      })
    } else {
      this.setState({
        statusMitra: !this.state.statusMitra,
        statusAll: true,
        statusSubs: true,
        statusTelkom: true,
      })
    }
  }
  buttonTelkom() {
    if (this.state.statusTelkom === false) {
      this.setState({
        statusTelkom: false
      })
    } else {
      this.setState({
        statusTelkom: !this.state.statusTelkom,
        statusAll: true,
        statusSubs: true,
        statusMitra: true,
      })
    }
  }

  renderModalContent() {
    const { dataTampung, loaderTampilDetail } = this.state;
    return (
      <View style={styles.modalContent}>
        {
          loaderTampilDetail
            ?
            <ActivityIndicator size={'large'} color={'#000'} style={{ margin: hp('5%') }} />
            :
            <View style={{ width: wp('85%') }}>
              <FlatList
                data={(dataTampung.length>0) ? dataTampung : []} 
                ListHeaderComponent={() => (
                  <View style={styles.wrapperHeaderContent}>
                    <View style={{ width: wp('35%') }}>
                      <Text style={{ textAlign: 'center', color: '#FFF', fontSize: 12 }}>Nama CC</Text>
                    </View>
                    <View style={{ width: wp('35%') }}>
                      <Text style={{ textAlign: 'center', color: '#FFF', fontSize: 12 }}>Nama Project</Text>
                    </View>
                    <View style={{ width: wp('10%'), alignItems: 'center', justifyContent: 'center' }}>
                      <Text style={{ textAlign: 'center', color: '#FFF', fontSize: 12 }}>Nilai</Text>
                    </View>
                  </View>
                )}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                  <View style={styles.containerDetailData}>
                    <View style={{ width: wp('35%'), alignSelf: 'center', justifyContent: 'center' }}>
                      <Text style={{ fontSize: 10 }}>{item.stage_06}</Text>
                    </View>
                    <View style={{ width: wp('35%'), alignSelf: 'center', justifyContent: 'center' }}>
                      <Text style={{ fontSize: 10 }}>{item.stage_07}</Text>
                    </View>
                    <View style={{ width: wp('10%'), alignSelf: 'center', justifyContent: 'center', alignItems: 'center' }}>
                      <Text style={{ textAlign: 'center', fontSize: 10 }}>{parseFloat(item.stage_10)}M</Text>
                    </View>
                  </View>
                )}
                style={{ height: hp('80%'), marginBottom: hp('2%') }}
              />
              <TouchableOpacity onPress={() => this.setState({ visibleModal: !this.state.visibleModal })} style={{ height: hp('5%'), backgroundColor: '#e74c3c', width: wp('85%'), justifyContent: 'center', alignItems: 'center', padding: hp('1%'), borderRadius: 5, marginBottom: hp('2%') }}>
                <Text style={{ color: '#FFF' }}>Tutup</Text>
              </TouchableOpacity>
            </View>
        }
      </View>
    )
  };

  getNum(val) {
    if (!isFinite(val)) {
      return 0;
    }
    if (isNaN(val)) {
      return 0;
    }
    return Math.ceil(val);
  }

  EbisScreen() {

    //import image arrow
    const images = {
      prospect: {
        arrowProspect1: require('../../../../../../../../assets/Arrow/arrowProspect.png'),
        arrowProspect2: require('../../../../../../../../assets/Arrow/arrowProspect3.png'),
      },
      Submission: {
        arrowSub1: require('../../../../../../../../assets/Arrow/arrowSub.png'),
        arrowSub2: require('../../../../../../../../assets/Arrow/arrowSub3.png'),
      },
      Win: {
        arrowWin1: require('../../../../../../../../assets/Arrow/arrowWin.png'),
        arrowWin2: require('../../../../../../../../assets/Arrow/arrowWin3.png'),
        arrowWin3: require('../../../../../../../../assets/Arrow/arrowWin2.png'),
      },
      Billcom: {
        arrowBil1: require('../../../../../../../../assets/Arrow/arrowBillcom.png'),
        arrowBil2: require('../../../../../../../../assets/Arrow/arrowBillcom3.png'),
      },

      //logo
      allImage: {
        allAktif: require('../../../../../../../../assets/detailKonten/stage-on30.png'),
        allNon: require('../../../../../../../../assets/detailKonten/stage-off00.png'),
      },
      subsImage: {
        subsAktif: require('../../../../../../../../assets/detailKonten/stage-on31.png'),
        subsNon: require('../../../../../../../../assets/detailKonten/stage-off01.png'),
      },
      mitraImage: {
        mitraAktif: require('../../../../../../../../assets/detailKonten/stage-on32.png'),
        mitraNon: require('../../../../../../../../assets/detailKonten/stage-off02.png'),
      },
      telkomImage: {
        telkomAktif: require('../../../../../../../../assets/detailKonten/stage-on33.png'),
        telkomNon: require('../../../../../../../../assets/detailKonten/stage-off03.png'),
      },
      arrowGrey: require('../../../../../../../../assets/Arrow/arrowGrey.png'),
    };

    const {
      navigation, dataMitra,
      dataEbisOgp3Rev, dataEbisOgp3Project, dataEbisOgp6Rev, dataEbisOgp6Project, dataEbisOgp7Rev, dataEbisOgp7Project,
      dataEbisOgp3RevSubs, dataEbisOgp3ProjectSubs, dataEbisOgp6RevSubs, dataEbisOgp6ProjectSubs, dataEbisOgp7RevSubs, dataEbisOgp7ProjectSubs,
      dataEbisOgp3RevMitra, dataEbisOgp3ProjectMitra, dataEbisOgp6RevMitra, dataEbisOgp6ProjectMitra, dataEbisOgp7RevMitra, dataEbisOgp7ProjectMitra,
      dataEbisOgp3RevTelkom, dataEbisOgp3ProjectTelkom, dataEbisOgp6RevTelkom, dataEbisOgp6ProjectTelkom, dataEbisOgp7RevTelkom, dataEbisOgp7ProjectTelkom,
      ebisWinREVENUE, ebisWinProject, 
      ebisMonitor, ebisMonitorWP, ebisMonitorDone, ebisMonitorDoneWP,ebisMonitorOgp, ebisMonitorOgpWP,
      ebisMonitorSubs, ebisMonitorWPSubs, ebisMonitorDoneSubs, ebisMonitorDoneWPSubs,ebisMonitorOgpSubs, ebisMonitorOgpWPSubs,
      ebisMonitorMitra, ebisMonitorWPMitra, ebisMonitorDoneMitra, ebisMonitorDoneWPMitra,ebisMonitorOgpMitra, ebisMonitorOgpWPMitra,
      ebisMonitorTelkom, ebisMonitorWPTelkom, ebisMonitorDoneTelkom, ebisMonitorDoneWPTelkom,ebisMonitorOgpTelkom, ebisMonitorOgpWPTelkom
    } = this.props;

    const { statusAll, statusSubs, statusMitra, statusTelkom, dataEbis } = this.state;

    const item = this.props.data;

    const valuePresentaseDone = (parseInt(ebisMonitorDone) / parseInt(ebisMonitor)) * 100;
    const newValueDone = Math.round(valuePresentaseDone)
    const valuePresentaseOgp = (parseInt(ebisMonitorOgp) / parseInt(ebisMonitor)) * 100;
    const newValueOgp = Math.round(valuePresentaseOgp)

    const valuePresentaseDoneSubs = (parseInt(ebisMonitorDoneSubs) / parseInt(ebisMonitorSubs)) * 100;
    const newValueDoneSubs = Math.round(valuePresentaseDoneSubs)
    const valuePresentaseOgpSubs = (parseInt(ebisMonitorOgpSubs) / parseInt(ebisMonitorSubs)) * 100;
    const newValueOgpSubs = Math.round(valuePresentaseOgpSubs)

    const valuePresentaseDoneMitra = (parseInt(ebisMonitorDoneMitra) / parseInt(ebisMonitorMitra)) * 100;
    const newValueDoneMitra = Math.round(valuePresentaseDoneMitra)
    const valuePresentaseOgpMitra= (parseInt(ebisMonitorOgpMitra) / parseInt(ebisMonitorMitra)) * 100;
    const newValueOgpMitra = Math.round(valuePresentaseOgpMitra)

    const valuePresentaseDoneTelkom = (parseInt(ebisMonitorDoneTelkom) / parseInt(ebisMonitorTelkom)) * 100;
    const newValueDoneTelkom = Math.round(valuePresentaseDoneTelkom)
    const valuePresentaseOgpTelkom = (parseInt(ebisMonitorOgpTelkom) / parseInt(ebisMonitorTelkom)) * 100;
    const newValueOgpTelkom = Math.round(valuePresentaseOgpTelkom)

    return (
      <View style={{ backgroundColor: '#FFF', flex: 1 }}>
        <View style={styles.wrapperArrow}>
          <Image
            source={images.Win.arrowWin1}
            style={styles.imageStyle}
            resizeMode={'stretch'}
          />

          <TouchableOpacity style={styles.containerArrowWin}>
            <Text style={styles.textJudul}>WIN</Text>
            <Text style={styles.textIsi}>{ebisWinREVENUE}M</Text>
            <Text style={styles.textKeterangan}>per {ebisWinProject} Project</Text>
          </TouchableOpacity>

          <Image
            source={images.Win.arrowWin2}
            style={styles.imageStyle}
            resizeMode={'stretch'}
          />

          <TouchableOpacity onPress={() => this.buttonSubs()} style={styles.containerArrowSubmission2}>
            {statusSubs === false
              ?
              <Image
                source={images.subsImage.subsAktif}
                style={styles.imageContent}
                resizeMode={'stretch'}
              />
              :
              <Image
                source={images.subsImage.subsNon}
                style={styles.imageContent}
                resizeMode={'stretch'}
              />
            }
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.buttonMitra()} style={styles.containerArrowSubmission2}>
            {statusMitra === false
              ?
              <Image
                source={images.mitraImage.mitraAktif}
                style={styles.imageContent}
                resizeMode={'stretch'}
              />
              :
              <Image
                source={images.mitraImage.mitraNon}
                style={styles.imageContent}
                resizeMode={'stretch'}
              />
            }
          </TouchableOpacity>

        </View>

        <View style={styles.wrapperHeaderContent}>
          <View style={{ width: wp('70%') }}>
            {renderIf(!statusAll)(
              <Text style={{ textAlign: 'center', color: '#FFF' }}>NAMA</Text>
            )}

            {renderIf(!statusSubs)(
              <Text style={{ textAlign: 'center', color: '#FFF' }}>SUBSIDIARY</Text>
            )}

            {renderIf(!statusMitra)(
              <Text style={{ textAlign: 'center', color: '#FFF' }}>MITRA</Text>
            )}

            {renderIf(!statusTelkom)(
              <Text style={{ textAlign: 'center', color: '#FFF' }}>TELKOM</Text>
            )}
          </View>
          <View style={{ width: wp('30%') }}>
            <Text style={{ textAlign: 'center', color: '#FFF' }}>TOTAL</Text>
          </View>
        </View>

        {/* <ScrollView> */}
        <Content style={{ backgroundColor: '#FFF' }}>

          {renderIf(!statusSubs)(
            <View style={{ margin: hp('2%') }}>
              <View style={styles.wrapperArrow}>
                <Image
                  source={images.Win.arrowWin1}
                  style={styles.imageStyle}
                  resizeMode={'stretch'}
                />

                <View style={styles.containerArrowWin}>
                  <Text style={styles.textJudul}>WIN</Text>
                  <Text style={styles.textIsi}>{ebisMonitorSubs}M</Text>
                  <Text style={styles.textKeterangan}>per {ebisMonitorWPSubs} Project</Text>
                </View>

                <Image
                  source={images.Win.arrowWin3}
                  style={styles.imageStyle}
                  resizeMode={'stretch'}
                />

                <TouchableOpacity style={styles.containerArrowWin2} onPress={() => navigation.navigate('DetailMonitorDoneKL',{treg:this.state.treg,witel:this.state.witel,start_date:this.state.startdate,end_date:this.state.enddate,status:'S'})}>
                  <Text style={styles.textJudul}>Done KL</Text>
                  <Text style={styles.textIsi}>{ebisMonitorDoneSubs}M</Text>
                  <Text style={styles.textKeterangan}>per {ebisMonitorDoneWPSubs} Project</Text>
                </TouchableOpacity>

                <Image
                  source={images.arrowGrey}
                  style={styles.imageStyle}
                  resizeMode={'stretch'}
                />

                <View style={styles.wrapperPresentase}>
                  <View style={styles.wrapperTextPresentase}>
                    <Text style={styles.textJudul}>{this.getNum(newValueDoneSubs)}%</Text>
                  </View>
                </View>
              </View>
              <View style={styles.wrapperArrow}>
                <Image
                  source={images.Win.arrowWin1}
                  style={styles.imageStyle}
                  resizeMode={'stretch'}
                />

                <View style={styles.containerArrowWin}>
                  <Text style={styles.textJudul}>WIN</Text>
                  <Text style={styles.textIsi}>{ebisMonitorSubs}M</Text>
                  <Text style={styles.textKeterangan}>per {ebisMonitorWPSubs} Project</Text>
                </View>

                <Image
                  source={images.Win.arrowWin3}
                  style={styles.imageStyle}
                  resizeMode={'stretch'}
                />

                <TouchableOpacity style={styles.containerArrowWin2} onPress={() => navigation.navigate('DetailMonitorOgpKL',{treg:this.state.treg,witel:this.state.witel,start_date:this.state.startdate,end_date:this.state.enddate,status:'S'})}>
                  <Text style={styles.textJudul}>OGP KL</Text>
                  <Text style={styles.textIsi}>{ebisMonitorOgpSubs}M</Text>
                  <Text style={styles.textKeterangan}>per {ebisMonitorOgpWPSubs} Project</Text>
                </TouchableOpacity>

                <Image
                  source={images.arrowGrey}
                  style={styles.imageStyle}
                  resizeMode={'stretch'}
                />

                <View style={styles.wrapperPresentase}>
                  <View style={styles.wrapperTextPresentase}>
                    <Text style={styles.textJudul}>{this.getNum(newValueOgpSubs)}%</Text>
                  </View>
                </View>
              </View>

              <View style={{ flexDirection: 'row', margin: hp('2%'), justifyContent: 'space-between' }}>
                <View style={{ marginBottom: hp('2%') }}>
                  <Text style={[styles.textJudul, { marginBottom: 20, alignItems: 'center' }]}>Progress OGP KL &#60; 3 Hari</Text>
                </View>

                <TouchableOpacity style={styles.containerArrowWin2} onPress={() => navigation.navigate('DetailMonitorProgressOgp3KL',{treg:this.state.treg,witel:this.state.witel,start_date:this.state.startdate,end_date:this.state.enddate,status:'S'})}>
                <View>
                  <Text style={styles.textIsi}>{dataEbisOgp3RevSubs}M</Text>
                  <Text style={styles.textKeterangan}>per {dataEbisOgp3ProjectSubs} Project</Text>
                </View>
                </TouchableOpacity>

              </View>

              <View style={{ flexDirection: 'row', margin: hp('2%'), justifyContent: 'space-between' }}>
                <View style={{ marginBottom: hp('2%') }}>
                  <Text style={[styles.textJudul, { marginBottom: 20, alignItems: 'center' }]}>3 Hari &#60; OGP &#60; 7 Hari</Text>
                </View>

                <TouchableOpacity style={styles.containerArrowWin2} onPress={() => navigation.navigate('DetailMonitorProgressOgp6KL',{treg:this.state.treg,witel:this.state.witel,start_date:this.state.startdate,end_date:this.state.enddate,status:'S'})}>
                <View>
                  <Text style={styles.textIsi}>{dataEbisOgp6RevSubs}M</Text>
                  <Text style={styles.textKeterangan}>per {dataEbisOgp6ProjectSubs} Project</Text>
                </View>
                </TouchableOpacity>

              </View>

              <View style={{ flexDirection: 'row', margin: hp('2%'), justifyContent: 'space-between' }}>
                <View style={{ marginBottom: hp('2%') }}>
                  <Text style={[styles.textJudul, { marginBottom: 20, alignItems: 'center' }]}>Progress OGP KL &#62; 7 Hari</Text>
                </View>

                <TouchableOpacity style={styles.containerArrowWin2} onPress={() => navigation.navigate('DetailMonitorProgressOgp7KL',{treg:this.state.treg,witel:this.state.witel,start_date:this.state.startdate,end_date:this.state.enddate,status:'S'})}>
                <View>
                  <Text style={styles.textIsi}>{dataEbisOgp7RevSubs}M</Text>
                  <Text style={styles.textKeterangan}>per {dataEbisOgp7ProjectSubs} Project</Text>
                </View>
                </TouchableOpacity>

              </View>
            </View>
          )}

          {renderIf(!statusMitra)(
            <View style={{ margin: hp('2%') }}>
            <View style={styles.wrapperArrow}>
              <Image
                source={images.Win.arrowWin1}
                style={styles.imageStyle}
                resizeMode={'stretch'}
              />

              <View style={styles.containerArrowWin}>
                <Text style={styles.textJudul}>WIN</Text>
                <Text style={styles.textIsi}>{ebisMonitorMitra}M</Text>
                <Text style={styles.textKeterangan}>per {ebisMonitorWPMitra} Project</Text>
              </View>

              <Image
                source={images.Win.arrowWin3}
                style={styles.imageStyle}
                resizeMode={'stretch'}
              />

              <TouchableOpacity style={styles.containerArrowWin2} onPress={() => navigation.navigate('DetailMonitorDoneKL',{treg:this.state.treg,witel:this.state.witel,start_date:this.state.startdate,end_date:this.state.enddate,status:'M'})}>
                <Text style={styles.textJudul}>Done KL</Text>
                <Text style={styles.textIsi}>{ebisMonitorDoneMitra}M</Text>
                <Text style={styles.textKeterangan}>per {ebisMonitorDoneWPMitra} Project</Text>
              </TouchableOpacity>

              <Image
                source={images.arrowGrey}
                style={styles.imageStyle}
                resizeMode={'stretch'}
              />

              <View style={styles.wrapperPresentase}>
                <View style={styles.wrapperTextPresentase}>
                  <Text style={styles.textJudul}>{this.getNum(newValueDoneMitra)}%</Text>
                </View>
              </View>
            </View>
            <View style={styles.wrapperArrow}>
              <Image
                source={images.Win.arrowWin1}
                style={styles.imageStyle}
                resizeMode={'stretch'}
              />

              <View style={styles.containerArrowWin}>
                <Text style={styles.textJudul}>WIN</Text>
                <Text style={styles.textIsi}>{ebisMonitorMitra}M</Text>
                <Text style={styles.textKeterangan}>per {ebisMonitorWPMitra} Project</Text>
              </View>

              <Image
                source={images.Win.arrowWin3}
                style={styles.imageStyle}
                resizeMode={'stretch'}
              />

              <TouchableOpacity style={styles.containerArrowWin2} onPress={() => navigation.navigate('DetailMonitorOgpKL',{treg:this.state.treg,witel:this.state.witel,start_date:this.state.startdate,end_date:this.state.enddate,status:'M'})}>
                <Text style={styles.textJudul}>OGP KL</Text>
                <Text style={styles.textIsi}>{ebisMonitorOgpMitra}M</Text>
                <Text style={styles.textKeterangan}>per {ebisMonitorOgpWPMitra} Project</Text>
              </TouchableOpacity>

              <Image
                source={images.arrowGrey}
                style={styles.imageStyle}
                resizeMode={'stretch'}
              />

              <View style={styles.wrapperPresentase}>
                <View style={styles.wrapperTextPresentase}>
                  <Text style={styles.textJudul}>{this.getNum(newValueOgpMitra)}%</Text>
                </View>
              </View>
            </View>

            <View style={{ flexDirection: 'row', margin: hp('2%'), justifyContent: 'space-between' }}>
              <View style={{ marginBottom: hp('2%') }}>
                <Text style={[styles.textJudul, { marginBottom: 20, alignItems: 'center' }]}>Progress OGP KL &#60; 3 Hari</Text>
              </View>

              <TouchableOpacity style={styles.containerArrowWin2} onPress={() => navigation.navigate('DetailMonitorProgressOgp3KL',{treg:this.state.treg,witel:this.state.witel,start_date:this.state.startdate,end_date:this.state.enddate,status:'M'})}>
              <View>
                <Text style={styles.textIsi}>{dataEbisOgp3RevMitra}M</Text>
                <Text style={styles.textKeterangan}>per {dataEbisOgp3ProjectMitra} Project</Text>
              </View>
              </TouchableOpacity>

            </View>

            <View style={{ flexDirection: 'row', margin: hp('2%'), justifyContent: 'space-between' }}>
              <View style={{ marginBottom: hp('2%') }}>
                <Text style={[styles.textJudul, { marginBottom: 20, alignItems: 'center' }]}>3 Hari &#60; OGP &#60; 7 Hari</Text>
              </View>

              <TouchableOpacity style={styles.containerArrowWin2} onPress={() => navigation.navigate('DetailMonitorProgressOgp6KL',{treg:this.state.treg,witel:this.state.witel,start_date:this.state.startdate,end_date:this.state.enddate,status:'M'})}>
              <View>
                <Text style={styles.textIsi}>{dataEbisOgp6RevMitra}M</Text>
                <Text style={styles.textKeterangan}>per {dataEbisOgp6ProjectMitra} Project</Text>
              </View>
              </TouchableOpacity>

            </View>

            <View style={{ flexDirection: 'row', margin: hp('2%'), justifyContent: 'space-between' }}>
              <View style={{ marginBottom: hp('2%') }}>
                <Text style={[styles.textJudul, { marginBottom: 20, alignItems: 'center' }]}>Progress OGP KL &#62; 7 Hari</Text>
              </View>

              <TouchableOpacity style={styles.containerArrowWin2} onPress={() => navigation.navigate('DetailMonitorProgressOgp7KL',{treg:this.state.treg,witel:this.state.witel,start_date:this.state.startdate,end_date:this.state.enddate,status:'M'})}>
              <View>
                <Text style={styles.textIsi}>{dataEbisOgp7RevMitra}M</Text>
                <Text style={styles.textKeterangan}>per {dataEbisOgp7ProjectMitra} Project</Text>
              </View>
              </TouchableOpacity>

            </View>
          </View>
          )}

        </Content>
        {/* </ScrollView> */}
      </View>
    )
  }

  DesScreen() {
    //import image arrow
    const images = {
      prospect: {
        arrowProspect1: require('../../../../../../../../assets/Arrow/arrowProspect.png'),
        arrowProspect2: require('../../../../../../../../assets/Arrow/arrowProspect3.png'),
      },
      Submission: {
        arrowSub1: require('../../../../../../../../assets/Arrow/arrowSub.png'),
        arrowSub2: require('../../../../../../../../assets/Arrow/arrowSub3.png'),
      },
      Win: {
        arrowWin1: require('../../../../../../../../assets/Arrow/arrowWin.png'),
        arrowWin2: require('../../../../../../../../assets/Arrow/arrowWin3.png'),
        arrowWin3: require('../../../../../../../../assets/Arrow/arrowWin2.png'),
      },
      Billcom: {
        arrowBil1: require('../../../../../../../../assets/Arrow/arrowBillcom.png'),
        arrowBil2: require('../../../../../../../../assets/Arrow/arrowBillcom3.png'),
      },

      //logo
      allImage: {
        allAktif: require('../../../../../../../../assets/detailKonten/stage-on30.png'),
        allNon: require('../../../../../../../../assets/detailKonten/stage-off00.png'),
      },
      subsImage: {
        subsAktif: require('../../../../../../../../assets/detailKonten/stage-on31.png'),
        subsNon: require('../../../../../../../../assets/detailKonten/stage-off01.png'),
      },
      mitraImage: {
        mitraAktif: require('../../../../../../../../assets/detailKonten/stage-on32.png'),
        mitraNon: require('../../../../../../../../assets/detailKonten/stage-off02.png'),
      },
      telkomImage: {
        telkomAktif: require('../../../../../../../../assets/detailKonten/stage-on33.png'),
        telkomNon: require('../../../../../../../../assets/detailKonten/stage-off03.png'),
      },
      arrowGrey: require('../../../../../../../../assets/Arrow/arrowGrey.png'),
    };

    const {
      //prospect
      navigation, dataMitra,
      dataDesOgp3Rev, dataDesOgp3Project, dataDesOgp6Rev, dataDesOgp6Project, dataDesOgp7Rev, dataDesOgp7Project,
      dataDesOgp3RevSubs, dataDesOgp3ProjectSubs, dataDesOgp6RevSubs, dataDesOgp6ProjectSubs, dataDesOgp7RevSubs, dataDesOgp7ProjectSubs,
      dataDesOgp3RevMitra, dataDesOgp3ProjectMitra, dataDesOgp6RevMitra, dataDesOgp6ProjectMitra, dataDesOgp7RevMitra, dataDesOgp7ProjectMitra,
      dataDesOgp3RevTelkom, dataDesOgp3ProjectTelkom, dataDesOgp6RevTelkom, dataDesOgp6ProjectTelkom, dataDesOgp7RevTelkom, dataDesOgp7ProjectTelkom,
      DesWinREVENUE, DesWinProject, 
      DesMonitor, DesMonitorWP, DesMonitorDone, DesMonitorDoneWP,DesMonitorOgp, DesMonitorOgpWP,
      DesMonitorSubs, DesMonitorWPSubs, DesMonitorDoneSubs, DesMonitorDoneWPSubs,DesMonitorOgpSubs, DesMonitorOgpWPSubs,
      DesMonitorMitra, DesMonitorWPMitra, DesMonitorDoneMitra, DesMonitorDoneWPMitra,DesMonitorOgpMitra, DesMonitorOgpWPMitra,
      DesMonitorTelkom, DesMonitorWPTelkom, DesMonitorDoneTelkom, DesMonitorDoneWPTelkom,DesMonitorOgpTelkom, DesMonitorOgpWPTelkom
    } = this.props;

    const { statusAll, statusSubs, statusMitra, statusTelkom, dataDes } = this.state;

    const item = this.props.dataDesOgp;

    const valuePresentaseDone = (parseInt(DesMonitorDone) / parseInt(DesMonitor)) * 100;
    const newValueDone = Math.round(valuePresentaseDone)
    const valuePresentaseOgp = (parseInt(DesMonitorOgp) / parseInt(DesMonitor)) * 100;
    const newValueOgp = Math.round(valuePresentaseOgp)

    const valuePresentaseDoneSubs = (parseInt(DesMonitorDoneSubs) / parseInt(DesMonitorSubs)) * 100;
    const newValueDoneSubs = Math.round(valuePresentaseDoneSubs)
    const valuePresentaseOgpSubs = (parseInt(DesMonitorOgpSubs) / parseInt(DesMonitorSubs)) * 100;
    const newValueOgpSubs = Math.round(valuePresentaseOgpSubs)

    const valuePresentaseDoneMitra = (parseInt(DesMonitorDoneMitra) / parseInt(DesMonitorMitra)) * 100;
    const newValueDoneMitra = Math.round(valuePresentaseDoneMitra)
    const valuePresentaseOgpMitra = (parseInt(DesMonitorOgpMitra) / parseInt(DesMonitorMitra)) * 100;
    const newValueOgpMitra = Math.round(valuePresentaseOgpMitra)

    const valuePresentaseDoneTelkom = (parseInt(DesMonitorDoneTelkom) / parseInt(DesMonitorTelkom)) * 100;
    const newValueDoneTelkom = Math.round(valuePresentaseDoneTelkom)
    const valuePresentaseOgpTelkom = (parseInt(DesMonitorOgpTelkom) / parseInt(DesMonitorTelkom)) * 100;
    const newValueOgpTelkom = Math.round(valuePresentaseOgpTelkom)

    return (
      <View style={{ backgroundColor: '#FFF', flex: 1 }}>
        <View style={styles.wrapperArrow}>
          <Image
            source={images.Win.arrowWin1}
            style={styles.imageStyle}
            resizeMode={'stretch'}
          />

          <View style={styles.containerArrowWin}>
            <Text style={styles.textJudul}>WIN</Text>
            <Text style={styles.textIsi}>{DesWinREVENUE}M</Text>
            <Text style={styles.textKeterangan}>per {DesWinProject} Project</Text>
          </View>

          <Image
            source={images.Win.arrowWin2}
            style={styles.imageStyle}
            resizeMode={'stretch'}
          />

          <TouchableOpacity onPress={() => this.buttonSubs()} style={styles.containerArrowSubmission2}>
            {statusSubs === false
              ?
              <Image
                source={images.subsImage.subsAktif}
                style={styles.imageContent}
                resizeMode={'stretch'}
              />
              :
              <Image
                source={images.subsImage.subsNon}
                style={styles.imageContent}
                resizeMode={'stretch'}
              />
            }
          </TouchableOpacity>

          <TouchableOpacity onPress={() => this.buttonMitra()} style={styles.containerArrowSubmission2}>
            {statusMitra === false
              ?
              <Image
                source={images.mitraImage.mitraAktif}
                style={styles.imageContent}
                resizeMode={'stretch'}
              />
              :
              <Image
                source={images.mitraImage.mitraNon}
                style={styles.imageContent}
                resizeMode={'stretch'}
              />
            }
          </TouchableOpacity>

        </View>

        <View style={styles.wrapperHeaderContent}>
          <View style={{ width: wp('70%') }}>
            {renderIf(!statusAll)(
              <Text style={{ textAlign: 'center', color: '#FFF' }}>NAMA</Text>
            )}

            {renderIf(!statusSubs)(
              <Text style={{ textAlign: 'center', color: '#FFF' }}>SUBSIDIARY</Text>
            )}

            {renderIf(!statusMitra)(
              <Text style={{ textAlign: 'center', color: '#FFF' }}>MITRA</Text>
            )}

            {renderIf(!statusTelkom)(
              <Text style={{ textAlign: 'center', color: '#FFF' }}>TELKOM</Text>
            )}
          </View>
          <View style={{ width: wp('30%') }}>
            <Text style={{ textAlign: 'center', color: '#FFF' }}>TOTAL</Text>
          </View>
        </View>

        {/* <ScrollView> */}
        <Content style={{ backgroundColor: '#FFF' }}>

          {renderIf(!statusSubs)(
            <View style={{ margin: hp('2%') }}>
              <View style={styles.wrapperArrow}>
                <Image
                  source={images.Win.arrowWin1}
                  style={styles.imageStyle}
                  resizeMode={'stretch'}
                />

                <View style={styles.containerArrowWin}>
                  <Text style={styles.textJudul}>WIN</Text>
                  <Text style={styles.textIsi}>{DesMonitorSubs}M</Text>
                  <Text style={styles.textKeterangan}>per {DesMonitorWPSubs} Project</Text>
                </View>

                <Image
                  source={images.Win.arrowWin3}
                  style={styles.imageStyle}
                  resizeMode={'stretch'}
                />

                <TouchableOpacity style={styles.containerArrowWin2} onPress={() => navigation.navigate('DetailMonitorDoneKL',{start_date:this.state.startdate,end_date:this.state.enddate,status:'S'})}>
                  <Text style={styles.textJudul}>Done KL</Text>
                  <Text style={styles.textIsi}>{DesMonitorDoneSubs}M</Text>
                  <Text style={styles.textKeterangan}>per {DesMonitorDoneWPSubs} Project</Text>
                </TouchableOpacity>

                <Image
                  source={images.arrowGrey}
                  style={styles.imageStyle}
                  resizeMode={'stretch'}
                />

                <View style={styles.wrapperPresentase}>
                  <View style={styles.wrapperTextPresentase}>
                    <Text style={styles.textJudul}>{this.getNum(newValueDoneSubs)}%</Text>
                  </View>
                </View>
              </View>
              <View style={styles.wrapperArrow}>
                <Image
                  source={images.Win.arrowWin1}
                  style={styles.imageStyle}
                  resizeMode={'stretch'}
                />

                <TouchableOpacity style={styles.containerArrowWin}>
                  <Text style={styles.textJudul}>WIN</Text>
                  <Text style={styles.textIsi}>{DesMonitorSubs}M</Text>
                  <Text style={styles.textKeterangan}>per {DesMonitorWPSubs} Project</Text>
                </TouchableOpacity>

                <Image
                  source={images.Win.arrowWin3}
                  style={styles.imageStyle}
                  resizeMode={'stretch'}
                />

                <TouchableOpacity style={styles.containerArrowWin2} onPress={() => navigation.navigate('DetailMonitorOgpKL',{start_date:this.state.startdate,end_date:this.state.enddate,status:'S'})}>
                  <Text style={styles.textJudul}>OGP KL</Text>
                  <Text style={styles.textIsi}>{DesMonitorOgpSubs}M</Text>
                  <Text style={styles.textKeterangan}>per {DesMonitorOgpWPSubs} Project</Text>
                </TouchableOpacity>

                <Image
                  source={images.arrowGrey}
                  style={styles.imageStyle}
                  resizeMode={'stretch'}
                />

                <View style={styles.wrapperPresentase}>
                  <View style={styles.wrapperTextPresentase}>
                    <Text style={styles.textJudul}>{this.getNum(newValueOgpSubs)}%</Text>
                  </View>
                </View>
              </View>

              <View style={{ flexDirection: 'row', margin: hp('2%'), justifyContent: 'space-between' }}>
                <View style={{ marginBottom: hp('2%') }}>
                  <Text style={[styles.textJudul, { marginBottom: 20, alignItems: 'center' }]}>Progress OGP KL &#60; 3 Hari</Text>
                </View>

                <TouchableOpacity style={styles.containerArrowWin2} onPress={() => navigation.navigate('DetailMonitorProgressOgp3KL',{start_date:this.state.startdate,end_date:this.state.enddate,status:'S'})}>
                <View>
                  <Text style={styles.textIsi}>{dataDesOgp3RevSubs}M</Text>
                  <Text style={styles.textKeterangan}>per {dataDesOgp3ProjectSubs} Project</Text>
                </View>
                </TouchableOpacity>

              </View>

              <View style={{ flexDirection: 'row', margin: hp('2%'), justifyContent: 'space-between' }}>
                <View style={{ marginBottom: hp('2%') }}>
                  <Text style={[styles.textJudul, { marginBottom: 20, alignItems: 'center' }]}>3 Hari &#60; OGP &#60; 7 Hari</Text>
                </View>

                <TouchableOpacity style={styles.containerArrowWin2} onPress={() => navigation.navigate('DetailMonitorProgressOgp6KL',{start_date:this.state.startdate,end_date:this.state.enddate,status:'S'})}>
                <View>
                  <Text style={styles.textIsi}>{dataDesOgp6RevSubs}M</Text>
                  <Text style={styles.textKeterangan}>per {dataDesOgp6ProjectSubs} Project</Text>
                </View>
                </TouchableOpacity>

              </View>

              <View style={{ flexDirection: 'row', margin: hp('2%'), justifyContent: 'space-between' }}>
                <View style={{ marginBottom: hp('2%') }}>
                  <Text style={[styles.textJudul, { marginBottom: 20, alignItems: 'center' }]}>Progress OGP KL &#62; 7 Hari</Text>
                </View>

                <TouchableOpacity style={styles.containerArrowWin2} onPress={() => navigation.navigate('DetailMonitorProgressOgp7KL',{start_date:this.state.startdate,end_date:this.state.enddate,status:'S'})}>
                <View>
                  <Text style={styles.textIsi}>{dataDesOgp7RevSubs}M</Text>
                  <Text style={styles.textKeterangan}>per {dataDesOgp7ProjectSubs} Project</Text>
                </View>
                </TouchableOpacity>

              </View>
            </View>
          )}

          {renderIf(!statusMitra)(
            <View style={{ margin: hp('2%') }}>
            <View style={styles.wrapperArrow}>
              <Image
                source={images.Win.arrowWin1}
                style={styles.imageStyle}
                resizeMode={'stretch'}
              />

              <View style={styles.containerArrowWin}>
                <Text style={styles.textJudul}>WIN</Text>
                <Text style={styles.textIsi}>{DesMonitorMitra}M</Text>
                <Text style={styles.textKeterangan}>per {DesMonitorWPMitra} Project</Text>
              </View>

              <Image
                source={images.Win.arrowWin3}
                style={styles.imageStyle}
                resizeMode={'stretch'}
              />

              <TouchableOpacity style={styles.containerArrowWin2} onPress={() => navigation.navigate('DetailMonitorDoneKL',{start_date:this.state.startdate,end_date:this.state.enddate,status:'M'})}>
                <Text style={styles.textJudul}>Done KL</Text>
                <Text style={styles.textIsi}>{DesMonitorDoneMitra}M</Text>
                <Text style={styles.textKeterangan}>per {DesMonitorDoneWPMitra} Project</Text>
              </TouchableOpacity>

              <Image
                source={images.arrowGrey}
                style={styles.imageStyle}
                resizeMode={'stretch'}
              />

              <View style={styles.wrapperPresentase}>
                <View style={styles.wrapperTextPresentase}>
                  <Text style={styles.textJudul}>{this.getNum(newValueDoneMitra)}%</Text>
                </View>
              </View>
            </View>
            <View style={styles.wrapperArrow}>
              <Image
                source={images.Win.arrowWin1}
                style={styles.imageStyle}
                resizeMode={'stretch'}
              />

              <TouchableOpacity style={styles.containerArrowWin}>
                <Text style={styles.textJudul}>WIN</Text>
                <Text style={styles.textIsi}>{DesMonitorMitra}M</Text>
                <Text style={styles.textKeterangan}>per {DesMonitorWPMitra} Project</Text>
              </TouchableOpacity>

              <Image
                source={images.Win.arrowWin3}
                style={styles.imageStyle}
                resizeMode={'stretch'}
              />

              <TouchableOpacity style={styles.containerArrowWin2} onPress={() => navigation.navigate('DetailMonitorOgpKL',{start_date:this.state.startdate,end_date:this.state.enddate,status:'M'})}>
                <Text style={styles.textJudul}>OGP KL</Text>
                <Text style={styles.textIsi}>{DesMonitorOgpMitra}M</Text>
                <Text style={styles.textKeterangan}>per {DesMonitorOgpWPMitra} Project</Text>
              </TouchableOpacity>

              <Image
                source={images.arrowGrey}
                style={styles.imageStyle}
                resizeMode={'stretch'}
              />

              <View style={styles.wrapperPresentase}>
                <View style={styles.wrapperTextPresentase}>
                  <Text style={styles.textJudul}>{this.getNum(newValueOgpMitra)}%</Text>
                </View>
              </View>
            </View>

            <View style={{ flexDirection: 'row', margin: hp('2%'), justifyContent: 'space-between' }}>
              <View style={{ marginBottom: hp('2%') }}>
                <Text style={[styles.textJudul, { marginBottom: 20, alignItems: 'center' }]}>Progress OGP KL &#60; 3 Hari</Text>
              </View>

              <TouchableOpacity style={styles.containerArrowWin2} onPress={() => navigation.navigate('DetailMonitorProgressOgp3KL',{start_date:this.state.startdate,end_date:this.state.enddate,status:'M'})}>
              <View>
                <Text style={styles.textIsi}>{dataDesOgp3RevMitra}M</Text>
                <Text style={styles.textKeterangan}>per {dataDesOgp3ProjectMitra} Project</Text>
              </View>
              </TouchableOpacity>

            </View>

            <View style={{ flexDirection: 'row', margin: hp('2%'), justifyContent: 'space-between' }}>
              <View style={{ marginBottom: hp('2%') }}>
                <Text style={[styles.textJudul, { marginBottom: 20, alignItems: 'center' }]}>3 Hari &#60; OGP &#60; 7 Hari</Text>
              </View>

              <TouchableOpacity style={styles.containerArrowWin2} onPress={() => navigation.navigate('DetailMonitorProgressOgp6KL',{start_date:this.state.startdate,end_date:this.state.enddate,status:'M'})}>
              <View>
                <Text style={styles.textIsi}>{dataDesOgp6RevMitra}M</Text>
                <Text style={styles.textKeterangan}>per {dataDesOgp6ProjectMitra} Project</Text>
              </View>
              </TouchableOpacity>

            </View>

            <View style={{ flexDirection: 'row', margin: hp('2%'), justifyContent: 'space-between' }}>
              <View style={{ marginBottom: hp('2%') }}>
                <Text style={[styles.textJudul, { marginBottom: 20, alignItems: 'center' }]}>Progress OGP KL &#62; 7 Hari</Text>
              </View>

              <TouchableOpacity style={styles.containerArrowWin2} onPress={() => navigation.navigate('DetailMonitorProgressOgp7KL',{start_date:this.state.startdate,end_date:this.state.enddate,status:'M'})}>
              <View>
                <Text style={styles.textIsi}>{dataDesOgp7RevMitra}M</Text>
                <Text style={styles.textKeterangan}>per {dataDesOgp7ProjectMitra} Project</Text>
              </View>
              </TouchableOpacity>

            </View>
          </View>
          )}

      </Content>
        {/* </ScrollView> */}
      </View>
    )
  }

  DbsScreen() {
    //import image arrow
    const images = {
      prospect: {
        arrowProspect1: require('../../../../../../../../assets/Arrow/arrowProspect.png'),
        arrowProspect2: require('../../../../../../../../assets/Arrow/arrowProspect3.png'),
      },
      Submission: {
        arrowSub1: require('../../../../../../../../assets/Arrow/arrowSub.png'),
        arrowSub2: require('../../../../../../../../assets/Arrow/arrowSub3.png'),
      },
      Win: {
        arrowWin1: require('../../../../../../../../assets/Arrow/arrowWin.png'),
        arrowWin2: require('../../../../../../../../assets/Arrow/arrowWin3.png'),
        arrowWin3: require('../../../../../../../../assets/Arrow/arrowWin2.png'),
      },
      Billcom: {
        arrowBil1: require('../../../../../../../../assets/Arrow/arrowBillcom.png'),
        arrowBil2: require('../../../../../../../../assets/Arrow/arrowBillcom3.png'),
      },

      //logo
      allImage: {
        allAktif: require('../../../../../../../../assets/detailKonten/stage-on30.png'),
        allNon: require('../../../../../../../../assets/detailKonten/stage-off00.png'),
      },
      subsImage: {
        subsAktif: require('../../../../../../../../assets/detailKonten/stage-on31.png'),
        subsNon: require('../../../../../../../../assets/detailKonten/stage-off01.png'),
      },
      mitraImage: {
        mitraAktif: require('../../../../../../../../assets/detailKonten/stage-on32.png'),
        mitraNon: require('../../../../../../../../assets/detailKonten/stage-off02.png'),
      },
      telkomImage: {
        telkomAktif: require('../../../../../../../../assets/detailKonten/stage-on33.png'),
        telkomNon: require('../../../../../../../../assets/detailKonten/stage-off03.png'),
      },
      arrowGrey: require('../../../../../../../../assets/Arrow/arrowGrey.png'),
    };

    const {
      //prospect
      navigation, dataMitra,
      dataDbsOgp3Rev, dataDbsOgp3Project, dataDbsOgp6Rev, dataDbsOgp6Project, dataDbsOgp7Rev, dataDbsOgp7Project,
      dataDbsOgp3RevSubs, dataDbsOgp3ProjectSubs, dataDbsOgp6RevSubs, dataDbsOgp6ProjectSubs, dataDbsOgp7RevSubs, dataDbsOgp7ProjectSubs,
      dataDbsOgp3RevMitra, dataDbsOgp3ProjectMitra, dataDbsOgp6RevMitra, dataDbsOgp6ProjectMitra, dataDbsOgp7RevMitra, dataDbsOgp7ProjectMitra,
      dataDbsOgp3RevTelkom, dataDbsOgp3ProjectTelkom, dataDbsOgp6RevTelkom, dataDbsOgp6ProjectTelkom, dataDbsOgp7RevTelkom, dataDbsOgp7ProjectTelkom,
      DbsWinREVENUE, DbsWinProject, 
      DbsMonitor, DbsMonitorWP, DbsMonitorDone, DbsMonitorDoneWP,DbsMonitorOgp, DbsMonitorOgpWP,
      DbsMonitorSubs, DbsMonitorWPSubs, DbsMonitorDoneSubs, DbsMonitorDoneWPSubs,DbsMonitorOgpSubs, DbsMonitorOgpWPSubs,
      DbsMonitorMitra, DbsMonitorWPMitra, DbsMonitorDoneMitra, DbsMonitorDoneWPMitra,DbsMonitorOgpMitra, DbsMonitorOgpWPMitra,
      DbsMonitorTelkom, DbsMonitorWPTelkom, DbsMonitorDoneTelkom, DbsMonitorDoneWPTelkom,DbsMonitorOgpTelkom, DbsMonitorOgpWPTelkom
    } = this.props;

    const { statusAll, statusSubs, statusMitra, statusTelkom, dataDbs } = this.state;

    const item = this.props.dataDbsOgp;

    const valuePresentaseDone = (parseInt(DbsMonitorDone) / parseInt(DbsMonitor)) * 100;
    const newValueDone = Math.round(valuePresentaseDone)
    const valuePresentaseOgp = (parseInt(DbsMonitorOgp) / parseInt(DbsMonitor)) * 100;
    const newValueOgp = Math.round(valuePresentaseOgp)

    const valuePresentaseDoneSubs = (parseInt(DbsMonitorDoneSubs) / parseInt(DbsMonitorSubs)) * 100;
    const newValueDoneSubs = Math.round(valuePresentaseDoneSubs)
    const valuePresentaseOgpSubs = (parseInt(DbsMonitorOgpSubs) / parseInt(DbsMonitorSubs)) * 100;
    const newValueOgpSubs = Math.round(valuePresentaseOgpSubs)

    const valuePresentaseDoneMitra = (parseInt(DbsMonitorDoneMitra) / parseInt(DbsMonitorMitra)) * 100;
    const newValueDoneMitra = Math.round(valuePresentaseDoneMitra)
    const valuePresentaseOgpMitra = (parseInt(DbsMonitorOgpMitra) / parseInt(DbsMonitorMitra)) * 100;
    const newValueOgpMitra = Math.round(valuePresentaseOgpMitra)

    const valuePresentaseDoneTelkom = (parseInt(DbsMonitorDoneTelkom) / parseInt(DbsMonitorTelkom)) * 100;
    const newValueDoneTelkom = Math.round(valuePresentaseDoneTelkom)
    const valuePresentaseOgpTelkom = (parseInt(DbsMonitorOgpTelkom) / parseInt(DbsMonitorTelkom)) * 100;
    const newValueOgpTelkom = Math.round(valuePresentaseOgpTelkom)

    return (
      <View style={{ backgroundColor: '#FFF', flex: 1 }}>
        <View style={styles.wrapperArrow}>
          <Image
            source={images.Win.arrowWin1}
            style={styles.imageStyle}
            resizeMode={'stretch'}
          />

          <View style={styles.containerArrowWin}>
            <Text style={styles.textJudul}>WIN</Text>
            <Text style={styles.textIsi}>{DbsWinREVENUE}M</Text>
            <Text style={styles.textKeterangan}>per {DbsWinProject} Project</Text>
          </View>

          <Image
            source={images.Win.arrowWin2}
            style={styles.imageStyle}
            resizeMode={'stretch'}
          />

          <TouchableOpacity onPress={() => this.buttonSubs()} style={styles.containerArrowSubmission2}>
            {statusSubs === false
              ?
              <Image
                source={images.subsImage.subsAktif}
                style={styles.imageContent}
                resizeMode={'stretch'}
              />
              :
              <Image
                source={images.subsImage.subsNon}
                style={styles.imageContent}
                resizeMode={'stretch'}
              />
            }
          </TouchableOpacity>

          <TouchableOpacity onPress={() => this.buttonMitra()} style={styles.containerArrowSubmission2}>
            {statusMitra === false
              ?
              <Image
                source={images.mitraImage.mitraAktif}
                style={styles.imageContent}
                resizeMode={'stretch'}
              />
              :
              <Image
                source={images.mitraImage.mitraNon}
                style={styles.imageContent}
                resizeMode={'stretch'}
              />
            }
          </TouchableOpacity>
          
        </View>

        <View style={styles.wrapperHeaderContent}>
          <View style={{ width: wp('70%') }}>
            {renderIf(!statusAll)(
              <Text style={{ textAlign: 'center', color: '#FFF' }}>NAMA</Text>
            )}

            {renderIf(!statusSubs)(
              <Text style={{ textAlign: 'center', color: '#FFF' }}>SUBSIDIARY</Text>
            )}

            {renderIf(!statusMitra)(
              <Text style={{ textAlign: 'center', color: '#FFF' }}>MITRA</Text>
            )}

            {renderIf(!statusTelkom)(
              <Text style={{ textAlign: 'center', color: '#FFF' }}>TELKOM</Text>
            )}
          </View>
          <View style={{ width: wp('30%') }}>
            <Text style={{ textAlign: 'center', color: '#FFF' }}>TOTAL</Text>
          </View>
        </View>

        {/* <ScrollView> */}
        <Content style={{ backgroundColor: '#FFF' }}>

          {renderIf(!statusSubs)(
            <View style={{ margin: hp('2%') }}>
              <View style={styles.wrapperArrow}>
                <Image
                  source={images.Win.arrowWin1}
                  style={styles.imageStyle}
                  resizeMode={'stretch'}
                />

                <View style={styles.containerArrowWin}>
                  <Text style={styles.textJudul}>WIN</Text>
                  <Text style={styles.textIsi}>{DbsMonitorSubs}M</Text>
                  <Text style={styles.textKeterangan}>per {DbsMonitorWPSubs} Project</Text>
                </View>

                <Image
                  source={images.Win.arrowWin3}
                  style={styles.imageStyle}
                  resizeMode={'stretch'}
                />

                <TouchableOpacity style={styles.containerArrowWin2} onPress={() => navigation.navigate('DetailMonitorDoneKL',{start_date:this.state.startdate,end_date:this.state.enddate,status:'S'})}>
                  <Text style={styles.textJudul}>Done KL</Text>
                  <Text style={styles.textIsi}>{DbsMonitorDoneSubs}M</Text>
                  <Text style={styles.textKeterangan}>per {DbsMonitorDoneWPSubs} Project</Text>
                </TouchableOpacity>

                <Image
                  source={images.arrowGrey}
                  style={styles.imageStyle}
                  resizeMode={'stretch'}
                />

                <View style={styles.wrapperPresentase}>
                  <View style={styles.wrapperTextPresentase}>
                    <Text style={styles.textJudul}>{this.getNum(newValueDoneSubs)}%</Text>
                  </View>
                </View>
              </View>
              <View style={styles.wrapperArrow}>
                <Image
                  source={images.Win.arrowWin1}
                  style={styles.imageStyle}
                  resizeMode={'stretch'}
                />

                <TouchableOpacity style={styles.containerArrowWin}>
                  <Text style={styles.textJudul}>WIN</Text>
                  <Text style={styles.textIsi}>{DbsMonitorSubs}M</Text>
                  <Text style={styles.textKeterangan}>per {DbsMonitorWPSubs} Project</Text>
                </TouchableOpacity>

                <Image
                  source={images.Win.arrowWin3}
                  style={styles.imageStyle}
                  resizeMode={'stretch'}
                />

                <TouchableOpacity style={styles.containerArrowWin2} onPress={() => navigation.navigate('DetailMonitorOgpKL',{start_date:this.state.startdate,end_date:this.state.enddate,status:'S'})}>
                  <Text style={styles.textJudul}>OGP KL</Text>
                  <Text style={styles.textIsi}>{DbsMonitorOgpSubs}M</Text>
                  <Text style={styles.textKeterangan}>per {DbsMonitorOgpWPSubs} Project</Text>
                </TouchableOpacity>

                <Image
                  source={images.arrowGrey}
                  style={styles.imageStyle}
                  resizeMode={'stretch'}
                />

                <View style={styles.wrapperPresentase}>
                  <View style={styles.wrapperTextPresentase}>
                    <Text style={styles.textJudul}>{this.getNum(newValueOgpSubs)}%</Text>
                  </View>
                </View>
              </View>

              <View style={{ flexDirection: 'row', margin: hp('2%'), justifyContent: 'space-between' }}>
                <View style={{ marginBottom: hp('2%') }}>
                  <Text style={[styles.textJudul, { marginBottom: 20, alignItems: 'center' }]}>Progress OGP KL &#60; 3 Hari</Text>
                </View>

                <TouchableOpacity style={styles.containerArrowWin2} onPress={() => navigation.navigate('DetailMonitorProgressOgp3KL',{start_date:this.state.startdate,end_date:this.state.enddate,status:'S'})}>
                <View>
                  <Text style={styles.textIsi}>{dataDbsOgp3RevSubs}M</Text>
                  <Text style={styles.textKeterangan}>per {dataDbsOgp3ProjectSubs} Project</Text>
                </View>
                </TouchableOpacity>

              </View>

              <View style={{ flexDirection: 'row', margin: hp('2%'), justifyContent: 'space-between' }}>
                <View style={{ marginBottom: hp('2%') }}>
                  <Text style={[styles.textJudul, { marginBottom: 20, alignItems: 'center' }]}>3 Hari &#60; OGP &#60; 7 Hari</Text>
                </View>

                <TouchableOpacity style={styles.containerArrowWin2} onPress={() => navigation.navigate('DetailMonitorProgressOgp6KL',{start_date:this.state.startdate,end_date:this.state.enddate,status:'S'})}>
                <View>
                  <Text style={styles.textIsi}>{dataDbsOgp6RevSubs}M</Text>
                  <Text style={styles.textKeterangan}>per {dataDbsOgp6ProjectSubs} Project</Text>
                </View>
                </TouchableOpacity>

              </View>

              <View style={{ flexDirection: 'row', margin: hp('2%'), justifyContent: 'space-between' }}>
                <View style={{ marginBottom: hp('2%') }}>
                  <Text style={[styles.textJudul, { marginBottom: 20, alignItems: 'center' }]}>Progress OGP KL &#62; 7 Hari</Text>
                </View>

                <TouchableOpacity style={styles.containerArrowWin2} onPress={() => navigation.navigate('DetailMonitorProgressOgp7KL',{start_date:this.state.startdate,end_date:this.state.enddate,status:'S'})}>
                <View>
                  <Text style={styles.textIsi}>{dataDbsOgp7RevSubs}M</Text>
                  <Text style={styles.textKeterangan}>per {dataDbsOgp7ProjectSubs} Project</Text>
                </View>
                </TouchableOpacity>

              </View>
            </View>
          )}

          {renderIf(!statusMitra)(
            <View style={{ margin: hp('2%') }}>
            <View style={styles.wrapperArrow}>
              <Image
                source={images.Win.arrowWin1}
                style={styles.imageStyle}
                resizeMode={'stretch'}
              />

              <View style={styles.containerArrowWin}>
                <Text style={styles.textJudul}>WIN</Text>
                <Text style={styles.textIsi}>{DbsMonitorMitra}M</Text>
                <Text style={styles.textKeterangan}>per {DbsMonitorWPMitra} Project</Text>
              </View>

              <Image
                source={images.Win.arrowWin3}
                style={styles.imageStyle}
                resizeMode={'stretch'}
              />

              <TouchableOpacity style={styles.containerArrowWin2} onPress={() => navigation.navigate('DetailMonitorDoneKL',{start_date:this.state.startdate,end_date:this.state.enddate,status:'M'})}>
                <Text style={styles.textJudul}>Done KL</Text>
                <Text style={styles.textIsi}>{DbsMonitorDoneMitra}M</Text>
                <Text style={styles.textKeterangan}>per {DbsMonitorDoneWPMitra} Project</Text>
              </TouchableOpacity>

              <Image
                source={images.arrowGrey}
                style={styles.imageStyle}
                resizeMode={'stretch'}
              />

              <View style={styles.wrapperPresentase}>
                <View style={styles.wrapperTextPresentase}>
                  <Text style={styles.textJudul}>{this.getNum(newValueDoneMitra)}%</Text>
                </View>
              </View>
            </View>
            <View style={styles.wrapperArrow}>
              <Image
                source={images.Win.arrowWin1}
                style={styles.imageStyle}
                resizeMode={'stretch'}
              />

              <TouchableOpacity style={styles.containerArrowWin}>
                <Text style={styles.textJudul}>WIN</Text>
                <Text style={styles.textIsi}>{DbsMonitorMitra}M</Text>
                <Text style={styles.textKeterangan}>per {DbsMonitorWPMitra} Project</Text>
              </TouchableOpacity>

              <Image
                source={images.Win.arrowWin3}
                style={styles.imageStyle}
                resizeMode={'stretch'}
              />

              <TouchableOpacity style={styles.containerArrowWin2} onPress={() => navigation.navigate('DetailMonitorOgpKL',{start_date:this.state.startdate,end_date:this.state.enddate,status:'M'})}>
                <Text style={styles.textJudul}>OGP KL</Text>
                <Text style={styles.textIsi}>{DbsMonitorOgpMitra}M</Text>
                <Text style={styles.textKeterangan}>per {DbsMonitorOgpWPMitra} Project</Text>
              </TouchableOpacity>

              <Image
                source={images.arrowGrey}
                style={styles.imageStyle}
                resizeMode={'stretch'}
              />

              <View style={styles.wrapperPresentase}>
                <View style={styles.wrapperTextPresentase}>
                  <Text style={styles.textJudul}>{this.getNum(newValueOgpMitra)}%</Text>
                </View>
              </View>
            </View>

            <View style={{ flexDirection: 'row', margin: hp('2%'), justifyContent: 'space-between' }}>
              <View style={{ marginBottom: hp('2%') }}>
                <Text style={[styles.textJudul, { marginBottom: 20, alignItems: 'center' }]}>Progress OGP KL &#60; 3 Hari</Text>
              </View>

              <TouchableOpacity style={styles.containerArrowWin2} onPress={() => navigation.navigate('DetailMonitorProgressOgp3KL',{start_date:this.state.startdate,end_date:this.state.enddate,status:'M'})}>
              <View>
                <Text style={styles.textIsi}>{dataDbsOgp3RevMitra}M</Text>
                <Text style={styles.textKeterangan}>per {dataDbsOgp3ProjectMitra} Project</Text>
              </View>
              </TouchableOpacity>

            </View>

            <View style={{ flexDirection: 'row', margin: hp('2%'), justifyContent: 'space-between' }}>
              <View style={{ marginBottom: hp('2%') }}>
                <Text style={[styles.textJudul, { marginBottom: 20, alignItems: 'center' }]}>3 Hari &#60; OGP &#60; 7 Hari</Text>
              </View>

              <TouchableOpacity style={styles.containerArrowWin2} onPress={() => navigation.navigate('DetailMonitorProgressOgp6KL',{start_date:this.state.startdate,end_date:this.state.enddate,status:'M'})}>
              <View>
                <Text style={styles.textIsi}>{dataDbsOgp6RevMitra}M</Text>
                <Text style={styles.textKeterangan}>per {dataDbsOgp6ProjectMitra} Project</Text>
              </View>
              </TouchableOpacity>

            </View>

            <View style={{ flexDirection: 'row', margin: hp('2%'), justifyContent: 'space-between' }}>
              <View style={{ marginBottom: hp('2%') }}>
                <Text style={[styles.textJudul, { marginBottom: 20, alignItems: 'center' }]}>Progress OGP KL &#62; 7 Hari</Text>
              </View>

              <TouchableOpacity style={styles.containerArrowWin2} onPress={() => navigation.navigate('DetailMonitorProgressOgp7KL',{start_date:this.state.startdate,end_date:this.state.enddate,status:'M'})}>
              <View>
                <Text style={styles.textIsi}>{dataDbsOgp7RevMitra}M</Text>
                <Text style={styles.textKeterangan}>per {dataDbsOgp7ProjectMitra} Project</Text>
              </View>
              </TouchableOpacity>

            </View>
          </View>
          )}

        </Content>
        {/* </ScrollView> */}
      </View>
    )
  }

  DgsScreen() {
    //import image arrow
    const images = {
      prospect: {
        arrowProspect1: require('../../../../../../../../assets/Arrow/arrowProspect.png'),
        arrowProspect2: require('../../../../../../../../assets/Arrow/arrowProspect3.png'),
      },
      Submission: {
        arrowSub1: require('../../../../../../../../assets/Arrow/arrowSub.png'),
        arrowSub2: require('../../../../../../../../assets/Arrow/arrowSub3.png'),
      },
      Win: {
        arrowWin1: require('../../../../../../../../assets/Arrow/arrowWin.png'),
        arrowWin2: require('../../../../../../../../assets/Arrow/arrowWin3.png'),
        arrowWin3: require('../../../../../../../../assets/Arrow/arrowWin2.png'),
      },
      Billcom: {
        arrowBil1: require('../../../../../../../../assets/Arrow/arrowBillcom.png'),
        arrowBil2: require('../../../../../../../../assets/Arrow/arrowBillcom3.png'),
      },

      //logo
      allImage: {
        allAktif: require('../../../../../../../../assets/detailKonten/stage-on30.png'),
        allNon: require('../../../../../../../../assets/detailKonten/stage-off00.png'),
      },
      subsImage: {
        subsAktif: require('../../../../../../../../assets/detailKonten/stage-on31.png'),
        subsNon: require('../../../../../../../../assets/detailKonten/stage-off01.png'),
      },
      mitraImage: {
        mitraAktif: require('../../../../../../../../assets/detailKonten/stage-on32.png'),
        mitraNon: require('../../../../../../../../assets/detailKonten/stage-off02.png'),
      },
      telkomImage: {
        telkomAktif: require('../../../../../../../../assets/detailKonten/stage-on33.png'),
        telkomNon: require('../../../../../../../../assets/detailKonten/stage-off03.png'),
      },
      arrowGrey: require('../../../../../../../../assets/Arrow/arrowGrey.png'),
    };

    const {
      //prospect
      navigation, dataMitra,
      dataDgsOgp3Rev, dataDgsOgp3Project, dataDgsOgp6Rev, dataDgsOgp6Project, dataDgsOgp7Rev, dataDgsOgp7Project,
      dataDgsOgp3RevSubs, dataDgsOgp3ProjectSubs, dataDgsOgp6RevSubs, dataDgsOgp6ProjectSubs, dataDgsOgp7RevSubs, dataDgsOgp7ProjectSubs,
      dataDgsOgp3RevMitra, dataDgsOgp3ProjectMitra, dataDgsOgp6RevMitra, dataDgsOgp6ProjectMitra, dataDgsOgp7RevMitra, dataDgsOgp7ProjectMitra,
      dataDgsOgp3RevTelkom, dataDgsOgp3ProjectTelkom, dataDgsOgp6RevTelkom, dataDgsOgp6ProjectTelkom, dataDgsOgp7RevTelkom, dataDgsOgp7ProjectTelkom,
      DgsWinREVENUE, DgsWinProject, 
      DgsMonitor, DgsMonitorWP, DgsMonitorDone, DgsMonitorDoneWP,DgsMonitorOgp, DgsMonitorOgpWP,
      DgsMonitorSubs, DgsMonitorWPSubs, DgsMonitorDoneSubs, DgsMonitorDoneWPSubs,DgsMonitorOgpSubs, DgsMonitorOgpWPSubs,
      DgsMonitorMitra, DgsMonitorWPMitra, DgsMonitorDoneMitra, DgsMonitorDoneWPMitra,DgsMonitorOgpMitra, DgsMonitorOgpWPMitra,
      DgsMonitorTelkom, DgsMonitorWPTelkom, DgsMonitorDoneTelkom, DgsMonitorDoneWPTelkom,DgsMonitorOgpTelkom, DgsMonitorOgpWPTelkom
    } = this.props;

    const { statusAll, statusSubs, statusMitra, statusTelkom, dataDgs } = this.state;

    const valuePresentaseDone = (parseInt(DgsMonitorDone) / parseInt(DgsMonitor)) * 100;
    const newValueDone = Math.round(valuePresentaseDone)
    const valuePresentaseOgp = (parseInt(DgsMonitorOgp) / parseInt(DgsMonitor)) * 100;
    const newValueOgp = Math.round(valuePresentaseOgp)

    const valuePresentaseDoneSubs = (parseInt(DgsMonitorDoneSubs) / parseInt(DgsMonitorSubs)) * 100;
    const newValueDoneSubs = Math.round(valuePresentaseDoneSubs)
    const valuePresentaseOgpSubs = (parseInt(DgsMonitorOgpSubs) / parseInt(DgsMonitorSubs)) * 100;
    const newValueOgpSubs = Math.round(valuePresentaseOgpSubs)

    const valuePresentaseDoneMitra = (parseInt(DgsMonitorDoneMitra) / parseInt(DgsMonitorMitra)) * 100;
    const newValueDoneMitra = Math.round(valuePresentaseDoneMitra)
    const valuePresentaseOgpMitra = (parseInt(DgsMonitorOgpMitra) / parseInt(DgsMonitorMitra)) * 100;
    const newValueOgpMitra = Math.round(valuePresentaseOgpMitra)

    const valuePresentaseDoneTelkom = (parseInt(DgsMonitorDoneTelkom) / parseInt(DgsMonitorTelkom)) * 100;
    const newValueDoneTelkom = Math.round(valuePresentaseDoneTelkom)
    const valuePresentaseOgpTelkom = (parseInt(DgsMonitorOgpTelkom) / parseInt(DgsMonitorTelkom)) * 100;
    const newValueOgpTelkom = Math.round(valuePresentaseOgpTelkom)

    return (
      <View style={{ backgroundColor: '#FFF', flex: 1 }}>
        <View style={styles.wrapperArrow}>
          <Image
            source={images.Win.arrowWin1}
            style={styles.imageStyle}
            resizeMode={'stretch'}
          />

          <View style={styles.containerArrowWin}>
            <Text style={styles.textJudul}>WIN</Text>
            <Text style={styles.textIsi}>{DgsWinREVENUE}M</Text>
            <Text style={styles.textKeterangan}>per {DgsWinProject} Project</Text>
          </View>

          <Image
            source={images.Win.arrowWin2}
            style={styles.imageStyle}
            resizeMode={'stretch'}
          />

          <TouchableOpacity onPress={() => this.buttonSubs()} style={styles.containerArrowSubmission2}>
            {statusSubs === false
              ?
              <Image
                source={images.subsImage.subsAktif}
                style={styles.imageContent}
                resizeMode={'stretch'}
              />
              :
              <Image
                source={images.subsImage.subsNon}
                style={styles.imageContent}
                resizeMode={'stretch'}
              />
            }
          </TouchableOpacity>

          <TouchableOpacity onPress={() => this.buttonMitra()} style={styles.containerArrowSubmission2}>
            {statusMitra === false
              ?
              <Image
                source={images.mitraImage.mitraAktif}
                style={styles.imageContent}
                resizeMode={'stretch'}
              />
              :
              <Image
                source={images.mitraImage.mitraNon}
                style={styles.imageContent}
                resizeMode={'stretch'}
              />
            }
          </TouchableOpacity>

        </View>

        <View style={styles.wrapperHeaderContent}>
          <View style={{ width: wp('70%') }}>
            {renderIf(!statusAll)(
              <Text style={{ textAlign: 'center', color: '#FFF' }}>NAMA</Text>
            )}

            {renderIf(!statusSubs)(
              <Text style={{ textAlign: 'center', color: '#FFF' }}>SUBSIDIARY</Text>
            )}

            {renderIf(!statusMitra)(
              <Text style={{ textAlign: 'center', color: '#FFF' }}>MITRA</Text>
            )}

            {renderIf(!statusTelkom)(
              <Text style={{ textAlign: 'center', color: '#FFF' }}>TELKOM</Text>
            )}
          </View>
          <View style={{ width: wp('30%') }}>
            <Text style={{ textAlign: 'center', color: '#FFF' }}>TOTAL</Text>
          </View>
        </View>

        {/* <ScrollView> */}
        <Content style={{ backgroundColor: '#FFF' }}>

          {renderIf(!statusSubs)(
            <View style={{ margin: hp('2%') }}>
              <View style={styles.wrapperArrow}>
                <Image
                  source={images.Win.arrowWin1}
                  style={styles.imageStyle}
                  resizeMode={'stretch'}
                />

                <View style={styles.containerArrowWin}>
                  <Text style={styles.textJudul}>WIN</Text>
                  <Text style={styles.textIsi}>{DgsMonitorSubs}M</Text>
                  <Text style={styles.textKeterangan}>per {DgsMonitorWPSubs} Project</Text>
                </View>

                <Image
                  source={images.Win.arrowWin3}
                  style={styles.imageStyle}
                  resizeMode={'stretch'}
                />

                <TouchableOpacity style={styles.containerArrowWin2} onPress={() => navigation.navigate('DetailMonitorDoneKL',{start_date:this.state.startdate,end_date:this.state.enddate,status:'S'})}>
                  <Text style={styles.textJudul}>Done KL</Text>
                  <Text style={styles.textIsi}>{DgsMonitorDoneSubs}M</Text>
                  <Text style={styles.textKeterangan}>per {DgsMonitorDoneWPSubs} Project</Text>
                </TouchableOpacity>

                <Image
                  source={images.arrowGrey}
                  style={styles.imageStyle}
                  resizeMode={'stretch'}
                />

                <View style={styles.wrapperPresentase}>
                  <View style={styles.wrapperTextPresentase}>
                    <Text style={styles.textJudul}>{this.getNum(newValueDoneSubs)}%</Text>
                  </View>
                </View>
              </View>
              <View style={styles.wrapperArrow}>
                <Image
                  source={images.Win.arrowWin1}
                  style={styles.imageStyle}
                  resizeMode={'stretch'}
                />

                <TouchableOpacity style={styles.containerArrowWin}>
                  <Text style={styles.textJudul}>WIN</Text>
                  <Text style={styles.textIsi}>{DgsMonitorSubs}M</Text>
                  <Text style={styles.textKeterangan}>per {DgsMonitorWPSubs} Project</Text>
                </TouchableOpacity>

                <Image
                  source={images.Win.arrowWin3}
                  style={styles.imageStyle}
                  resizeMode={'stretch'}
                />

                <TouchableOpacity style={styles.containerArrowWin2} onPress={() => navigation.navigate('DetailMonitorOgpKL',{start_date:this.state.startdate,end_date:this.state.enddate,status:'S'})}>
                  <Text style={styles.textJudul}>OGP KL</Text>
                  <Text style={styles.textIsi}>{DgsMonitorOgpSubs}M</Text>
                  <Text style={styles.textKeterangan}>per {DgsMonitorOgpWPSubs} Project</Text>
                </TouchableOpacity>

                <Image
                  source={images.arrowGrey}
                  style={styles.imageStyle}
                  resizeMode={'stretch'}
                />

                <View style={styles.wrapperPresentase}>
                  <View style={styles.wrapperTextPresentase}>
                    <Text style={styles.textJudul}>{this.getNum(newValueOgpSubs)}%</Text>
                  </View>
                </View>
              </View>

              <View style={{ flexDirection: 'row', margin: hp('2%'), justifyContent: 'space-between' }}>
                <View style={{ marginBottom: hp('2%') }}>
                  <Text style={[styles.textJudul, { marginBottom: 20, alignItems: 'center' }]}>Progress OGP KL &#60; 3 Hari</Text>
                </View>

                <TouchableOpacity style={styles.containerArrowWin2} onPress={() => navigation.navigate('DetailMonitorProgressOgp3KL',{start_date:this.state.startdate,end_date:this.state.enddate,status:'S'})}>
                <View>
                  <Text style={styles.textIsi}>{dataDgsOgp3RevSubs}M</Text>
                  <Text style={styles.textKeterangan}>per {dataDgsOgp3ProjectSubs} Project</Text>
                </View>
                </TouchableOpacity>

              </View>

              <View style={{ flexDirection: 'row', margin: hp('2%'), justifyContent: 'space-between' }}>
                <View style={{ marginBottom: hp('2%') }}>
                  <Text style={[styles.textJudul, { marginBottom: 20, alignItems: 'center' }]}>3 Hari &#60; OGP &#60; 7 Hari</Text>
                </View>

                <TouchableOpacity style={styles.containerArrowWin2} onPress={() => navigation.navigate('DetailMonitorProgressOgp6KL',{start_date:this.state.startdate,end_date:this.state.enddate,status:'S'})}>
                <View>
                  <Text style={styles.textIsi}>{dataDgsOgp6RevSubs}M</Text>
                  <Text style={styles.textKeterangan}>per {dataDgsOgp6ProjectSubs} Project</Text>
                </View>
                </TouchableOpacity>

              </View>

              <View style={{ flexDirection: 'row', margin: hp('2%'), justifyContent: 'space-between' }}>
                <View style={{ marginBottom: hp('2%') }}>
                  <Text style={[styles.textJudul, { marginBottom: 20, alignItems: 'center' }]}>Progress OGP KL &#62; 7 Hari</Text>
                </View>

                <TouchableOpacity style={styles.containerArrowWin2} onPress={() => navigation.navigate('DetailMonitorProgressOgp7KL',{start_date:this.state.startdate,end_date:this.state.enddate,status:'S'})}>
                <View>
                  <Text style={styles.textIsi}>{dataDgsOgp7RevSubs}M</Text>
                  <Text style={styles.textKeterangan}>per {dataDgsOgp7ProjectSubs} Project</Text>
                </View>
                </TouchableOpacity>

              </View>
            </View>
          )}

          {renderIf(!statusMitra)(
            <View style={{ margin: hp('2%') }}>
              <View style={styles.wrapperArrow}>
                <Image
                  source={images.Win.arrowWin1}
                  style={styles.imageStyle}
                  resizeMode={'stretch'}
                />

                <View style={styles.containerArrowWin}>
                  <Text style={styles.textJudul}>WIN</Text>
                  <Text style={styles.textIsi}>{DgsMonitorMitra}M</Text>
                  <Text style={styles.textKeterangan}>per {DgsMonitorWPMitra} Project</Text>
                </View>

                <Image
                  source={images.Win.arrowWin3}
                  style={styles.imageStyle}
                  resizeMode={'stretch'}
                />

                <TouchableOpacity style={styles.containerArrowWin2} onPress={() => navigation.navigate('DetailMonitorDoneKL',{start_date:this.state.startdate,end_date:this.state.enddate,status:'M'})}>
                  <Text style={styles.textJudul}>Done KL</Text>
                  <Text style={styles.textIsi}>{DgsMonitorDoneMitra}M</Text>
                  <Text style={styles.textKeterangan}>per {DgsMonitorDoneWPMitra} Project</Text>
                </TouchableOpacity>

                <Image
                  source={images.arrowGrey}
                  style={styles.imageStyle}
                  resizeMode={'stretch'}
                />

                <View style={styles.wrapperPresentase}>
                  <View style={styles.wrapperTextPresentase}>
                    <Text style={styles.textJudul}>{this.getNum(newValueDoneMitra)}%</Text>
                  </View>
                </View>
              </View>
              <View style={styles.wrapperArrow}>
                <Image
                  source={images.Win.arrowWin1}
                  style={styles.imageStyle}
                  resizeMode={'stretch'}
                />

                <TouchableOpacity style={styles.containerArrowWin}>
                  <Text style={styles.textJudul}>WIN</Text>
                  <Text style={styles.textIsi}>{DgsMonitorMitra}M</Text>
                  <Text style={styles.textKeterangan}>per {DgsMonitorWPMitra} Project</Text>
                </TouchableOpacity>

                <Image
                  source={images.Win.arrowWin3}
                  style={styles.imageStyle}
                  resizeMode={'stretch'}
                />

                <TouchableOpacity style={styles.containerArrowWin2} onPress={() => navigation.navigate('DetailMonitorOgpKL',{start_date:this.state.startdate,end_date:this.state.enddate,status:'M'})}>
                  <Text style={styles.textJudul}>OGP KL</Text>
                  <Text style={styles.textIsi}>{DgsMonitorOgpMitra}M</Text>
                  <Text style={styles.textKeterangan}>per {DgsMonitorOgpWPMitra} Project</Text>
                </TouchableOpacity>

                <Image
                  source={images.arrowGrey}
                  style={styles.imageStyle}
                  resizeMode={'stretch'}
                />

                <View style={styles.wrapperPresentase}>
                  <View style={styles.wrapperTextPresentase}>
                    <Text style={styles.textJudul}>{this.getNum(newValueOgpMitra)}%</Text>
                  </View>
                </View>
              </View>

              <View style={{ flexDirection: 'row', margin: hp('2%'), justifyContent: 'space-between' }}>
                <View style={{ marginBottom: hp('2%') }}>
                  <Text style={[styles.textJudul, { marginBottom: 20, alignItems: 'center' }]}>Progress OGP KL &#60; 3 Hari</Text>
                </View>

                <TouchableOpacity style={styles.containerArrowWin2} onPress={() => navigation.navigate('DetailMonitorProgressOgp3KL',{start_date:this.state.startdate,end_date:this.state.enddate,status:'M'})}>
                <View>
                  <Text style={styles.textIsi}>{dataDgsOgp3RevMitra}M</Text>
                  <Text style={styles.textKeterangan}>per {dataDgsOgp3ProjectMitra} Project</Text>
                </View>
                </TouchableOpacity>

              </View>

              <View style={{ flexDirection: 'row', margin: hp('2%'), justifyContent: 'space-between' }}>
                <View style={{ marginBottom: hp('2%') }}>
                  <Text style={[styles.textJudul, { marginBottom: 20, alignItems: 'center' }]}>3 Hari &#60; OGP &#60; 7 Hari</Text>
                </View>

                <TouchableOpacity style={styles.containerArrowWin2} onPress={() => navigation.navigate('DetailMonitorProgressOgp6KL',{start_date:this.state.startdate,end_date:this.state.enddate,status:'M'})}>
                <View>
                  <Text style={styles.textIsi}>{dataDgsOgp6RevMitra}M</Text>
                  <Text style={styles.textKeterangan}>per {dataDgsOgp6ProjectMitra} Project</Text>
                </View>
                </TouchableOpacity>

              </View>

              <View style={{ flexDirection: 'row', margin: hp('2%'), justifyContent: 'space-between' }}>
                <View style={{ marginBottom: hp('2%') }}>
                  <Text style={[styles.textJudul, { marginBottom: 20, alignItems: 'center' }]}>Progress OGP KL &#62; 7 Hari</Text>
                </View>

                <TouchableOpacity style={styles.containerArrowWin2} onPress={() => navigation.navigate('DetailMonitorProgressOgp7KL',{start_date:this.state.startdate,end_date:this.state.enddate,status:'M'})}>
                <View>
                  <Text style={styles.textIsi}>{dataDgsOgp7RevMitra}M</Text>
                  <Text style={styles.textKeterangan}>per {dataDgsOgp7ProjectMitra} Project</Text>
                </View>
                </TouchableOpacity>

              </View>
            </View>
          )}

        </Content>
        {/* </ScrollView> */}
      </View>
    )
  }

  render() {
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();

    var dateNow = `${date}-${month}-${year}`

    const {
      //navigasi props
      navigation,
    } = this.props;

    return (
      <Container style={styles.container}>
        <Header style={{ backgroundColor: '#820000' }}>
          <Left>
            <Button transparent onPress={() => navigation.goBack()}>
              <Icon type={'MaterialIcons'} name={'arrow-back'} style={{ color: '#FFF' }} />
            </Button>
          </Left>
          <Body>
            <Title style={{ color: '#FFF' }}>Monitor KL</Title>
          </Body>
          <Right />
        </Header>

        <View style={styles.wrapperTabs}>
          <Tabs tabBarUnderlineStyle={{ backgroundColor: '#575F6A' }}>
            <Tab heading="EBIS" tabStyle={styles.tabStyle} activeTabStyle={styles.activeTabStyle} activeTextStyle={styles.activeTextStyle} textStyle={styles.textStyle}>
              {this.EbisScreen()}
            </Tab>
            <Tab heading="DES" tabStyle={styles.tabStyle} activeTabStyle={styles.activeTabStyle} activeTextStyle={styles.activeTextStyle} textStyle={styles.textStyle}>
              {this.DesScreen()}
            </Tab>
            <Tab heading="DBS" tabStyle={styles.tabStyle} activeTabStyle={styles.activeTabStyle} activeTextStyle={styles.activeTextStyle} textStyle={styles.textStyle}>
              {this.DbsScreen()}
            </Tab>
            <Tab heading="DGS" tabStyle={styles.tabStyle} activeTabStyle={styles.activeTabStyle} activeTextStyle={styles.activeTextStyle} textStyle={styles.textStyle}>
              {this.DgsScreen()}
            </Tab>
          </Tabs>
        </View>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({

  //EBIS ALL DATA
  ebisWinREVENUE: state.MonitorEbisReducerKL.dataEbisWinSubs,
  ebisWinProject: state.MonitorEbisReducerKL.dataEbisWPSubs,

  ebisMonitorSubs: state.MonitorEbisReducerKL.dataEbisWinSubs,
  ebisMonitorWPSubs: state.MonitorEbisReducerKL.dataEbisWPSubs,
  ebisMonitorDoneSubs: state.MonitorEbisReducerKL.dataEbisDoneWinSubs,
  ebisMonitorDoneWPSubs: state.MonitorEbisReducerKL.dataEbisDoneWPSubs,
  ebisMonitorOgpSubs: state.MonitorEbisReducerKL.dataEbisOgpWinSubs,
  ebisMonitorOgpWPSubs: state.MonitorEbisReducerKL.dataEbisOgpWPSubs,

  dataEbisOgp3RevSubs: state.MonitorEbisReducerKL.dataOgp3RevSubs,
  dataEbisOgp3ProjectSubs: state.MonitorEbisReducerKL.dataOgp3ProjectSubs,
  dataEbisOgp6RevSubs: state.MonitorEbisReducerKL.dataOgp6RevSubs,
  dataEbisOgp6ProjectSubs: state.MonitorEbisReducerKL.dataOgp6ProjectSubs,
  dataEbisOgp7RevSubs: state.MonitorEbisReducerKL.dataOgp7RevSubs,
  dataEbisOgp7ProjectSubs: state.MonitorEbisReducerKL.dataOgp7ProjectSubs,

  ebisMonitorMitra: state.MonitorEbisReducerKL.dataEbisWinMitra,
  ebisMonitorWPMitra: state.MonitorEbisReducerKL.dataEbisWPMitra,
  ebisMonitorDoneMitra: state.MonitorEbisReducerKL.dataEbisDoneWinMitra,
  ebisMonitorDoneWPMitra: state.MonitorEbisReducerKL.dataEbisDoneWPMitra,
  ebisMonitorOgpMitra: state.MonitorEbisReducerKL.dataEbisOgpWinMitra,
  ebisMonitorOgpWPMitra: state.MonitorEbisReducerKL.dataEbisOgpWPMitra,

  dataEbisOgp3RevMitra: state.MonitorEbisReducerKL.dataOgp3RevMitra,
  dataEbisOgp3ProjectMitra: state.MonitorEbisReducerKL.dataOgp3ProjectMitra,
  dataEbisOgp6RevMitra: state.MonitorEbisReducerKL.dataOgp6RevMitra,
  dataEbisOgp6ProjectMitra: state.MonitorEbisReducerKL.dataOgp6ProjectMitra,
  dataEbisOgp7RevMitra: state.MonitorEbisReducerKL.dataOgp7RevMitra,
  dataEbisOgp7ProjectMitra: state.MonitorEbisReducerKL.dataOgp7ProjectMitra,


  //DES ALL DATA
  DesWinREVENUE: state.MonitorDesReducerKL.dataDesWinSubs,
  DesWinProject: state.MonitorDesReducerKL.dataDesWPSubs,

  DesMonitorSubs: state.MonitorDesReducerKL.dataDesWinSubs,
  DesMonitorWPSubs: state.MonitorDesReducerKL.dataDesWPSubs,
  DesMonitorDoneSubs: state.MonitorDesReducerKL.dataDesDoneWinSubs,
  DesMonitorDoneWPSubs: state.MonitorDesReducerKL.dataDesDoneWPSubs,
  DesMonitorOgpSubs: state.MonitorDesReducerKL.dataDesOgpWinSubs,
  DesMonitorOgpWPSubs: state.MonitorDesReducerKL.dataDesOgpWPSubs,

  dataDesOgp3RevSubs: state.MonitorDesReducerKL.dataOgp3RevSubs,
  dataDesOgp3ProjectSubs: state.MonitorDesReducerKL.dataOgp3ProjectSubs,
  dataDesOgp6RevSubs: state.MonitorDesReducerKL.dataOgp6RevSubs,
  dataDesOgp6ProjectSubs: state.MonitorDesReducerKL.dataOgp6ProjectSubs,
  dataDesOgp7RevSubs: state.MonitorDesReducerKL.dataOgp7RevSubs,
  dataDesOgp7ProjectSubs: state.MonitorDesReducerKL.dataOgp7ProjectSubs,


  DesMonitorMitra: state.MonitorDesReducerKL.dataDesWinMitra,
  DesMonitorWPMitra: state.MonitorDesReducerKL.dataDesWPMitra,
  DesMonitorDoneMitra: state.MonitorDesReducerKL.dataDesDoneWinMitra,
  DesMonitorDoneWPMitra: state.MonitorDesReducerKL.dataDesDoneWPMitra,
  DesMonitorOgpMitra: state.MonitorDesReducerKL.dataDesOgpWinMitra,
  DesMonitorOgpWPMitra: state.MonitorDesReducerKL.dataDesOgpWPMitra,

  dataDesOgp3RevMitra: state.MonitorDesReducerKL.dataOgp3RevMitra,
  dataDesOgp3ProjectMitra: state.MonitorDesReducerKL.dataOgp3ProjectMitra,
  dataDesOgp6RevMitra: state.MonitorDesReducerKL.dataOgp6RevMitra,
  dataDesOgp6ProjectMitra: state.MonitorDesReducerKL.dataOgp6ProjectMitra,
  dataDesOgp7RevMitra: state.MonitorDesReducerKL.dataOgp7RevMitra,
  dataDesOgp7ProjectMitra: state.MonitorDesReducerKL.dataOgp7ProjectMitra,


  //DBS ALL DATA
  DbsWinREVENUE: state.MonitorDbsReducerKL.dataDbsWinSubs,
  DbsWinProject: state.MonitorDbsReducerKL.dataDbsWPSubs,

  DbsMonitorSubs: state.MonitorDbsReducerKL.dataDbsWinSubs,
  DbsMonitorWPSubs: state.MonitorDbsReducerKL.dataDbsWPSubs,
  DbsMonitorDoneSubs: state.MonitorDbsReducerKL.dataDbsDoneWinSubs,
  DbsMonitorDoneWPSubs: state.MonitorDbsReducerKL.dataDbsDoneWPSubs,
  DbsMonitorOgpSubs: state.MonitorDbsReducerKL.dataDbsOgpWinSubs,
  DbsMonitorOgpWPSubs: state.MonitorDbsReducerKL.dataDbsOgpWPSubs,

  dataDbsOgp3RevSubs: state.MonitorDbsReducerKL.dataOgp3RevSubs,
  dataDbsOgp3ProjectSubs: state.MonitorDbsReducerKL.dataOgp3ProjectSubs,
  dataDbsOgp6RevSubs: state.MonitorDbsReducerKL.dataOgp6RevSubs,
  dataDbsOgp6ProjectSubs: state.MonitorDbsReducerKL.dataOgp6ProjectSubs,
  dataDbsOgp7RevSubs: state.MonitorDbsReducerKL.dataOgp7RevSubs,
  dataDbsOgp7ProjectSubs: state.MonitorDbsReducerKL.dataOgp7ProjectSubs,


  DbsMonitorMitra: state.MonitorDbsReducerKL.dataDbsWinMitra,
  DbsMonitorWPMitra: state.MonitorDbsReducerKL.dataDbsWPMitra,
  DbsMonitorDoneMitra: state.MonitorDbsReducerKL.dataDbsDoneWinMitra,
  DbsMonitorDoneWPMitra: state.MonitorDbsReducerKL.dataDbsDoneWPMitra,
  DbsMonitorOgpMitra: state.MonitorDbsReducerKL.dataDbsOgpWinMitra,
  DbsMonitorOgpWPMitra: state.MonitorDbsReducerKL.dataDbsOgpWPMitra,

  dataDbsOgp3RevMitra: state.MonitorDbsReducerKL.dataOgp3RevMitra,
  dataDbsOgp3ProjectMitra: state.MonitorDbsReducerKL.dataOgp3ProjectMitra,
  dataDbsOgp6RevMitra: state.MonitorDbsReducerKL.dataOgp6RevMitra,
  dataDbsOgp6ProjectMitra: state.MonitorDbsReducerKL.dataOgp6ProjectMitra,
  dataDbsOgp7RevMitra: state.MonitorDbsReducerKL.dataOgp7RevMitra,
  dataDbsOgp7ProjectMitra: state.MonitorDbsReducerKL.dataOgp7ProjectMitra,


  //DGS ALL DATA
  DgsWinREVENUE: state.MonitorDgsReducerKL.dataDgsWinSubs,
  DgsWinProject: state.MonitorDgsReducerKL.dataDgsWPSubs,

  DgsMonitorSubs: state.MonitorDgsReducerKL.dataDgsWinSubs,
  DgsMonitorWPSubs: state.MonitorDgsReducerKL.dataDgsWPSubs,
  DgsMonitorDoneSubs: state.MonitorDgsReducerKL.dataDgsDoneWinSubs,
  DgsMonitorDoneWPSubs: state.MonitorDgsReducerKL.dataDgsDoneWPSubs,
  DgsMonitorOgpSubs: state.MonitorDgsReducerKL.dataDgsOgpWinSubs,
  DgsMonitorOgpWPSubs: state.MonitorDgsReducerKL.dataDgsOgpWPSubs,

  dataDgsOgp3RevSubs: state.MonitorDgsReducerKL.dataOgp3RevSubs,
  dataDgsOgp3ProjectSubs: state.MonitorDgsReducerKL.dataOgp3ProjectSubs,
  dataDgsOgp6RevSubs: state.MonitorDgsReducerKL.dataOgp6RevSubs,
  dataDgsOgp6ProjectSubs: state.MonitorDgsReducerKL.dataOgp6ProjectSubs,
  dataDgsOgp7RevSubs: state.MonitorDgsReducerKL.dataOgp7RevSubs,
  dataDgsOgp7ProjectSubs: state.MonitorDgsReducerKL.dataOgp7ProjectSubs,


  DgsMonitorMitra: state.MonitorDgsReducerKL.dataDgsWinMitra,
  DgsMonitorWPMitra: state.MonitorDgsReducerKL.dataDgsWPMitra,
  DgsMonitorDoneMitra: state.MonitorDgsReducerKL.dataDgsDoneWinMitra,
  DgsMonitorDoneWPMitra: state.MonitorDgsReducerKL.dataDgsDoneWPMitra,
  DgsMonitorOgpMitra: state.MonitorDgsReducerKL.dataDgsOgpWinMitra,
  DgsMonitorOgpWPMitra: state.MonitorDgsReducerKL.dataDgsOgpWPMitra,

  dataDgsOgp3RevMitra: state.MonitorDgsReducerKL.dataOgp3RevMitra,
  dataDgsOgp3ProjectMitra: state.MonitorDgsReducerKL.dataOgp3ProjectMitra,
  dataDgsOgp6RevMitra: state.MonitorDgsReducerKL.dataOgp6RevMitra,
  dataDgsOgp6ProjectMitra: state.MonitorDgsReducerKL.dataOgp6ProjectMitra,
  dataDgsOgp7RevMitra: state.MonitorDgsReducerKL.dataOgp7RevMitra,
  dataDgsOgp7ProjectMitra: state.MonitorDgsReducerKL.dataOgp7ProjectMitra,


})

export default connect(mapStateToProps)(MonitorKL);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  //content style
  imageContent: {
    width: wp('13%'), height: '100%'
  },
  wrapperHeaderContent: {
    backgroundColor: '#FFF',
    marginTop: hp('2%'),
    backgroundColor: '#575F6A',
    flexDirection: 'row',
    width: wp('100%'),
    padding: hp('1%')
  },

  //tab style 
  wrapperTabs: {
    flex: 1,
    width: wp('100%'),
    height: hp('8%'),
    backgroundColor: '#D1D4D9',
    alignSelf: 'center',
    alignItems: 'center'
  },
  tabStyle: {
    backgroundColor: '#575F6A'
  },
  activeTabStyle: {
    backgroundColor: '#95a5a6',
  },
  activeTextStyle: {
    color: '#FFF'
  },
  textStyle: {
    color: '#FFF'
  },

  //style buat arrownya
  wrapperArrow: {
    flexDirection: 'row',
    marginTop: hp('2%')
  },
  imageStyle: {
    width: wp('9%'),
    height: hp('9%')
  },
  containerArrowProspect: {
    height: hp('9%'),
    width: wp('24%'),
    backgroundColor: '#ddc8df',
    justifyContent: 'center',
    alignItems: 'center'
  },
  containerArrowProspect2: {
    marginLeft: wp('.5'),
    marginRight: wp('.5'),
    height: hp('9%'),
    width: wp('13%'),
  },
  containerArrowSubmission: {
    height: hp('9%'),
    width: wp('24%'),
    backgroundColor: '#ecb889',
    justifyContent: 'center',
    alignItems: 'center'
  },
  wrapperPresentase: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignSelf: 'center',
    alignItems: 'center',
    width: wp('22%'),
  },
  wrapperTextPresentase: {
    justifyContent: 'center',
    alignSelf: 'center'
  },
  containerArrowSubmission2: {
    marginLeft: wp('.5'),
    marginRight: wp('.5'),
    height: hp('9%'),
    width: wp('13%'),
  },
  containerArrowWin: {
    height: hp('9%'),
    width: wp('24%'),
    backgroundColor: '#c7eecc',
    justifyContent: 'center',
    alignItems: 'center'
  },
  containerArrowWin2: {
    height: hp('9%'),
    width: wp('24%'),
    backgroundColor: '#dfdfdd',
    justifyContent: 'center',
    alignItems: 'center'
  },
  containerArrowBill: {
    height: hp('9%'),
    width: wp('24%'),
    backgroundColor: '#a9c1fb',
    justifyContent: 'center',
    alignItems: 'center'
  },
  containerArrowBill2: {
    marginLeft: wp('.5'),
    marginRight: wp('.5'),
    height: hp('9%'),
    width: wp('13%'),
  },
  textJudul: {
    fontWeight: 'bold',
    fontSize: 13
  },
  textIsi: {
    fontWeight: '700',
    fontSize: 11
  },
  textKeterangan: {
    fontSize: 9,
    fontWeight: '500',
  },

  //column 4 deskripsi
  judulColumn: {
    backgroundColor: '#670063'
  },
  isiColumn: {
    height: hp('7%'),
    backgroundColor: '#ddc8df',
    justifyContent: 'center',
    alignItems: 'center'
  },
  judulColumn2: {
    backgroundColor: '#D95C00'
  },
  isiColumn2: {
    height: hp('7%'),
    backgroundColor: '#ecb889',
    justifyContent: 'center',
    alignItems: 'center'
  },
  judulColumn3: {
    backgroundColor: '#00A440'
  },
  isiColumn3: {
    height: hp('7%'),
    backgroundColor: '#c7eecc',
    justifyContent: 'center',
    alignItems: 'center'
  },
  judulColumn4: {
    backgroundColor: '#4C6BA7'
  },
  isiColumn4: {
    height: hp('7%'),
    backgroundColor: '#a9c1fb',
    justifyContent: 'center',
    alignItems: 'center'
  },
  textJudulColumn: {
    fontWeight: 'bold',
    color: '#FFF',
    fontSize: 12,
    textAlign: 'center'
  },
  textIsiColumn: {
    fontWeight: '700',
    fontSize: 10,
    textAlign: 'center'
  },

  //detail 
  containerDetailData: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    borderBottomColor: '#000',
    borderBottomWidth: 1,
    padding: hp('2%')
  },
  modalContent: {
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    borderColor: "rgba(0, 0, 0, 0.1)"
  },
  buttonTab: {
    marginTop: hp('2%'),
    flexDirection: 'row',
    paddingLeft: hp('1%'),
    paddingRight: hp('1%'),
    justifyContent: 'space-between'
  },
  buttonTabStyle: {
    padding: hp('1%'),
    backgroundColor: '#dfdfdd'
  }
});
