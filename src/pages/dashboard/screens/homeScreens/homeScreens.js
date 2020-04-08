import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  View,
  Image
} from 'react-native';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text, Segment } from 'native-base';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

//import screen
import LOPscreen from './screens/LOP/lopScreens';
import ABCscreen from './screens/ABC/abcScreens';
import ChannelScreen from './screens/CHANNEL/channelScreens';

export default class HomeScreens extends Component{
  constructor(props){
    super(props);

    this.state = {
      selectedTab:''
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
      case 'channel':
        return (<ChannelScreen navigation={this.props.navigation}/>);
      break;
      case 'bmd':
        return (<ABCscreen navigation={this.props.navigation}/>);
      break;
      default:
    }
  }
  render() {
    const {selectedTab} = this.state;
    return (
      <View style={styles.container}>
        <Header style={{backgroundColor:'#820000'}} hasSegment>
          <Left style={{flex:1}}>
            <Image 
              source={require('../../../../assets/headerLogo/headerLogo.png')}
              style={{width:wp('50%'), height:hp('50%')}}
              resizeMode={'contain'}
            />
          </Left>
          <Body/>
          <Right style={{flex:3}}>
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
              <Button 
                last
                active={selectedTab==='channel'} 
                style={selectedTab === 'channel' ? styles.segmentButtonActive : styles.segmentButtonNonActive}                
                onPress={() => this.setState({selectedTab: 'channel'})} 
              >
                <Text style={selectedTab === 'channel' ? styles.segmentTextActive : styles.segmentTextNonActive}>CHNL</Text>
              </Button>
              <Button 
                last
                active={selectedTab==='bmd'} 
                style={selectedTab === 'bmd' ? styles.segmentButtonActive : styles.segmentButtonNonActive}                
                onPress={() => this.setState({selectedTab: 'bmd'})} 
              >
                <Text style={selectedTab === 'bmd' ? styles.segmentTextActive : styles.segmentTextNonActive}>BMD</Text>
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
