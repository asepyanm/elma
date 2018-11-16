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
import renderIf from '../../../../../../../components/renderIf';
import url from '../../../../../../../../config/api_service';

class DesDetailScreens extends Component{
  constructor(props){
    super(props);
    this.state = {
      //modal
      visibleModal:false,
      loaderTampilDetail:false,
      dataTampung:[],

      data:[],
      statusAll:false, 
      statusSubs:true,
      statusMitra:true,
      statusTelkom:true,
    }
  }

  _toggleModal(item){
    this.setState({
      visibleModal: !this.state.visibleModal,
      loaderTampilDetail:true
    })
    axios.get(`${url.API}/ebis_getstage5/stage/SUBMISSION/div/DES/maindiv/DES/mainseg/ALL/nmitra/${item}/start_date/201801/end_date/201811`).then((res) => {
      this.setState({dataTampung:res.data, loaderTampilDetail:false });
    }).catch((err) => {
      this.setState({
        loaderTampilDetail:false
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
            data={dataTampung}
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
              <View style={styles.containerDetailData}> 
                <View style={{width:wp('35%'), alignSelf:'center', justifyContent:'center'}}>
                  <Text style={{fontSize:10}}>{item.stage_06}</Text>
                </View>
                <View style={{width:wp('35%'), alignSelf:'center', justifyContent:'center'}}>
                  <Text style={{fontSize:10}}>{item.stage_07}</Text>
                </View>
                <View style={{width:wp('10%'), alignSelf:'center', justifyContent:'center', alignItems:'center'}}>
                  <Text style={{textAlign:'center', fontSize:10}}>{parseFloat(item.stage_10)}M</Text>                    
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
        allAktif: require('../../../../../../../../assets/detailKonten/stage-on20.png'),
        allNon  : require('../../../../../../../../assets/detailKonten/stage-off00.png'),
      },
      subsImage:{
        subsAktif: require('../../../../../../../../assets/detailKonten/stage-on21.png'),
        subsNon  : require('../../../../../../../../assets/detailKonten/stage-off01.png'),
      },
      mitraImage:{
        mitraAktif: require('../../../../../../../../assets/detailKonten/stage-on22.png'),
        mitraNon  : require('../../../../../../../../assets/detailKonten/stage-off02.png'),
      },
      telkomImage:{
        telkomAktif: require('../../../../../../../../assets/detailKonten/stage-on23.png'),
        telkomNon  : require('../../../../../../../../assets/detailKonten/stage-off03.png'),
      }
    };

    const{
      //prospect
      ebisProspectREVENUE,ebisProspectProject,dataMitra,
    } = this.props;

    const {statusAll, statusSubs, statusMitra, statusTelkom} = this.state;

    return(
      <View style={{backgroundColor:'#FFF', flex:1}}>
        <View style={styles.wrapperArrow}>
          <Image 
              source={images.Submission.arrowSub1}
              style={styles.imageStyle}
              resizeMode={'stretch'}
            />

            <TouchableOpacity style={styles.containerArrowSubmission}>
              <Text style={styles.textJudul}>SUBMISSION</Text>
              <Text style={styles.textIsi}>{ebisProspectREVENUE}M</Text>
              <Text style={styles.textKeterangan}>per {ebisProspectProject} Project</Text>
            </TouchableOpacity>

            <Image 
              source={images.Submission.arrowSub2}
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
                  data={dataMitra}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({ item }) => (
                    <TouchableOpacity style={styles.containerDetailData} onPress={() => this._toggleModal(item.MITRA)}> 
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
              <Text>
                Status Subs
              </Text>
            )}

            {renderIf(!statusMitra)(
              <Text>
                Status Mitra
              </Text>
            )}

            {renderIf(!statusTelkom)(
              <Text>
                Status Telkom
              </Text>
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
        allAktif: require('../../../../../../../../assets/detailKonten/stage-on20.png'),
        allNon  : require('../../../../../../../../assets/detailKonten/stage-off00.png'),
      },
      subsImage:{
        subsAktif: require('../../../../../../../../assets/detailKonten/stage-on21.png'),
        subsNon  : require('../../../../../../../../assets/detailKonten/stage-off01.png'),
      },
      mitraImage:{
        mitraAktif: require('../../../../../../../../assets/detailKonten/stage-on22.png'),
        mitraNon  : require('../../../../../../../../assets/detailKonten/stage-off02.png'),
      },
      telkomImage:{
        telkomAktif: require('../../../../../../../../assets/detailKonten/stage-on23.png'),
        telkomNon  : require('../../../../../../../../assets/detailKonten/stage-off03.png'),
      }
    };

    const{
      //prospect
      ebisProspectREVENUE2,ebisProspectProject2,dataMitra2,
    } = this.props;

    const {statusAll, statusSubs, statusMitra, statusTelkom} = this.state;

    return(
      <View style={{backgroundColor:'#FFF', flex:1}}>
        <View style={styles.wrapperArrow}>
          <Image 
            source={images.Submission.arrowSub1}
            style={styles.imageStyle}
            resizeMode={'stretch'}
          />

          <View style={styles.containerArrowSubmission}>
            <Text style={styles.textJudul}>SUBMISSION</Text>
            <Text style={styles.textIsi}>{ebisProspectREVENUE2}M</Text>
            <Text style={styles.textKeterangan}>per {ebisProspectProject2} Project</Text>
          </View>

          <Image 
            source={images.Submission.arrowSub2}
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
                  data={dataMitra2}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({ item }) => (
                    <TouchableOpacity style={styles.containerDetailData} onPress={() => this._toggleModal(item.MITRA)}> 
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
              <Text>
                Status Subs
              </Text>
            )}

            {renderIf(!statusMitra)(
              <Text>
                Status Mitra
              </Text>
            )}

            {renderIf(!statusTelkom)(
              <Text>
                Status Telkom
              </Text>
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
        allAktif: require('../../../../../../../../assets/detailKonten/stage-on20.png'),
        allNon  : require('../../../../../../../../assets/detailKonten/stage-off00.png'),
      },
      subsImage:{
        subsAktif: require('../../../../../../../../assets/detailKonten/stage-on21.png'),
        subsNon  : require('../../../../../../../../assets/detailKonten/stage-off01.png'),
      },
      mitraImage:{
        mitraAktif: require('../../../../../../../../assets/detailKonten/stage-on22.png'),
        mitraNon  : require('../../../../../../../../assets/detailKonten/stage-off02.png'),
      },
      telkomImage:{
        telkomAktif: require('../../../../../../../../assets/detailKonten/stage-on23.png'),
        telkomNon  : require('../../../../../../../../assets/detailKonten/stage-off03.png'),
      }
    };

    const{
      //prospect
      ebisProspectREVENUE3,ebisProspectProject3,dataMitra3,
    } = this.props;

    const {statusAll, statusSubs, statusMitra, statusTelkom} = this.state;

    return(
      <View style={{backgroundColor:'#FFF', flex:1}}>
        <View style={styles.wrapperArrow}>
          <Image 
            source={images.Submission.arrowSub1}
            style={styles.imageStyle}
            resizeMode={'stretch'}
          />

          <View style={styles.containerArrowSubmission}>
            <Text style={styles.textJudul}>SUBMISSION</Text>
            <Text style={styles.textIsi}>{ebisProspectREVENUE3}M</Text>
            <Text style={styles.textKeterangan}>per {ebisProspectProject3} Project</Text>
          </View>

          <Image 
            source={images.Submission.arrowSub2}
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
                  data={dataMitra3}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({ item }) => (
                    <TouchableOpacity style={styles.containerDetailData} onPress={() => this._toggleModal(item.MITRA)}> 
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
              <Text>
                Status Subs
              </Text>
            )}

            {renderIf(!statusMitra)(
              <Text>
                Status Mitra
              </Text>
            )}

            {renderIf(!statusTelkom)(
              <Text>
                Status Telkom
              </Text>
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
        allAktif: require('../../../../../../../../assets/detailKonten/stage-on20.png'),
        allNon  : require('../../../../../../../../assets/detailKonten/stage-off00.png'),
      },
      subsImage:{
        subsAktif: require('../../../../../../../../assets/detailKonten/stage-on21.png'),
        subsNon  : require('../../../../../../../../assets/detailKonten/stage-off01.png'),
      },
      mitraImage:{
        mitraAktif: require('../../../../../../../../assets/detailKonten/stage-on22.png'),
        mitraNon  : require('../../../../../../../../assets/detailKonten/stage-off02.png'),
      },
      telkomImage:{
        telkomAktif: require('../../../../../../../../assets/detailKonten/stage-on23.png'),
        telkomNon  : require('../../../../../../../../assets/detailKonten/stage-off03.png'),
      }
    };

    const{
      //prospect
      ebisProspectREVENUE4,ebisProspectProject4,dataMitra4,
    } = this.props;

    const {statusAll, statusSubs, statusMitra, statusTelkom} = this.state;

    return(
      <View style={{backgroundColor:'#FFF', flex:1}}>
        <View style={styles.wrapperArrow}>
          <Image 
            source={images.Submission.arrowSub1}
            style={styles.imageStyle}
            resizeMode={'stretch'}
          />

          <View style={styles.containerArrowSubmission}>
            <Text style={styles.textJudul}>SUBMISSION</Text>
            <Text style={styles.textIsi}>{ebisProspectREVENUE4}M</Text>
            <Text style={styles.textKeterangan}>per {ebisProspectProject4} Project</Text>
          </View>

          <Image 
            source={images.Submission.arrowSub2}
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
                  data={dataMitra4}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({ item }) => (
                    <TouchableOpacity style={styles.containerDetailData} onPress={() => this._toggleModal(item.MITRA)}> 
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
              <Text>
                Status Subs
              </Text>
            )}

            {renderIf(!statusMitra)(
              <Text>
                Status Mitra
              </Text>
            )}

            {renderIf(!statusTelkom)(
              <Text>
                Status Telkom
              </Text>
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
  //EBIS
  ebisProspectREVENUE:state.EbisReducer.ebisSubmisionREVENUE,
  ebisProspectProject:state.EbisReducer.ebisSubmisionProject,
  ebisProspectTarget:state.EbisReducer.ebisSubmisionTarget,
  
  //DES
  ebisProspectREVENUE2:state.DesReducer.ebisSubmisionREVENUE,
  ebisProspectProject2:state.DesReducer.ebisSubmisionProject,
  ebisProspectTarget2:state.DesReducer.ebisSubmisionTarget,

  //DBS
  ebisProspectREVENUE3:state.DbsReducer.ebisSubmisionREVENUE,
  ebisProspectProject3:state.DbsReducer.ebisSubmisionProject,
  ebisProspectTarget3:state.DbsReducer.ebisSubmisionTarget,

  //DGS
  ebisProspectREVENUE4:state.DgsReducer.ebisSubmisionREVENUE,
  ebisProspectProject4:state.DgsReducer.ebisSubmisionProject,
  ebisProspectTarget4:state.DgsReducer.ebisSubmisionTarget,

  //data Mitra
  dataMitra:state.EbisDetailReducer.dataMitra,
  dataMitra2:state.DesDetailReducer.dataMitra,
  dataMitra3:state.DbsDetailReducer.dataMitra,
  dataMitra4:state.DgsDetailReducer.dataMitra,
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
