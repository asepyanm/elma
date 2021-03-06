import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity
} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import ModalSelector from 'react-native-modal-selector';
import {connect} from 'react-redux';
import axios from 'axios';
import RNFetchBlob from 'rn-fetch-blob'

//global
import url from '../../../../../../../config/api_service';

class DgsScreens extends Component{
  constructor(props){
    super(props);
    this.state = {
      data:[],

      //get date
      date1: '',
      date2: '',
      dataFilter:'All',
      dataWitel:'',
      statusRegTreg:'',

    }
  }

  componentWillMount(){
    this.props.dispatch({
      type:'DGS_HOME_CURRENT_TREG',
      payload:RNFetchBlob.config({
        trusty:true
      }). fetch('GET', `${url.API}/ebis_getlopmaincurrent_treg/witel/ALL/treg/ALL/div/DGS`)
    })
  }

  refreshPeriode(sDate,eDate,sDataFilter,sDataWitel,sStatusRegTreg){
    /*    this.setState({
         date1:sDate,
         date2:eDate,
         dataFilter:sDataFilter,
         dataWitel:sDataWitel,
         statusRegTreg:sStatusRegTreg,
       })
    */
    if(sDataFilter === 'All'){
        
      this.props.dispatch({
        type:'DGS_HOME_TREG',
        payload:RNFetchBlob.config({
        trusty:true
      }). fetch('GET', `${url.API}/ebis_getlopmain_ytd/date1/${sDate}/date2/${eDate}/div/DGS/treg/ALL/witel/ALL`)
      })
  
      this.props.dispatch({
        type:'DGS_HOME_CURRENT_TREG',
        payload:RNFetchBlob.config({
        trusty:true
      }). fetch('GET', `${url.API}/ebis_getlopmaincurrent_treg/witel/ALL/treg/ALL/div/DGS`)
      })
    } else {

      this.props.dispatch({
        type:'DGS_HOME_TREG',
        payload:RNFetchBlob.config({
        trusty:true
      }). fetch('GET', `${url.API}/ebis_getlopmain_ytd/date1/${sDate}/date2/${eDate}/div/DGS/treg/${sStatusRegTreg}/witel/${sDataWitel}`)
      })
  
      this.props.dispatch({
        type:'DGS_HOME_CURRENT_TREG',
        payload:RNFetchBlob.config({
        trusty:true
      }). fetch('GET', `${url.API}/ebis_getlopmaincurrent_treg/witel/${sDataWitel}/treg/${sStatusRegTreg}/div/DGS`)
      })
    }
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

  render() {
    var sDate = '' 
    var eDate = ''
    var sDataFilter = '' 
    var sDataWitel = ''
    var sStatusRegTreg = ''

    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();

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
      //navigation
      xParams, navigation,
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

    sDate = this.props.xParams.sdate
    eDate = this.props.xParams.edate
    sDataFilter = this.props.xParams.dataFilter
    sDataWitel = this.props.xParams.dataWitel
    sStatusRegTreg = this.props.xParams.statusRegTreg

    this.refreshPeriode(sDate,eDate,sDataFilter,sDataWitel,sStatusRegTreg)

    return (
      <View style={styles.container}>

        <ScrollView>
          <View style={styles.wrapperArrow}>
            <Image 
              source={images.prospect.arrowProspect1}
              style={styles.imageStyle}
              resizeMode={'stretch'}
            />

            <TouchableOpacity onPress={() => navigation.navigate('EbisDetailLOP',{start_date:sDate,end_date:eDate,namaDetail:'PROSPECT',reg:sStatusRegTreg,witel:sDataWitel})} style={styles.containerArrowProspect}>
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
                <Text style={styles.textJudul}>{this.getNum(ebisPresentase)}%</Text>
              </View>
            </View>
          </View>

          <View style={styles.wrapperArrow}>
            <Image 
              source={images.Submission.arrowSub1}
              style={styles.imageStyle}
              resizeMode={'stretch'}
            />

            <TouchableOpacity onPress={() => navigation.navigate('DesDetailLOP',{start_date:sDate,end_date:eDate,namaDetail:'SUBMISSION',reg:sStatusRegTreg,witel:sDataWitel})} style={styles.containerArrowSubmission}>
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
                <Text style={styles.textJudul}>{this.getNum(ebisPresentase2)}%</Text>
              </View>
            </View>
          </View>

          <View style={styles.wrapperArrow}>
            <Image 
              source={images.Win.arrowWin1}
              style={styles.imageStyle}
              resizeMode={'stretch'}
            />

            <TouchableOpacity onPress={() => navigation.navigate('DbsDetailLOP',{start_date:sDate,end_date:eDate,namaDetail:'WIN',reg:sStatusRegTreg,witel:sDataWitel})} style={styles.containerArrowWin}>
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
                <Text style={styles.textJudul}>{this.getNum(ebisPresentase3)}%</Text>
              </View>
            </View>
          </View>

          <View style={styles.wrapperArrow}>
            <Image 
              source={images.Billcom.arrowBil1}
              style={styles.imageStyle}
              resizeMode={'stretch'}
            />

            <TouchableOpacity onPress={() => navigation.navigate('DgsDetailLOP',{start_date:sDate,end_date:eDate,namaDetail:'BILLCOM',reg:sStatusRegTreg,witel:sDataWitel})} style={styles.containerArrowBill}>
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
                <Text style={styles.textJudul}>{this.getNum(ebisPresentase4)}%</Text>
              </View>
            </View>
          </View>
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
  lastUpdated: state.DgsReducer.ebisLastupdate,

  ebisProspectREVENUE:state.DgsTregReducer.ebisProspectREVENUE,
  ebisProspectProject:state.DgsTregReducer.ebisProspectProject,
  ebisProspectTarget:state.DgsTregReducer.ebisProspectTarget,

  ebisSubmisionREVENUE:state.DgsTregReducer.ebisSubmisionREVENUE,
  ebisSubmissionProject:state.DgsTregReducer.ebisSubmissionProject,
  ebisSubmissionTarget:state.DgsTregReducer.ebisSubmissionTarget,

  ebisWinREVENUE:state.DgsTregReducer.ebisWinREVENUE,
  ebisWinProject:state.DgsTregReducer.ebisWinProject,
  ebisWinTarget:state.DgsTregReducer.ebisWinTarget,

  ebisBillcomREVENUE:state.DgsTregReducer.ebisBillcomREVENUE,
  ebisBillcomeProject:state.DgsTregReducer.ebisBillcomeProject,
  ebisBillcommTarget:state.DgsTregReducer.ebisBillcommTarget,

  ProspectREVENUE:state.DgsTregReducer.ProspectREVENUE,
  ProspectProject:state.DgsTregReducer.ProspectProject,
  ProspectTarget:state.DgsTregReducer.ProspectTarget,
  ProspectREVENUE2:state.DgsTregReducer.ProspectREVENUE2,

  //submission status
  SubmissionWINRevenue:state.DgsTregReducer.SubmissionWINRevenue,
  SubmissionWINProject:state.DgsTregReducer.SubmissionWINProject,
  SubmissionLOOSERevenue:state.DgsTregReducer.SubmissionLOOSERevenue,
  SubmissionLooseProject:state.DgsTregReducer.SubmissionLooseProject,
  SubmissionWaitingRevenue:state.DgsTregReducer.SubmissionWaitingRevenue,
  SubmissionWaitingProject:state.DgsTregReducer.SubmissionWaitingProject,
  SubmissionCancelRevenue:state.DgsTregReducer.SubmissionCancelRevenue,
  SubmissionCancekProject:state.DgsTregReducer.SubmissionCancekProject,

  //current status
  currentProspectRevenue:state.DgsTregReducer.currentProspectRevenue,
  currentProspectProject:state.DgsTregReducer.currentProspectProject,
  currentSubmissionRevenue:state.DgsTregReducer.currentSubmissionRevenue,
  currentSubmissionProject:state.DgsTregReducer.currentSubmissionProject,
  currentWINRevenue:state.DgsTregReducer.currentWINRevenue,
  currentWINProject:state.DgsTregReducer.currentWINProject,
  currentBIllcomRevenue:state.DgsTregReducer.currentBIllcomRevenue,
  currentBillcomProject:state.DgsTregReducer.currentBillcomProject,
})

export default connect(mapStateToProps)(DgsScreens);

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
});
