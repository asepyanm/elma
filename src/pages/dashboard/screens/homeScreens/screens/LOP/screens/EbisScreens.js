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
import ModalSelector from 'react-native-modal-selector';

export default class EbisScreens extends Component{
  render() {
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
      arrowGrey:require('../../../../../../../assets/Arrow/arrowGrey.png')
    };
    return (
      <View style={styles.container}>
        <View style={styles.wrapperPeriode}>
          <View>
            <Text style={styles.textPeriode}>Periode : </Text>
          </View>
          <View style={styles.wrapperModalPeriode}>
            <View>
              <ModalSelector
                data={data}
                initValue="Pilih"
                selectStyle={styles.modalPeriode}
                // onChange={(option)=>{ alert(`${option.label} (${option.key}) nom nom nom`) }} 
              />
            </View>
            <View>
              <Text style={{fontSize:20, fontWeight:'bold'}}> - </Text>
            </View>
            <View>
              <ModalSelector
                data={data}
                initValue="Pilih"
                selectStyle={styles.modalPeriode}
                // onChange={(option)=>{ alert(`${option.label} (${option.key}) nom nom nom`) }} 
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

            <View style={styles.containerArrowProspect}>
              <Text style={styles.textJudul}>PROSPECT</Text>
              <Text style={styles.textIsi}>2183 M</Text>
              <Text style={styles.textKeterangan}>per 17627 Project</Text>
            </View>

            <Image 
              source={images.prospect.arrowProspect2}
              style={styles.imageStyle}
              resizeMode={'stretch'}
            />

            <View style={styles.containerArrowProspect2}>
              <Text style={styles.textJudul}>Target</Text>
              <Text style={styles.textIsi}>1236 M</Text>
            </View>

            <Image 
              source={images.arrowGrey}
              style={styles.imageStyle}
              resizeMode={'stretch'}
            />
          </View>

          <View style={styles.wrapperArrow}>
            <Image 
              source={images.Submission.arrowSub1}
              style={styles.imageStyle}
              resizeMode={'stretch'}
            />

            <View style={styles.containerArrowSubmission}>
              <Text style={styles.textJudul}>SUBMISSION</Text>
              <Text style={styles.textIsi}>2183 M</Text>
              <Text style={styles.textKeterangan}>per 17627 Project</Text>
            </View>

            <Image 
              source={images.Submission.arrowSub2}
              style={styles.imageStyle}
              resizeMode={'stretch'}
            />

            <View style={styles.containerArrowSubmission2}>
              <Text style={styles.textJudul}>Target</Text>
              <Text style={styles.textIsi}>1236 M</Text>
            </View>

            <Image 
              source={images.arrowGrey}
              style={styles.imageStyle}
              resizeMode={'stretch'}
            />
          </View>

          <View style={styles.wrapperArrow}>
            <Image 
              source={images.Win.arrowWin1}
              style={styles.imageStyle}
              resizeMode={'stretch'}
            />

            <View style={styles.containerArrowWin}>
              <Text style={styles.textJudul}>WIN</Text>
              <Text style={styles.textIsi}>2183 M</Text>
              <Text style={styles.textKeterangan}>per 17627 Project</Text>
            </View>

            <Image 
              source={images.Win.arrowWin2}
              style={styles.imageStyle}
              resizeMode={'stretch'}
            />

            <View style={styles.containerArrowWin2}>
              <Text style={styles.textJudul}>Target</Text>
              <Text style={styles.textIsi}>1236 M</Text>
            </View>

            <Image 
              source={images.arrowGrey}
              style={styles.imageStyle}
              resizeMode={'stretch'}
            />
          </View>

          <View style={styles.wrapperArrow}>
            <Image 
              source={images.Billcom.arrowBil1}
              style={styles.imageStyle}
              resizeMode={'stretch'}
            />

            <View style={styles.containerArrowBill}>
              <Text style={styles.textJudul}>BILLCOM</Text>
              <Text style={styles.textIsi}>2183 M</Text>
              <Text style={styles.textKeterangan}>per 17627 Project</Text>
            </View>

            <Image 
              source={images.Billcom.arrowBil2}
              style={styles.imageStyle}
              resizeMode={'stretch'}
            />

            <View style={styles.containerArrowBill2}>
              <Text style={styles.textJudul}>Target</Text>
              <Text style={styles.textIsi}>1236 M</Text>
            </View>

            <Image 
              source={images.arrowGrey}
              style={styles.imageStyle}
              resizeMode={'stretch'}
            />
          </View>
        
          <View style={styles.wrapperRatio}>
            <View style={styles.wrapperKontenRatio}>
              <View style={styles.judulRatio}>
                <Text style={styles.textJudulRatio}>SPR</Text>
              </View>
              <View style={styles.wrapperIsiRatio}>
                <Text style={styles.isiRatio}>81.46%</Text>
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
                <Text style={styles.isiRatio}>81.18%</Text>
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
                <Text style={styles.isiRatio}>23.84%</Text>
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
                <Text style={styles.isiRatio}>66.13%</Text>
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
                  <Text style={styles.isiSubStatus}>13823 M</Text>
                </View>
                <View style={styles.subJudulSubStatus}>
                  <Text style={styles.subTextJudulSubStatus}>9872 Projects</Text>
                </View>
              </View>

              <View style={styles.wrapperKontenSubStatus}>
                <View style={styles.judulSubStatus}>
                  <Text style={styles.textJudulSubStatus}>LOSE</Text>
                </View>
                <View style={styles.wrapperIsiSubStatus}>
                  <Text style={styles.isiSubStatus}>0 M</Text>
                </View>
                <View style={styles.subJudulSubStatus}>
                  <Text style={styles.subTextJudulSubStatus}>0 Projects</Text>
                </View>
              </View>

              <View style={styles.wrapperKontenSubStatus}>
                <View style={styles.judulSubStatus}>
                  <Text style={styles.textJudulSubStatus}>WAITING</Text>
                </View>
                <View style={styles.wrapperIsiSubStatus}>
                  <Text style={styles.isiSubStatus}>81.6 M</Text>
                </View>
                <View style={styles.subJudulSubStatus}>
                  <Text style={styles.subTextJudulSubStatus}>428 Projects</Text>
                </View>
              </View>

              <View style={styles.wrapperKontenSubStatus}>
                <View style={styles.judulSubStatus}>
                  <Text style={styles.textJudulSubStatus}>CANCEL</Text>
                </View>
                <View style={styles.wrapperIsiSubStatus}>
                  <Text style={styles.isiSubStatus}>0 M</Text>
                </View>
                <View style={styles.subJudulSubStatus}>
                  <Text style={styles.subTextJudulSubStatus}>0 Projects</Text>
                </View>
              </View>
            </View>
          </View>
        
        </ScrollView>
      </View>
    );
  }
}

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
});
