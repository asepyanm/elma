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
    //get data LOP ---------------
    //EBIS HOME LOP
    this.props.dispatch({
      type:'EBIS_HOME',
      payload:axios.get(`${url.API}/ebis_getlopmain_ytd/div/EBIS`)
    });
    this.props.dispatch({
      type:'EBIS_HOME_CURRENT',
      payload:axios.get(`${url.API}/ebis_getlopmain_current/div/EBIS`)
    });
    //DES HOME LOP
    this.props.dispatch({
      type:'DES_HOME',
      payload:axios.get(`${url.API}/ebis_getlopmain_ytd/div/DES`)
    });
    this.props.dispatch({
      type:'DES_HOME_CURRENT',
      payload:axios.get(`${url.API}/ebis_getlopmain_current/div/DES`)
    });
    //DGS HOME LOP
    this.props.dispatch({
      type:'DGS_HOME',
      payload:axios.get(`${url.API}/ebis_getlopmain_ytd/div/DGS`)
    });
    this.props.dispatch({
      type:'DGS_HOME_CURRENT',
      payload:axios.get(`${url.API}/ebis_getlopmain_current/div/DGS`)
    });
    //DBS HOME LOP
    this.props.dispatch({
      type:'DBS_HOME',
      payload:axios.get(`${url.API}/ebis_getlopmain_ytd/div/DBS`)
    });
    this.props.dispatch({
      type:'DBS_HOME_CURRENT',
      payload:axios.get(`${url.API}/ebis_getlopmain_current/div/DBS`)
    });


    //get data ABC -----------------------
    //EBIS HOME ABC
    this.props.dispatch({
      type:'EBIS_ABC',
      payload:axios.get(`${url.API}/ebis_getabcmain_ytd/div/EBIS`)
    });
    this.props.dispatch({
      type:'EBIS_CURRENT_ABC',
      payload:axios.get(`${url.API}/ebis_getabcmain_current/div/EBIS`)
    });

    //DES HOME ABC
    this.props.dispatch({
      type:'DES_ABC',
      payload:axios.get(`${url.API}/ebis_getabcmain_ytd/div/DES`)
    });
    this.props.dispatch({
      type:'DES_CURRENT_ABC',
      payload:axios.get(`${url.API}/ebis_getabcmain_current/div/DES`)
    });

    //DBS HOME ABC
    this.props.dispatch({
      type:'DBS_ABC',
      payload:axios.get(`${url.API}/ebis_getabcmain_ytd/div/DBS`)
    });
    this.props.dispatch({
      type:'DBS_CURRENT_ABC',
      payload:axios.get(`${url.API}/ebis_getabcmain_current/div/DBS`)
    });

    //DGS HOME ABC
    this.props.dispatch({
      type:'DGS_ABC',
      payload:axios.get(`${url.API}/ebis_getabcmain_ytd/div/DGS`)
    });
    this.props.dispatch({
      type:'DGS_CURRENT_ABC',
      payload:axios.get(`${url.API}/ebis_getabcmain_current/div/DGS`)
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

