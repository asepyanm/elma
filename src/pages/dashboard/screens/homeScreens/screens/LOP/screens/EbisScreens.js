import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  ActivityIndicator,
  TouchableOpacity
} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import ModalSelector from 'react-native-modal-selector';
import {connect} from 'react-redux';
import Modal from "react-native-modal";

import axios from 'axios';
import RNFetchBlob from 'rn-fetch-blob'

//global
import renderIf from '../../../../../../components/renderIf';
import url from '../../../../../../../config/api_service';

class EbisScreens extends Component{
  constructor(props){
    super(props);

    this.state = {
      data:[],

      isSenin9Pagi: false,
      isModalSenin: true,
      allAlertTP:'',allAlertNP:'',
      winAlertTP:'',winAlertNP:'',
      loseAlertTP:'',loseAlertNP:'',

      //group:'G1',
      
      tampilActivityIndicator: false,
      treg:'',
      witel:'',

      //get date
      date1: '',
      date2: '',
    }
  }

  rekapSeninPagi(){

    //const { loginGroup } = this.props;
/* 
    axios.get(`${url.API}/ebis_getnotificationsummaryrekap/group/${this.state.group}`).then((res) => {
    //axios.get(`${url.API}/ebis_getnotificationsummaryrekap/group/${loginGroup}`).then((res) => {
      this.setState({dataTampungDetail:res.data,
                     allAlertTP:res.data[0].TOTALREV,
                     allAlertNP:res.data[0].TOTALPROJECT,
                     winAlertTP:res.data[2].TOTALREV,
                     winAlertNP:res.data[2].TOTALPROJECT,
                     loseAlertTP:res.data[1].TOTALREV,
                     loseAlertNP:res.data[1].TOTALPROJECT,
                     });
    })
   
    //alert('test');
    return(

      <View style={styles.modalContent}>
        <View style={{ height: hp('50%'), width: wp('85%') }}>

          <View style={{ flexDirection: 'row', width: wp('45%'), marginTop: hp('2%') }}>                
            <TouchableOpacity style={{ height: hp('5%'), backgroundColor: '#575f6a', width: wp('85%'), alignItems: 'center', padding: hp('1%'), borderRadius: 1, marginBottom: hp('1%') }}>
              <Text style={{ color: '#FFF' }}>BIG DEAL Arrangement</Text>
            </TouchableOpacity>
          </View>

          <View style={{ flexDirection: 'row', width: wp('45%'), marginTop: hp('2%') }}>
            <Text style={{ fontSize: 10, width:wp('22%') }}></Text>
          </View>

          <View style={{ flexDirection: 'row', width: wp('45%') }}>
            <Text style={{ fontSize: 10, width:wp('5%') }}></Text>
            <Text style={{ fontSize: 10, width:wp('22%') }}>TOTAL Project</Text>
            <Text style={{ fontSize: 10, width:wp('1%') }}>:</Text>
            <Text style={{ fontSize: 10, marginLeft: wp('2%') }}>{this.state.allAlertTP} Project(s)</Text>
          </View>
          <View style={{ flexDirection: 'row', width: wp('45%') }}>
            <Text style={{ fontSize: 10, width:wp('5%') }}></Text>
            <Text style={{ fontSize: 10, width:wp('22%') }}>NILAI Project</Text>
            <Text style={{ fontSize: 10, width:wp('1%') }}>:</Text>
            <Text style={{ fontSize: 10, marginLeft: wp('2%') }}>Rp. {this.state.allAlertNP}M</Text>
          </View>
          <View style={{ flexDirection: 'row', width: wp('45%') }}>
            <Text style={{ fontSize: 10, width:wp('22%') }}></Text>
          </View>

          <View style={{ flexDirection: 'row', width: wp('45%') }}>
            <Text style={{ fontSize: 10, width:wp('5%') }}></Text>
            <Text style={{ fontSize: 10, width:wp('22%') }}>WIN SUMMARY</Text>
          </View>
          <View style={{ flexDirection: 'row', width: wp('45%') }}>
            <Text style={{ fontSize: 10, width:wp('7%') }}></Text>
            <Text style={{ fontSize: 10, width:wp('20%') }}>TOTAL Project</Text>
            <Text style={{ fontSize: 10, width:wp('1%') }}>:</Text>
            <Text style={{ fontSize: 10, marginLeft: wp('2%') }}>{this.state.winAlertTP} Project(s)</Text>
          </View>
          <View style={{ flexDirection: 'row', width: wp('45%') }}>
            <Text style={{ fontSize: 10, width:wp('7%') }}></Text>
            <Text style={{ fontSize: 10, width:wp('20%') }}>NILAI Project</Text>
            <Text style={{ fontSize: 10, width:wp('1%') }}>:</Text>
            <Text style={{ fontSize: 10, marginLeft: wp('2%') }}>Rp. {this.state.winAlertNP} M</Text>
          </View>
          <View style={{ flexDirection: 'row', width: wp('45%') }}>
            <Text style={{ fontSize: 10, width:wp('22%') }}></Text>
          </View>

          <View style={{ flexDirection: 'row', width: wp('45%') }}>
            <Text style={{ fontSize: 10, width:wp('5%') }}></Text>
            <Text style={{ fontSize: 10, width:wp('22%') }}>LOSE SUMMARY</Text>
          </View>
          <View style={{ flexDirection: 'row', width: wp('45%') }}>
            <Text style={{ fontSize: 10, width:wp('7%') }}></Text>
            <Text style={{ fontSize: 10, width:wp('20%') }}>TOTAL Project</Text>
            <Text style={{ fontSize: 10, width:wp('1%') }}>:</Text>
            <Text style={{ fontSize: 10, marginLeft: wp('2%') }}>{this.state.loseAlertTP} Project(s)</Text>
          </View>
          <View style={{ flexDirection: 'row', width: wp('45%') }}>
            <Text style={{ fontSize: 10, width:wp('7%') }}></Text>
            <Text style={{ fontSize: 10, width:wp('20%') }}>NILAI Project</Text>
            <Text style={{ fontSize: 10, width:wp('1%') }}>:</Text>
            <Text style={{ fontSize: 10, marginLeft: wp('2%') }}>Rp. {this.state.loseAlertNP} M</Text>
          </View>

          <View style={{ position: 'absolute', bottom: 0 }}>
            <TouchableOpacity onPress={() => this.setState({ isModalSenin:false })} style={{ height: hp('5%'), backgroundColor: '#e74c3c', width: wp('85%'), alignItems: 'center', padding: hp('1%'), borderRadius: 5, marginBottom: hp('2%') }}>
              <Text style={{ color: '#FFF' }}>Tutup</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
 */    
  }

  refreshPeriode(sDate,eDate,sTreg,sWitel){

    this.props.dispatch({
      type:'EBIS_HOME_FILTER_PERIODE',
      payload:RNFetchBlob.config({
        trusty:true
      }). fetch('GET', `${url.API}/ebis_getlopmain_ytd/div/EBIS/date1/${sDate}/date2/${eDate}/treg/${sTreg}/witel/${sWitel}`)
    });

    this.props.dispatch({
      type:'EBIS_LASTUPDATE',
      payload:RNFetchBlob.config({
        trusty:true
      }). fetch('GET', `${url.API}/ebis_lastime`)
    });

  }

  render() {
    var date = new Date().getDate();
    var month = new Date().getMonth() +1;
    var year = new Date().getFullYear();

    var hari = new Date().getDay()
    var jam = new Date().getHours()
  
    var dateNow = `${date}-${month}-${year}`

    //import image arrow
    const images = {
      prospect: {
        arrowProspect1: require('../../../../../../../assets/Arrow/arrowProspect.png'),
        arrowProspect2: require('../../../../../../../assets/Arrow/arrowProspect2.png'),
      },
      Submission: {
        arrowSub1: require('../../../../../../../assets/Arrow/arrowSub.png'),
        arrowSub2: require('../../../../../../../assets/Arrow/arrowSub2.png'),
      },
      Win: {
        arrowWin1: require('../../../../../../../assets/Arrow/arrowWin.png'),
        arrowWin2: require('../../../../../../../assets/Arrow/arrowWin2.png'),
      },
      Billcom: {
        arrowBil1: require('../../../../../../../assets/Arrow/arrowBillcom.png'),
        arrowBil2: require('../../../../../../../assets/Arrow/arrowBillcom2.png'),
      },
      arrowGrey:require('../../../../../../../assets/Arrow/arrowGrey.png'),

      //icon current status
      currentProspect: {
        iconProspect: require('../../../../../../../assets/icon_current_status/cur01a.png'),
      },
      currentSubmission: {
        iconSubmission: require('../../../../../../../assets/icon_current_status/cur02a.png'),
      },
      currentWin: {
        iconWin: require('../../../../../../../assets/icon_current_status/cur03a.png'),
      },
      currentBillcom: {
        iconBill: require('../../../../../../../assets/icon_current_status/cur04a.png'),
      },

      //arrow presentase
      presentase: {
        arrowUp: require('../../../../../../../assets/arrowPresentase/pro03.png'),
        arrowDown: require('../../../../../../../assets/arrowPresentase/pro01.png'),
      },
    };

    const {
      tampilActivityIndicator,
      lastUpdated,
      sDate, eDate,
      //navgaiton props
      navigation,
      
      //prospect
      ebisProspectREVENUE,ebisProspectProject,ebisProspectTarget,
      //submission
      ebisSubmisionREVENUE,ebisSubmissionProject,ebisSubmissionTarget,
      //win
      ebisWinREVENUE,ebisWinProject,ebisWinTarget,
      //billcom
      ebisBillcomREVENUE,ebisBillcomeProject,ebisBillcommTarget,

      ProspectREVENUE,ProspectProject,ProspectTarget,ProspectREVENUE2,
    
      //submission status
      SubmissionWINRevenue,SubmissionWINProject,
      SubmissionLOOSERevenue,SubmissionLooseProject,
      SubmissionWaitingRevenue,SubmissionWaitingProject,
      SubmissionCancelRevenue,SubmissionCancekProject,
    
      //current status
      currentProspectRevenue,currentProspectProject,
      currentSubmissionRevenue,currentSubmissionProject,
      currentWINRevenue,currentWINProject,
      currentBIllcomRevenue,currentBillcomProject,
    } = this.props;

    const ebisPresentase = (parseInt(ebisProspectREVENUE) / parseInt(ebisProspectTarget))*100;
    const ebisPresentase2 = (parseInt(ebisSubmisionREVENUE) / parseInt(ebisSubmissionTarget))*100;
    const ebisPresentase3 = (parseInt(ebisWinREVENUE) / parseInt(ebisWinTarget))*100;
    const ebisPresentase4 = (parseInt(ebisBillcomREVENUE) / parseInt(ebisBillcommTarget))*100;

    SPRratio = (parseInt(ebisSubmisionREVENUE) / parseInt(ebisProspectREVENUE))*100;
    WSRratio = (parseInt(ebisWinREVENUE) / parseInt(ebisSubmisionREVENUE))*100;
    BWRratio = (parseInt(ebisBillcomREVENUE) / parseInt(ebisWinREVENUE))*100;
    WPRratio = (parseInt(ebisWinREVENUE) / parseInt(ebisProspectREVENUE))*100;

    // SPRratio = (parseInt(ebisPresentase2) / parseInt(ebisPresentase))*100;
    // WSRratio = (parseInt(ebisPresentase3) / parseInt(ebisPresentase2))*100;
    // BWRratio = (parseInt(ebisPresentase4) / parseInt(ebisPresentase3))*100;
    // WPRratio = (parseInt(ebisPresentase3) / parseInt(ebisPresentase))*100;

    const {isSenin9Pagi, date1,date2} = this.state;
    if (date1 != sDate){
      //this.setState({date1:sDate,date2:eDate})
      this.setState({
        treg:'ALL',
        witel:'ALL',
        date1:sDate,
        date2:eDate
      })
      this.refreshPeriode(sDate,eDate,'ALL','ALL')
    } else {
      if (date2 != eDate){
        //this.setState({date1:sDate,date2:eDate})
        this.setState({
          treg:'ALL',
          witel:'ALL',
          date1:sDate,
          date2:eDate
        })
        this.refreshPeriode(sDate,eDate,'ALL','ALL')
      }
    }

    //if(hari===0){
    //  if(jam===9){
    //    if(this.state.isModalSenin) {
    //      if(!this.state.isSenin9Pagi){
    //        this.setState({isSenin9Pagi:true})
    //      }
    //    }
    //  }
    //}
/* 
    if(jam===9){
      if(this.state.isModalSenin) {
        if(!this.state.isSenin9Pagi){
          this.setState({isSenin9Pagi:true})
        }
      }
    } 

    if(jam===13){
      if(this.state.isModalSenin) {
        if(!this.state.isSenin9Pagi){
          this.setState({isSenin9Pagi:true})
        }
      }
    }

    if(jam===16){
      if(this.state.isModalSenin) {
        if(!this.state.isSenin9Pagi){
          this.setState({isSenin9Pagi:true})
        }
      }
    }
   
    if(jam===21){
      if(this.state.isModalSenin) {
        if(!this.state.isSenin9Pagi){
          this.setState({isSenin9Pagi:true})
        }
      }
    }
 */
    return (
      <View style={styles.container}>

{/*       
        <View style={styles.wrapperPeriode}>
          <View>
            <Text style={styles.textPeriode}>{sDate} Periode : </Text>
          </View>
          <View style={styles.wrapperModalPeriode}>
            <View>
              <ModalSelector
                data={data}
                selectTextStyle={{textAlign:'center', alignSelf:'center', alignItems:'center'}}
                //initValue={`${year}-01`}
                initValue={`${this.state.sdateInitValue.substring(0,4)}-${this.state.sdateInitValue.substring(4,6)}`}
                //initValue={this.state.sdate}
                selectStyle={styles.modalPeriode}
                onChange={(data)=> this.filterPeriodeDate1(data)} 
              />
            </View>
            <View>
              <Text style={{fontSize:20, fontWeight:'bold'}}> - {eDate} </Text>
            </View>
            <View>
              <ModalSelector
                data={data}
                initValue={`${year}-${("0"+month).slice(-2)}`}
                selectStyle={styles.modalPeriode}
                onChange={(data)=> this.filterPeriodeDate2(data)} 
              />
            </View>
          </View>
        </View>

 */}        
        <ScrollView>
          <View style={styles.wrapperArrow}>
            <Image 
              source={images.prospect.arrowProspect1}
              style={styles.imageStyle}
              resizeMode={'stretch'}
            />

            <TouchableOpacity onPress={() => navigation.navigate('EbisDetailLOP',{start_date:this.state.date1,end_date:this.state.date2,reg:'ALL',witel:'ALL'})} style={styles.containerArrowProspect} underlayColor="#ffffff00">
              <Text style={styles.textJudul}>PROSPECT</Text>
              <Text style={styles.textIsi}>{ebisProspectREVENUE}M</Text>
              <Text style={styles.textKeterangan}>per {ebisProspectProject} Project</Text>
            </TouchableOpacity>

            <Image 
              source={images.prospect.arrowProspect2}
              style={styles.imageStyle}
              resizeMode={'stretch'}
            />

            <View style={styles.containerArrowProspect2}>
              <Text style={styles.textJudul}>Target</Text>
              <Text style={styles.textIsi}>{ebisProspectTarget}M</Text>
            </View>

            <Image 
              source={images.arrowGrey}
              style={styles.imageStyle}
              resizeMode={'stretch'}
            />

            <View style={styles.wrapperPresentase}>
              {
                ebisPresentase < 100 
                  ?
                  <Image 
                    source={images.presentase.arrowDown}
                    style={styles.imagesStylePresentase}
                    resizeMode={'stretch'}
                  />
                  :
                  <Image 
                    source={images.presentase.arrowUp}
                    style={styles.imagesStylePresentase}
                    resizeMode={'stretch'}
                  />
              }
              <View style={styles.wrapperTextPresentase}>
                <Text style={styles.textJudul}>{Math.ceil(ebisPresentase)}%</Text>
              </View>
            </View>
          </View>

          <View style={styles.wrapperArrow}>
            <Image 
              source={images.Submission.arrowSub1}
              style={styles.imageStyle}
              resizeMode={'stretch'}
            />

            <TouchableOpacity onPress={() => navigation.navigate('DesDetailLOP',{start_date:this.state.date1,end_date:this.state.date2,reg:'ALL',witel:'ALL'})} style={styles.containerArrowSubmission}>
              <Text style={styles.textJudul}>SUBMISSION</Text>
              <Text style={styles.textIsi}>{ebisSubmisionREVENUE}M</Text>
              <Text style={styles.textKeterangan}>per {ebisSubmissionProject} Project</Text>
            </TouchableOpacity>

            <Image 
              source={images.Submission.arrowSub2}
              style={styles.imageStyle}
              resizeMode={'stretch'}
            />

            <View style={styles.containerArrowSubmission2}>
              <Text style={styles.textJudul}>Target</Text>
              <Text style={styles.textIsi}>{ebisSubmissionTarget}M</Text>
            </View>

            <Image 
              source={images.arrowGrey}
              style={styles.imageStyle}
              resizeMode={'stretch'}
            />

            <View style={styles.wrapperPresentase}>
              {
                ebisPresentase2 < 100 
                  ?
                  <Image 
                    source={images.presentase.arrowDown}
                    style={styles.imagesStylePresentase}
                    resizeMode={'stretch'}
                  />
                  :
                  <Image 
                    source={images.presentase.arrowUp}
                    style={styles.imagesStylePresentase}
                    resizeMode={'stretch'}
                  />
              }
              <View style={styles.wrapperTextPresentase}>
                <Text style={styles.textJudul}>{Math.ceil(ebisPresentase2)}%</Text>
              </View>
            </View>
          </View>

          <View style={styles.wrapperArrow}>
            <Image 
              source={images.Win.arrowWin1}
              style={styles.imageStyle}
              resizeMode={'stretch'}
            />

            <TouchableOpacity onPress={() => navigation.navigate('DbsDetailLOP',{start_date:this.state.date1,end_date:this.state.date2,reg:'ALL',witel:'ALL'})} style={styles.containerArrowWin}>
              <Text style={styles.textJudul}>WIN</Text>
              <Text style={styles.textIsi}>{ebisWinREVENUE}M</Text>
              <Text style={styles.textKeterangan}>per {ebisWinProject} Project</Text>
            </TouchableOpacity>

            <Image 
              source={images.Win.arrowWin2}
              style={styles.imageStyle}
              resizeMode={'stretch'}
            />

            <View style={styles.containerArrowWin2}>
              <Text style={styles.textJudul}>Target</Text>
              <Text style={styles.textIsi}>{ebisWinTarget}M</Text>
            </View>

            <Image 
              source={images.arrowGrey}
              style={styles.imageStyle}
              resizeMode={'stretch'}
            />

            <View style={styles.wrapperPresentase}>
              {
                ebisPresentase3 < 100 
                  ?
                  <Image 
                    source={images.presentase.arrowDown}
                    style={styles.imagesStylePresentase}
                    resizeMode={'stretch'}
                  />
                  :
                  <Image 
                    source={images.presentase.arrowUp}
                    style={styles.imagesStylePresentase}
                    resizeMode={'stretch'}
                  />
              }
              <View style={styles.wrapperTextPresentase}>
                <Text style={styles.textJudul}>{Math.ceil(ebisPresentase3)}%</Text>
              </View>
            </View>
          </View>

          <View style={styles.wrapperArrow}>
            <Image 
              source={images.Billcom.arrowBil1}
              style={styles.imageStyle}
              resizeMode={'stretch'}
            />

            <TouchableOpacity onPress={() => navigation.navigate('DgsDetailLOP',{start_date:this.state.date1,end_date:this.state.date2,reg:'ALL',witel:'ALL'})} style={styles.containerArrowBill}>
              <Text style={styles.textJudul}>BILLCOM</Text>
              <Text style={styles.textIsi}>{ebisBillcomREVENUE}M</Text>
              <Text style={styles.textKeterangan}>per {ebisBillcomeProject} Project</Text>
            </TouchableOpacity>

            <Image 
              source={images.Billcom.arrowBil2}
              style={styles.imageStyle}
              resizeMode={'stretch'}
            />

            <View style={styles.containerArrowBill2}>
              <Text style={styles.textJudul}>Target</Text>
              <Text style={styles.textIsi}>{ebisBillcommTarget}M</Text>
            </View>

            <Image 
              source={images.arrowGrey}
              style={styles.imageStyle}
              resizeMode={'stretch'}
            />

            <View style={styles.wrapperPresentase}>
              {
                ebisPresentase4 < 100 
                  ?
                  <Image 
                    source={images.presentase.arrowDown}
                    style={styles.imagesStylePresentase}
                    resizeMode={'stretch'}
                  />
                  :
                  <Image 
                    source={images.presentase.arrowUp}
                    style={styles.imagesStylePresentase}
                    resizeMode={'stretch'}
                  />
              }
              <View style={styles.wrapperTextPresentase}>
                <Text style={styles.textJudul}>{Math.ceil(ebisPresentase4)}%</Text>
              </View>
            </View>
          </View>
 {/* 
          {renderIf(this.state.isSenin9Pagi)(
            <Modal 
              isVisible={this.state.isModalSenin}>
              {this.rekapSeninPagi()}
            </Modal>
          )}
  */}         
          <View>
            <Text style={{fontSize:9,marginLeft:wp('2%')}}>Lastupdate: {lastUpdated}</Text>
          </View>

          <View style={styles.wrapperRatio}>
            <View style={styles.wrapperKontenRatio}>
              <View style={styles.judulRatio}>
                <Text style={styles.textJudulRatio}>SPR</Text>
              </View>
              <View style={styles.wrapperIsiRatio}>
                <Text style={styles.isiRatio}>{Math.ceil(SPRratio)}%</Text>
              </View>
              <View style={styles.subJudulRatio}>
                <Text style={styles.subTextJudulRatio}>Sub to Prosp Ratio</Text>
              </View>
            </View>

            <View style={styles.wrapperKontenRatio}>
              <View style={styles.judulRatio}>
                <Text style={styles.textJudulRatio}>WSR</Text>
              </View>
              <View style={styles.wrapperIsiRatio2}>
                <Text style={styles.isiRatio}>{Math.ceil(WSRratio)}%</Text>
              </View>
              <View style={styles.subJudulRatio}>
                <Text style={styles.subTextJudulRatio}>Win to Sub Ratio</Text>
              </View>
            </View>
    
            <View style={styles.wrapperKontenRatio}>
              <View style={styles.judulRatio}>
                <Text style={styles.textJudulRatio}>BWR</Text>
              </View>
              <View style={styles.wrapperIsiRatio3}>
                <Text style={styles.isiRatio}>{Math.ceil(BWRratio)}%</Text>
              </View>
              <View style={styles.subJudulRatio}>
                <Text style={styles.subTextJudulRatio}>Bill to Win Ratio</Text>
              </View>
            </View>

            <View style={styles.wrapperKontenRatio}>
              <View style={styles.judulRatio}>
                <Text style={styles.textJudulRatio}>WPR</Text>
              </View>
              <View style={styles.wrapperIsiRatio4}>
                <Text style={styles.isiRatio}>{Math.ceil(WPRratio)}%</Text>
              </View>
              <View style={styles.subJudulRatio}>
                <Text style={styles.subTextJudulRatio}>Win to Prosp Ratio</Text>
              </View>
            </View>
          </View>
        
          <View style={{marginTop:hp('2%')}}>
            <View style={{marginBottom:hp('1%'), marginLeft:wp('4%')}}>
              <Text stle={{fontSize:15, fontWeight:'bold'}}>
                SUBMISSION STATUS
              </Text>
            </View>
          
            <View style={styles.wrapperSubStatus}>
              <View style={styles.wrapperKontenSubStatus}>
                <View style={styles.judulSubStatus}>
                  <Text style={styles.textJudulSubStatus}>WIN</Text>
                </View>
                <View style={styles.wrapperIsiSubStatus}>
                  <Text style={styles.isiSubStatus}>{SubmissionWINRevenue} M</Text>
                </View>
                <View style={styles.subJudulSubStatus}>
                  <Text style={styles.subTextJudulSubStatus}>{SubmissionWINProject} Projects</Text>
                </View>
              </View>

              <View style={styles.wrapperKontenSubStatus}>
                <View style={styles.judulSubStatus}>
                  <Text style={styles.textJudulSubStatus}>LOSE</Text>
                </View>
                <View style={styles.wrapperIsiSubStatus}>
                  <Text style={styles.isiSubStatus}>{SubmissionLOOSERevenue} M</Text>
                </View>
                <View style={styles.subJudulSubStatus}>
                  <Text style={styles.subTextJudulSubStatus}>{SubmissionLooseProject} Projects</Text>
                </View>
              </View>

              <View style={styles.wrapperKontenSubStatus}>
                <View style={styles.judulSubStatus}>
                  <Text style={styles.textJudulSubStatus}>WAITING</Text>
                </View>
                <View style={styles.wrapperIsiSubStatus}>
                  <Text style={styles.isiSubStatus}>{SubmissionWaitingRevenue} M</Text>
                </View>
                <View style={styles.subJudulSubStatus}>
                  <Text style={styles.subTextJudulSubStatus}>{SubmissionWaitingProject} Projects</Text>
                </View>
              </View>

              <View style={styles.wrapperKontenSubStatus}>
                <View style={styles.judulSubStatus}>
                  <Text style={styles.textJudulSubStatus}>CANCEL</Text>
                </View>
                <View style={styles.wrapperIsiSubStatus}>
                  <Text style={styles.isiSubStatus}>{SubmissionCancelRevenue} M</Text>
                </View>
                <View style={styles.subJudulSubStatus}>
                  <Text style={styles.subTextJudulSubStatus}>{SubmissionCancekProject} Projects</Text>
                </View>
              </View>
            </View>
          </View>
        
          <View style={{marginTop:hp('2%'), marginBottom:hp('5%')}}>
            <View style={styles.wrapperJudulCurrent}>
              <Text stle={{fontSize:15, fontWeight:'bold'}}>
                CURRENT STATUS per {dateNow}
              </Text>
            </View>
            
            <View style={styles.wrapperCurStatus}>
              <View style={styles.wrapperKontenCurStatus}>
                <View style={styles.judulCurStatus}>
                  <Text style={styles.textJudulCurStatus}>+PROSPECT</Text>
                </View>
                <View style={styles.wrapperIsiCurStatus}>
                  <Image 
                    source={images.currentProspect.iconProspect}
                    style={{height:hp('3%'), width:wp('5%')}}
                    resizeMode={'stretch'}
                  />
                  <Text style={styles.isiCurStatus}>{currentProspectRevenue}M</Text>
                </View>
                <View style={styles.subJudulCurStatus}>
                  <Text style={styles.subTextJudulCurStatus}>{currentProspectProject} Projects</Text>
                </View>
              </View>

              <View style={styles.wrapperKontenCurStatus}>
                <View style={styles.judulCurStatus}>
                  <Text style={styles.textJudulCurStatus2}>+SUBMISSION</Text>
                </View>
                <View style={styles.wrapperIsiCurStatus}>
                  <Image 
                    source={images.currentSubmission.iconSubmission}
                    style={{height:hp('3%'), width:wp('5%')}}
                    resizeMode={'stretch'}
                  />
                  <Text style={styles.isiCurStatus}>{currentSubmissionRevenue}M</Text>
                </View>
                <View style={styles.subJudulCurStatus}>
                  <Text style={styles.subTextJudulCurStatus}>{currentSubmissionProject} Projects</Text>
                </View>
              </View>

              <View style={styles.wrapperKontenCurStatus}>
                <View style={styles.judulCurStatus}>
                  <Text style={styles.textJudulCurStatus3}>+WIN</Text>
                </View>
                <View style={styles.wrapperIsiCurStatus}>
                  <Image 
                    source={images.currentWin.iconWin}
                    style={{height:hp('3%'), width:wp('5%')}}
                    resizeMode={'stretch'}
                  />
                  <Text style={styles.isiCurStatus}>{currentWINRevenue}M</Text>
                </View>
                <View style={styles.subJudulCurStatus}>
                  <Text style={styles.subTextJudulCurStatus}>{currentWINProject} Projects</Text>
                </View>
              </View>

              <View style={styles.wrapperKontenCurStatus}>
                <View style={styles.judulCurStatus}>
                  <Text style={styles.textJudulCurStatus4}>+BILLCOM</Text>
                </View>
                <View style={styles.wrapperIsiCurStatus}>
                  <Image 
                    source={images.currentBillcom.iconBill}
                    style={{height:hp('3%'), width:wp('5%')}}
                    resizeMode={'stretch'}
                  />
                  <Text style={styles.isiCurStatus}>{currentBIllcomRevenue}M</Text>
                </View>
                <View style={styles.subJudulCurStatus}>
                  <Text style={styles.subTextJudulCurStatus}>{currentBillcomProject} Projects</Text>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  lastUpdated: state.EbisReducer.ebisLastupdate,

  loginGroup:state.LoginReducer.group_ID,

  ebisProspectREVENUE:state.EbisReducer.ebisProspectREVENUE,
  ebisProspectProject:state.EbisReducer.ebisProspectProject,
  ebisProspectTarget:state.EbisReducer.ebisProspectTarget,

  ebisSubmisionREVENUE:state.EbisReducer.ebisSubmisionREVENUE,
  ebisSubmissionProject:state.EbisReducer.ebisSubmissionProject,
  ebisSubmissionTarget:state.EbisReducer.ebisSubmissionTarget,

  ebisWinREVENUE:state.EbisReducer.ebisWinREVENUE,
  ebisWinProject:state.EbisReducer.ebisWinProject,
  ebisWinTarget:state.EbisReducer.ebisWinTarget,

  ebisBillcomREVENUE:state.EbisReducer.ebisBillcomREVENUE,
  ebisBillcomeProject:state.EbisReducer.ebisBillcomeProject,
  ebisBillcommTarget:state.EbisReducer.ebisBillcommTarget,

  ProspectREVENUE:state.EbisReducer.ProspectREVENUE,
  ProspectProject:state.EbisReducer.ProspectProject,
  ProspectTarget:state.EbisReducer.ProspectTarget,
  ProspectREVENUE2:state.EbisReducer.ProspectREVENUE2,

  //submission status
  SubmissionWINRevenue:state.EbisReducer.SubmissionWINRevenue,
  SubmissionWINProject:state.EbisReducer.SubmissionWINProject,
  SubmissionLOOSERevenue:state.EbisReducer.SubmissionLOOSERevenue,
  SubmissionLooseProject:state.EbisReducer.SubmissionLooseProject,
  SubmissionWaitingRevenue:state.EbisReducer.SubmissionWaitingRevenue,
  SubmissionWaitingProject:state.EbisReducer.SubmissionWaitingProject,
  SubmissionCancelRevenue:state.EbisReducer.SubmissionCancelRevenue,
  SubmissionCancekProject:state.EbisReducer.SubmissionCancekProject,

  //current status
  currentProspectRevenue:state.EbisReducer.currentProspectRevenue,
  currentProspectProject:state.EbisReducer.currentProspectProject,
  currentSubmissionRevenue:state.EbisReducer.currentSubmissionRevenue,
  currentSubmissionProject:state.EbisReducer.currentSubmissionProject,
  currentWINRevenue:state.EbisReducer.currentWINRevenue,
  currentWINProject:state.EbisReducer.currentWINProject,
  currentBIllcomRevenue:state.EbisReducer.currentBIllcomRevenue,
  currentBillcomProject:state.EbisReducer.currentBillcomProject,
})

export default connect(mapStateToProps)(EbisScreens);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapperPeriode:{
    width:wp('100%'),
    height:hp('8%'),
    backgroundColor:'#D1D4D9',
    flexDirection:'row',
    justifyContent:'space-between',
    padding:wp('3%'),
    alignSelf:'center',
    alignItems:'center'
  },
  textPeriode:{
    color:'#000',
    fontWeight:'bold'
  },
  wrapperModalPeriode:{
    flexDirection:'row',
    alignSelf:'center',
    alignItems:'center'
  },
  modalPeriode:{
    backgroundColor:'#FFF', 
    width:wp('35%'), 
    height:hp('5.5%')
  },

  //style presentase arrow
  wrapperPresentase:{
    flexDirection:'row',
    justifyContent:'space-around',
    alignSelf:'center',
    alignItems:'center',
    width:wp('22%'),
  },
  wrapperTextPresentase:{
    justifyContent:'center',
    alignSelf:'center'
  },
  imagesStylePresentase:{
    width:wp('8%'), 
    height:hp('6%')
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
    height:hp('9%'), 
    width:wp('24%'), 
    backgroundColor:'#dfdfdd',
    justifyContent:'center',
    alignItems:'center'
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
    fontSize:11
  },
  textKeterangan:{
    fontSize:9,
    fontWeight:'500',
  },

  //style keterangan ratio
  wrapperRatio:{
    flexDirection:'row', 
    justifyContent:'space-around',
    marginTop:hp('2%')
  },
  wrapperKontenRatio:{
    width:wp('23%')
  },
  judulRatio:{
    justifyContent:'center',
    alignItems:'center',
    height:hp('4%'),
  },
  textJudulRatio:{
    textAlign:'center',
    fontWeight:'bold'
  },
  wrapperIsiRatio:{
    backgroundColor:'#ddc8df',
    padding:wp('1%')
  },
  wrapperIsiRatio2:{
    backgroundColor:'#ecb889',
    padding:wp('1%')
  },
  wrapperIsiRatio3:{
    backgroundColor:'#c7eecc',
    padding:wp('1%')
  },
  wrapperIsiRatio4:{
    backgroundColor:'#a9c1fb',
    padding:wp('1%')
  },
  isiRatio:{
    textAlign:'center',
    fontWeight:'500',
  },
  subJudulRatio:{
    justifyContent:'center',
    alignItems:'center',
  },
  subTextJudulRatio:{
    textAlign:'center',
    fontSize:7
  },

  //style submission status 
  wrapperSubStatus:{
    flexDirection:'row', 
    justifyContent:'space-around',
  },
  wrapperKontenSubStatus:{
    width:wp('25%'),
  },
  judulSubStatus:{
    justifyContent:'center',
    alignItems:'center',
    height:hp('4%'),
    backgroundColor:'#212634'
  },
  textJudulSubStatus:{
    textAlign:'center',
    fontWeight:'bold',
    color:'#FFF'
  },
  wrapperIsiSubStatus:{
    padding:wp('1%')
  },
  isiSubStatus:{
    textAlign:'center',
    fontWeight:'500',
    fontSize:12
  },
  subJudulSubStatus:{
    justifyContent:'center',
    alignItems:'center',
  },
  subTextJudulSubStatus:{
    textAlign:'center',
    fontSize:7
  },

    //style current status 
    wrapperCurStatus:{
      flexDirection:'row', 
      justifyContent:'space-around',
    },
    wrapperJudulCurrent:{
      marginBottom:hp('1%'), 
      paddingLeft:wp('4%'), 
      paddingBottom:wp('2%'),
      borderBottomColor:'#000', 
      borderBottomWidth:1
    },
    wrapperKontenCurStatus:{
      width:wp('25%'),
    },
    judulCurStatus:{
      justifyContent:'center',
      alignItems:'center',
      height:hp('2%'),
    },
    textJudulCurStatus:{
      textAlign:'center',
      fontWeight:'bold',
      color:'#532e63',
      fontSize:10
    },
    textJudulCurStatus2:{
      textAlign:'center',
      fontWeight:'bold',
      color:'#bd6b3a',
      fontSize:10
    },
    textJudulCurStatus3:{
      textAlign:'center',
      fontWeight:'bold',
      color:'#66953f',
      fontSize:10
    },
    textJudulCurStatus4:{
      textAlign:'center',
      fontWeight:'bold',
      color:'#5373a4',
      fontSize:10
    },
    wrapperIsiCurStatus:{
      flexDirection:'row',
      justifyContent:'center',
      alignItems:'center',
      padding:wp('1%')
    },
    isiCurStatus:{
      textAlign:'center',
      fontWeight:'500',
      fontSize:12,
      alignSelf:'center',
      marginLeft:wp('1%')
    },
    subJudulCurStatus:{
      justifyContent:'center',
      alignItems:'center',
    },
    subTextJudulCurStatus:{
      textAlign:'center',
      fontSize:7
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
  }

});
