import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image
} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {connect} from 'react-redux';
import ModalSelector from 'react-native-modal-selector';
import axios from 'axios';

//global
import url from '../../../../../../../config/api_service';
class EbisScreens extends Component{
  constructor(props){
    super(props);
    this.state = {
      data:[],

      //state pilihan regional
      dataRegionalWitel:[],
      statusGetReg:false,
      statusRegTreg:''
    }
  }

  componentWillMount(){
    this.props.dispatch({
      type:'EBIS_ABC_TREG',
      payload:axios.get(`${url.API}/ebis_getlopmainabc_treg/witel/ALL/treg/ALL/div/EBIS`)
    })

    this.props.dispatch({
      type:'EBIS_CURRENT_ABC_TREG',
      payload:axios.get(`${url.API}/ebis_getlopmaincurrentabc_treg/witel/ALL/treg/ALL/div/EBIS`)
    })
  }

  renderFilterRegional(option){
    let dataFilter = option.value;
    this.setState({
      statusGetReg:true
    })

    if(dataFilter === 'All'){
      this.props.dispatch({
        type:'EBIS_ABC_TREG',
        payload:axios.get(`${url.API}/ebis_getlopmainabc_treg/witel/ALL/treg/ALL/div/EBIS`)
      })
  
      this.props.dispatch({
        type:'EBIS_CURRENT_ABC_TREG',
        payload:axios.get(`${url.API}/ebis_getlopmaincurrentabc_treg/witel/ALL/treg/ALL/div/EBIS`)
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
    const {statusRegTreg} = this.state;
    let dataWitel = option.W1;

    this.props.dispatch({
      type:'EBIS_ABC_TREG',
      payload:axios.get(`${url.API}/ebis_getlopmainabc_treg/witel/${dataWitel}/treg/${statusRegTreg}/div/EBIS`)
    })

    this.props.dispatch({
      type:'EBIS_CURRENT_ABC_TREG',
      payload:axios.get(`${url.API}/ebis_getlopmaincurrentabc_treg/witel/${dataWitel}/treg/${statusRegTreg}/div/EBIS`)
    })
  }
  
  render() {
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();

    var dateNow = `${date}-${month}-${year}`

    let index = 0;
    const data = [
      { key: index++, label: 'Jan 2018', value:'201801'},
      { key: index++, label: 'Feb 2018', value:'201802'},
      { key: index++, label: 'Mar 2018', value:'201803'},
      { key: index++, label: 'Apr 2018', value:'201804'},
      { key: index++, label: 'Mei 2018', value:'201805'},
      { key: index++, label: 'Jun 2018', value:'201806'},
      { key: index++, label: 'Jul 2018', value:'201807'},
      { key: index++, label: 'Agu 2018', value:'201808'},
      { key: index++, label: 'Sep 2018', value:'201809'},
      { key: index++, label: 'Okt 2018', value:'201810'},
      { key: index++, label: 'Nov 2018', value:'201811'},
      { key: index++, label: 'Des 2018', value:'201812'},
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
        arrowProspect2: require('../../../../../../../assets/Arrow/arrowProspect3.png'),
      },
      Submission: {
        arrowSub1: require('../../../../../../../assets/Arrow/arrowSub.png'),
        arrowSub2: require('../../../../../../../assets/Arrow/arrowSub3.png'),
      },
      Win: {
        arrowWin1: require('../../../../../../../assets/Arrow/arrowWin.png'),
        arrowWin2: require('../../../../../../../assets/Arrow/arrowWin3.png'),
      },
      Billcom: {
        arrowBil1: require('../../../../../../../assets/Arrow/arrowBillcom.png'),
        arrowBil2: require('../../../../../../../assets/Arrow/arrowBillcom3.png'),
      },

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
      //prospect
      ebisProspectREVENUE,ebisProspectProject,
      ebisProspectTargetA,ebisProspectTargetB,ebisProspectTargetC,ebisProspectTargetO,
      //submission
      ebisSubmisionREVENUE,ebisSubmissionProject,
      ebisSubmissionTargetA,ebisSubmissionTargetB,ebisSubmissionTargetC,ebisSubmissionTargetO,
      //win
      ebisWinREVENUE,ebisWinProject,
      ebisWinTargetA,ebisWinTargetB,ebisWinTargetC,ebisWinTargetO,
      //billcom
      ebisBillcomREVENUE,ebisBillcomeProject,
      ebisBillcommTargetA,ebisBillcommTargetB,ebisBillcommTargetC,ebisBillcommTargetO,
    
      //submission status
      SubmissionWINRevenue,SubmissionWINProject,SubmissionWINRevenue2,SubmissionWINRevenue3,SubmissionWINRevenue4,
      SubmissionLOOSERevenue,SubmissionLooseProject,SubmissionLOOSERevenue2,SubmissionLOOSERevenue3,SubmissionLOOSERevenue4,
      SubmissionWaitingRevenue,SubmissionWaitingProject,SubmissionWaitingRevenue2,SubmissionWaitingRevenue3,SubmissionWaitingRevenue4,
      SubmissionCancelRevenue,SubmissionCancekProject,SubmissionCancelRevenue2,SubmissionCancelRevenue3,SubmissionCancelRevenue4,
    
      //current status
      currentProspectRevenue,currentProspectProject,currentProspectRevenue2,currentProspectRevenue3,currentProspectRevenue4,
      currentSubmissionRevenue,currentSubmissionProject,currentSubmissionRevenue2,currentSubmissionRevenue3,currentSubmissionRevenue4,
      currentWINRevenue,currentWINProject,currentWINRevenue2,currentWINRevenue3,currentWINRevenue4,
      currentBIllcomRevenue,currentBillcomProject,currentBIllcomRevenue2,currentBIllcomRevenue3,currentBIllcomRevenue4,
    } = this.props;

    const {dataRegionalWitel, statusGetReg} = this.state;

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
            <Text style={styles.textPeriode}>YTD Status per {dateNow}</Text>
          </View>
        </View>

        <ScrollView>
          <View style={styles.wrapperArrow}>
            <Image 
              source={images.prospect.arrowProspect1}
              style={styles.imageStyle}
              resizeMode={'stretch'}
            />

            <View style={styles.containerArrowProspect}>
              <Text style={styles.textJudul}>PROSPECT</Text>
              <Text style={styles.textIsi}>{parseInt(ebisProspectREVENUE)}M</Text>
              <Text style={styles.textKeterangan}>per {parseInt(ebisProspectProject)} Project</Text>
            </View>

            <Image 
              source={images.prospect.arrowProspect2}
              style={styles.imageStyle}
              resizeMode={'stretch'}
            />

            <View style={styles.containerArrowProspect2}>
              <View style={styles.judulColumn}> 
                <Text style={styles.textJudulColumn}>A</Text>                
              </View>
              <View style={styles.isiColumn}>
                <Text style={styles.textIsiColumn}>{parseInt(ebisProspectTargetA)}M</Text>
              </View>
            </View>

            <View style={styles.containerArrowProspect2}>
              <View style={styles.judulColumn}> 
                <Text style={styles.textJudulColumn}>B</Text>                
              </View>
              <View style={styles.isiColumn}>
                <Text style={styles.textIsiColumn}>{parseInt(ebisProspectTargetB)}M</Text>
              </View>
            </View>

            <View style={styles.containerArrowProspect2}>
              <View style={styles.judulColumn}> 
                <Text style={styles.textJudulColumn}>C</Text>                
              </View>
              <View style={styles.isiColumn}>
                <Text style={styles.textIsiColumn}>{parseInt(ebisProspectTargetC)}M</Text>
              </View>
            </View>

            <View style={styles.containerArrowProspect2}>
              <View style={styles.judulColumn}> 
                <Text style={styles.textJudulColumn}>O</Text>                
              </View>
              <View style={styles.isiColumn}>
                <Text style={styles.textIsiColumn}>{parseInt(ebisProspectTargetO)}M</Text>
              </View>
            </View>
          </View>

          <View style={styles.wrapperArrow}>
            <Image 
              source={images.Submission.arrowSub1}
              style={styles.imageStyle}
              resizeMode={'stretch'}
            />

            <View style={styles.containerArrowSubmission}>
              <Text style={styles.textJudul}>SUBMISSION</Text>
              <Text style={styles.textIsi}>{parseInt(ebisSubmisionREVENUE)}M</Text>
              <Text style={styles.textKeterangan}>per {parseInt(ebisSubmissionProject)} Project</Text>
            </View>

            <Image 
              source={images.Submission.arrowSub2}
              style={styles.imageStyle}
              resizeMode={'stretch'}
            />

            <View style={styles.containerArrowProspect2}>
              <View style={styles.judulColumn2}> 
                <Text style={styles.textJudulColumn}>A</Text>                
              </View>
              <View style={styles.isiColumn2}>
                <Text style={styles.textIsiColumn}>{parseInt(ebisSubmissionTargetA)}M</Text>
              </View>
            </View>

            <View style={styles.containerArrowProspect2}>
              <View style={styles.judulColumn2}> 
                <Text style={styles.textJudulColumn}>B</Text>                
              </View>
              <View style={styles.isiColumn2}>
                <Text style={styles.textIsiColumn}>{parseInt(ebisSubmissionTargetB)}M</Text>
              </View>
            </View>

            <View style={styles.containerArrowProspect2}>
              <View style={styles.judulColumn2}> 
                <Text style={styles.textJudulColumn}>C</Text>                
              </View>
              <View style={styles.isiColumn2}>
                <Text style={styles.textIsiColumn}>{parseInt(ebisSubmissionTargetC)}M</Text>
              </View>
            </View>

            <View style={styles.containerArrowProspect2}>
              <View style={styles.judulColumn2}> 
                <Text style={styles.textJudulColumn}>O</Text>                
              </View>
              <View style={styles.isiColumn2}>
                <Text style={styles.textIsiColumn}>{parseInt(ebisSubmissionTargetO)}M</Text>
              </View>
            </View>
            
          </View>

          <View style={styles.wrapperArrow}>
            <Image 
              source={images.Win.arrowWin1}
              style={styles.imageStyle}
              resizeMode={'stretch'}
            />

            <View style={styles.containerArrowWin}>
              <Text style={styles.textJudul}>WIN</Text>
              <Text style={styles.textIsi}>{parseInt(ebisWinREVENUE)}M</Text>
              <Text style={styles.textKeterangan}>per {parseInt(ebisWinProject)} Project</Text>
            </View>

            <Image 
              source={images.Win.arrowWin2}
              style={styles.imageStyle}
              resizeMode={'stretch'}
            />

            <View style={styles.containerArrowProspect2}>
              <View style={styles.judulColumn3}> 
                <Text style={styles.textJudulColumn}>A</Text>                
              </View>
              <View style={styles.isiColumn3}>
                <Text style={styles.textIsiColumn}>{parseInt(ebisWinTargetA)}M</Text>
              </View>
            </View>

            <View style={styles.containerArrowProspect2}>
              <View style={styles.judulColumn3}> 
                <Text style={styles.textJudulColumn}>B</Text>                
              </View>
              <View style={styles.isiColumn3}>
                <Text style={styles.textIsiColumn}>{parseInt(ebisWinTargetB)}M</Text>
              </View>
            </View>

            <View style={styles.containerArrowProspect2}>
              <View style={styles.judulColumn3}> 
                <Text style={styles.textJudulColumn}>C</Text>                
              </View>
              <View style={styles.isiColumn3}>
                <Text style={styles.textIsiColumn}>{parseInt(ebisWinTargetC)}M</Text>
              </View>
            </View>

            <View style={styles.containerArrowProspect2}>
              <View style={styles.judulColumn3}> 
                <Text style={styles.textJudulColumn}>O</Text>                
              </View>
              <View style={styles.isiColumn3}>
                <Text style={styles.textIsiColumn}>{parseInt(ebisWinTargetO)}M</Text>
              </View>
            </View>

          </View>

          <View style={styles.wrapperArrow}>
            <Image 
              source={images.Billcom.arrowBil1}
              style={styles.imageStyle}
              resizeMode={'stretch'}
            />

            <View style={styles.containerArrowBill}>
              <Text style={styles.textJudul}>BILLCOM</Text>
              <Text style={styles.textIsi}>{parseInt(ebisBillcomREVENUE)}M</Text>
              <Text style={styles.textKeterangan}>per {parseInt(ebisBillcomeProject)} Project</Text>
            </View>

            <Image 
              source={images.Billcom.arrowBil2}
              style={styles.imageStyle}
              resizeMode={'stretch'}
            />

            <View style={styles.containerArrowProspect2}>
              <View style={styles.judulColumn4}> 
                <Text style={styles.textJudulColumn}>A</Text>                
              </View>
              <View style={styles.isiColumn4}>
                <Text style={styles.textIsiColumn}>{parseInt(ebisBillcommTargetA)}M</Text>
              </View>
            </View>

            <View style={styles.containerArrowProspect2}>
              <View style={styles.judulColumn4}> 
                <Text style={styles.textJudulColumn}>B</Text>                
              </View>
              <View style={styles.isiColumn4}>
                <Text style={styles.textIsiColumn}>{parseInt(ebisBillcommTargetB)}M</Text>
              </View>
            </View>

            <View style={styles.containerArrowProspect2}>
              <View style={styles.judulColumn4}> 
                <Text style={styles.textJudulColumn}>C</Text>                
              </View>
              <View style={styles.isiColumn4}>
                <Text style={styles.textIsiColumn}>{parseInt(ebisBillcommTargetC)}M</Text>
              </View>
            </View>

            <View style={styles.containerArrowProspect2}>
              <View style={styles.judulColumn4}> 
                <Text style={styles.textJudulColumn}>O</Text>                
              </View>
              <View style={styles.isiColumn4}>
                <Text style={styles.textIsiColumn}>{parseInt(ebisBillcommTargetO)}M</Text>
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

                <View style={{justifyContent:'center', alignItems:'center'}}>
                  <View style={styles.wrapperContentSubmission}>
                    <View style={styles.wrapperIsiSubStatus}>
                      <Text style={styles.isiSubStatus}>{parseInt(SubmissionWINRevenue)}M</Text>
                    </View>

                    <View style={styles.wrapperKeteranganAbjat}>
                      <Text style={styles.textAbjatSubmission}>A</Text>
                    </View>
                  </View>

                  <View style={styles.wrapperContentSubmission}>
                    <View style={styles.wrapperIsiSubStatus}>
                      <Text style={styles.isiSubStatus}>{parseInt(SubmissionWINRevenue2)}M</Text>
                    </View>

                    <View style={styles.wrapperKeteranganAbjat}>
                      <Text style={styles.textAbjatSubmission}>B</Text>
                    </View>
                  </View>

                  <View style={styles.wrapperContentSubmission}>
                    <View style={styles.wrapperIsiSubStatus}>
                      <Text style={styles.isiSubStatus}>{parseInt(SubmissionWINRevenue3)}M</Text>
                    </View>

                    <View style={styles.wrapperKeteranganAbjat}>
                      <Text style={styles.textAbjatSubmission}>C</Text>
                    </View>
                  </View>

                  <View style={styles.wrapperContentSubmission}>
                    <View style={styles.wrapperIsiSubStatus}>
                      <Text style={styles.isiSubStatus}>{parseInt(SubmissionWINRevenue4)}M</Text>
                    </View>

                    <View style={styles.wrapperKeteranganAbjat}>
                      <Text style={styles.textAbjatSubmission}>O</Text>
                    </View>
                  </View>
                </View>

                <View style={styles.subJudulSubStatus}>
                  <Text style={styles.subTextJudulSubStatus}>{parseInt(SubmissionWINProject)} Projects</Text>
                </View>            
              </View>

              <View style={styles.wrapperKontenSubStatus}>
                <View style={styles.judulSubStatus}>
                  <Text style={styles.textJudulSubStatus}>LOSE</Text>
                </View>

                <View style={{justifyContent:'center', alignItems:'center'}}>
                  <View style={styles.wrapperContentSubmission}>
                    <View style={styles.wrapperIsiSubStatus}>
                      <Text style={styles.isiSubStatus}>{parseInt(SubmissionLOOSERevenue)}M</Text>
                    </View>

                    <View style={styles.wrapperKeteranganAbjat}>
                      <Text style={styles.textAbjatSubmission}>A</Text>
                    </View>
                  </View>

                  <View style={styles.wrapperContentSubmission}>
                    <View style={styles.wrapperIsiSubStatus}>
                      <Text style={styles.isiSubStatus}>{parseInt(SubmissionLOOSERevenue2)}M</Text>
                    </View>

                    <View style={styles.wrapperKeteranganAbjat}>
                      <Text style={styles.textAbjatSubmission}>B</Text>
                    </View>
                  </View>

                  <View style={styles.wrapperContentSubmission}>
                    <View style={styles.wrapperIsiSubStatus}>
                      <Text style={styles.isiSubStatus}>{parseInt(SubmissionLOOSERevenue3)}M</Text>
                    </View>

                    <View style={styles.wrapperKeteranganAbjat}>
                      <Text style={styles.textAbjatSubmission}>C</Text>
                    </View>
                  </View>

                  <View style={styles.wrapperContentSubmission}>
                    <View style={styles.wrapperIsiSubStatus}>
                      <Text style={styles.isiSubStatus}>{parseInt(SubmissionLOOSERevenue4)}M</Text>
                    </View>

                    <View style={styles.wrapperKeteranganAbjat}>
                      <Text style={styles.textAbjatSubmission}>O</Text>
                    </View>
                  </View>
                </View>

                <View style={styles.subJudulSubStatus}>
                  <Text style={styles.subTextJudulSubStatus}>{parseInt(SubmissionLooseProject)} Projects</Text>
                </View>
              </View>

              <View style={styles.wrapperKontenSubStatus}>
                <View style={styles.judulSubStatus}>
                  <Text style={styles.textJudulSubStatus}>WAITING</Text>
                </View>

                <View style={{justifyContent:'center', alignItems:'center'}}>
                  <View style={styles.wrapperContentSubmission}>
                    <View style={styles.wrapperIsiSubStatus}>
                      <Text style={styles.isiSubStatus}>{parseInt(SubmissionWaitingRevenue)}M</Text>
                    </View>

                    <View style={styles.wrapperKeteranganAbjat}>
                      <Text style={styles.textAbjatSubmission}>A</Text>
                    </View>
                  </View>

                  <View style={styles.wrapperContentSubmission}>
                    <View style={styles.wrapperIsiSubStatus}>
                      <Text style={styles.isiSubStatus}>{parseInt(SubmissionWaitingRevenue2)}M</Text>
                    </View>

                    <View style={styles.wrapperKeteranganAbjat}>
                      <Text style={styles.textAbjatSubmission}>B</Text>
                    </View>
                  </View>

                  <View style={styles.wrapperContentSubmission}>
                    <View style={styles.wrapperIsiSubStatus}>
                      <Text style={styles.isiSubStatus}>{parseInt(SubmissionWaitingRevenue3)}M</Text>
                    </View>

                    <View style={styles.wrapperKeteranganAbjat}>
                      <Text style={styles.textAbjatSubmission}>C</Text>
                    </View>
                  </View>

                  <View style={styles.wrapperContentSubmission}>
                    <View style={styles.wrapperIsiSubStatus}>
                      <Text style={styles.isiSubStatus}>{parseInt(SubmissionWaitingRevenue4)}M</Text>
                    </View>

                    <View style={styles.wrapperKeteranganAbjat}>
                      <Text style={styles.textAbjatSubmission}>O</Text>
                    </View>
                  </View>
                </View>

                <View style={styles.subJudulSubStatus}>
                  <Text style={styles.subTextJudulSubStatus}>{parseInt(SubmissionWaitingProject)} Projects</Text>
                </View>
              </View>

              <View style={styles.wrapperKontenSubStatus}>
                <View style={styles.judulSubStatus}>
                  <Text style={styles.textJudulSubStatus}>CANCEL</Text>
                </View>

                <View style={{justifyContent:'center', alignItems:'center'}}>
                  <View style={styles.wrapperContentSubmission}>
                    <View style={styles.wrapperIsiSubStatus}>
                      <Text style={styles.isiSubStatus}>{parseInt(SubmissionCancelRevenue)}M</Text>
                    </View>

                    <View style={styles.wrapperKeteranganAbjat}>
                      <Text style={styles.textAbjatSubmission}>A</Text>
                    </View>
                  </View>

                  <View style={styles.wrapperContentSubmission}>
                    <View style={styles.wrapperIsiSubStatus}>
                      <Text style={styles.isiSubStatus}>{parseInt(SubmissionCancelRevenue2)}M</Text>
                    </View>

                    <View style={styles.wrapperKeteranganAbjat}>
                      <Text style={styles.textAbjatSubmission}>B</Text>
                    </View>
                  </View>

                  <View style={styles.wrapperContentSubmission}>
                    <View style={styles.wrapperIsiSubStatus}>
                      <Text style={styles.isiSubStatus}>{parseInt(SubmissionCancelRevenue3)}M</Text>
                    </View>

                    <View style={styles.wrapperKeteranganAbjat}>
                      <Text style={styles.textAbjatSubmission}>C</Text>
                    </View>
                  </View>

                  <View style={styles.wrapperContentSubmission}>
                    <View style={styles.wrapperIsiSubStatus}>
                      <Text style={styles.isiSubStatus}>{parseInt(SubmissionCancelRevenue4)}M</Text>
                    </View>

                    <View style={styles.wrapperKeteranganAbjat}>
                      <Text style={styles.textAbjatSubmission}>O</Text>
                    </View>
                  </View>
                </View>

                <View style={styles.subJudulSubStatus}>
                  <Text style={styles.subTextJudulSubStatus}>{parseInt(SubmissionCancekProject)} Projects</Text>
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

                <View style={styles.containerContentCurrent}>
                  <View>
                    <Image 
                      source={images.currentProspect.iconProspect}
                      style={{height:hp('3%'), width:wp('5%')}}
                      resizeMode={'stretch'}
                    />
                  </View>

                  <View style={{marginLeft:wp('.8%')}}>
                    <View style={styles.wrapperIsiCurStatus}>
                      <Text style={styles.isiCurStatus}>{currentProspectRevenue}M</Text>

                      <View style={styles.wrapperKeteranganAbjat}>
                        <Text style={styles.textAbjatSubmission}>A</Text>
                      </View>
                    </View>

                    <View style={styles.wrapperIsiCurStatus}>
                      <Text style={styles.isiCurStatus}>{currentProspectRevenue2}M</Text>

                      <View style={styles.wrapperKeteranganAbjat}>
                        <Text style={styles.textAbjatSubmission}>B</Text>
                      </View>
                    </View>

                    <View style={styles.wrapperIsiCurStatus}>
                      <Text style={styles.isiCurStatus}>{currentProspectRevenue3}M</Text>

                      <View style={styles.wrapperKeteranganAbjat}>
                        <Text style={styles.textAbjatSubmission}>C</Text>
                      </View>
                    </View>

                    <View style={styles.wrapperIsiCurStatus}>
                      <Text style={styles.isiCurStatus}>{currentProspectRevenue4}M</Text>

                      <View style={styles.wrapperKeteranganAbjat}>
                        <Text style={styles.textAbjatSubmission}>O</Text>
                      </View>
                    </View>
                  </View>                  
                </View>

                <View style={styles.subJudulCurStatus}>
                  <Text style={styles.subTextJudulCurStatus}>{currentProspectProject} Projects</Text>
                </View>
              </View>

              <View style={styles.wrapperKontenCurStatus}>
                <View style={styles.judulCurStatus}>
                  <Text style={styles.textJudulCurStatus2}>+SUBMISSION</Text>
                </View>

                <View style={styles.containerContentCurrent}>
                  <View>
                    <Image 
                      source={images.currentSubmission.iconSubmission}
                      style={{height:hp('3%'), width:wp('5%')}}
                      resizeMode={'stretch'}
                    />
                  </View>

                  <View style={{marginLeft:wp('.8%')}}>
                    <View style={styles.wrapperIsiCurStatus}>
                      <Text style={styles.isiCurStatus}>{currentSubmissionRevenue}M</Text>

                      <View style={styles.wrapperKeteranganAbjat}>
                        <Text style={styles.textAbjatSubmission}>A</Text>
                      </View>
                    </View>

                    <View style={styles.wrapperIsiCurStatus}>
                      <Text style={styles.isiCurStatus}>{currentSubmissionRevenue2}M</Text>

                      <View style={styles.wrapperKeteranganAbjat}>
                        <Text style={styles.textAbjatSubmission}>B</Text>
                      </View>
                    </View>

                    <View style={styles.wrapperIsiCurStatus}>
                      <Text style={styles.isiCurStatus}>{currentSubmissionRevenue3}M</Text>

                      <View style={styles.wrapperKeteranganAbjat}>
                        <Text style={styles.textAbjatSubmission}>C</Text>
                      </View>
                    </View>

                    <View style={styles.wrapperIsiCurStatus}>
                      <Text style={styles.isiCurStatus}>{currentSubmissionRevenue4}M</Text>

                      <View style={styles.wrapperKeteranganAbjat}>
                        <Text style={styles.textAbjatSubmission}>O</Text>
                      </View>
                    </View>
                  </View>                  
                </View>

                <View style={styles.subJudulCurStatus}>
                  <Text style={styles.subTextJudulCurStatus}>{currentSubmissionProject} Projects</Text>
                </View>
              </View>

              <View style={styles.wrapperKontenCurStatus}>
                <View style={styles.judulCurStatus}>
                  <Text style={styles.textJudulCurStatus3}>+WIN</Text>
                </View>

                <View style={styles.containerContentCurrent}>
                  <View>
                    <Image 
                      source={images.currentWin.iconWin}
                      style={{height:hp('3%'), width:wp('5%')}}
                      resizeMode={'stretch'}
                    />
                  </View>

                  <View style={{marginLeft:wp('.8%')}}>
                    <View style={styles.wrapperIsiCurStatus}>
                      <Text style={styles.isiCurStatus}>{currentWINRevenue}M</Text>

                      <View style={styles.wrapperKeteranganAbjat}>
                        <Text style={styles.textAbjatSubmission}>A</Text>
                      </View>
                    </View>

                    <View style={styles.wrapperIsiCurStatus}>
                      <Text style={styles.isiCurStatus}>{currentWINRevenue2}M</Text>

                      <View style={styles.wrapperKeteranganAbjat}>
                        <Text style={styles.textAbjatSubmission}>B</Text>
                      </View>
                    </View>

                    <View style={styles.wrapperIsiCurStatus}>
                      <Text style={styles.isiCurStatus}>{currentWINRevenue3}M</Text>

                      <View style={styles.wrapperKeteranganAbjat}>
                        <Text style={styles.textAbjatSubmission}>C</Text>
                      </View>
                    </View>

                    <View style={styles.wrapperIsiCurStatus}>
                      <Text style={styles.isiCurStatus}>{currentWINRevenue4}M</Text>

                      <View style={styles.wrapperKeteranganAbjat}>
                        <Text style={styles.textAbjatSubmission}>O</Text>
                      </View>
                    </View>
                  </View>                  
                </View>

                <View style={styles.subJudulCurStatus}>
                  <Text style={styles.subTextJudulCurStatus}>{currentWINProject} Projects</Text>
                </View>
              </View>

              <View style={styles.wrapperKontenCurStatus}>
                <View style={styles.judulCurStatus}>
                  <Text style={styles.textJudulCurStatus4}>+BILLCOM</Text>
                </View>

                <View style={styles.containerContentCurrent}>
                  <View>
                    <Image 
                      source={images.currentBillcom.iconBill}
                      style={{height:hp('3%'), width:wp('5%')}}
                      resizeMode={'stretch'}
                    />
                  </View>

                  <View style={{marginLeft:wp('.8%')}}>
                    <View style={styles.wrapperIsiCurStatus}>
                      <Text style={styles.isiCurStatus}>{currentBIllcomRevenue}M</Text>

                      <View style={styles.wrapperKeteranganAbjat}>
                        <Text style={styles.textAbjatSubmission}>A</Text>
                      </View>
                    </View>

                    <View style={styles.wrapperIsiCurStatus}>
                      <Text style={styles.isiCurStatus}>{currentBIllcomRevenue2}M</Text>

                      <View style={styles.wrapperKeteranganAbjat}>
                        <Text style={styles.textAbjatSubmission}>B</Text>
                      </View>
                    </View>

                    <View style={styles.wrapperIsiCurStatus}>
                      <Text style={styles.isiCurStatus}>{currentBIllcomRevenue3}M</Text>

                      <View style={styles.wrapperKeteranganAbjat}>
                        <Text style={styles.textAbjatSubmission}>C</Text>
                      </View>
                    </View>

                    <View style={styles.wrapperIsiCurStatus}>
                      <Text style={styles.isiCurStatus}>{currentBIllcomRevenue4}M</Text>

                      <View style={styles.wrapperKeteranganAbjat}>
                        <Text style={styles.textAbjatSubmission}>O</Text>
                      </View>
                    </View>
                  </View>                  
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
  ebisProspectREVENUE:state.EbisTregReducerAbc.ebisProspectREVENUE,
  ebisProspectProject:state.EbisTregReducerAbc.ebisProspectProject,
  ebisProspectTargetA:state.EbisTregReducerAbc.ebisProspectTargetA,
  ebisProspectTargetB:state.EbisTregReducerAbc.ebisProspectTargetB,
  ebisProspectTargetC:state.EbisTregReducerAbc.ebisProspectTargetC,
  ebisProspectTargetO:state.EbisTregReducerAbc.ebisProspectTargetO,

  ebisSubmisionREVENUE:state.EbisTregReducerAbc.ebisSubmisionREVENUE,
  ebisSubmissionProject:state.EbisTregReducerAbc.ebisSubmissionProject,
  ebisSubmissionTargetA:state.EbisTregReducerAbc.ebisSubmissionTargetA,
  ebisSubmissionTargetB:state.EbisTregReducerAbc.ebisSubmissionTargetB,
  ebisSubmissionTargetC:state.EbisTregReducerAbc.ebisSubmissionTargetC,
  ebisSubmissionTargetO:state.EbisTregReducerAbc.ebisSubmissionTargetO,

  ebisWinREVENUE:state.EbisTregReducerAbc.ebisWinREVENUE,
  ebisWinProject:state.EbisTregReducerAbc.ebisWinProject,
  ebisWinTargetA:state.EbisTregReducerAbc.ebisWinTargetA,
  ebisWinTargetB:state.EbisTregReducerAbc.ebisWinTargetB,
  ebisWinTargetC:state.EbisTregReducerAbc.ebisWinTargetC,
  ebisWinTargetO:state.EbisTregReducerAbc.ebisWinTargetO,

  ebisBillcomREVENUE:state.EbisTregReducerAbc.ebisBillcomREVENUE,
  ebisBillcomeProject:state.EbisTregReducerAbc.ebisBillcomeProject,
  ebisBillcommTargetA:state.EbisTregReducerAbc.ebisBillcommTargetA,
  ebisBillcommTargetB:state.EbisTregReducerAbc.ebisBillcommTargetB,
  ebisBillcommTargetC:state.EbisTregReducerAbc.ebisBillcommTargetC,
  ebisBillcommTargetO:state.EbisTregReducerAbc.ebisBillcommTargetO,

  //submission status
  SubmissionWINRevenue:state.EbisTregReducerAbc.SubmissionWINRevenue,
  SubmissionWINRevenue2:state.EbisTregReducerAbc.SubmissionWINRevenue2,
  SubmissionWINRevenue3:state.EbisTregReducerAbc.SubmissionWINRevenue3,
  SubmissionWINRevenue4:state.EbisTregReducerAbc.SubmissionWINRevenue4,
  SubmissionWINProject:state.EbisTregReducerAbc.SubmissionWINProject,

  SubmissionLOOSERevenue:state.EbisTregReducerAbc.SubmissionLOOSERevenue,
  SubmissionLOOSERevenue2:state.EbisTregReducerAbc.SubmissionLOOSERevenue2,
  SubmissionLOOSERevenue3:state.EbisTregReducerAbc.SubmissionLOOSERevenue3,
  SubmissionLOOSERevenue4:state.EbisTregReducerAbc.SubmissionLOOSERevenue4,
  SubmissionLooseProject:state.EbisTregReducerAbc.SubmissionLooseProject,

  SubmissionWaitingRevenue:state.EbisTregReducerAbc.SubmissionWaitingRevenue,
  SubmissionWaitingRevenue2:state.EbisTregReducerAbc.SubmissionWaitingRevenue2,
  SubmissionWaitingRevenue3:state.EbisTregReducerAbc.SubmissionWaitingRevenue3,
  SubmissionWaitingRevenue4:state.EbisTregReducerAbc.SubmissionWaitingRevenue4,
  SubmissionWaitingProject:state.EbisTregReducerAbc.SubmissionWaitingProject,

  SubmissionCancelRevenue:state.EbisTregReducerAbc.SubmissionCancelRevenue,
  SubmissionCancelRevenue2:state.EbisTregReducerAbc.SubmissionCancelRevenue2,
  SubmissionCancelRevenue3:state.EbisTregReducerAbc.SubmissionCancelRevenue3,
  SubmissionCancelRevenue4:state.EbisTregReducerAbc.SubmissionCancelRevenue4,
  SubmissionCancekProject:state.EbisTregReducerAbc.SubmissionCancekProject,

  //current status
  currentProspectRevenue:state.EbisTregReducerAbc.currentProspectRevenue,
  currentProspectProject:state.EbisTregReducerAbc.currentProspectProject,

  currentSubmissionRevenue:state.EbisTregReducerAbc.currentSubmissionRevenue,
  currentSubmissionProject:state.EbisTregReducerAbc.currentSubmissionProject,

  currentWINRevenue:state.EbisTregReducerAbc.currentWINRevenue,
  currentWINProject:state.EbisTregReducerAbc.currentWINProject,

  currentBIllcomRevenue:state.EbisTregReducerAbc.currentBIllcomRevenue,
  currentBillcomProject:state.EbisTregReducerAbc.currentBillcomProject,
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
    width:wp('13%'), 
    backgroundColor:'#dfdfdd',
    marginLeft:wp('.5'),
    marginRight:wp('.5')
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
  wrapperContentSubmission:{
    flexDirection:'row', 
    justifyContent:'space-between', 
    width:wp('16%')
  },
  wrapperKeteranganAbjat:{
    justifyContent:'center', 
    alignSelf:'center'
  },
  textAbjatSubmission:{
    textAlign:'right',
    fontWeight:'500',
    fontSize:9, 
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
    justifyContent:'center',
    alignItems:'center'
  },
  judulCurStatus:{
    justifyContent:'center',
    alignItems:'center',
    height:hp('2%'),
    marginBottom:hp('1%')
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
  containerContentCurrent:{
    flexDirection:'row', 
    width:wp('22%'),
  },
  wrapperIsiCurStatus:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
  },
  isiCurStatus:{
    textAlign:'center',
    fontWeight:'500',
    fontSize:12,
    alignSelf:'center',
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
