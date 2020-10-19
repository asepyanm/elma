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
//import renderIf from '../../components/renderIf'
import url from '../../../../../config/api_service'

class detailRekapWin extends Component {
  constructor(props) {
    super(props);
    this.state = {

      group: this.props.navigation.state.params.group,   
      status: this.props.navigation.state.params.status,   
      id:'',

      //modal
      visibleModal: false,
      loaderTampilDetail: false,
      dataTampung:[],
      dataDetail:[],
      dataPopup:[],
    
    }
  }

  componentWillMount(){

    this.props.dispatch({
      type: 'DETAIL_REKAP_WIN',
      payload: RNFetchBlob.config({
        trusty:true
      }). fetch('GET', `${url.API}/ebis_getnotificationproject/status/${this.state.status}/group/${this.state.group}`)
    })
   
  }

  _toggleModal(status,group,id){
    this.setState({
      visibleModal: !this.state.visibleModal,
      loaderTampilDetail:true,
      pressed: false
    })
    RNFetchBlob.config({
        trusty:true
      }). fetch('GET', `${url.API}/ebis_getnotificationproject/status/${this.state.status}/group/${this.state.group}/notifid/${this.state.id}`).then((res) => {
      this.setState({dataTampung:JSON.parse(res.data), loaderTampilDetail:false });
    }).catch((err) => {
      this.setState({
        dataDetail:[],
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
      }). fetch('GET', `${url.API}/ebis_getdeliveryproject/div/${level.level}/treg/${this.state.treg}/witel/${this.state.witel}/startdate/${this.state.startdate}/enddate/${this.state.enddate}/range/DELAY/nmitra/ALL/idproject/${level.id}`).then((res) => {
      this.setState({ dataPopup: JSON.parse(res.data), loaderTampilDetail: false });
    }).catch((err) => {
      this.setState({
        loaderTampilDetail: false
      })
      alert(err)
    })
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
              <Text style={{ fontSize: 10, marginLeft: wp('2%') }}>NOT DONE</Text>
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

  renderModalContent() {
    const { dataTampung, loaderTampilDetail, pressed, OgpData } = this.state;
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
                  <View>
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
                  </View>
                )}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                  <View>
                    <TouchableOpacity style={styles.containerDetailData} onPress={this._onDataPress.bind(this, { level: item.DIVISI, mitra: item.MITRA, id: item.LOPID })}>
                      <View style={{ width: wp('35%'), alignSelf: 'center', justifyContent: 'center' }}>
                        <Text style={{ fontSize: 10 }}>{item.NAMACC}</Text>
                      </View>
                      <View style={{ width: wp('35%'), alignSelf: 'center', justifyContent: 'center' }}>
                        <Text style={{ fontSize: 10 }}>{item.NAMAPROJECT}</Text>
                      </View>
                      <View style={{ width: wp('10%'), alignSelf: 'center', justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ textAlign: 'center', fontSize: 10 }}>{parseFloat(item.REVENUE)}M</Text>
                      </View>
                    </TouchableOpacity>
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

  rekapWinScreen() {

    const {
      dataTampung,
     
      EbisProspectRev, EbisProspectProject, dataMitra,
      EbisDetailOgp, EbisDetailOgpSubs, EbisDetailOgpMitra, EbisDetailOgpTelkom 

    } = this.props;

    const { statusAll, statusSubs, statusMitra, statusTelkom, pressed } = this.state;

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
            <Text style={styles.textIsi}>{EbisProspectRev}M</Text>
            <Text style={styles.textKeterangan}>per {EbisProspectProject} Project</Text>
          </TouchableOpacity>

          <Image
            source={images.Win.arrowWin2}
            style={styles.imageStyle}
            resizeMode={'stretch'}
          />

        </View>

        <View style={styles.wrapperHeaderContent}>
          <View style={{ width: wp('35%') }}>
            <Text style={{ textAlign: 'center', color: '#FFF' }}>NAMA ACC</Text>
          </View>
          <View style={{ width: wp('35%') }}>
            <Text style={{ textAlign: 'center', color: '#FFF' }}>NAMA PROJECT</Text>
          </View>
          <View style={{ width: wp('30%') }}>
            <Text style={{ textAlign: 'center', color: '#FFF' }}>TOTAL</Text>
          </View>
        </View>

        {/* <ScrollView> */}
        <Content style={{ backgroundColor: '#FFF' }}>

          <View>
            <FlatList
              data={(dataTampung.length>0) ? dataTampung : []} 
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
                <TouchableOpacity style={styles.containerDetailData} onPress={() => this._toggleModal(item.NOTIF_ID)}>
                  <View style={{width:wp('5%'), justifyContent:'center', alignSelf:'center'}}>
                    <Icon type={'MaterialIcons'} name={'play-arrow'} style={{fontSize:14}} />
                  </View>
                  <View style={{width:wp('30%')}}>
                    <Text>{item.NAMACC}</Text>
                  </View>
                  <View style={{width:wp('35%')}}>
                    <Text>{item.NAMAPROJECT}</Text>
                  </View>
                  <View style={{width:wp('30%'), alignSelf:'center', justifyContent:'center'}}>
                    <Text style={{textAlign:'center'}}>{item.REVCURRYEAR}M</Text>                    
                  </View>
                </TouchableOpacity>

              )}
              ListEmptyComponent={() => (
                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
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
            <Title style={{ color: '#FFF' }}>Delay Delivery</Title>
          </Body>
          <Right />
        </Header>

        <View style={styles.wrapperTabs}>
          <Tabs tabBarUnderlineStyle={{ backgroundColor: '#575F6A' }}>
            <Tab heading="EBIS" tabStyle={styles.tabStyle} activeTabStyle={styles.activeTabStyle} activeTextStyle={styles.activeTextStyle} textStyle={styles.textStyle}>
              {this.rekapWinScreen()}
            </Tab>
          </Tabs>
        </View>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({

  dataDetail: state.rekapReducer.dataDetailWin,

})

export default connect(mapStateToProps)(detailRekapWin);

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
