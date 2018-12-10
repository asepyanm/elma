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

//global
import url from '../../../../../../../../../config/api_service';

class DesDetailScreens extends Component{
  constructor(props){
    super(props);
    const { params } = this.props.navigation.state;
    this.state = {
      //data dari parameter
      dataDivisi:params.dataDivisi, 
      dataMitraDetail:params.dataMitraDetail,
      dataKategoriMitra:params.dataKategoriMitra,
      date1:params.date1,
      date2:params.date2,

      //data detail
      dataDetail2:[],

      //modal
      visibleModal:false,
      loaderTampilDetail:false,
    }
  }

  componentWillMount(){
    const {dataDivisi, dataMitraDetail, dataKategoriMitra, date1, date2} = this.state;
    this.setState({
      loaderTampilDetail : true
    })
    axios.get(`${url.API}/ebis_getstage5/stage/SUBMISSION/div/${dataDivisi}/maindiv/${dataDivisi}/mitra/${dataKategoriMitra}/nmitra/${dataMitraDetail}/mainseg/ALL/start_date/${date1}/end_date/${date2}`).then((res) => {
      this.setState({dataDetail2:res.data, loaderTampilDetail:false });
    }).catch((err) => {
      this.setState({
        loaderTampilDetail:false
      })
      alert(err)
    })
  }

  //pop up and detail button ALL
  _toggleModal(item){
    const {dataDivisi, dataMitraDetail, dataKategoriMitra, date1, date2} = this.state;

    this.setState({
      visibleModal: !this.state.visibleModal,
    })

    this.props.dispatch({
      type:'DETAIL_LEVEL_3_DES',
      payload:axios.get(`${url.API}/ebis_getstage5/stage/SUBMISSION/div/${dataDivisi}/maindiv/${dataDivisi}/mitra/${dataKategoriMitra}/nmitra/${dataMitraDetail}/mainseg/ALL/start_date/${date1}/end_date/${date2}/cc/${item.stage_06}`)
    });
  }
  renderModalContent(){
    const {dataDetailLevel3, loaderStatus} = this.props;

    return(
      <View style={styles.modalContent}>
        {
        loaderStatus 
          ?
        <ActivityIndicator size={'large'} color={'#000'} style={{margin:hp('5%')}}/>
          :
        <View style={{width:wp('85%')}}>
          <FlatList
            data={dataDetailLevel3}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View style={styles.containerDetailDataPopUp}> 
                <View style={{flexDirection:'row'}}>
                  <View style={{width:wp('20%')}}>
                    <Text style={{fontSize:10}}>Nama CC</Text>
                  </View>
                  <View style={{width:wp('3%')}}>
                    <Text style={{fontSize:10}}>:</Text>
                  </View>
                  <View style={{width:wp('77%')}}>
                    <Text style={{fontSize:10}}>{item.stage_06}</Text>
                  </View>
                </View>

                <View style={{flexDirection:'row'}}>
                  <View style={{width:wp('20%')}}>
                    <Text style={{fontSize:10}}>Nama Project</Text>
                  </View>
                  <View style={{width:wp('3%')}}>
                    <Text style={{fontSize:10}}>:</Text>
                  </View>
                  <View style={{width:wp('77%')}}>
                    <Text style={{fontSize:10}}>{item.stage_07}</Text>
                  </View>
                </View>

                <View style={{flexDirection:'row'}}>
                  <View style={{width:wp('20%')}}>
                    <Text style={{fontSize:10}}>Nilai</Text>
                  </View>
                  <View style={{width:wp('3%')}}>
                    <Text style={{fontSize:10}}>:</Text>
                  </View>
                  <View style={{width:wp('77%')}}>
                    <Text style={{fontSize:10}}>{item.stage_02}</Text>
                  </View>
                </View>

                <View style={{flexDirection:'row'}}>
                  <View style={{width:wp('20%')}}>
                    <Text style={{fontSize:10}}>Mitra</Text>
                  </View>
                  <View style={{width:wp('3%')}}>
                    <Text style={{fontSize:10}}>:</Text>
                  </View>
                  <View style={{width:wp('77%')}}>
                    <Text style={{fontSize:10}}>{item.stage_01}</Text>
                  </View>
                </View>

                <View style={{flexDirection:'row'}}>
                  <View style={{width:wp('20%')}}>
                    <Text style={{fontSize:10}}>Keterangan</Text>
                  </View>
                  <View style={{width:wp('3%')}}>
                    <Text style={{fontSize:10}}>:</Text>
                  </View>
                  <View style={{width:wp('77%')}}>
                    <Text style={{fontSize:10}}>{item.stage_14}</Text>
                  </View>
                </View>

                <View style={{flexDirection:'row'}}>
                  <View style={{width:wp('20%')}}>
                    <Text style={{fontSize:10}}>Segmen</Text>
                  </View>
                  <View style={{width:wp('3%')}}>
                    <Text style={{fontSize:10}}>:</Text>
                  </View>
                  <View style={{width:wp('77%')}}>
                    <Text style={{fontSize:10}}>{item.stage_05}</Text>
                  </View>
                </View>

                <View style={{flexDirection:'row'}}>
                  <View style={{width:wp('20%')}}>
                    <Text style={{fontSize:10}}>Status</Text>
                  </View>
                  <View style={{width:wp('3%')}}>
                    <Text style={{fontSize:10}}>:</Text>
                  </View>
                  <View style={{width:wp('77%')}}>
                    <Text style={{fontSize:10}}>{item.stage_09}</Text>
                  </View>
                </View>

                <View style={{flexDirection:'row'}}>
                  <View style={{width:wp('20%')}}>
                    <Text style={{fontSize:10}}>Revall</Text>
                  </View>
                  <View style={{width:wp('3%')}}>
                    <Text style={{fontSize:10}}>:</Text>
                  </View>
                  <View style={{width:wp('77%')}}>
                    <Text style={{fontSize:10}}>{item.stage_10}</Text>
                  </View>
                </View>

                <View style={{flexDirection:'row'}}>
                  <View style={{width:wp('20%')}}>
                    <Text style={{fontSize:10}}>REVOTC</Text>
                  </View>
                  <View style={{width:wp('3%')}}>
                    <Text style={{fontSize:10}}>:</Text>
                  </View>
                  <View style={{width:wp('77%')}}>
                    <Text style={{fontSize:10}}>{item.stage_11}</Text>
                  </View>
                </View>

                <View style={{flexDirection:'row'}}>
                  <View style={{width:wp('20%')}}>
                    <Text style={{fontSize:10}}>RevMo</Text>
                  </View>
                  <View style={{width:wp('3%')}}>
                    <Text style={{fontSize:10}}>:</Text>
                  </View>
                  <View style={{width:wp('77%')}}>
                    <Text style={{fontSize:10}}>{item.stage_12}</Text>
                  </View>
                </View>

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
    )
  };

  render() {
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();

    var dateNow = `${date}-${month}-${year}`

    const { navigation } = this.props;
    const { dataDetail2, loaderTampilDetail, dataMitraDetail } = this.state;

    return (
      <Container style={styles.container}>
        <Header style={{backgroundColor:'#820000'}}>
          <Left style={{flex:1}}>
            <Button transparent onPress={() => navigation.goBack()}>
              <Icon type={'MaterialIcons'} name={'arrow-back'} style={{color:'#FFF'}}/>
            </Button>
          </Left>
          <Body style={{flex:4}}>
            <Title style={{color:'#FFF'}}>{dataMitraDetail}</Title>
          </Body>
          <Right/>
        </Header>

        <View>
          {
          loaderTampilDetail 
            ?
          <ActivityIndicator size={'large'} color={'#000'} style={{margin:hp('1%')}}/>
            :
            <FlatList
              data={dataDetail2}
              ListHeaderComponent={() => (
                <View style={styles.wrapperHeaderContent}>
                  <View style={{width:wp('40%')}}>
                    <Text style={{textAlign:'center', color:'#FFF', fontSize:12}}>Nama CC</Text>
                  </View>
                  <View style={{width:wp('40%')}}>
                    <Text style={{textAlign:'center', color:'#FFF', fontSize:12}}>Nama Project</Text>
                  </View>
                  <View style={{width:wp('15%')}}>
                    <Text style={{textAlign:'center', color:'#FFF', fontSize:12}}>Nilai</Text>
                  </View>
                </View>
              )}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => this._toggleModal(item)}>
                  <View style={styles.containerDetailData}> 
                    <View style={{width:wp('40%'), alignSelf:'center', justifyContent:'center'}}>
                      <Text style={{fontSize:10}}>{item.stage_06}</Text>
                    </View>
                    <View style={{width:wp('40%'), alignSelf:'center', justifyContent:'center'}}>
                      <Text style={{fontSize:10}}>{item.stage_07}</Text>
                    </View>
                    <View style={{width:wp('15%'), alignSelf:'center'}}>
                      <Text style={{textAlign:'center', fontSize:10}}>{parseFloat(item.stage_10)}M</Text>                    
                    </View>
                  </View>
                </TouchableOpacity>
              )}
              style={{marginBottom:hp('2%')}}
            />
          }
          <Modal 
            isVisible={this.state.visibleModal === true}
            onBackdropPress={() => this.setState({ visibleModal: false })}>
            {this.renderModalContent()}
          </Modal>
        </View>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  //EBIS
  ebisProspectREVENUE:state.EbisReducer.ebisProspectREVENUE,
  ebisProspectProject:state.EbisReducer.ebisProspectProject,
  ebisProspectTarget:state.EbisReducer.ebisProspectTarget,
  
  //DES
  ebisProspectREVENUE2:state.DesReducer.ebisProspectREVENUE,
  ebisProspectProject2:state.DesReducer.ebisProspectProject,
  ebisProspectTarget2:state.DesReducer.ebisProspectTarget,

  //DBS
  ebisProspectREVENUE3:state.DbsReducer.ebisProspectREVENUE,
  ebisProspectProject3:state.DbsReducer.ebisProspectProject,
  ebisProspectTarget3:state.DbsReducer.ebisProspectTarget,

  //DGS
  ebisProspectREVENUE4:state.DgsReducer.ebisProspectREVENUE,
  ebisProspectProject4:state.DgsReducer.ebisProspectProject,
  ebisProspectTarget4:state.DgsReducer.ebisProspectTarget,

  //data All
  dataAll:state.EbisDetailReducer.dataAll,
  dataAll2:state.DesDetailReducer.dataAll,
  dataAll3:state.DbsDetailReducer.dataAll,
  dataAll4:state.DgsDetailReducer.dataAll,

  //data subs
  dataSubs:state.EbisDetailReducer.dataSubs,
  dataSubs2:state.DesDetailReducer.dataSubs,
  dataSubs3:state.DbsDetailReducer.dataSubs,
  dataSubs4:state.DgsDetailReducer.dataSubs,

  //data mitra
  dataMitra:state.EbisDetailReducer.dataMitra,
  dataMitra2:state.DesDetailReducer.dataMitra,
  dataMitra3:state.DbsDetailReducer.dataMitra,
  dataMitra4:state.DgsDetailReducer.dataMitra,

  //data telkom
  dataTelkom:state.EbisDetailReducer.dataTelkom,
  dataTelkom2:state.DesDetailReducer.dataTelkom,
  dataTelkom3:state.DbsDetailReducer.dataTelkom,
  dataTelkom4:state.DgsDetailReducer.dataTelkom,

  //data detail level 3
  loaderStatus:state.DesDetailReducer.loaderStatus,
  dataDetailLevel3:state.DesDetailReducer.dataDetailLevel3
})

export default connect(mapStateToProps)(DesDetailScreens);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  //content style
  imageContent:{
    width:wp('13%'), height:'100%'
  },
  wrapperHeaderContent:{
    backgroundColor:'#575F6A', 
    flexDirection:'row', 
    width:wp('100%'), 
    padding:hp('1%')
  },

  //detail 
  containerDetailData:{
    justifyContent:'space-between', 
    flexDirection:'row', 
    borderBottomColor:'#000',
    borderBottomWidth:1,
    padding:hp('2%'),
    width:wp('100%'),     
  },
  containerDetailDataPopUp:{ 
    borderBottomColor:'#000',
    borderBottomWidth:1,
    padding:hp('2%'),
    width:wp('100%'),     
  },
  modalContent: {
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    borderColor: "rgba(0, 0, 0, 0.1)"
  },
});
