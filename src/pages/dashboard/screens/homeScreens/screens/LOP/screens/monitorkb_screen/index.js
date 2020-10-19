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

class MonitorKB extends Component {
  constructor(props) {
    super(props);
    this.state = {

      treg: this.props.navigation.state.params.treg,
      witel: this.props.navigation.state.params.witel,
      startdate: this.props.navigation.state.params.start_date,
      enddate: this.props.navigation.state.params.end_date,   

      //modal
      visibleModal: false,
      loaderTampilDetail: false,
      dataTampung: [],
      dataEbis: [],
      data: [],
      selected: '',
      statusAll: false,
      statusSubs: true,
      statusMitra: true,
      statusTelkom: true,
    }
  }

  componentWillMount(){

    //MonitorKB
    //EBIS
    this.props.dispatch({
      type: 'MONITOR_KB_EBIS',
      payload: RNFetchBlob.config({
        trusty:true
      }). fetch('GET', `${url.API}/ebis_getwinsum/div/EBIS/treg/${this.state.treg}/witel/${this.state.witel}/startdate/${this.state.startdate}/enddate/${this.state.enddate}/type/KB/nmitra/ALL`)
    })
    this.props.dispatch({
      type: 'MONITOR_KB_EBIS_SUBS',
      payload: RNFetchBlob.config({
        trusty:true
      }). fetch('GET', `${url.API}/ebis_getwinsum/div/EBIS/treg/${this.state.treg}/witel/${this.state.witel}/startdate/${this.state.startdate}/enddate/${this.state.enddate}/type/KB/nmitra/CFU`)
    })
    this.props.dispatch({
      type: 'MONITOR_KB_EBIS_MITRA',
      payload: RNFetchBlob.config({
        trusty:true
      }). fetch('GET', `${url.API}/ebis_getwinsum/div/EBIS/treg/${this.state.treg}/witel/${this.state.witel}/startdate/${this.state.startdate}/enddate/${this.state.enddate}/type/KB/nmitra/MITRA`)
    })
    this.props.dispatch({
      type: 'MONITOR_KB_EBIS_TELKOM',
      payload: RNFetchBlob.config({
        trusty:true
      }). fetch('GET', `${url.API}/ebis_getwinsum/div/EBIS/treg/${this.state.treg}/witel/${this.state.witel}/startdate/${this.state.startdate}/enddate/${this.state.enddate}/type/KB/nmitra/TELKOM`)
    })

    //EBIS DONE
    this.props.dispatch({
      type: 'MONITOR_KB_EBIS_DONE',
      payload: RNFetchBlob.config({
        trusty:true
      }). fetch('GET', `${url.API}/ebis_getKBstatesum/div/EBIS/treg/${this.state.treg}/witel/${this.state.witel}/startdate/${this.state.startdate}/enddate/${this.state.enddate}/state/DONE/nmitra/ALL`)
    })
    this.props.dispatch({
      type: 'MONITOR_KB_EBIS_DONE_SUBS',
      payload: RNFetchBlob.config({
        trusty:true
      }). fetch('GET', `${url.API}/ebis_getKBstatesum/div/EBIS/treg/${this.state.treg}/witel/${this.state.witel}/startdate/${this.state.startdate}/enddate/${this.state.enddate}/state/DONE/nmitra/CFU`)
    })
    this.props.dispatch({
      type: 'MONITOR_KB_EBIS_DONE_MITRA',
      payload: RNFetchBlob.config({
        trusty:true
      }). fetch('GET', `${url.API}/ebis_getKBstatesum/div/EBIS/treg/${this.state.treg}/witel/${this.state.witel}/startdate/${this.state.startdate}/enddate/${this.state.enddate}/state/DONE/nmitra/MITRA`)
    })
    this.props.dispatch({
      type: 'MONITOR_KB_EBIS_DONE_TELKOM',
      payload: RNFetchBlob.config({
        trusty:true
      }). fetch('GET', `${url.API}/ebis_getKBstatesum/div/EBIS/treg/${this.state.treg}/witel/${this.state.witel}/startdate/${this.state.startdate}/enddate/${this.state.enddate}/state/DONE/nmitra/TELKOM`)
    })
    
    //EBIS OGP
    this.props.dispatch({
      type: 'MONITOR_KB_EBIS_OGP',
      payload: RNFetchBlob.config({
        trusty:true
      }). fetch('GET', `${url.API}/ebis_getKBstatesum/div/EBIS/treg/${this.state.treg}/witel/${this.state.witel}/startdate/${this.state.startdate}/enddate/${this.state.enddate}/state/OGP/nmitra/ALL`)
    })
    this.props.dispatch({
      type: 'MONITOR_KB_EBIS_OGP_SUBS',
      payload: RNFetchBlob.config({
        trusty:true
      }). fetch('GET', `${url.API}/ebis_getKBstatesum/div/EBIS/treg/${this.state.treg}/witel/${this.state.witel}/startdate/${this.state.startdate}/enddate/${this.state.enddate}/state/OGP/nmitra/CFU`)
    })
    this.props.dispatch({
      type: 'MONITOR_KB_EBIS_OGP_MITRA',
      payload: RNFetchBlob.config({
        trusty:true
      }). fetch('GET', `${url.API}/ebis_getKBstatesum/div/EBIS/treg/${this.state.treg}/witel/${this.state.witel}/startdate/${this.state.startdate}/enddate/${this.state.enddate}/state/OGP/nmitra/MITRA`)
    })
    this.props.dispatch({
      type: 'MONITOR_KB_EBIS_OGP_TELKOM',
      payload: RNFetchBlob.config({
        trusty:true
      }). fetch('GET', `${url.API}/ebis_getKBstatesum/div/EBIS/treg/${this.state.treg}/witel/${this.state.witel}/startdate/${this.state.startdate}/enddate/${this.state.enddate}/state/OGP/nmitra/TELKOM`)
    })

    //EBIS OGP DATA
    this.props.dispatch({
      type: 'MONITOR_KB_EBIS_OGP_DATA',
      payload: RNFetchBlob.config({
        trusty:true
      }). fetch('GET', `${url.API}/ebis_getkbsumperiod/div/EBIS/treg/${this.state.treg}/witel/${this.state.witel}/startdate/${this.state.startdate}/enddate/${this.state.enddate}/state/OGP/nmitra/ALL`)
    })
    this.props.dispatch({
      type: 'MONITOR_KB_EBIS_OGP_DATA_SUBS',
      payload: RNFetchBlob.config({
        trusty:true
      }). fetch('GET', `${url.API}/ebis_getkbsumperiod/div/EBIS/treg/${this.state.treg}/witel/${this.state.witel}/startdate/${this.state.startdate}/enddate/${this.state.enddate}/state/OGP/nmitra/CFU`)
    })
    this.props.dispatch({
      type: 'MONITOR_KB_EBIS_OGP_DATA_MITRA',
      payload: RNFetchBlob.config({
        trusty:true
      }). fetch('GET', `${url.API}/ebis_getkbsumperiod/div/EBIS/treg/${this.state.treg}/witel/${this.state.witel}/startdate/${this.state.startdate}/enddate/${this.state.enddate}/state/OGP/nmitra/MITRA`)
    })
    this.props.dispatch({
      type: 'MONITOR_KB_EBIS_OGP_DATA_TELKOM',
      payload: RNFetchBlob.config({
        trusty:true
      }). fetch('GET', `${url.API}/ebis_getkbsumperiod/div/EBIS/treg/${this.state.treg}/witel/${this.state.witel}/startdate/${this.state.startdate}/enddate/${this.state.enddate}/state/OGP/nmitra/TELKOM`)
    })

    //DES
    this.props.dispatch({
      type: 'MONITOR_KB_DES',
      payload: RNFetchBlob.config({
        trusty:true
      }). fetch('GET', `${url.API}/ebis_getwinsum/div/DES/treg/${this.state.treg}/witel/${this.state.witel}/startdate/${this.state.startdate}/enddate/${this.state.enddate}/type/KB/nmitra/ALL`)
    })
    this.props.dispatch({
      type: 'MONITOR_KB_DES_SUBS',
      payload: RNFetchBlob.config({
        trusty:true
      }). fetch('GET', `${url.API}/ebis_getwinsum/div/DES/treg/${this.state.treg}/witel/${this.state.witel}/startdate/${this.state.startdate}/enddate/${this.state.enddate}/type/KB/nmitra/CFU`)
    })
    this.props.dispatch({
      type: 'MONITOR_KB_DES_MITRA',
      payload: RNFetchBlob.config({
        trusty:true
      }). fetch('GET', `${url.API}/ebis_getwinsum/div/DES/treg/${this.state.treg}/witel/${this.state.witel}/startdate/${this.state.startdate}/enddate/${this.state.enddate}/type/KB/nmitra/MITRA`)
    })
    this.props.dispatch({
      type: 'MONITOR_KB_DES_TELKOM',
      payload: RNFetchBlob.config({
        trusty:true
      }). fetch('GET', `${url.API}/ebis_getwinsum/div/DES/treg/${this.state.treg}/witel/${this.state.witel}/startdate/${this.state.startdate}/enddate/${this.state.enddate}/type/KB/nmitra/TELKOM`)
    })

    //DES DONE
    this.props.dispatch({
      type: 'MONITOR_KB_DES_DONE',
      payload: RNFetchBlob.config({
        trusty:true
      }). fetch('GET', `${url.API}/ebis_getKBstatesum/div/DES/treg/${this.state.treg}/witel/${this.state.witel}/startdate/${this.state.startdate}/enddate/${this.state.enddate}/state/DONE/nmitra/ALL`)
    })
    this.props.dispatch({
      type: 'MONITOR_KB_DES_DONE_SUBS',
      payload: RNFetchBlob.config({
        trusty:true
      }). fetch('GET', `${url.API}/ebis_getKBstatesum/div/DES/treg/${this.state.treg}/witel/${this.state.witel}/startdate/${this.state.startdate}/enddate/${this.state.enddate}/state/DONE/nmitra/CFU`)
    })
    this.props.dispatch({
      type: 'MONITOR_KB_DES_DONE_MITRA',
      payload: RNFetchBlob.config({
        trusty:true
      }). fetch('GET', `${url.API}/ebis_getKBstatesum/div/DES/treg/${this.state.treg}/witel/${this.state.witel}/startdate/${this.state.startdate}/enddate/${this.state.enddate}/state/DONE/nmitra/MITRA`)
    })
    this.props.dispatch({
      type: 'MONITOR_KB_DES_DONE_TELKOM',
      payload: RNFetchBlob.config({
        trusty:true
      }). fetch('GET', `${url.API}/ebis_getKBstatesum/div/DES/treg/${this.state.treg}/witel/${this.state.witel}/startdate/${this.state.startdate}/enddate/${this.state.enddate}/state/DONE/nmitra/TELKOM`)
    })
    
    //DES OGP
    this.props.dispatch({
      type: 'MONITOR_KB_DES_OGP',
      payload: RNFetchBlob.config({
        trusty:true
      }). fetch('GET', `${url.API}/ebis_getKBstatesum/div/DES/treg/${this.state.treg}/witel/${this.state.witel}/startdate/${this.state.startdate}/enddate/${this.state.enddate}/state/OGP/nmitra/ALL`)
    })
    this.props.dispatch({
      type: 'MONITOR_KB_DES_OGP_SUBS',
      payload: RNFetchBlob.config({
        trusty:true
      }). fetch('GET', `${url.API}/ebis_getKBstatesum/div/DES/treg/${this.state.treg}/witel/${this.state.witel}/startdate/${this.state.startdate}/enddate/${this.state.enddate}/state/OGP/nmitra/CFU`)
    })
    this.props.dispatch({
      type: 'MONITOR_KB_DES_OGP_MITRA',
      payload: RNFetchBlob.config({
        trusty:true
      }). fetch('GET', `${url.API}/ebis_getKBstatesum/div/DES/treg/${this.state.treg}/witel/${this.state.witel}/startdate/${this.state.startdate}/enddate/${this.state.enddate}/state/OGP/nmitra/MITRA`)
    })
    this.props.dispatch({
      type: 'MONITOR_KB_DES_OGP_TELKOM',
      payload: RNFetchBlob.config({
        trusty:true
      }). fetch('GET', `${url.API}/ebis_getKBstatesum/div/DES/treg/${this.state.treg}/witel/${this.state.witel}/startdate/${this.state.startdate}/enddate/${this.state.enddate}/state/OGP/nmitra/TELKOM`)
    })

    //DES OGP DATA
    this.props.dispatch({
      type: 'MONITOR_KB_DES_OGP_DATA',
      payload: RNFetchBlob.config({
        trusty:true
      }). fetch('GET', `${url.API}/ebis_getkbsumperiod/div/DES/treg/${this.state.treg}/witel/${this.state.witel}/startdate/${this.state.startdate}/enddate/${this.state.enddate}/state/OGP/nmitra/ALL`)
    })
    this.props.dispatch({
      type: 'MONITOR_KB_DES_OGP_DATA_SUBS',
      payload: RNFetchBlob.config({
        trusty:true
      }). fetch('GET', `${url.API}/ebis_getkbsumperiod/div/DES/treg/${this.state.treg}/witel/${this.state.witel}/startdate/${this.state.startdate}/enddate/${this.state.enddate}/state/OGP/nmitra/CFU`)
    })
    this.props.dispatch({
      type: 'MONITOR_KB_DES_OGP_DATA_MITRA',
      payload: RNFetchBlob.config({
        trusty:true
      }). fetch('GET', `${url.API}/ebis_getkbsumperiod/div/DES/treg/${this.state.treg}/witel/${this.state.witel}/startdate/${this.state.startdate}/enddate/${this.state.enddate}/state/OGP/nmitra/MITRA`)
    })
    this.props.dispatch({
      type: 'MONITOR_KB_DES_OGP_DATA_TELKOM',
      payload: RNFetchBlob.config({
        trusty:true
      }). fetch('GET', `${url.API}/ebis_getkbsumperiod/div/DES/treg/${this.state.treg}/witel/${this.state.witel}/startdate/${this.state.startdate}/enddate/${this.state.enddate}/state/OGP/nmitra/TELKOM`)
    })

    //DBS
    this.props.dispatch({
      type: 'MONITOR_KB_DBS',
      payload: RNFetchBlob.config({
        trusty:true
      }). fetch('GET', `${url.API}/ebis_getwinsum/div/DBS/treg/${this.state.treg}/witel/${this.state.witel}/startdate/${this.state.startdate}/enddate/${this.state.enddate}/type/KB/nmitra/ALL`)
    })
    this.props.dispatch({
      type: 'MONITOR_KB_DBS_SUBS',
      payload: RNFetchBlob.config({
        trusty:true
      }). fetch('GET', `${url.API}/ebis_getwinsum/div/DBS/treg/${this.state.treg}/witel/${this.state.witel}/startdate/${this.state.startdate}/enddate/${this.state.enddate}/type/KB/nmitra/CFU`)
    })
    this.props.dispatch({
      type: 'MONITOR_KB_DBS_MITRA',
      payload: RNFetchBlob.config({
        trusty:true
      }). fetch('GET', `${url.API}/ebis_getwinsum/div/DBS/treg/${this.state.treg}/witel/${this.state.witel}/startdate/${this.state.startdate}/enddate/${this.state.enddate}/type/KB/nmitra/MITRA`)
    })
    this.props.dispatch({
      type: 'MONITOR_KB_DBS_TELKOM',
      payload: RNFetchBlob.config({
        trusty:true
      }). fetch('GET', `${url.API}/ebis_getwinsum/div/DBS/treg/${this.state.treg}/witel/${this.state.witel}/startdate/${this.state.startdate}/enddate/${this.state.enddate}/type/KB/nmitra/TELKOM`)
    })

    //DBS DONE
    this.props.dispatch({
      type: 'MONITOR_KB_DBS_DONE',
      payload: RNFetchBlob.config({
        trusty:true
      }). fetch('GET', `${url.API}/ebis_getKBstatesum/div/DBS/treg/${this.state.treg}/witel/${this.state.witel}/startdate/${this.state.startdate}/enddate/${this.state.enddate}/state/DONE/nmitra/ALL`)
    })
    this.props.dispatch({
      type: 'MONITOR_KB_DBS_DONE_SUBS',
      payload: RNFetchBlob.config({
        trusty:true
      }). fetch('GET', `${url.API}/ebis_getKBstatesum/div/DBS/treg/${this.state.treg}/witel/${this.state.witel}/startdate/${this.state.startdate}/enddate/${this.state.enddate}/state/DONE/nmitra/CFU`)
    })
    this.props.dispatch({
      type: 'MONITOR_KB_DBS_DONE_MITRA',
      payload: RNFetchBlob.config({
        trusty:true
      }). fetch('GET', `${url.API}/ebis_getKBstatesum/div/DBS/treg/${this.state.treg}/witel/${this.state.witel}/startdate/${this.state.startdate}/enddate/${this.state.enddate}/state/DONE/nmitra/MITRA`)
    })
    this.props.dispatch({
      type: 'MONITOR_KB_DBS_DONE_TELKOM',
      payload: RNFetchBlob.config({
        trusty:true
      }). fetch('GET', `${url.API}/ebis_getKBstatesum/div/DBS/treg/${this.state.treg}/witel/${this.state.witel}/startdate/${this.state.startdate}/enddate/${this.state.enddate}/state/DONE/nmitra/TELKOM`)
    })
    
    //DBS OGP
    this.props.dispatch({
      type: 'MONITOR_KB_DBS_OGP',
      payload: RNFetchBlob.config({
        trusty:true
      }). fetch('GET', `${url.API}/ebis_getKBstatesum/div/DBS/treg/${this.state.treg}/witel/${this.state.witel}/startdate/${this.state.startdate}/enddate/${this.state.enddate}/state/OGP/nmitra/ALL`)
    })
    this.props.dispatch({
      type: 'MONITOR_KB_DBS_OGP_SUBS',
      payload: RNFetchBlob.config({
        trusty:true
      }). fetch('GET', `${url.API}/ebis_getKBstatesum/div/DBS/treg/${this.state.treg}/witel/${this.state.witel}/startdate/${this.state.startdate}/enddate/${this.state.enddate}/state/OGP/nmitra/CFU`)
    })
    this.props.dispatch({
      type: 'MONITOR_KB_DBS_OGP_MITRA',
      payload: RNFetchBlob.config({
        trusty:true
      }). fetch('GET', `${url.API}/ebis_getKBstatesum/div/DBS/treg/${this.state.treg}/witel/${this.state.witel}/startdate/${this.state.startdate}/enddate/${this.state.enddate}/state/OGP/nmitra/MITRA`)
    })
    this.props.dispatch({
      type: 'MONITOR_KB_DBS_OGP_TELKOM',
      payload: RNFetchBlob.config({
        trusty:true
      }). fetch('GET', `${url.API}/ebis_getKBstatesum/div/DBS/treg/${this.state.treg}/witel/${this.state.witel}/startdate/${this.state.startdate}/enddate/${this.state.enddate}/state/OGP/nmitra/TELKOM`)
    })

    //DBS OGP DATA
    this.props.dispatch({
      type: 'MONITOR_KB_DBS_OGP_DATA',
      payload: RNFetchBlob.config({
        trusty:true
      }). fetch('GET', `${url.API}/ebis_getkbsumperiod/div/DBS/treg/${this.state.treg}/witel/${this.state.witel}/startdate/${this.state.startdate}/enddate/${this.state.enddate}/state/OGP/nmitra/ALL`)
    })
    this.props.dispatch({
      type: 'MONITOR_KB_DBS_OGP_DATA_SUBS',
      payload: RNFetchBlob.config({
        trusty:true
      }). fetch('GET', `${url.API}/ebis_getkbsumperiod/div/DBS/treg/${this.state.treg}/witel/${this.state.witel}/startdate/${this.state.startdate}/enddate/${this.state.enddate}/state/OGP/nmitra/CFU`)
    })
    this.props.dispatch({
      type: 'MONITOR_KB_DBS_OGP_DATA_MITRA',
      payload: RNFetchBlob.config({
        trusty:true
      }). fetch('GET', `${url.API}/ebis_getkbsumperiod/div/DBS/treg/${this.state.treg}/witel/${this.state.witel}/startdate/${this.state.startdate}/enddate/${this.state.enddate}/state/OGP/nmitra/MITRA`)
    })
    this.props.dispatch({
      type: 'MONITOR_KB_DBS_OGP_DATA_TELKOM',
      payload: RNFetchBlob.config({
        trusty:true
      }). fetch('GET', `${url.API}/ebis_getkbsumperiod/div/DBS/treg/${this.state.treg}/witel/${this.state.witel}/startdate/${this.state.startdate}/enddate/${this.state.enddate}/state/OGP/nmitra/TELKOM`)
    })

    //DGS
    this.props.dispatch({
      type: 'MONITOR_KB_DGS',
      payload: RNFetchBlob.config({
        trusty:true
      }). fetch('GET', `${url.API}/ebis_getwinsum/div/DGS/treg/${this.state.treg}/witel/${this.state.witel}/startdate/${this.state.startdate}/enddate/${this.state.enddate}/type/KB/nmitra/ALL`)
    })
    this.props.dispatch({
      type: 'MONITOR_KB_DGS_SUBS',
      payload: RNFetchBlob.config({
        trusty:true
      }). fetch('GET', `${url.API}/ebis_getwinsum/div/DGS/treg/${this.state.treg}/witel/${this.state.witel}/startdate/${this.state.startdate}/enddate/${this.state.enddate}/type/KB/nmitra/CFU`)
    })
    this.props.dispatch({
      type: 'MONITOR_KB_DGS_MITRA',
      payload: RNFetchBlob.config({
        trusty:true
      }). fetch('GET', `${url.API}/ebis_getwinsum/div/DGS/treg/${this.state.treg}/witel/${this.state.witel}/startdate/${this.state.startdate}/enddate/${this.state.enddate}/type/KB/nmitra/MITRA`)
    })
    this.props.dispatch({
      type: 'MONITOR_KB_DGS_TELKOM',
      payload: RNFetchBlob.config({
        trusty:true
      }). fetch('GET', `${url.API}/ebis_getwinsum/div/DGS/treg/${this.state.treg}/witel/${this.state.witel}/startdate/${this.state.startdate}/enddate/${this.state.enddate}/type/KB/nmitra/TELKOM`)
    })

    //DGS DONE
    this.props.dispatch({
      type: 'MONITOR_KB_DGS_DONE',
      payload: RNFetchBlob.config({
        trusty:true
      }). fetch('GET', `${url.API}/ebis_getKBstatesum/div/DGS/treg/${this.state.treg}/witel/${this.state.witel}/startdate/${this.state.startdate}/enddate/${this.state.enddate}/state/DONE/nmitra/ALL`)
    })
    this.props.dispatch({
      type: 'MONITOR_KB_DGS_DONE_SUBS',
      payload: RNFetchBlob.config({
        trusty:true
      }). fetch('GET', `${url.API}/ebis_getKBstatesum/div/DGS/treg/${this.state.treg}/witel/${this.state.witel}/startdate/${this.state.startdate}/enddate/${this.state.enddate}/state/DONE/nmitra/CFU`)
    })
    this.props.dispatch({
      type: 'MONITOR_KB_DGS_DONE_MITRA',
      payload: RNFetchBlob.config({
        trusty:true
      }). fetch('GET', `${url.API}/ebis_getKBstatesum/div/DGS/treg/${this.state.treg}/witel/${this.state.witel}/startdate/${this.state.startdate}/enddate/${this.state.enddate}/state/DONE/nmitra/MITRA`)
    })
    this.props.dispatch({
      type: 'MONITOR_KB_DGS_DONE_TELKOM',
      payload: RNFetchBlob.config({
        trusty:true
      }). fetch('GET', `${url.API}/ebis_getKBstatesum/div/DGS/treg/${this.state.treg}/witel/${this.state.witel}/startdate/${this.state.startdate}/enddate/${this.state.enddate}/state/DONE/nmitra/TELKOM`)
    })
    
    //DGS OGP
    this.props.dispatch({
      type: 'MONITOR_KB_DGS_OGP',
      payload: RNFetchBlob.config({
        trusty:true
      }). fetch('GET', `${url.API}/ebis_getKBstatesum/div/DGS/treg/${this.state.treg}/witel/${this.state.witel}/startdate/${this.state.startdate}/enddate/${this.state.enddate}/state/OGP/nmitra/ALL`)
    })
    this.props.dispatch({
      type: 'MONITOR_KB_DGS_OGP_SUBS',
      payload: RNFetchBlob.config({
        trusty:true
      }). fetch('GET', `${url.API}/ebis_getKBstatesum/div/DGS/treg/${this.state.treg}/witel/${this.state.witel}/startdate/${this.state.startdate}/enddate/${this.state.enddate}/state/OGP/nmitra/CFU`)
    })
    this.props.dispatch({
      type: 'MONITOR_KB_DGS_OGP_MITRA',
      payload: RNFetchBlob.config({
        trusty:true
      }). fetch('GET', `${url.API}/ebis_getKBstatesum/div/DGS/treg/${this.state.treg}/witel/${this.state.witel}/startdate/${this.state.startdate}/enddate/${this.state.enddate}/state/OGP/nmitra/MITRA`)
    })
    this.props.dispatch({
      type: 'MONITOR_KB_DGS_OGP_TELKOM',
      payload: RNFetchBlob.config({
        trusty:true
      }). fetch('GET', `${url.API}/ebis_getKBstatesum/div/DGS/treg/${this.state.treg}/witel/${this.state.witel}/startdate/${this.state.startdate}/enddate/${this.state.enddate}/state/OGP/nmitra/TELKOM`)
    })

    //DGS OGP DATA
    this.props.dispatch({
      type: 'MONITOR_KB_DGS_OGP_DATA',
      payload: RNFetchBlob.config({
        trusty:true
      }). fetch('GET', `${url.API}/ebis_getkbsumperiod/div/DGS/treg/${this.state.treg}/witel/${this.state.witel}/startdate/${this.state.startdate}/enddate/${this.state.enddate}/state/OGP/nmitra/ALL`)
    })
    this.props.dispatch({
      type: 'MONITOR_KB_DGS_OGP_DATA_SUBS',
      payload: RNFetchBlob.config({
        trusty:true
      }). fetch('GET', `${url.API}/ebis_getkbsumperiod/div/DGS/treg/${this.state.treg}/witel/${this.state.witel}/startdate/${this.state.startdate}/enddate/${this.state.enddate}/state/OGP/nmitra/CFU`)
    })
    this.props.dispatch({
      type: 'MONITOR_KB_DGS_OGP_DATA_MITRA',
      payload: RNFetchBlob.config({
        trusty:true
      }). fetch('GET', `${url.API}/ebis_getkbsumperiod/div/DGS/treg/${this.state.treg}/witel/${this.state.witel}/startdate/${this.state.startdate}/enddate/${this.state.enddate}/state/OGP/nmitra/MITRA`)
    })
    this.props.dispatch({
      type: 'MONITOR_KB_DGS_OGP_DATA_TELKOM',
      payload: RNFetchBlob.config({
        trusty:true
      }). fetch('GET', `${url.API}/ebis_getkbsumperiod/div/DGS/treg/${this.state.treg}/witel/${this.state.witel}/startdate/${this.state.startdate}/enddate/${this.state.enddate}/state/OGP/nmitra/TELKOM`)
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

    const { treg,witel, statusAll, statusSubs, statusMitra, statusTelkom, dataEbis } = this.state;

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

          <TouchableOpacity onPress={() => this.buttonAll()} style={styles.containerArrowSubmission2}>
            {statusAll === false
              ?
              <Image
                source={images.allImage.allAktif}
                style={styles.imageContent}
                resizeMode={'stretch'}
              />
              :
              <Image
                source={images.allImage.allNon}
                style={styles.imageContent}
                resizeMode={'stretch'}
              />
            }
          </TouchableOpacity>
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
          <TouchableOpacity onPress={() => this.buttonTelkom()} style={styles.containerArrowSubmission2}>
            {statusTelkom === false
              ?
              <Image
                source={images.telkomImage.telkomAktif}
                style={styles.imageContent}
                resizeMode={'stretch'}
              />
              :
              <Image
                source={images.telkomImage.telkomNon}
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

          {renderIf(!statusAll)(
            <View style={{ margin: hp('2%') }}>
              <View style={styles.wrapperArrow}>
                <Image
                  source={images.Win.arrowWin1}
                  style={styles.imageStyle}
                  resizeMode={'stretch'}
                />

                <View style={styles.containerArrowWin}>
                  <Text style={styles.textJudul}>WIN</Text>
                  <Text style={styles.textIsi}>{ebisMonitor}M</Text>
                  <Text style={styles.textKeterangan}>per {ebisMonitorWP} Project</Text>
                </View>

                <Image
                  source={images.Win.arrowWin3}
                  style={styles.imageStyle}
                  resizeMode={'stretch'}
                />

                <TouchableOpacity style={styles.containerArrowWin2} onPress={() => navigation.navigate('DetailMonitorDone',{treg:this.state.treg,witel:this.state.witel,start_date:this.state.startdate,end_date:this.state.enddate,status:'A'})}>
                  <Text style={styles.textJudul}>Done KB</Text>
                  <Text style={styles.textIsi}>{ebisMonitorDone}M</Text>
                  <Text style={styles.textKeterangan}>per {ebisMonitorDoneWP} Project</Text>
                </TouchableOpacity>

                <Image
                  source={images.arrowGrey}
                  style={styles.imageStyle}
                  resizeMode={'stretch'}
                />

                <View style={styles.wrapperPresentase}>
                  <View style={styles.wrapperTextPresentase}>
                    <Text style={styles.textJudul}>{this.getNum(newValueDone)}%</Text>
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
                  <Text style={styles.textIsi}>{ebisMonitor}M</Text>
                  <Text style={styles.textKeterangan}>per {ebisMonitorWP} Project</Text>
                </View>

                <Image
                  source={images.Win.arrowWin3}
                  style={styles.imageStyle}
                  resizeMode={'stretch'}
                />

                <TouchableOpacity style={styles.containerArrowWin2} onPress={() => navigation.navigate('DetailMonitorOgp',{treg:this.state.treg,witel:this.state.witel,start_date:this.state.startdate,end_date:this.state.enddate,status:'A'})}>
                  <Text style={styles.textJudul}>OGP KB</Text>
                  <Text style={styles.textIsi}>{ebisMonitorOgp}M</Text>
                  <Text style={styles.textKeterangan}>per {ebisMonitorOgpWP} Project</Text>
                </TouchableOpacity>

                <Image
                  source={images.arrowGrey}
                  style={styles.imageStyle}
                  resizeMode={'stretch'}
                />

                <View style={styles.wrapperPresentase}>
                  <View style={styles.wrapperTextPresentase}>
                    <Text style={styles.textJudul}>{this.getNum(newValueOgp)}%</Text>
                  </View>
                </View>
              </View>

              <View style={{ flexDirection: 'row', margin: hp('2%'), justifyContent: 'space-between' }}>
                <View style={{ marginBottom: hp('2%') }}>
                  <Text style={[styles.textJudul, { marginBottom: 20, alignItems: 'center' }]}>Progress OGP KB &#60; 3 Hari</Text>
                </View>

                <TouchableOpacity style={styles.containerArrowWin2} onPress={() => navigation.navigate('DetailMonitorProgressOgp3',{treg:this.state.treg,witel:this.state.witel,start_date:this.state.startdate,end_date:this.state.enddate,status:'A'})}>
                <View>
                  <Text style={styles.textIsi}>{dataEbisOgp3Rev}M</Text>
                  <Text style={styles.textKeterangan}>per {dataEbisOgp3Project} Project</Text>
                </View>
                </TouchableOpacity>

              </View>

              <View style={{ flexDirection: 'row', margin: hp('2%'), justifyContent: 'space-between' }}>
                <View style={{ marginBottom: hp('2%') }}>
                  <Text style={[styles.textJudul, { marginBottom: 20, alignItems: 'center' }]}>3 Hari &#60; OGP &#60; 7 Hari</Text>
                </View>

                <TouchableOpacity style={styles.containerArrowWin2} onPress={() => navigation.navigate('DetailMonitorProgressOgp6',{treg:this.state.treg,witel:this.state.witel,start_date:this.state.startdate,end_date:this.state.enddate,status:'A'})}>
                <View>
                  <Text style={styles.textIsi}>{dataEbisOgp6Rev}M</Text>
                  <Text style={styles.textKeterangan}>per {dataEbisOgp6Project} Project</Text>
                </View>
                </TouchableOpacity>
              </View>

              <View style={{ flexDirection: 'row', margin: hp('2%'), justifyContent: 'space-between' }}>
                <View style={{ marginBottom: hp('2%') }}>
                  <Text style={[styles.textJudul, { marginBottom: 20, alignItems: 'center' }]}>Progress OGP KB &#62; 7 Hari</Text>
                </View>

                <TouchableOpacity style={styles.containerArrowWin2} onPress={() => navigation.navigate('DetailMonitorProgressOgp7',{treg:this.state.treg,witel:this.state.witel,start_date:this.state.startdate,end_date:this.state.enddate,status:'A'})}>
                <View>
                  <Text style={styles.textIsi}>{dataEbisOgp7Rev}M</Text>
                  <Text style={styles.textKeterangan}>per {dataEbisOgp7Project} Project</Text>
                </View>
                </TouchableOpacity>
              </View>
            </View>
          )}

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

                <TouchableOpacity style={styles.containerArrowWin2} onPress={() => navigation.navigate('DetailMonitorDone',{treg:this.state.treg,witel:this.state.witel,start_date:this.state.startdate,end_date:this.state.enddate,status:'S'})}>
                  <Text style={styles.textJudul}>Done KB</Text>
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

                <TouchableOpacity style={styles.containerArrowWin2} onPress={() => navigation.navigate('DetailMonitorOgp',{treg:this.state.treg,witel:this.state.witel,start_date:this.state.startdate,end_date:this.state.enddate,status:'S'})}>
                  <Text style={styles.textJudul}>OGP KB</Text>
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
                  <Text style={[styles.textJudul, { marginBottom: 20, alignItems: 'center' }]}>Progress OGP KB &#60; 3 Hari</Text>
                </View>

                <TouchableOpacity style={styles.containerArrowWin2} onPress={() => navigation.navigate('DetailMonitorProgressOgp3',{treg:this.state.treg,witel:this.state.witel,start_date:this.state.startdate,end_date:this.state.enddate,status:'S'})}>
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

                <TouchableOpacity style={styles.containerArrowWin2} onPress={() => navigation.navigate('DetailMonitorProgressOgp6',{treg:this.state.treg,witel:this.state.witel,start_date:this.state.startdate,end_date:this.state.enddate,status:'S'})}>
                <View>
                  <Text style={styles.textIsi}>{dataEbisOgp6RevSubs}M</Text>
                  <Text style={styles.textKeterangan}>per {dataEbisOgp6ProjectSubs} Project</Text>
                </View>
                </TouchableOpacity>

              </View>

              <View style={{ flexDirection: 'row', margin: hp('2%'), justifyContent: 'space-between' }}>
                <View style={{ marginBottom: hp('2%') }}>
                  <Text style={[styles.textJudul, { marginBottom: 20, alignItems: 'center' }]}>Progress OGP KB &#62; 7 Hari</Text>
                </View>

                <TouchableOpacity style={styles.containerArrowWin2} onPress={() => navigation.navigate('DetailMonitorProgressOgp7',{treg:this.state.treg,witel:this.state.witel,start_date:this.state.startdate,end_date:this.state.enddate,status:'S'})}>
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

              <TouchableOpacity style={styles.containerArrowWin2} onPress={() => navigation.navigate('DetailMonitorDone',{treg:this.state.treg,witel:this.state.witel,start_date:this.state.startdate,end_date:this.state.enddate,status:'M'})}>
                <Text style={styles.textJudul}>Done KB</Text>
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

              <TouchableOpacity style={styles.containerArrowWin2} onPress={() => navigation.navigate('DetailMonitorOgp',{treg:this.state.treg,witel:this.state.witel,start_date:this.state.startdate,end_date:this.state.enddate,status:'M'})}>
                <Text style={styles.textJudul}>OGP KB</Text>
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
                <Text style={[styles.textJudul, { marginBottom: 20, alignItems: 'center' }]}>Progress OGP KB &#60; 3 Hari</Text>
              </View>

              <TouchableOpacity style={styles.containerArrowWin2} onPress={() => navigation.navigate('DetailMonitorProgressOgp3',{treg:this.state.treg,witel:this.state.witel,start_date:this.state.startdate,end_date:this.state.enddate,status:'M'})}>
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

              <TouchableOpacity style={styles.containerArrowWin2} onPress={() => navigation.navigate('DetailMonitorProgressOgp6',{treg:this.state.treg,witel:this.state.witel,start_date:this.state.startdate,end_date:this.state.enddate,status:'M'})}>
              <View>
                <Text style={styles.textIsi}>{dataEbisOgp6RevMitra}M</Text>
                <Text style={styles.textKeterangan}>per {dataEbisOgp6ProjectMitra} Project</Text>
              </View>
              </TouchableOpacity>

            </View>

            <View style={{ flexDirection: 'row', margin: hp('2%'), justifyContent: 'space-between' }}>
              <View style={{ marginBottom: hp('2%') }}>
                <Text style={[styles.textJudul, { marginBottom: 20, alignItems: 'center' }]}>Progress OGP KB &#62; 7 Hari</Text>
              </View>

              <TouchableOpacity style={styles.containerArrowWin2} onPress={() => navigation.navigate('DetailMonitorProgressOgp7',{treg:this.state.treg,witel:this.state.witel,start_date:this.state.startdate,end_date:this.state.enddate,status:'M'})}>
              <View>
                <Text style={styles.textIsi}>{dataEbisOgp7RevMitra}M</Text>
                <Text style={styles.textKeterangan}>per {dataEbisOgp7ProjectMitra} Project</Text>
              </View>
              </TouchableOpacity>

            </View>
          </View>
          )}

          {renderIf(!statusTelkom)(
            <View style={{ margin: hp('2%') }}>
            <View style={styles.wrapperArrow}>
              <Image
                source={images.Win.arrowWin1}
                style={styles.imageStyle}
                resizeMode={'stretch'}
              />

              <View style={styles.containerArrowWin}>
                <Text style={styles.textJudul}>WIN</Text>
                <Text style={styles.textIsi}>{ebisMonitorTelkom}M</Text>
                <Text style={styles.textKeterangan}>per {ebisMonitorWPTelkom} Project</Text>
              </View>

              <Image
                source={images.Win.arrowWin3}
                style={styles.imageStyle}
                resizeMode={'stretch'}
              />

              <TouchableOpacity style={styles.containerArrowWin2} onPress={() => navigation.navigate('DetailMonitorDone',{treg:this.state.treg,witel:this.state.witel,start_date:this.state.startdate,end_date:this.state.enddate,status:'T'})}>
                <Text style={styles.textJudul}>Done KB</Text>
                <Text style={styles.textIsi}>{ebisMonitorDoneTelkom}M</Text>
                <Text style={styles.textKeterangan}>per {ebisMonitorDoneWPTelkom} Project</Text>
              </TouchableOpacity>

              <Image
                source={images.arrowGrey}
                style={styles.imageStyle}
                resizeMode={'stretch'}
              />

              <View style={styles.wrapperPresentase}>
                <View style={styles.wrapperTextPresentase}>
                  <Text style={styles.textJudul}>{this.getNum(newValueDoneTelkom)}%</Text>
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
                <Text style={styles.textIsi}>{ebisMonitorTelkom}M</Text>
                <Text style={styles.textKeterangan}>per {ebisMonitorWPTelkom} Project</Text>
              </View>

              <Image
                source={images.Win.arrowWin3}
                style={styles.imageStyle}
                resizeMode={'stretch'}
              />

              <TouchableOpacity style={styles.containerArrowWin2} onPress={() => navigation.navigate('DetailMonitorOgp',{treg:this.state.treg,witel:this.state.witel,start_date:this.state.startdate,end_date:this.state.enddate,status:'T'})}>
                <Text style={styles.textJudul}>OGP KB</Text>
                <Text style={styles.textIsi}>{ebisMonitorOgpTelkom}M</Text>
                <Text style={styles.textKeterangan}>per {ebisMonitorOgpWPTelkom} Project</Text>
              </TouchableOpacity>

              <Image
                source={images.arrowGrey}
                style={styles.imageStyle}
                resizeMode={'stretch'}
              />

              <View style={styles.wrapperPresentase}>
                <View style={styles.wrapperTextPresentase}>
                  <Text style={styles.textJudul}>{this.getNum(newValueOgpTelkom)}%</Text>
                </View>
              </View>
            </View>

            <View style={{ flexDirection: 'row', margin: hp('2%'), justifyContent: 'space-between' }}>
              <View style={{ marginBottom: hp('2%') }}>
                <Text style={[styles.textJudul, { marginBottom: 20, alignItems: 'center' }]}>Progress OGP KB &#60; 3 Hari</Text>
              </View>

              <TouchableOpacity style={styles.containerArrowWin2} onPress={() => navigation.navigate('DetailMonitorProgressOgp3',{treg:this.state.treg,witel:this.state.witel,start_date:this.state.startdate,end_date:this.state.enddate,status:'T'})}>
              <View>
                <Text style={styles.textIsi}>{dataEbisOgp3RevTelkom}M</Text>
                <Text style={styles.textKeterangan}>per {dataEbisOgp3ProjectTelkom} Project</Text>
              </View>
              </TouchableOpacity>

            </View>

            <View style={{ flexDirection: 'row', margin: hp('2%'), justifyContent: 'space-between' }}>
              <View style={{ marginBottom: hp('2%') }}>
                <Text style={[styles.textJudul, { marginBottom: 20, alignItems: 'center' }]}>3 Hari &#60; OGP &#60; 7 Hari</Text>
              </View>

              <TouchableOpacity style={styles.containerArrowWin2} onPress={() => navigation.navigate('DetailMonitorProgressOgp6',{treg:this.state.treg,witel:this.state.witel,start_date:this.state.startdate,end_date:this.state.enddate,status:'T'})}>
              <View>
                <Text style={styles.textIsi}>{dataEbisOgp6RevTelkom}M</Text>
                <Text style={styles.textKeterangan}>per {dataEbisOgp6ProjectTelkom} Project</Text>
              </View>
              </TouchableOpacity>

            </View>

            <View style={{ flexDirection: 'row', margin: hp('2%'), justifyContent: 'space-between' }}>
              <View style={{ marginBottom: hp('2%') }}>
                <Text style={[styles.textJudul, { marginBottom: 20, alignItems: 'center' }]}>Progress OGP KB &#62; 7 Hari</Text>
              </View>

              <TouchableOpacity style={styles.containerArrowWin2} onPress={() => navigation.navigate('DetailMonitorProgressOgp7',{treg:this.state.treg,witel:this.state.witel,start_date:this.state.startdate,end_date:this.state.enddate,status:'T'})}>
              <View>
                <Text style={styles.textIsi}>{dataEbisOgp7RevTelkom}M</Text>
                <Text style={styles.textKeterangan}>per {dataEbisOgp7ProjectTelkom} Project</Text>
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

          <TouchableOpacity onPress={() => this.buttonAll()} style={styles.containerArrowSubmission2}>
            {statusAll === false
              ?
              <Image
                source={images.allImage.allAktif}
                style={styles.imageContent}
                resizeMode={'stretch'}
              />
              :
              <Image
                source={images.allImage.allNon}
                style={styles.imageContent}
                resizeMode={'stretch'}
              />
            }
          </TouchableOpacity>

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

          <TouchableOpacity onPress={() => this.buttonTelkom()} style={styles.containerArrowSubmission2}>
            {statusTelkom === false
              ?
              <Image
                source={images.telkomImage.telkomAktif}
                style={styles.imageContent}
                resizeMode={'stretch'}
              />
              :
              <Image
                source={images.telkomImage.telkomNon}
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
          {renderIf(!statusAll)(
            <View style={{ margin: hp('2%') }}>
              <View style={styles.wrapperArrow}>
                <Image
                  source={images.Win.arrowWin1}
                  style={styles.imageStyle}
                  resizeMode={'stretch'}
                />

                <View style={styles.containerArrowWin}>
                  <Text style={styles.textJudul}>WIN</Text>
                  <Text style={styles.textIsi}>{DesMonitor}M</Text>
                  <Text style={styles.textKeterangan}>per {DesMonitorWP} Project</Text>
                </View>

                <Image
                  source={images.Win.arrowWin3}
                  style={styles.imageStyle}
                  resizeMode={'stretch'}
                />

                <TouchableOpacity style={styles.containerArrowWin2} onPress={() => navigation.navigate('DetailMonitorDone',{start_date:this.state.startdate,end_date:this.state.enddate,status:'A'})}>
                  <Text style={styles.textJudul}>Done KB</Text>
                  <Text style={styles.textIsi}>{DesMonitorDone}M</Text>
                  <Text style={styles.textKeterangan}>per {DesMonitorDoneWP} Project</Text>
                </TouchableOpacity>

                <Image
                  source={images.arrowGrey}
                  style={styles.imageStyle}
                  resizeMode={'stretch'}
                />

                <View style={styles.wrapperPresentase}>
                  <View style={styles.wrapperTextPresentase}>
                    <Text style={styles.textJudul}>{this.getNum(newValueDone)}%</Text>
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
                  <Text style={styles.textIsi}>{DesMonitor}M</Text>
                  <Text style={styles.textKeterangan}>per {DesMonitorWP} Project</Text>
                </TouchableOpacity>

                <Image
                  source={images.Win.arrowWin3}
                  style={styles.imageStyle}
                  resizeMode={'stretch'}
                />

                <TouchableOpacity style={styles.containerArrowWin2} onPress={() => navigation.navigate('DetailMonitorOgp',{start_date:this.state.startdate,end_date:this.state.enddate,status:'A'})}>
                  <Text style={styles.textJudul}>OGP KB</Text>
                  <Text style={styles.textIsi}>{DesMonitorOgp}M</Text>
                  <Text style={styles.textKeterangan}>per {DesMonitorOgpWP} Project</Text>
                </TouchableOpacity>

                <Image
                  source={images.arrowGrey}
                  style={styles.imageStyle}
                  resizeMode={'stretch'}
                />

                <View style={styles.wrapperPresentase}>
                  <View style={styles.wrapperTextPresentase}>
                    <Text style={styles.textJudul}>{this.getNum(newValueOgp)}%</Text>
                  </View>
                </View>
              </View>

              <View style={{ flexDirection: 'row', margin: hp('2%'), justifyContent: 'space-between' }}>
                <View style={{ marginBottom: hp('2%') }}>
                  <Text style={[styles.textJudul, { marginBottom: 20, alignItems: 'center' }]}>Progress OGP KB &#60; 3 Hari</Text>
                </View>

                <TouchableOpacity style={styles.containerArrowWin2} onPress={() => navigation.navigate('DetailMonitorProgressOgp3',{start_date:this.state.startdate,end_date:this.state.enddate,status:'A'})}>
                <View>
                  <Text style={styles.textIsi}>{dataDesOgp3Rev}M</Text>
                  <Text style={styles.textKeterangan}>per {dataDesOgp3Project} Project</Text>
                </View>
                </TouchableOpacity>

              </View>

              <View style={{ flexDirection: 'row', margin: hp('2%'), justifyContent: 'space-between' }}>
                <View style={{ marginBottom: hp('2%') }}>
                  <Text style={[styles.textJudul, { marginBottom: 20, alignItems: 'center' }]}>3 Hari &#60; OGP &#60; 7 Hari</Text>
                </View>

                <TouchableOpacity style={styles.containerArrowWin2} onPress={() => navigation.navigate('DetailMonitorProgressOgp6',{start_date:this.state.startdate,end_date:this.state.enddate,status:'A'})}>
                <View>
                  <Text style={styles.textIsi}>{dataDesOgp6Rev}M</Text>
                  <Text style={styles.textKeterangan}>per {dataDesOgp6Project} Project</Text>
                </View>
                </TouchableOpacity>

              </View>

              <View style={{ flexDirection: 'row', margin: hp('2%'), justifyContent: 'space-between' }}>
                <View style={{ marginBottom: hp('2%') }}>
                  <Text style={[styles.textJudul, { marginBottom: 20, alignItems: 'center' }]}>Progress OGP KB &#62; 7 Hari</Text>
                </View>

                <TouchableOpacity style={styles.containerArrowWin2} onPress={() => navigation.navigate('DetailMonitorProgressOgp7',{start_date:this.state.startdate,end_date:this.state.enddate,status:'A'})}>
                <View>
                  <Text style={styles.textIsi}>{dataDesOgp7Rev}M</Text>
                  <Text style={styles.textKeterangan}>per {dataDesOgp7Project} Project</Text>
                </View>
                </TouchableOpacity>

              </View>
            </View>
          )}

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

                <TouchableOpacity style={styles.containerArrowWin2} onPress={() => navigation.navigate('DetailMonitorDone',{start_date:this.state.startdate,end_date:this.state.enddate,status:'S'})}>
                  <Text style={styles.textJudul}>Done KB</Text>
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

                <TouchableOpacity style={styles.containerArrowWin2} onPress={() => navigation.navigate('DetailMonitorOgp',{start_date:this.state.startdate,end_date:this.state.enddate,status:'S'})}>
                  <Text style={styles.textJudul}>OGP KB</Text>
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
                  <Text style={[styles.textJudul, { marginBottom: 20, alignItems: 'center' }]}>Progress OGP KB &#60; 3 Hari</Text>
                </View>

                <TouchableOpacity style={styles.containerArrowWin2} onPress={() => navigation.navigate('DetailMonitorProgressOgp3',{start_date:this.state.startdate,end_date:this.state.enddate,status:'S'})}>
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

                <TouchableOpacity style={styles.containerArrowWin2} onPress={() => navigation.navigate('DetailMonitorProgressOgp6',{start_date:this.state.startdate,end_date:this.state.enddate,status:'S'})}>
                <View>
                  <Text style={styles.textIsi}>{dataDesOgp6RevSubs}M</Text>
                  <Text style={styles.textKeterangan}>per {dataDesOgp6ProjectSubs} Project</Text>
                </View>
                </TouchableOpacity>

              </View>

              <View style={{ flexDirection: 'row', margin: hp('2%'), justifyContent: 'space-between' }}>
                <View style={{ marginBottom: hp('2%') }}>
                  <Text style={[styles.textJudul, { marginBottom: 20, alignItems: 'center' }]}>Progress OGP KB &#62; 7 Hari</Text>
                </View>

                <TouchableOpacity style={styles.containerArrowWin2} onPress={() => navigation.navigate('DetailMonitorProgressOgp7',{start_date:this.state.startdate,end_date:this.state.enddate,status:'S'})}>
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

              <TouchableOpacity style={styles.containerArrowWin2} onPress={() => navigation.navigate('DetailMonitorDone',{start_date:this.state.startdate,end_date:this.state.enddate,status:'M'})}>
                <Text style={styles.textJudul}>Done KB</Text>
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

              <TouchableOpacity style={styles.containerArrowWin2} onPress={() => navigation.navigate('DetailMonitorOgp',{start_date:this.state.startdate,end_date:this.state.enddate,status:'M'})}>
                <Text style={styles.textJudul}>OGP KB</Text>
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
                <Text style={[styles.textJudul, { marginBottom: 20, alignItems: 'center' }]}>Progress OGP KB &#60; 3 Hari</Text>
              </View>

              <TouchableOpacity style={styles.containerArrowWin2} onPress={() => navigation.navigate('DetailMonitorProgressOgp3',{start_date:this.state.startdate,end_date:this.state.enddate,status:'M'})}>
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

              <TouchableOpacity style={styles.containerArrowWin2} onPress={() => navigation.navigate('DetailMonitorProgressOgp6',{start_date:this.state.startdate,end_date:this.state.enddate,status:'M'})}>
              <View>
                <Text style={styles.textIsi}>{dataDesOgp6RevMitra}M</Text>
                <Text style={styles.textKeterangan}>per {dataDesOgp6ProjectMitra} Project</Text>
              </View>
              </TouchableOpacity>

            </View>

            <View style={{ flexDirection: 'row', margin: hp('2%'), justifyContent: 'space-between' }}>
              <View style={{ marginBottom: hp('2%') }}>
                <Text style={[styles.textJudul, { marginBottom: 20, alignItems: 'center' }]}>Progress OGP KB &#62; 7 Hari</Text>
              </View>

              <TouchableOpacity style={styles.containerArrowWin2} onPress={() => navigation.navigate('DetailMonitorProgressOgp7',{start_date:this.state.startdate,end_date:this.state.enddate,status:'M'})}>
              <View>
                <Text style={styles.textIsi}>{dataDesOgp7RevMitra}M</Text>
                <Text style={styles.textKeterangan}>per {dataDesOgp7ProjectMitra} Project</Text>
              </View>
              </TouchableOpacity>

            </View>
          </View>
          )}

          {renderIf(!statusTelkom)(
            <View style={{ margin: hp('2%') }}>
            <View style={styles.wrapperArrow}>
              <Image
                source={images.Win.arrowWin1}
                style={styles.imageStyle}
                resizeMode={'stretch'}
              />

              <View style={styles.containerArrowWin}>
                <Text style={styles.textJudul}>WIN</Text>
                <Text style={styles.textIsi}>{DesMonitorTelkom}M</Text>
                <Text style={styles.textKeterangan}>per {DesMonitorWPTelkom} Project</Text>
              </View>

              <Image
                source={images.Win.arrowWin3}
                style={styles.imageStyle}
                resizeMode={'stretch'}
              />

              <TouchableOpacity style={styles.containerArrowWin2} onPress={() => navigation.navigate('DetailMonitorDone',{start_date:this.state.startdate,end_date:this.state.enddate,status:'T'})}>
                <Text style={styles.textJudul}>Done KB</Text>
                <Text style={styles.textIsi}>{DesMonitorDoneTelkom}M</Text>
                <Text style={styles.textKeterangan}>per {DesMonitorDoneWPTelkom} Project</Text>
              </TouchableOpacity>

              <Image
                source={images.arrowGrey}
                style={styles.imageStyle}
                resizeMode={'stretch'}
              />

              <View style={styles.wrapperPresentase}>
                <View style={styles.wrapperTextPresentase}>
                  <Text style={styles.textJudul}>{this.getNum(newValueDoneTelkom)}%</Text>
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
                <Text style={styles.textIsi}>{DesMonitorTelkom}M</Text>
                <Text style={styles.textKeterangan}>per {DesMonitorWPTelkom} Project</Text>
              </TouchableOpacity>

              <Image
                source={images.Win.arrowWin3}
                style={styles.imageStyle}
                resizeMode={'stretch'}
              />

              <TouchableOpacity style={styles.containerArrowWin2} onPress={() => navigation.navigate('DetailMonitorOgp',{start_date:this.state.startdate,end_date:this.state.enddate,status:'T'})}>
                <Text style={styles.textJudul}>OGP KB</Text>
                <Text style={styles.textIsi}>{DesMonitorOgpTelkom}M</Text>
                <Text style={styles.textKeterangan}>per {DesMonitorOgpWPTelkom} Project</Text>
              </TouchableOpacity>

              <Image
                source={images.arrowGrey}
                style={styles.imageStyle}
                resizeMode={'stretch'}
              />

              <View style={styles.wrapperPresentase}>
                <View style={styles.wrapperTextPresentase}>
                  <Text style={styles.textJudul}>{this.getNum(newValueOgpTelkom)}%</Text>
                </View>
              </View>
            </View>

            <View style={{ flexDirection: 'row', margin: hp('2%'), justifyContent: 'space-between' }}>
              <View style={{ marginBottom: hp('2%') }}>
                <Text style={[styles.textJudul, { marginBottom: 20, alignItems: 'center' }]}>Progress OGP KB &#60; 3 Hari</Text>
              </View>

              <TouchableOpacity style={styles.containerArrowWin2} onPress={() => navigation.navigate('DetailMonitorProgressOgp3',{start_date:this.state.startdate,end_date:this.state.enddate,status:'T'})}>
              <View>
                <Text style={styles.textIsi}>{dataDesOgp3RevTelkom}M</Text>
                <Text style={styles.textKeterangan}>per {dataDesOgp3ProjectTelkom} Project</Text>
              </View>
              </TouchableOpacity>

            </View>

            <View style={{ flexDirection: 'row', margin: hp('2%'), justifyContent: 'space-between' }}>
              <View style={{ marginBottom: hp('2%') }}>
                <Text style={[styles.textJudul, { marginBottom: 20, alignItems: 'center' }]}>3 Hari &#60; OGP &#60; 7 Hari</Text>
              </View>

              <TouchableOpacity style={styles.containerArrowWin2} onPress={() => navigation.navigate('DetailMonitorProgressOgp6',{start_date:this.state.startdate,end_date:this.state.enddate,status:'T'})}>
              <View>
                <Text style={styles.textIsi}>{dataDesOgp6Rev}M</Text>
                <Text style={styles.textKeterangan}>per {dataDesOgp6ProjectTelkom} Project</Text>
              </View>
              </TouchableOpacity>

            </View>

            <View style={{ flexDirection: 'row', margin: hp('2%'), justifyContent: 'space-between' }}>
              <View style={{ marginBottom: hp('2%') }}>
                <Text style={[styles.textJudul, { marginBottom: 20, alignItems: 'center' }]}>Progress OGP KB &#62; 7 Hari</Text>
              </View>

              <TouchableOpacity style={styles.containerArrowWin2} onPress={() => navigation.navigate('DetailMonitorProgressOgp7',{start_date:this.state.startdate,end_date:this.state.enddate,status:'T'})}>
              <View>
                <Text style={styles.textIsi}>{dataDesOgp7RevTelkom}M</Text>
                <Text style={styles.textKeterangan}>per {dataDesOgp7ProjectTelkom} Project</Text>
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

          <TouchableOpacity onPress={() => this.buttonAll()} style={styles.containerArrowSubmission2}>
            {statusAll === false
              ?
              <Image
                source={images.allImage.allAktif}
                style={styles.imageContent}
                resizeMode={'stretch'}
              />
              :
              <Image
                source={images.allImage.allNon}
                style={styles.imageContent}
                resizeMode={'stretch'}
              />
            }
          </TouchableOpacity>

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

          <TouchableOpacity onPress={() => this.buttonTelkom()} style={styles.containerArrowSubmission2}>
            {statusTelkom === false
              ?
              <Image
                source={images.telkomImage.telkomAktif}
                style={styles.imageContent}
                resizeMode={'stretch'}
              />
              :
              <Image
                source={images.telkomImage.telkomNon}
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
          {renderIf(!statusAll)(
            <View style={{ margin: hp('2%') }}>
              <View style={styles.wrapperArrow}>
                <Image
                  source={images.Win.arrowWin1}
                  style={styles.imageStyle}
                  resizeMode={'stretch'}
                />

                <View style={styles.containerArrowWin}>
                  <Text style={styles.textJudul}>WIN</Text>
                  <Text style={styles.textIsi}>{DbsMonitor}M</Text>
                  <Text style={styles.textKeterangan}>per {DbsMonitorWP} Project</Text>
                </View>

                <Image
                  source={images.Win.arrowWin3}
                  style={styles.imageStyle}
                  resizeMode={'stretch'}
                />

                <TouchableOpacity style={styles.containerArrowWin2} onPress={() => navigation.navigate('DetailMonitorDone',{start_date:this.state.startdate,end_date:this.state.enddate,status:'A'})}>
                  <Text style={styles.textJudul}>Done KB</Text>
                  <Text style={styles.textIsi}>{DbsMonitorDone}M</Text>
                  <Text style={styles.textKeterangan}>per {DbsMonitorDoneWP} Project</Text>
                </TouchableOpacity>

                <Image
                  source={images.arrowGrey}
                  style={styles.imageStyle}
                  resizeMode={'stretch'}
                />

                <View style={styles.wrapperPresentase}>
                  <View style={styles.wrapperTextPresentase}>
                    <Text style={styles.textJudul}>{this.getNum(newValueDone)}%</Text>
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
                  <Text style={styles.textIsi}>{DbsMonitor}M</Text>
                  <Text style={styles.textKeterangan}>per {DbsMonitorWP} Project</Text>
                </TouchableOpacity>

                <Image
                  source={images.Win.arrowWin3}
                  style={styles.imageStyle}
                  resizeMode={'stretch'}
                />

                <TouchableOpacity style={styles.containerArrowWin2} onPress={() => navigation.navigate('DetailMonitorOgp',{start_date:this.state.startdate,end_date:this.state.enddate,status:'A'})}>
                  <Text style={styles.textJudul}>OGP KB</Text>
                  <Text style={styles.textIsi}>{DbsMonitorOgp}M</Text>
                  <Text style={styles.textKeterangan}>per {DbsMonitorOgpWP} Project</Text>
                </TouchableOpacity>

                <Image
                  source={images.arrowGrey}
                  style={styles.imageStyle}
                  resizeMode={'stretch'}
                />

                <View style={styles.wrapperPresentase}>
                  <View style={styles.wrapperTextPresentase}>
                    <Text style={styles.textJudul}>{this.getNum(newValueOgp)}%</Text>
                  </View>
                </View>
              </View>

              <View style={{ flexDirection: 'row', margin: hp('2%'), justifyContent: 'space-between' }}>
                <View style={{ marginBottom: hp('2%') }}>
                  <Text style={[styles.textJudul, { marginBottom: 20, alignItems: 'center' }]}>Progress OGP KB &#60; 3 Hari</Text>
                </View>

                <TouchableOpacity style={styles.containerArrowWin2} onPress={() => navigation.navigate('DetailMonitorProgressOgp3',{start_date:this.state.startdate,end_date:this.state.enddate,status:'A'})}>
                <View>
                  <Text style={styles.textIsi}>{dataDbsOgp3Rev}M</Text>
                  <Text style={styles.textKeterangan}>per {dataDbsOgp3Project} Project</Text>
                </View>
                </TouchableOpacity>

              </View>

              <View style={{ flexDirection: 'row', margin: hp('2%'), justifyContent: 'space-between' }}>
                <View style={{ marginBottom: hp('2%') }}>
                  <Text style={[styles.textJudul, { marginBottom: 20, alignItems: 'center' }]}>3 Hari &#60; OGP &#60; 7 Hari</Text>
                </View>

                <TouchableOpacity style={styles.containerArrowWin2} onPress={() => navigation.navigate('DetailMonitorProgressOgp6',{start_date:this.state.startdate,end_date:this.state.enddate,status:'A'})}>
                <View>
                  <Text style={styles.textIsi}>{dataDbsOgp6Rev}M</Text>
                  <Text style={styles.textKeterangan}>per {dataDbsOgp6Project} Project</Text>
                </View>
                </TouchableOpacity>

              </View>

              <View style={{ flexDirection: 'row', margin: hp('2%'), justifyContent: 'space-between' }}>
                <View style={{ marginBottom: hp('2%') }}>
                  <Text style={[styles.textJudul, { marginBottom: 20, alignItems: 'center' }]}>Progress OGP KB &#62; 7 Hari</Text>
                </View>

                <TouchableOpacity style={styles.containerArrowWin2} onPress={() => navigation.navigate('DetailMonitorProgressOgp7',{start_date:this.state.startdate,end_date:this.state.enddate,status:'A'})}>
                <View>
                  <Text style={styles.textIsi}>{dataDbsOgp7Rev}M</Text>
                  <Text style={styles.textKeterangan}>per {dataDbsOgp7Project} Project</Text>
                </View>
                </TouchableOpacity>

              </View>
            </View>
          )}

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

                <TouchableOpacity style={styles.containerArrowWin2} onPress={() => navigation.navigate('DetailMonitorDone',{start_date:this.state.startdate,end_date:this.state.enddate,status:'S'})}>
                  <Text style={styles.textJudul}>Done KB</Text>
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

                <TouchableOpacity style={styles.containerArrowWin2} onPress={() => navigation.navigate('DetailMonitorOgp',{start_date:this.state.startdate,end_date:this.state.enddate,status:'S'})}>
                  <Text style={styles.textJudul}>OGP KB</Text>
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
                  <Text style={[styles.textJudul, { marginBottom: 20, alignItems: 'center' }]}>Progress OGP KB &#60; 3 Hari</Text>
                </View>

                <TouchableOpacity style={styles.containerArrowWin2} onPress={() => navigation.navigate('DetailMonitorProgressOgp3',{start_date:this.state.startdate,end_date:this.state.enddate,status:'S'})}>
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

                <TouchableOpacity style={styles.containerArrowWin2} onPress={() => navigation.navigate('DetailMonitorProgressOgp6',{start_date:this.state.startdate,end_date:this.state.enddate,status:'S'})}>
                <View>
                  <Text style={styles.textIsi}>{dataDbsOgp6RevSubs}M</Text>
                  <Text style={styles.textKeterangan}>per {dataDbsOgp6ProjectSubs} Project</Text>
                </View>
                </TouchableOpacity>

              </View>

              <View style={{ flexDirection: 'row', margin: hp('2%'), justifyContent: 'space-between' }}>
                <View style={{ marginBottom: hp('2%') }}>
                  <Text style={[styles.textJudul, { marginBottom: 20, alignItems: 'center' }]}>Progress OGP KB &#62; 7 Hari</Text>
                </View>

                <TouchableOpacity style={styles.containerArrowWin2} onPress={() => navigation.navigate('DetailMonitorProgressOgp7',{start_date:this.state.startdate,end_date:this.state.enddate,status:'S'})}>
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

              <TouchableOpacity style={styles.containerArrowWin2} onPress={() => navigation.navigate('DetailMonitorDone',{start_date:this.state.startdate,end_date:this.state.enddate,status:'M'})}>
                <Text style={styles.textJudul}>Done KB</Text>
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

              <TouchableOpacity style={styles.containerArrowWin2} onPress={() => navigation.navigate('DetailMonitorOgp',{start_date:this.state.startdate,end_date:this.state.enddate,status:'M'})}>
                <Text style={styles.textJudul}>OGP KB</Text>
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
                <Text style={[styles.textJudul, { marginBottom: 20, alignItems: 'center' }]}>Progress OGP KB &#60; 3 Hari</Text>
              </View>

              <TouchableOpacity style={styles.containerArrowWin2} onPress={() => navigation.navigate('DetailMonitorProgressOgp3',{start_date:this.state.startdate,end_date:this.state.enddate,status:'M'})}>
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

              <TouchableOpacity style={styles.containerArrowWin2} onPress={() => navigation.navigate('DetailMonitorProgressOgp6',{start_date:this.state.startdate,end_date:this.state.enddate,status:'M'})}>
              <View>
                <Text style={styles.textIsi}>{dataDbsOgp6RevMitra}M</Text>
                <Text style={styles.textKeterangan}>per {dataDbsOgp6ProjectMitra} Project</Text>
              </View>
              </TouchableOpacity>

            </View>

            <View style={{ flexDirection: 'row', margin: hp('2%'), justifyContent: 'space-between' }}>
              <View style={{ marginBottom: hp('2%') }}>
                <Text style={[styles.textJudul, { marginBottom: 20, alignItems: 'center' }]}>Progress OGP KB &#62; 7 Hari</Text>
              </View>

              <TouchableOpacity style={styles.containerArrowWin2} onPress={() => navigation.navigate('DetailMonitorProgressOgp7',{start_date:this.state.startdate,end_date:this.state.enddate,status:'M'})}>
              <View>
                <Text style={styles.textIsi}>{dataDbsOgp7RevMitra}M</Text>
                <Text style={styles.textKeterangan}>per {dataDbsOgp7ProjectMitra} Project</Text>
              </View>
              </TouchableOpacity>

            </View>
          </View>
        )}

          {renderIf(!statusTelkom)(
            <View style={{ margin: hp('2%') }}>
            <View style={styles.wrapperArrow}>
              <Image
                source={images.Win.arrowWin1}
                style={styles.imageStyle}
                resizeMode={'stretch'}
              />

              <View style={styles.containerArrowWin}>
                <Text style={styles.textJudul}>WIN</Text>
                <Text style={styles.textIsi}>{DbsMonitorTelkom}M</Text>
                <Text style={styles.textKeterangan}>per {DbsMonitorWPTelkom} Project</Text>
              </View>

              <Image
                source={images.Win.arrowWin3}
                style={styles.imageStyle}
                resizeMode={'stretch'}
              />

              <TouchableOpacity style={styles.containerArrowWin2} onPress={() => navigation.navigate('DetailMonitorDone',{start_date:this.state.startdate,end_date:this.state.enddate,status:'T'})}>
                <Text style={styles.textJudul}>Done KB</Text>
                <Text style={styles.textIsi}>{DbsMonitorDoneTelkom}M</Text>
                <Text style={styles.textKeterangan}>per {DbsMonitorDoneWPTelkom} Project</Text>
              </TouchableOpacity>

              <Image
                source={images.arrowGrey}
                style={styles.imageStyle}
                resizeMode={'stretch'}
              />

              <View style={styles.wrapperPresentase}>
                <View style={styles.wrapperTextPresentase}>
                  <Text style={styles.textJudul}>{this.getNum(newValueDoneTelkom)}%</Text>
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
                <Text style={styles.textIsi}>{DbsMonitorTelkom}M</Text>
                <Text style={styles.textKeterangan}>per {DbsMonitorWPTelkom} Project</Text>
              </TouchableOpacity>

              <Image
                source={images.Win.arrowWin3}
                style={styles.imageStyle}
                resizeMode={'stretch'}
              />

              <TouchableOpacity style={styles.containerArrowWin2} onPress={() => navigation.navigate('DetailMonitorOgp',{start_date:this.state.startdate,end_date:this.state.enddate,status:'T'})}>
                <Text style={styles.textJudul}>OGP KB</Text>
                <Text style={styles.textIsi}>{DbsMonitorOgpTelkom}M</Text>
                <Text style={styles.textKeterangan}>per {DbsMonitorOgpWPTelkom} Project</Text>
              </TouchableOpacity>

              <Image
                source={images.arrowGrey}
                style={styles.imageStyle}
                resizeMode={'stretch'}
              />

              <View style={styles.wrapperPresentase}>
                <View style={styles.wrapperTextPresentase}>
                  <Text style={styles.textJudul}>{this.getNum(newValueOgpTelkom)}%</Text>
                </View>
              </View>
            </View>

            <View style={{ flexDirection: 'row', margin: hp('2%'), justifyContent: 'space-between' }}>
              <View style={{ marginBottom: hp('2%') }}>
                <Text style={[styles.textJudul, { marginBottom: 20, alignItems: 'center' }]}>Progress OGP KB &#60; 3 Hari</Text>
              </View>

              <TouchableOpacity style={styles.containerArrowWin2} onPress={() => navigation.navigate('DetailMonitorProgressOgp3',{start_date:this.state.startdate,end_date:this.state.enddate,status:'T'})}>
              <View>
                <Text style={styles.textIsi}>{dataDbsOgp3RevTelkom}M</Text>
                <Text style={styles.textKeterangan}>per {dataDbsOgp3ProjectTelkom} Project</Text>
              </View>
              </TouchableOpacity>

            </View>

            <View style={{ flexDirection: 'row', margin: hp('2%'), justifyContent: 'space-between' }}>
              <View style={{ marginBottom: hp('2%') }}>
                <Text style={[styles.textJudul, { marginBottom: 20, alignItems: 'center' }]}>3 Hari &#60; OGP &#60; 7 Hari</Text>
              </View>

              <TouchableOpacity style={styles.containerArrowWin2} onPress={() => navigation.navigate('DetailMonitorProgressOgp6',{start_date:this.state.startdate,end_date:this.state.enddate,status:'T'})}>
              <View>
                <Text style={styles.textIsi}>{dataDbsOgp6RevTelkom}M</Text>
                <Text style={styles.textKeterangan}>per {dataDbsOgp6ProjectTelkom} Project</Text>
              </View>
              </TouchableOpacity>

            </View>

            <View style={{ flexDirection: 'row', margin: hp('2%'), justifyContent: 'space-between' }}>
              <View style={{ marginBottom: hp('2%') }}>
                <Text style={[styles.textJudul, { marginBottom: 20, alignItems: 'center' }]}>Progress OGP KB &#62; 7 Hari</Text>
              </View>

              <TouchableOpacity style={styles.containerArrowWin2} onPress={() => navigation.navigate('DetailMonitorProgressOgp7',{start_date:this.state.startdate,end_date:this.state.enddate,status:'T'})}>
              <View>
                <Text style={styles.textIsi}>{dataDbsOgp7RevTelkom}M</Text>
                <Text style={styles.textKeterangan}>per {dataDbsOgp7ProjectTelkom} Project</Text>
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

          <TouchableOpacity onPress={() => this.buttonAll()} style={styles.containerArrowSubmission2}>
            {statusAll === false
              ?
              <Image
                source={images.allImage.allAktif}
                style={styles.imageContent}
                resizeMode={'stretch'}
              />
              :
              <Image
                source={images.allImage.allNon}
                style={styles.imageContent}
                resizeMode={'stretch'}
              />
            }
          </TouchableOpacity>

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

          <TouchableOpacity onPress={() => this.buttonTelkom()} style={styles.containerArrowSubmission2}>
            {statusTelkom === false
              ?
              <Image
                source={images.telkomImage.telkomAktif}
                style={styles.imageContent}
                resizeMode={'stretch'}
              />
              :
              <Image
                source={images.telkomImage.telkomNon}
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
          {renderIf(!statusAll)(
            <View style={{ margin: hp('2%') }}>
              <View style={styles.wrapperArrow}>
                <Image
                  source={images.Win.arrowWin1}
                  style={styles.imageStyle}
                  resizeMode={'stretch'}
                />

                <View style={styles.containerArrowWin}>
                  <Text style={styles.textJudul}>WIN</Text>
                  <Text style={styles.textIsi}>{DgsMonitor}M</Text>
                  <Text style={styles.textKeterangan}>per {DgsMonitorWP} Project</Text>
                </View>

                <Image
                  source={images.Win.arrowWin3}
                  style={styles.imageStyle}
                  resizeMode={'stretch'}
                />

                <TouchableOpacity style={styles.containerArrowWin2} onPress={() => navigation.navigate('DetailMonitorDone',{start_date:this.state.startdate,end_date:this.state.enddate,status:'A'})}>
                  <Text style={styles.textJudul}>Done KB</Text>
                  <Text style={styles.textIsi}>{DgsMonitorDone}M</Text>
                  <Text style={styles.textKeterangan}>per {DgsMonitorDoneWP} Project</Text>
                </TouchableOpacity>

                <Image
                  source={images.arrowGrey}
                  style={styles.imageStyle}
                  resizeMode={'stretch'}
                />

                <View style={styles.wrapperPresentase}>
                  <View style={styles.wrapperTextPresentase}>
                    <Text style={styles.textJudul}>{this.getNum(newValueDone)}%</Text>
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
                  <Text style={styles.textIsi}>{DgsMonitor}M</Text>
                  <Text style={styles.textKeterangan}>per {DgsMonitorWP} Project</Text>
                </TouchableOpacity>

                <Image
                  source={images.Win.arrowWin3}
                  style={styles.imageStyle}
                  resizeMode={'stretch'}
                />

                <TouchableOpacity style={styles.containerArrowWin2} onPress={() => navigation.navigate('DetailMonitorOgp',{start_date:this.state.startdate,end_date:this.state.enddate,status:'A'})}>
                  <Text style={styles.textJudul}>OGP KB</Text>
                  <Text style={styles.textIsi}>{DgsMonitorOgp}M</Text>
                  <Text style={styles.textKeterangan}>per {DgsMonitorOgpWP} Project</Text>
                </TouchableOpacity>

                <Image
                  source={images.arrowGrey}
                  style={styles.imageStyle}
                  resizeMode={'stretch'}
                />

                <View style={styles.wrapperPresentase}>
                  <View style={styles.wrapperTextPresentase}>
                    <Text style={styles.textJudul}>{this.getNum(newValueOgp)}%</Text>
                  </View>
                </View>
              </View>

              <View style={{ flexDirection: 'row', margin: hp('2%'), justifyContent: 'space-between' }}>
                <View style={{ marginBottom: hp('2%') }}>
                  <Text style={[styles.textJudul, { marginBottom: 20, alignItems: 'center' }]}>Progress OGP KB &#60; 3 Hari</Text>
                </View>

                <TouchableOpacity style={styles.containerArrowWin2} onPress={() => navigation.navigate('DetailMonitorProgressOgp3',{start_date:this.state.startdate,end_date:this.state.enddate,status:'A'})}>
                <View>
                  <Text style={styles.textIsi}>{dataDgsOgp3Rev}M</Text>
                  <Text style={styles.textKeterangan}>per {dataDgsOgp3Project} Project</Text>
                </View>
                </TouchableOpacity>

              </View>

              <View style={{ flexDirection: 'row', margin: hp('2%'), justifyContent: 'space-between' }}>
                <View style={{ marginBottom: hp('2%') }}>
                  <Text style={[styles.textJudul, { marginBottom: 20, alignItems: 'center' }]}>3 Hari &#60; OGP &#60; 7 Hari</Text>
                </View>

                <TouchableOpacity style={styles.containerArrowWin2} onPress={() => navigation.navigate('DetailMonitorProgressOgp6',{start_date:this.state.startdate,end_date:this.state.enddate,status:'A'})}>
                <View>
                  <Text style={styles.textIsi}>{dataDgsOgp6Rev}M</Text>
                  <Text style={styles.textKeterangan}>per {dataDgsOgp6Project} Project</Text>
                </View>
                </TouchableOpacity>

              </View>

              <View style={{ flexDirection: 'row', margin: hp('2%'), justifyContent: 'space-between' }}>
                <View style={{ marginBottom: hp('2%') }}>
                  <Text style={[styles.textJudul, { marginBottom: 20, alignItems: 'center' }]}>Progress OGP KB &#62; 7 Hari</Text>
                </View>

                <TouchableOpacity style={styles.containerArrowWin2} onPress={() => navigation.navigate('DetailMonitorProgressOgp7',{start_date:this.state.startdate,end_date:this.state.enddate,status:'A'})}>
                <View>
                  <Text style={styles.textIsi}>{dataDgsOgp7Rev}M</Text>
                  <Text style={styles.textKeterangan}>per {dataDgsOgp7Project} Project</Text>
                </View>
                </TouchableOpacity>

              </View>
            </View>
          )}

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

                <TouchableOpacity style={styles.containerArrowWin2} onPress={() => navigation.navigate('DetailMonitorDone',{start_date:this.state.startdate,end_date:this.state.enddate,status:'S'})}>
                  <Text style={styles.textJudul}>Done KB</Text>
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

                <TouchableOpacity style={styles.containerArrowWin2} onPress={() => navigation.navigate('DetailMonitorOgp',{start_date:this.state.startdate,end_date:this.state.enddate,status:'S'})}>
                  <Text style={styles.textJudul}>OGP KB</Text>
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
                  <Text style={[styles.textJudul, { marginBottom: 20, alignItems: 'center' }]}>Progress OGP KB &#60; 3 Hari</Text>
                </View>

                <TouchableOpacity style={styles.containerArrowWin2} onPress={() => navigation.navigate('DetailMonitorProgressOgp3',{start_date:this.state.startdate,end_date:this.state.enddate,status:'S'})}>
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

                <TouchableOpacity style={styles.containerArrowWin2} onPress={() => navigation.navigate('DetailMonitorProgressOgp6',{start_date:this.state.startdate,end_date:this.state.enddate,status:'S'})}>
                <View>
                  <Text style={styles.textIsi}>{dataDgsOgp6RevSubs}M</Text>
                  <Text style={styles.textKeterangan}>per {dataDgsOgp6ProjectSubs} Project</Text>
                </View>
                </TouchableOpacity>

              </View>

              <View style={{ flexDirection: 'row', margin: hp('2%'), justifyContent: 'space-between' }}>
                <View style={{ marginBottom: hp('2%') }}>
                  <Text style={[styles.textJudul, { marginBottom: 20, alignItems: 'center' }]}>Progress OGP KB &#62; 7 Hari</Text>
                </View>

                <TouchableOpacity style={styles.containerArrowWin2} onPress={() => navigation.navigate('DetailMonitorProgressOgp7',{start_date:this.state.startdate,end_date:this.state.enddate,status:'S'})}>
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

                <TouchableOpacity style={styles.containerArrowWin2} onPress={() => navigation.navigate('DetailMonitorDone',{start_date:this.state.startdate,end_date:this.state.enddate,status:'M'})}>
                  <Text style={styles.textJudul}>Done KB</Text>
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

                <TouchableOpacity style={styles.containerArrowWin2} onPress={() => navigation.navigate('DetailMonitorOgp',{start_date:this.state.startdate,end_date:this.state.enddate,status:'M'})}>
                  <Text style={styles.textJudul}>OGP KB</Text>
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
                  <Text style={[styles.textJudul, { marginBottom: 20, alignItems: 'center' }]}>Progress OGP KB &#60; 3 Hari</Text>
                </View>

                <TouchableOpacity style={styles.containerArrowWin2} onPress={() => navigation.navigate('DetailMonitorProgressOgp3',{start_date:this.state.startdate,end_date:this.state.enddate,status:'M'})}>
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

                <TouchableOpacity style={styles.containerArrowWin2} onPress={() => navigation.navigate('DetailMonitorProgressOgp6',{start_date:this.state.startdate,end_date:this.state.enddate,status:'M'})}>
                <View>
                  <Text style={styles.textIsi}>{dataDgsOgp6RevMitra}M</Text>
                  <Text style={styles.textKeterangan}>per {dataDgsOgp6ProjectMitra} Project</Text>
                </View>
                </TouchableOpacity>

              </View>

              <View style={{ flexDirection: 'row', margin: hp('2%'), justifyContent: 'space-between' }}>
                <View style={{ marginBottom: hp('2%') }}>
                  <Text style={[styles.textJudul, { marginBottom: 20, alignItems: 'center' }]}>Progress OGP KB &#62; 7 Hari</Text>
                </View>

                <TouchableOpacity style={styles.containerArrowWin2} onPress={() => navigation.navigate('DetailMonitorProgressOgp7',{start_date:this.state.startdate,end_date:this.state.enddate,status:'M'})}>
                <View>
                  <Text style={styles.textIsi}>{dataDgsOgp7RevMitra}M</Text>
                  <Text style={styles.textKeterangan}>per {dataDgsOgp7ProjectMitra} Project</Text>
                </View>
                </TouchableOpacity>

              </View>
            </View>
          )}

          {renderIf(!statusTelkom)(
            <View style={{ margin: hp('2%') }}>
            <View style={styles.wrapperArrow}>
              <Image
                source={images.Win.arrowWin1}
                style={styles.imageStyle}
                resizeMode={'stretch'}
              />

              <View style={styles.containerArrowWin}>
                <Text style={styles.textJudul}>WIN</Text>
                <Text style={styles.textIsi}>{DgsMonitorTelkom}M</Text>
                <Text style={styles.textKeterangan}>per {DgsMonitorWPTelkom} Project</Text>
              </View>

              <Image
                source={images.Win.arrowWin3}
                style={styles.imageStyle}
                resizeMode={'stretch'}
              />

              <TouchableOpacity style={styles.containerArrowWin2} onPress={() => navigation.navigate('DetailMonitorDone',{start_date:this.state.startdate,end_date:this.state.enddate,status:'T'})}>
                <Text style={styles.textJudul}>Done KB</Text>
                <Text style={styles.textIsi}>{DgsMonitorDoneTelkom}M</Text>
                <Text style={styles.textKeterangan}>per {DgsMonitorDoneWPTelkom} Project</Text>
              </TouchableOpacity>

              <Image
                source={images.arrowGrey}
                style={styles.imageStyle}
                resizeMode={'stretch'}
              />

              <View style={styles.wrapperPresentase}>
                <View style={styles.wrapperTextPresentase}>
                  <Text style={styles.textJudul}>{this.getNum(newValueDoneTelkom)}%</Text>
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
                <Text style={styles.textIsi}>{DgsMonitorTelkom}M</Text>
                <Text style={styles.textKeterangan}>per {DgsMonitorWPTelkom} Project</Text>
              </TouchableOpacity>

              <Image
                source={images.Win.arrowWin3}
                style={styles.imageStyle}
                resizeMode={'stretch'}
              />

              <TouchableOpacity style={styles.containerArrowWin2} onPress={() => navigation.navigate('DetailMonitorOgp',{start_date:this.state.startdate,end_date:this.state.enddate,status:'T'})}>
                <Text style={styles.textJudul}>OGP KB</Text>
                <Text style={styles.textIsi}>{DgsMonitorOgpTelkom}M</Text>
                <Text style={styles.textKeterangan}>per {DgsMonitorOgpWPTelkom} Project</Text>
              </TouchableOpacity>

              <Image
                source={images.arrowGrey}
                style={styles.imageStyle}
                resizeMode={'stretch'}
              />

              <View style={styles.wrapperPresentase}>
                <View style={styles.wrapperTextPresentase}>
                  <Text style={styles.textJudul}>{this.getNum(newValueOgpTelkom)}%</Text>
                </View>
              </View>
            </View>

            <View style={{ flexDirection: 'row', margin: hp('2%'), justifyContent: 'space-between' }}>
              <View style={{ marginBottom: hp('2%') }}>
                <Text style={[styles.textJudul, { marginBottom: 20, alignItems: 'center' }]}>Progress OGP KB &#60; 3 Hari</Text>
              </View>

              <TouchableOpacity style={styles.containerArrowWin2} onPress={() => navigation.navigate('DetailMonitorProgressOgp3',{start_date:this.state.startdate,end_date:this.state.enddate,status:'T'})}>
              <View>
                <Text style={styles.textIsi}>{dataDgsOgp3RevTelkom}M</Text>
                <Text style={styles.textKeterangan}>per {dataDgsOgp3ProjectTelkom} Project</Text>
              </View>
              </TouchableOpacity>

            </View>

            <View style={{ flexDirection: 'row', margin: hp('2%'), justifyContent: 'space-between' }}>
              <View style={{ marginBottom: hp('2%') }}>
                <Text style={[styles.textJudul, { marginBottom: 20, alignItems: 'center' }]}>3 Hari &#60; OGP &#60; 7 Hari</Text>
              </View>

              <TouchableOpacity style={styles.containerArrowWin2} onPress={() => navigation.navigate('DetailMonitorProgressOgp6',{start_date:this.state.startdate,end_date:this.state.enddate,status:'T'})}>
              <View>
                <Text style={styles.textIsi}>{dataDgsOgp6RevTelkom}M</Text>
                <Text style={styles.textKeterangan}>per {dataDgsOgp6ProjectTelkom} Project</Text>
              </View>
              </TouchableOpacity>

            </View>

            <View style={{ flexDirection: 'row', margin: hp('2%'), justifyContent: 'space-between' }}>
              <View style={{ marginBottom: hp('2%') }}>
                <Text style={[styles.textJudul, { marginBottom: 20, alignItems: 'center' }]}>Progress OGP KB &#62; 7 Hari</Text>
              </View>

              <TouchableOpacity style={styles.containerArrowWin2} onPress={() => navigation.navigate('DetailMonitorProgressOgp7',{start_date:this.state.startdate,end_date:this.state.enddate,status:'T'})}>
              <View>
                <Text style={styles.textIsi}>{dataDgsOgp7RevTelkom}M</Text>
                <Text style={styles.textKeterangan}>per {dataDgsOgp7ProjectTelkom} Project</Text>
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
            <Title style={{ color: '#FFF' }}>Monitor KB</Title>
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

  ebisWinREVENUE: state.DbsDetailReducer.winrevEbis,
  ebisWinProject: state.DbsDetailReducer.winprojectEbis,

  DesWinREVENUE: state.DbsDetailReducer.winrevDes,
  DesWinProject: state.DbsDetailReducer.winprojectDes,

  DbsWinREVENUE: state.DbsDetailReducer.winrevDbs,
  DbsWinProject: state.DbsDetailReducer.winprojectDbs,

  DgsWinREVENUE: state.DbsDetailReducer.winrevDgs,
  DgsWinProject: state.DbsDetailReducer.winprojectDgs, 

  //EBIS ALL
  ebisMonitor: state.MonitorEbisReducer.dataEbisWin,
  ebisMonitorWP: state.MonitorEbisReducer.dataEbisWP,

  ebisMonitorDone: state.MonitorEbisReducer.dataEbisDoneWin,
  ebisMonitorDoneWP: state.MonitorEbisReducer.dataEbisDoneWP,
  ebisMonitorOgp: state.MonitorEbisReducer.dataEbisOgpWin,
  ebisMonitorOgpWP: state.MonitorEbisReducer.dataEbisOgpWP,

  dataEbisOgp3Rev: state.MonitorEbisReducer.dataOgp3Rev,
  dataEbisOgp3Project: state.MonitorEbisReducer.dataOgp3Project,
  dataEbisOgp6Rev: state.MonitorEbisReducer.dataOgp6Rev,
  dataEbisOgp6Project: state.MonitorEbisReducer.dataOgp6Project,
  dataEbisOgp7Rev: state.MonitorEbisReducer.dataOgp7Rev,
  dataEbisOgp7Project: state.MonitorEbisReducer.dataOgp7Project,

  //EBIS SUBS
  ebisMonitorSubs: state.MonitorEbisReducer.dataEbisWinSubs,
  ebisMonitorWPSubs: state.MonitorEbisReducer.dataEbisWPSubs,

  ebisMonitorDoneSubs: state.MonitorEbisReducer.dataEbisDoneWinSubs,
  ebisMonitorDoneWPSubs: state.MonitorEbisReducer.dataEbisDoneWPSubs,
  ebisMonitorOgpSubs: state.MonitorEbisReducer.dataEbisOgpWinSubs,
  ebisMonitorOgpWPSubs: state.MonitorEbisReducer.dataEbisOgpWPSubs,

  dataEbisOgp3RevSubs: state.MonitorEbisReducer.dataOgp3RevSubs,
  dataEbisOgp3ProjectSubs: state.MonitorEbisReducer.dataOgp3ProjectSubs,
  dataEbisOgp6RevSubs: state.MonitorEbisReducer.dataOgp6RevSubs,
  dataEbisOgp6ProjectSubs: state.MonitorEbisReducer.dataOgp6ProjectSubs,
  dataEbisOgp7RevSubs: state.MonitorEbisReducer.dataOgp7RevSubs,
  dataEbisOgp7ProjectSubs: state.MonitorEbisReducer.dataOgp7ProjectSubs,

  //EBIS MITRA
  ebisMonitorMitra: state.MonitorEbisReducer.dataEbisWinMitra,
  ebisMonitorWPMitra: state.MonitorEbisReducer.dataEbisWPMitra,

  ebisMonitorDoneMitra: state.MonitorEbisReducer.dataEbisDoneWinMitra,
  ebisMonitorDoneWPMitra: state.MonitorEbisReducer.dataEbisDoneWPMitra,
  ebisMonitorOgpMitra: state.MonitorEbisReducer.dataEbisOgpWinMitra,
  ebisMonitorOgpWPMitra: state.MonitorEbisReducer.dataEbisOgpWPMitra,

  dataEbisOgp3RevMitra: state.MonitorEbisReducer.dataOgp3RevMitra,
  dataEbisOgp3ProjectMitra: state.MonitorEbisReducer.dataOgp3ProjectMitra,
  dataEbisOgp6RevMitra: state.MonitorEbisReducer.dataOgp6RevMitra,
  dataEbisOgp6ProjectMitra: state.MonitorEbisReducer.dataOgp6ProjectMitra,
  dataEbisOgp7RevMitra: state.MonitorEbisReducer.dataOgp7RevMitra,
  dataEbisOgp7ProjectMitra: state.MonitorEbisReducer.dataOgp7ProjectMitra,

  //EBIS TELKOM
  ebisMonitorTelkom: state.MonitorEbisReducer.dataEbisWinTelkom,
  ebisMonitorWPTelkom: state.MonitorEbisReducer.dataEbisWPTelkom,

  ebisMonitorDoneTelkom: state.MonitorEbisReducer.dataEbisDoneWinTelkom,
  ebisMonitorDoneWPTelkom: state.MonitorEbisReducer.dataEbisDoneWPTelkom,
  ebisMonitorOgpTelkom: state.MonitorEbisReducer.dataEbisOgpWinTelkom,
  ebisMonitorOgpWPTelkom: state.MonitorEbisReducer.dataEbisOgpWPTelkom,

  dataEbisOgp3RevTelkom: state.MonitorEbisReducer.dataOgp3RevTelkom,
  dataEbisOgp3ProjectTelkom: state.MonitorEbisReducer.dataOgp3ProjectTelkom,
  dataEbisOgp6RevTelkom: state.MonitorEbisReducer.dataOgp6RevTelkom,
  dataEbisOgp6ProjectTelkom: state.MonitorEbisReducer.dataOgp6ProjectTelkom,
  dataEbisOgp7RevTelkom: state.MonitorEbisReducer.dataOgp7RevTelkom,
  dataEbisOgp7ProjectTelkom: state.MonitorEbisReducer.dataOgp7ProjectTelkom,

  //DES
  //ALL
  DesMonitor: state.MonitorDesReducer.dataDesWin,
  DesMonitorWP: state.MonitorDesReducer.dataDesWP,

  DesMonitorDone: state.MonitorDesReducer.dataDesDoneWin,
  DesMonitorDoneWP: state.MonitorDesReducer.dataDesDoneWP,
  DesMonitorOgp: state.MonitorDesReducer.dataDesOgpWin,
  DesMonitorOgpWP: state.MonitorDesReducer.dataDesOgpWP,

  dataDesOgp3Rev: state.MonitorDesReducer.dataOgp3Rev,
  dataDesOgp3Project: state.MonitorDesReducer.dataOgp3Project,
  dataDesOgp6Rev: state.MonitorDesReducer.dataOgp6Rev,
  dataDesOgp6Project: state.MonitorDesReducer.dataOgp6Project,
  dataDesOgp7Rev: state.MonitorDesReducer.dataOgp7Rev,
  dataDesOgp7Project: state.MonitorDesReducer.dataOgp7Project,

  //SUBS
  DesMonitorSubs: state.MonitorDesReducer.dataDesWinSubs,
  DesMonitorWPSubs: state.MonitorDesReducer.dataDesWPSubs,

  DesMonitorDoneSubs: state.MonitorDesReducer.dataDesDoneWinSubs,
  DesMonitorDoneWPSubs: state.MonitorDesReducer.dataDesDoneWPSubs,
  DesMonitorOgpSubs: state.MonitorDesReducer.dataDesOgpWinSubs,
  DesMonitorOgpWPSubs: state.MonitorDesReducer.dataDesOgpWPSubs,

  dataDesOgp3RevSubs: state.MonitorDesReducer.dataOgp3RevSubs,
  dataDesOgp3ProjectSubs: state.MonitorDesReducer.dataOgp3ProjectSubs,
  dataDesOgp6RevSubs: state.MonitorDesReducer.dataOgp6RevSubs,
  dataDesOgp6ProjectSubs: state.MonitorDesReducer.dataOgp6ProjectSubs,
  dataDesOgp7RevSubs: state.MonitorDesReducer.dataOgp7RevSubs,
  dataDesOgp7ProjectSubs: state.MonitorDesReducer.dataOgp7ProjectSubs,

  //MITRA
  DesMonitorMitra: state.MonitorDesReducer.dataDesWinMitra,
  DesMonitorWPMitra: state.MonitorDesReducer.dataDesWPMitra,

  DesMonitorDoneMitra: state.MonitorDesReducer.dataDesDoneWinMitra,
  DesMonitorDoneWPMitra: state.MonitorDesReducer.dataDesDoneWPMitra,
  DesMonitorOgpMitra: state.MonitorDesReducer.dataDesOgpWinMitra,
  DesMonitorOgpWPMitra: state.MonitorDesReducer.dataDesOgpWPMitra,

  dataDesOgp3RevMitra: state.MonitorDesReducer.dataOgp3RevMitra,
  dataDesOgp3ProjectMitra: state.MonitorDesReducer.dataOgp3ProjectMitra,
  dataDesOgp6RevMitra: state.MonitorDesReducer.dataOgp6RevMitra,
  dataDesOgp6ProjectMitra: state.MonitorDesReducer.dataOgp6ProjectMitra,
  dataDesOgp7RevMitra: state.MonitorDesReducer.dataOgp7RevMitra,
  dataDesOgp7ProjectMitra: state.MonitorDesReducer.dataOgp7ProjectMitra,

  //TELKOM
  DesMonitorTelkom: state.MonitorDesReducer.dataDesWinTelkom,
  DesMonitorWPTelkom: state.MonitorDesReducer.dataDesWPTelkom,

  DesMonitorDoneTelkom: state.MonitorDesReducer.dataDesDoneWinTelkom,
  DesMonitorDoneWPTelkom: state.MonitorDesReducer.dataDesDoneWPTelkom,
  DesMonitorOgpTelkom: state.MonitorDesReducer.dataDesOgpWinTelkom,
  DesMonitorOgpWPTelkom: state.MonitorDesReducer.dataDesOgpWPTelkom,

  dataDesOgp3RevTelkom: state.MonitorDesReducer.dataOgp3RevTelkom,
  dataDesOgp3ProjectTelkom: state.MonitorDesReducer.dataOgp3ProjectTelkom,
  dataDesOgp6RevTelkom: state.MonitorDesReducer.dataOgp6RevTelkom,
  dataDesOgp6ProjectTelkom: state.MonitorDesReducer.dataOgp6ProjectTelkom,
  dataDesOgp7RevTelkom: state.MonitorDesReducer.dataOgp7RevTelkom,
  dataDesOgp7ProjectTelkom: state.MonitorDesReducer.dataOgp7ProjectTelkom,

  //DBS
  //ALL
  DbsMonitor: state.MonitorDbsReducer.dataDbsWin,
  DbsMonitorWP: state.MonitorDbsReducer.dataDbsWP,

  DbsMonitorDone: state.MonitorDbsReducer.dataDbsDoneWin,
  DbsMonitorDoneWP: state.MonitorDbsReducer.dataDbsDoneWP,
  DbsMonitorOgp: state.MonitorDbsReducer.dataDbsOgpWin,
  DbsMonitorOgpWP: state.MonitorDbsReducer.dataDbsOgpWP,

  dataDbsOgp3Rev: state.MonitorDbsReducer.dataOgp3Rev,
  dataDbsOgp3Project: state.MonitorDbsReducer.dataOgp3Project,
  dataDbsOgp6Rev: state.MonitorDbsReducer.dataOgp6Rev,
  dataDbsOgp6Project: state.MonitorDbsReducer.dataOgp6Project,
  dataDbsOgp7Rev: state.MonitorDbsReducer.dataOgp7Rev,
  dataDbsOgp7Project: state.MonitorDbsReducer.dataOgp7Project,

  //SUBS
  DbsMonitorSubs: state.MonitorDbsReducer.dataDbsWinSubs,
  DbsMonitorWPSubs: state.MonitorDbsReducer.dataDbsWPSubs,

  DbsMonitorDoneSubs: state.MonitorDbsReducer.dataDbsDoneWinSubs,
  DbsMonitorDoneWPSubs: state.MonitorDbsReducer.dataDbsDoneWPSubs,
  DbsMonitorOgpSubs: state.MonitorDbsReducer.dataDbsOgpWinSubs,
  DbsMonitorOgpWPSubs: state.MonitorDbsReducer.dataDbsOgpWPSubs,

  dataDbsOgp3RevSubs: state.MonitorDbsReducer.dataOgp3RevSubs,
  dataDbsOgp3ProjectSubs: state.MonitorDbsReducer.dataOgp3ProjectSubs,
  dataDbsOgp6RevSubs: state.MonitorDbsReducer.dataOgp6RevSubs,
  dataDbsOgp6ProjectSubs: state.MonitorDbsReducer.dataOgp6ProjectSubs,
  dataDbsOgp7RevSubs: state.MonitorDbsReducer.dataOgp7RevSubs,
  dataDbsOgp7ProjectSubs: state.MonitorDbsReducer.dataOgp7ProjectSubs,

  //MITRA
  DbsMonitorMitra: state.MonitorDbsReducer.dataDbsWinMitra,
  DbsMonitorWPMitra: state.MonitorDbsReducer.dataDbsWPMitra,

  DbsMonitorDoneMitra: state.MonitorDbsReducer.dataDbsDoneWinMitra,
  DbsMonitorDoneWPMitra: state.MonitorDbsReducer.dataDbsDoneWPMitra,
  DbsMonitorOgpMitra: state.MonitorDbsReducer.dataDbsOgpWinMitra,
  DbsMonitorOgpWPMitra: state.MonitorDbsReducer.dataDbsOgpWPMitra,

  dataDbsOgp3RevMitra: state.MonitorDbsReducer.dataOgp3RevMitra,
  dataDbsOgp3ProjectMitra: state.MonitorDbsReducer.dataOgp3ProjectMitra,
  dataDbsOgp6RevMitra: state.MonitorDbsReducer.dataOgp6RevMitra,
  dataDbsOgp6ProjectMitra: state.MonitorDbsReducer.dataOgp6ProjectMitra,
  dataDbsOgp7RevMitra: state.MonitorDbsReducer.dataOgp7RevMitra,
  dataDbsOgp7ProjectMitra: state.MonitorDbsReducer.dataOgp7ProjectMitra,

  //TELKOM
  DbsMonitorTelkom: state.MonitorDbsReducer.dataDbsWinTelkom,
  DbsMonitorWPTelkom: state.MonitorDbsReducer.dataDbsWPTelkom,

  DbsMonitorDoneTelkom: state.MonitorDbsReducer.dataDbsDoneWinTelkom,
  DbsMonitorDoneWPTelkom: state.MonitorDbsReducer.dataDbsDoneWPTelkom,
  DbsMonitorOgpTelkom: state.MonitorDbsReducer.dataDbsOgpWinTelkom,
  DbsMonitorOgpWPTelkom: state.MonitorDbsReducer.dataDbsOgpWPTelkom,

  dataDbsOgp3RevTelkom: state.MonitorDbsReducer.dataOgp3RevTelkom,
  dataDbsOgp3ProjectTelkom: state.MonitorDbsReducer.dataOgp3ProjectTelkom,
  dataDbsOgp6RevTelkom: state.MonitorDbsReducer.dataOgp6RevTelkom,
  dataDbsOgp6ProjectTelkom: state.MonitorDbsReducer.dataOgp6ProjectTelkom,
  dataDbsOgp7RevTelkom: state.MonitorDbsReducer.dataOgp7RevTelkom,
  dataDbsOgp7ProjectTelkom: state.MonitorDbsReducer.dataOgp7ProjectTelkom,

  //DGS
  //ALL
  DgsMonitor: state.MonitorDgsReducer.dataDgsWin,
  DgsMonitorWP: state.MonitorDgsReducer.dataDgsWP,

  DgsMonitorDone: state.MonitorDgsReducer.dataDgsDoneWin,
  DgsMonitorDoneWP: state.MonitorDgsReducer.dataDgsDoneWP,
  DgsMonitorOgp: state.MonitorDgsReducer.dataDgsOgpWin,
  DgsMonitorOgpWP: state.MonitorDgsReducer.dataDgsOgpWP,

  dataDgsOgp3Rev: state.MonitorDgsReducer.dataOgp3Rev,
  dataDgsOgp3Project: state.MonitorDgsReducer.dataOgp3Project,
  dataDgsOgp6Rev: state.MonitorDgsReducer.dataOgp6Rev,
  dataDgsOgp6Project: state.MonitorDgsReducer.dataOgp6Project,
  dataDgsOgp7Rev: state.MonitorDgsReducer.dataOgp7Rev,
  dataDgsOgp7Project: state.MonitorDgsReducer.dataOgp7Project,

  //SUBS
  DgsMonitorSubs: state.MonitorDgsReducer.dataDgsWinSubs,
  DgsMonitorWPSubs: state.MonitorDgsReducer.dataDgsWPSubs,

  DgsMonitorDoneSubs: state.MonitorDgsReducer.dataDgsDoneWinSubs,
  DgsMonitorDoneWPSubs: state.MonitorDgsReducer.dataDgsDoneWPSubs,
  DgsMonitorOgpSubs: state.MonitorDgsReducer.dataDgsOgpWinSubs,
  DgsMonitorOgpWPSubs: state.MonitorDgsReducer.dataDgsOgpWPSubs,

  dataDgsOgp3RevSubs: state.MonitorDgsReducer.dataOgp3RevSubs,
  dataDgsOgp3ProjectSubs: state.MonitorDgsReducer.dataOgp3ProjectSubs,
  dataDgsOgp6RevSubs: state.MonitorDgsReducer.dataOgp6RevSubs,
  dataDgsOgp6ProjectSubs: state.MonitorDgsReducer.dataOgp6ProjectSubs,
  dataDgsOgp7RevSubs: state.MonitorDgsReducer.dataOgp7RevSubs,
  dataDgsOgp7ProjectSubs: state.MonitorDgsReducer.dataOgp7ProjectSubs,

  //MITRA
  DgsMonitorMitra: state.MonitorDgsReducer.dataDgsWinMitra,
  DgsMonitorWPMitra: state.MonitorDgsReducer.dataDgsWPMitra,

  DgsMonitorDoneMitra: state.MonitorDgsReducer.dataDgsDoneWinMitra,
  DgsMonitorDoneWPMitra: state.MonitorDgsReducer.dataDgsDoneWPMitra,
  DgsMonitorOgpMitra: state.MonitorDgsReducer.dataDgsOgpWinMitra,
  DgsMonitorOgpWPMitra: state.MonitorDgsReducer.dataDgsOgpWPMitra,

  dataDgsOgp3RevMitra: state.MonitorDgsReducer.dataOgp3RevMitra,
  dataDgsOgp3ProjectMitra: state.MonitorDgsReducer.dataOgp3ProjectMitra,
  dataDgsOgp6RevMitra: state.MonitorDgsReducer.dataOgp6RevMitra,
  dataDgsOgp6ProjectMitra: state.MonitorDgsReducer.dataOgp6ProjectMitra,
  dataDgsOgp7RevMitra: state.MonitorDgsReducer.dataOgp7RevMitra,
  dataDgsOgp7ProjectMitra: state.MonitorDgsReducer.dataOgp7ProjectMitra,

  //TELKOM
  DgsMonitorTelkom: state.MonitorDgsReducer.dataDgsWinTelkom,
  DgsMonitorWPTelkom: state.MonitorDgsReducer.dataDgsWPTelkom,

  DgsMonitorDoneTelkom: state.MonitorDgsReducer.dataDgsDoneWinTelkom,
  DgsMonitorDoneWPTelkom: state.MonitorDgsReducer.dataDgsDoneWPTelkom,
  DgsMonitorOgpTelkom: state.MonitorDgsReducer.dataDgsOgpWinTelkom,
  DgsMonitorOgpWPTelkom: state.MonitorDgsReducer.dataDgsOgpWPTelkom,

  dataDgsOgp3RevTelkom: state.MonitorDgsReducer.dataOgp3RevTelkom,
  dataDgsOgp3ProjectTelkom: state.MonitorDgsReducer.dataOgp3ProjectTelkom,
  dataDgsOgp6RevTelkom: state.MonitorDgsReducer.dataOgp6RevTelkom,
  dataDgsOgp6ProjectTelkom: state.MonitorDgsReducer.dataOgp6ProjectTelkom,
  dataDgsOgp7RevTelkom: state.MonitorDgsReducer.dataOgp7RevTelkom,
  dataDgsOgp7ProjectTelkom: state.MonitorDgsReducer.dataOgp7ProjectTelkom,

})

export default connect(mapStateToProps)(MonitorKB);

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
