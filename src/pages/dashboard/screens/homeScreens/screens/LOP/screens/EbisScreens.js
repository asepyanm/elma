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
            <Text style={styles.textPeriode}>Periode</Text>
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
  }
});
