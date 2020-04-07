import React, { Component } from 'react';
import {
  Alert,
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

//export file
import XLSX from 'xlsx';
import { writeFile, ExternalStorageDirectoryPath } from 'react-native-fs';
const DDP = ExternalStorageDirectoryPath + "/";
const output = str => str;

class DgsScreens extends Component{
  constructor(props){
    super(props);
    this.state = {
      data:[],

      tampilActivityIndicator: false,

      //get date
      date1: '',
      date2: '',
    }
  }

  refreshPeriode(sDate,eDate){
    this.setState({date1:sDate,date2:eDate})

    this.props.dispatch({
      type:'DGS_HOME_CHANNEL',
      payload:axios.get(`${url.API2}/ebis_getchannelmain/div/DGS/startdate/${sDate}/enddate/${eDate}/treg/ALL/witel/ALL/`)
    });
    this.props.dispatch({
      type:'DGS_HOME_CURRENT_CHANNEL',
      payload:axios.get(`${url.API2}/ebis_getchannelcurr/div/DGS/treg/ALL/witel/ALL/`)
    });
    this.props.dispatch({
      type:'DGS_HOME_SUBMISSION_CHANNEL',
      payload:axios.get(`${url.API2}/ebis_getchannelsub/startdate/${sDate}/enddate/${eDate}/div/DGS/treg/ALL/witel/ALL/`)
    });

    this.props.dispatch({
      type:'DGS_HOME_DOWNLOAD_CHANNEL',
      payload:axios.get(`${url.API2}/ebis_getchannelrawdata/startdate/${sDate}/enddate/${eDate}/div/DGS/treg/ALL/witel/ALL`)
    });

    this.props.dispatch({
      type:'DGS_LASTUPDATE_CHANNEL',
      payload:axios.get(`${url.API2}/ebis_lastime`)
    });
  }

  downloadFileExcel(){
    const {dataDownloadEbis} = this.props;
    let dataMap = [
      [ 
        "Nama Project",
        "Nama CC",
        "Nilai Project", 
        "Lama Kontrak", 
        "Divisi", 
        "Segment", 
        "Deliver", 
        "Payment Method", 
        "Channel", 
        "GPM", 
        "Status KB",
        "No. KB",
        "Durasi",
        "Status PO/P1",
        "Dokumen PO/P1",
        "LOPID",
        "WITEL",
        "Status",
        "Sympton",
        "TREG",
        "Nama Mitra",
      ],
    ];
    for (var i = 0; i < dataDownloadEbis.length; i++) {
      dataMap.push([
          dataDownloadEbis[i].NAMAPROJECT,
          dataDownloadEbis[i].NAMACC,
          dataDownloadEbis[i].REVENUE,
          dataDownloadEbis[i].LAMAKONTRAK,
          dataDownloadEbis[i].DIVISI,
          dataDownloadEbis[i].SEGMEN,
          dataDownloadEbis[i].DELIVER,
          dataDownloadEbis[i].PAYMENT_METHODE,
          dataDownloadEbis[i].KATEGORI_CHANNEL,
          dataDownloadEbis[i].GPM,
          dataDownloadEbis[i].STATUS_KB,
          dataDownloadEbis[i].NO_KB,
          dataDownloadEbis[i].DURASI,
          dataDownloadEbis[i].STATUS_JUST_P0_P1,
          dataDownloadEbis[i].DOKUMEN,
          dataDownloadEbis[i].LOPID,
          dataDownloadEbis[i].WITEL,
          dataDownloadEbis[i].STATUS,
          dataDownloadEbis[i].SYMPTON,
          dataDownloadEbis[i].TREG,
          dataDownloadEbis[i].NAMA_MITRA,
      ]);
    };

    /* convert AOA back to worksheet */
		const ws = XLSX.utils.aoa_to_sheet(dataMap);

		/* build new workbook */
		const wb = XLSX.utils.book_new();
		XLSX.utils.book_append_sheet(wb, ws, "SheetJS");

		/* write file */
		const wbout = XLSX.write(wb, {type:'binary', bookType:"xlsx"});
		const file = DDP + `channel-dgs.xlsx`;
		writeFile(file, output(wbout), 'ascii').then((res) =>{
			Alert.alert("exportFile success", "Exported to " + file);
		}).catch((err) => { 
      Alert.alert("Terjadi kesalah, silahkan coba lagi beberapa saat"); 
    });
  }
  
  render() {
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
      sDate, eDate,
      //navigation
      navigation,

      //prospect
      ebisProspectREVENUE,
      ebisProspectProject,
      ebisPROSPECT_GTMA,
      ebisPROSPECT_GTMA_PROJECT,
      ebisPROSPECT_NGTMA,
      ebisPROSPECT_NGTMA_PROJECT,
      PROSPECT_OC,
      PROSPECT_OC_PROJECT,

      //submission
      ebisSubmisionREVENUE,
      ebisSubmissionProject,
      ebisSUBMISSION_GTMA,
      ebisSUBMISSION_GTMA_PROJECT,
      ebisSUBMISSION_NGTMA,
      ebisSUBMISSION_NGTMA_PROJECT,
      ebisSUBMISSION_OC,
      ebisSUBMISSION_OC_PROJECT,

      //win
      ebisWinREVENUE,
      ebisWinProject,
      ebisWIN_GTMA,
      ebisWIN_GTMA_PROJECT,
      ebisWIN_NGTMA,
      ebisWIN_NGTMA_PROJECT,
      ebisWIN_OC,
      ebisWIN_OC_PROJECT,

      //billcom
      ebisBillcomREVENUE,
      ebisBillcomeProject,
      ebisBILLCOM_GTMA,
      ebisBILLCOM_GTMA_PROJECT,
      ebisBILLCOM_NGTMA,
      ebisBILLCOM_NGTMA_PROJECT,
      ebisBILLCOM_OC,
      ebisBILLCOM_OC_PROJECT,

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

    SPRratio = (parseInt(ebisSubmisionREVENUE) / parseInt(ebisProspectREVENUE))*100;
    WSRratio = (parseInt(ebisWinREVENUE) / parseInt(ebisSubmisionREVENUE))*100;
    BWRratio = (parseInt(ebisBillcomREVENUE) / parseInt(ebisWinREVENUE))*100;
    WPRratio = (parseInt(ebisWinREVENUE) / parseInt(ebisProspectREVENUE))*100;

    // SPRratio = (parseInt(ebisPresentase2) / parseInt(ebisPresentase))*100;
    // WSRratio = (parseInt(ebisPresentase3) / parseInt(ebisPresentase2))*100;
    // BWRratio = (parseInt(ebisPresentase4) / parseInt(ebisPresentase3))*100;
    // WPRratio = (parseInt(ebisPresentase3) / parseInt(ebisPresentase))*100;

    const {date1,date2} = this.state;
    if (date1 != sDate){
      //this.setState({date1:sDate,date2:eDate})
      this.refreshPeriode(sDate,eDate)
    } else {
      if (date2 != eDate){
        //this.setState({date1:sDate,date2:eDate})
        this.refreshPeriode(sDate,eDate)
      }
    }

    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.wrapperArrow}>
            <View style={{width:wp('42%'), height:hp('5%')}}/>

            <View style={styles.containerTitle3Data}>
              <Text style={styles.text3Judul}>GTMA</Text>
            </View>

            <View style={styles.containerTitle3Data}>
              <Text style={styles.text3Judul}>OC</Text>
            </View>

            <View style={styles.containerTitle3Data}>
              <Text style={styles.text3Judul}>NEW GTMA</Text>
            </View>
          </View>

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

            <View style={styles.container3dataProspect}>
              <Text style={styles.textJudul}>{ebisPROSPECT_GTMA} M</Text>
              <Text style={styles.textIsi}>{ebisPROSPECT_GTMA_PROJECT} Projects</Text>
            </View>

            <View style={styles.container3dataProspect}>
              <Text style={styles.textJudul}>{ebisPROSPECT_NGTMA} M</Text>
              <Text style={styles.textIsi}>{ebisPROSPECT_NGTMA_PROJECT} Projects</Text>
            </View>

            <View style={styles.container3dataProspect}>
              <Text style={styles.textJudul}>{ebisSUBMISSION_OC} M</Text>
              <Text style={styles.textIsi}>{ebisSUBMISSION_OC_PROJECT} Projects</Text>
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

            <View style={styles.container3dataSubmission}>
              <Text style={styles.textJudul}>{ebisSUBMISSION_GTMA} M</Text>
              <Text style={styles.textIsi}>{ebisSUBMISSION_GTMA_PROJECT} Projects</Text>
            </View>

            <View style={styles.container3dataSubmission}>
              <Text style={styles.textJudul}>{ebisSUBMISSION_NGTMA} M</Text>
              <Text style={styles.textIsi}>{ebisPROSPECT_GTMA} Projects</Text>
            </View>

            <View style={styles.container3dataSubmission}>
              <Text style={styles.textJudul}>{ebisSUBMISSION_OC} M</Text>
              <Text style={styles.textIsi}>{ebisSUBMISSION_OC_PROJECT} Projects</Text>
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

            <View style={styles.container3dataWIN}>
              <Text style={styles.textJudul}>{ebisWIN_GTMA} M</Text>
              <Text style={styles.textIsi}>{ebisWIN_GTMA_PROJECT} Projects</Text>
            </View>

            <View style={styles.container3dataWIN}>
              <Text style={styles.textJudul}>{ebisWIN_NGTMA} M</Text>
              <Text style={styles.textIsi}>{ebisWIN_NGTMA_PROJECT} Projects</Text>
            </View>

            <View style={styles.container3dataWIN}>
              <Text style={styles.textJudul}>{ebisWIN_OC} M</Text>
              <Text style={styles.textIsi}>{ebisWIN_OC_PROJECT} Projects</Text>
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

            <View style={styles.container3dataBillcom}>
              <Text style={styles.textJudul}>{ebisBILLCOM_GTMA} M</Text>
              <Text style={styles.textIsi}>{ebisBILLCOM_GTMA_PROJECT} Projects</Text>
            </View>

            <View style={styles.container3dataBillcom}>
              <Text style={styles.textJudul}>{ebisBILLCOM_NGTMA} M</Text>
              <Text style={styles.textIsi}>{ebisBILLCOM_NGTMA_PROJECT} Projects</Text>
            </View>

            <View style={styles.container3dataBillcom}>
              <Text style={styles.textJudul}>{ebisBILLCOM_OC} M</Text>
              <Text style={styles.textIsi}>{ebisBILLCOM_OC_PROJECT} Projects</Text>
            </View>
          </View>

          <View>
            <Text style={{fontSize:9,marginLeft:wp('2%')}}>Lastupdate: {lastUpdated}</Text>
          </View>

          <View style={styles.wrapperArrow}>
            <View style={{width:wp('42%'), height:hp('5%')}}/>

            <TouchableOpacity onPress={() => this.downloadFileExcel()} style={styles.containerButtonDownload}>
              <Text style={styles.textDownload}>Download File</Text>
            </TouchableOpacity>
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
  lastUpdated: state.DgsReducerChannel.ebisLastupdate,

  //data dgs
  ebisProspectREVENUE:state.DgsReducerChannel.ebisProspectREVENUE,
  ebisProspectProject:state.DgsReducerChannel.ebisProspectProject,
  ebisPROSPECT_GTMA: state.DgsReducerChannel.ebisPROSPECT_GTMA,
  ebisPROSPECT_GTMA_PROJECT: state.DgsReducerChannel.ebisPROSPECT_GTMA_PROJECT,
  ebisPROSPECT_NGTMA: state.DgsReducerChannel.ebisPROSPECT_NGTMA,
  ebisPROSPECT_NGTMA_PROJECT: state.DgsReducerChannel.ebisPROSPECT_NGTMA_PROJECT,
  PROSPECT_OC: state.DgsReducerChannel.PROSPECT_OC,
  PROSPECT_OC_PROJECT: state.DgsReducerChannel.PROSPECT_OC_PROJECT,

  ebisSubmisionREVENUE:state.DgsReducerChannel.ebisSubmisionREVENUE,
  ebisSubmissionProject:state.DgsReducerChannel.ebisSubmissionProject,
  ebisSUBMISSION_GTMA:state.DgsReducerChannel.ebisSUBMISSION_GTMA,
  ebisSUBMISSION_GTMA_PROJECT:state.DgsReducerChannel.ebisSUBMISSION_GTMA_PROJECT,
  ebisSUBMISSION_NGTMA:state.DgsReducerChannel.ebisSUBMISSION_NGTMA,
  ebisSUBMISSION_NGTMA_PROJECT:state.DgsReducerChannel.ebisSUBMISSION_NGTMA_PROJECT,
  ebisSUBMISSION_OC: state.DgsReducerChannel.ebisSUBMISSION_OC,
  ebisSUBMISSION_OC_PROJECT: state.DgsReducerChannel.ebisSUBMISSION_OC_PROJECT,

  ebisWinREVENUE:state.DgsReducerChannel.ebisWinREVENUE,
  ebisWinProject:state.DgsReducerChannel.ebisWinProject,
  ebisWIN_GTMA: state.DgsReducerChannel.ebisWIN_GTMA,
  ebisWIN_GTMA_PROJECT: state.DgsReducerChannel.ebisWIN_GTMA_PROJECT,
  ebisWIN_NGTMA: state.DgsReducerChannel.ebisWIN_NGTMA,
  ebisWIN_NGTMA_PROJECT: state.DgsReducerChannel.ebisWIN_NGTMA_PROJECT,
  ebisWIN_OC: state.DgsReducerChannel.ebisWIN_OC,
  ebisWIN_OC_PROJECT: state.DgsReducerChannel.ebisWIN_OC_PROJECT,

  ebisBillcomREVENUE:state.DgsReducerChannel.ebisBillcomREVENUE,
  ebisBillcomeProject:state.DgsReducerChannel.ebisBillcomeProject,
  ebisBILLCOM_GTMA: state.DgsReducerChannel.ebisBILLCOM_GTMA,
  ebisBILLCOM_GTMA_PROJECT: state.DgsReducerChannel.ebisBILLCOM_GTMA_PROJECT,
  ebisBILLCOM_NGTMA: state.DgsReducerChannel.ebisBILLCOM_NGTMA,
  ebisBILLCOM_NGTMA_PROJECT: state.DgsReducerChannel.ebisBILLCOM_NGTMA_PROJECT,
  ebisBILLCOM_OC: state.DgsReducerChannel.ebisBILLCOM_OC,
  ebisBILLCOM_OC_PROJECT: state.DgsReducerChannel.ebisBILLCOM_OC_PROJECT,

  //submission status
  SubmissionWINRevenue:state.DgsReducerChannel.SubmissionWINRevenue,
  SubmissionWINProject:state.DgsReducerChannel.SubmissionWINProject,
  SubmissionLOOSERevenue:state.DgsReducerChannel.SubmissionLOOSERevenue,
  SubmissionLooseProject:state.DgsReducerChannel.SubmissionLooseProject,
  SubmissionWaitingRevenue:state.DgsReducerChannel.SubmissionWaitingRevenue,
  SubmissionWaitingProject:state.DgsReducerChannel.SubmissionWaitingProject,
  SubmissionCancelRevenue:state.DgsReducerChannel.SubmissionCancelRevenue,
  SubmissionCancekProject:state.DgsReducerChannel.SubmissionCancekProject,

  //current status
  currentProspectRevenue:state.DgsReducerChannel.currentProspectRevenue,
  currentProspectProject:state.DgsReducerChannel.currentProspectProject,
  currentSubmissionRevenue:state.DgsReducerChannel.currentSubmissionRevenue,
  currentSubmissionProject:state.DgsReducerChannel.currentSubmissionProject,
  currentWINRevenue:state.DgsReducerChannel.currentWINRevenue,
  currentWINProject:state.DgsReducerChannel.currentWINProject,
  currentBIllcomRevenue:state.DgsReducerChannel.currentBIllcomRevenue,
  currentBillcomProject:state.DgsReducerChannel.currentBillcomProject,

  //data file download
  dataDownloadEbis:state.DgsReducerChannel.dataDownloadEbis,
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
  containerTitle3Data:{
    height:hp('5%'), 
    width:wp('17%'), 
    backgroundColor:'#000000',
    justifyContent:'center',
    alignItems:'center',
    marginLeft:wp('1%')
  },
  text3Judul:{
    fontWeight:'bold',
    fontSize:10,
    color:'#FFFFFF'
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
  container3dataProspect:{
    height:hp('9%'), 
    width:wp('17%'), 
    backgroundColor:'#ddc8df',
    justifyContent:'center',
    alignItems:'center',
    marginLeft:wp('1%')
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
  container3dataSubmission:{
    height:hp('9%'), 
    width:wp('17%'), 
    backgroundColor:'#ecb889',
    justifyContent:'center',
    alignItems:'center',
    marginLeft:wp('1%')
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
  container3dataWIN:{
    height:hp('9%'), 
    width:wp('17%'), 
    backgroundColor:'#c7eecc',
    justifyContent:'center',
    alignItems:'center',
    marginLeft:wp('1%')
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
  container3dataBillcom:{
    height:hp('9%'), 
    width:wp('17%'), 
    backgroundColor:'#a9c1fb',
    justifyContent:'center',
    alignItems:'center',
    marginLeft:wp('1%')
  },
  containerButtonDownload:{
    height:hp('5%'), 
    width:wp('51%'), 
    backgroundColor:'#4E7CB3',
    justifyContent:'center',
    alignItems:'center',
    marginLeft:wp('1%')
  },
  textDownload:{
    fontWeight:'bold',
    fontSize:13,
    color:'#FFFFFF'
  },
  textJudul:{
    fontWeight:'bold',
    fontSize:13
  },
  textIsi:{
    fontWeight:'700',
    fontSize:9,
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
