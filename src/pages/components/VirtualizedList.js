import React from 'react';
import {
  View,
  FlatList,
  Image,
  Text,
  Alert,
  AsyncStorage,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";
import {Header, Icon, Left, Right, Body, Title, Tab, Tabs, Content, Segment, Container} from 'native-base';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { Divider, Button } from 'react-native-elements';

import {connect} from 'react-redux';
import Modal from "react-native-modal";
import axios from 'axios';
import RNFetchBlob from 'react-native-fetch-blob'

//global
import {renderIf} from '../components/renderIf'
import url from '../../config/api_service'
// import detailChatRoomScreens from '../../pages/dashboard/screens/chatScreens/detailChatRoomScreens'
// import  { StackNavigator }  from 'react-navigation';

 export default class VirtualizedList extends React.PureComponent {

  constructor(props){
    super(props);
    this.state = {
      loaderDetail:true,

      allTOTALPROJECT: '?',
      allTOTALREV: '?',
      winTOTALPROJECT: '?',
      winTOTALREV: '?',
      loseTOTALPROJECT: '?',
      loseTOTALREV: '?',

      headerTOTALREV:'?',
      headerTOTALPROJECT:'?',
      dataDetail: [],
  
      visibleModal:false,
      pressed: false,
      dataPopup: [],
      dataMember: [],
      loaderTampilPopup: true,
      group: 'NOT_LOGGED',
      status: '',
      user_id:'',
      notifid:null,
      groupname:'',
      groupdesc:'',
      groupmember:'',
      groupall:{}
    }
    // this.initNav()
    // console.log('isi props')
    // console.log(this.props)
  }
  async initNav(){
      if(this.state.group==='NOT_LOGGED'){
        await AsyncStorage.getItem('loginGroup', (error, result) => {
          if (result) {
            if(this.state.group!==result){
              this.setState({
                group: result
              });
            }
          }
        })
      }
      if(this.state.user_id==""){
           await AsyncStorage.getItem('user_id', (error, result) => {
                  this.setState({
                                 user_id: result
                               });
           });  
      }
  
      if(this.state.group==='NOT_LOGGED'){
        // console.log('not login')
        await AsyncStorage.getItem('loginGroup', async (error, result) => {
          if (result) {
            if(this.state.group!==result){
              this.setState({
                group: result
              });
              var urlgroupdata=url.API+'/groupdetailbyid/'+result;
      //  await axios.get(`${urlgroupdata}`)
        RNFetchBlob.config({
          trusty:true
        }). fetch('GET', `${urlgroupdata}`)
        .then((response) => {
          const res =response.data
          if(res.status=="success"){
            this.setState({
              groupname:res.data.nama,
              groupdesc:res.data.deskripsi,
              groupmember:res.data.anggota,
              user_id:this.state.user_id,
              group:this.state.group,
              groupall:res
            })

            this.props.navigation.setParams({ groupname:res.data.nama,
              groupdesc:res.data.deskripsi,
              groupmember:res.data.anggota,
              user_id:this.state.user_id,
              group:this.state.group,
              groupall:res
              })
          }
          // console.log(res);
          // console.log(this.state.groupmember)
          
        }).catch((err) => {
          console.log(err)
        }) 
            }
          }
        })
      }else{
        // console.log('login bro')
        var urlgroupdata=url.API+'/groupdetailbyid/'+this.state.group;
        // await axios.get(`${urlgroupdata}`)
        RNFetchBlob.config({
          trusty:true
        }). fetch('GET', `${urlgroupdata}`)
        .then((response) => {
          const res =response.data
          if(res.status=="success"){
            this.setState({
              groupname:res.data.nama,
              groupdesc:res.data.deskripsi,
              groupmember:res.data.anggota,
              user_id:this.state.user_id,
              group:this.state.group,
              groupall:res
            })
            this.props.navigation.setParams({ groupname:res.data.nama,
            groupdesc:res.data.deskripsi,
            groupmember:res.data.anggota,
            user_id:this.state.user_id,
            group:this.state.group,
            groupall:res
            })
          }
          // console.log(res);
          // console.log(this.state.groupmember)
          
        }).catch((err) => {
          console.log(err)
        }) 
      }

      return this.props
  }
  _listEmptyComponent = () => {
    return (
        <View>
            <Text>No data</Text>
        </View>
    )
}
enterChat = async (user_id,idroom,namaroom,deskripsiroom) => {
    try {
  
      this.props.navigation.navigate("detailChatRoomScreens", {
        user_id: user_id,
        room_id: idroom,
        room_name: namaroom,
        room_deskripsi: deskripsiroom,
        // is_room_admin
      });
  
    } catch (get_permissions_err) {
      console.log("error getting permissions: ", get_permissions_err);
    }
  }
  // renderChatButtonGroup(groupid){ 
  //   var user_id=this.props.userid
  //   if(user_id==""){
  //     user_id=this.state.user_id
  //     if(user_id==""){
  //         AsyncStorage.getItem('user_id', (error, result) => {
  //               this.setState({
  //                              user_id: result
  //                            });
  //                            user_id=result
  //        });  
  //     }
  //   }
  //   var urlgroupdata=url.API+'/groupdetailbyid/'+groupid;
  //   if(groupid){
  //     axios.get(`${urlgroupdata}`)
  //     .then((res) => {
  //       console.log(JSON.stringify(res))
  //       if(res.status=="success"){
  //         return <View style={{}}>
  //               <Text style={{ fontSize: 10}} >{res.data.anggota}</Text>
  //               <TouchableOpacity style={{}} onPress={() => this.enterChat(user_id,res.data.id,res.data.nama,res.data.deskripsi)}>
  //               <Icon type={'MaterialIcons'} name={'chat'} style={{fontSize:1}} />
  //               </TouchableOpacity>
  //             </View>
  //       }else{
  //         return <View></View>
  //       }
        
  //     }).catch((err) => {
  //       console.log(err)
  //       return <View></View>
  //     }) 
  //   }else{
  //     return <View></View>
  //   }
  // }
  componentDidMount(){
    this.initNav()
    this._loadData()

  }
  componentWillMount(){
    // this.initNav()
  }

  _loadData(){
    if(this.state.group==='NOT_LOGGED'){
      AsyncStorage.getItem('loginGroup', (error, result) => {
        if (result) {
          if(this.state.group!==result){
            this.setState({
              group: result
            });
          }
        }
      })
    }
    const {group,status} = this.state;
    // this.initNav()
    // console.warn(`ELMA LoadDataNotif: ${group} ${status}`)
    if(status==='ALL'){
      const urlSumarynotif=url.API+"/ebis_getnotificationsummaryrekap/group/"+group;
// console.log('urlallsumary',urlSumarynotif);
      // axios.get(`${urlSumarynotif}`)
      RNFetchBlob.config({
        trusty:true
      }). fetch('GET', `${urlSumarynotif}`)
        .then((res) => {this.setState({allTOTALPROJECT: res.data[0].TOTALREV,
                                       allTOTALREV: res.data[0].TOTALPROJECT })}) 

      // axios.get(`${urlSumarynotif}`)
      RNFetchBlob.config({
        trusty:true
      }). fetch('GET', `${urlSumarynotif}`)
        .then((res) => {this.setState({winTOTALPROJECT: res.data[1].TOTALREV,
                                       winTOTALREV: res.data[1].TOTALPROJECT })}) 
                               
      // axios.get(`${urlSumarynotif}`)
      RNFetchBlob.config({
        trusty:true
      }). fetch('GET', `${urlSumarynotif}`)
        .then((res) => {this.setState({loseTOTALPROJECT: res.data[2].TOTALREV,
                                       loseTOTALREV: res.data[2].TOTALPROJECT })}) 

      this.setState({loaderDetail:false})
    } else {
      const urlSumarynotifWinLose=url.API+"/ebis_getnotificationsummaryrekap/group/"+group+"/status/"+status;
      // console.log('urlwinlosesumary',urlSumarynotifWinLose);
      // axios.get(`${urlSumarynotifWinLose}`)
      RNFetchBlob.config({
        trusty:true
      }). fetch('GET', `${urlSumarynotif}`)
        .then((res) => {this.setState({headerTOTALREV: res.data[0].TOTALREV,
                                      headerTOTALPROJECT: res.data[0].TOTALPROJECT })}) 
      //if(this.state.headerTOTALPROJECT>0){
      // axios.get(`${urlSumarynotifWinLose}`)
      RNFetchBlob.config({
        trusty:true
      }). fetch('GET', `${urlSumarynotif}`)
        .then((res) => {this.setState({dataDetail: res.data,loaderDetail:false})}) 
      //} else {
      //  this.setState({dataDetail: []})
      //}
    }
    if(this.props.notifid){
      this.setState({notifid:this.props.notifid})
    }
    
  }

  async _onDataPress(status) {
    if(this.state.group==='NOT_LOGGED'){
      AsyncStorage.getItem('loginGroup', (error, result) => {
        if (result) {
          if(this.state.group!==result){
            this.setState({
              group: result
            });
          }
        }
      })
    }
    this.setState({
      visibleModal: true,
      pressed: true,
      dataPopup: [],
      dataMember: [],
      loaderTampilPopup: true
    })

    // axios.get(`${url.API}/ebis_getnotificationproject/status/${status}/notifid/${this.state.notifid}`)
    RNFetchBlob.config({
      trusty:true
    }). fetch('GET', `${url.API}/ebis_getnotificationproject/status/${status}/notifid/${this.state.notifid}`)
    .then((res) => {
        this.setState({ dataPopup:res.data, loaderTampilPopup:false })
      }).catch((err) => {
        this.setState({
          loaderTampilPopup: false
        })
        //alert(err + `: 17 ${status} ${notifid}`)
      })

    // axios.get(`${url.API}/ebis_getnotificationusergroup/status/${status}/notifid/${this.state.notifid}`)
    RNFetchBlob.config({
      trusty:true
    }). fetch('GET', `${url.API}/ebis_getnotificationusergroup/status/${status}/notifid/${this.state.notifid}`)
    .then((res) => {
        this.setState({ dataMember:res.data, loaderTampilPopup:false })
      }).catch((err) => {
        this.setState({
          loaderTampilPopup: false
        })
        //alert(err + `: 17 ${status} ${notifid}`)
      })
      console.log("jrk",this.state,status,notifid);
  }

  renderDataDetail() {   
    const { dataPopup, dataMember, loaderTampilPopup } = this.state;
  
    return (
      <View style={{ backgroundColor: "white", alignItems: "center",  borderRadius: 4, borderColor: "rgba(0, 0, 0, 0.1)"}}>
        {
          loaderTampilPopup
          ?
          <ActivityIndicator size={'large'} color={'#000'} style={{ margin: hp('5%') }} />
          :
          <View style={{ height: hp('45%'), width: wp('85%') }}>

            <View style={{ backgroundColor: '#575F6A', flexDirection: 'row', width: wp('85%'), marginTop: hp('1%') }}>
              <TouchableOpacity style={{ backgroundColor: '#575F6A', padding: hp('1%'), width: wp('65%'), borderRadius: 1 }}>
                <Text style={{ color: '#FFF' }}>DETAIL</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.setState({ visibleModal: !this.state.visibleModal })} style={{ backgroundColor: '#e74c3c', padding: hp('1%'), width: wp('20%'), alignItems: 'center', borderRadius: 5, }}>
                <Text style={{ color: '#FFF' }}>Tutup</Text>
              </TouchableOpacity>
            </View>

            <View style={{ flexDirection: 'row', width: wp('45%'), marginTop: hp('2%') }}>
                <Text style={{ fontSize: 10, width:wp('22%') }}>A. Nama CC</Text>
                <Text style={{ fontSize: 10, width:wp('1%') }}>:</Text>
                <Text style={{ fontSize: 10, marginLeft: wp('2%') }}>{dataPopup[0].NAMACC}</Text>
            </View>

            <View style={{ flexDirection: 'row', width: wp('45%'), marginTop: hp('2%') }}>
                <Text style={{ fontSize: 10, width:wp('22%') }}>B. Project</Text>
                <Text style={{ fontSize: 10, width:wp('1%') }}>:</Text>
                <Text style={{ fontSize: 10, marginLeft: wp('2%') }}>{dataPopup[0].NAMAPROJECT}</Text>
            </View>

            <View style={{ flexDirection: 'row', width: wp('45%'), marginTop: hp('2%') }}>
                <Text style={{ fontSize: 10, width:wp('22%') }}>C. Nilai</Text>
                <Text style={{ fontSize: 10, width:wp('1%') }}>:</Text>
                <Text style={{ fontSize: 10, marginLeft: wp('2%') }}>{dataPopup[0].REVCURRYEAR}</Text>
            </View>

            <View style={{ flexDirection: 'row', width: wp('45%'), marginTop: hp('2%') }}>
                <Text style={{ fontSize: 10, width:wp('22%') }}>Member</Text>
            </View>
            <FlatList
               ListEmptyComponent={this._listEmptyComponent}
              data={(dataMember.length>0) ? dataMember : []}              
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
 
          </View>
        }
      </View>
    )
  }  

  render(){
    // console.log('isi props jenal')
    // console.log(this.props)
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();
    var hour = new Date().getHours()
    var minutes = new Date().getMinutes()

    var dateNow = `${date}-${month}-${year}`
    var tabHeading = `Date: ${('0'+date).slice(-2)}-${('0'+month).slice(-2)}-${year} ${('0'+hour).slice(-2)}:${('0'+minutes).slice(-2)}`

    AsyncStorage.getItem('notifStatus', (error, result) => {
      if (result) {
        if(this.state.status!==result){
          this.setState({
            status: result.trim()
          });
          console.warn(`ELMA VirtualizedList: ${this.state.status}`)
        }
      }
    })
    AsyncStorage.getItem('loginGroup', (error, result) => {
      if (result) {
        if(this.state.group!==result){
          this.setState({
            group: result.trim()
          });
          this._loadData()
        }
        }
    })
    if(this.state.group==='NOT_LOGGED'){
      AsyncStorage.getItem('loginGroup', (error, result) => {
        if (result) {
          if(this.state.group!==result){
            this.setState({
              group: result
            });
          }
        }
      })
    }
    const{
      allTOTALPROJECT,allTOTALREV,
      winTOTALPROJECT,winTOTALREV,
      loseTOTALPROJECT,loseTOTALREV,
      headerTOTALREV,headerTOTALPROJECT,
      dataDetail,loaderDetail
    } = this.state
    // this.initNav()
    // console.log('param state')
    // console.log(this.props)
    return(

      <Container style={styles.container}>
        <Header style={{backgroundColor:'#820000'}} hasSegment>
          <Left style={{flex:1}}>
            <Image 
              source={require('../../assets/headerLogo/headerLogo.png')}
              style={{width:wp('50%'), height:hp('50%')}}
              resizeMode={'contain'}
            />
          </Left>
          <Body/>
{/*           <Right style={{flex:2}}>
            <Segment style={{backgroundColor:'transparent'}}>
            <Button>
                <Text style={styles.segmentTextNonActive}></Text>
              </Button>
              <Button>
                <Text style={styles.segmentTextNonActive}>  Notification  </Text>
              </Button>
            </Segment>
          </Right> */}
        
        </Header>

        <View style={styles.wrapperHeaderContent}>
          <View style={{width:wp('98%')}}>
            {
              this.state.status==='ALL'
              ?
              <Text style={{textAlign:'center', color:'#FFF'}}>{tabHeading} - Group: {this.state.group}</Text>              
              :
              <Text style={{textAlign:'center', color:'#FFF'}}>{this.state.status} Notification: {headerTOTALREV}M Per {headerTOTALPROJECT} Project(s)</Text>              
            }
          </View>
          
        </View>
        <View style={{}}>
          <View style={{width:wp('98%'),flexDirection: "row"}}>
            {/* <Text>{JSON.stringify(this.props)}</Text> */}
            <View style={{width:wp('89%')}}>
            <Text style={{ fontSize: 10}} ellipsizeMode='tail' numberOfLines={4}>{this.props.groupanggota}</Text>
            </View>
            <View style={{width:wp('9%')}}>
            <TouchableOpacity style={{width:64,marginTop:10,marginBottom:-3}} onPress={() => this.enterChat(this.props.userid,this.props.group,this.props.groupname,this.props.groupdesc)}>
            <Icon type={'MaterialIcons'} name={'chat'} style={{fontSize:32}} />
            </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.wrapperHeaderContent}>
          {
            this.state.status==='ALL'
            ?
            <View style={{width:wp('98%')}}>
              <Text style={{textAlign:'center', color:'#FFF'}}>BIG DEAL Arrangement</Text>              
            </View>
            :
            <View style={styles.wrapperHeaderContent}>
              <View style={{width:wp('28%')}}>
                <Text style={{textAlign:'center', color:'#FFF'}}>NAMA CC</Text>              
              </View>
              <View style={{width:wp('50%')}}>
                <Text style={{textAlign:'center', color:'#FFF'}}>PROJECT</Text>              
              </View>
              <View style={{width:wp('20%')}}>
                <Text style={{textAlign:'center', color:'#FFF'}}>NILAI</Text>
              </View>
            </View>
          }
          {/* {this.renderChatButtonGroup(this.state.group)} */}
        </View>
 
        <Content style={{backgroundColor:'#FFF'}}>
        {
          loaderDetail
          ?
          <ActivityIndicator size={'large'} color={'#000'} style={{ margin: hp('5%') }} />
          :
          <View>
            {
              this.state.status==='ALL'
              ?
              <View style={{ margin: hp('2%') }}>

                <View style={{ flexDirection: 'row', margin: hp('2%'), justifyContent: 'space-between' }}>
                  <View style={{ marginBottom: hp('2%'), width:wp('25%') }}>
                    <Text style={[styles.textJudul, { marginBottom: 20 }]}>SUMMARY</Text>
                  </View>
                  <TouchableOpacity style={styles.containerArrowWin2}>
                  <View>
                    <Text style={styles.textIsi}> {allTOTALREV}M</Text>
                    <Text style={styles.textKeterangan}>per {allTOTALPROJECT} Project</Text>
                  </View>
                  </TouchableOpacity>
                </View>

                <View style={{ flexDirection: 'row', margin: hp('2%'), justifyContent: 'space-between' }}>
                  <View style={{ marginBottom: hp('2%'), width:wp('25%') }}>
                    <Text style={[styles.textJudul, { marginBottom: 20 }]}>WIN Summary</Text>
                  </View>
                  <TouchableOpacity style={styles.containerArrowWin2}>
                  <View>
                    <Text style={styles.textIsi}> {winTOTALREV}M</Text>
                    <Text style={styles.textKeterangan}>per {winTOTALPROJECT} Project</Text>
                  </View>
                  </TouchableOpacity>
                </View>
   
                <View style={{ flexDirection: 'row', margin: hp('2%'), justifyContent: 'space-between' }}>
                  <View style={{ marginBottom: hp('2%'), width:wp('25%') }}>
                    <Text style={[styles.textJudul, { marginBottom: 20 }]}>LOSE Summary</Text>
                  </View>
                  <TouchableOpacity style={styles.containerArrowWin2}>
                  <View>
                    <Text style={styles.textIsi}> {loseTOTALREV}M</Text>
                    <Text style={styles.textKeterangan}>per {loseTOTALPROJECT} Project</Text>
                  </View>
                  </TouchableOpacity>
                </View>

              </View>
              :
              <FlatList
                ListEmptyComponent={this._listEmptyComponent}
                data={(dataDetail.length>0) ? dataDetail : []}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (

                  <TouchableOpacity style={styles.containerDetailData} onPress={() => this._onDataPress(item.NOTIF_STATUS, item.NOTIF_ID)}>
                    <View style={{width:wp('3%'), justifyContent:'center', alignSelf:'center'}}>
                      <Icon type={'MaterialIcons'} name={'play-arrow'} style={{fontSize:14}} />
                    </View>
                    <View style={{ width: '25%', alignItems: 'center' }}>
                      <Text style={{ fontSize: 10}} >{item.NAMACC}</Text>
                    </View>
                    <View style={{ width: '50%', alignItems: 'center' }}>
                      <Text style={{ fontSize: 8}} >{item.NAMAPROJECT}</Text>
                    </View>
                    <View style={{ width: '20%', alignItems: 'center' }}>
                      <Text style={{ fontSize: 10}} >{item.REVCURRYEAR}</Text>
                    </View>                  

                  </TouchableOpacity>
                )}
                ListEmptyComponent={() => (
                  <View style={{ alignItems : "center", justifyContent: 'center'}}>
                    <Text>Tidak ada data</Text>
                  </View>
                )}
              />
            }
            <Modal 
              isVisible={this.state.visibleModal === true}
              onBackdropPress={() => this.setState({ visibleModal: false })}>
              {
                this.renderDataDetail()
              }
            </Modal>
          </View>
        }
        </Content>
         
        <TouchableOpacity onPress={() => this.props.onBack()} style={{ height: hp('5%'), backgroundColor: '#e74c3c', width: wp('85%'), alignItems: 'center', padding: hp('1%'), borderRadius: 5, marginLeft: hp('5%'), marginBottom: hp('2%') }}>
          <Text style={{ color: '#FFF' }}>Tutup</Text>
        </TouchableOpacity>
      </Container>
      //</View>
   
    )
  }
}

const mapStateToProps = (state) => ({

/*    //data All
  headerTOTALPROJECT: state.alertReducer.headerTOTALPROJECT,
  headerTOTALREV: state.alertReducer.headerTOTALREV,

  dataDetail: state.alertReducer.dataDetail,

  allTOTALPROJECT: state.alertReducer.allTOTALPROJECT,
  allTOTALREV: state.alertReducer.allTOTALREV,
  winTOTALPROJECT: state.alertReducer.winTOTALPROJECT,
  winTOTALREV: state.alertReducer.winTOTALREV,
  loseTOTALPROJECT: state.alertReducer.loseTOTALPROJECT,
  loseTOTALREV: state.alertReducer.loseTOTALREV, */

})

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
  containerArrowWin2: {
    height: hp('9%'),
    width: wp('35%'),
    backgroundColor: '#dfdfdd',
    justifyContent: 'center',
    alignItems: 'center'
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
