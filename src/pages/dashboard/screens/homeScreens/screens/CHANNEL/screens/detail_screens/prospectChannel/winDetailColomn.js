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
import RNFetchBlob from 'rn-fetch-blob'

//global
import renderIf from '../../../../../../../../components/renderIf';
import url from '../../../../../../../../../config/api_service';

class EbisDetailColumnProspectScreens extends Component{
  constructor(props){
    super(props);
    this.state = {

      startdate: this.props.navigation.state.params.start_date,
      enddate: this.props.navigation.state.params.end_date,   
      namaDetail: this.props.navigation.state.params.namaDetail,
      reg: this.props.navigation.state.params.reg,
      witel: this.props.navigation.state.params.witel,
			nameChannel:this.props.navigation.state.params.nameChannel,

      //modal
      visibleModal:false,
      loaderTampil:false,
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
		const {nameChannel} = this.state;
    this.setState({
      loaderTampil:false,
    })    
 
    //get data ALL
    this.props.dispatch({
      type:'DETAIL_WIN_EBIS',
      payload:RNFetchBlob.config({
        trusty:true
      }). fetch('GET', `${url.API2}/ebis_getchannellistsub/stage/WIN/channel/${nameChannel}/div/EBIS/categ/ALL/startdate/${this.state.startdate}/enddate/${this.state.enddate}/treg/${this.state.reg}/witel/${this.state.witel}`)
    });
    this.props.dispatch({
      type:'DETAIL_WIN_DES',
      payload:RNFetchBlob.config({
        trusty:true
      }). fetch('GET', `${url.API2}/ebis_getchannellistsub/stage/WIN/channel/${nameChannel}/div/DES/categ/ALL/startdate/${this.state.startdate}/enddate/${this.state.enddate}/treg/${this.state.reg}/witel/${this.state.witel}`)
    });
    this.props.dispatch({
      type:'DETAIL_WIN_DBS',
      payload:RNFetchBlob.config({
        trusty:true
      }). fetch('GET', `${url.API2}/ebis_getchannellistsub/stage/WIN/channel/${nameChannel}/div/DBS/categ/ALL/startdate/${this.state.startdate}/enddate/${this.state.enddate}/treg/${this.state.reg}/witel/${this.state.witel}`)
    });
    this.props.dispatch({
      type:'DETAIL_WIN_DGS',
      payload:RNFetchBlob.config({
        trusty:true
      }). fetch('GET', `${url.API2}/ebis_getchannellistsub/stage/WIN/channel/${nameChannel}/div/DGS/categ/ALL/startdate/${this.state.startdate}/enddate/${this.state.enddate}/treg/${this.state.reg}/witel/${this.state.witel}`)
    });

    //get data detail SUBS
    this.props.dispatch({
      type:'DETAIL_SUBS_WIN_EBIS',
      payload:RNFetchBlob.config({
        trusty:true
      }). fetch('GET', `${url.API2}/ebis_getchannellistsub/stage/WIN/channel/${nameChannel}/div/EBIS/categ/SUBS/startdate/${this.state.startdate}/enddate/${this.state.enddate}/treg/${this.state.reg}/witel/${this.state.witel}`)
    });
    this.props.dispatch({
      type:'DETAIL_SUBS_WIN_DES',
      payload:RNFetchBlob.config({
        trusty:true
      }). fetch('GET', `${url.API2}/ebis_getchannellistsub/stage/WIN/channel/${nameChannel}/div/DES/categ/SUBS/startdate/${this.state.startdate}/enddate/${this.state.enddate}/treg/${this.state.reg}/witel/${this.state.witel}`)
    });
    this.props.dispatch({
      type:'DETAIL_SUBS_WIN_DBS',
      payload:RNFetchBlob.config({
        trusty:true
      }). fetch('GET', `${url.API2}/ebis_getchannellistsub/stage/WIN/channel/${nameChannel}/div/DBS/categ/SUBS/startdate/${this.state.startdate}/enddate/${this.state.enddate}/treg/${this.state.reg}/witel/${this.state.witel}`)
    });
    this.props.dispatch({
      type:'DETAIL_SUBS_WIN_DGS',
      payload:RNFetchBlob.config({
        trusty:true
      }). fetch('GET', `${url.API2}/ebis_getchannellistsub/stage/WIN/channel/${nameChannel}/div/DGS/categ/SUBS/startdate/${this.state.startdate}/enddate/${this.state.enddate}/treg/${this.state.reg}/witel/${this.state.witel}`)
    });

    //get data detail MITRA
    this.props.dispatch({
      type:'DETAIL_MITRA_WIN_EBIS',
      payload:RNFetchBlob.config({
        trusty:true
      }). fetch('GET', `${url.API2}/ebis_getchannellistsub/stage/WIN/channel/${nameChannel}/div/EBIS/categ/MITRA/startdate/${this.state.startdate}/enddate/${this.state.enddate}/treg/${this.state.reg}/witel/${this.state.witel}`)
    });
    this.props.dispatch({
      type:'DETAIL_MITRA_WIN_DES',
      payload:RNFetchBlob.config({
        trusty:true
      }). fetch('GET', `${url.API2}/ebis_getchannellistsub/stage/WIN/channel/${nameChannel}/div/DES/categ/MITRA/startdate/${this.state.startdate}/enddate/${this.state.enddate}/treg/${this.state.reg}/witel/${this.state.witel}`)
    });
    this.props.dispatch({
      type:'DETAIL_MITRA_WIN_DBS',
      payload:RNFetchBlob.config({
        trusty:true
      }). fetch('GET', `${url.API2}/ebis_getchannellistsub/stage/WIN/channel/${nameChannel}/div/DBS/categ/MITRA/startdate/${this.state.startdate}/enddate/${this.state.enddate}/treg/${this.state.reg}/witel/${this.state.witel}`)
    });
    this.props.dispatch({
      type:'DETAIL_MITRA_WIN_DGS',
      payload:RNFetchBlob.config({
        trusty:true
      }). fetch('GET', `${url.API2}/ebis_getchannellistsub/stage/WIN/channel/${nameChannel}/div/DGS/categ/MITRA/startdate/${this.state.startdate}/enddate/${this.state.enddate}/treg/${this.state.reg}/witel/${this.state.witel}`)
    });
    
    //get data detail TELKOM
    this.props.dispatch({
      type:'DETAIL_TELKOM_WIN_EBIS',
      payload:RNFetchBlob.config({
        trusty:true
      }). fetch('GET', `${url.API2}/ebis_getchannellistsub/stage/WIN/channel/${nameChannel}/div/EBIS/categ/TELKOM/startdate/${this.state.startdate}/enddate/${this.state.enddate}/treg/${this.state.reg}/witel/${this.state.witel}`)
    });
    this.props.dispatch({
      type:'DETAIL_TELKOM_WIN_DES',
      payload:RNFetchBlob.config({
        trusty:true
      }). fetch('GET', `${url.API2}/ebis_getchannellistsub/stage/WIN/channel/${nameChannel}/div/DES/categ/TELKOM/startdate/${this.state.startdate}/enddate/${this.state.enddate}/treg/${this.state.reg}/witel/${this.state.witel}`)
    });
    this.props.dispatch({
      type:'DETAIL_TELKOM_WIN_DBS',
      payload:RNFetchBlob.config({
        trusty:true
      }). fetch('GET', `${url.API2}/ebis_getchannellistsub/stage/WIN/channel/${nameChannel}/div/DBS/categ/TELKOM/startdate/${this.state.startdate}/enddate/${this.state.enddate}/treg/${this.state.reg}/witel/${this.state.witel}`)
    });
    this.props.dispatch({
      type:'DETAIL_TELKOM_WIN_DGS',
      payload:RNFetchBlob.config({
        trusty:true
      }). fetch('GET', `${url.API2}/ebis_getchannellistsub/stage/WIN/channel/${nameChannel}/div/DGS/categ/TELKOM/startdate/${this.state.startdate}/enddate/${this.state.enddate}/treg/${this.state.reg}/witel/${this.state.witel}`)
    });

  }

  //pop up and detail L4
  _toggleModalDetail(item){
    this.setState({
      visibleModalDetail: !this.state.visibleModalDetail,
      //visibleModalDetail:false,
      loaderTampilDetailDetail:true
    })
    RNFetchBlob.config({
      trusty:true
    }). fetch('GET', `${url.API2}/ebis_getdetchannelcc/lopid/${item.LOPID}`)
    .then((res) => {
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

              <View style={{width:wp('18%'), alignSelf:'center' }}>
                  <Text style={{fontSize:10}}>A. Nama Project</Text>
                </View>
                <View style={{width:wp('2%'), alignSelf:'center'}}>
                  <Text style={{fontSize:10}}>:</Text>
                </View>
                <View style={{width:wp('50%'), alignSelf:'center'}}>
                  <Text style={{fontSize:10}}>{item.NAMAPROJECT}</Text>
                </View>

                <View style={{width:wp('18%'), alignSelf:'center' }}>
                  <Text style={{fontSize:10}}>B. Nama CC</Text>
                </View>
                <View style={{width:wp('2%'), alignSelf:'center' }}>
                  <Text style={{fontSize:10}}>:</Text>
                </View>
                <View style={{width:wp('50%'), alignSelf:'center' }}>
                  <Text style={{fontSize:10}}>{item.NAMACC}</Text>
                </View>

                <View style={{width:wp('18%'), alignSelf:'center' }}>
                  <Text style={{fontSize:10}}>C. Nilai Project</Text>
                </View>
                <View style={{width:wp('2%'), alignSelf:'center' }}>
                  <Text style={{fontSize:10}}>:</Text>
                </View>
                <View style={{width:wp('50%'), alignSelf:'center' }}>
                  <Text style={{fontSize:10}}>{parseFloat(item.REVENUE)} M</Text>
                </View>

                <View style={{width:wp('18%'), alignSelf:'center' }}>
                  <Text style={{fontSize:10}}>D. Lama Kontrak</Text>
                </View>
                <View style={{width:wp('2%'), alignSelf:'center' }}>
                  <Text style={{fontSize:10}}>:</Text>
                </View>
                <View style={{width:wp('50%'), alignSelf:'center' }}>
                  <Text style={{fontSize:10}}>{item.LAMAKONTRAK}</Text>
                </View>

                <View style={{width:wp('18%'), alignSelf:'center' }}>
                  <Text style={{fontSize:10}}>E. Divisi</Text>
                </View>
                <View style={{width:wp('2%'), alignSelf:'center' }}>
                  <Text style={{fontSize:10}}>:</Text>
                </View>
                <View style={{width:wp('50%'), alignSelf:'center' }}>
                  <Text style={{fontSize:10}}>{item.DIVISI}</Text>
                </View>

                <View style={{width:wp('18%'), alignSelf:'center' }}>
                  <Text style={{fontSize:10}}>F. Segmen</Text>
                </View>
                <View style={{width:wp('2%'), alignSelf:'center' }}>
                  <Text style={{fontSize:10}}>:</Text>
                </View>
                <View style={{width:wp('50%'), alignSelf:'center' }}>
                  <Text style={{fontSize:10}}>{item.SEGMEN}</Text>
                </View>

                <View style={{width:wp('18%'), alignSelf:'center' }}>
                  <Text style={{fontSize:10}}>G. Deliver</Text>
                </View>
                <View style={{width:wp('2%'), alignSelf:'center' }}>
                  <Text style={{fontSize:10}}>:</Text>
                </View>
                <View style={{width:wp('50%'), alignSelf:'center' }}>
                  <Text style={{fontSize:10}}>{item.DELIVER}</Text>
                </View>

                <View style={{width:wp('18%'), alignSelf:'center' }}>
                  <Text style={{fontSize:10}}>H. Payment Method</Text>
                </View>
                <View style={{width:wp('2%'), alignSelf:'center' }}>
                  <Text style={{fontSize:10}}>:</Text>
                </View>
                <View style={{width:wp('50%'), alignSelf:'center' }}>
                  <Text style={{fontSize:10}}>{item.PAYMENT_METHOD}</Text>
                </View>

                <View style={{width:wp('18%'), alignSelf:'center' }}>
                  <Text style={{fontSize:10}}>I. Channel</Text>
                </View>
                <View style={{width:wp('2%'), alignSelf:'center' }}>
                  <Text style={{fontSize:10}}>:</Text>
                </View>
                <View style={{width:wp('50%'), alignSelf:'center' }}>
                  <Text style={{fontSize:10}}>{item.KATEGORI_CHANNEL}</Text>
                </View>

                <View style={{width:wp('18%'), alignSelf:'center' }}>
                  <Text style={{fontSize:10}}>J. GPM</Text>
                </View>
                <View style={{width:wp('2%'), alignSelf:'center' }}>
                  <Text style={{fontSize:10}}>:</Text>
                </View>
                <View style={{width:wp('50%'), alignSelf:'center' }}>
                  <Text style={{fontSize:10}}>{item.GPM}</Text>
                </View>

                <View style={{width:wp('60%'), alignSelf:'center' }}>
                  <Text style={{fontSize:10, fontWeight:'bold'}}>K. Administration Progress</Text>
                </View>

                <View style={{width:wp('60%'), alignSelf:'center', marginLeft:'5%' }}>
                  <Text style={{fontSize:10}}>a. Kontrak Berlangganan :</Text>
                </View>

                <View style={{width:wp('60%'), alignSelf:'center', marginLeft:'10%' }}>
                  <Text style={{fontSize:10}}>Status KB : {item.STATUS_KB}</Text>
                </View>
                <View style={{width:wp('60%'), alignSelf:'center', marginLeft:'10%' }}>
                  <Text style={{fontSize:10}}>No KB : {item.NO_KB}</Text>
                </View>
                <View style={{width:wp('60%'), alignSelf:'center', marginLeft:'10%' }}>
                  <Text style={{fontSize:10}}>Durasi : {item.DURASI}</Text>
                </View>


                <View style={{width:wp('60%'), alignSelf:'center', marginLeft:'5%' }}>
                  <Text style={{fontSize:10}}>b. Justifikasi PO/P1 :</Text>
                </View>

                <View style={{width:wp('60%'), alignSelf:'center', marginLeft:'10%' }}>
                  <Text style={{fontSize:10}}>Status : {item.STATUS}</Text>
                </View>
                <View style={{width:wp('60%'), alignSelf:'center', marginLeft:'10%' }}>
                  <Text style={{fontSize:10}}>Dokumen : {item.DOKUMEN}</Text>
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

  //pop up and detail button ALL
  _toggleModal(item,div,maindiv){
		const {nameChannel} = this.state;
    this.setState({
      visibleModal: !this.state.visibleModal,
      loaderTampilDetail:true
    })
    RNFetchBlob.config({
      trusty:true
    }). fetch('GET', `${url.API2}/ebis_getdeallistcc/stage/WIN/categ/${maindiv}/channel/${nameChannel}/div/${div}/startdate/${this.state.startdate}/enddate/${this.state.enddate}/treg/ALL/witel/ALL/mitra/${item}`)
    .then((res) => {
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
                    <Text style={{fontSize:10}}>{item.NAMACC}</Text>
                  </View>
                  <View style={{width:wp('30%'), alignSelf:'center', justifyContent:'center'}}>
                    <Text style={{fontSize:10}}>{item.NAMAPROJECT}</Text>
                  </View>
                  <View style={{width:wp('10%'), alignSelf:'center', justifyContent:'center', alignItems:'center'}}>
                    <Text style={{textAlign:'center', fontSize:10}}>{parseFloat(item.JUMLAH)}M</Text>  
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
    )
  };
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
		const {nameChannel} = this.state;
    this.setState({
      visibleModal: !this.state.visibleModal,
      loaderTampilDetail:true
    })
    RNFetchBlob.config({
      trusty:true
    }). fetch('GET', `${url.API2}/ebis_getchannellistcc/stage/WIN/categ/${maindiv}/channel/${nameChannel}/div/${div}/startdate/${this.state.startdate}/enddate/${this.state.enddate}/treg/ALL/witel/ALL/mitra/${item}`)
    .then((res) => {
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
            )}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => this._toggleModalDetail(item)}> 
                <View style={styles.containerDetailData}> 
                  <View style={{width:wp('30%'), alignSelf:'center', justifyContent:'center'}}>
                    <Text style={{fontSize:10}}>{item.NAMACC}</Text>
                  </View>
                  <View style={{width:wp('30%'), alignSelf:'center', justifyContent:'center'}}>
                    <Text style={{fontSize:10}}>{item.NAMAPROJECT}</Text>
                  </View>
                  <View style={{width:wp('10%'), alignSelf:'center', justifyContent:'center', alignItems:'center'}}>
                    <Text style={{textAlign:'center', fontSize:10}}>{parseFloat(item.JUMLAH)}M</Text>  
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
    )
  };
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
		const {nameChannel} = this.state;
    this.setState({
      visibleModal: !this.state.visibleModal,
      loaderTampilDetail:true
    })
    RNFetchBlob.config({
      trusty:true
    }). fetch('GET', `${url.API2}/ebis_getchannellistcc/stage/WIN/categ/${maindiv}/channel/${nameChannel}/div/${div}/startdate/${this.state.startdate}/enddate/${this.state.enddate}/treg/ALL/witel/ALL/mitra/${item}`)
    .then((res) => {
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
            )}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => this._toggleModalDetail(item)}> 
                <View style={styles.containerDetailData}> 
                  <View style={{width:wp('30%'), alignSelf:'center', justifyContent:'center'}}>
                    <Text style={{fontSize:10}}>{item.NAMACC}</Text>
                  </View>
                  <View style={{width:wp('30%'), alignSelf:'center', justifyContent:'center'}}>
                    <Text style={{fontSize:10}}>{item.NAMAPROJECT}</Text>
                  </View>
                  <View style={{width:wp('10%'), alignSelf:'center', justifyContent:'center', alignItems:'center'}}>
                    <Text style={{textAlign:'center', fontSize:10}}>{parseFloat(item.JUMLAH)}M</Text>  
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
    )
  };
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
		const {nameChannel} = this.state;
    this.setState({
      visibleModal: !this.state.visibleModal,
      loaderTampilDetail:true
    })
    RNFetchBlob.config({
      trusty:true
    }). fetch('GET', `${url.API2}/ebis_getchannellistcc/stage/WIN/categ/${maindiv}/channel/${nameChannel}/div/${div}/startdate/${this.state.startdate}/enddate/${this.state.enddate}/treg/ALL/witel/ALL/mitra/${item}`)
    .then((res) => {
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
            )}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => this._toggleModalDetail(item)}> 
                <View style={styles.containerDetailData}> 
                  <View style={{width:wp('30%'), alignSelf:'center', justifyContent:'center'}}>
                    <Text style={{fontSize:10}}>{item.NAMACC}</Text>
                  </View>
                  <View style={{width:wp('30%'), alignSelf:'center', justifyContent:'center'}}>
                    <Text style={{fontSize:10}}>{item.NAMAPROJECT}</Text>
                  </View>
                  <View style={{width:wp('10%'), alignSelf:'center', justifyContent:'center', alignItems:'center'}}>
                    <Text style={{textAlign:'center', fontSize:10}}>{parseFloat(item.JUMLAH)}M</Text>  
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
    )
  };
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
  
  //screen detail
  EbisScreen(){
    //import image arrow
    const images = {
      prospect: {
        arrowProspect1: require('../../../../../../../../../assets/Arrow/arrowProspect.png'),
        arrowProspect2: require('../../../../../../../../../assets/Arrow/arrowProspect3.png'),
      },
      Submission: {
        arrowSub1: require('../../../../../../../../../assets/Arrow/arrowSub.png'),
        arrowSub2: require('../../../../../../../../../assets/Arrow/arrowSub3.png'),
      },
      Win: {
        arrowWin1: require('../../../../../../../../../assets/Arrow/arrowWin.png'),
        arrowWin2: require('../../../../../../../../../assets/Arrow/arrowWin3.png'),
      },
      Billcom: {
        arrowBil1: require('../../../../../../../../../assets/Arrow/arrowBillcom.png'),
        arrowBil2: require('../../../../../../../../../assets/Arrow/arrowBillcom3.png'),
      },

      //logo
      allImage:{
        allAktif: require('../../../../../../../../../assets/detailKonten/stage-on30.png'),
        allNon  : require('../../../../../../../../../assets/detailKonten/stage-off00.png'),
      },
      subsImage:{
        subsAktif: require('../../../../../../../../../assets/detailKonten/stage-on31.png'),
        subsNon  : require('../../../../../../../../../assets/detailKonten/stage-off01.png'),
      },
      mitraImage:{
        mitraAktif: require('../../../../../../../../../assets/detailKonten/stage-on32.png'),
        mitraNon  : require('../../../../../../../../../assets/detailKonten/stage-off02.png'),
      },
      telkomImage:{
        telkomAktif: require('../../../../../../../../../assets/detailKonten/stage-on33.png'),
        telkomNon  : require('../../../../../../../../../assets/detailKonten/stage-off03.png'),
      }
    };

    const{
        //prospect
      loaderTampil, dataAll, dataSubs, dataMitra, dataTelkom
    } = this.props;

    const {statusAll, statusSubs, statusMitra, statusTelkom, nameChannel} = this.state;

    return(
      loaderTampil
      ?
      <ActivityIndicator size={'large'} color={'#ffddcc'} style={{margin:hp('5%')}}/>
      :
      <View style={{backgroundColor:'#FFF', flex:1}}>
        <View style={styles.wrapperArrow}>
					<View style={{backgroundColor:'#c7eecc'}}>
						<Text style={styles.textJudul}>WIN</Text>
					</View>
				</View>
        
				<View style={styles.wrapperArrow}>
					<Image 
						source={images.Win.arrowWin1}
						style={styles.imageStyle}
						resizeMode={'stretch'}
					/>

          
					<View style={styles.containerArrowWin}>
  					<Text style={styles.textJudul}>{nameChannel}</Text>
            {
              nameChannel === 'GTMA'
                ?
                  <View>
                    <Text style={styles.textIsi}>{this.props.ebisPROSPECT_GTMA} M</Text>
                    <Text style={styles.textKeterangan}>per {this.props.ebisPROSPECT_GTMA_PROJECT} Project</Text>
                  </View>
                :
                  nameChannel === 'OC'
                    ?
                      <View>
                        <Text style={styles.textIsi}>{this.props.ebisPROSPECT_OC} M</Text>
                        <Text style={styles.textKeterangan}>per {this.props.ebisPROSPECT_OC_PROJECT} Project</Text>
                      </View>
                    :
                      <View>
                        <Text style={styles.textIsi}>{this.props.ebisPROSPECT_NGTMA} M</Text>
                        <Text style={styles.textKeterangan}>per {this.props.ebisPROSPECT_NGTMA_PROJECT} Project</Text>
                      </View>
            }
					</View>

					<Image 
						source={images.Win.arrowWin2}
						style={styles.imageStyle}
						resizeMode={'stretch'}
					/>

					<TouchableOpacity onPress={() => this.buttonAll()} style={styles.containerArrowProspect2}>
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

					<TouchableOpacity onPress={() => this.buttonSubs()} style={styles.containerArrowProspect2}>
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

					<TouchableOpacity onPress={() => this.buttonMitra()} style={styles.containerArrowProspect2}>
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

					<TouchableOpacity onPress={() => this.buttonTelkom()} style={styles.containerArrowProspect2}>
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
              loaderTampil
              ?
              <ActivityIndicator size={'large'} color={'#000'} style={{margin:hp('5%')}}/>
              :
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
                        <Text style={{textAlign:'center', fontWeight: 'bold'}}>{item.JUMLAH}M</Text>                    
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
                        <Text style={{textAlign:'center'}}>{item.JUMLAH}M</Text>                    
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
                        <Text style={{textAlign:'center', fontWeight: 'bold'}}>{item.JUMLAH}M</Text>                    
                      </View>
                    </TouchableOpacity>
                    :
                    <TouchableOpacity style={styles.containerDetailData} onPress={() => this._toggleModalSubs(item.MITRA,'EBIS','SUBS')}> 
                      <View style={{width:wp('5%'), justifyContent:'center', alignSelf:'center'}}>
                        <Icon type={'MaterialIcons'} name={'play-arrow'} style={{fontSize:14}} />
                      </View>
                      <View style={{width:wp('65%')}}>
                        <Text>{item.MITRA}</Text>
                      </View>
                      <View style={{width:wp('30%'), alignSelf:'center', justifyContent:'center'}}>
                        <Text style={{textAlign:'center'}}>{item.JUMLAH}M</Text>                    
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
                        <Text style={{textAlign:'center', fontWeight: 'bold'}}>{item.JUMLAH}M</Text>                    
                      </View>
                    </TouchableOpacity>
                    :
                    <TouchableOpacity style={styles.containerDetailData} onPress={() => this._toggleModalMitra(item.MITRA,'EBIS','MITRA')}> 
                      <View style={{width:wp('5%'), justifyContent:'center', alignSelf:'center'}}>
                        <Icon type={'MaterialIcons'} name={'play-arrow'} style={{fontSize:14}} />
                      </View>
                      <View style={{width:wp('65%')}}>
                        <Text>{item.MITRA}</Text>
                      </View>
                      <View style={{width:wp('30%'), alignSelf:'center', justifyContent:'center'}}>
                        <Text style={{textAlign:'center'}}>{item.JUMLAH}M</Text>                    
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
                        <Text style={{textAlign:'center', fontWeight: 'bold'}}>{item.JUMLAH}M</Text>                    
                      </View>
                    </TouchableOpacity>
                    :
                    <TouchableOpacity style={styles.containerDetailData} onPress={() => this._toggleModalTelkom(item.MITRA,'EBIS','TELKOM')}> 
                      <View style={{width:wp('5%'), justifyContent:'center', alignSelf:'center'}}>
                        <Icon type={'MaterialIcons'} name={'play-arrow'} style={{fontSize:14}} />
                      </View>
                      <View style={{width:wp('65%')}}>
                        <Text>{item.MITRA}</Text>
                      </View>
                      <View style={{width:wp('30%'), alignSelf:'center', justifyContent:'center'}}>
                        <Text style={{textAlign:'center'}}>{item.JUMLAH}M</Text>                    
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
        arrowProspect1: require('../../../../../../../../../assets/Arrow/arrowProspect.png'),
        arrowProspect2: require('../../../../../../../../../assets/Arrow/arrowProspect3.png'),
      },
      Submission: {
        arrowSub1: require('../../../../../../../../../assets/Arrow/arrowSub.png'),
        arrowSub2: require('../../../../../../../../../assets/Arrow/arrowSub3.png'),
      },
      Win: {
        arrowWin1: require('../../../../../../../../../assets/Arrow/arrowWin.png'),
        arrowWin2: require('../../../../../../../../../assets/Arrow/arrowWin3.png'),
      },
      Billcom: {
        arrowBil1: require('../../../../../../../../../assets/Arrow/arrowBillcom.png'),
        arrowBil2: require('../../../../../../../../../assets/Arrow/arrowBillcom3.png'),
      },

      //logo
      allImage:{
        allAktif: require('../../../../../../../../../assets/detailKonten/stage-on30.png'),
        allNon  : require('../../../../../../../../../assets/detailKonten/stage-off00.png'),
      },
      subsImage:{
        subsAktif: require('../../../../../../../../../assets/detailKonten/stage-on31.png'),
        subsNon  : require('../../../../../../../../../assets/detailKonten/stage-off01.png'),
      },
      mitraImage:{
        mitraAktif: require('../../../../../../../../../assets/detailKonten/stage-on32.png'),
        mitraNon  : require('../../../../../../../../../assets/detailKonten/stage-off02.png'),
      },
      telkomImage:{
        telkomAktif: require('../../../../../../../../../assets/detailKonten/stage-on33.png'),
        telkomNon  : require('../../../../../../../../../assets/detailKonten/stage-off03.png'),
      }
    };

    const{
      //prospect
      loaderTampil,dataAll2,dataSubs2,dataMitra2,dataTelkom2
    } = this.props;

    const {reg, witel, statusAll, statusSubs, statusMitra, statusTelkom, nameChannel} = this.state;

    return(
      loaderTampil
      ?
      <ActivityIndicator size={'large'} color={'#ffddcc'} style={{margin:hp('5%')}}/>
      :
      <View style={{backgroundColor:'#FFF', flex:1}}>
				<View style={styles.wrapperArrow}>
					<View style={{backgroundColor:'#c7eecc'}}>
						<Text style={styles.textJudul}>WIN</Text>
					</View>
				</View>

        <View style={styles.wrapperArrow}>
          <Image 
            source={images.Win.arrowWin1}
            style={styles.imageStyle}
            resizeMode={'stretch'}
          />

          <View style={styles.containerArrowWin}>
            <Text style={styles.textJudul}>{nameChannel}</Text>
            {
              nameChannel === 'GTMA'
                ?
                  <View>
                    <Text style={styles.textIsi}>{this.props.desPROSPECT_GTMA} M</Text>
                    <Text style={styles.textKeterangan}>per {this.props.desPROSPECT_GTMA_PROJECT} Project</Text>
                  </View>
                :
                  nameChannel === 'OC'
                    ?
                      <View>
                        <Text style={styles.textIsi}>{this.props.desPROSPECT_OC} M</Text>
                        <Text style={styles.textKeterangan}>per {this.props.desPROSPECT_OC_PROJECT} Project</Text>
                      </View>
                    :
                      <View>
                        <Text style={styles.textIsi}>{this.props.desPROSPECT_NGTMA} M</Text>
                        <Text style={styles.textKeterangan}>per {this.props.desPROSPECT_NGTMA_PROJECT} Project</Text>
                      </View>
            }
          </View>

          <Image 
            source={images.Win.arrowWin2}
            style={styles.imageStyle}
            resizeMode={'stretch'}
          />

          <TouchableOpacity onPress={() => this.buttonAll()} style={styles.containerArrowProspect2}>
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

          <TouchableOpacity onPress={() => this.buttonSubs()} style={styles.containerArrowProspect2}>
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

          <TouchableOpacity onPress={() => this.buttonMitra()} style={styles.containerArrowProspect2}>
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

          <TouchableOpacity onPress={() => this.buttonTelkom()} style={styles.containerArrowProspect2}>
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
                        <Text style={{textAlign:'center', fontWeight: 'bold'}}>{item.JUMLAH}M</Text>                    
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
                        <Text style={{textAlign:'center'}}>{item.JUMLAH}M</Text>                    
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
                        <Text style={{textAlign:'center', fontWeight: 'bold'}}>{item.JUMLAH}M</Text>                    
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
                        <Text style={{textAlign:'center'}}>{item.JUMLAH}M</Text>                    
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
                      <Text style={{textAlign:'center', fontWeight: 'bold'}}>{item.JUMLAH}M</Text>                    
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
                      <Text style={{textAlign:'center'}}>{item.JUMLAH}M</Text>                    
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
                      <Text style={{textAlign:'center', fontWeight: 'bold'}}>{item.JUMLAH}M</Text>                    
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
                      <Text style={{textAlign:'center'}}>{item.JUMLAH}M</Text>                    
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
        arrowProspect1: require('../../../../../../../../../assets/Arrow/arrowProspect.png'),
        arrowProspect2: require('../../../../../../../../../assets/Arrow/arrowProspect3.png'),
      },
      Submission: {
        arrowSub1: require('../../../../../../../../../assets/Arrow/arrowSub.png'),
        arrowSub2: require('../../../../../../../../../assets/Arrow/arrowSub3.png'),
      },
      Win: {
        arrowWin1: require('../../../../../../../../../assets/Arrow/arrowWin.png'),
        arrowWin2: require('../../../../../../../../../assets/Arrow/arrowWin3.png'),
      },
      Billcom: {
        arrowBil1: require('../../../../../../../../../assets/Arrow/arrowBillcom.png'),
        arrowBil2: require('../../../../../../../../../assets/Arrow/arrowBillcom3.png'),
      },

      //logo
      allImage:{
        allAktif: require('../../../../../../../../../assets/detailKonten/stage-on30.png'),
        allNon  : require('../../../../../../../../../assets/detailKonten/stage-off00.png'),
      },
      subsImage:{
        subsAktif: require('../../../../../../../../../assets/detailKonten/stage-on31.png'),
        subsNon  : require('../../../../../../../../../assets/detailKonten/stage-off01.png'),
      },
      mitraImage:{
        mitraAktif: require('../../../../../../../../../assets/detailKonten/stage-on32.png'),
        mitraNon  : require('../../../../../../../../../assets/detailKonten/stage-off02.png'),
      },
      telkomImage:{
        telkomAktif: require('../../../../../../../../../assets/detailKonten/stage-on33.png'),
        telkomNon  : require('../../../../../../../../../assets/detailKonten/stage-off03.png'),
      }
    };

    const{
      //prospect
      loaderTampil, ebisProspectREVENUE3,ebisProspectProject3,dataAll3,dataSubs3,dataMitra3,dataTelkom3
    } = this.props;

    const {reg, witel,statusAll, statusSubs, statusMitra, statusTelkom, nameChannel} = this.state;

    return(
      loaderTampil
      ?
      <ActivityIndicator size={'large'} color={'#ffddcc'} style={{margin:hp('5%')}}/>
      :
      <View style={{backgroundColor:'#FFF', flex:1}}>
				 <View style={styles.wrapperArrow}>
					<View style={{backgroundColor:'#c7eecc'}}>
						<Text style={styles.textJudul}>WIN</Text>
					</View>
				</View>

        <View style={styles.wrapperArrow}>
          <Image 
            source={images.Win.arrowWin1}
            style={styles.imageStyle}
            resizeMode={'stretch'}
          />

          <View style={styles.containerArrowWin}>
            <Text style={styles.textJudul}>{nameChannel}</Text>
            {
              nameChannel === 'GTMA'
                ?
                  <View>
                    <Text style={styles.textIsi}>{this.props.dbsPROSPECT_GTMA} M</Text>
                    <Text style={styles.textKeterangan}>per {this.props.dbsPROSPECT_GTMA_PROJECT} Project</Text>
                  </View>
                :
                  nameChannel === 'OC'
                    ?
                      <View>
                        <Text style={styles.textIsi}>{this.props.dbsPROSPECT_OC} M</Text>
                        <Text style={styles.textKeterangan}>per {this.props.dbsPROSPECT_OC_PROJECT} Project</Text>
                      </View>
                    :
                      <View>
                        <Text style={styles.textIsi}>{this.props.dbsPROSPECT_NGTMA} M</Text>
                        <Text style={styles.textKeterangan}>per {this.props.dbsPROSPECT_NGTMA_PROJECT} Project</Text>
                      </View>
            }
          </View>

          <Image 
            source={images.Win.arrowWin2}
            style={styles.imageStyle}
            resizeMode={'stretch'}
          />

          <TouchableOpacity onPress={() => this.buttonAll()} style={styles.containerArrowProspect2}>
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

          <TouchableOpacity onPress={() => this.buttonSubs()} style={styles.containerArrowProspect2}>
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

          <TouchableOpacity onPress={() => this.buttonMitra()} style={styles.containerArrowProspect2}>
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

          <TouchableOpacity onPress={() => this.buttonTelkom()} style={styles.containerArrowProspect2}>
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
                        <Text style={{textAlign:'center', fontWeight: 'bold'}}>{item.JUMLAH}M</Text>                    
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
                        <Text style={{textAlign:'center'}}>{item.JUMLAH}M</Text>                    
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
                        <Text style={{textAlign:'center', fontWeight: 'bold'}}>{item.JUMLAH}M</Text>                    
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
                        <Text style={{textAlign:'center'}}>{item.JUMLAH}M</Text>                    
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
                        <Text style={{textAlign:'center', fontWeight: 'bold'}}>{item.JUMLAH}M</Text>                    
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
                        <Text style={{textAlign:'center'}}>{item.JUMLAH}M</Text>                    
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
                        <Text style={{textAlign:'center', fontWeight: 'bold'}}>{item.JUMLAH}M</Text>                    
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
                        <Text style={{textAlign:'center'}}>{item.JUMLAH}M</Text>                    
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
        arrowProspect1: require('../../../../../../../../../assets/Arrow/arrowProspect.png'),
        arrowProspect2: require('../../../../../../../../../assets/Arrow/arrowProspect3.png'),
      },
      Submission: {
        arrowSub1: require('../../../../../../../../../assets/Arrow/arrowSub.png'),
        arrowSub2: require('../../../../../../../../../assets/Arrow/arrowSub3.png'),
      },
      Win: {
        arrowWin1: require('../../../../../../../../../assets/Arrow/arrowWin.png'),
        arrowWin2: require('../../../../../../../../../assets/Arrow/arrowWin3.png'),
      },
      Billcom: {
        arrowBil1: require('../../../../../../../../../assets/Arrow/arrowBillcom.png'),
        arrowBil2: require('../../../../../../../../../assets/Arrow/arrowBillcom3.png'),
      },

      //logo
      allImage:{
        allAktif: require('../../../../../../../../../assets/detailKonten/stage-on30.png'),
        allNon  : require('../../../../../../../../../assets/detailKonten/stage-off00.png'),
      },
      subsImage:{
        subsAktif: require('../../../../../../../../../assets/detailKonten/stage-on31.png'),
        subsNon  : require('../../../../../../../../../assets/detailKonten/stage-off01.png'),
      },
      mitraImage:{
        mitraAktif: require('../../../../../../../../../assets/detailKonten/stage-on32.png'),
        mitraNon  : require('../../../../../../../../../assets/detailKonten/stage-off02.png'),
      },
      telkomImage:{
        telkomAktif: require('../../../../../../../../../assets/detailKonten/stage-on33.png'),
        telkomNon  : require('../../../../../../../../../assets/detailKonten/stage-off03.png'),
      }
    };

    const{
      //prospect
      loaderTampil, ebisProspectREVENUE4,ebisProspectProject4,dataAll4,dataSubs4,dataMitra4,dataTelkom4
    } = this.props;

    const {reg, witel, statusAll, statusSubs, statusMitra, statusTelkom, nameChannel} = this.state;

    return(
      loaderTampil
      ?
      <ActivityIndicator size={'large'} color={'#ffddcc'} style={{margin:hp('5%')}}/>
      :
      <View style={{backgroundColor:'#FFF', flex:1}}>
				<View style={styles.wrapperArrow}>
					<View style={{backgroundColor:'#c7eecc'}}>
						<Text style={styles.textJudul}>WIN</Text>
					</View>
				</View>

        <View style={styles.wrapperArrow}>
          <Image 
            source={images.Win.arrowWin1}
            style={styles.imageStyle}
            resizeMode={'stretch'}
          />

          <View style={styles.containerArrowWin}>
            <Text style={styles.textJudul}>{nameChannel}</Text>
            {
              nameChannel === 'GTMA'
                ?
                  <View>
                    <Text style={styles.textIsi}>{this.props.dgsPROSPECT_GTMA} M</Text>
                    <Text style={styles.textKeterangan}>per {this.props.dgsPROSPECT_GTMA_PROJECT} Project</Text>
                  </View>
                :
                  nameChannel === 'OC'
                    ?
                      <View>
                        <Text style={styles.textIsi}>{this.props.dgsPROSPECT_OC} M</Text>
                        <Text style={styles.textKeterangan}>per {this.props.dgsPROSPECT_OC_PROJECT} Project</Text>
                      </View>
                    :
                      <View>
                        <Text style={styles.textIsi}>{this.props.dgsPROSPECT_NGTMA} M</Text>
                        <Text style={styles.textKeterangan}>per {this.props.dgsPROSPECT_NGTMA_PROJECT} Project</Text>
                      </View>
            }
          </View>

          <Image 
            source={images.Win.arrowWin2}
            style={styles.imageStyle}
            resizeMode={'stretch'}
          />

          <TouchableOpacity onPress={() => this.buttonAll()} style={styles.containerArrowProspect2}>
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

          <TouchableOpacity onPress={() => this.buttonSubs()} style={styles.containerArrowProspect2}>
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

          <TouchableOpacity onPress={() => this.buttonMitra()} style={styles.containerArrowProspect2}>
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

          <TouchableOpacity onPress={() => this.buttonTelkom()} style={styles.containerArrowProspect2}>
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
                        <Text style={{textAlign:'center', fontWeight: 'bold'}}>{item.JUMLAH}M</Text>                    
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
                        <Text style={{textAlign:'center'}}>{item.JUMLAH}M</Text>                    
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
                        <Text style={{textAlign:'center', fontWeight: 'bold'}}>{item.JUMLAH}M</Text>                    
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
                        <Text style={{textAlign:'center'}}>{item.JUMLAH}M</Text>                    
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
                        <Text style={{textAlign:'center', fontWeight: 'bold'}}>{item.JUMLAH}M</Text>                    
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
                        <Text style={{textAlign:'center'}}>{item.JUMLAH}M</Text>                    
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
                        <Text style={{textAlign:'center', fontWeight: 'bold'}}>{item.JUMLAH}M</Text>                    
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
                        <Text style={{textAlign:'center'}}>{item.JUMLAH}M</Text>                    
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
  //data ebis
  ebisPROSPECT_GTMA: state.EbisReducerChannel.ebisWIN_GTMA,
  ebisPROSPECT_GTMA_PROJECT: state.EbisReducerChannel.ebisWIN_GTMA_PROJECT,
  ebisPROSPECT_NGTMA: state.EbisReducerChannel.ebisWIN_NGTMA,
  ebisPROSPECT_NGTMA_PROJECT: state.EbisReducerChannel.ebisWIN_NGTMA_PROJECT,
  ebisPROSPECT_OC: state.EbisReducerChannel.ebisWIN_OC,
  ebisPROSPECT_OC_PROJECT: state.EbisReducerChannel.ebisWIN_OC_PROJECT,

  //data des
  desPROSPECT_GTMA: state.DesReducerChannel.ebisWIN_GTMA,
  desPROSPECT_GTMA_PROJECT: state.DesReducerChannel.ebisWIN_GTMA_PROJECT,
  desPROSPECT_NGTMA: state.DesReducerChannel.ebisWIN_NGTMA,
  desPROSPECT_NGTMA_PROJECT: state.DesReducerChannel.ebisWIN_NGTMA_PROJECT,
  desPROSPECT_OC: state.DesReducerChannel.ebisWIN_OC,
  desPROSPECT_OC_PROJECT: state.DesReducerChannel.ebisWIN_OC_PROJECT,

  //data dbs
  dbsPROSPECT_GTMA: state.DbsReducerChannel.ebisWIN_GTMA,
  dbsPROSPECT_GTMA_PROJECT: state.DbsReducerChannel.ebisWIN_GTMA_PROJECT,
  dbsPROSPECT_NGTMA: state.DbsReducerChannel.ebisWIN_NGTMA,
  dbsPROSPECT_NGTMA_PROJECT: state.DbsReducerChannel.ebisWIN_NGTMA_PROJECT,
  dbsPROSPECT_OC: state.DbsReducerChannel.ebisWIN_OC,
  dbsPROSPECT_OC_PROJECT: state.DbsReducerChannel.ebisWIN_OC_PROJECT,

  //data dgs
  dgsPROSPECT_GTMA: state.DgsReducerChannel.ebisWIN_GTMA,
  dgsPROSPECT_GTMA_PROJECT: state.DgsReducerChannel.ebisWIN_GTMA_PROJECT,
  dgsPROSPECT_NGTMA: state.DgsReducerChannel.ebisWIN_NGTMA,
  dgsPROSPECT_NGTMA_PROJECT: state.DgsReducerChannel.ebisWIN_NGTMA_PROJECT,
  dgsPROSPECT_OC: state.DgsReducerChannel.ebisWIN_OC,
  dgsPROSPECT_OC_PROJECT: state.DgsReducerChannel.ebisWIN_OC_PROJECT,


  //data All
  dataAll: state.DbsDetailReducer.dataEbisAll,
  dataAll2:state.DbsDetailReducer.dataDesAll,
  dataAll3:state.DbsDetailReducer.dataDbsAll,
  dataAll4:state.DbsDetailReducer.dataDgsAll,

  //data subs
  dataSubs: state.DbsDetailReducer.dataEbisSubs,
  dataSubs2:state.DbsDetailReducer.dataDesSubs,
  dataSubs3:state.DbsDetailReducer.dataDbsSubs,
  dataSubs4:state.DbsDetailReducer.dataDgsSubs,

  //data mitra
  dataMitra: state.DbsDetailReducer.dataEbisMitra,
  dataMitra2:state.DbsDetailReducer.dataDesMitra,
  dataMitra3:state.DbsDetailReducer.dataDbsMitra,
  dataMitra4:state.DbsDetailReducer.dataDgsMitra,

  //data telkom
  dataTelkom: state.DbsDetailReducer.dataEbisTelkom,
  dataTelkom2:state.DbsDetailReducer.dataDesTelkom,
  dataTelkom3:state.DbsDetailReducer.dataDbsTelkom,
  dataTelkom4:state.DbsDetailReducer.dataDgsTelkom,
})

export default connect(mapStateToProps)(EbisDetailColumnProspectScreens);

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
    height:hp('9%'), 
    width:wp('24%'), 
    backgroundColor:'#dfdfdd',
    justifyContent:'center',
    alignItems:'center'
  },
  containerArrowWin:{
    height:hp('9%'), 
    width:wp('24%'), 
    backgroundColor:'#c7eecc',
    justifyContent:'center',
    alignItems:'center'
  },
  containerArrowWin2:{
    height:hp('9%'), 
    width:wp('24%'), 
    backgroundColor:'#dfdfdd',
    justifyContent:'center',
    alignItems:'center'
  },
  containerArrowBill:{
    height:hp('9%'), 
    width:wp('24%'), 
    backgroundColor:'#a9c1fb',
    justifyContent:'center',
    alignItems:'center'
  },
  containerArrowBill2:{
    height:hp('9%'), 
    width:wp('24%'), 
    backgroundColor:'#dfdfdd',
    justifyContent:'center',
    alignItems:'center'
  },
  textJudul:{
    fontWeight:'bold',
    fontSize:13
  },
  textIsi:{
    fontWeight:'700',
    fontSize:11,
    textAlign:'center'
  },
  textKeterangan:{
    fontSize:9,
    fontWeight:'500',
    textAlign:'center'
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
