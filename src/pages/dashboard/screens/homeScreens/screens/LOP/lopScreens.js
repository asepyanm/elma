import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { Container, Header, Content, Tab, Tabs } from 'native-base';
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
  render() {
    return (
      <View style={styles.container}>
        <Tabs tabBarUnderlineStyle={{backgroundColor: '#575F6A'}}>
          <Tab heading="EBIS" tabStyle={styles.tabStyle} activeTabStyle={styles.activeTabStyle} activeTextStyle={styles.activeTextStyle} textStyle={styles.textStyle}>
            <EbisScreens navigation={this.props.navigation} />
          </Tab>
          <Tab heading="DES" tabStyle={styles.tabStyle} activeTabStyle={styles.activeTabStyle} activeTextStyle={styles.activeTextStyle} textStyle={styles.textStyle}>
            <DesScreens />
          </Tab>
          <Tab heading="DBS" tabStyle={styles.tabStyle} activeTabStyle={styles.activeTabStyle} activeTextStyle={styles.activeTextStyle} textStyle={styles.textStyle}>
            <DbsScreens />
          </Tab>
          <Tab heading="DGS" tabStyle={styles.tabStyle} activeTabStyle={styles.activeTabStyle} activeTextStyle={styles.activeTextStyle} textStyle={styles.textStyle}>
            <DgsScreens />
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
