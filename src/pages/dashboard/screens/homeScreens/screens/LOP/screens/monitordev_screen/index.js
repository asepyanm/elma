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
import RNFetchBlob from 'react-native-fetch-blob'

//global
import renderIf from '../../../../../../../components/renderIf';
import url from '../../../../../../../../config/api_service';

class MonitorDev extends Component {
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
      statusAll: false,
      statusSubs: true,
      statusMitra: true,
      statusTelkom: true,
    }
  }

  componentWillMount(){

    //Monitor DEV
    //EBIS
    this.props.dispatch({
      type: 'MONITOR_DLV_EBIS',      
      payload: RNFetchBlob.config({
        trusty:true
      }). fetch('GET', `${url.API}/ebis_getwinsum/div/EBIS/treg/${this.state.treg}/witel/${this.state.witel}/startdate/${this.state.startdate}/enddate/${this.state.enddate}/type/DELIVERY/nmitra/ALL`)
    })
    this.props.dispatch({
      type: 'MONITOR_DLV_EBIS_SUBS',
      payload: RNFetchBlob.config({
        trusty:true
      }). fetch('GET', `${url.API}/ebis_getwinsum/div/EBIS/treg/${this.state.treg}/witel/${this.state.witel}/startdate/${this.state.startdate}/enddate/${this.state.enddate}/type/DELIVERY/nmitra/CFU`)
    })
    this.props.dispatch({
      type: 'MONITOR_DLV_EBIS_MITRA',
      payload: RNFetchBlob.config({
        trusty:true
      }). fetch('GET', `${url.API}/ebis_getwinsum/div/EBIS/treg/${this.state.treg}/witel/${this.state.witel}/startdate/${this.state.startdate}/enddate/${this.state.enddate}/type/DELIVERY/nmitra/MITRA`)
    })
    this.props.dispatch({
      type: 'MONITOR_DLV_EBIS_TELKOM',
      payload: RNFetchBlob.config({
        trusty:true
      }). fetch('GET', `${url.API}/ebis_getwinsum/div/EBIS/treg/${this.state.treg}/witel/${this.state.witel}/startdate/${this.state.startdate}/enddate/${this.state.enddate}/type/DELIVERY/nmitra/TELKOM`)
    })
    //DES
    this.props.dispatch({
      type: 'MONITOR_DLV_DES',      
      payload: RNFetchBlob.config({
        trusty:true
      }). fetch('GET', `${url.API}/ebis_getwinsum/div/DES/treg/${this.state.treg}/witel/${this.state.witel}/startdate/${this.state.startdate}/enddate/${this.state.enddate}/type/DELIVERY/nmitra/ALL`)
    })
    this.props.dispatch({
      type: 'MONITOR_DLV_DES_SUBS',
      payload: RNFetchBlob.config({
        trusty:true
      }). fetch('GET', `${url.API}/ebis_getwinsum/div/DES/treg/${this.state.treg}/witel/${this.state.witel}/startdate/${this.state.startdate}/enddate/${this.state.enddate}/type/DELIVERY/nmitra/CFU`)
    })
    this.props.dispatch({
      type: 'MONITOR_DLV_DES_MITRA',
      payload: RNFetchBlob.config({
        trusty:true
      }). fetch('GET', `${url.API}/ebis_getwinsum/div/DES/treg/${this.state.treg}/witel/${this.state.witel}/startdate/${this.state.startdate}/enddate/${this.state.enddate}/type/DELIVERY/nmitra/MITRA`)
    })
    this.props.dispatch({
      type: 'MONITOR_DLV_DES_TELKOM',
      payload: RNFetchBlob.config({
        trusty:true
      }). fetch('GET', `${url.API}/ebis_getwinsum/div/DES/treg/${this.state.treg}/witel/${this.state.witel}/startdate/${this.state.startdate}/enddate/${this.state.enddate}/type/DELIVERY/nmitra/TELKOM`)
    })
    //DBS
    this.props.dispatch({
      type: 'MONITOR_DLV_DBS',      
      payload: RNFetchBlob.config({
        trusty:true
      }). fetch('GET', `${url.API}/ebis_getwinsum/div/DBS/treg/${this.state.treg}/witel/${this.state.witel}/startdate/${this.state.startdate}/enddate/${this.state.enddate}/type/DELIVERY/nmitra/ALL`)
    })
    this.props.dispatch({
      type: 'MONITOR_DLV_DBS_SUBS',
      payload: RNFetchBlob.config({
        trusty:true
      }). fetch('GET', `${url.API}/ebis_getwinsum/div/DBS/treg/${this.state.treg}/witel/${this.state.witel}/startdate/${this.state.startdate}/enddate/${this.state.enddate}/type/DELIVERY/nmitra/CFU`)
    })
    this.props.dispatch({
      type: 'MONITOR_DLV_DBS_MITRA',
      payload: RNFetchBlob.config({
        trusty:true
      }). fetch('GET', `${url.API}/ebis_getwinsum/div/DBS/treg/${this.state.treg}/witel/${this.state.witel}/startdate/${this.state.startdate}/enddate/${this.state.enddate}/type/DELIVERY/nmitra/MITRA`)
    })
    this.props.dispatch({
      type: 'MONITOR_DLV_DBS_TELKOM',
      payload: RNFetchBlob.config({
        trusty:true
      }). fetch('GET', `${url.API}/ebis_getwinsum/div/DBS/treg/${this.state.treg}/witel/${this.state.witel}/startdate/${this.state.startdate}/enddate/${this.state.enddate}/type/DELIVERY/nmitra/TELKOM`)
    })
    //DGS
    this.props.dispatch({
      type: 'MONITOR_DLV_DGS',      
      payload: RNFetchBlob.config({
        trusty:true
      }). fetch('GET', `${url.API}/ebis_getwinsum/div/DGS/treg/${this.state.treg}/witel/${this.state.witel}/startdate/${this.state.startdate}/enddate/${this.state.enddate}/type/DELIVERY/nmitra/ALL`)
    })
    this.props.dispatch({
      type: 'MONITOR_DLV_DGS_SUBS',
      payload: RNFetchBlob.config({
        trusty:true
      }). fetch('GET', `${url.API}/ebis_getwinsum/div/DGS/treg/${this.state.treg}/witel/${this.state.witel}/startdate/${this.state.startdate}/enddate/${this.state.enddate}/type/DELIVERY/nmitra/CFU`)
    })
    this.props.dispatch({
      type: 'MONITOR_DLV_DGS_MITRA',
      payload: RNFetchBlob.config({
        trusty:true
      }). fetch('GET', `${url.API}/ebis_getwinsum/div/DGS/treg/${this.state.treg}/witel/${this.state.witel}/startdate/${this.state.startdate}/enddate/${this.state.enddate}/type/DELIVERY/nmitra/MITRA`)
    })
    this.props.dispatch({
      type: 'MONITOR_DLV_DGS_TELKOM',
      payload: RNFetchBlob.config({
        trusty:true
      }). fetch('GET', `${url.API}/ebis_getwinsum/div/DGS/treg/${this.state.treg}/witel/${this.state.witel}/startdate/${this.state.startdate}/enddate/${this.state.enddate}/type/DELIVERY/nmitra/TELKOM`)
    })
    
    //EBIS DONE
    this.props.dispatch({
      type: 'MONITOR_DLV_EBIS_DONE',
      payload: RNFetchBlob.config({
        trusty:true
      }). fetch('GET', `${url.API}/ebis_getdeliverystatesum/div/EBIS/treg/${this.state.treg}/witel/${this.state.witel}/startdate/${this.state.startdate}/enddate/${this.state.enddate}/nmitra/ALL`)
    })
    this.props.dispatch({
      type: 'MONITOR_DLV_EBIS_DONE_SUBS',
      payload: RNFetchBlob.config({
        trusty:true
      }). fetch('GET', `${url.API}/ebis_getdeliverystatesum/div/EBIS/treg/${this.state.treg}/witel/${this.state.witel}/startdate/${this.state.startdate}/enddate/${this.state.enddate}/nmitra/CFU`)
    })
    this.props.dispatch({
      type: 'MONITOR_DLV_EBIS_DONE_MITRA',
      payload: RNFetchBlob.config({
        trusty:true
      }). fetch('GET', `${url.API}/ebis_getdeliverystatesum/div/EBIS/treg/${this.state.treg}/witel/${this.state.witel}/startdate/${this.state.startdate}/enddate/${this.state.enddate}/nmitra/MITRA`)
    })
    this.props.dispatch({
      type: 'MONITOR_DLV_EBIS_DONE_TELKOM',
      payload: RNFetchBlob.config({
        trusty:true
      }). fetch('GET', `${url.API}/ebis_getdeliverystatesum/div/EBIS/treg/${this.state.treg}/witel/${this.state.witel}/startdate/${this.state.startdate}/enddate/${this.state.enddate}/nmitra/TELKOM`)
    })

    //DES DONE
    this.props.dispatch({
      type: 'MONITOR_DLV_DES_DONE',
      payload: RNFetchBlob.config({
        trusty:true
      }). fetch('GET', `${url.API}/ebis_getdeliverystatesum/div/DES/treg/${this.state.treg}/witel/${this.state.witel}/startdate/${this.state.startdate}/enddate/${this.state.enddate}/nmitra/ALL`)
    })
    this.props.dispatch({
      type: 'MONITOR_DLV_DES_DONE_SUBS',
      payload: RNFetchBlob.config({
        trusty:true
      }). fetch('GET', `${url.API}/ebis_getdeliverystatesum/div/DES/treg/${this.state.treg}/witel/${this.state.witel}/startdate/${this.state.startdate}/enddate/${this.state.enddate}/nmitra/CFU`)
    })
    this.props.dispatch({
      type: 'MONITOR_DLV_DES_DONE_MITRA',
      payload: RNFetchBlob.config({
        trusty:true
      }). fetch('GET', `${url.API}/ebis_getdeliverystatesum/div/DES/treg/${this.state.treg}/witel/${this.state.witel}/startdate/${this.state.startdate}/enddate/${this.state.enddate}/nmitra/MITRA`)
    })
    this.props.dispatch({
      type: 'MONITOR_DLV_DES_DONE_TELKOM',
      payload: RNFetchBlob.config({
        trusty:true
      }). fetch('GET', `${url.API}/ebis_getdeliverystatesum/div/DES/treg/${this.state.treg}/witel/${this.state.witel}/startdate/${this.state.startdate}/enddate/${this.state.enddate}/nmitra/TELKOM`)
    })

    //DBS DONE
    this.props.dispatch({
      type: 'MONITOR_DLV_DBS_DONE',
      payload: RNFetchBlob.config({
        trusty:true
      }). fetch('GET', `${url.API}/ebis_getdeliverystatesum/div/DBS/treg/${this.state.treg}/witel/${this.state.witel}/startdate/${this.state.startdate}/enddate/${this.state.enddate}/nmitra/ALL`)
    })
    this.props.dispatch({
      type: 'MONITOR_DLV_DBS_DONE_SUBS',
      payload: RNFetchBlob.config({
        trusty:true
      }). fetch('GET', `${url.API}/ebis_getdeliverystatesum/div/DBS/treg/${this.state.treg}/witel/${this.state.witel}/startdate/${this.state.startdate}/enddate/${this.state.enddate}/nmitra/CFU`)
    })
    this.props.dispatch({
      type: 'MONITOR_DLV_DBS_DONE_MITRA',
      payload: RNFetchBlob.config({
        trusty:true
      }). fetch('GET', `${url.API}/ebis_getdeliverystatesum/div/DBS/treg/${this.state.treg}/witel/${this.state.witel}/startdate/${this.state.startdate}/enddate/${this.state.enddate}/nmitra/MITRA`)
    })
    this.props.dispatch({
      type: 'MONITOR_DLV_DBS_DONE_TELKOM',
      payload: RNFetchBlob.config({
        trusty:true
      }). fetch('GET', `${url.API}/ebis_getdeliverystatesum/div/DBS/treg/${this.state.treg}/witel/${this.state.witel}/startdate/${this.state.startdate}/enddate/${this.state.enddate}/nmitra/TELKOM`)
    })

    //DGS DONE
    this.props.dispatch({
      type: 'MONITOR_DLV_DGS_DONE',
      payload: RNFetchBlob.config({
        trusty:true
      }). fetch('GET', `${url.API}/ebis_getdeliverystatesum/div/DGS/treg/${this.state.treg}/witel/${this.state.witel}/startdate/${this.state.startdate}/enddate/${this.state.enddate}/nmitra/ALL`)
    })
    this.props.dispatch({
      type: 'MONITOR_DLV_DGS_DONE_SUBS',
      payload: RNFetchBlob.config({
        trusty:true
      }). fetch('GET', `${url.API}/ebis_getdeliverystatesum/div/DGS/treg/${this.state.treg}/witel/${this.state.witel}/startdate/${this.state.startdate}/enddate/${this.state.enddate}/nmitra/CFU`)
    })
    this.props.dispatch({
      type: 'MONITOR_DLV_DGS_DONE_MITRA',
      payload: RNFetchBlob.config({
        trusty:true
      }). fetch('GET', `${url.API}/ebis_getdeliverystatesum/div/DGS/treg/${this.state.treg}/witel/${this.state.witel}/startdate/${this.state.startdate}/enddate/${this.state.enddate}/nmitra/MITRA`)
    })
    this.props.dispatch({
      type: 'MONITOR_DLV_DGS_DONE_TELKOM',
      payload: RNFetchBlob.config({
        trusty:true
      }). fetch('GET', `${url.API}/ebis_getdeliverystatesum/div/DGS/treg/${this.state.treg}/witel/${this.state.witel}/startdate/${this.state.startdate}/enddate/${this.state.enddate}/nmitra/TELKOM`)
    })

    //EBIS OGP DATA
    this.props.dispatch({
      type: 'MONITOR_DLV_EBIS_OGP_DATA',
      payload: RNFetchBlob.config({
        trusty:true
      }). fetch('GET', `${url.API}/ebis_getdeliverysumperiod/div/EBIS/treg/${this.state.treg}/witel/${this.state.witel}/startdate/${this.state.startdate}/enddate/${this.state.enddate}/nmitra/ALL`)
    })
    this.props.dispatch({
      type: 'MONITOR_DLV_EBIS_OGP_DATA_SUBS',
      payload: RNFetchBlob.config({
        trusty:true
      }). fetch('GET', `${url.API}/ebis_getdeliverysumperiod/div/EBIS/treg/${this.state.treg}/witel/${this.state.witel}/startdate/${this.state.startdate}/enddate/${this.state.enddate}/nmitra/CFU`)
    })
    this.props.dispatch({
      type: 'MONITOR_DLV_EBIS_OGP_DATA_MITRA',
      payload: RNFetchBlob.config({
        trusty:true
      }). fetch('GET', `${url.API}/ebis_getdeliverysumperiod/div/EBIS/treg/${this.state.treg}/witel/${this.state.witel}/startdate/${this.state.startdate}/enddate/${this.state.enddate}/nmitra/MITRA`)
    })
    this.props.dispatch({
      type: 'MONITOR_DLV_EBIS_OGP_DATA_TELKOM',
      payload: RNFetchBlob.config({
        trusty:true
      }). fetch('GET', `${url.API}/ebis_getdeliverysumperiod/div/EBIS/treg/${this.state.treg}/witel/${this.state.witel}/startdate/${this.state.startdate}/enddate/${this.state.enddate}/nmitra/TELKOM`)
    })

    //DES OGP DATA
    this.props.dispatch({
      type: 'MONITOR_DLV_DES_OGP_DATA',
      payload: RNFetchBlob.config({
        trusty:true
      }). fetch('GET', `${url.API}/ebis_getdeliverysumperiod/div/DES/treg/${this.state.treg}/witel/${this.state.witel}/startdate/${this.state.startdate}/enddate/${this.state.enddate}/nmitra/ALL`)
    })
    this.props.dispatch({
      type: 'MONITOR_DLV_DES_OGP_DATA_SUBS',
      payload: RNFetchBlob.config({
        trusty:true
      }). fetch('GET', `${url.API}/ebis_getdeliverysumperiod/div/DES/treg/${this.state.treg}/witel/${this.state.witel}/startdate/${this.state.startdate}/enddate/${this.state.enddate}/nmitra/CFU`)
    })
    this.props.dispatch({
      type: 'MONITOR_DLV_DES_OGP_DATA_MITRA',
      payload: RNFetchBlob.config({
        trusty:true
      }). fetch('GET', `${url.API}/ebis_getdeliverysumperiod/div/DES/treg/${this.state.treg}/witel/${this.state.witel}/startdate/${this.state.startdate}/enddate/${this.state.enddate}/nmitra/MITRA`)
    })
    this.props.dispatch({
      type: 'MONITOR_DLV_DES_OGP_DATA_TELKOM',
      payload: RNFetchBlob.config({
        trusty:true
      }). fetch('GET', `${url.API}/ebis_getdeliverysumperiod/div/DES/treg/${this.state.treg}/witel/${this.state.witel}/startdate/${this.state.startdate}/enddate/${this.state.enddate}/nmitra/TELKOM`)
    })

    //DBS OGP DATA
    this.props.dispatch({
      type: 'MONITOR_DLV_DBS_OGP_DATA',
      payload: RNFetchBlob.config({
        trusty:true
      }). fetch('GET', `${url.API}/ebis_getdeliverysumperiod/div/DBS/treg/${this.state.treg}/witel/${this.state.witel}/startdate/${this.state.startdate}/enddate/${this.state.enddate}/nmitra/ALL`)
    })
    this.props.dispatch({
      type: 'MONITOR_DLV_DBS_OGP_DATA_SUBS',
      payload: RNFetchBlob.config({
        trusty:true
      }). fetch('GET', `${url.API}/ebis_getdeliverysumperiod/div/DBS/treg/${this.state.treg}/witel/${this.state.witel}/startdate/${this.state.startdate}/enddate/${this.state.enddate}/nmitra/CFU`)
    })
    this.props.dispatch({
      type: 'MONITOR_DLV_DBS_OGP_DATA_MITRA',
      payload: RNFetchBlob.config({
        trusty:true
      }). fetch('GET', `${url.API}/ebis_getdeliverysumperiod/div/DBS/treg/${this.state.treg}/witel/${this.state.witel}/startdate/${this.state.startdate}/enddate/${this.state.enddate}/nmitra/MITRA`)
    })
    this.props.dispatch({
      type: 'MONITOR_DLV_DBS_OGP_DATA_TELKOM',
      payload: RNFetchBlob.config({
        trusty:true
      }). fetch('GET', `${url.API}/ebis_getdeliverysumperiod/div/DBS/treg/${this.state.treg}/witel/${this.state.witel}/startdate/${this.state.startdate}/enddate/${this.state.enddate}/nmitra/TELKOM`)
    })

    //DGS OGP DATA
    this.props.dispatch({
      type: 'MONITOR_DLV_DGS_OGP_DATA',
      payload: RNFetchBlob.config({
        trusty:true
      }). fetch('GET', `${url.API}/ebis_getdeliverysumperiod/div/DGS/treg/${this.state.treg}/witel/${this.state.witel}/startdate/${this.state.startdate}/enddate/${this.state.enddate}/nmitra/ALL`)
    })
    this.props.dispatch({
      type: 'MONITOR_DLV_DGS_OGP_DATA_SUBS',
      payload: RNFetchBlob.config({
        trusty:true
      }). fetch('GET', `${url.API}/ebis_getdeliverysumperiod/div/DGS/treg/${this.state.treg}/witel/${this.state.witel}/startdate/${this.state.startdate}/enddate/${this.state.enddate}/nmitra/CFU`)
    })
    this.props.dispatch({
      type: 'MONITOR_DLV_DGS_OGP_DATA_MITRA',
      payload: RNFetchBlob.config({
        trusty:true
      }). fetch('GET', `${url.API}/ebis_getdeliverysumperiod/div/DGS/treg/${this.state.treg}/witel/${this.state.witel}/startdate/${this.state.startdate}/enddate/${this.state.enddate}/nmitra/MITRA`)
    })
    this.props.dispatch({
      type: 'MONITOR_DLV_DGS_OGP_DATA_TELKOM',
      payload: RNFetchBlob.config({
        trusty:true
      }). fetch('GET', `${url.API}/ebis_getdeliverysumperiod/div/DGS/treg/${this.state.treg}/witel/${this.state.witel}/startdate/${this.state.startdate}/enddate/${this.state.enddate}/nmitra/TELKOM`)
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

                <TouchableOpacity style={styles.containerArrowWin2}>
                  <Text style={styles.textJudul}>Dlv Non Mitra</Text>
                  <Text style={styles.textIsi}>{Math.max(0,ebisMonitor-ebisMonitorDone).toFixed(2)}M</Text>
                  <Text style={styles.textKeterangan}>per {Math.max(0,Math.ceil(ebisMonitorWP-ebisMonitorDoneWP))} Project</Text>
                </TouchableOpacity>

                <Image
                  source={images.arrowGrey}
                  style={styles.imageStyle}
                  resizeMode={'stretch'}
                />

                <View style={styles.wrapperPresentase}>
                  <View style={styles.wrapperTextPresentase}>
                    <Text style={styles.textJudul}>{this.getNum(Math.max(0,100-newValueDone))}%</Text>
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

                <TouchableOpacity style={styles.containerArrowWin2} onPress={() => navigation.navigate('DetailMonitorDev',{treg:this.state.treg,witel:this.state.witel,start_date:this.state.startdate,end_date:this.state.enddate,status:'A'})}>
                  <Text style={styles.textJudul}>Delivery Mitra</Text>
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

              <View style={{ flexDirection: 'row', margin: hp('2%'), justifyContent: 'space-between' }}>
                <View style={{ marginBottom: hp('2%') }}>
                  <Text style={[styles.textJudul, { marginBottom: 20, alignItems: 'center' }]}>On Schedule Delivery</Text>
                </View>

                <TouchableOpacity style={styles.containerArrowWin2} onPress={() => navigation.navigate('DetailMonitorProgressOnSchedule',{treg:this.state.treg,witel:this.state.witel,start_date:this.state.startdate,end_date:this.state.enddate,status:'A'})}>
                <View>
                  <Text style={styles.textIsi}>{dataEbisOgp3Rev}M</Text>
                  <Text style={styles.textKeterangan}>per {dataEbisOgp3Project} Project</Text>
                </View>
                </TouchableOpacity>
              </View>

              <View style={{ flexDirection: 'row', margin: hp('2%'), justifyContent: 'space-between' }}>
                <View style={{ marginBottom: hp('2%') }}>
                  <Text style={[styles.textJudul, { marginBottom: 20, alignItems: 'center' }]}>Delay Delivery</Text>
                </View>

                <TouchableOpacity style={styles.containerArrowWin2} onPress={() => navigation.navigate('DetailMonitorProgressDelay',{treg:this.state.treg,witel:this.state.witel,start_date:this.state.startdate,end_date:this.state.enddate,status:'A'})}>
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

                <TouchableOpacity style={styles.containerArrowWin2}>
                  <Text style={styles.textJudul}>Dlv Non Mitra</Text>
                  <Text style={styles.textIsi}>{Math.max(0,ebisMonitorSubs-ebisMonitorDoneSubs).toFixed(2)}M</Text>
                  <Text style={styles.textKeterangan}>per {Math.max(0,Math.ceil(ebisMonitorWPSubs-ebisMonitorDoneWPSubs))} Project</Text>
                </TouchableOpacity>

                <Image
                  source={images.arrowGrey}
                  style={styles.imageStyle}
                  resizeMode={'stretch'}
                />

                <View style={styles.wrapperPresentase}>
                  <View style={styles.wrapperTextPresentase}>
                    <Text style={styles.textJudul}>{this.getNum(Math.max(0,100-newValueDoneSubs))}%</Text>
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

                <TouchableOpacity style={styles.containerArrowWin2} onPress={() => navigation.navigate('DetailMonitorDev',{treg:this.state.treg,witel:this.state.witel,start_date:this.state.startdate,end_date:this.state.enddate,status:'S'})}>
                  <Text style={styles.textJudul}>Delivery Mitra</Text>
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

              <View style={{ flexDirection: 'row', margin: hp('2%'), justifyContent: 'space-between' }}>
                <View style={{ marginBottom: hp('2%') }}>
                  <Text style={[styles.textJudul, { marginBottom: 20, alignItems: 'center' }]}>On Schedule Delivery</Text>
                </View>

                <TouchableOpacity style={styles.containerArrowWin2} onPress={() => navigation.navigate('DetailMonitorProgressOnShedule',{treg:this.state.treg,witel:this.state.witel,start_date:this.state.startdate,end_date:this.state.enddate,status:'S'})}>
                <View>
                  <Text style={styles.textIsi}>{dataEbisOgp3RevSubs}M</Text>
                  <Text style={styles.textKeterangan}>per {dataEbisOgp3ProjectSubs} Project</Text>
                </View>
                </TouchableOpacity>
              </View>

              <View style={{ flexDirection: 'row', margin: hp('2%'), justifyContent: 'space-between' }}>
                <View style={{ marginBottom: hp('2%') }}>
                  <Text style={[styles.textJudul, { marginBottom: 20, alignItems: 'center' }]}>Delay Delivery</Text>
                </View>

                <TouchableOpacity style={styles.containerArrowWin2} onPress={() => navigation.navigate('DetailMonitorProgressDelay',{treg:this.state.treg,witel:this.state.witel,start_date:this.state.startdate,end_date:this.state.enddate,status:'S'})}>
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

              <TouchableOpacity style={styles.containerArrowWin2}>
                <Text style={styles.textJudul}>Dlv Non Mitra</Text>
                <Text style={styles.textIsi}>{Math.max(0,ebisMonitorMitra-ebisMonitorDoneMitra).toFixed(2)}M</Text>
                <Text style={styles.textKeterangan}>per {Math.max(0,Math.ceil(ebisMonitorWPMitra-ebisMonitorDoneWPMitra))} Project</Text>
              </TouchableOpacity>

              <Image
                source={images.arrowGrey}
                style={styles.imageStyle}
                resizeMode={'stretch'}
              />

              <View style={styles.wrapperPresentase}>
                <View style={styles.wrapperTextPresentase}>
                  <Text style={styles.textJudul}>{this.getNum(Math.max(0,100-newValueDoneMitra))}%</Text>
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

              <TouchableOpacity style={styles.containerArrowWin2} onPress={() => navigation.navigate('DetailMonitorDev',{treg:this.state.treg,witel:this.state.witel,start_date:this.state.startdate,end_date:this.state.enddate,status:'A'})}>
                <Text style={styles.textJudul}>Delivery Mitra</Text>
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

            <View style={{ flexDirection: 'row', margin: hp('2%'), justifyContent: 'space-between' }}>
              <View style={{ marginBottom: hp('2%') }}>
                <Text style={[styles.textJudul, { marginBottom: 20, alignItems: 'center' }]}>On Schedule Delivery</Text>
              </View>

              <TouchableOpacity style={styles.containerArrowWin2} onPress={() => navigation.navigate('DetailMonitorProgressOnSchedule',{treg:this.state.treg,witel:this.state.witel,start_date:this.state.startdate,end_date:this.state.enddate,status:'A'})}>
              <View>
                <Text style={styles.textIsi}>{dataEbisOgp3RevMitra}M</Text>
                <Text style={styles.textKeterangan}>per {dataEbisOgp3ProjectMitra} Project</Text>
              </View>
              </TouchableOpacity>
            </View>

            <View style={{ flexDirection: 'row', margin: hp('2%'), justifyContent: 'space-between' }}>
              <View style={{ marginBottom: hp('2%') }}>
                <Text style={[styles.textJudul, { marginBottom: 20, alignItems: 'center' }]}>Delay Delivery</Text>
              </View>

              <TouchableOpacity style={styles.containerArrowWin2} onPress={() => navigation.navigate('DetailMonitorProgressDelay',{treg:this.state.treg,witel:this.state.witel,start_date:this.state.startdate,end_date:this.state.enddate,status:'A'})}>
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

              <TouchableOpacity style={styles.containerArrowWin2}>
                <Text style={styles.textJudul}>Dlv Non Mitra</Text>
                <Text style={styles.textIsi}>{Math.max(0,ebisMonitorTelkom-ebisMonitorDoneTelkom).toFixed(2)}M</Text>
                <Text style={styles.textKeterangan}>per {Math.max(0,Math.ceil(ebisMonitorWPTelkom-ebisMonitorDoneWPTelkom))} Project</Text>
              </TouchableOpacity>

              <Image
                source={images.arrowGrey}
                style={styles.imageStyle}
                resizeMode={'stretch'}
              />

              <View style={styles.wrapperPresentase}>
                <View style={styles.wrapperTextPresentase}>
                  <Text style={styles.textJudul}>{this.getNum(Math.max(0,100-newValueDoneTelkom))}%</Text>
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

              <TouchableOpacity style={styles.containerArrowWin2} onPress={() => navigation.navigate('DetailMonitorDev',{treg:this.state.treg,witel:this.state.witel,start_date:this.state.startdate,end_date:this.state.enddate,status:'A'})}>
                <Text style={styles.textJudul}>Delivery Mitra</Text>
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

            <View style={{ flexDirection: 'row', margin: hp('2%'), justifyContent: 'space-between' }}>
              <View style={{ marginBottom: hp('2%') }}>
                <Text style={[styles.textJudul, { marginBottom: 20, alignItems: 'center' }]}>On Schedule Delivery</Text>
              </View>

              <TouchableOpacity style={styles.containerArrowWin2} onPress={() => navigation.navigate('DetailMonitorProgressOnSchedule',{treg:this.state.treg,witel:this.state.witel,start_date:this.state.startdate,end_date:this.state.enddate,status:'A'})}>
              <View>
                <Text style={styles.textIsi}>{dataEbisOgp3RevTelkom}M</Text>
                <Text style={styles.textKeterangan}>per {dataEbisOgp3ProjectTelkom} Project</Text>
              </View>
              </TouchableOpacity>
            </View>

            <View style={{ flexDirection: 'row', margin: hp('2%'), justifyContent: 'space-between' }}>
              <View style={{ marginBottom: hp('2%') }}>
                <Text style={[styles.textJudul, { marginBottom: 20, alignItems: 'center' }]}>Delay Delivery</Text>
              </View>

              <TouchableOpacity style={styles.containerArrowWin2} onPress={() => navigation.navigate('DetailMonitorProgressDelay',{treg:this.state.treg,witel:this.state.witel,start_date:this.state.startdate,end_date:this.state.enddate,status:'A'})}>
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

    const item = this.props.data;

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
    const valuePresentaseOgpMitra= (parseInt(DesMonitorOgpMitra) / parseInt(DesMonitorMitra)) * 100;
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

          <TouchableOpacity style={styles.containerArrowWin}>
            <Text style={styles.textJudul}>WIN</Text>
            <Text style={styles.textIsi}>{DesWinREVENUE}M</Text>
            <Text style={styles.textKeterangan}>per {DesWinProject} Project</Text>
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
                  <Text style={styles.textIsi}>{DesMonitor}M</Text>
                  <Text style={styles.textKeterangan}>per {DesMonitorWP} Project</Text>
                </View>

                <Image
                  source={images.Win.arrowWin3}
                  style={styles.imageStyle}
                  resizeMode={'stretch'}
                />

                <TouchableOpacity style={styles.containerArrowWin2}>
                  <Text style={styles.textJudul}>Dlv Non Mitra</Text>
                  <Text style={styles.textIsi}>{Math.max(0,DesMonitor-DesMonitorDone).toFixed(2)}M</Text>
                  <Text style={styles.textKeterangan}>per {Math.max(0,Math.ceil(DesMonitorWP-DesMonitorDoneWP))} Project</Text>
                </TouchableOpacity>

                <Image
                  source={images.arrowGrey}
                  style={styles.imageStyle}
                  resizeMode={'stretch'}
                />

                <View style={styles.wrapperPresentase}>
                  <View style={styles.wrapperTextPresentase}>
                    <Text style={styles.textJudul}>{this.getNum(Math.max(0,100-newValueDone))}%</Text>
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
                  <Text style={styles.textIsi}>{DesMonitor}M</Text>
                  <Text style={styles.textKeterangan}>per {DesMonitorWP} Project</Text>
                </View>

                <Image
                  source={images.Win.arrowWin3}
                  style={styles.imageStyle}
                  resizeMode={'stretch'}
                />

                <TouchableOpacity style={styles.containerArrowWin2} onPress={() => navigation.navigate('DetailMonitorDev',{start_date:this.state.startdate,end_date:this.state.enddate,status:'A'})}>
                  <Text style={styles.textJudul}>Delivery Mitra</Text>
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

              <View style={{ flexDirection: 'row', margin: hp('2%'), justifyContent: 'space-between' }}>
                <View style={{ marginBottom: hp('2%') }}>
                  <Text style={[styles.textJudul, { marginBottom: 20, alignItems: 'center' }]}>On Schedule Delivery</Text>
                </View>

                <TouchableOpacity style={styles.containerArrowWin2} onPress={() => navigation.navigate('DetailMonitorProgressOnSchedule',{start_date:this.state.startdate,end_date:this.state.enddate,status:'A'})}>
                <View>
                  <Text style={styles.textIsi}>{dataDesOgp3Rev}M</Text>
                  <Text style={styles.textKeterangan}>per {dataDesOgp3Project} Project</Text>
                </View>
                </TouchableOpacity>
              </View>

              <View style={{ flexDirection: 'row', margin: hp('2%'), justifyContent: 'space-between' }}>
                <View style={{ marginBottom: hp('2%') }}>
                  <Text style={[styles.textJudul, { marginBottom: 20, alignItems: 'center' }]}>Delay Delivery</Text>
                </View>

                <TouchableOpacity style={styles.containerArrowWin2} onPress={() => navigation.navigate('DetailMonitorProgressDelay',{start_date:this.state.startdate,end_date:this.state.enddate,status:'A'})}>
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

                <TouchableOpacity style={styles.containerArrowWin2}>
                  <Text style={styles.textJudul}>Dlv Non Mitra</Text>
                  <Text style={styles.textIsi}>{Math.max(0,DesMonitorSubs-DesMonitorDoneSubs).toFixed(2)}M</Text>
                  <Text style={styles.textKeterangan}>per {Math.max(0,Math.ceil(DesMonitorWPSubs-DesMonitorDoneWPSubs))} Project</Text>
                </TouchableOpacity>

                <Image
                  source={images.arrowGrey}
                  style={styles.imageStyle}
                  resizeMode={'stretch'}
                />

                <View style={styles.wrapperPresentase}>
                  <View style={styles.wrapperTextPresentase}>
                    <Text style={styles.textJudul}>{this.getNum(Math.max(0,100-newValueDoneSubs))}%</Text>
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
                  <Text style={styles.textIsi}>{DesMonitorSubs}M</Text>
                  <Text style={styles.textKeterangan}>per {DesMonitorWPSubs} Project</Text>
                </View>

                <Image
                  source={images.Win.arrowWin3}
                  style={styles.imageStyle}
                  resizeMode={'stretch'}
                />

                <TouchableOpacity style={styles.containerArrowWin2} onPress={() => navigation.navigate('DetailMonitorDev',{start_date:this.state.startdate,end_date:this.state.enddate,status:'S'})}>
                  <Text style={styles.textJudul}>Delivery Mitra</Text>
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

              <View style={{ flexDirection: 'row', margin: hp('2%'), justifyContent: 'space-between' }}>
                <View style={{ marginBottom: hp('2%') }}>
                  <Text style={[styles.textJudul, { marginBottom: 20, alignItems: 'center' }]}>On Schedule Delivery</Text>
                </View>

                <TouchableOpacity style={styles.containerArrowWin2} onPress={() => navigation.navigate('DetailMonitorProgressOnShedule',{start_date:this.state.startdate,end_date:this.state.enddate,status:'S'})}>
                <View>
                  <Text style={styles.textIsi}>{dataDesOgp3RevSubs}M</Text>
                  <Text style={styles.textKeterangan}>per {dataDesOgp3ProjectSubs} Project</Text>
                </View>
                </TouchableOpacity>
              </View>

              <View style={{ flexDirection: 'row', margin: hp('2%'), justifyContent: 'space-between' }}>
                <View style={{ marginBottom: hp('2%') }}>
                  <Text style={[styles.textJudul, { marginBottom: 20, alignItems: 'center' }]}>Delay Delivery</Text>
                </View>

                <TouchableOpacity style={styles.containerArrowWin2} onPress={() => navigation.navigate('DetailMonitorProgressDelay',{start_date:this.state.startdate,end_date:this.state.enddate,status:'S'})}>
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

              <TouchableOpacity style={styles.containerArrowWin2}>
                <Text style={styles.textJudul}>Dlv Non Mitra</Text>
                <Text style={styles.textIsi}>{Math.max(0,DesMonitorMitra-DesMonitorDoneMitra).toFixed(2)}M</Text>
                <Text style={styles.textKeterangan}>per {Math.max(0,Math.ceil(DesMonitorWPMitra-DesMonitorDoneWPMitra))} Project</Text>
              </TouchableOpacity>

              <Image
                source={images.arrowGrey}
                style={styles.imageStyle}
                resizeMode={'stretch'}
              />

              <View style={styles.wrapperPresentase}>
                <View style={styles.wrapperTextPresentase}>
                  <Text style={styles.textJudul}>{this.getNum(Math.max(0,100-newValueDoneMitra))}%</Text>
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
                <Text style={styles.textIsi}>{DesMonitorMitra}M</Text>
                <Text style={styles.textKeterangan}>per {DesMonitorWPMitra} Project</Text>
              </View>

              <Image
                source={images.Win.arrowWin3}
                style={styles.imageStyle}
                resizeMode={'stretch'}
              />

              <TouchableOpacity style={styles.containerArrowWin2} onPress={() => navigation.navigate('DetailMonitorDev',{start_date:this.state.startdate,end_date:this.state.enddate,status:'A'})}>
                <Text style={styles.textJudul}>Delivery Mitra</Text>
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

            <View style={{ flexDirection: 'row', margin: hp('2%'), justifyContent: 'space-between' }}>
              <View style={{ marginBottom: hp('2%') }}>
                <Text style={[styles.textJudul, { marginBottom: 20, alignItems: 'center' }]}>On Schedule Delivery</Text>
              </View>

              <TouchableOpacity style={styles.containerArrowWin2} onPress={() => navigation.navigate('DetailMonitorProgressOnSchedule',{start_date:this.state.startdate,end_date:this.state.enddate,status:'A'})}>
              <View>
                <Text style={styles.textIsi}>{dataDesOgp3RevMitra}M</Text>
                <Text style={styles.textKeterangan}>per {dataDesOgp3ProjectMitra} Project</Text>
              </View>
              </TouchableOpacity>
            </View>

            <View style={{ flexDirection: 'row', margin: hp('2%'), justifyContent: 'space-between' }}>
              <View style={{ marginBottom: hp('2%') }}>
                <Text style={[styles.textJudul, { marginBottom: 20, alignItems: 'center' }]}>Delay Delivery</Text>
              </View>

              <TouchableOpacity style={styles.containerArrowWin2} onPress={() => navigation.navigate('DetailMonitorProgressDelay',{start_date:this.state.startdate,end_date:this.state.enddate,status:'A'})}>
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

              <TouchableOpacity style={styles.containerArrowWin2}>
                <Text style={styles.textJudul}>Dlv Non Mitra</Text>
                <Text style={styles.textIsi}>{Math.max(0,DesMonitorTelkom-DesMonitorDoneTelkom).toFixed(2)}M</Text>
                <Text style={styles.textKeterangan}>per {Math.max(0,Math.ceil(DesMonitorWPTelkom-DesMonitorDoneWPTelkom))} Project</Text>
              </TouchableOpacity>

              <Image
                source={images.arrowGrey}
                style={styles.imageStyle}
                resizeMode={'stretch'}
              />

              <View style={styles.wrapperPresentase}>
                <View style={styles.wrapperTextPresentase}>
                  <Text style={styles.textJudul}>{this.getNum(Math.max(0,100-newValueDoneTelkom))}%</Text>
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
                <Text style={styles.textIsi}>{DesMonitorTelkom}M</Text>
                <Text style={styles.textKeterangan}>per {DesMonitorWPTelkom} Project</Text>
              </View>

              <Image
                source={images.Win.arrowWin3}
                style={styles.imageStyle}
                resizeMode={'stretch'}
              />

              <TouchableOpacity style={styles.containerArrowWin2} onPress={() => navigation.navigate('DetailMonitorDev',{start_date:this.state.startdate,end_date:this.state.enddate,status:'A'})}>
                <Text style={styles.textJudul}>Delivery Mitra</Text>
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

            <View style={{ flexDirection: 'row', margin: hp('2%'), justifyContent: 'space-between' }}>
              <View style={{ marginBottom: hp('2%') }}>
                <Text style={[styles.textJudul, { marginBottom: 20, alignItems: 'center' }]}>On Schedule Delivery</Text>
              </View>

              <TouchableOpacity style={styles.containerArrowWin2} onPress={() => navigation.navigate('DetailMonitorProgressOnSchedule',{start_date:this.state.startdate,end_date:this.state.enddate,status:'A'})}>
              <View>
                <Text style={styles.textIsi}>{dataDesOgp3RevTelkom}M</Text>
                <Text style={styles.textKeterangan}>per {dataDesOgp3ProjectTelkom} Project</Text>
              </View>
              </TouchableOpacity>
            </View>

            <View style={{ flexDirection: 'row', margin: hp('2%'), justifyContent: 'space-between' }}>
              <View style={{ marginBottom: hp('2%') }}>
                <Text style={[styles.textJudul, { marginBottom: 20, alignItems: 'center' }]}>Delay Delivery</Text>
              </View>

              <TouchableOpacity style={styles.containerArrowWin2} onPress={() => navigation.navigate('DetailMonitorProgressDelay',{start_date:this.state.startdate,end_date:this.state.enddate,status:'A'})}>
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

    const item = this.props.data;

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
    const valuePresentaseOgpMitra= (parseInt(DbsMonitorOgpMitra) / parseInt(DbsMonitorMitra)) * 100;
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

          <TouchableOpacity style={styles.containerArrowWin}>
            <Text style={styles.textJudul}>WIN</Text>
            <Text style={styles.textIsi}>{DbsWinREVENUE}M</Text>
            <Text style={styles.textKeterangan}>per {DbsWinProject} Project</Text>
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
                  <Text style={styles.textIsi}>{DbsMonitor}M</Text>
                  <Text style={styles.textKeterangan}>per {DbsMonitorWP} Project</Text>
                </View>

                <Image
                  source={images.Win.arrowWin3}
                  style={styles.imageStyle}
                  resizeMode={'stretch'}
                />

                <TouchableOpacity style={styles.containerArrowWin2}>
                  <Text style={styles.textJudul}>Dlv Non Mitra</Text>
                  <Text style={styles.textIsi}>{Math.max(0,DbsMonitor-DbsMonitorDone).toFixed(2)}M</Text>
                  <Text style={styles.textKeterangan}>per {Math.max(0,Math.ceil(DbsMonitorWP-DbsMonitorDoneWP))} Project</Text>
                </TouchableOpacity>

                <Image
                  source={images.arrowGrey}
                  style={styles.imageStyle}
                  resizeMode={'stretch'}
                />

                <View style={styles.wrapperPresentase}>
                  <View style={styles.wrapperTextPresentase}>
                    <Text style={styles.textJudul}>{this.getNum(Math.max(0,100-newValueDone))}%</Text>
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
                  <Text style={styles.textIsi}>{DbsMonitor}M</Text>
                  <Text style={styles.textKeterangan}>per {DbsMonitorWP} Project</Text>
                </View>

                <Image
                  source={images.Win.arrowWin3}
                  style={styles.imageStyle}
                  resizeMode={'stretch'}
                />

                <TouchableOpacity style={styles.containerArrowWin2} onPress={() => navigation.navigate('DetailMonitorDev',{start_date:this.state.startdate,end_date:this.state.enddate,status:'A'})}>
                  <Text style={styles.textJudul}>Delivery Mitra</Text>
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

              <View style={{ flexDirection: 'row', margin: hp('2%'), justifyContent: 'space-between' }}>
                <View style={{ marginBottom: hp('2%') }}>
                  <Text style={[styles.textJudul, { marginBottom: 20, alignItems: 'center' }]}>On Schedule Delivery</Text>
                </View>

                <TouchableOpacity style={styles.containerArrowWin2} onPress={() => navigation.navigate('DetailMonitorProgressOnSchedule',{start_date:this.state.startdate,end_date:this.state.enddate,status:'A'})}>
                <View>
                  <Text style={styles.textIsi}>{dataDbsOgp3Rev}M</Text>
                  <Text style={styles.textKeterangan}>per {dataDbsOgp3Project} Project</Text>
                </View>
                </TouchableOpacity>
              </View>

              <View style={{ flexDirection: 'row', margin: hp('2%'), justifyContent: 'space-between' }}>
                <View style={{ marginBottom: hp('2%') }}>
                  <Text style={[styles.textJudul, { marginBottom: 20, alignItems: 'center' }]}>Delay Delivery</Text>
                </View>

                <TouchableOpacity style={styles.containerArrowWin2} onPress={() => navigation.navigate('DetailMonitorProgressDelay',{start_date:this.state.startdate,end_date:this.state.enddate,status:'A'})}>
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

                <TouchableOpacity style={styles.containerArrowWin2}>
                  <Text style={styles.textJudul}>Dlv Non Mitra</Text>
                  <Text style={styles.textIsi}>{Math.max(0,DbsMonitorSubs-DbsMonitorDoneSubs).toFixed(2)}M</Text>
                  <Text style={styles.textKeterangan}>per {Math.max(0,Math.ceil(DbsMonitorWPSubs-DbsMonitorDoneWPSubs))} Project</Text>
                </TouchableOpacity>

                <Image
                  source={images.arrowGrey}
                  style={styles.imageStyle}
                  resizeMode={'stretch'}
                />

                <View style={styles.wrapperPresentase}>
                  <View style={styles.wrapperTextPresentase}>
                    <Text style={styles.textJudul}>{this.getNum(Math.max(0,100-newValueDoneSubs))}%</Text>
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
                  <Text style={styles.textIsi}>{DbsMonitorSubs}M</Text>
                  <Text style={styles.textKeterangan}>per {DbsMonitorWPSubs} Project</Text>
                </View>

                <Image
                  source={images.Win.arrowWin3}
                  style={styles.imageStyle}
                  resizeMode={'stretch'}
                />

                <TouchableOpacity style={styles.containerArrowWin2} onPress={() => navigation.navigate('DetailMonitorDev',{start_date:this.state.startdate,end_date:this.state.enddate,status:'S'})}>
                  <Text style={styles.textJudul}>Delivery Mitra</Text>
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

              <View style={{ flexDirection: 'row', margin: hp('2%'), justifyContent: 'space-between' }}>
                <View style={{ marginBottom: hp('2%') }}>
                  <Text style={[styles.textJudul, { marginBottom: 20, alignItems: 'center' }]}>On Schedule Delivery</Text>
                </View>

                <TouchableOpacity style={styles.containerArrowWin2} onPress={() => navigation.navigate('DetailMonitorProgressOnShedule',{start_date:this.state.startdate,end_date:this.state.enddate,status:'S'})}>
                <View>
                  <Text style={styles.textIsi}>{dataDbsOgp3RevSubs}M</Text>
                  <Text style={styles.textKeterangan}>per {dataDbsOgp3ProjectSubs} Project</Text>
                </View>
                </TouchableOpacity>
              </View>

              <View style={{ flexDirection: 'row', margin: hp('2%'), justifyContent: 'space-between' }}>
                <View style={{ marginBottom: hp('2%') }}>
                  <Text style={[styles.textJudul, { marginBottom: 20, alignItems: 'center' }]}>Delay Delivery</Text>
                </View>

                <TouchableOpacity style={styles.containerArrowWin2} onPress={() => navigation.navigate('DetailMonitorProgressDelay',{start_date:this.state.startdate,end_date:this.state.enddate,status:'S'})}>
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

              <TouchableOpacity style={styles.containerArrowWin2}>
                <Text style={styles.textJudul}>Dlv Non Mitra</Text>
                <Text style={styles.textIsi}>{Math.max(0,DbsMonitorMitra-DbsMonitorDoneMitra).toFixed(2)}M</Text>
                <Text style={styles.textKeterangan}>per {Math.max(0,Math.ceil(DbsMonitorWPMitra-DbsMonitorDoneWPMitra))} Project</Text>
              </TouchableOpacity>

              <Image
                source={images.arrowGrey}
                style={styles.imageStyle}
                resizeMode={'stretch'}
              />

              <View style={styles.wrapperPresentase}>
                <View style={styles.wrapperTextPresentase}>
                  <Text style={styles.textJudul}>{this.getNum(Math.max(0,100-newValueDoneMitra))}%</Text>
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
                <Text style={styles.textIsi}>{DbsMonitorMitra}M</Text>
                <Text style={styles.textKeterangan}>per {DbsMonitorWPMitra} Project</Text>
              </View>

              <Image
                source={images.Win.arrowWin3}
                style={styles.imageStyle}
                resizeMode={'stretch'}
              />

              <TouchableOpacity style={styles.containerArrowWin2} onPress={() => navigation.navigate('DetailMonitorDev',{start_date:this.state.startdate,end_date:this.state.enddate,status:'A'})}>
                <Text style={styles.textJudul}>Delivery Mitra</Text>
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

            <View style={{ flexDirection: 'row', margin: hp('2%'), justifyContent: 'space-between' }}>
              <View style={{ marginBottom: hp('2%') }}>
                <Text style={[styles.textJudul, { marginBottom: 20, alignItems: 'center' }]}>On Schedule Delivery</Text>
              </View>

              <TouchableOpacity style={styles.containerArrowWin2} onPress={() => navigation.navigate('DetailMonitorProgressOnSchedule',{start_date:this.state.startdate,end_date:this.state.enddate,status:'A'})}>
              <View>
                <Text style={styles.textIsi}>{dataDbsOgp3RevMitra}M</Text>
                <Text style={styles.textKeterangan}>per {dataDbsOgp3ProjectMitra} Project</Text>
              </View>
              </TouchableOpacity>
            </View>

            <View style={{ flexDirection: 'row', margin: hp('2%'), justifyContent: 'space-between' }}>
              <View style={{ marginBottom: hp('2%') }}>
                <Text style={[styles.textJudul, { marginBottom: 20, alignItems: 'center' }]}>Delay Delivery</Text>
              </View>

              <TouchableOpacity style={styles.containerArrowWin2} onPress={() => navigation.navigate('DetailMonitorProgressDelay',{start_date:this.state.startdate,end_date:this.state.enddate,status:'A'})}>
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

              <TouchableOpacity style={styles.containerArrowWin2}>
                <Text style={styles.textJudul}>Dlv Non Mitra</Text>
                <Text style={styles.textIsi}>{Math.max(0,DbsMonitorTelkom-DbsMonitorDoneTelkom).toFixed(2)}M</Text>
                <Text style={styles.textKeterangan}>per {Math.max(0,Math.ceil(DbsMonitorWPTelkom-DbsMonitorDoneWPTelkom))} Project</Text>
              </TouchableOpacity>

              <Image
                source={images.arrowGrey}
                style={styles.imageStyle}
                resizeMode={'stretch'}
              />

              <View style={styles.wrapperPresentase}>
                <View style={styles.wrapperTextPresentase}>
                  <Text style={styles.textJudul}>{this.getNum(Math.max(0,100-newValueDoneTelkom))}%</Text>
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
                <Text style={styles.textIsi}>{DbsMonitorTelkom}M</Text>
                <Text style={styles.textKeterangan}>per {DbsMonitorWPTelkom} Project</Text>
              </View>

              <Image
                source={images.Win.arrowWin3}
                style={styles.imageStyle}
                resizeMode={'stretch'}
              />

              <TouchableOpacity style={styles.containerArrowWin2} onPress={() => navigation.navigate('DetailMonitorDev',{start_date:this.state.startdate,end_date:this.state.enddate,status:'A'})}>
                <Text style={styles.textJudul}>Delivery Mitra</Text>
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

            <View style={{ flexDirection: 'row', margin: hp('2%'), justifyContent: 'space-between' }}>
              <View style={{ marginBottom: hp('2%') }}>
                <Text style={[styles.textJudul, { marginBottom: 20, alignItems: 'center' }]}>On Schedule Delivery</Text>
              </View>

              <TouchableOpacity style={styles.containerArrowWin2} onPress={() => navigation.navigate('DetailMonitorProgressOnSchedule',{start_date:this.state.startdate,end_date:this.state.enddate,status:'A'})}>
              <View>
                <Text style={styles.textIsi}>{dataDbsOgp3RevTelkom}M</Text>
                <Text style={styles.textKeterangan}>per {dataDbsOgp3ProjectTelkom} Project</Text>
              </View>
              </TouchableOpacity>
            </View>

            <View style={{ flexDirection: 'row', margin: hp('2%'), justifyContent: 'space-between' }}>
              <View style={{ marginBottom: hp('2%') }}>
                <Text style={[styles.textJudul, { marginBottom: 20, alignItems: 'center' }]}>Delay Delivery</Text>
              </View>

              <TouchableOpacity style={styles.containerArrowWin2} onPress={() => navigation.navigate('DetailMonitorProgressDelay',{start_date:this.state.startdate,end_date:this.state.enddate,status:'A'})}>
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

    const item = this.props.data;

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
    const valuePresentaseOgpMitra= (parseInt(DgsMonitorOgpMitra) / parseInt(DgsMonitorMitra)) * 100;
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

          <TouchableOpacity style={styles.containerArrowWin}>
            <Text style={styles.textJudul}>WIN</Text>
            <Text style={styles.textIsi}>{DgsWinREVENUE}M</Text>
            <Text style={styles.textKeterangan}>per {DgsWinProject} Project</Text>
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
                  <Text style={styles.textIsi}>{DgsMonitor}M</Text>
                  <Text style={styles.textKeterangan}>per {DgsMonitorWP} Project</Text>
                </View>

                <Image
                  source={images.Win.arrowWin3}
                  style={styles.imageStyle}
                  resizeMode={'stretch'}
                />

                <TouchableOpacity style={styles.containerArrowWin2}>
                  <Text style={styles.textJudul}>Dlv Non Mitra</Text>
                  <Text style={styles.textIsi}>{Math.max(0,DgsMonitor-DgsMonitorDone).toFixed(2)}M</Text>
                  <Text style={styles.textKeterangan}>per {Math.max(0,Math.ceil(DgsMonitorWP-DgsMonitorDoneWP))} Project</Text>
                </TouchableOpacity>

                <Image
                  source={images.arrowGrey}
                  style={styles.imageStyle}
                  resizeMode={'stretch'}
                />

                <View style={styles.wrapperPresentase}>
                  <View style={styles.wrapperTextPresentase}>
                    <Text style={styles.textJudul}>{this.getNum(Math.max(0,100-newValueDone))}%</Text>
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
                  <Text style={styles.textIsi}>{DgsMonitor}M</Text>
                  <Text style={styles.textKeterangan}>per {DgsMonitorWP} Project</Text>
                </View>

                <Image
                  source={images.Win.arrowWin3}
                  style={styles.imageStyle}
                  resizeMode={'stretch'}
                />

                <TouchableOpacity style={styles.containerArrowWin2} onPress={() => navigation.navigate('DetailMonitorDev',{start_date:this.state.startdate,end_date:this.state.enddate,status:'A'})}>
                  <Text style={styles.textJudul}>Delivery Mitra</Text>
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

              <View style={{ flexDirection: 'row', margin: hp('2%'), justifyContent: 'space-between' }}>
                <View style={{ marginBottom: hp('2%') }}>
                  <Text style={[styles.textJudul, { marginBottom: 20, alignItems: 'center' }]}>On Schedule Delivery</Text>
                </View>

                <TouchableOpacity style={styles.containerArrowWin2} onPress={() => navigation.navigate('DetailMonitorProgressOnSchedule',{start_date:this.state.startdate,end_date:this.state.enddate,status:'A'})}>
                <View>
                  <Text style={styles.textIsi}>{dataDgsOgp3Rev}M</Text>
                  <Text style={styles.textKeterangan}>per {dataDgsOgp3Project} Project</Text>
                </View>
                </TouchableOpacity>
              </View>

              <View style={{ flexDirection: 'row', margin: hp('2%'), justifyContent: 'space-between' }}>
                <View style={{ marginBottom: hp('2%') }}>
                  <Text style={[styles.textJudul, { marginBottom: 20, alignItems: 'center' }]}>Delay Delivery</Text>
                </View>

                <TouchableOpacity style={styles.containerArrowWin2} onPress={() => navigation.navigate('DetailMonitorProgressDelay',{start_date:this.state.startdate,end_date:this.state.enddate,status:'A'})}>
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

                <TouchableOpacity style={styles.containerArrowWin2}>
                  <Text style={styles.textJudul}>Dlv Non Mitra</Text>
                  <Text style={styles.textIsi}>{Math.max(0,DgsMonitorSubs-DgsMonitorDoneSubs).toFixed(2)}M</Text>
                  <Text style={styles.textKeterangan}>per {Math.max(0,Math.ceil(DgsMonitorWPSubs-DgsMonitorDoneWPSubs))} Project</Text>
                </TouchableOpacity>

                <Image
                  source={images.arrowGrey}
                  style={styles.imageStyle}
                  resizeMode={'stretch'}
                />

                <View style={styles.wrapperPresentase}>
                  <View style={styles.wrapperTextPresentase}>
                    <Text style={styles.textJudul}>{this.getNum(Math.max(0,100-newValueDoneSubs))}%</Text>
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
                  <Text style={styles.textIsi}>{DgsMonitorSubs}M</Text>
                  <Text style={styles.textKeterangan}>per {DgsMonitorWPSubs} Project</Text>
                </View>

                <Image
                  source={images.Win.arrowWin3}
                  style={styles.imageStyle}
                  resizeMode={'stretch'}
                />

                <TouchableOpacity style={styles.containerArrowWin2} onPress={() => navigation.navigate('DetailMonitorDev',{start_date:this.state.startdate,end_date:this.state.enddate,status:'S'})}>
                  <Text style={styles.textJudul}>Delivery Mitra</Text>
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

              <View style={{ flexDirection: 'row', margin: hp('2%'), justifyContent: 'space-between' }}>
                <View style={{ marginBottom: hp('2%') }}>
                  <Text style={[styles.textJudul, { marginBottom: 20, alignItems: 'center' }]}>On Schedule Delivery</Text>
                </View>

                <TouchableOpacity style={styles.containerArrowWin2} onPress={() => navigation.navigate('DetailMonitorProgressOnShedule',{start_date:this.state.startdate,end_date:this.state.enddate,status:'S'})}>
                <View>
                  <Text style={styles.textIsi}>{dataDgsOgp3RevSubs}M</Text>
                  <Text style={styles.textKeterangan}>per {dataDgsOgp3ProjectSubs} Project</Text>
                </View>
                </TouchableOpacity>
              </View>

              <View style={{ flexDirection: 'row', margin: hp('2%'), justifyContent: 'space-between' }}>
                <View style={{ marginBottom: hp('2%') }}>
                  <Text style={[styles.textJudul, { marginBottom: 20, alignItems: 'center' }]}>Delay Delivery</Text>
                </View>

                <TouchableOpacity style={styles.containerArrowWin2} onPress={() => navigation.navigate('DetailMonitorProgressDelay',{start_date:this.state.startdate,end_date:this.state.enddate,status:'S'})}>
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

              <TouchableOpacity style={styles.containerArrowWin2}>
                <Text style={styles.textJudul}>Dlv Non Mitra</Text>
                <Text style={styles.textIsi}>{Math.max(0,DgsMonitorMitra-DgsMonitorDoneMitra).toFixed(2)}M</Text>
                <Text style={styles.textKeterangan}>per {Math.max(0,Math.ceil(DgsMonitorWPMitra-DgsMonitorDoneWPMitra))} Project</Text>
              </TouchableOpacity>

              <Image
                source={images.arrowGrey}
                style={styles.imageStyle}
                resizeMode={'stretch'}
              />

              <View style={styles.wrapperPresentase}>
                <View style={styles.wrapperTextPresentase}>
                  <Text style={styles.textJudul}>{this.getNum(Math.max(0,100-newValueDoneMitra))}%</Text>
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
                <Text style={styles.textIsi}>{DgsMonitorMitra}M</Text>
                <Text style={styles.textKeterangan}>per {DgsMonitorWPMitra} Project</Text>
              </View>

              <Image
                source={images.Win.arrowWin3}
                style={styles.imageStyle}
                resizeMode={'stretch'}
              />

              <TouchableOpacity style={styles.containerArrowWin2} onPress={() => navigation.navigate('DetailMonitorDev',{start_date:this.state.startdate,end_date:this.state.enddate,status:'A'})}>
                <Text style={styles.textJudul}>Delivery Mitra</Text>
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

            <View style={{ flexDirection: 'row', margin: hp('2%'), justifyContent: 'space-between' }}>
              <View style={{ marginBottom: hp('2%') }}>
                <Text style={[styles.textJudul, { marginBottom: 20, alignItems: 'center' }]}>On Schedule Delivery</Text>
              </View>

              <TouchableOpacity style={styles.containerArrowWin2} onPress={() => navigation.navigate('DetailMonitorProgressOnSchedule',{start_date:this.state.startdate,end_date:this.state.enddate,status:'A'})}>
              <View>
                <Text style={styles.textIsi}>{dataDgsOgp3RevMitra}M</Text>
                <Text style={styles.textKeterangan}>per {dataDgsOgp3ProjectMitra} Project</Text>
              </View>
              </TouchableOpacity>
            </View>

            <View style={{ flexDirection: 'row', margin: hp('2%'), justifyContent: 'space-between' }}>
              <View style={{ marginBottom: hp('2%') }}>
                <Text style={[styles.textJudul, { marginBottom: 20, alignItems: 'center' }]}>Delay Delivery</Text>
              </View>

              <TouchableOpacity style={styles.containerArrowWin2} onPress={() => navigation.navigate('DetailMonitorProgressDelay',{start_date:this.state.startdate,end_date:this.state.enddate,status:'A'})}>
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

              <TouchableOpacity style={styles.containerArrowWin2}>
                <Text style={styles.textJudul}>Dlv Non Mitra</Text>
                <Text style={styles.textIsi}>{Math.max(0,DgsMonitorTelkom-DgsMonitorDoneTelkom).toFixed(2)}M</Text>
                <Text style={styles.textKeterangan}>per {Math.max(0,Math.ceil(DgsMonitorWPTelkom-DgsMonitorDoneWPTelkom))} Project</Text>
              </TouchableOpacity>

              <Image
                source={images.arrowGrey}
                style={styles.imageStyle}
                resizeMode={'stretch'}
              />

              <View style={styles.wrapperPresentase}>
                <View style={styles.wrapperTextPresentase}>
                  <Text style={styles.textJudul}>{this.getNum(Math.max(0,100-newValueDoneTelkom))}%</Text>
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
                <Text style={styles.textIsi}>{DgsMonitorTelkom}M</Text>
                <Text style={styles.textKeterangan}>per {DgsMonitorWPTelkom} Project</Text>
              </View>

              <Image
                source={images.Win.arrowWin3}
                style={styles.imageStyle}
                resizeMode={'stretch'}
              />

              <TouchableOpacity style={styles.containerArrowWin2} onPress={() => navigation.navigate('DetailMonitorDev',{start_date:this.state.startdate,end_date:this.state.enddate,status:'A'})}>
                <Text style={styles.textJudul}>Delivery Mitra</Text>
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

            <View style={{ flexDirection: 'row', margin: hp('2%'), justifyContent: 'space-between' }}>
              <View style={{ marginBottom: hp('2%') }}>
                <Text style={[styles.textJudul, { marginBottom: 20, alignItems: 'center' }]}>On Schedule Delivery</Text>
              </View>

              <TouchableOpacity style={styles.containerArrowWin2} onPress={() => navigation.navigate('DetailMonitorProgressOnSchedule',{start_date:this.state.startdate,end_date:this.state.enddate,status:'A'})}>
              <View>
                <Text style={styles.textIsi}>{dataDgsOgp3RevTelkom}M</Text>
                <Text style={styles.textKeterangan}>per {dataDgsOgp3ProjectTelkom} Project</Text>
              </View>
              </TouchableOpacity>
            </View>

            <View style={{ flexDirection: 'row', margin: hp('2%'), justifyContent: 'space-between' }}>
              <View style={{ marginBottom: hp('2%') }}>
                <Text style={[styles.textJudul, { marginBottom: 20, alignItems: 'center' }]}>Delay Delivery</Text>
              </View>

              <TouchableOpacity style={styles.containerArrowWin2} onPress={() => navigation.navigate('DetailMonitorProgressDelay',{start_date:this.state.startdate,end_date:this.state.enddate,status:'A'})}>
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
            <Title style={{ color: '#FFF' }}>Monitor Delivery</Title>
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

  //EBIS
  ebisWinREVENUE: state.MonitorEbisReducerDlv.dataEbisWin,
  ebisWinProject: state.MonitorEbisReducerDlv.dataEbisWP,

  ebisMonitor: state.MonitorEbisReducerDlv.dataEbisWin,
  ebisMonitorWP: state.MonitorEbisReducerDlv.dataEbisWP,
  ebisMonitorDone: state.MonitorEbisReducerDlv.dataEbisDoneWin,
  ebisMonitorDoneWP: state.MonitorEbisReducerDlv.dataEbisDoneWP,
  dataEbisOgp3Rev: state.MonitorEbisReducerDlv.dataOgp3Rev,
  dataEbisOgp3Project: state.MonitorEbisReducerDlv.dataOgp3Project,
  dataEbisOgp7Rev: state.MonitorEbisReducerDlv.dataOgp7Rev,
  dataEbisOgp7Project: state.MonitorEbisReducerDlv.dataOgp7Project,

  ebisMonitorSubs: state.MonitorEbisReducerDlv.dataEbisWinSubs,
  ebisMonitorWPSubs: state.MonitorEbisReducerDlv.dataEbisWPSubs,
  ebisMonitorDoneSubs: state.MonitorEbisReducerDlv.dataEbisDoneWinSubs,
  ebisMonitorDoneWPSubs: state.MonitorEbisReducerDlv.dataEbisDoneWPSubs,
  dataEbisOgp3RevSubs: state.MonitorEbisReducerDlv.dataOgp3RevSubs,
  dataEbisOgp3ProjectSubs: state.MonitorEbisReducerDlv.dataOgp3ProjectSubs,
  dataEbisOgp7RevSubs: state.MonitorEbisReducerDlv.dataOgp7RevSubs,
  dataEbisOgp7ProjectSubs: state.MonitorEbisReducerDlv.dataOgp7ProjectSubs,

  ebisMonitorMitra: state.MonitorEbisReducerDlv.dataEbisWinMitra,
  ebisMonitorWPMitra: state.MonitorEbisReducerDlv.dataEbisWPMitra,
  ebisMonitorDoneMitra: state.MonitorEbisReducerDlv.dataEbisDoneWinMitra,
  ebisMonitorDoneWPMitra: state.MonitorEbisReducerDlv.dataEbisDoneWPMitra,
  dataEbisOgp3RevMitra: state.MonitorEbisReducerDlv.dataOgp3RevMitra,
  dataEbisOgp3ProjectMitra: state.MonitorEbisReducerDlv.dataOgp3ProjectMitra,
  dataEbisOgp7RevMitra: state.MonitorEbisReducerDlv.dataOgp7RevMitra,
  dataEbisOgp7ProjectMitra: state.MonitorEbisReducerDlv.dataOgp7ProjectMitra,

  ebisMonitorTelkom: state.MonitorEbisReducerDlv.dataEbisWinTelkom,
  ebisMonitorWPTelkom: state.MonitorEbisReducerDlv.dataEbisWPTelkom,
  ebisMonitorDoneTelkom: state.MonitorEbisReducerDlv.dataEbisDoneWinTelkom,
  ebisMonitorDoneWPTelkom: state.MonitorEbisReducerDlv.dataEbisDoneWPTelkom,
  dataEbisOgp3RevTelkom: state.MonitorEbisReducerDlv.dataOgp3RevTelkom,
  dataEbisOgp3ProjectTelkom: state.MonitorEbisReducerDlv.dataOgp3ProjectTelkom,
  dataEbisOgp7RevTelkom: state.MonitorEbisReducerDlv.dataOgp7RevTelkom,
  dataEbisOgp7ProjectTelkom: state.MonitorEbisReducerDlv.dataOgp7ProjectTelkom,  

  //DES
  DesWinREVENUE: state.MonitorDesReducerDlv.dataDesWin,
  DesWinProject: state.MonitorDesReducerDlv.dataDesWinWP,

  DesMonitor: state.MonitorDesReducerDlv.dataDesWin,
  DesMonitorWP: state.MonitorDesReducerDlv.dataDesWP,
  DesMonitorDone: state.MonitorDesReducerDlv.dataDesDoneWin,
  DesMonitorDoneWP: state.MonitorDesReducerDlv.dataDesDoneWP,
  dataDesOgp3Rev: state.MonitorDesReducerDlv.dataOgp3Rev,
  dataDesOgp3Project: state.MonitorDesReducerDlv.dataOgp3Project,
  dataDesOgp7Rev: state.MonitorDesReducerDlv.dataOgp7Rev,
  dataDesOgp7Project: state.MonitorDesReducerDlv.dataOgp7Project,

  DesMonitorSubs: state.MonitorDesReducerDlv.dataDesWinSubs,
  DesMonitorWPSubs: state.MonitorDesReducerDlv.dataDesWPSubs,
  DesMonitorDoneSubs: state.MonitorDesReducerDlv.dataDesDoneWinSubs,
  DesMonitorDoneWPSubs: state.MonitorDesReducerDlv.dataDesDoneWPSubs,
  dataDesOgp3RevSubs: state.MonitorDesReducerDlv.dataOgp3RevSubs,
  dataDesOgp3ProjectSubs: state.MonitorDesReducerDlv.dataOgp3ProjectSubs,
  dataDesOgp7RevSubs: state.MonitorDesReducerDlv.dataOgp7RevSubs,
  dataDesOgp7ProjectSubs: state.MonitorDesReducerDlv.dataOgp7ProjectSubs,

  DesMonitorMitra: state.MonitorDesReducerDlv.dataDesWinMitra,
  DesMonitorWPMitra: state.MonitorDesReducerDlv.dataDesWPMitra,
  DesMonitorDoneMitra: state.MonitorDesReducerDlv.dataDesDoneWinMitra,
  DesMonitorDoneWPMitra: state.MonitorDesReducerDlv.dataDesDoneWPMitra,
  dataDesOgp3RevMitra: state.MonitorDesReducerDlv.dataOgp3RevMitra,
  dataDesOgp3ProjectMitra: state.MonitorDesReducerDlv.dataOgp3ProjectMitra,
  dataDesOgp7RevMitra: state.MonitorDesReducerDlv.dataOgp7RevMitra,
  dataDesOgp7ProjectMitra: state.MonitorDesReducerDlv.dataOgp7ProjectMitra,

  DesMonitorTelkom: state.MonitorDesReducerDlv.dataDesWinTelkom,
  DesMonitorWPTelkom: state.MonitorDesReducerDlv.dataDesWPTelkom,
  DesMonitorDoneTelkom: state.MonitorDesReducerDlv.dataDesDoneWinTelkom,
  DesMonitorDoneWPTelkom: state.MonitorDesReducerDlv.dataDesDoneWPTelkom,
  dataDesOgp3RevTelkom: state.MonitorDesReducerDlv.dataOgp3RevTelkom,
  dataDesOgp3ProjectTelkom: state.MonitorDesReducerDlv.dataOgp3ProjectTelkom,
  dataDesOgp7RevTelkom: state.MonitorDesReducerDlv.dataOgp7RevTelkom,
  dataDesOgp7ProjectTelkom: state.MonitorDesReducerDlv.dataOgp7ProjectTelkom,


  //DBS
  DbsWinREVENUE: state.MonitorDbsReducerDlv.dataDbsWin,
  DbsWinProject: state.MonitorDbsReducerDlv.dataDbsWinWP,

  DbsMonitor: state.MonitorDbsReducerDlv.dataDbsWin,
  DbsMonitorWP: state.MonitorDbsReducerDlv.dataDbsWP,
  DbsMonitorDone: state.MonitorDbsReducerDlv.dataDbsDoneWin,
  DbsMonitorDoneWP: state.MonitorDbsReducerDlv.dataDbsDoneWP,
  dataDbsOgp3Rev: state.MonitorDbsReducerDlv.dataOgp3Rev,
  dataDbsOgp3Project: state.MonitorDbsReducerDlv.dataOgp3Project,
  dataDbsOgp7Rev: state.MonitorDbsReducerDlv.dataOgp7Rev,
  dataDbsOgp7Project: state.MonitorDbsReducerDlv.dataOgp7Project,

  DbsMonitorSubs: state.MonitorDbsReducerDlv.dataDbsWinSubs,
  DbsMonitorWPSubs: state.MonitorDbsReducerDlv.dataDbsWPSubs,
  DbsMonitorDoneSubs: state.MonitorDbsReducerDlv.dataDbsDoneWinSubs,
  DbsMonitorDoneWPSubs: state.MonitorDbsReducerDlv.dataDbsDoneWPSubs,
  dataDbsOgp3RevSubs: state.MonitorDbsReducerDlv.dataOgp3RevSubs,
  dataDbsOgp3ProjectSubs: state.MonitorDbsReducerDlv.dataOgp3ProjectSubs,
  dataDbsOgp7RevSubs: state.MonitorDbsReducerDlv.dataOgp7RevSubs,
  dataDbsOgp7ProjectSubs: state.MonitorDbsReducerDlv.dataOgp7ProjectSubs,

  DbsMonitorMitra: state.MonitorDbsReducerDlv.dataDbsWinMitra,
  DbsMonitorWPMitra: state.MonitorDbsReducerDlv.dataDbsWPMitra,
  DbsMonitorDoneMitra: state.MonitorDbsReducerDlv.dataDbsDoneWinMitra,
  DbsMonitorDoneWPMitra: state.MonitorDbsReducerDlv.dataDbsDoneWPMitra,
  dataDbsOgp3RevMitra: state.MonitorDbsReducerDlv.dataOgp3RevMitra,
  dataDbsOgp3ProjectMitra: state.MonitorDbsReducerDlv.dataOgp3ProjectMitra,
  dataDbsOgp7RevMitra: state.MonitorDbsReducerDlv.dataOgp7RevMitra,
  dataDbsOgp7ProjectMitra: state.MonitorDbsReducerDlv.dataOgp7ProjectMitra,  

  DbsMonitorTelkom: state.MonitorDbsReducerDlv.dataDbsWinTelkom,
  DbsMonitorWPTelkom: state.MonitorDbsReducerDlv.dataDbsWPTelkom,
  DbsMonitorDoneTelkom: state.MonitorDbsReducerDlv.dataDbsDoneWinTelkom,
  DbsMonitorDoneWPTelkom: state.MonitorDbsReducerDlv.dataDbsDoneWPTelkom,
  dataDbsOgp3RevTelkom: state.MonitorDbsReducerDlv.dataOgp3RevTelkom,
  dataDbsOgp3ProjectTelkom: state.MonitorDbsReducerDlv.dataOgp3ProjectTelkom,
  dataDbsOgp7RevTelkom: state.MonitorDbsReducerDlv.dataOgp7RevTelkom,
  dataDbsOgp7ProjectTelkom: state.MonitorDbsReducerDlv.dataOgp7ProjectTelkom,

  //MonitorDGS
  DgsWinREVENUE: state.MonitorDgsReducerDlv.dataDgsWin,
  DgsWinProject: state.MonitorDgsReducerDlv.dataDgsWinWP,

  DgsMonitor: state.MonitorDgsReducerDlv.dataDgsWin,
  DgsMonitorWP: state.MonitorDgsReducerDlv.dataDgsWP,
  DgsMonitorDone: state.MonitorDgsReducerDlv.dataDgsDoneWin,
  DgsMonitorDoneWP: state.MonitorDgsReducerDlv.dataDgsDoneWP,
  dataDgsOgp3Rev: state.MonitorDgsReducerDlv.dataOgp3Rev,
  dataDgsOgp3Project: state.MonitorDgsReducerDlv.dataOgp3Project,
  dataDgsOgp7Rev: state.MonitorDgsReducerDlv.dataOgp7Rev,
  dataDgsOgp7Project: state.MonitorDgsReducerDlv.dataOgp7Project,

  DgsMonitorSubs: state.MonitorDgsReducerDlv.dataDgsWinSubs,
  DgsMonitorWPSubs: state.MonitorDgsReducerDlv.dataDgsWPSubs,
  DgsMonitorDoneSubs: state.MonitorDgsReducerDlv.dataDgsDoneWinSubs,
  DgsMonitorDoneWPSubs: state.MonitorDgsReducerDlv.dataDgsDoneWPSubs,
  dataDgsOgp3RevSubs: state.MonitorDgsReducerDlv.dataOgp3RevSubs,
  dataDgsOgp3ProjectSubs: state.MonitorDgsReducerDlv.dataOgp3ProjectSubs,
  dataDgsOgp7RevSubs: state.MonitorDgsReducerDlv.dataOgp7RevSubs,
  dataDgsOgp7ProjectSubs: state.MonitorDgsReducerDlv.dataOgp7ProjectSubs,

  DgsMonitorMitra: state.MonitorDgsReducerDlv.dataDgsWinMitra,
  DgsMonitorWPMitra: state.MonitorDgsReducerDlv.dataDgsWPMitra,
  DgsMonitorDoneMitra: state.MonitorDgsReducerDlv.dataDgsDoneWinMitra,
  DgsMonitorDoneWPMitra: state.MonitorDgsReducerDlv.dataDgsDoneWPMitra,
  dataDgsOgp3RevMitra: state.MonitorDgsReducerDlv.dataOgp3RevMitra,
  dataDgsOgp3ProjectMitra: state.MonitorDgsReducerDlv.dataOgp3ProjectMitra,
  dataDgsOgp7RevMitra: state.MonitorDgsReducerDlv.dataOgp7RevMitra,
  dataDgsOgp7ProjectMitra: state.MonitorDgsReducerDlv.dataOgp7ProjectMitra,  

  DgsMonitorTelkom: state.MonitorDgsReducerDlv.dataDgsWinTelkom,
  DgsMonitorWPTelkom: state.MonitorDgsReducerDlv.dataDgsWPTelkom,
  DgsMonitorDoneTelkom: state.MonitorDgsReducerDlv.dataDgsDoneWinTelkom,
  DgsMonitorDoneWPTelkom: state.MonitorDgsReducerDlv.dataDgsDoneWPTelkom,
  dataDgsOgp3RevTelkom: state.MonitorDgsReducerDlv.dataOgp3RevTelkom,
  dataDgsOgp3ProjectTelkom: state.MonitorDgsReducerDlv.dataOgp3ProjectTelkom,
  dataDgsOgp7RevTelkom: state.MonitorDgsReducerDlv.dataOgp7RevTelkom,
  dataDgsOgp7ProjectTelkom: state.MonitorDgsReducerDlv.dataOgp7ProjectTelkom,

})

export default connect(mapStateToProps)(MonitorDev);

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
