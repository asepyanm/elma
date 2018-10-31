import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
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
  }
});
