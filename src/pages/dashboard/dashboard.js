import React, { Component } from 'react';
import {View, ActivityIndicator} from 'react-native';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text, Item, Card, CardItem } from 'native-base';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {connect} from 'react-redux';
import axios from 'axios';

//global
import url from '../../config/api_service';

//component
import ComponentDashboard from '../components/dashboardComponent';

class Dashboard extends Component {
  
  componentWillMount(){
    //EBIS HOME
    this.props.dispatch({
      type:'EBIS_HOME',
      payload:axios.get(`${url.API}/ebis_getlopmain_ytd/div/EBIS`)
    });

    this.props.dispatch({
      type:'EBIS_HOME_CURRENT',
      payload:axios.get(`${url.API}/ebis_getlopmain_current/div/EBIS`)
    });

    //DES HOME
    this.props.dispatch({
      type:'DES_HOME',
      payload:axios.get(`${url.API}/ebis_getlopmain_ytd/div/DES`)
    });

    this.props.dispatch({
      type:'DES_HOME_CURRENT',
      payload:axios.get(`${url.API}/ebis_getlopmain_current/div/DES`)
    });

    //DGS HOME
    this.props.dispatch({
      type:'DGS_HOME',
      payload:axios.get(`${url.API}/ebis_getlopmain_ytd/div/DGS`)
    });

    this.props.dispatch({
      type:'DGS_HOME_CURRENT',
      payload:axios.get(`${url.API}/ebis_getlopmain_current/div/DGS`)
    });

    //DBS HOME
    this.props.dispatch({
      type:'DBS_HOME',
      payload:axios.get(`${url.API}/ebis_getlopmain_ytd/div/DBS`)
    });

    this.props.dispatch({
      type:'DBS_HOME_CURRENT',
      payload:axios.get(`${url.API}/ebis_getlopmain_current/div/DBS`)
    });
  }

  render() {
    const {loaderStatus} = this.props;
    return (
      <View style={{flex:1}}>
        {
          loaderStatus
            ?
          <View style={{justifyContent:'center', alignItems:'center', marginTop:hp('45%')}}>
            <ActivityIndicator size={'large'}/>
          </View>
            :
          // setTimeout(() => { 
            <ComponentDashboard/>
          // }, 1000)
        }
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  loaderStatus:state.EbisReducer.loaderStatus,
  dataEbis:state.EbisReducer.dataEbis
})

export default connect(mapStateToProps)(Dashboard);

