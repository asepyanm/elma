import React, { Component } from 'react';
import {
  Alert,
  AsyncStorage,
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
import { Header, Icon, Left, Right, Body, Button, Title, Tab, Tabs, Content, Container,Segment } from 'native-base';
import { connect } from 'react-redux';
import Modal from "react-native-modal";
import axios from 'axios';
import { StackNavigator } from "react-navigation";
import RNFetchBlob from 'react-native-fetch-blob'

//global
import renderIf from '../../../components/renderIf'
import url from '../../../../config/api_service'
//import rekapReducer from '../../reducer/rekap/reducerRekap';


class RekapScreens extends Component {
  constructor(props) {
    super(props);
    this.state = {

      //modal
      visibleModalDetail: false,
      visibleModalContent: false,
      loaderTampilDetail: false,
      loaderTampilContent: false,
      dataTampung: [],
      //dataDetailWin: [],
      //dataDetailLose: [],
      data: [],
      selected: '',
      status: 'WIN',
      group: 'NOT_LOGGED',
      loaderStatusPopup: false,
      dataContent: {},
      dataNAMACC:'',
      dataAMAPROJECT:'',
      dataREVCURRYEAR:'',
      dataMembers: [],
    }

/*     AsyncStorage.getItem('loginGroup', (error, result) => {
      if (result) {
          this.setState({
              group: result
          });
      }
    });
 */


  }

  getNum(val) {
    if (!isFinite(val)) {
      return 0;
    }
    if (isNaN(val)) {
      return 0;
    }
    return Math.ceil(val);
  }

  componentWillMount(){
    const {loginGroup} = this.props;

    this.props.dispatch({
      type: 'MONITOR_REKAP_ALL_SUMMARY',      
      payload:RNFetchBlob.config({
        trusty:true
      }). fetch('GET', `${url.API}/ebis_getnotificationsummaryrekap/group/${loginGroup}`)
    })
    this.props.dispatch({
      type: 'MONITOR_REKAP_WIN_SUMMARY',      
      payload:RNFetchBlob.config({
        trusty:true
      }). fetch('GET', `${url.API}/ebis_getnotificationsummaryrekap/group/${loginGroup}`)
    })
    this.props.dispatch({
      type: 'MONITOR_REKAP_LOSE_SUMMARY',      
      payload:RNFetchBlob.config({
        trusty:true
      }). fetch('GET', `${url.API}/ebis_getnotificationsummaryrekap/group/${loginGroup}`)
    })

  }

  _toggleModalWin(){
    const {loginGroup} = this.props;

    this.setState({
      visibleModalDetail:true,
      loaderTampilDetail:true,
      dataTampung:[],
    })
    RNFetchBlob.config({
        trusty:true
      }). fetch('GET', `${url.API}/ebis_getnotificationproject/status/WIN/group/${loginGroup}`).then((res) => {
      this.setState({dataTampung:res.data, loaderTampilDetail:false });
    }).catch((err) => {
      this.setState({
        loaderTampilDetail:false,
        dataTampung:[],
      })
      //alert(err)
    })
  }

  _toggleModalLose(){
    const {loginGroup} = this.props;

    this.setState({
      visibleModalDetail:true,
      loaderTampilDetail:true,
      dataTampung:[],
    })
    RNFetchBlob.config({
        trusty:true
      }). fetch('GET', `${url.API}/ebis_getnotificationproject/status/LOSE/group/${loginGroup}`).then((res) => {
      this.setState({dataTampung:res.data, loaderTampilDetail:false });
    }).catch((err) => {
      this.setState({
        loaderTampilDetail:false,
        dataTampung:[],
      })
      //alert(err)
    })
  }

  _toggleModalContent(id,cc,project,rev){
    this.setState({
      visibleModalContent:true,
      loaderTampilContent:true,
      dataNAMACC:cc,
      dataNAMAPROJECT:project,
      dataREVCURRYEAR:rev,
    })

    //console.warn(`${this.state.status} ${id}`)
    RNFetchBlob.config({
        trusty:true
      }). fetch('GET', `${url.API}/ebis_getnotificationusergroup/status/${this.state.status}/notifid/${id}`).then((res) => { 
      this.setState({dataMembers:res.data, loaderTampilContent:false }) 
    }).catch((err) => {
      this.setState({
        loaderTampilContent:false,
        dataContent: [],
        dataMembers: [],
      })
      alert(err)
    })
  }

  renderModalDetail(){
    const {dataTampung, loaderTampilDetail} = this.state;
    return(
      <View style={styles.modalContent}>
      {
        loaderTampilDetail 
        ?
        <ActivityIndicator size={'large'} color={'#000'} style={{margin:hp('5%')}}/>
        :
        <View style={{width:wp('85%')}}>

          <View style={{ flexDirection: 'row', width: wp('45%'), marginTop: hp('4%') }}>                
            <TouchableOpacity style={{ height: hp('5%'), backgroundColor: '#575f6a', width: wp('85%'), alignItems: 'center', padding: hp('1%'), borderRadius: 1 }}>
              <Text style={{ color: '#FFF' }}>DETAIL</Text>
            </TouchableOpacity>
          </View>

          <FlatList
            data={(dataTampung.length>0) ? dataTampung : []} 
            ListHeaderComponent={() => (
              <View style={styles.wrapperHeaderContent}>
                <View style={{width:wp('23%')}}>
                  <Text style={{textAlign:'center', color:'#FFF', fontSize:12}}>Nama CC</Text>
                </View>
                <View style={{width:wp('40%')}}>
                  <Text style={{textAlign:'center', color:'#FFF', fontSize:12}}>Nama Project</Text>
                </View>
                <View style={{width:wp('15%'), alignItems:'center', justifyContent:'center'}}>
                  <Text style={{textAlign:'center', color:'#FFF', fontSize:12}}>Nilai</Text>
                </View>
              </View>
            )}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => this._toggleModalContent(item.NOTIF_ID,item.NAMACC,item.NAMAPROJECT,item.REVCURRYEAR)}> 
                <View style={styles.containerDetailData}> 
                  <View style={{width:wp('25%'), alignSelf:'center', justifyContent:'center'}}>
                    <Text style={{fontSize:10}}>{item.NAMACC}</Text>
                  </View>
                  <View style={{width:wp('40%'), alignSelf:'center', justifyContent:'center'}}>
                    <Text style={{fontSize:10}}>{item.NAMAPROJECT}</Text>
                  </View>
                  <View style={{width:wp('15%'), alignSelf:'center', justifyContent:'center', alignItems:'center'}}>
                    <Text style={{textAlign:'center', fontSize:10}}>{parseFloat(item.REVCURRYEAR)}M</Text>  
                  </View>
                </View>
              </TouchableOpacity>
            )}
            style={{height:hp('80%'), marginBottom:hp('4%')}}
          />
          <Modal 
            isVisible={this.state.visibleModalContent === true}
            onBackdropPress={() => this.setState({ visibleModalContent: false })}>
            {this.renderModalContent()}
          </Modal>
          <TouchableOpacity onPress={() => this.setState({ visibleModalDetail: false})} style={{height:hp('5%'),backgroundColor:'#e74c3c', width:wp('85%'), justifyContent:'center', alignItems:'center', padding:hp('1%'), borderRadius:5, marginBottom:hp('5%')}}>
            <Text style={{color:'#FFF'}}>Tutup</Text>
          </TouchableOpacity>
        </View>
        }
      </View>
    )
  };

  renderModalContent(){
    const { dataContent, dataMembers, loaderTampilContent } = this.state;
    return (
      <View style={{ backgroundColor: "white", alignItems: "center",  borderRadius: 4, borderColor: "rgba(0, 0, 0, 0.1)"}}>
        {
          loaderTampilContent
          ?
          <ActivityIndicator size={'large'} color={'#000'} style={{ margin: hp('5%') }} />
          :
          <View style={{ height: hp('75%'), width: wp('85%') }}>

            <View style={{ flexDirection: 'row', width: wp('45%'), marginTop: hp('2%') }}>                
              <TouchableOpacity style={{ height: hp('5%'), backgroundColor: '#575f6a', width: wp('85%'), alignItems: 'center', padding: hp('1%'), borderRadius: 1, marginBottom: hp('1%') }}>
                <Text style={{ color: '#FFF' }}>DETAIL</Text>
              </TouchableOpacity>
            </View>
            <View style={{ flexDirection: 'row', width: wp('45%'), marginTop: hp('2%') }}>
                <Text style={{ fontSize: 10, width:wp('22%') }}>A. Nama CC</Text>
                <Text style={{ fontSize: 10, width:wp('1%') }}>:</Text>
                <Text style={{ fontSize: 10, marginLeft: wp('2%') }}>{this.state.dataNAMACC}</Text>
            </View>

            <View style={{ flexDirection: 'row', width: wp('45%'), marginTop: hp('2%') }}>
                <Text style={{ fontSize: 10, width:wp('22%') }}>B. Project</Text>
                <Text style={{ fontSize: 10, width:wp('1%') }}>:</Text>
                <Text style={{ fontSize: 10, marginLeft: wp('2%') }}>{this.state.dataNAMAPROJECT}</Text>
            </View>

            <View style={{ flexDirection: 'row', width: wp('45%'), marginTop: hp('2%') }}>
                <Text style={{ fontSize: 10, width:wp('22%') }}>C. Nilai</Text>
                <Text style={{ fontSize: 10, width:wp('1%') }}>:</Text>
                <Text style={{ fontSize: 10, marginLeft: wp('2%') }}>{this.state.dataREVCURRYEAR}M</Text>
            </View>

            <View style={{ flexDirection: 'row', width: wp('45%'), marginTop: hp('2%') }}>
                <Text style={{ fontSize: 10, width:wp('22%') }}>MEMBER:</Text>
            </View>

            <FlatList
              data={(dataMembers.length>0) ? dataMembers : []} 
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <View > 
                  <View style={{width:wp('15%'), alignSelf:'center', justifyContent:'center'}}>
                  </View>
                  <View style={{width:wp('65%'), alignSelf:'center', justifyContent:'center'}}>
                    <Text style={{fontSize:10}}>{item.USER_NAME}</Text>
                  </View>
                </View>
              )}
              style={{ marginBottom:hp('4%')}}
            />

            <View style={{ position: 'absolute', bottom: 0 }}>
              <TouchableOpacity onPress={() => this.setState({ visibleModalContent: !this.state.visibleModalContent })} style={{ height: hp('5%'), backgroundColor: '#e74c3c', width: wp('85%'), alignItems: 'center', padding: hp('1%'), borderRadius: 5, marginBottom: hp('2%') }}>
                <Text style={{ color: '#FFF' }}>Tutup</Text>
              </TouchableOpacity>
            </View>
          </View>
        }
      </View>
    )
  }


  rekapScreen() {
    
    //import image arrow
    const images = {
      prospect: {
        arrowProspect1: require('../../../../assets/Arrow/arrowProspect.png'),
        arrowProspect2: require('../../../../assets/Arrow/arrowProspect3.png'),
      },
      Submission: {
        arrowSub1: require('../../../../assets/Arrow/arrowSub.png'),
        arrowSub2: require('../../../../assets/Arrow/arrowSub3.png'),
      },
      Win: {
        arrowWin1: require('../../../../assets/Arrow/arrowWin.png'),
        arrowWin2: require('../../../../assets/Arrow/arrowWin3.png'),
        arrowWin3: require('../../../../assets/Arrow/arrowWin2.png'),
      },
      Billcom: {
        arrowBil1: require('../../../../assets/Arrow/arrowBillcom.png'),
        arrowBil2: require('../../../../assets/Arrow/arrowBillcom3.png'),
      },

      //logo
      allImage: {
        allAktif: require('../../../../assets/detailKonten/stage-on30.png'),
        allNon: require('../../../../assets/detailKonten/stage-off00.png'),
      },
      subsImage: {
        subsAktif: require('../../../../assets/detailKonten/stage-on31.png'),
        subsNon: require('../../../../assets/detailKonten/stage-off01.png'),
      },
      mitraImage: {
        mitraAktif: require('../../../../assets/detailKonten/stage-on32.png'),
        mitraNon: require('../../../../assets/detailKonten/stage-off02.png'),
      },
      telkomImage: {
        telkomAktif: require('../../../../assets/detailKonten/stage-on33.png'),
        telkomNon: require('../../../../assets/detailKonten/stage-off03.png'),
      },
      arrowGrey: require('../../../../assets/Arrow/arrowGrey.png'),
    };

    const {
      navigation, loaderStatus,
      allTOTALPROJECT,allTOTALREV,
      winTOTALPROJECT,winTOTALREV,
      loseTOTALPROJECT,loseTOTALREV,
    } = this.props;

    const item = this.props.data;
 
    return (
      <View style={{ backgroundColor: '#FFF', flex: 1 }}>
        <View style={styles.wrapperArrow}>
          <Image
            source={images.Win.arrowWin1}
            style={styles.imageStyle}
            resizeMode={'stretch'}
          />

          <TouchableOpacity style={styles.containerArrowWin}>
            <Text style={styles.textJudul}>Nilai Project</Text>
            <Text style={styles.textIsi}>Rp. {allTOTALREV}Miliar</Text>
            <Text style={styles.textKeterangan}>Total {allTOTALPROJECT} Project</Text>
          </TouchableOpacity>

          <Image
            source={images.Win.arrowWin2}
            style={styles.imageStyle}
            resizeMode={'stretch'}
          />

        </View>

        <View style={styles.wrapperHeaderContent}>
          <View style={{ width: wp('30%') }}>
            <Text style={{ textAlign: 'center', color: '#FFF' }}></Text>
          </View>
        </View>

        {/* <ScrollView> */}
        <Content style={{ backgroundColor: '#FFF' }}>

          <View style={{ margin: hp('2%') }}>

            <View style={{ flexDirection: 'row', margin: hp('2%'), justifyContent: 'space-between' }}>
              <View style={{ marginBottom: hp('2%') }}>
                <Text style={[styles.textJudul, { marginBottom: 20, alignItems: 'center' }]}>WIN Summary</Text>
              </View>

              <TouchableOpacity style={styles.containerArrowWin2} onPress={() => this._toggleModalWin() }>
              <View>
                <Text style={styles.textIsi}>{winTOTALREV} M</Text>
                <Text style={styles.textKeterangan}>per {winTOTALPROJECT} Project</Text>
              </View>
              </TouchableOpacity>
            </View>

            <View style={{ flexDirection: 'row', margin: hp('2%'), justifyContent: 'space-between' }}>
              <View style={{ marginBottom: hp('2%') }}>
                <Text style={[styles.textJudul, { marginBottom: 20, alignItems: 'center' }]}>LOSE Summary</Text>
              </View>

              <TouchableOpacity style={styles.containerArrowWin2} onPress={() => this._toggleModalLose() }>
              <View>
                <Text style={styles.textIsi}>{loseTOTALREV} M</Text>
                <Text style={styles.textKeterangan}>per {loseTOTALPROJECT} Project</Text>
              </View>
              </TouchableOpacity>
            </View>
            
          </View>

          <Modal 
            isVisible={this.state.visibleModalDetail === true}
            onBackdropPress={() => this.setState({ visibleModalDetail: false })}>
            {this.renderModalDetail()}
          </Modal>

         </Content>
        {/* </ScrollView> */}
      </View>
    )
  }

  render() {

    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();
    var hour = new Date().getHours()
    var minutes = new Date().getMinutes()

    var dateNow = `${date}-${month}-${year}`
    var tabHeading = `Date: ${('0'+date).slice(-2)}-${('0'+month).slice(-2)}-${year} ${('0'+hour).slice(-2)}:${('0'+minutes).slice(-2)} - Group: ${this.state.group}`

     const {
      //navigasi props
      navigation, loginGroup
    } = this.props;

    if(this.state.group==='NOT_LOGGED'){
      this.setState({group:loginGroup})
    } 

    return (
      <Container style={styles.container}>
        <Header style={{backgroundColor:'#820000'}} hasSegment>
          <Left style={{flex:1}}>
            <Image 
              source={require('../../../../assets/headerLogo/headerLogo.png')}
              style={{width:wp('50%'), height:hp('50%')}}
              resizeMode={'contain'}
            />
          </Left>
          <Body/>
          <Right style={{flex:2}}>
            <Segment style={{backgroundColor:'transparent'}}>
            <Button>
                <Text style={styles.segmentTextNonActive}></Text>
              </Button>
              <Button>
                <Text style={styles.segmentTextNonActive}>  BIG DEAL Arrangement  </Text>
              </Button>
            </Segment>
          </Right>

        </Header>

        <View style={styles.wrapperTabs}>
          <Tabs tabBarUnderlineStyle={{ backgroundColor: '#575F6A' }}>
            <Tab heading={tabHeading} tabStyle={styles.tabStyle} activeTabStyle={styles.activeTabStyle} activeTextStyle={styles.activeTextStyle} textStyle={styles.textStyle}>
              {this.rekapScreen()}
            </Tab>
          </Tabs>
        </View>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  loginGroup:state.LoginReducer.group_ID,

  allTOTALPROJECT: state.rekapReducer.allTOTALPROJECT,
  allTOTALREV: state.rekapReducer.allTOTALREV,
  winTOTALPROJECT: state.rekapReducer.winTOTALPROJECT,
  winTOTALREV: state.rekapReducer.winTOTALREV,
  loseTOTALPROJECT: state.rekapReducer.loseTOTALPROJECT,
  loseTOTALREV: state.rekapReducer.loseTOTALREV,
  
  //dataDetailWin: state.rekapReducer.dataDetailWin,
  //dataDetailLose: state.rekapReducer.dataDetailLose,

})

export default connect(mapStateToProps)(RekapScreens);

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
    width: wp('45%'),
    backgroundColor: '#c7eecc',
    justifyContent: 'center',
    alignItems: 'center'
  },
  containerArrowWin2: {
    height: hp('9%'),
    width: wp('35%'),
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
  },
  segmentButtonNonActive:{
    borderColor:'#FFF', 
    backgroundColor:'transparent'
  },
  segmentTextNonActive:{
    color:'#FFF'
  }  
});
