import React, { Component } from 'react';
import {Alert, FlatList, ActivityIndicator, TouchableOpacity, StyleSheet} from 'react-native';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text, Item, Card, CardItem } from 'native-base';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {connect} from 'react-redux';

//global
import { logout } from '../../actions/actionCreator';

//screen
import Home  from '../dashboard/screens/homeScreens/homeScreens';
import Rekap from '../dashboard/screens/rekapScreens/rekapScreens';
// import Chat  from '../dashboard/screens/chatScreens/chatScreens';
import RoomList  from '../dashboard/screens/chatScreens/roomList';
import TReg  from '../dashboard/screens/tregScreens/tregScreens';

class ComponentDashboard extends Component {
  constructor(props){
    super(props);

    this.state = {
      selectedTab:''
    }
  }

  componentWillMount(){
    this.setState({
      selectedTab:'home'
    })
  }

  renderSelectedTab(){
    switch (this.state.selectedTab) {
      case 'home':
        return (<Home navigation={this.props.navigation}/>);
      break;
      case 'rekap':
        return (<Rekap navigation={this.props.navigation}/>);
      break;
      case 'chat':
        return (<RoomList navigation={this.props.navigation}/>);
      break;
      case 'treg':
        return (<TReg navigation={this.props.navigation}/>);
      break;
      default:
    }
  }

  renderLogout(){
    const {logout} = this.props;
    Alert.alert(
      'Pemberitahuan',
      'Apakah anda yakin ingin keluar?',
      [
        {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        {text: 'OK', onPress: logout},
      ],
      { cancelable: false }
    )
  }

  render() {
    const {selectedTab} = this.state;
    return (
      <Container>
        
        {this.renderSelectedTab()}

        <Footer style={styles.containerWrapper}>
          <FooterTab style={styles.containerWrapper}>
            <Button 
              vertical
              onPress={() => this.setState({selectedTab: 'home'})} 
            >
              <Icon 
                name="home" 
                type={'MaterialIcons'} 
                style={selectedTab === 'home' ? styles.iconBarActive : styles.iconBarNonActive}
              />
              <Text style={styles.textStyleFooter}>Home</Text>
            </Button>

            <Button 
              vertical
              onPress={() => this.setState({selectedTab: 'rekap'})} 
            >
              <Icon 
                name="insert-drive-file" 
                type={'MaterialIcons'} 
                style={selectedTab === 'rekap' ? styles.iconBarActive : styles.iconBarNonActive}
              />
              <Text style={styles.textStyleFooter}>Rekap</Text>
            </Button>

            <Button 
              vertical
              onPress={() => this.setState({selectedTab: 'chat'})} 
            >
              <Icon 
                name="sms" 
                type={'MaterialIcons'} 
                style={selectedTab === 'chat' ? styles.iconBarActive : styles.iconBarNonActive}
              />
              <Text style={styles.textStyleFooter}>Chat</Text>
            </Button>

            <Button 
              vertical
              onPress={() => this.setState({selectedTab: 'treg'})} 
            >
              <Icon 
                name="show-chart" 
                type={'MaterialIcons'}
                style={selectedTab === 'treg' ? styles.iconBarActive : styles.iconBarNonActive}
              />
              <Text style={styles.textStyleFooter}>T-Reg</Text>
            </Button>

            <Button 
              vertical
              onPress={() => this.renderLogout()} 
            >
              <Icon name="power-settings-new" type={'MaterialIcons'} style={styles.iconBarNonActive}/>
              <Text style={styles.textStyleFooter}>Logout</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}

const mapDispatchToProps = {
  logout,
};

export default connect(null, mapDispatchToProps)(ComponentDashboard);

const styles = StyleSheet.create({
  container: { 
    flex: 1,
    backgroundColor:'#ededed'
  },
  containerWrapper: {
    width: wp('100%'),
    backgroundColor:'#820000'
  },
  containerButtonFooter:{
    marginTop:wp('25%')
  },
  iconBarActive:{
    color:'#FFF'
  },
  iconBarNonActive:{
    color:'#c0392b'
  },
  textStyleFooter:{
    fontSize:hp('1.1%'),
    color:'#FFF'
  }
});