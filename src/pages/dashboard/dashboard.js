import React, { Component } from 'react';
import {Alert, FlatList, ActivityIndicator, TouchableOpacity, StyleSheet} from 'react-native';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text, Item, Card, CardItem } from 'native-base';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {connect} from 'react-redux';

//global
import { logout } from '../../actions/actionCreator';

//screen
import Home  from './screens/homeScreens/homeScreens';
import Rekap from './screens/rekapScreens/rekapScreens';
import Chat  from './screens/chatScreens/chatScreens';
import TReg  from './screens/tregScreens/tregScreens';

class Dashboard extends Component {
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

  renderSelectedTab () {
    switch (this.state.selectedTab) {
      case 'home':
        return (<Home/>);
      break;
      case 'rekap':
        return (<Rekap/>);
      break;
      case 'chat':
        return (<Chat/>);
      break;
      case 'treg':
        return (<TReg/>);
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
        <Header>
          <Left/>
          <Body>
            <Title>Main Dashboard</Title>
          </Body>
          <Right />
        </Header>

        {this.renderSelectedTab()}

        <Footer style={styles.containerWrapper}>
          <FooterTab style={styles.containerWrapper}>
            <Button 
              vertical
              active={selectedTab==='home'} 
              onPress={() => this.setState({selectedTab: 'home'})} 
            >
              <Icon name="home" type={'MaterialIcons'}/>
              <Text style={styles.textStyleFooter}>Home</Text>
            </Button>

            <Button 
              vertical
              active={selectedTab==='rekap'} 
              onPress={() => this.setState({selectedTab: 'rekap'})} 
            >
              <Icon name="insert-drive-file" type={'MaterialIcons'}/>
              <Text style={styles.textStyleFooter}>Rekap</Text>
            </Button>

            <Button 
              vertical
              active={selectedTab==='chat'} 
              onPress={() => this.setState({selectedTab: 'chat'})} 
            >
              <Icon name="sms" type={'MaterialIcons'} />
              <Text style={styles.textStyleFooter}>Chat</Text>
            </Button>

            <Button 
              vertical
              active={selectedTab==='treg'} 
              onPress={() => this.setState({selectedTab: 'treg'})} 
            >
              <Icon name="show-chart" type={'MaterialIcons'}/>
              <Text style={styles.textStyleFooter}>T-Reg</Text>
            </Button>

            <Button 
              vertical
              onPress={() => this.renderLogout()} 
            >
              <Icon name="power-settings-new" type={'MaterialIcons'}/>
              <Text style={styles.textStyleFooter}>Logout</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}

const mapDispatchToProps = {
  logout
};

const mapStateToProps = (state) => ({
  dataList:state.dashboardReducer.dataListDashboard,
  loaderStatus:state.dashboardReducer.loaderStatus
})

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);

const styles = StyleSheet.create({
  container: { 
    flex: 1,
    backgroundColor:'#ededed'
  },
  containerWrapper: {
    width: wp('100%'),
  },
  containerButtonFooter:{
    marginTop:wp('25%')
  },
  textStyleFooter:{
    fontSize:hp('1.1%')
  }
});