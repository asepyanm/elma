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

class detailMonitorDev extends Component{
  constructor(props){
    super(props);
    this.state = {

      treg: this.props.navigation.state.params.treg,
      witel: this.props.navigation.state.params.witel,
      startdate : this.props.navigation.state.params.start_date,
      enddate   : this.props.navigation.state.params.end_date,   

      //modal
      visibleModal:false,
      loaderTampilDetail:false,
      dataTampung:[],
      dataTampungSubs:[],
      dataTampungMitra:[],
      dataTampungTelkom:[],

      OgpData: {},
      data:[],
      pressed: false,
      statusAll:    this.props.navigation.state.params.status != 'A',
      statusSubs:   this.props.navigation.state.params.status != 'S',
      statusMitra:  this.props.navigation.state.params.status != 'M',
      statusTelkom: this.props.navigation.state.params.status != 'T',
    }
  }

  componentWillMount(){

    //EBIS DETAIL DONE
    this.props.dispatch({
      type: 'MONITOR_DLV_EBIS_DETAIL_DONE',
      payload:RNFetchBlob.config({
        trusty:true
      }). fetch('GET', `${url.API}/ebis_getdeliverycc/div/EBIS/treg/${this.state.treg}/witel/${this.state.witel}/startdate/${this.state.startdate}/enddate/${this.state.enddate}/nmitra/ALL`)
    })
    this.props.dispatch({
      type: 'MONITOR_DLV_EBIS_DETAIL_DONE_SUBS',
      payload:RNFetchBlob.config({
        trusty:true
      }). fetch('GET', `${url.API}/ebis_getdeliverycc/div/EBIS/treg/${this.state.treg}/witel/${this.state.witel}/startdate/${this.state.startdate}/enddate/${this.state.enddate}/nmitra/CFU`)
    })
    this.props.dispatch({
      type: 'MONITOR_DLV_EBIS_DETAIL_DONE_MITRA',
      payload:RNFetchBlob.config({
        trusty:true
      }). fetch('GET', `${url.API}/ebis_getdeliverycc/div/EBIS/treg/${this.state.treg}/witel/${this.state.witel}/startdate/${this.state.startdate}/enddate/${this.state.enddate}/nmitra/MITRA`)
    })
    this.props.dispatch({
      type: 'MONITOR_DLV_EBIS_DETAIL_DONE_TELKOM',
      payload:RNFetchBlob.config({
        trusty:true
      }). fetch('GET', `${url.API}/ebis_getdeliverycc/div/EBIS/treg/${this.state.treg}/witel/${this.state.witel}/startdate/${this.state.startdate}/enddate/${this.state.enddate}/nmitra/TELKOM`)
    })
   
    //DES DETAIL DONE
    this.props.dispatch({
      type: 'MONITOR_DLV_DES_DETAIL_DONE',
      payload:RNFetchBlob.config({
        trusty:true
      }). fetch('GET', `${url.API}/ebis_getdeliverycc/div/DES/treg/${this.state.treg}/witel/${this.state.witel}/startdate/${this.state.startdate}/enddate/${this.state.enddate}/nmitra/ALL`)
    })
    this.props.dispatch({
      type: 'MONITOR_DLV_DES_DETAIL_DONE_SUBS',
      payload:RNFetchBlob.config({
        trusty:true
      }). fetch('GET', `${url.API}/ebis_getdeliverycc/div/DES/treg/${this.state.treg}/witel/${this.state.witel}/startdate/${this.state.startdate}/enddate/${this.state.enddate}/nmitra/CFU`)
    })
    this.props.dispatch({
      type: 'MONITOR_DLV_DES_DETAIL_DONE_MITRA',
      payload:RNFetchBlob.config({
        trusty:true
      }). fetch('GET', `${url.API}/ebis_getdeliverycc/div/DES/treg/${this.state.treg}/witel/${this.state.witel}/startdate/${this.state.startdate}/enddate/${this.state.enddate}/nmitra/MITRA`)
    })
    this.props.dispatch({
      type: 'MONITOR_DLV_DES_DETAIL_DONE_TELKOM',
      payload:RNFetchBlob.config({
        trusty:true
      }). fetch('GET', `${url.API}/ebis_getdeliverycc/div/DES/treg/${this.state.treg}/witel/${this.state.witel}/startdate/${this.state.startdate}/enddate/${this.state.enddate}/nmitra/TELKOM`)
    })

    //DBS DETAIL DONE
    this.props.dispatch({
      type: 'MONITOR_DLV_DBS_DETAIL_DONE',
      payload:RNFetchBlob.config({
        trusty:true
      }). fetch('GET', `${url.API}/ebis_getdeliverycc/div/DBS/treg/${this.state.treg}/witel/${this.state.witel}/startdate/${this.state.startdate}/enddate/${this.state.enddate}/nmitra/ALL`)
    })
    this.props.dispatch({
      type: 'MONITOR_DLV_DBS_DETAIL_DONE_SUBS',
      payload:RNFetchBlob.config({
        trusty:true
      }). fetch('GET', `${url.API}/ebis_getdeliverycc/div/DBS/treg/${this.state.treg}/witel/${this.state.witel}/startdate/${this.state.startdate}/enddate/${this.state.enddate}/nmitra/CFU`)
    })
    this.props.dispatch({
      type: 'MONITOR_DLV_DBS_DETAIL_DONE_MITRA',
      payload:RNFetchBlob.config({
        trusty:true
      }). fetch('GET', `${url.API}/ebis_getdeliverycc/div/DBS/treg/${this.state.treg}/witel/${this.state.witel}/startdate/${this.state.startdate}/enddate/${this.state.enddate}/nmitra/MITRA`)
    })
    this.props.dispatch({
      type: 'MONITOR_DLV_DBS_DETAIL_DONE_TELKOM',
      payload:RNFetchBlob.config({
        trusty:true
      }). fetch('GET', `${url.API}/ebis_getdeliverycc/div/DBS/treg/${this.state.treg}/witel/${this.state.witel}/startdate/${this.state.startdate}/enddate/${this.state.enddate}/nmitra/TELKOM`)
    })

    //DGS DETAIL DONE
    this.props.dispatch({
      type: 'MONITOR_DLV_DGS_DETAIL_DONE',
      payload:RNFetchBlob.config({
        trusty:true
      }). fetch('GET', `${url.API}/ebis_getdeliverycc/div/DGS/treg/${this.state.treg}/witel/${this.state.witel}/startdate/${this.state.startdate}/enddate/${this.state.enddate}/nmitra/ALL`)
    })
    this.props.dispatch({
      type: 'MONITOR_DLV_DGS_DETAIL_DONE_SUBS',
      payload:RNFetchBlob.config({
        trusty:true
      }). fetch('GET', `${url.API}/ebis_getdeliverycc/div/DGS/treg/${this.state.treg}/witel/${this.state.witel}/startdate/${this.state.startdate}/enddate/${this.state.enddate}/nmitra/CFU`)
    })
    this.props.dispatch({
      type: 'MONITOR_DLV_DGS_DETAIL_DONE_MITRA',
      payload:RNFetchBlob.config({
        trusty:true
      }). fetch('GET', `${url.API}/ebis_getdeliverycc/div/DGS/treg/${this.state.treg}/witel/${this.state.witel}/startdate/${this.state.startdate}/enddate/${this.state.enddate}/nmitra/MITRA`)
    })
    this.props.dispatch({
      type: 'MONITOR_DLV_DGS_DETAIL_DONE_TELKOM',
      payload:RNFetchBlob.config({
        trusty:true
      }). fetch('GET', `${url.API}/ebis_getdeliverycc/div/DGS/treg/${this.state.treg}/witel/${this.state.witel}/startdate/${this.state.startdate}/enddate/${this.state.enddate}/nmitra/TELKOM`)
    })

  }

  _toggleModal(div,nmitra,mitra){
    this.setState({
      visibleModal: !this.state.visibleModal,
      loaderTampilDetail:true,
      pressed: false
    })
    RNFetchBlob.config({
        trusty:true
      }). fetch('GET', `${url.API}/ebis_getdeliveryproject/div/${div}/treg/${this.state.treg}/witel/${this.state.witel}/startdate/${this.state.startdate}/enddate/${this.state.enddate}/range/ALL/nmitra/${nmitra}/cc/${mitra}`).then((res) => {
      this.setState({dataTampung:JSON.parse(res.data), loaderTampilDetail:false });
    }).catch((err) => {
      this.setState({
        dataTampung:[],
        loaderTampilDetail:false
      })
      alert(err)
    })
  }
  _onDataPress(level, mitra, id) {
    this.setState({
      visibleModal: true,
      pressed: true,
      loaderTampilDetail: true
    })
    RNFetchBlob.config({
        trusty:true
      }). fetch('GET', `${url.API}/ebis_getdeliveryproject/div/${level.level}/treg/${this.state.treg}/witel/${this.state.witel}/startdate/${this.state.startdate}/enddate/${this.state.enddate}/range/ALL/nmitra/ALL/idproject/${level.id}`).then((res) => {
      this.setState({ OgpData: JSON.parse(res.data), loaderTampilDetail: false });
    }).catch((err) => {
      this.setState({
        loaderTampilDetail: false
      })
      alert(err)
    })
  }

  buttonAll(){
    if(this.state.statusAll === false){
      this.setState({
        statusAll:false
      })
    } else {
      this.setState({
        statusAll:!this.state.statusAll,
        statusTelkom:true, 
        statusSubs:true,
        statusMitra:true,
      })
    }  
  }
  buttonSubs(){
    if(this.state.statusSubs === false){
      this.setState({
        statusSubs:false
      })
    } else {
      this.setState({
        statusSubs:!this.state.statusSubs,
        statusAll:true, 
        statusMitra:true,
        statusTelkom:true,
      })
    }
  }
  buttonMitra(){
    if(this.state.statusMitra === false){
      this.setState({
        statusMitra:false
      })
    } else {
      this.setState({
        statusMitra:!this.state.statusMitra,
        statusAll:true, 
        statusSubs:true,
        statusTelkom:true,
      })
    }
  }
  buttonTelkom(){
    if(this.state.statusTelkom === false){
      this.setState({
        statusTelkom:false
      })
    } else {
      this.setState({
        statusTelkom:!this.state.statusTelkom,
        statusAll:true, 
        statusSubs:true,
        statusMitra:true,
      })
    }
  }

  renderDataDetail() {
    const { OgpData, dataTampung, loaderTampilDetail } = this.state;
    return (
      <View style={{ backgroundColor: "white", alignItems: "center",  borderRadius: 4, borderColor: "rgba(0, 0, 0, 0.1)"}}>
        {
          loaderTampilDetail
          ?
          <ActivityIndicator size={'large'} color={'#000'} style={{ margin: hp('5%') }} />
          :
          <View style={{ height: hp('90%'), width: wp('85%') }}>

            <View style={{ flexDirection: 'row', width: wp('45%'), marginTop: hp('2%') }}>                
              <TouchableOpacity style={{ height: hp('5%'), backgroundColor: '#575f6a', width: wp('85%'), alignItems: 'center', padding: hp('1%'), borderRadius: 5, marginBottom: hp('1%') }}>
                <Text style={{ color: '#FFF' }}>DETAIL</Text>
              </TouchableOpacity>
            </View>

            <View style={{ flexDirection: 'row', width: wp('45%'), marginTop: hp('2%') }}>
                <Text style={{ fontSize: 10, width:wp('22%') }}>A. Nama Project</Text>
                <Text style={{ fontSize: 10, width:wp('1%') }}>:</Text>
                <Text style={{ fontSize: 10, marginLeft: wp('2%') }}>{OgpData.NAMAPROJECT}</Text>
            </View>

            <View style={{ flexDirection: 'row', width: wp('45%'), marginTop: hp('2%') }}>
                <Text style={{ fontSize: 10, width:wp('22%') }}>B. Nama CC</Text>
                <Text style={{ fontSize: 10, width:wp('1%') }}>:</Text>
                <Text style={{ fontSize: 10, marginLeft: wp('2%') }}>{OgpData.NAMACC}</Text>
            </View>

            <View style={{ flexDirection: 'row', width: wp('45%'), marginTop: hp('2%') }}>
                <Text style={{ fontSize: 10, width:wp('22%') }}>C. Nilai Project</Text>
                <Text style={{ fontSize: 10, width:wp('1%') }}>:</Text>
                <Text style={{ fontSize: 10, marginLeft: wp('2%') }}>{OgpData.REVENUE}M</Text>
            </View>

            <View style={{ flexDirection: 'row', width: wp('45%'), marginTop: hp('2%') }}>
                <Text style={{ fontSize: 10, width:wp('22%') }}>D. Lama Kontrak</Text>
                <Text style={{ fontSize: 10, width:wp('1%') }}>:</Text>
                <Text style={{ fontSize: 10, marginLeft: wp('2%') }}>{OgpData.DURASI}</Text>
            </View>

            <View style={{ flexDirection: 'row', width: wp('45%'), marginTop: hp('2%') }}>
                <Text style={{ fontSize: 10, width:wp('22%') }}>E. Divisi</Text>
                <Text style={{ fontSize: 10, width:wp('1%') }}>:</Text>
                <Text style={{ fontSize: 10, marginLeft: wp('2%') }}>{OgpData.DIVISI}</Text>
            </View>

            <View style={{ flexDirection: 'row', width: wp('45%'), marginTop: hp('2%') }}>
                <Text style={{ fontSize: 10, width:wp('22%') }}>F. Segmen</Text>
                <Text style={{ fontSize: 10, width:wp('1%') }}>:</Text>
                <Text style={{ fontSize: 10, marginLeft: wp('2%') }}>{OgpData.SEGMEN}</Text>
            </View>

            <View style={{ flexDirection: 'row', width: wp('45%'), marginTop: hp('2%') }}>
                <Text style={{ fontSize: 10, width:wp('22%') }}>G. No. KB</Text>
                <Text style={{ fontSize: 10, width:wp('1%') }}>:</Text>
                <Text style={{ fontSize: 10, marginLeft: wp('2%') }}>{OgpData.NO_KB}</Text>
            </View>

            <View style={{ flexDirection: 'row', width: wp('45%'), marginTop: hp('2%') }}>
                <Text style={{ fontSize: 10, width:wp('75%') }}>H. Delivery Info</Text>
            </View>
            
            <View style={{ flexDirection: 'row', width: wp('45%'), marginTop: hp('2%'), marginLeft: wp('10%') }}>
              <Text style={{ fontSize: 10, width:wp('3%') }}></Text>
              <Text style={{ fontSize: 10, width:wp('17%') }}>&bull; Progress P8</Text>
              <Text style={{ fontSize: 10, width:wp('1%') }}>:</Text>
              <Text style={{ fontSize: 10, marginLeft: wp('2%') }}>{OgpData.DOKUMEN}</Text>
            </View>
            <View style={{ flexDirection: 'row', width: wp('45%'), marginTop: hp('2%'), marginLeft: wp('10%') }}>
              <Text style={{ fontSize: 10, width:wp('3%') }}></Text>
              <Text style={{ fontSize: 10, width:wp('17%') }}>&bull; Ach Delivery</Text>
              <Text style={{ fontSize: 10, width:wp('1%') }}>:</Text>
              <Text style={{ fontSize: 10, marginLeft: wp('2%') }}>%</Text>
            </View>
            <View style={{ flexDirection: 'row', width: wp('45%'), marginTop: hp('2%'), marginLeft: wp('10%') }}>
              <Text style={{ fontSize: 10, width:wp('3%') }}></Text>
              <Text style={{ fontSize: 10, width:wp('17%') }}>&bull; Sympton</Text>
              <Text style={{ fontSize: 10, width:wp('1%') }}>:</Text>
              <Text style={{ fontSize: 10, marginLeft: wp('2%') }}>{OgpData.SYMPTON}</Text>
            </View>
            <View style={{ flexDirection: 'row', width: wp('45%'), marginTop: hp('2%'), marginLeft: wp('10%') }}>
              <Text style={{ fontSize: 10, width:wp('3%') }}></Text>
              <Text style={{ fontSize: 10, width:wp('17%') }}>&bull; BAST</Text>
              <Text style={{ fontSize: 10, width:wp('1%') }}>:</Text>
              <Text style={{ fontSize: 10, marginLeft: wp('2%') }}>DONE</Text>
            </View>

            <View style={{ position: 'absolute', bottom: 0 }}>
            <TouchableOpacity onPress={() => this.setState({ visibleModal: !this.state.visibleModal })} style={{ height: hp('5%'), backgroundColor: '#e74c3c', width: wp('85%'), alignItems: 'center', padding: hp('1%'), borderRadius: 5, marginBottom: hp('2%') }}>
              <Text style={{ color: '#FFF' }}>Tutup</Text>
            </TouchableOpacity>
            </View>
          </View>
        }
      </View>
    )
  }

  renderModalContent(){
    const {dataTampung, loaderTampilDetail, pressed} = this.state;
    return(
      <View style={styles.modalContent}>
        {
        loaderTampilDetail 
            ?
        <ActivityIndicator size={'large'} color={'#000'} style={{margin:hp('5%')}}/>
            :
        <View style={{width:wp('85%')}}>
          <FlatList
            data={(dataTampung.length>0) ? dataTampung : []}
            ListHeaderComponent={() => (
              <View>
               <View style={styles.wrapperHeaderContent}>
                    <View style={{width:wp('35%')}}>
                      <Text style={{textAlign:'center', color:'#FFF', fontSize:12}}>Nama CC</Text>
                    </View>
                    <View style={{width:wp('35%')}}>
                      <Text style={{textAlign:'center', color:'#FFF', fontSize:12}}>Nama Project</Text>
                    </View>
                    <View style={{width:wp('10%'), alignItems:'center', justifyContent:'center'}}>
                      <Text style={{textAlign:'center', color:'#FFF', fontSize:12}}>Nilai</Text>
                    </View>
                </View>
              </View>
            )}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View>
                <TouchableOpacity style={styles.containerDetailData} onPress={this._onDataPress.bind(this, { level: item.DIVISI, mitra: item.MITRA, id: item.LOPID })}> 
                    <View style={{width:wp('35%'), alignSelf:'center', justifyContent:'center'}}>
                      <Text style={{fontSize:10}}>{item.NAMACC}</Text>
                    </View>
                    <View style={{width:wp('35%'), alignSelf:'center', justifyContent:'center'}}>
                      <Text style={{fontSize:10}}>{item.NAMAPROJECT}</Text>
                    </View>
                    <View style={{width:wp('10%'), alignSelf:'center', justifyContent:'center', alignItems:'center'}}>
                      <Text style={{textAlign:'center', fontSize:10}}>{parseFloat(item.REVENUE)}M</Text>                    
                    </View>
                </TouchableOpacity>
              </View>
            )}
            style={{height:hp('80%'), marginBottom:hp('2%')}}
          />
          <TouchableOpacity onPress={() => this.setState({ visibleModal: !this.state.visibleModal})} style={{height:hp('5%'),backgroundColor:'#e74c3c', width:wp('85%'), justifyContent:'center', alignItems:'center', padding:hp('1%'), borderRadius:5, marginBottom:hp('2%')}}>
            <Text style={{color:'#FFF'}}>Tutup</Text>
          </TouchableOpacity>
        </View>
        }
      </View>
  )};

  EbisScreen(){
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
      },
      Billcom: {
        arrowBil1: require('../../../../../../../../assets/Arrow/arrowBillcom.png'),
        arrowBil2: require('../../../../../../../../assets/Arrow/arrowBillcom3.png'),
      },

      //logo
      allImage:{
        allAktif: require('../../../../../../../../assets/detailKonten/stage-on30.png'),
        allNon  : require('../../../../../../../../assets/detailKonten/stage-off00.png'),
      },
      subsImage:{
        subsAktif: require('../../../../../../../../assets/detailKonten/stage-on31.png'),
        subsNon  : require('../../../../../../../../assets/detailKonten/stage-off01.png'),
      },
      mitraImage:{
        mitraAktif: require('../../../../../../../../assets/detailKonten/stage-on32.png'),
        mitraNon  : require('../../../../../../../../assets/detailKonten/stage-off02.png'),
      },
      telkomImage:{
        telkomAktif: require('../../../../../../../../assets/detailKonten/stage-on33.png'),
        telkomNon  : require('../../../../../../../../assets/detailKonten/stage-off03.png'),
      }
    };

    const{
      //Win
      ebisWinRev,ebisWinProject,
      ebisDetailOgp, ebisDetailOgpSubs, ebisDetailOgpMitra, ebisDetailOgpTelkom 
    } = this.props;

    const {statusAll, statusSubs, statusMitra, statusTelkom, pressed} = this.state;

    return(
      <View style={{backgroundColor:'#FFF', flex:1}}>
        <View style={styles.wrapperArrow}>
          <Image 
              source={images.Win.arrowWin1}
              style={styles.imageStyle}
              resizeMode={'stretch'}
            />

            <TouchableOpacity style={styles.containerArrowWin}>
              <Text style={styles.textJudul}>WIN</Text>
              <Text style={styles.textIsi}>{ebisWinRev}M</Text>
              <Text style={styles.textKeterangan}>per {ebisWinProject} Project</Text>
            </TouchableOpacity>

            <Image 
              source={images.Win.arrowWin2}
              style={styles.imageStyle}
              resizeMode={'stretch'}
          />

          <TouchableOpacity onPress={() => this.buttonAll()} style={styles.containerArrowSubmission2}>
            { statusAll === false 
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
            { statusSubs === false 
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
            { statusMitra === false
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
            { statusTelkom === false 
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
          <View style={{width:wp('70%')}}>
            {renderIf(!statusAll)(
              <Text style={{textAlign:'center', color:'#FFF'}}>NAMA</Text>              
            )}

            {renderIf(!statusSubs)(
              <Text style={{textAlign:'center', color:'#FFF'}}>SUBSIDIARY</Text>              
            )}

            {renderIf(!statusMitra)(
              <Text style={{textAlign:'center', color:'#FFF'}}>MITRA</Text>              
            )}

            {renderIf(!statusTelkom)(
              <Text style={{textAlign:'center', color:'#FFF'}}>TELKOM</Text>              
            )}
          </View>
          <View style={{width:wp('30%')}}>
            <Text style={{textAlign:'center', color:'#FFF'}}>TOTAL</Text>
          </View>
        </View>
        
        {/* <ScrollView> */}
          <Content style={{backgroundColor:'#FFF'}}>

            {renderIf(!statusAll)(
              <View>
                <FlatList
                  data={(ebisDetailOgp.length>0) ? ebisDetailOgp : []}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({ item }) => (

                    item.NAMACC=='TOTAL'
                    ?
                    <TouchableOpacity style={styles.containerDetailData}> 
                      <View style={{width:wp('70%')}}>
                        <Text style={{textAlign:'center', fontWeight: 'bold'}}>{item.NAMACC}</Text>
                      </View>
                      <View style={{width:wp('30%'), alignSelf:'center', justifyContent:'center'}}>
                        <Text style={{textAlign:'center', fontWeight: 'bold'}}>{item.REVENUE}M</Text>                    
                      </View>
                    </TouchableOpacity>
                    :
                    <TouchableOpacity style={styles.containerDetailData} onPress={() => this._toggleModal('EBIS','ALL',item.NAMACC)}>
                      <View style={{width:wp('5%'), justifyContent:'center', alignSelf:'center'}}>
                        <Icon type={'MaterialIcons'} name={'play-arrow'} style={{fontSize:14}} />
                      </View>
                      <View style={{width:wp('65%')}}>
                        <Text>{item.NAMACC}</Text>
                      </View>
                      <View style={{width:wp('30%'), alignSelf:'center', justifyContent:'center'}}>
                        <Text style={{textAlign:'center'}}>{item.REVENUE}M</Text>                    
                      </View>
                    </TouchableOpacity>

                  )}
                  ListEmptyComponent={() => (
                    <View style={{ alignItems : "center", justifyContent: 'center'}}>
                      <Text>Tidak ada data</Text>
                    </View>
                  )}
                />
                <Modal 
                  isVisible={this.state.visibleModal === true}
                  onBackdropPress={() => this.setState({ visibleModal: false })}>
                  {
                  pressed == false ? this.renderModalContent() : this.renderDataDetail()
                  }
                </Modal>
              </View>
            )}

            {renderIf(!statusSubs)(
              <View>
                <FlatList
                  data={(ebisDetailOgpSubs.length>0) ? ebisDetailOgpSubs : []}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({ item }) => (

                    item.NAMACC=='TOTAL'
                    ?
                    <TouchableOpacity style={styles.containerDetailData}> 
                      <View style={{width:wp('70%')}}>
                        <Text style={{textAlign:'center', fontWeight: 'bold'}}>{item.NAMACC}</Text>
                      </View>
                      <View style={{width:wp('30%'), alignSelf:'center', justifyContent:'center'}}>
                        <Text style={{textAlign:'center', fontWeight: 'bold'}}>{item.REVENUE}M</Text>                    
                      </View>
                    </TouchableOpacity>
                    :
                    <TouchableOpacity style={styles.containerDetailData} onPress={() => this._toggleModal('EBIS','CFU',item.NAMACC)}>
                      <View style={{width:wp('5%'), justifyContent:'center', alignSelf:'center'}}>
                        <Icon type={'MaterialIcons'} name={'play-arrow'} style={{fontSize:14}} />
                      </View>
                      <View style={{width:wp('65%')}}>
                        <Text>{item.NAMACC}</Text>
                      </View>
                      <View style={{width:wp('30%'), alignSelf:'center', justifyContent:'center'}}>
                        <Text style={{textAlign:'center'}}>{item.REVENUE}M</Text>                    
                      </View>
                    </TouchableOpacity>

                  )}
                  ListEmptyComponent={() => (
                    <View style={{ alignItems : "center", justifyContent: 'center'}}>
                      <Text>Tidak ada data</Text>
                    </View>
                  )}
                />
                <Modal 
                  isVisible={this.state.visibleModal === true}
                  onBackdropPress={() => this.setState({ visibleModal: false })}>
                  {
                  pressed == false ? this.renderModalContent() : this.renderDataDetail()
                  }
                </Modal>
              </View>
            )}

            {renderIf(!statusMitra)(
              <View>
                <FlatList
                  data={(ebisDetailOgpMitra.length>0) ? ebisDetailOgpMitra : []}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({ item }) => (

                    item.NAMACC=='TOTAL'
                    ?
                    <TouchableOpacity style={styles.containerDetailData}> 
                      <View style={{width:wp('70%')}}>
                        <Text style={{textAlign:'center', fontWeight: 'bold'}}>{item.NAMACC}</Text>
                      </View>
                      <View style={{width:wp('30%'), alignSelf:'center', justifyContent:'center'}}>
                        <Text style={{textAlign:'center', fontWeight: 'bold'}}>{item.REVENUE}M</Text>                    
                      </View>
                    </TouchableOpacity>
                    :
                    <TouchableOpacity style={styles.containerDetailData} onPress={() => this._toggleModal('EBIS','MITRA',item.NAMACC)}>
                      <View style={{width:wp('5%'), justifyContent:'center', alignSelf:'center'}}>
                        <Icon type={'MaterialIcons'} name={'play-arrow'} style={{fontSize:14}} />
                      </View>
                      <View style={{width:wp('65%')}}>
                        <Text>{item.NAMACC}</Text>
                      </View>
                      <View style={{width:wp('30%'), alignSelf:'center', justifyContent:'center'}}>
                        <Text style={{textAlign:'center'}}>{item.REVENUE}M</Text>                    
                      </View>
                    </TouchableOpacity>

                  )}
                  ListEmptyComponent={() => (
                    <View style={{ alignItems : "center", justifyContent: 'center'}}>
                      <Text>Tidak ada data</Text>
                    </View>
                  )}
                />
                <Modal 
                  isVisible={this.state.visibleModal === true}
                  onBackdropPress={() => this.setState({ visibleModal: false })}>
                  {
                  pressed == false ? this.renderModalContent() : this.renderDataDetail()
                  }
                </Modal>
              </View>
            )}

            {renderIf(!statusTelkom)(
              <View>
                <FlatList
                  data={(ebisDetailOgpTelkom.length>0) ? ebisDetailOgpTelkom : []}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({ item }) => (

                    item.NAMACC=='TOTAL'
                    ?
                    <TouchableOpacity style={styles.containerDetailData}> 
                      <View style={{width:wp('70%')}}>
                        <Text style={{textAlign:'center', fontWeight: 'bold'}}>{item.NAMACC}</Text>
                      </View>
                      <View style={{width:wp('30%'), alignSelf:'center', justifyContent:'center'}}>
                        <Text style={{textAlign:'center', fontWeight: 'bold'}}>{item.REVENUE}M</Text>                    
                      </View>
                    </TouchableOpacity>
                    :
                    <TouchableOpacity style={styles.containerDetailData} onPress={() => this._toggleModal('EBIS','TELKOM',item.NAMACC)}>
                      <View style={{width:wp('5%'), justifyContent:'center', alignSelf:'center'}}>
                        <Icon type={'MaterialIcons'} name={'play-arrow'} style={{fontSize:14}} />
                      </View>
                      <View style={{width:wp('65%')}}>
                        <Text>{item.NAMACC}</Text>
                      </View>
                      <View style={{width:wp('30%'), alignSelf:'center', justifyContent:'center'}}>
                        <Text style={{textAlign:'center'}}>{item.REVENUE}M</Text>                    
                      </View>
                    </TouchableOpacity>

                  )}
                  ListEmptyComponent={() => (
                    <View style={{ alignItems : "center", justifyContent: 'center'}}>
                      <Text>Tidak ada data</Text>
                    </View>
                  )}
                />
                <Modal 
                  isVisible={this.state.visibleModal === true}
                  onBackdropPress={() => this.setState({ visibleModal: false })}>
                  {
                  pressed == false ? this.renderModalContent() : this.renderDataDetail()
                  }
                </Modal>
              </View>
            )}
          </Content>
        {/* </ScrollView> */}
      </View>
    )
  }

  DesScreen(){
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
      },
      Billcom: {
        arrowBil1: require('../../../../../../../../assets/Arrow/arrowBillcom.png'),
        arrowBil2: require('../../../../../../../../assets/Arrow/arrowBillcom3.png'),
      },

      //logo
      allImage:{
        allAktif: require('../../../../../../../../assets/detailKonten/stage-on30.png'),
        allNon  : require('../../../../../../../../assets/detailKonten/stage-off00.png'),
      },
      subsImage:{
        subsAktif: require('../../../../../../../../assets/detailKonten/stage-on31.png'),
        subsNon  : require('../../../../../../../../assets/detailKonten/stage-off01.png'),
      },
      mitraImage:{
        mitraAktif: require('../../../../../../../../assets/detailKonten/stage-on32.png'),
        mitraNon  : require('../../../../../../../../assets/detailKonten/stage-off02.png'),
      },
      telkomImage:{
        telkomAktif: require('../../../../../../../../assets/detailKonten/stage-on33.png'),
        telkomNon  : require('../../../../../../../../assets/detailKonten/stage-off03.png'),
      }
    };

    const{
      //Win
      desWinRev, desWinProject, 
      desDetailOgp, desDetailOgpSubs, desDetailOgpMitra, desDetailOgpTelkom 
    } = this.props;

    const {statusAll, statusSubs, statusMitra, statusTelkom, pressed} = this.state;

    return(
      <View style={{backgroundColor:'#FFF', flex:1}}>
        <View style={styles.wrapperArrow}>
          <Image 
            source={images.Win.arrowWin1}
            style={styles.imageStyle}
            resizeMode={'stretch'}
          />

          <View style={styles.containerArrowWin}>
            <Text style={styles.textJudul}>WIN</Text>
            <Text style={styles.textIsi}>{desWinRev}M</Text>
            <Text style={styles.textKeterangan}>per {desWinProject} Project</Text>
          </View>

          <Image 
            source={images.Win.arrowWin2}
            style={styles.imageStyle}
            resizeMode={'stretch'}
          />

          <TouchableOpacity onPress={() => this.buttonAll()} style={styles.containerArrowSubmission2}>
            { statusAll === false 
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
            { statusSubs === false 
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
            { statusMitra === false
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
            { statusTelkom === false 
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
          <View style={{width:wp('70%')}}>
            {renderIf(!statusAll)(
              <Text style={{textAlign:'center', color:'#FFF'}}>NAMA</Text>              
            )}

            {renderIf(!statusSubs)(
              <Text style={{textAlign:'center', color:'#FFF'}}>SUBSIDIARY</Text>              
            )}

            {renderIf(!statusMitra)(
              <Text style={{textAlign:'center', color:'#FFF'}}>MITRA</Text>              
            )}

            {renderIf(!statusTelkom)(
              <Text style={{textAlign:'center', color:'#FFF'}}>TELKOM</Text>              
            )}
          </View>
          <View style={{width:wp('30%')}}>
            <Text style={{textAlign:'center', color:'#FFF'}}>TOTAL</Text>
          </View>
        </View>
        
        {/* <ScrollView> */}
          <Content style={{backgroundColor:'#FFF'}}>
            {renderIf(!statusAll)(
              <View>
                <FlatList
                  data={(desDetailOgp.length>0) ? desDetailOgp : []}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({ item }) => (

                    item.NAMACC=='TOTAL'
                    ?
                    <TouchableOpacity style={styles.containerDetailData}> 
                      <View style={{width:wp('70%')}}>
                        <Text style={{textAlign:'center', fontWeight: 'bold'}}>{item.NAMACC}</Text>
                      </View>
                      <View style={{width:wp('30%'), alignSelf:'center', justifyContent:'center'}}>
                        <Text style={{textAlign:'center', fontWeight: 'bold'}}>{item.REVENUE}M</Text>                    
                      </View>
                    </TouchableOpacity>
                    :
                    <TouchableOpacity style={styles.containerDetailData} onPress={() => this._toggleModal('DES','ALL',item.NAMACC)}>
                      <View style={{width:wp('5%'), justifyContent:'center', alignSelf:'center'}}>
                        <Icon type={'MaterialIcons'} name={'play-arrow'} style={{fontSize:14}} />
                      </View>
                      <View style={{width:wp('65%')}}>
                        <Text>{item.NAMACC}</Text>
                      </View>
                      <View style={{width:wp('30%'), alignSelf:'center', justifyContent:'center'}}>
                        <Text style={{textAlign:'center'}}>{item.REVENUE}M</Text>                    
                      </View>
                    </TouchableOpacity>

                  )}
                  ListEmptyComponent={() => (
                    <View style={{ alignItems : "center", justifyContent: 'center'}}>
                      <Text>Tidak ada data</Text>
                    </View>
                  )}
                />
                <Modal 
                  isVisible={this.state.visibleModal === true}
                  onBackdropPress={() => this.setState({ visibleModal: false })}>
                  {
                  pressed == false ? this.renderModalContent() : this.renderDataDetail()
                  }
                </Modal>
              </View>
            )}

            {renderIf(!statusSubs)(
              <View>
                <FlatList
                  data={(desDetailOgpSubs.length>0) ? desDetailOgpSubs : []}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({ item }) => (

                    item.NAMACC=='TOTAL'
                    ?
                    <TouchableOpacity style={styles.containerDetailData}> 
                      <View style={{width:wp('70%')}}>
                        <Text style={{textAlign:'center', fontWeight: 'bold'}}>{item.NAMACC}</Text>
                      </View>
                      <View style={{width:wp('30%'), alignSelf:'center', justifyContent:'center'}}>
                        <Text style={{textAlign:'center', fontWeight: 'bold'}}>{item.REVENUE}M</Text>                    
                      </View>
                    </TouchableOpacity>
                    :
                    <TouchableOpacity style={styles.containerDetailData} onPress={() => this._toggleModal('DES','CFU',item.NAMACC)}>
                      <View style={{width:wp('5%'), justifyContent:'center', alignSelf:'center'}}>
                        <Icon type={'MaterialIcons'} name={'play-arrow'} style={{fontSize:14}} />
                      </View>
                      <View style={{width:wp('65%')}}>
                        <Text>{item.NAMACC}</Text>
                      </View>
                      <View style={{width:wp('30%'), alignSelf:'center', justifyContent:'center'}}>
                        <Text style={{textAlign:'center'}}>{item.REVENUE}M</Text>                    
                      </View>
                    </TouchableOpacity>

                  )}
                  ListEmptyComponent={() => (
                    <View style={{ alignItems : "center", justifyContent: 'center'}}>
                      <Text>Tidak ada data</Text>
                    </View>
                  )}
                />
                <Modal 
                  isVisible={this.state.visibleModal === true}
                  onBackdropPress={() => this.setState({ visibleModal: false })}>
                  {
                  pressed == false ? this.renderModalContent() : this.renderDataDetail()
                  }
                </Modal>
              </View>
            )}

            {renderIf(!statusMitra)(
              <View>
                <FlatList
                  data={(desDetailOgpMitra.length>0) ? desDetailOgpMitra : []}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({ item }) => (

                    item.NAMACC=='TOTAL'
                    ?
                    <TouchableOpacity style={styles.containerDetailData}> 
                      <View style={{width:wp('70%')}}>
                        <Text style={{textAlign:'center', fontWeight: 'bold'}}>{item.NAMACC}</Text>
                      </View>
                      <View style={{width:wp('30%'), alignSelf:'center', justifyContent:'center'}}>
                        <Text style={{textAlign:'center', fontWeight: 'bold'}}>{item.REVENUE}M</Text>                    
                      </View>
                    </TouchableOpacity>
                    :
                    <TouchableOpacity style={styles.containerDetailData} onPress={() => this._toggleModal('DES','MITRA',item.NAMACC)}>
                      <View style={{width:wp('5%'), justifyContent:'center', alignSelf:'center'}}>
                        <Icon type={'MaterialIcons'} name={'play-arrow'} style={{fontSize:14}} />
                      </View>
                      <View style={{width:wp('65%')}}>
                        <Text>{item.NAMACC}</Text>
                      </View>
                      <View style={{width:wp('30%'), alignSelf:'center', justifyContent:'center'}}>
                        <Text style={{textAlign:'center'}}>{item.REVENUE}M</Text>                    
                      </View>
                    </TouchableOpacity>

                  )}
                  ListEmptyComponent={() => (
                    <View style={{ alignItems : "center", justifyContent: 'center'}}>
                      <Text>Tidak ada data</Text>
                    </View>
                  )}
                />
                <Modal 
                  isVisible={this.state.visibleModal === true}
                  onBackdropPress={() => this.setState({ visibleModal: false })}>
                  {
                  pressed == false ? this.renderModalContent() : this.renderDataDetail()
                  }
                </Modal>
              </View>
            )}

            {renderIf(!statusTelkom)(
              <View>
                <FlatList
                  data={(desDetailOgpTelkom.length>0) ? desDetailOgpTelkom : []}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({ item }) => (

                    item.NAMACC=='TOTAL'
                    ?
                    <TouchableOpacity style={styles.containerDetailData}> 
                      <View style={{width:wp('70%')}}>
                        <Text style={{textAlign:'center', fontWeight: 'bold'}}>{item.NAMACC}</Text>
                      </View>
                      <View style={{width:wp('30%'), alignSelf:'center', justifyContent:'center'}}>
                        <Text style={{textAlign:'center', fontWeight: 'bold'}}>{item.REVENUE}M</Text>                    
                      </View>
                    </TouchableOpacity>
                    :
                    <TouchableOpacity style={styles.containerDetailData} onPress={() => this._toggleModal('DES','TELKOM',item.NAMACC)}>
                      <View style={{width:wp('5%'), justifyContent:'center', alignSelf:'center'}}>
                        <Icon type={'MaterialIcons'} name={'play-arrow'} style={{fontSize:14}} />
                      </View>
                      <View style={{width:wp('65%')}}>
                        <Text>{item.NAMACC}</Text>
                      </View>
                      <View style={{width:wp('30%'), alignSelf:'center', justifyContent:'center'}}>
                        <Text style={{textAlign:'center'}}>{item.REVENUE}M</Text>                    
                      </View>
                    </TouchableOpacity>

                  )}
                  ListEmptyComponent={() => (
                    <View style={{ alignItems : "center", justifyContent: 'center'}}>
                      <Text>Tidak ada data</Text>
                    </View>
                  )}
                />
                <Modal 
                  isVisible={this.state.visibleModal === true}
                  onBackdropPress={() => this.setState({ visibleModal: false })}>
                  {
                  pressed == false ? this.renderModalContent() : this.renderDataDetail()
                  }
                </Modal>
              </View>
            )}

          </Content>
        {/* </ScrollView> */}
      </View>
    )
  }

  DbsScreen(){
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
      },
      Billcom: {
        arrowBil1: require('../../../../../../../../assets/Arrow/arrowBillcom.png'),
        arrowBil2: require('../../../../../../../../assets/Arrow/arrowBillcom3.png'),
      },

      //logo
      allImage:{
        allAktif: require('../../../../../../../../assets/detailKonten/stage-on30.png'),
        allNon  : require('../../../../../../../../assets/detailKonten/stage-off00.png'),
      },
      subsImage:{
        subsAktif: require('../../../../../../../../assets/detailKonten/stage-on31.png'),
        subsNon  : require('../../../../../../../../assets/detailKonten/stage-off01.png'),
      },
      mitraImage:{
        mitraAktif: require('../../../../../../../../assets/detailKonten/stage-on32.png'),
        mitraNon  : require('../../../../../../../../assets/detailKonten/stage-off02.png'),
      },
      telkomImage:{
        telkomAktif: require('../../../../../../../../assets/detailKonten/stage-on33.png'),
        telkomNon  : require('../../../../../../../../assets/detailKonten/stage-off03.png'),
      }
    };

    const{
      //prospect
      dbsWinRev,dbsWinProject, 
      dbsDetailOgp, dbsDetailOgpSubs, dbsDetailOgpMitra, dbsDetailOgpTelkom 
    } = this.props;

    const {statusAll, statusSubs, statusMitra, statusTelkom, pressed} = this.state;

    return(
      <View style={{backgroundColor:'#FFF', flex:1}}>
        <View style={styles.wrapperArrow}>
          <Image 
            source={images.Win.arrowWin1}
            style={styles.imageStyle}
            resizeMode={'stretch'}
          />

          <View style={styles.containerArrowWin}>
            <Text style={styles.textJudul}>WIN</Text>
            <Text style={styles.textIsi}>{dbsWinRev}M</Text>
            <Text style={styles.textKeterangan}>per {dbsWinProject} Project</Text>
          </View>

          <Image 
            source={images.Win.arrowWin2}
            style={styles.imageStyle}
            resizeMode={'stretch'}
          />

          <TouchableOpacity onPress={() => this.buttonAll()} style={styles.containerArrowSubmission2}>
            { statusAll === false 
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
            { statusSubs === false 
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
            { statusMitra === false
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
            { statusTelkom === false 
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
          <View style={{width:wp('70%')}}>
            {renderIf(!statusAll)(
              <Text style={{textAlign:'center', color:'#FFF'}}>NAMA</Text>              
            )}

            {renderIf(!statusSubs)(
              <Text style={{textAlign:'center', color:'#FFF'}}>SUBSIDIARY</Text>              
            )}

            {renderIf(!statusMitra)(
              <Text style={{textAlign:'center', color:'#FFF'}}>MITRA</Text>              
            )}

            {renderIf(!statusTelkom)(
              <Text style={{textAlign:'center', color:'#FFF'}}>TELKOM</Text>              
            )}
          </View>
          <View style={{width:wp('30%')}}>
            <Text style={{textAlign:'center', color:'#FFF'}}>TOTAL</Text>
          </View>
        </View>
        
        {/* <ScrollView> */}
          <Content style={{backgroundColor:'#FFF'}}>
            {renderIf(!statusAll)(
              <View>
                <FlatList
                  data={(dbsDetailOgp.length>0) ? dbsDetailOgp : []}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({ item }) => (

                    item.NAMACC=='TOTAL'
                    ?
                    <TouchableOpacity style={styles.containerDetailData}> 
                      <View style={{width:wp('70%')}}>
                        <Text style={{textAlign:'center', fontWeight: 'bold'}}>{item.NAMACC}</Text>
                      </View>
                      <View style={{width:wp('30%'), alignSelf:'center', justifyContent:'center'}}>
                        <Text style={{textAlign:'center', fontWeight: 'bold'}}>{item.REVENUE}M</Text>                    
                      </View>
                    </TouchableOpacity>
                    :
                    <TouchableOpacity style={styles.containerDetailData} onPress={() => this._toggleModal('DBS','ALL',item.NAMACC)}>
                      <View style={{width:wp('5%'), justifyContent:'center', alignSelf:'center'}}>
                        <Icon type={'MaterialIcons'} name={'play-arrow'} style={{fontSize:14}} />
                      </View>
                      <View style={{width:wp('65%')}}>
                        <Text>{item.NAMACC}</Text>
                      </View>
                      <View style={{width:wp('30%'), alignSelf:'center', justifyContent:'center'}}>
                        <Text style={{textAlign:'center'}}>{item.REVENUE}M</Text>                    
                      </View>
                    </TouchableOpacity>

                  )}
                  ListEmptyComponent={() => (
                    <View style={{ alignItems : "center", justifyContent: 'center'}}>
                      <Text>Tidak ada data</Text>
                    </View>
                  )}
                />
                <Modal 
                  isVisible={this.state.visibleModal === true}
                  onBackdropPress={() => this.setState({ visibleModal: false })}>
                  {
                  pressed == false ? this.renderModalContent() : this.renderDataDetail()
                  }
                </Modal>
              </View>
            )}

            {renderIf(!statusSubs)(
              <View>
                <FlatList
                  data={(dbsDetailOgpSubs.length>0) ? dbsDetailOgpSubs : []}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({ item }) => (

                    item.NAMACC=='TOTAL'
                    ?
                    <TouchableOpacity style={styles.containerDetailData}> 
                      <View style={{width:wp('70%')}}>
                        <Text style={{textAlign:'center', fontWeight: 'bold'}}>{item.NAMACC}</Text>
                      </View>
                      <View style={{width:wp('30%'), alignSelf:'center', justifyContent:'center'}}>
                        <Text style={{textAlign:'center', fontWeight: 'bold'}}>{item.REVENUE}M</Text>                    
                      </View>
                    </TouchableOpacity>
                    :
                    <TouchableOpacity style={styles.containerDetailData} onPress={() => this._toggleModal('DBS','CFU',item.NAMACC)}>
                      <View style={{width:wp('5%'), justifyContent:'center', alignSelf:'center'}}>
                        <Icon type={'MaterialIcons'} name={'play-arrow'} style={{fontSize:14}} />
                      </View>
                      <View style={{width:wp('65%')}}>
                        <Text>{item.NAMACC}</Text>
                      </View>
                      <View style={{width:wp('30%'), alignSelf:'center', justifyContent:'center'}}>
                        <Text style={{textAlign:'center'}}>{item.REVENUE}M</Text>                    
                      </View>
                    </TouchableOpacity>

                  )}
                  ListEmptyComponent={() => (
                    <View style={{ alignItems : "center", justifyContent: 'center'}}>
                      <Text>Tidak ada data</Text>
                    </View>
                  )}
                />
                <Modal 
                  isVisible={this.state.visibleModal === true}
                  onBackdropPress={() => this.setState({ visibleModal: false })}>
                  {
                  pressed == false ? this.renderModalContent() : this.renderDataDetail()
                  }
                </Modal>
              </View>
            )}

            {renderIf(!statusMitra)(
              <View>
                <FlatList
                  data={(dbsDetailOgpMitra.length>0) ? dbsDetailOgpMitra : []}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({ item }) => (

                    item.NAMACC=='TOTAL'
                    ?
                    <TouchableOpacity style={styles.containerDetailData}> 
                      <View style={{width:wp('70%')}}>
                        <Text style={{textAlign:'center', fontWeight: 'bold'}}>{item.NAMACC}</Text>
                      </View>
                      <View style={{width:wp('30%'), alignSelf:'center', justifyContent:'center'}}>
                        <Text style={{textAlign:'center', fontWeight: 'bold'}}>{item.REVENUE}M</Text>                    
                      </View>
                    </TouchableOpacity>
                    :
                    <TouchableOpacity style={styles.containerDetailData} onPress={() => this._toggleModal('DBS','MITRA',item.NAMACC)}>
                      <View style={{width:wp('5%'), justifyContent:'center', alignSelf:'center'}}>
                        <Icon type={'MaterialIcons'} name={'play-arrow'} style={{fontSize:14}} />
                      </View>
                      <View style={{width:wp('65%')}}>
                        <Text>{item.NAMACC}</Text>
                      </View>
                      <View style={{width:wp('30%'), alignSelf:'center', justifyContent:'center'}}>
                        <Text style={{textAlign:'center'}}>{item.REVENUE}M</Text>                    
                      </View>
                    </TouchableOpacity>

                  )}
                  ListEmptyComponent={() => (
                    <View style={{ alignItems : "center", justifyContent: 'center'}}>
                      <Text>Tidak ada data</Text>
                    </View>
                  )}
                />
                <Modal 
                  isVisible={this.state.visibleModal === true}
                  onBackdropPress={() => this.setState({ visibleModal: false })}>
                  {
                  pressed == false ? this.renderModalContent() : this.renderDataDetail()
                  }
                </Modal>
              </View>
            )}

            {renderIf(!statusTelkom)(
              <View>
                <FlatList
                  data={(dbsDetailOgpTelkom.length>0) ? dbsDetailOgpTelkom : []}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({ item }) => (

                    item.NAMACC=='TOTAL'
                    ?
                    <TouchableOpacity style={styles.containerDetailData}> 
                      <View style={{width:wp('70%')}}>
                        <Text style={{textAlign:'center', fontWeight: 'bold'}}>{item.NAMACC}</Text>
                      </View>
                      <View style={{width:wp('30%'), alignSelf:'center', justifyContent:'center'}}>
                        <Text style={{textAlign:'center', fontWeight: 'bold'}}>{item.REVENUE}M</Text>                    
                      </View>
                    </TouchableOpacity>
                    :
                    <TouchableOpacity style={styles.containerDetailData} onPress={() => this._toggleModal('DBS','TELKOM',item.NAMACC)}>
                      <View style={{width:wp('5%'), justifyContent:'center', alignSelf:'center'}}>
                        <Icon type={'MaterialIcons'} name={'play-arrow'} style={{fontSize:14}} />
                      </View>
                      <View style={{width:wp('65%')}}>
                        <Text>{item.NAMACC}</Text>
                      </View>
                      <View style={{width:wp('30%'), alignSelf:'center', justifyContent:'center'}}>
                        <Text style={{textAlign:'center'}}>{item.REVENUE}M</Text>                    
                      </View>
                    </TouchableOpacity>

                  )}
                  ListEmptyComponent={() => (
                    <View style={{ alignItems : "center", justifyContent: 'center'}}>
                      <Text>Tidak ada data</Text>
                    </View>
                  )}
                />
                <Modal 
                  isVisible={this.state.visibleModal === true}
                  onBackdropPress={() => this.setState({ visibleModal: false })}>
                  {
                  pressed == false ? this.renderModalContent() : this.renderDataDetail()
                  }
                </Modal>
              </View>
            )}

          </Content>
        {/* </ScrollView> */}
      </View>
    )
  }

  DgsScreen(){
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
      },
      Billcom: {
        arrowBil1: require('../../../../../../../../assets/Arrow/arrowBillcom.png'),
        arrowBil2: require('../../../../../../../../assets/Arrow/arrowBillcom3.png'),
      },

      //logo
      allImage:{
        allAktif: require('../../../../../../../../assets/detailKonten/stage-on30.png'),
        allNon  : require('../../../../../../../../assets/detailKonten/stage-off00.png'),
      },
      subsImage:{
        subsAktif: require('../../../../../../../../assets/detailKonten/stage-on31.png'),
        subsNon  : require('../../../../../../../../assets/detailKonten/stage-off01.png'),
      },
      mitraImage:{
        mitraAktif: require('../../../../../../../../assets/detailKonten/stage-on32.png'),
        mitraNon  : require('../../../../../../../../assets/detailKonten/stage-off02.png'),
      },
      telkomImage:{
        telkomAktif: require('../../../../../../../../assets/detailKonten/stage-on33.png'),
        telkomNon  : require('../../../../../../../../assets/detailKonten/stage-off03.png'),
      }
    };

    const{
      //Win
      dgsWinRev,dgsWinProject, 
      dgsDetailOgp, dgsDetailOgpSubs, dgsDetailOgpMitra, dgsDetailOgpTelkom 
    } = this.props;

    const {statusAll, statusSubs, statusMitra, statusTelkom, pressed} = this.state;

    return(
      <View style={{backgroundColor:'#FFF', flex:1}}>
        <View style={styles.wrapperArrow}>
          <Image 
            source={images.Win.arrowWin1}
            style={styles.imageStyle}
            resizeMode={'stretch'}
          />

          <View style={styles.containerArrowWin}>
            <Text style={styles.textJudul}>WIN</Text>
            <Text style={styles.textIsi}>{dgsWinRev}M</Text>
            <Text style={styles.textKeterangan}>per {dgsWinProject} Project</Text>
          </View>

          <Image 
            source={images.Win.arrowWin2}
            style={styles.imageStyle}
            resizeMode={'stretch'}
          />

          <TouchableOpacity onPress={() => this.buttonAll()} style={styles.containerArrowSubmission2}>
            { statusAll === false 
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
            { statusSubs === false 
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
            { statusMitra === false
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
            { statusTelkom === false 
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
          <View style={{width:wp('70%')}}>
            {renderIf(!statusAll)(
              <Text style={{textAlign:'center', color:'#FFF'}}>NAMA</Text>              
            )}

            {renderIf(!statusSubs)(
              <Text style={{textAlign:'center', color:'#FFF'}}>SUBSIDIARY</Text>              
            )}

            {renderIf(!statusMitra)(
              <Text style={{textAlign:'center', color:'#FFF'}}>MITRA</Text>              
            )}

            {renderIf(!statusTelkom)(
              <Text style={{textAlign:'center', color:'#FFF'}}>TELKOM</Text>              
            )}
          </View>
          <View style={{width:wp('30%')}}>
            <Text style={{textAlign:'center', color:'#FFF'}}>TOTAL</Text>
          </View>
        </View>
        
        {/* <ScrollView> */}
          <Content style={{backgroundColor:'#FFF'}}>
            {renderIf(!statusAll)(
              <View>
                <FlatList
                  data={(dgsDetailOgp.length>0) ? dgsDetailOgp : []}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({ item }) => (

                    item.NAMACC=='TOTAL'
                    ?
                    <TouchableOpacity style={styles.containerDetailData}> 
                      <View style={{width:wp('70%')}}>
                        <Text style={{textAlign:'center', fontWeight: 'bold'}}>{item.NAMACC}</Text>
                      </View>
                      <View style={{width:wp('30%'), alignSelf:'center', justifyContent:'center'}}>
                        <Text style={{textAlign:'center', fontWeight: 'bold'}}>{item.REVENUE}M</Text>                    
                      </View>
                    </TouchableOpacity>
                    :
                    <TouchableOpacity style={styles.containerDetailData} onPress={() => this._toggleModal('DGS','ALL',item.NAMACC)}>
                      <View style={{width:wp('5%'), justifyContent:'center', alignSelf:'center'}}>
                        <Icon type={'MaterialIcons'} name={'play-arrow'} style={{fontSize:14}} />
                      </View>
                      <View style={{width:wp('65%')}}>
                        <Text>{item.NAMACC}</Text>
                      </View>
                      <View style={{width:wp('30%'), alignSelf:'center', justifyContent:'center'}}>
                        <Text style={{textAlign:'center'}}>{item.REVENUE}M</Text>                    
                      </View>
                    </TouchableOpacity>

                  )}
                  ListEmptyComponent={() => (
                    <View style={{ alignItems : "center", justifyContent: 'center'}}>
                      <Text>Tidak ada data</Text>
                    </View>
                  )}
                />
                <Modal 
                  isVisible={this.state.visibleModal === true}
                  onBackdropPress={() => this.setState({ visibleModal: false })}>
                  {
                  pressed == false ? this.renderModalContent() : this.renderDataDetail()
                  }
                </Modal>
              </View>
            )}

            {renderIf(!statusSubs)(
              <View>
                <FlatList
                  data={(dgsDetailOgpSubs.length>0) ? dgsDetailOgpSubs : []}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({ item }) => (

                    item.NAMACC=='TOTAL'
                    ?
                    <TouchableOpacity style={styles.containerDetailData}> 
                      <View style={{width:wp('70%')}}>
                        <Text style={{textAlign:'center', fontWeight: 'bold'}}>{item.NAMACC}</Text>
                      </View>
                      <View style={{width:wp('30%'), alignSelf:'center', justifyContent:'center'}}>
                        <Text style={{textAlign:'center', fontWeight: 'bold'}}>{item.REVENUE}M</Text>                    
                      </View>
                    </TouchableOpacity>
                    :
                    <TouchableOpacity style={styles.containerDetailData} onPress={() => this._toggleModal('DGS','CFU',item.NAMACC)}>
                      <View style={{width:wp('5%'), justifyContent:'center', alignSelf:'center'}}>
                        <Icon type={'MaterialIcons'} name={'play-arrow'} style={{fontSize:14}} />
                      </View>
                      <View style={{width:wp('65%')}}>
                        <Text>{item.NAMACC}</Text>
                      </View>
                      <View style={{width:wp('30%'), alignSelf:'center', justifyContent:'center'}}>
                        <Text style={{textAlign:'center'}}>{item.REVENUE}M</Text>                    
                      </View>
                    </TouchableOpacity>

                  )}
                  ListEmptyComponent={() => (
                    <View style={{ alignItems : "center", justifyContent: 'center'}}>
                      <Text>Tidak ada data</Text>
                    </View>
                  )}
                />
                <Modal 
                  isVisible={this.state.visibleModal === true}
                  onBackdropPress={() => this.setState({ visibleModal: false })}>
                  {
                  pressed == false ? this.renderModalContent() : this.renderDataDetail()
                  }
                </Modal>
              </View>
            )}

            {renderIf(!statusMitra)(
              <View>
                <FlatList
                  data={(dgsDetailOgpMitra.length>0) ? dgsDetailOgpMitra : []}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({ item }) => (

                    item.NAMACC=='TOTAL'
                    ?
                    <TouchableOpacity style={styles.containerDetailData}> 
                      <View style={{width:wp('70%')}}>
                        <Text style={{textAlign:'center', fontWeight: 'bold'}}>{item.NAMACC}</Text>
                      </View>
                      <View style={{width:wp('30%'), alignSelf:'center', justifyContent:'center'}}>
                        <Text style={{textAlign:'center', fontWeight: 'bold'}}>{item.REVENUE}M</Text>                    
                      </View>
                    </TouchableOpacity>
                    :
                    <TouchableOpacity style={styles.containerDetailData} onPress={() => this._toggleModal('DGS','MITRA',item.NAMACC)}>
                      <View style={{width:wp('5%'), justifyContent:'center', alignSelf:'center'}}>
                        <Icon type={'MaterialIcons'} name={'play-arrow'} style={{fontSize:14}} />
                      </View>
                      <View style={{width:wp('65%')}}>
                        <Text>{item.NAMACC}</Text>
                      </View>
                      <View style={{width:wp('30%'), alignSelf:'center', justifyContent:'center'}}>
                        <Text style={{textAlign:'center'}}>{item.REVENUE}M</Text>                    
                      </View>
                    </TouchableOpacity>

                  )}
                  ListEmptyComponent={() => (
                    <View style={{ alignItems : "center", justifyContent: 'center'}}>
                      <Text>Tidak ada data</Text>
                    </View>
                  )}
                />
                <Modal 
                  isVisible={this.state.visibleModal === true}
                  onBackdropPress={() => this.setState({ visibleModal: false })}>
                  {
                  pressed == false ? this.renderModalContent() : this.renderDataDetail()
                  }
                </Modal>
              </View>
            )}

            {renderIf(!statusTelkom)(
              <View>
                <FlatList
                  data={(dgsDetailOgpTelkom.length>0) ? dgsDetailOgpTelkom : []}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({ item }) => (

                    item.NAMACC=='TOTAL'
                    ?
                    <TouchableOpacity style={styles.containerDetailData}> 
                      <View style={{width:wp('70%')}}>
                        <Text style={{textAlign:'center', fontWeight: 'bold'}}>{item.NAMACC}</Text>
                      </View>
                      <View style={{width:wp('30%'), alignSelf:'center', justifyContent:'center'}}>
                        <Text style={{textAlign:'center', fontWeight: 'bold'}}>{item.REVENUE}M</Text>                    
                      </View>
                    </TouchableOpacity>
                    :
                    <TouchableOpacity style={styles.containerDetailData} onPress={() => this._toggleModal('DGS','TELKOM',item.NAMACC)}>
                      <View style={{width:wp('5%'), justifyContent:'center', alignSelf:'center'}}>
                        <Icon type={'MaterialIcons'} name={'play-arrow'} style={{fontSize:14}} />
                      </View>
                      <View style={{width:wp('65%')}}>
                        <Text>{item.NAMACC}</Text>
                      </View>
                      <View style={{width:wp('30%'), alignSelf:'center', justifyContent:'center'}}>
                        <Text style={{textAlign:'center'}}>{item.REVENUE}M</Text>                    
                      </View>
                    </TouchableOpacity>

                  )}
                  ListEmptyComponent={() => (
                    <View style={{ alignItems : "center", justifyContent: 'center'}}>
                      <Text>Tidak ada data</Text>
                    </View>
                  )}
                />
                <Modal 
                  isVisible={this.state.visibleModal === true}
                  onBackdropPress={() => this.setState({ visibleModal: false })}>
                  {
                  pressed == false ? this.renderModalContent() : this.renderDataDetail()
                  }
                </Modal>
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
        <Header style={{backgroundColor:'#820000'}}>
          <Left>
            <Button transparent onPress={() => navigation.goBack()}>
              <Icon type={'MaterialIcons'} name={'arrow-back'} style={{color:'#FFF'}}/>
            </Button>
          </Left>
          <Body>
            <Title style={{color:'#FFF'}}>Detail Delivery Mitra</Title>
          </Body>
          <Right/>
        </Header>

        <View style={styles.wrapperTabs}>
          <Tabs tabBarUnderlineStyle={{backgroundColor: '#575F6A'}}>
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
  ebisWinRev: state.MonitorEbisReducerDlv.dataEbisDoneWin,
  ebisWinProject: state.MonitorEbisReducerDlv.dataEbisDoneWP,
  
  //DES
  desWinRev: state.MonitorDesReducerDlv.dataDesDoneWin,
  desWinProject: state.MonitorDesReducerDlv.dataDesDoneWP,

  //DBS
  dbsWinRev: state.MonitorDbsReducerDlv.dataDbsDoneWin,
  dbsWinProject: state.MonitorDbsReducerDlv.dataDbsDoneWP,

  //DGS
  dgsWinRev: state.MonitorDgsReducerDlv.dataDgsDoneWin,
  dgsWinProject: state.MonitorDgsReducerDlv.dataDgsDoneWP,

  ebisDetailOgp: state.MonitorEbisReducerDlv.detailDone,
  ebisDetailOgpSubs: state.MonitorEbisReducerDlv.detailDoneSubs,
  ebisDetailOgpMitra: state.MonitorEbisReducerDlv.detailDoneMitra,
  ebisDetailOgpTelkom: state.MonitorEbisReducerDlv.detailDoneTelkom,

  desDetailOgp: state.MonitorDesReducerDlv.detailDone,
  desDetailOgpSubs: state.MonitorDesReducerDlv.detailDoneSubs,
  desDetailOgpMitra: state.MonitorDesReducerDlv.detailDoneMitra,
  desDetailOgpTelkom: state.MonitorDesReducerDlv.detailDoneTelkom,

  dbsDetailOgp: state.MonitorDbsReducerDlv.detailDone,
  dbsDetailOgpSubs: state.MonitorDbsReducerDlv.detailDoneSubs,
  dbsDetailOgpMitra: state.MonitorDbsReducerDlv.detailDoneMitra,
  dbsDetailOgpTelkom: state.MonitorDbsReducerDlv.detailDoneTelkom,

  dgsDetailOgp: state.MonitorDgsReducerDlv.detailDone,
  dgsDetailOgpSubs: state.MonitorDgsReducerDlv.detailDoneSubs,
  dgsDetailOgpMitra: state.MonitorDgsReducerDlv.detailDoneMitra,
  dgsDetailOgpTelkom: state.MonitorDgsReducerDlv.detailDoneTelkom,

})

export default connect(mapStateToProps)(detailMonitorDev);

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
    marginLeft: wp('.5'),
    marginRight: wp('.5'),
    height: hp('9%'),
    width: wp('13%'),
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
