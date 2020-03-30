import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { Container, Header, Content, Tab, Tabs } from 'native-base';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import ModalSelector from 'react-native-modal-selector';
import {connect} from 'react-redux';
import axios from 'axios';

//global
import url from '../../../../../../config/api_service';

//screens
import EbisScreens from './screens/EbisScreens';
import DesScreens  from './screens/DesScreens';
import DbsScreens  from './screens/DbsScreens';
import DgsScreens  from './screens/DgsScreens';

class LOPscreen extends Component{

  constructor(props){
    super(props);
    this.state = {
      data:[],

      //state pilihan regional
      dataRegionalWitel:[],
      statusGetReg:false,
      statusRegTreg:'ALL',
      dataFilter:'All',
      dataWitel:'ALL',

      sdate: '199912',
      edate: '299912',
    }
  }

  filterPeriodeDate1(data){
    //const {sdate} = this.state;
    this.setState({
      sdate:data.value,
    })
  }

  filterPeriodeDate2(data){
    //const {edate} = this.state;
    this.setState({
      edate:data.value  
    })
  }

  renderFilterRegional(option){
    let dataFilter = option.value;
    this.setState({
      statusGetReg:true,
      dataFilter:dataFilter,
    })

    if(dataFilter === 'All'){
      this.setState({
        dataRegionalWitel:[],
        statusGetReg:false,
        dataWitel:'ALL',
        statusRegTreg:'ALL'
      })
    } else {
      axios.get(`${url.API}/ebis_getwitel/reg/${dataFilter}`).then((res)=>{
        console.log(res);
        this.setState({
          dataWitel:'ALL',
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
    this.setState({dataWitel: option.W1})
  }

  render() {

    var date = new Date().getDate();
    var month = new Date().getMonth() +1;
    var year = new Date().getFullYear();
  
    var dateNow = `${date}-${month}-${year}`
  
    let index = 0

    var pyear = year -1;
    var nyear = year +1;

    const data = [
      { key: index++, label: `${pyear}-01`, value:`${pyear}01`},
      { key: index++, label: `${pyear}-02`, value:`${pyear}02`},
      { key: index++, label: `${pyear}-03`, value:`${pyear}03`},
      { key: index++, label: `${pyear}-04`, value:`${pyear}04`},
      { key: index++, label: `${pyear}-05`, value:`${pyear}05`},
      { key: index++, label: `${pyear}-06`, value:`${pyear}06`},
      { key: index++, label: `${pyear}-07`, value:`${pyear}07`},
      { key: index++, label: `${pyear}-08`, value:`${pyear}08`},
      { key: index++, label: `${pyear}-09`, value:`${pyear}09`},
      { key: index++, label: `${pyear}-10`, value:`${pyear}10`},
      { key: index++, label: `${pyear}-11`, value:`${pyear}11`},
      { key: index++, label: `${pyear}-12`, value:`${pyear}12`},
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
      { key: index++, label: `${nyear}-01`, value:`${nyear}01`},
      { key: index++, label: `${nyear}-02`, value:`${nyear}02`},
      { key: index++, label: `${nyear}-03`, value:`${nyear}03`},
      { key: index++, label: `${nyear}-04`, value:`${nyear}04`},
      { key: index++, label: `${nyear}-05`, value:`${nyear}05`},
      { key: index++, label: `${nyear}-06`, value:`${nyear}06`},
    ];

    let keyReg = 0
    const regional = [
      { key: keyReg++, label: 'All Regional', value:'All'},
      { key: keyReg++, label: 'Reg 1', value:'REG-1'},
      { key: keyReg++, label: 'Reg 2', value:'REG-2'},
      { key: keyReg++, label: 'Reg 3', value:'REG-3'},
      { key: keyReg++, label: 'Reg 4', value:'REG-4'},
      { key: keyReg++, label: 'Reg 5', value:'REG-5'},
      { key: keyReg++, label: 'Reg 6', value:'REG-6'},
      { key: keyReg++, label: 'Reg 7', value:'REG-7'},
    ];

    const {dataRegionalWitel, statusGetReg} = this.state;
  
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
                initValue={`${year}-${("0"+month).slice(-2)}`}                
                selectStyle={styles.modalPeriode}
                onChange={(data)=> this.filterPeriodeDate2(data)} 
              />
            </View>
          </View>
        </View>

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

        <Tabs tabBarUnderlineStyle={{backgroundColor: '#575F6A'}}>
          <Tab heading="EBIS" tabStyle={styles.tabStyle} activeTabStyle={styles.activeTabStyle} activeTextStyle={styles.activeTextStyle} textStyle={styles.textStyle}>
            <EbisScreens xParams={this.state} navigation={this.props.navigation} />
          </Tab>
          <Tab heading="DES" tabStyle={styles.tabStyle} activeTabStyle={styles.activeTabStyle} activeTextStyle={styles.activeTextStyle} textStyle={styles.textStyle}>
            <DesScreens xParams={this.state} navigation={this.props.navigation} />
          </Tab>
          <Tab heading="DBS" tabStyle={styles.tabStyle} activeTabStyle={styles.activeTabStyle} activeTextStyle={styles.activeTextStyle} textStyle={styles.textStyle}>
            <DbsScreens xParams={this.state} navigation={this.props.navigation} />
          </Tab>
          <Tab heading="DGS" tabStyle={styles.tabStyle} activeTabStyle={styles.activeTabStyle} activeTextStyle={styles.activeTextStyle} textStyle={styles.textStyle}>
            <DgsScreens xParams={this.state} navigation={this.props.navigation} />
          </Tab>
        </Tabs>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  //data LOP Home

})

export default connect(mapStateToProps)(LOPscreen);

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
  }
});
