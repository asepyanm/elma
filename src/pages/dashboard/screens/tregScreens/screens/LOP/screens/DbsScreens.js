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

//global
import url from '../../../../../../../config/api_service';

class DbsScreens extends Component{
  constructor(props){
    super(props);
    this.state = {
      data:[],

      //state pilihan regional
      dataRegionalWitel:[],
      statusGetReg:false,
      statusRegTreg:'',

      //get date
      date1:'',
      date2:''
    }
  }

  componentWillMount(){
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();

    var date1 = `${year}01`
    var date2 = `${year}${month}`

    this.setState({
      date1:date1,
      date2:date2
    })

    this.props.dispatch({
      type:'DBS_HOME_TREG',
      payload:axios.get(`${url.API}/ebis_getlopmainytd_treg/startdate/${date1}/enddate/${date2}/div/DBS/witel/ALL/treg/ALL`)
    })

    this.props.dispatch({
      type:'DBS_HOME_CURRENT_TREG',
      payload:axios.get(`${url.API}/ebis_getlopmaincurrent_treg/witel/ALL/treg/ALL/div/DBS`)
    })
  }

  filterPeriodeDate1(data){
    const {date2} = this.state;

    this.setState({
      date1:data.value
    })

    this.props.dispatch({
      type:'DBS_HOME_TREG_PERIODE',
      payload:axios.get(`${url.API}/ebis_getlopmainytd_treg/startdate/${data.value}/enddate/${date2}/div/DBS/witel/ALL/treg/ALL`)
    });
  }

  filterPeriodeDate2(data){
    const {date1} = this.state;

    this.setState({
      date2:data.value
    })

    this.props.dispatch({
      type:'DBS_HOME_TREG_PERIODE',
      payload:axios.get(`${url.API}/ebis_getlopmainytd_treg/startdate/${date1}/enddate/${data.value}/div/DBS/witel/ALL/treg/ALL`)
    });
  }

  renderFilterRegional(option){
    const {date1, date2} = this.state;

    let dataFilter = option.value;
    this.setState({
      statusGetReg:true
    })

    if(dataFilter === 'All'){
      this.props.dispatch({
        type:'DBS_HOME_TREG',
        payload:axios.get(`${url.API}/ebis_getlopmainytd_treg/startdate/${date1}/enddate/${date2}/div/DBS/witel/ALL/treg/ALL`)
      })
  
      this.props.dispatch({
        type:'DBS_HOME_CURRENT_TREG',
        payload:axios.get(`${url.API}/ebis_getlopmaincurrent_treg/witel/ALL/treg/ALL/div/DBS`)
      })

      this.setState({
        dataRegionalWitel:[],
        statusGetReg:false
      })
    } else {
      axios.get(`${url.API}/ebis_getwitel/reg/${dataFilter}`).then((res)=>{
        console.log(res);
        this.setState({
          statusRegTreg:dataFilter,
          statusGetReg:false,
          dataRegionalWitel:res.data
        })
      }).catch((err)=> {
        this.setState({
          statusGetReg:false
        })
      })
    }
  }

  renderFilterData(option){
    const {statusRegTreg, date1, date2} = this.state;
    let dataWitel = option.W1;

    this.props.dispatch({
      type:'DBS_HOME_TREG',
      payload:axios.get(`${url.API}/ebis_getlopmainytd_treg/startdate/${date1}/enddate/${date2}/div/DBS/witel/${dataWitel}/treg/${statusRegTreg}`)
    })

    this.props.dispatch({
      type:'DBS_HOME_CURRENT_TREG',
      payload:axios.get(`${url.API}/ebis_getlopmaincurrent_treg/witel/${dataWitel}/treg/${statusRegTreg}/div/DBS`)
    })
  }
  
  render() {
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();

    var dateNow = `${date}-${month}-${year}`

    let index = 0;

    const data = [
      { key: index++, label: `${year}-01`, value:`${year}01`},
      { key: index++, label: `${year}-02`, value:`${year}02`},
      { key: index++, label: `${year}-03`, value:`${year}03`},
      { key: index++, label: `${year}-04`, value:`${year}04`},
      { key: index++, label: `${year}-05`, value:`${year}05`},
      { key: index++, label: `${year}-06`, value:`${year}06`},
      { key: index++, label: `${year}-07`, value:`${year}07`},
      { key: index++, label: `${year}-08`, value:`${year}08`},
      { key: index++, label: `${year}-09`, value:`${year}09`},
      { key: index++, label: `${year}-10`, value:`${year}10`},
      { key: index++, label: `${year}-11`, value:`${year}11`},
      { key: index++, label: `${year}-12`, value:`${year}12`},
    ];

    const regional = [
      { key: index++, label: 'All Regional', value:'All'},
      { key: index++, label: 'Reg 1', value:'REG-1'},
      { key: index++, label: 'Reg 2', value:'REG-2'},
      { key: index++, label: 'Reg 3', value:'REG-3'},
      { key: index++, label: 'Reg 4', value:'REG-4'},
      { key: index++, label: 'Reg 5', value:'REG-5'},
      { key: index++, label: 'Reg 6', value:'REG-6'},
      { key: index++, label: 'Reg 7', value:'REG-7'},
    ];

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
      //navigation
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

    const {dataRegionalWitel, statusGetReg} = this.state;

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

    return (
      <View style={styles.container}>
        <View style={styles.wrapperPeriode}>
          <View>
            <Text style={styles.textPeriode}>Regional</Text>
          </View>

          <View style={[styles.wrapperModalPeriode,{}]}>
            <View>
              <ModalSelector
                data={regional}
                overlayStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', justifyContent: 'flex-end' }}
                selectTextStyle={{textAlign:'center', alignSelf:'center', alignItems:'center'}}
                initValue="All Regional"
                selectStyle={styles.modalPeriode}
                onChange={(option)=> this.renderFilterRegional(option)} 
              />
            </View>
            <View style={{alignSelf:'center', justifyContent:'center'}}>
              <Text style={{fontSize:20, fontWeight:'bold'}}> - </Text>
            </View>
            <View>
              <ModalSelector
                data={dataRegionalWitel}
                disabled={statusGetReg ? true : false}
                overlayStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', justifyContent: 'flex-end' }}
                initValue={statusGetReg ? 'Loading...' : 'Pilih'}
                labelExtractor={(data) => data.W2}
                keyExtractor={(data)=> data.W1}
                selectStyle={styles.modalPeriode}
                onChange={(option)=> this.renderFilterData(option)} 
              />
            </View>
          </View>
        </View>

        <View style={styles.wrapperPeriode}>
          <View>
            <Text style={styles.textPeriode}>Periode : </Text>
          </View>
          <View style={styles.wrapperModalPeriode}>
            <View>
              <ModalSelector
                data={data}
                selectTextStyle={{textAlign:'center', alignSelf:'center', alignItems:'center'}}
                initValue={`${year}-01`}
                selectStyle={styles.modalPeriode}
                onChange={(data)=> this.filterPeriodeDate1(data)} 
              />
            </View>
            <View>
              <Text style={{fontSize:20, fontWeight:'bold'}}> - </Text>
            </View>
            <View>
              <ModalSelector
                data={data}
                initValue={`${year}-${month}`}
                selectStyle={styles.modalPeriode}
                onChange={(data)=> this.filterPeriodeDate2(data)} 
              />
            </View>
          </View>
        </View>

        <ScrollView>
          <View style={styles.wrapperArrow}>
            <Image 
              source={images.prospect.arrowProspect1}
              style={styles.imageStyle}
              resizeMode={'stretch'}
            />

            <TouchableOpacity onPress={() => navigation.navigate('EbisDetailLOP')} style={styles.containerArrowProspect}>
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
                <Text style={styles.textJudul}>{Math.ceil(ebisPresentase)}</Text>
              </View>
            </View>
          </View>

          <View style={styles.wrapperArrow}>
            <Image 
              source={images.Submission.arrowSub1}
              style={styles.imageStyle}
              resizeMode={'stretch'}
            />

            <TouchableOpacity onPress={() => navigation.navigate('DesDetailLOP')} style={styles.containerArrowSubmission}>
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
                <Text style={styles.textJudul}>{Math.ceil(ebisPresentase2)}</Text>
              </View>
            </View>
          </View>

          <View style={styles.wrapperArrow}>
            <Image 
              source={images.Win.arrowWin1}
              style={styles.imageStyle}
              resizeMode={'stretch'}
            />

            <TouchableOpacity onPress={() => navigation.navigate('DbsDetailLOP')} style={styles.containerArrowWin}>
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
                <Text style={styles.textJudul}>{Math.ceil(ebisPresentase3)}</Text>
              </View>
            </View>
          </View>

          <View style={styles.wrapperArrow}>
            <Image 
              source={images.Billcom.arrowBil1}
              style={styles.imageStyle}
              resizeMode={'stretch'}
            />

            <TouchableOpacity onPress={() => navigation.navigate('DgsDetailLOP')} style={styles.containerArrowBill}>
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
                <Text style={styles.textJudul}>{Math.ceil(ebisPresentase4)}</Text>
              </View>
            </View>
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
  ebisProspectREVENUE:state.DbsTregReducer.ebisProspectREVENUE,
  ebisProspectProject:state.DbsTregReducer.ebisProspectProject,
  ebisProspectTarget:state.DbsTregReducer.ebisProspectTarget,

  ebisSubmisionREVENUE:state.DbsTregReducer.ebisSubmisionREVENUE,
  ebisSubmissionProject:state.DbsTregReducer.ebisSubmissionProject,
  ebisSubmissionTarget:state.DbsTregReducer.ebisSubmissionTarget,

  ebisWinREVENUE:state.DbsTregReducer.ebisWinREVENUE,
  ebisWinProject:state.DbsTregReducer.ebisWinProject,
  ebisWinTarget:state.DbsTregReducer.ebisWinTarget,

  ebisBillcomREVENUE:state.DbsTregReducer.ebisBillcomREVENUE,
  ebisBillcomeProject:state.DbsTregReducer.ebisBillcomeProject,
  ebisBillcommTarget:state.DbsTregReducer.ebisBillcommTarget,

  ProspectREVENUE:state.DbsTregReducer.ProspectREVENUE,
  ProspectProject:state.DbsTregReducer.ProspectProject,
  ProspectTarget:state.DbsTregReducer.ProspectTarget,
  ProspectREVENUE2:state.DbsTregReducer.ProspectREVENUE2,

  //submission status
  SubmissionWINRevenue:state.DbsTregReducer.SubmissionWINRevenue,
  SubmissionWINProject:state.DbsTregReducer.SubmissionWINProject,
  SubmissionLOOSERevenue:state.DbsTregReducer.SubmissionLOOSERevenue,
  SubmissionLooseProject:state.DbsTregReducer.SubmissionLooseProject,
  SubmissionWaitingRevenue:state.DbsTregReducer.SubmissionWaitingRevenue,
  SubmissionWaitingProject:state.DbsTregReducer.SubmissionWaitingProject,
  SubmissionCancelRevenue:state.DbsTregReducer.SubmissionCancelRevenue,
  SubmissionCancekProject:state.DbsTregReducer.SubmissionCancekProject,

  //current status
  currentProspectRevenue:state.DbsTregReducer.currentProspectRevenue,
  currentProspectProject:state.DbsTregReducer.currentProspectProject,
  currentSubmissionRevenue:state.DbsTregReducer.currentSubmissionRevenue,
  currentSubmissionProject:state.DbsTregReducer.currentSubmissionProject,
  currentWINRevenue:state.DbsTregReducer.currentWINRevenue,
  currentWINProject:state.DbsTregReducer.currentWINProject,
  currentBIllcomRevenue:state.DbsTregReducer.currentBIllcomRevenue,
  currentBillcomProject:state.DbsTregReducer.currentBillcomProject,
})

export default connect(mapStateToProps)(DbsScreens);

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
