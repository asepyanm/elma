import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  View,
  Image
} from 'react-native';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text, Segment } from 'native-base';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import ModalSelector from 'react-native-modal-selector';

//screen
import LOPscreen from './screens/LOP/lopScreens';
import ABCscreen from './screens/ABC/abcScreens';

export default class HomeScreens extends Component{
  constructor(props){
    super(props);

    this.state = {
      selectedTab:'',

      sdate: '199912',
      edate: '299912',      
    }
  }

  componentWillMount(){
    this.setState({
      selectedTab:'lop'
    })
  }

  renderSelectedTab () {
    switch (this.state.selectedTab) {
      case 'lop':
        return (<LOPscreen navigation={this.props.navigation}/>);
      break;
      case 'abc':
        return (<ABCscreen/>);
      break;
      default:
    }
  }
  render() {
    const {selectedTab} = this.state;

/*     var date = new Date().getDate();
    var month = new Date().getMonth() +1;
    var year = new Date().getFullYear();
  
    var dateNow = `${date}-${month}-${year}`

    let index = 0;
    var pyear = new Date().getFullYear() -1;
    var nyear = new Date().getFullYear() +1;
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
 */
    return (
      <View style={styles.container}>
{/* 
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
 */}
        <Header style={{backgroundColor:'#820000'}} hasSegment>
          <Left style={{flex:1}}>
            <Image 
              source={require('../../../../assets/headerLogo/headerLogo.png')}
              style={{width:wp('50%'), height:hp('50%')}}
              resizeMode={'contain'}
            />
          </Left>
          <Body/>
          <Right style={{flex:2}}>
            <Segment style={{backgroundColor:'transparent'}}>
              <Button 
                first 
                active={selectedTab==='lop'} 
                style={selectedTab === 'lop' ? styles.segmentButtonActive : styles.segmentButtonNonActive}
                onPress={() => this.setState({selectedTab: 'lop'})} 
              >
                <Text style={selectedTab === 'lop' ? styles.segmentTextActive : styles.segmentTextNonActive}>LOP</Text>
              </Button>
              <Button 
                last
                active={selectedTab==='abc'} 
                style={selectedTab === 'abc' ? styles.segmentButtonActive : styles.segmentButtonNonActive}                
                onPress={() => this.setState({selectedTab: 'abc'})} 
              >
                <Text style={selectedTab === 'abc' ? styles.segmentTextActive : styles.segmentTextNonActive}>ABC</Text>
              </Button>
            </Segment>
          </Right>
        </Header>

        {this.renderSelectedTab()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  segmentButtonActive:{
    borderColor:'#FFF', 
    backgroundColor:'#FFF'
  },
  segmentTextActive:{
    color:'#000'
  },
  segmentButtonNonActive:{
    borderColor:'#FFF', 
    backgroundColor:'transparent'
  },
  segmentTextNonActive:{
    color:'#FFF'
  }
});
