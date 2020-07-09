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
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {Header, Icon, Left, Right, Body, Button, Title, Tab, Tabs, Content, Container} from 'native-base';
import {connect} from 'react-redux';
import Modal from "react-native-modal";
import axios from 'axios';
import RNFetchBlob from 'react-native-fetch-blob'

//global
import renderIf from '../../../../../../../components/renderIf';
import url from '../../../../../../../../config/api_service';

class DbsDetailScreens extends Component{
  constructor(props){
    super(props);
    this.state = {

      startdate: this.props.navigation.state.params.start_date,
      enddate: this.props.navigation.state.params.end_date,   
      namaDetail: this.props.navigation.state.params.namaDetail,
      reg: this.props.navigation.state.params.reg,
      witel: this.props.navigation.state.params.witel,

      //modal
      visibleModal:false,
      loaderTampilDetail:false,
      dataTampung:[],
      data:[],

      visibleModalDetail:false,
      loaderTampilDetailDetail:false,
      dataTampungDetail:[],
      dataDetail:[],

      statusAll:false, 
      statusSubs:true,
      statusMitra:true,
      statusTelkom:true,
    }
  }

  componentWillMount(){
    this.setState({
      loaderTampil:false,
    })    

    //get header ALL
    this.props.dispatch({
      type:'HEADER_BILLCOM_EBIS',
      payload:RNFetchBlob.config({
        trusty:true
      }). fetch('GET', `${url.API}/ebis_getlopmain_ytd/div/EBIS/date1/${this.state.startdate}/date2/${this.state.enddate}/treg/${this.state.reg}/witel/${this.state.witel}`)
    });
    this.props.dispatch({
      type:'HEADER_BILLCOM_DES',
      payload:RNFetchBlob.config({
        trusty:true
      }). fetch('GET', `${url.API}/ebis_getlopmain_ytd/div/DES/date1/${this.state.startdate}/date2/${this.state.enddate}/treg/${this.state.reg}/witel/${this.state.witel}`)
    });
    this.props.dispatch({
      type:'HEADER_BILLCOM_DBS',
      payload:RNFetchBlob.config({
        trusty:true
      }). fetch('GET', `${url.API}/ebis_getlopmain_ytd/div/DBS/date1/${this.state.startdate}/date2/${this.state.enddate}/treg/${this.state.reg}/witel/${this.state.witel}`)
    });
    this.props.dispatch({
      type:'HEADER_BILLCOM_DGS',
      payload:RNFetchBlob.config({
        trusty:true
      }). fetch('GET', `${url.API}/ebis_getlopmain_ytd/div/DGS/date1/${this.state.startdate}/date2/${this.state.enddate}/treg/${this.state.reg}/witel/${this.state.witel}`)
    });

    //get data ALL
    this.props.dispatch({
      type:'DETAIL_BILLCOM_EBIS',
      payload:RNFetchBlob.config({
        trusty:true
      }). fetch('GET', `${url.API}/ebis_getstage3/stage/BILLCOM/div/EBIS/maindiv/ALL/mainseg/ALL/start_date/${this.state.startdate}/end_date/${this.state.enddate}/mitra/ALL/reg/${this.state.reg}/witel/${this.state.witel}`)
    });
    this.props.dispatch({
      type:'DETAIL_BILLCOM_DES',
      payload:RNFetchBlob.config({
        trusty:true
      }). fetch('GET', `${url.API}/ebis_getstage3/stage/BILLCOM/div/DES/maindiv/DES/mainseg/ALL/start_date/${this.state.startdate}/end_date/${this.state.enddate}/mitra/ALL/reg/${this.state.reg}/witel/${this.state.witel}`)
    });
    this.props.dispatch({
      type:'DETAIL_BILLCOM_DBS',
      payload:RNFetchBlob.config({
        trusty:true
      }). fetch('GET', `${url.API}/ebis_getstage3/stage/BILLCOM/div/DBS/maindiv/DBS/mainseg/ALL/start_date/${this.state.startdate}/end_date/${this.state.enddate}/mitra/ALL/reg/${this.state.reg}/witel/${this.state.witel}`)
    });
    this.props.dispatch({
      type:'DETAIL_BILLCOM_DGS',
      payload:RNFetchBlob.config({
        trusty:true
      }). fetch('GET', `${url.API}/ebis_getstage3/stage/BILLCOM/div/DGS/maindiv/DGS/mainseg/ALL/start_date/${this.state.startdate}/end_date/${this.state.enddate}/mitra/ALL/reg/${this.state.reg}/witel/${this.state.witel}`)
    });

    //get data detail SUBS
    this.props.dispatch({
      type:'DETAIL_SUBS_BILLCOM_EBIS',
      payload:RNFetchBlob.config({
        trusty:true
      }). fetch('GET', `${url.API}/ebis_getstage3/stage/BILLCOM/div/EBIS/maindiv/ALL/mainseg/ALL/start_date/${this.state.startdate}/end_date/${this.state.enddate}/mitra/CFU/reg/${this.state.reg}/witel/${this.state.witel}`)
    });
    this.props.dispatch({
      type:'DETAIL_SUBS_BILLCOM_DES',
      payload:RNFetchBlob.config({
        trusty:true
      }). fetch('GET', `${url.API}/ebis_getstage3/stage/BILLCOM/div/DES/maindiv/DES/mainseg/ALL/start_date/${this.state.startdate}/end_date/${this.state.enddate}/mitra/CFU/reg/${this.state.reg}/witel/${this.state.witel}`)
    });
    this.props.dispatch({
      type:'DETAIL_SUBS_BILLCOM_DBS',
      payload:RNFetchBlob.config({
        trusty:true
      }). fetch('GET', `${url.API}/ebis_getstage3/stage/BILLCOM/div/DBS/maindiv/DBS/mainseg/ALL/start_date/${this.state.startdate}/end_date/${this.state.enddate}/mitra/CFU/reg/${this.state.reg}/witel/${this.state.witel}`)
    });
    this.props.dispatch({
      type:'DETAIL_SUBS_BILLCOM_DGS',
      payload:RNFetchBlob.config({
        trusty:true
      }). fetch('GET', `${url.API}/ebis_getstage3/stage/BILLCOM/div/DGS/maindiv/DGS/mainseg/ALL/start_date/${this.state.startdate}/end_date/${this.state.enddate}/mitra/CFU/reg/${this.state.reg}/witel/${this.state.witel}`)
    });

    //get data detail MITRA
    this.props.dispatch({
      type:'DETAIL_MITRA_BILLCOM_EBIS',
      payload:RNFetchBlob.config({
        trusty:true
      }). fetch('GET', `${url.API}/ebis_getstage3/stage/BILLCOM/div/EBIS/maindiv/ALL/mainseg/ALL/start_date/${this.state.startdate}/end_date/${this.state.enddate}/mitra/MITRA/reg/${this.state.reg}/witel/${this.state.witel}`)
    });
    this.props.dispatch({
      type:'DETAIL_MITRA_BILLCOM_DES',
      payload:RNFetchBlob.config({
        trusty:true
      }). fetch('GET', `${url.API}/ebis_getstage3/stage/BILLCOM/div/DES/maindiv/DES/mainseg/ALL/start_date/${this.state.startdate}/end_date/${this.state.enddate}/mitra/MITRA/reg/${this.state.reg}/witel/${this.state.witel}`)
    });
    this.props.dispatch({
      type:'DETAIL_MITRA_BILLCOM_DBS',
      payload:RNFetchBlob.config({
        trusty:true
      }). fetch('GET', `${url.API}/ebis_getstage3/stage/BILLCOM/div/DBS/maindiv/DBS/mainseg/ALL/start_date/${this.state.startdate}/end_date/${this.state.enddate}/mitra/MITRA/reg/${this.state.reg}/witel/${this.state.witel}`)
    });
    this.props.dispatch({
      type:'DETAIL_MITRA_BILLCOM_DGS',
      payload:RNFetchBlob.config({
        trusty:true
      }). fetch('GET', `${url.API}/ebis_getstage3/stage/BILLCOM/div/DGS/maindiv/DGS/mainseg/ALL/start_date/${this.state.startdate}/end_date/${this.state.enddate}/mitra/MITRA/reg/${this.state.reg}/witel/${this.state.witel}`)
    });

    //get data detail TELKOM
    this.props.dispatch({
      type:'DETAIL_TELKOM_BILLCOM_EBIS',
      payload:RNFetchBlob.config({
        trusty:true
      }). fetch('GET', `${url.API}/ebis_getstage3/stage/BILLCOM/div/EBIS/maindiv/ALL/mainseg/ALL/start_date/${this.state.startdate}/end_date/${this.state.enddate}/mitra/TELKOM/reg/${this.state.reg}/witel/${this.state.witel}`)
    });
    this.props.dispatch({
      type:'DETAIL_TELKOM_BILLCOM_DES',
      payload:RNFetchBlob.config({
        trusty:true
      }). fetch('GET', `${url.API}/ebis_getstage3/stage/BILLCOM/div/DES/maindiv/DES/mainseg/ALL/start_date/${this.state.startdate}/end_date/${this.state.enddate}/mitra/TELKOM/reg/${this.state.reg}/witel/${this.state.witel}`)
    });
    this.props.dispatch({
      type:'DETAIL_TELKOM_BILLCOM_DBS',
      payload:RNFetchBlob.config({
        trusty:true
      }). fetch('GET', `${url.API}/ebis_getstage3/stage/BILLCOM/div/DBS/maindiv/DBS/mainseg/ALL/start_date/${this.state.startdate}/end_date/${this.state.enddate}/mitra/TELKOM/reg/${this.state.reg}/witel/${this.state.witel}`)
    });
    this.props.dispatch({
      type:'DETAIL_TELKOM_BILLCOM_DGS',
      payload:RNFetchBlob.config({
        trusty:true
      }). fetch('GET', `${url.API}/ebis_getstage3/stage/BILLCOM/div/DGS/maindiv/DGS/mainseg/ALL/start_date/${this.state.startdate}/end_date/${this.state.enddate}/mitra/TELKOM/reg/${this.state.reg}/witel/${this.state.witel}`)
    });       
  }

    //pop up and detail L4
    _toggleModalDetail(item){
      this.setState({
        visibleModalDetail: !this.state.visibleModalDetail,
        //visibleModalDetail:false,
        loaderTampilDetailDetail:true
      })
      console.log('jrk',`${url.API}/ebis_getstage5/stage/BILLCOM/div/ALL/maindiv/ALL/mitra/ALL/nmitra/${item.stage_01}/mainseg/ALL/start_date/${this.state.startdate}/end_date/${this.state.enddate}/cc/${item.stage_06}/project/${item.stage_07}`)
      RNFetchBlob.config({
        trusty:true
      }). fetch('GET', `${url.API}/ebis_getstage5/stage/BILLCOM/div/ALL/maindiv/ALL/mitra/ALL/nmitra/${item.stage_01}/mainseg/ALL/start_date/${this.state.startdate}/end_date/${this.state.enddate}/cc/${item.stage_06}/project/${item.stage_07}`).then((res) => {
        this.setState({dataTampungDetail:JSON.parse(res.data), loaderTampilDetailDetail:false });
      }).catch((err) => {
        this.setState({
          visibleModalDetail:false,
          loaderTampilDetailDetail:false
        })
        alert(`ContentDetail-L4 => `+err)
      })
    }
    renderModalContentDetail(){
      const {dataTampungDetail, loaderTampilDetailDetail} = this.state;
      return(
        <View style={styles.modalContent}>
          {
          loaderTampilDetailDetail 
            ?
          <ActivityIndicator size={'large'} color={'#ffddcc'} style={{margin:hp('5%')}}/>
            :
          <View style={{width:wp('85%')}}>
            <FlatList
              data={(dataTampungDetail.length>0) ? dataTampungDetail : []}
              ListHeaderComponent={() => (
                <View style={styles.wrapperHeaderContent}>
                  <View style={{width:wp('80%')}}>
                    <Text style={{color:'#FFF', fontSize:12}}>DETAIL:</Text>
                  </View>
                </View>
              )}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity style={styles.containerDetailData} > 
                <View style={{flex: 1, flexDirection: 'row', flexWrap: 'wrap'}}>
  
                  <View style={{width:wp('15%'), alignSelf:'center' }}>
                    <Text style={{fontSize:10}}>Nama CC</Text>
                  </View>
                  <View style={{width:wp('2%'), alignSelf:'center' }}>
                    <Text style={{fontSize:10}}>:</Text>
                  </View>
                  <View style={{width:wp('60%'), alignSelf:'center' }}>
                    <Text style={{fontSize:11}}>{item.stage_06}</Text>
                  </View>
  
                  <View style={{width:wp('15%'), alignSelf:'center' }}>
                    <Text style={{fontSize:10}}>Project</Text>
                  </View>
                  <View style={{width:wp('2%'), alignSelf:'center' }}>
                    <Text style={{fontSize:10}}>:</Text>
                  </View>
                  <View style={{width:wp('60%'), alignSelf:'center' }}>
                    <Text style={{fontSize:11}}>{item.stage_07}</Text>
                  </View>
  
                  <View style={{width:wp('15%'), alignSelf:'center' }}>
                    <Text style={{fontSize:10}}>Nilai</Text>
                  </View>
                  <View style={{width:wp('2%'), alignSelf:'center' }}>
                    <Text style={{fontSize:10}}>:</Text>
                  </View>
                  <View style={{width:wp('60%'), alignSelf:'center' }}>
                    <Text style={{fontSize:11}}>{item.stage_02}M</Text>
                  </View>

                  <View style={{width:wp('15%'), alignSelf:'center' }}>
                    <Text style={{fontSize:10}}>RevOTC</Text>
                  </View>
                  <View style={{width:wp('2%'), alignSelf:'center' }}>
                    <Text style={{fontSize:10}}>:</Text>
                  </View>
                  <View style={{width:wp('60%'), alignSelf:'center' }}>
                    <Text style={{fontSize:11}}>{item.stage_11}</Text>
                  </View>
                  <View style={{width:wp('15%'), alignSelf:'center' }}>
                    <Text style={{fontSize:10}}>RevMo</Text>
                  </View>
                  <View style={{width:wp('2%'), alignSelf:'center' }}>
                    <Text style={{fontSize:10}}>:</Text>
                  </View>
                  <View style={{width:wp('60%'), alignSelf:'center' }}>
                    <Text style={{fontSize:11}}>{item.stage_12}</Text>
                  </View>
  

                  <View style={{width:wp('15%'), alignSelf:'center' }}>
                    <Text style={{fontSize:10}}>Mitra</Text>
                  </View>
                  <View style={{width:wp('2%'), alignSelf:'center' }}>
                    <Text style={{fontSize:10}}>:</Text>
                  </View>
                  <View style={{width:wp('60%'), alignSelf:'center' }}>
                    <Text style={{fontSize:11}}>{item.stage_01}</Text>
                  </View>
  
                  <View style={{width:wp('15%'), alignSelf:'center' }}>
                    <Text style={{fontSize:10}}>Segmen</Text>
                  </View>
                  <View style={{width:wp('2%'), alignSelf:'center' }}>
                    <Text style={{fontSize:10}}>:</Text>
                  </View>
                  <View style={{width:wp('60%'), alignSelf:'center' }}>
                    <Text style={{fontSize:11}}>{item.stage_05}</Text>
                  </View>
  
                  <View style={{width:wp('15%'), alignSelf:'center' }}>
                    <Text style={{fontSize:10}}>Status</Text>
                  </View>
                  <View style={{width:wp('2%'), alignSelf:'center' }}>
                    <Text style={{fontSize:10}}>:</Text>
                  </View>
                  <View style={{width:wp('60%'), alignSelf:'center' }}>
                    <Text style={{fontSize:11}}>{item.stage_09}</Text>
                  </View>
  
                  <View style={{width:wp('15%'), alignSelf:'center' }}>
                    <Text style={{fontSize:10}}>Keterangan</Text>
                  </View>
                  <View style={{width:wp('2%'), alignSelf:'center' }}>
                    <Text style={{fontSize:10}}>:</Text>
                  </View>
                  <View style={{width:wp('60%'), alignSelf:'center' }}>
                    <Text style={{fontSize:11}}>{item.stage_14}</Text>
                  </View>
                </View>
                </TouchableOpacity > 
              )}
              style={{height:hp('35%'), marginBottom:hp('2%')}}
            />
            <TouchableOpacity onPress={() => this.setState({ visibleModalDetail:false})} style={{height:hp('5%'),backgroundColor:'#e74c3c', width:wp('85%'), justifyContent:'center', alignItems:'center', padding:hp('1%'), borderRadius:5, marginBottom:hp('2%')}}>
              <Text style={{color:'#FFF'}}>Tutup</Text>
            </TouchableOpacity>
          </View>
          }
        </View>
      )
    };
    buttonAllDetail(){
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

  _toggleModal(item,div,maindiv){
    this.setState({
      visibleModal: !this.state.visibleModal,
      loaderTampilDetail:true
    })
    RNFetchBlob.config({
        trusty:true
      }). fetch('GET', `${url.API}/ebis_getstage5/stage/BILLCOM/div/${div}/maindiv/${maindiv}/mainseg/ALL/mitra/ALL/nmitra/${item}/start_date/${this.state.startdate}/end_date/${this.state.enddate}`).then((res) => {
      this.setState({dataTampung:JSON.parse(res.data), loaderTampilDetail:false });
    }).catch((err) => {
      this.setState({
        loaderTampilDetail:false
      })
      alert(err)
    })
  }
  renderModalContent(){
    const {dataTampung, loaderTampilDetail} = this.state;
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
              <View style={styles.wrapperHeaderContent}>
                <View style={{width:wp('30%')}}>
                  <Text style={{textAlign:'center', color:'#FFF', fontSize:12}}>Nama CC</Text>
                </View>
                <View style={{width:wp('30%')}}>
                  <Text style={{textAlign:'center', color:'#FFF', fontSize:12}}>Nama Project</Text>
                </View>
                <View style={{width:wp('10%'), alignItems:'center', justifyContent:'center'}}>
                  <Text style={{textAlign:'center', color:'#FFF', fontSize:12}}>Nilai</Text>
                </View>
              </View>
            )}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => this._toggleModalDetail(item)}> 
              <View style={styles.containerDetailData}> 
                <View style={{width:wp('30%'), alignSelf:'center', justifyContent:'center'}}>
                  <Text style={{fontSize:10}}>{item.stage_06}</Text>
                </View>
                <View style={{width:wp('30%'), alignSelf:'center', justifyContent:'center'}}>
                  <Text style={{fontSize:10}}>{item.stage_07}</Text>
                </View>
                <View style={{width:wp('10%'), alignSelf:'center', justifyContent:'center', alignItems:'center'}}>
                  <Text style={{textAlign:'center', fontSize:10}}>{parseFloat(item.stage_10)}M</Text>                    
                </View>
              </View>
              </TouchableOpacity>
            )}
            style={{height:hp('80%'), marginBottom:hp('2%')}}
          />
          <Modal 
            isVisible={this.state.visibleModalDetail === true}
            onBackdropPress={() => this.setState({ visibleModalDetail: false })}>
            {this.renderModalContentDetail()}
          </Modal>
          <TouchableOpacity onPress={() => this.setState({ visibleModal: !this.state.visibleModal})} style={{height:hp('5%'),backgroundColor:'#e74c3c', width:wp('85%'), justifyContent:'center', alignItems:'center', padding:hp('1%'), borderRadius:5, marginBottom:hp('2%')}}>
            <Text style={{color:'#FFF'}}>Tutup</Text>
          </TouchableOpacity>
        </View>
        }
      </View>
  )};
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

  _toggleModalSubs(item,div,maindiv){
    this.setState({
      visibleModal: !this.state.visibleModal,
      loaderTampilDetail:true
    })
    RNFetchBlob.config({
        trusty:true
      }). fetch('GET', `${url.API}/ebis_getstage5/stage/BILLCOM/div/${div}/maindiv/${maindiv}/mainseg/ALL/mitra/CFU/nmitra/${item}/start_date/${this.state.startdate}/end_date/${this.state.enddate}`).then((res) => {
      this.setState({dataTampung:JSON.parse(res.data), loaderTampilDetail:false });
    }).catch((err) => {
      this.setState({
        loaderTampilDetail:false
      })
      alert(err)
    })
  }
  renderModalContentSubs(){
    const {dataTampung, loaderTampilDetail} = this.state;
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
              <View style={styles.wrapperHeaderContent}>
                <View style={{width:wp('30%')}}>
                  <Text style={{textAlign:'center', color:'#FFF', fontSize:12}}>Nama CC</Text>
                </View>
                <View style={{width:wp('30%')}}>
                  <Text style={{textAlign:'center', color:'#FFF', fontSize:12}}>Nama Project</Text>
                </View>
                <View style={{width:wp('10%'), alignItems:'center', justifyContent:'center'}}>
                  <Text style={{textAlign:'center', color:'#FFF', fontSize:12}}>Nilai</Text>
                </View>
              </View>
            )}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => this._toggleModalDetail(item)}> 
              <View style={styles.containerDetailData}> 
                <View style={{width:wp('30%'), alignSelf:'center', justifyContent:'center'}}>
                  <Text style={{fontSize:10}}>{item.stage_06}</Text>
                </View>
                <View style={{width:wp('30%'), alignSelf:'center', justifyContent:'center'}}>
                  <Text style={{fontSize:10}}>{item.stage_07}</Text>
                </View>
                <View style={{width:wp('10%'), alignSelf:'center', justifyContent:'center', alignItems:'center'}}>
                  <Text style={{textAlign:'center', fontSize:10}}>{parseFloat(item.stage_10)}M</Text>                    
                </View>
              </View>
              </TouchableOpacity>
            )}
            style={{height:hp('80%'), marginBottom:hp('2%')}}
          />
          <Modal 
            isVisible={this.state.visibleModalDetail === true}
            onBackdropPress={() => this.setState({ visibleModalDetail: false })}>
            {this.renderModalContentDetail()}
          </Modal>
          <TouchableOpacity onPress={() => this.setState({ visibleModal: !this.state.visibleModal})} style={{height:hp('5%'),backgroundColor:'#e74c3c', width:wp('85%'), justifyContent:'center', alignItems:'center', padding:hp('1%'), borderRadius:5, marginBottom:hp('2%')}}>
            <Text style={{color:'#FFF'}}>Tutup</Text>
          </TouchableOpacity>
        </View>
        }
      </View>
  )};
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

  _toggleModalMitra(item,div,maindiv){
    this.setState({
      visibleModal: !this.state.visibleModal,
      loaderTampilDetail:true
    })
    RNFetchBlob.config({
        trusty:true
      }). fetch('GET', `${url.API}/ebis_getstage5/stage/BILLCOM/div/${div}/maindiv/${maindiv}/mainseg/ALL/mitra/MITRA/nmitra/${item}/start_date/${this.state.startdate}/end_date/${this.state.enddate}`).then((res) => {
      this.setState({dataTampung:JSON.parse(res.data), loaderTampilDetail:false });
    }).catch((err) => {
      this.setState({
        loaderTampilDetail:false
      })
      alert(err)
    })
  }
  renderModalContentMitra(){
    const {dataTampung, loaderTampilDetail} = this.state;
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
              <View style={styles.wrapperHeaderContent}>
                <View style={{width:wp('30%')}}>
                  <Text style={{textAlign:'center', color:'#FFF', fontSize:12}}>Nama CC</Text>
                </View>
                <View style={{width:wp('30%')}}>
                  <Text style={{textAlign:'center', color:'#FFF', fontSize:12}}>Nama Project</Text>
                </View>
                <View style={{width:wp('10%'), alignItems:'center', justifyContent:'center'}}>
                  <Text style={{textAlign:'center', color:'#FFF', fontSize:12}}>Nilai</Text>
                </View>
              </View>
            )}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => this._toggleModalDetail(item)}> 
              <View style={styles.containerDetailData}> 
                <View style={{width:wp('30%'), alignSelf:'center', justifyContent:'center'}}>
                  <Text style={{fontSize:10}}>{item.stage_06}</Text>
                </View>
                <View style={{width:wp('30%'), alignSelf:'center', justifyContent:'center'}}>
                  <Text style={{fontSize:10}}>{item.stage_07}</Text>
                </View>
                <View style={{width:wp('10%'), alignSelf:'center', justifyContent:'center', alignItems:'center'}}>
                  <Text style={{textAlign:'center', fontSize:10}}>{parseFloat(item.stage_10)}M</Text>                    
                </View>
              </View>
              </TouchableOpacity>
            )}
            style={{height:hp('80%'), marginBottom:hp('2%')}}
          />
          <Modal 
            isVisible={this.state.visibleModalDetail === true}
            onBackdropPress={() => this.setState({ visibleModalDetail: false })}>
            {this.renderModalContentDetail()}
          </Modal>
          <TouchableOpacity onPress={() => this.setState({ visibleModal: !this.state.visibleModal})} style={{height:hp('5%'),backgroundColor:'#e74c3c', width:wp('85%'), justifyContent:'center', alignItems:'center', padding:hp('1%'), borderRadius:5, marginBottom:hp('2%')}}>
            <Text style={{color:'#FFF'}}>Tutup</Text>
          </TouchableOpacity>
        </View>
        }
      </View>
  )};
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

  _toggleModalTelkom(item,div,maindiv){
    this.setState({
      visibleModal: !this.state.visibleModal,
      loaderTampilDetail:true
    })
    RNFetchBlob.config({
        trusty:true
      }). fetch('GET', `${url.API}/ebis_getstage5/stage/BILLCOM/div/${div}/maindiv/${maindiv}/mainseg/ALL/mitra/TELKOM/nmitra/${item}/start_date/${this.state.startdate}/end_date/${this.state.enddate}`).then((res) => {
      this.setState({dataTampung:JSON.parse(res.data), loaderTampilDetail:false });
    }).catch((err) => {
      this.setState({
        loaderTampilDetail:false
      })
      alert(err)
    })
  }
  renderModalContentTelkom(){
    const {dataTampung, loaderTampilDetail} = this.state;
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
              <View style={styles.wrapperHeaderContent}>
                <View style={{width:wp('30%')}}>
                  <Text style={{textAlign:'center', color:'#FFF', fontSize:12}}>Nama CC</Text>
                </View>
                <View style={{width:wp('30%')}}>
                  <Text style={{textAlign:'center', color:'#FFF', fontSize:12}}>Nama Project</Text>
                </View>
                <View style={{width:wp('10%'), alignItems:'center', justifyContent:'center'}}>
                  <Text style={{textAlign:'center', color:'#FFF', fontSize:12}}>Nilai</Text>
                </View>
              </View>
            )}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => this._toggleModalDetail(item)}> 
              <View style={styles.containerDetailData}> 
                <View style={{width:wp('30%'), alignSelf:'center', justifyContent:'center'}}>
                  <Text style={{fontSize:10}}>{item.stage_06}</Text>
                </View>
                <View style={{width:wp('30%'), alignSelf:'center', justifyContent:'center'}}>
                  <Text style={{fontSize:10}}>{item.stage_07}</Text>
                </View>
                <View style={{width:wp('10%'), alignSelf:'center', justifyContent:'center', alignItems:'center'}}>
                  <Text style={{textAlign:'center', fontSize:10}}>{parseFloat(item.stage_10)}M</Text>                    
                </View>
              </View>
              </TouchableOpacity>
            )}
            style={{height:hp('80%'), marginBottom:hp('2%')}}
          />
          <Modal 
            isVisible={this.state.visibleModalDetail === true}
            onBackdropPress={() => this.setState({ visibleModalDetail: false })}>
            {this.renderModalContentDetail()}
          </Modal>
          <TouchableOpacity onPress={() => this.setState({ visibleModal: !this.state.visibleModal})} style={{height:hp('5%'),backgroundColor:'#e74c3c', width:wp('85%'), justifyContent:'center', alignItems:'center', padding:hp('1%'), borderRadius:5, marginBottom:hp('2%')}}>
            <Text style={{color:'#FFF'}}>Tutup</Text>
          </TouchableOpacity>
        </View>
        }
      </View>
  )};
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
  

  //screen
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
        allAktif: require('../../../../../../../../assets/detailKonten/stage-on40.png'),
        allNon  : require('../../../../../../../../assets/detailKonten/stage-off00.png'),
      },
      subsImage:{
        subsAktif: require('../../../../../../../../assets/detailKonten/stage-on41.png'),
        subsNon  : require('../../../../../../../../assets/detailKonten/stage-off01.png'),
      },
      mitraImage:{
        mitraAktif: require('../../../../../../../../assets/detailKonten/stage-on42.png'),
        mitraNon  : require('../../../../../../../../assets/detailKonten/stage-off02.png'),
      },
      telkomImage:{
        telkomAktif: require('../../../../../../../../assets/detailKonten/stage-on43.png'),
        telkomNon  : require('../../../../../../../../assets/detailKonten/stage-off03.png'),
      }
    };

    const{
      //prospect
      loaderTampil, ebisProspectREVENUE,ebisProspectProject,dataAll,dataSubs,dataMitra,dataTelkom
    } = this.props;

    const {statusAll, statusSubs, statusMitra, statusTelkom} = this.state;

    return(
      loaderTampil
      ?
      <ActivityIndicator size={'large'} color={'#ffddcc'} style={{margin:hp('5%')}}/>
      :
      <View style={{backgroundColor:'#FFF', flex:1}}>
        <View style={styles.wrapperArrow}>
          <Image 
              source={images.Billcom.arrowBil1}
              style={styles.imageStyle}
              resizeMode={'stretch'}
            />

            <TouchableOpacity style={styles.containerArrowBill}>
              <Text style={styles.textJudul}>BILLCOM</Text>
              <Text style={styles.textIsi}>{ebisProspectREVENUE}M</Text>
              <Text style={styles.textKeterangan}>per {ebisProspectProject} Project</Text>
            </TouchableOpacity>

            <Image 
              source={images.Billcom.arrowBil2}
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
              <Text style={{textAlign:'center', color:'#FFF'}}>ALL</Text>              
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
                  data={(dataAll.length>0) ? dataAll : []}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({ item }) => (
                    item.MITRA=='TOTAL'
                    ?
                    <TouchableOpacity style={styles.containerDetailData}> 
                      <View style={{width:wp('70%')}}>
                        <Text style={{textAlign:'center', fontWeight: 'bold'}}>{item.MITRA}</Text>
                      </View>
                      <View style={{width:wp('30%'), alignSelf:'center', justifyContent:'center'}}>
                        <Text style={{textAlign:'center', fontWeight: 'bold'}}>{item.jumlah}M</Text>                    
                      </View>
                    </TouchableOpacity>
                    :
                    <TouchableOpacity style={styles.containerDetailData} onPress={() => this._toggleModal(item.MITRA,'EBIS','ALL')}> 
                      <View style={{width:wp('5%'), justifyContent:'center', alignSelf:'center'}}>
                        <Icon type={'MaterialIcons'} name={'play-arrow'} style={{fontSize:14}} />
                      </View>
                      <View style={{width:wp('65%')}}>
                        <Text>{item.MITRA}</Text>
                      </View>
                      <View style={{width:wp('30%'), alignSelf:'center', justifyContent:'center'}}>
                        <Text style={{textAlign:'center'}}>{item.jumlah}M</Text>                    
                      </View>
                    </TouchableOpacity>
                  )}
                />
                <Modal 
                  isVisible={this.state.visibleModal === true}
                  onBackdropPress={() => this.setState({ visibleModal: false })}>
                  {this.renderModalContent()}
                </Modal>
              </View>
            )}

            {renderIf(!statusSubs)(
              <View>
                <FlatList
                  data={(dataSubs.length>0) ? dataSubs : []}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({ item }) => (
                    item.MITRA=='TOTAL'
                    ?
                    <TouchableOpacity style={styles.containerDetailData}> 
                      <View style={{width:wp('70%')}}>
                        <Text style={{textAlign:'center', fontWeight: 'bold'}}>{item.MITRA}</Text>
                      </View>
                      <View style={{width:wp('30%'), alignSelf:'center', justifyContent:'center'}}>
                        <Text style={{textAlign:'center', fontWeight: 'bold'}}>{item.jumlah}M</Text>                    
                      </View>
                    </TouchableOpacity>
                    :
                    <TouchableOpacity style={styles.containerDetailData} onPress={() => this._toggleModalSubs(item.MITRA,'EBIS','ALL')}> 
                      <View style={{width:wp('5%'), justifyContent:'center', alignSelf:'center'}}>
                        <Icon type={'MaterialIcons'} name={'play-arrow'} style={{fontSize:14}} />
                      </View>
                      <View style={{width:wp('65%')}}>
                        <Text>{item.MITRA}</Text>
                      </View>
                      <View style={{width:wp('30%'), alignSelf:'center', justifyContent:'center'}}>
                        <Text style={{textAlign:'center'}}>{item.jumlah}M</Text>                    
                      </View>
                    </TouchableOpacity>
                  )}
                />
                <Modal 
                  isVisible={this.state.visibleModal === true}
                  onBackdropPress={() => this.setState({ visibleModal: false })}>
                  {this.renderModalContentSubs()}
                </Modal>
              </View>
            )}

            {renderIf(!statusMitra)(
              <View>
                <FlatList
                  data={(dataMitra.length>0) ? dataMitra : []}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({ item }) => (
                    item.MITRA=='TOTAL'
                    ?
                    <TouchableOpacity style={styles.containerDetailData}> 
                      <View style={{width:wp('70%')}}>
                        <Text style={{textAlign:'center', fontWeight: 'bold'}}>{item.MITRA}</Text>
                      </View>
                      <View style={{width:wp('30%'), alignSelf:'center', justifyContent:'center'}}>
                        <Text style={{textAlign:'center', fontWeight: 'bold'}}>{item.jumlah}M</Text>                    
                      </View>
                    </TouchableOpacity>
                    :
                    <TouchableOpacity style={styles.containerDetailData} onPress={() => this._toggleModalMitra(item.MITRA,'EBIS','ALL')}> 
                      <View style={{width:wp('5%'), justifyContent:'center', alignSelf:'center'}}>
                        <Icon type={'MaterialIcons'} name={'play-arrow'} style={{fontSize:14}} />
                      </View>
                      <View style={{width:wp('65%')}}>
                        <Text>{item.MITRA}</Text>
                      </View>
                      <View style={{width:wp('30%'), alignSelf:'center', justifyContent:'center'}}>
                        <Text style={{textAlign:'center'}}>{item.jumlah}M</Text>                    
                      </View>
                    </TouchableOpacity>
                  )}
                />
                <Modal 
                  isVisible={this.state.visibleModal === true}
                  onBackdropPress={() => this.setState({ visibleModal: false })}>
                  {this.renderModalContentMitra()}
                </Modal>
              </View>
            )}

            {renderIf(!statusTelkom)(
              <View>
                <FlatList
                  data={(dataTelkom.length>0) ? dataTelkom : []}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({ item }) => (
                    item.MITRA=='TOTAL'
                    ?
                    <TouchableOpacity style={styles.containerDetailData}> 
                      <View style={{width:wp('70%')}}>
                        <Text style={{textAlign:'center', fontWeight: 'bold'}}>{item.MITRA}</Text>
                      </View>
                      <View style={{width:wp('30%'), alignSelf:'center', justifyContent:'center'}}>
                        <Text style={{textAlign:'center', fontWeight: 'bold'}}>{item.jumlah}M</Text>                    
                      </View>
                    </TouchableOpacity>
                    :
                    <TouchableOpacity style={styles.containerDetailData} onPress={() => this._toggleModalTelkom(item.MITRA,'EBIS','ALL')}> 
                      <View style={{width:wp('5%'), justifyContent:'center', alignSelf:'center'}}>
                        <Icon type={'MaterialIcons'} name={'play-arrow'} style={{fontSize:14}} />
                      </View>
                      <View style={{width:wp('65%')}}>
                        <Text>{item.MITRA}</Text>
                      </View>
                      <View style={{width:wp('30%'), alignSelf:'center', justifyContent:'center'}}>
                        <Text style={{textAlign:'center'}}>{item.jumlah}M</Text>                    
                      </View>
                    </TouchableOpacity>
                  )}
                />
                <Modal 
                  isVisible={this.state.visibleModal === true}
                  onBackdropPress={() => this.setState({ visibleModal: false })}>
                  {this.renderModalContentTelkom()}
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
        allAktif: require('../../../../../../../../assets/detailKonten/stage-on40.png'),
        allNon  : require('../../../../../../../../assets/detailKonten/stage-off00.png'),
      },
      subsImage:{
        subsAktif: require('../../../../../../../../assets/detailKonten/stage-on41.png'),
        subsNon  : require('../../../../../../../../assets/detailKonten/stage-off01.png'),
      },
      mitraImage:{
        mitraAktif: require('../../../../../../../../assets/detailKonten/stage-on42.png'),
        mitraNon  : require('../../../../../../../../assets/detailKonten/stage-off02.png'),
      },
      telkomImage:{
        telkomAktif: require('../../../../../../../../assets/detailKonten/stage-on43.png'),
        telkomNon  : require('../../../../../../../../assets/detailKonten/stage-off03.png'),
      }
    };

    const{
      //prospect
      loaderTampil, ebisProspectREVENUE2,ebisProspectProject2,dataAll2,dataSubs2,dataMitra2,dataTelkom2
    } = this.props;

    const {statusAll, statusSubs, statusMitra, statusTelkom} = this.state;

    return(
      loaderTampil
      ?
      <ActivityIndicator size={'large'} color={'#ffddcc'} style={{margin:hp('5%')}}/>
      :
      <View style={{backgroundColor:'#FFF', flex:1}}>
        <View style={styles.wrapperArrow}>
          <Image 
            source={images.Billcom.arrowBil1}
            style={styles.imageStyle}
            resizeMode={'stretch'}
          />

          <View style={styles.containerArrowBill}>
            <Text style={styles.textJudul}>BILLCOM</Text>
            <Text style={styles.textIsi}>{ebisProspectREVENUE2}M</Text>
            <Text style={styles.textKeterangan}>per {ebisProspectProject2} Project</Text>
          </View>

          <Image 
            source={images.Billcom.arrowBil2}
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
              <Text style={{textAlign:'center', color:'#FFF'}}>ALL</Text>              
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
                  data={(dataAll2.length>0) ? dataAll2 : []}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({ item }) => (
                    item.MITRA=='TOTAL'
                    ?
                    <TouchableOpacity style={styles.containerDetailData}> 
                      <View style={{width:wp('70%')}}>
                        <Text style={{textAlign:'center', fontWeight: 'bold'}}>{item.MITRA}</Text>
                      </View>
                      <View style={{width:wp('30%'), alignSelf:'center', justifyContent:'center'}}>
                        <Text style={{textAlign:'center', fontWeight: 'bold'}}>{item.jumlah}M</Text>                    
                      </View>
                    </TouchableOpacity>
                    :
                    <TouchableOpacity style={styles.containerDetailData} onPress={() => this._toggleModal(item.MITRA,'DES','DES')}> 
                      <View style={{width:wp('5%'), justifyContent:'center', alignSelf:'center'}}>
                        <Icon type={'MaterialIcons'} name={'play-arrow'} style={{fontSize:14}} />
                      </View>
                      <View style={{width:wp('65%')}}>
                        <Text>{item.MITRA}</Text>
                      </View>
                      <View style={{width:wp('30%'), alignSelf:'center', justifyContent:'center'}}>
                        <Text style={{textAlign:'center'}}>{item.jumlah}M</Text>                    
                      </View>
                    </TouchableOpacity>
                  )}
                />
                <Modal 
                  isVisible={this.state.visibleModal === true}
                  onBackdropPress={() => this.setState({ visibleModal: false })}>
                  {this.renderModalContent()}
                </Modal>
              </View>
            )}

            {renderIf(!statusSubs)(
              <View>
                <FlatList
                  data={(dataSubs2.length>0) ? dataSubs2 : []}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({ item }) => (
                    item.MITRA=='TOTAL'
                    ?
                    <TouchableOpacity style={styles.containerDetailData}> 
                      <View style={{width:wp('70%')}}>
                        <Text style={{textAlign:'center', fontWeight: 'bold'}}>{item.MITRA}</Text>
                      </View>
                      <View style={{width:wp('30%'), alignSelf:'center', justifyContent:'center'}}>
                        <Text style={{textAlign:'center', fontWeight: 'bold'}}>{item.jumlah}M</Text>                    
                      </View>
                    </TouchableOpacity>
                    :
                    <TouchableOpacity style={styles.containerDetailData} onPress={() => this._toggleModalSubs(item.MITRA,'DES','DES')}> 
                      <View style={{width:wp('5%'), justifyContent:'center', alignSelf:'center'}}>
                        <Icon type={'MaterialIcons'} name={'play-arrow'} style={{fontSize:14}} />
                      </View>
                      <View style={{width:wp('65%')}}>
                        <Text>{item.MITRA}</Text>
                      </View>
                      <View style={{width:wp('30%'), alignSelf:'center', justifyContent:'center'}}>
                        <Text style={{textAlign:'center'}}>{item.jumlah}M</Text>                    
                      </View>
                    </TouchableOpacity>
                  )}
                />
                <Modal 
                  isVisible={this.state.visibleModal === true}
                  onBackdropPress={() => this.setState({ visibleModal: false })}>
                  {this.renderModalContentSubs()}
                </Modal>
              </View>
            )}

            {renderIf(!statusMitra)(
              <View>
                <FlatList
                  data={(dataMitra2.length>0) ? dataMitra2 : []}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({ item }) => (
                    item.MITRA=='TOTAL'
                    ?
                    <TouchableOpacity style={styles.containerDetailData}> 
                      <View style={{width:wp('70%')}}>
                        <Text style={{textAlign:'center', fontWeight: 'bold'}}>{item.MITRA}</Text>
                      </View>
                      <View style={{width:wp('30%'), alignSelf:'center', justifyContent:'center'}}>
                        <Text style={{textAlign:'center', fontWeight: 'bold'}}>{item.jumlah}M</Text>                    
                      </View>
                    </TouchableOpacity>
                    :
                    <TouchableOpacity style={styles.containerDetailData} onPress={() => this._toggleModalMitra(item.MITRA,'DES','DES')}> 
                      <View style={{width:wp('5%'), justifyContent:'center', alignSelf:'center'}}>
                        <Icon type={'MaterialIcons'} name={'play-arrow'} style={{fontSize:14}} />
                      </View>
                      <View style={{width:wp('65%')}}>
                        <Text>{item.MITRA}</Text>
                      </View>
                      <View style={{width:wp('30%'), alignSelf:'center', justifyContent:'center'}}>
                        <Text style={{textAlign:'center'}}>{item.jumlah}M</Text>                    
                      </View>
                    </TouchableOpacity>
                  )}
                />
                <Modal 
                  isVisible={this.state.visibleModal === true}
                  onBackdropPress={() => this.setState({ visibleModal: false })}>
                  {this.renderModalContentMitra()}
                </Modal>
              </View>
            )}

            {renderIf(!statusTelkom)(
             <View>
              <FlatList
                data={(dataTelkom2.length>0) ? dataTelkom2 : []}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                  item.MITRA=='TOTAL'
                  ?
                  <TouchableOpacity style={styles.containerDetailData}> 
                    <View style={{width:wp('70%')}}>
                      <Text style={{textAlign:'center', fontWeight: 'bold'}}>{item.MITRA}</Text>
                    </View>
                    <View style={{width:wp('30%'), alignSelf:'center', justifyContent:'center'}}>
                      <Text style={{textAlign:'center', fontWeight: 'bold'}}>{item.jumlah}M</Text>                    
                    </View>
                  </TouchableOpacity>
                  :
                  <TouchableOpacity style={styles.containerDetailData} onPress={() => this._toggleModalTelkom(item.MITRA,'DES','DES')}> 
                    <View style={{width:wp('5%'), justifyContent:'center', alignSelf:'center'}}>
                      <Icon type={'MaterialIcons'} name={'play-arrow'} style={{fontSize:14}} />
                    </View>
                    <View style={{width:wp('65%')}}>
                      <Text>{item.MITRA}</Text>
                    </View>
                    <View style={{width:wp('30%'), alignSelf:'center', justifyContent:'center'}}>
                      <Text style={{textAlign:'center'}}>{item.jumlah}M</Text>                    
                    </View>
                  </TouchableOpacity>
              )}
              />
              <Modal 
                isVisible={this.state.visibleModal === true}
                onBackdropPress={() => this.setState({ visibleModal: false })}>
                {this.renderModalContentTelkom()}
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
        allAktif: require('../../../../../../../../assets/detailKonten/stage-on40.png'),
        allNon  : require('../../../../../../../../assets/detailKonten/stage-off00.png'),
      },
      subsImage:{
        subsAktif: require('../../../../../../../../assets/detailKonten/stage-on41.png'),
        subsNon  : require('../../../../../../../../assets/detailKonten/stage-off01.png'),
      },
      mitraImage:{
        mitraAktif: require('../../../../../../../../assets/detailKonten/stage-on42.png'),
        mitraNon  : require('../../../../../../../../assets/detailKonten/stage-off02.png'),
      },
      telkomImage:{
        telkomAktif: require('../../../../../../../../assets/detailKonten/stage-on43.png'),
        telkomNon  : require('../../../../../../../../assets/detailKonten/stage-off03.png'),
      }
    };

    const{
      //prospect
      loaderTampil, ebisProspectREVENUE3,ebisProspectProject3,dataAll3,dataSubs3,dataMitra3,dataTelkom3
    } = this.props;

    const {statusAll, statusSubs, statusMitra, statusTelkom} = this.state;

    return(
      loaderTampil
      ?
      <ActivityIndicator size={'large'} color={'#ffddcc'} style={{margin:hp('5%')}}/>
      :
      <View style={{backgroundColor:'#FFF', flex:1}}>
        <View style={styles.wrapperArrow}>
          <Image 
            source={images.Billcom.arrowBil1}
            style={styles.imageStyle}
            resizeMode={'stretch'}
          />

          <View style={styles.containerArrowBill}>
            <Text style={styles.textJudul}>BILLCOM</Text>
            <Text style={styles.textIsi}>{ebisProspectREVENUE3}M</Text>
            <Text style={styles.textKeterangan}>per {ebisProspectProject3} Project</Text>
          </View>

          <Image 
            source={images.Billcom.arrowBil2}
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
              <Text style={{textAlign:'center', color:'#FFF'}}>ALL</Text>              
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
                  data={(dataAll3.length>0) ? dataAll3 : []}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({ item }) => (
                    item.MITRA=='TOTAL'
                    ?
                    <TouchableOpacity style={styles.containerDetailData}> 
                      <View style={{width:wp('70%')}}>
                        <Text style={{textAlign:'center', fontWeight: 'bold'}}>{item.MITRA}</Text>
                      </View>
                      <View style={{width:wp('30%'), alignSelf:'center', justifyContent:'center'}}>
                        <Text style={{textAlign:'center', fontWeight: 'bold'}}>{item.jumlah}M</Text>                    
                      </View>
                    </TouchableOpacity>
                    :
                    <TouchableOpacity style={styles.containerDetailData} onPress={() => this._toggleModal(item.MITRA,'DBS','DBS')}> 
                      <View style={{width:wp('5%'), justifyContent:'center', alignSelf:'center'}}>
                        <Icon type={'MaterialIcons'} name={'play-arrow'} style={{fontSize:14}} />
                      </View>
                      <View style={{width:wp('65%')}}>
                        <Text>{item.MITRA}</Text>
                      </View>
                      <View style={{width:wp('30%'), alignSelf:'center', justifyContent:'center'}}>
                        <Text style={{textAlign:'center'}}>{item.jumlah}M</Text>                    
                      </View>
                    </TouchableOpacity>
                  )}
                />
                <Modal 
                  isVisible={this.state.visibleModal === true}
                  onBackdropPress={() => this.setState({ visibleModal: false })}>
                  {this.renderModalContent()}
                </Modal>
              </View>
            )}

            {renderIf(!statusSubs)(
              <View>
                <FlatList
                  data={(dataSubs3.length>0) ? dataSubs3 : []}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({ item }) => (
                    item.MITRA=='TOTAL'
                    ?
                    <TouchableOpacity style={styles.containerDetailData}> 
                      <View style={{width:wp('70%')}}>
                        <Text style={{textAlign:'center', fontWeight: 'bold'}}>{item.MITRA}</Text>
                      </View>
                      <View style={{width:wp('30%'), alignSelf:'center', justifyContent:'center'}}>
                        <Text style={{textAlign:'center', fontWeight: 'bold'}}>{item.jumlah}M</Text>                    
                      </View>
                    </TouchableOpacity>
                    :
                    <TouchableOpacity style={styles.containerDetailData} onPress={() => this._toggleModalSubs(item.MITRA,'DBS','DBS')}> 
                      <View style={{width:wp('5%'), justifyContent:'center', alignSelf:'center'}}>
                        <Icon type={'MaterialIcons'} name={'play-arrow'} style={{fontSize:14}} />
                      </View>
                      <View style={{width:wp('65%')}}>
                        <Text>{item.MITRA}</Text>
                      </View>
                      <View style={{width:wp('30%'), alignSelf:'center', justifyContent:'center'}}>
                        <Text style={{textAlign:'center'}}>{item.jumlah}M</Text>                    
                      </View>
                    </TouchableOpacity>
                  )}
                />
                <Modal 
                  isVisible={this.state.visibleModal === true}
                  onBackdropPress={() => this.setState({ visibleModal: false })}>
                  {this.renderModalContentSubs()}
                </Modal>
              </View>
            )}

            {renderIf(!statusMitra)(
              <View>
                <FlatList
                  data={(dataMitra3.length>0) ? dataMitra3 : []}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({ item }) => (
                    item.MITRA=='TOTAL'
                    ?
                    <TouchableOpacity style={styles.containerDetailData}> 
                      <View style={{width:wp('70%')}}>
                        <Text style={{textAlign:'center', fontWeight: 'bold'}}>{item.MITRA}</Text>
                      </View>
                      <View style={{width:wp('30%'), alignSelf:'center', justifyContent:'center'}}>
                        <Text style={{textAlign:'center', fontWeight: 'bold'}}>{item.jumlah}M</Text>                    
                      </View>
                    </TouchableOpacity>
                    :
                    <TouchableOpacity style={styles.containerDetailData} onPress={() => this._toggleModalMitra(item.MITRA,'DBS','DBS')}> 
                      <View style={{width:wp('5%'), justifyContent:'center', alignSelf:'center'}}>
                        <Icon type={'MaterialIcons'} name={'play-arrow'} style={{fontSize:14}} />
                      </View>
                      <View style={{width:wp('65%')}}>
                        <Text>{item.MITRA}</Text>
                      </View>
                      <View style={{width:wp('30%'), alignSelf:'center', justifyContent:'center'}}>
                        <Text style={{textAlign:'center'}}>{item.jumlah}M</Text>                    
                      </View>
                    </TouchableOpacity>
                  )}
                />
                <Modal 
                  isVisible={this.state.visibleModal === true}
                  onBackdropPress={() => this.setState({ visibleModal: false })}>
                  {this.renderModalContentMitra()}
                </Modal>
              </View>
            )}

            {renderIf(!statusTelkom)(
              <View>
                <FlatList
                  data={(dataTelkom3.length>0) ? dataTelkom3 : []}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({ item }) => (
                    item.MITRA=='TOTAL'
                    ?
                    <TouchableOpacity style={styles.containerDetailData}> 
                      <View style={{width:wp('70%')}}>
                        <Text style={{textAlign:'center', fontWeight: 'bold'}}>{item.MITRA}</Text>
                      </View>
                      <View style={{width:wp('30%'), alignSelf:'center', justifyContent:'center'}}>
                        <Text style={{textAlign:'center', fontWeight: 'bold'}}>{item.jumlah}M</Text>                    
                      </View>
                    </TouchableOpacity>
                    :
                    <TouchableOpacity style={styles.containerDetailData} onPress={() => this._toggleModalTelkom(item.MITRA,'DBS','DBS')}> 
                      <View style={{width:wp('5%'), justifyContent:'center', alignSelf:'center'}}>
                        <Icon type={'MaterialIcons'} name={'play-arrow'} style={{fontSize:14}} />
                      </View>
                      <View style={{width:wp('65%')}}>
                        <Text>{item.MITRA}</Text>
                      </View>
                      <View style={{width:wp('30%'), alignSelf:'center', justifyContent:'center'}}>
                        <Text style={{textAlign:'center'}}>{item.jumlah}M</Text>                    
                      </View>
                    </TouchableOpacity>
                  )}
                />
                <Modal 
                  isVisible={this.state.visibleModal === true}
                  onBackdropPress={() => this.setState({ visibleModal: false })}>
                  {this.renderModalContentTelkom()}
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
        allAktif: require('../../../../../../../../assets/detailKonten/stage-on40.png'),
        allNon  : require('../../../../../../../../assets/detailKonten/stage-off00.png'),
      },
      subsImage:{
        subsAktif: require('../../../../../../../../assets/detailKonten/stage-on41.png'),
        subsNon  : require('../../../../../../../../assets/detailKonten/stage-off01.png'),
      },
      mitraImage:{
        mitraAktif: require('../../../../../../../../assets/detailKonten/stage-on42.png'),
        mitraNon  : require('../../../../../../../../assets/detailKonten/stage-off02.png'),
      },
      telkomImage:{
        telkomAktif: require('../../../../../../../../assets/detailKonten/stage-on43.png'),
        telkomNon  : require('../../../../../../../../assets/detailKonten/stage-off03.png'),
      }
    };

    const{
      //prospect
      loaderTampil, ebisProspectREVENUE4,ebisProspectProject4,dataAll4,dataSubs4,dataMitra4,dataTelkom4
    } = this.props;

    const {statusAll, statusSubs, statusMitra, statusTelkom} = this.state;

    return(
      loaderTampil
      ?
      <ActivityIndicator size={'large'} color={'#ffddcc'} style={{margin:hp('5%')}}/>
      :
      <View style={{backgroundColor:'#FFF', flex:1}}>
        <View style={styles.wrapperArrow}>
          <Image 
            source={images.Billcom.arrowBil1}
            style={styles.imageStyle}
            resizeMode={'stretch'}
          />

          <View style={styles.containerArrowBill}>
            <Text style={styles.textJudul}>BILLCOM</Text>
            <Text style={styles.textIsi}>{ebisProspectREVENUE4}M</Text>
            <Text style={styles.textKeterangan}>per {ebisProspectProject4} Project</Text>
          </View>

          <Image 
            source={images.Billcom.arrowBil2}
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
              <Text style={{textAlign:'center', color:'#FFF'}}>ALL</Text>              
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
                  data={(dataAll4.length>0) ? dataAll4 : []}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({ item }) => (
                    item.MITRA=='TOTAL'
                    ?
                    <TouchableOpacity style={styles.containerDetailData}> 
                      <View style={{width:wp('70%')}}>
                        <Text style={{textAlign:'center', fontWeight: 'bold'}}>{item.MITRA}</Text>
                      </View>
                      <View style={{width:wp('30%'), alignSelf:'center', justifyContent:'center'}}>
                        <Text style={{textAlign:'center', fontWeight: 'bold'}}>{item.jumlah}M</Text>                    
                      </View>
                    </TouchableOpacity>
                    :
                    <TouchableOpacity style={styles.containerDetailData} onPress={() => this._toggleModal(item.MITRA,'DGS','DGS')}> 
                      <View style={{width:wp('5%'), justifyContent:'center', alignSelf:'center'}}>
                        <Icon type={'MaterialIcons'} name={'play-arrow'} style={{fontSize:14}} />
                      </View>
                      <View style={{width:wp('65%')}}>
                        <Text>{item.MITRA}</Text>
                      </View>
                      <View style={{width:wp('30%'), alignSelf:'center', justifyContent:'center'}}>
                        <Text style={{textAlign:'center'}}>{item.jumlah}M</Text>                    
                      </View>
                    </TouchableOpacity>
                  )}
                />
                <Modal 
                  isVisible={this.state.visibleModal === true}
                  onBackdropPress={() => this.setState({ visibleModal: false })}>
                  {this.renderModalContent()}
                </Modal>
              </View>
            )}

            {renderIf(!statusSubs)(
              <View>
                <FlatList
                  data={(dataSubs4.length>0) ? dataSubs4 : []}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({ item }) => (
                    item.MITRA=='TOTAL'
                    ?
                    <TouchableOpacity style={styles.containerDetailData}> 
                      <View style={{width:wp('70%')}}>
                        <Text style={{textAlign:'center', fontWeight: 'bold'}}>{item.MITRA}</Text>
                      </View>
                      <View style={{width:wp('30%'), alignSelf:'center', justifyContent:'center'}}>
                        <Text style={{textAlign:'center', fontWeight: 'bold'}}>{item.jumlah}M</Text>                    
                      </View>
                    </TouchableOpacity>
                    :
                    <TouchableOpacity style={styles.containerDetailData} onPress={() => this._toggleModalSubs(item.MITRA,'DGS','DGS')}> 
                      <View style={{width:wp('5%'), justifyContent:'center', alignSelf:'center'}}>
                        <Icon type={'MaterialIcons'} name={'play-arrow'} style={{fontSize:14}} />
                      </View>
                      <View style={{width:wp('65%')}}>
                        <Text>{item.MITRA}</Text>
                      </View>
                      <View style={{width:wp('30%'), alignSelf:'center', justifyContent:'center'}}>
                        <Text style={{textAlign:'center'}}>{item.jumlah}M</Text>                    
                      </View>
                    </TouchableOpacity>
                  )}
                />
                <Modal 
                  isVisible={this.state.visibleModal === true}
                  onBackdropPress={() => this.setState({ visibleModal: false })}>
                  {this.renderModalContentSubs()}
                </Modal>
              </View>
            )}

            {renderIf(!statusMitra)(
              <View>
                <FlatList
                  data={(dataMitra4.length>0) ? dataMitra4 : []}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({ item }) => (
                    item.MITRA=='TOTAL'
                    ?
                    <TouchableOpacity style={styles.containerDetailData}> 
                      <View style={{width:wp('70%')}}>
                        <Text style={{textAlign:'center', fontWeight: 'bold'}}>{item.MITRA}</Text>
                      </View>
                      <View style={{width:wp('30%'), alignSelf:'center', justifyContent:'center'}}>
                        <Text style={{textAlign:'center', fontWeight: 'bold'}}>{item.jumlah}M</Text>                    
                      </View>
                    </TouchableOpacity>
                    :
                    <TouchableOpacity style={styles.containerDetailData} onPress={() => this._toggleModalMitra(item.MITRA,'DGS','DGS')}> 
                      <View style={{width:wp('5%'), justifyContent:'center', alignSelf:'center'}}>
                        <Icon type={'MaterialIcons'} name={'play-arrow'} style={{fontSize:14}} />
                      </View>
                      <View style={{width:wp('65%')}}>
                        <Text>{item.MITRA}</Text>
                      </View>
                      <View style={{width:wp('30%'), alignSelf:'center', justifyContent:'center'}}>
                        <Text style={{textAlign:'center'}}>{item.jumlah}M</Text>                    
                      </View>
                    </TouchableOpacity>
                  )}
                />
                <Modal 
                  isVisible={this.state.visibleModal === true}
                  onBackdropPress={() => this.setState({ visibleModal: false })}>
                  {this.renderModalContentMitra()}
                </Modal> 
              </View>
            )}

            {renderIf(!statusTelkom)(
              <View>
                <FlatList
                  data={(dataTelkom4.length>0) ? dataTelkom4 : []}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({ item }) => (
                    item.MITRA=='TOTAL'
                    ?
                    <TouchableOpacity style={styles.containerDetailData}> 
                      <View style={{width:wp('70%')}}>
                        <Text style={{textAlign:'center', fontWeight: 'bold'}}>{item.MITRA}</Text>
                      </View>
                      <View style={{width:wp('30%'), alignSelf:'center', justifyContent:'center'}}>
                        <Text style={{textAlign:'center', fontWeight: 'bold'}}>{item.jumlah}M</Text>                    
                      </View>
                    </TouchableOpacity>
                    :
                    <TouchableOpacity style={styles.containerDetailData} onPress={() => this._toggleModalTelkom(item.MITRA,'DGS','DGS')}> 
                      <View style={{width:wp('5%'), justifyContent:'center', alignSelf:'center'}}>
                        <Icon type={'MaterialIcons'} name={'play-arrow'} style={{fontSize:14}} />
                      </View>
                      <View style={{width:wp('65%')}}>
                        <Text>{item.MITRA}</Text>
                      </View>
                      <View style={{width:wp('30%'), alignSelf:'center', justifyContent:'center'}}>
                        <Text style={{textAlign:'center'}}>{item.jumlah}M</Text>                    
                      </View>
                    </TouchableOpacity>
                  )}
                />
                <Modal 
                  isVisible={this.state.visibleModal === true}
                  onBackdropPress={() => this.setState({ visibleModal: false })}>
                  {this.renderModalContentTelkom()}
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
            <Title style={{color:'#FFF'}}>Detail Screen</Title>
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

  ebisProspectREVENUE: state.DgsDetailReducer.headerEbisValue,
  ebisProspectProject: state.DgsDetailReducer.headerEbisProject,

  ebisProspectREVENUE2:state.DgsDetailReducer.headerDesValue,
  ebisProspectProject2:state.DgsDetailReducer.headerDesProject,

  ebisProspectREVENUE3:state.DgsDetailReducer.headerDbsValue,
  ebisProspectProject3:state.DgsDetailReducer.headerDbsProject,
 
  ebisProspectREVENUE4:state.DgsDetailReducer.headerDgsValue,
  ebisProspectProject4:state.DgsDetailReducer.headerDgsProject,
  
  //data All
  dataAll: state.DgsDetailReducer.dataEbisAll,
  dataAll2:state.DgsDetailReducer.dataDesAll,
  dataAll3:state.DgsDetailReducer.dataDbsAll,
  dataAll4:state.DgsDetailReducer.dataDgsAll,

  //data subs
  dataSubs: state.DgsDetailReducer.dataEbisSubs,
  dataSubs2:state.DgsDetailReducer.dataDesSubs,
  dataSubs3:state.DgsDetailReducer.dataDbsSubs,
  dataSubs4:state.DgsDetailReducer.dataDgsSubs,

  //data mitra
  dataMitra: state.DgsDetailReducer.dataEbisMitra,
  dataMitra2:state.DgsDetailReducer.dataDesMitra,
  dataMitra3:state.DgsDetailReducer.dataDbsMitra,
  dataMitra4:state.DgsDetailReducer.dataDgsMitra,

  //data telkom
  dataTelkom: state.DgsDetailReducer.dataEbisTelkom,
  dataTelkom2:state.DgsDetailReducer.dataDesTelkom,
  dataTelkom3:state.DgsDetailReducer.dataDbsTelkom,
  dataTelkom4:state.DgsDetailReducer.dataDgsTelkom,
})

export default connect(mapStateToProps)(DbsDetailScreens);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  //content style
  imageContent:{
    width:wp('13%'), height:'100%'
  },
  wrapperHeaderContent:{
    backgroundColor:'#FFF',
    marginTop:hp('2%'),
    backgroundColor:'#575F6A', 
    flexDirection:'row', 
    width:wp('100%'), 
    padding:hp('1%')
  },

  //tab style 
  wrapperTabs:{
    flex:1,
    width:wp('100%'),
    height:hp('8%'),
    backgroundColor:'#D1D4D9',
    alignSelf:'center',
    alignItems:'center'
  },
  tabStyle:{
    backgroundColor:'#575F6A'
  },
  activeTabStyle:{
    backgroundColor:'#95a5a6',
  },
  activeTextStyle:{
    color:'#FFF'
  },
  textStyle:{
    color:'#FFF'
  },

  //style buat arrownya
  wrapperArrow:{
    flexDirection:'row', 
    marginTop:hp('2%')
  },
  imageStyle:{
    width:wp('9%'), 
    height:hp('9%')
  },
  containerArrowProspect:{
    height:hp('9%'), 
    width:wp('24%'), 
    backgroundColor:'#ddc8df',
    justifyContent:'center',
    alignItems:'center'
  },
  containerArrowProspect2:{
    marginLeft:wp('.5'),
    marginRight:wp('.5'),
    height:hp('9%'), 
    width:wp('13%'), 
  },
  containerArrowSubmission:{
    height:hp('9%'), 
    width:wp('24%'), 
    backgroundColor:'#ecb889',
    justifyContent:'center',
    alignItems:'center'
  },
  containerArrowSubmission2:{
    marginLeft:wp('.5'),
    marginRight:wp('.5'),
    height:hp('9%'), 
    width:wp('13%'), 
  },
  containerArrowWin:{
    height:hp('9%'), 
    width:wp('24%'), 
    backgroundColor:'#c7eecc',
    justifyContent:'center',
    alignItems:'center'
  },
  containerArrowWin2:{
    marginLeft:wp('.5'),
    marginRight:wp('.5'),
    height:hp('9%'), 
    width:wp('13%'), 
  },
  containerArrowBill:{
    height:hp('9%'), 
    width:wp('24%'), 
    backgroundColor:'#a9c1fb',
    justifyContent:'center',
    alignItems:'center'
  },
  containerArrowBill2:{
    marginLeft:wp('.5'),
    marginRight:wp('.5'),
    height:hp('9%'), 
    width:wp('13%'), 
  },
  textJudul:{
    fontWeight:'bold',
    fontSize:13
  },
  textIsi:{
    fontWeight:'700',
    fontSize:11
  },
  textKeterangan:{
    fontSize:9,
    fontWeight:'500',
  },

  //column 4 deskripsi
  judulColumn:{
    backgroundColor:'#670063'
  },
  isiColumn:{
    height:hp('7%'),
    backgroundColor:'#ddc8df',
    justifyContent:'center',
    alignItems:'center'
  },
  judulColumn2:{
    backgroundColor:'#D95C00'
  },
  isiColumn2:{
    height:hp('7%'),
    backgroundColor:'#ecb889',
    justifyContent:'center',
    alignItems:'center'
  },
  judulColumn3:{
    backgroundColor:'#00A440'
  },
  isiColumn3:{
    height:hp('7%'),
    backgroundColor:'#c7eecc',
    justifyContent:'center',
    alignItems:'center'
  },
  judulColumn4:{
    backgroundColor:'#4C6BA7'
  },
  isiColumn4:{
    height:hp('7%'),
    backgroundColor:'#a9c1fb',
    justifyContent:'center',
    alignItems:'center'
  },
  textJudulColumn:{
    fontWeight:'bold',
    color:'#FFF',
    fontSize:12,
    textAlign:'center'
  },
  textIsiColumn:{
    fontWeight:'700',
    fontSize:10,
    textAlign:'center'
  },

  //detail 
  containerDetailData:{
    justifyContent:'space-between', 
    flexDirection:'row', 
    borderBottomColor:'#000',
    borderBottomWidth:1,
    padding:hp('2%')
  },
  modalContent: {
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    borderColor: "rgba(0, 0, 0, 0.1)"
  },
});
