import React, { Component } from 'react';
import {View, ActivityIndicator} from 'react-native';
import { Alert, Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text, Item, Card, CardItem } from 'native-base';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {connect} from 'react-redux';
import axios from 'axios';

//global
import url from '../../config/api_service';

//component
import ComponentDashboard from '../components/dashboardComponent';

class Dashboard extends Component {
  constructor(props){
    super(props);
    this.state = {
     
      //date awal
      startdate:'201801',
      //date akhir
      enddate:'201912'
    }
  }

  componentWillMount(){

    var month = new Date().getMonth()+1;
    var year = new Date().getFullYear();

    var date1 = `${year}01`
    var date2 = `${year}${("0"+month).slice(-2)}`

  
    //get data LOP -----------------------
    //EBIS HOME LOP
    this.props.dispatch({
      type:'EBIS_HOME',
      //update 20190212 
    //payload:axios.get(`${url.API}/ebis_getlopmain_ytd/div/EBIS`)
      payload:axios.get(`${url.API}/ebis_getlopmain_ytd/div/EBIS/date1/${date1}/date2/${date2}/treg/ALL/witel/ALL`)
    });
    this.props.dispatch({
      type:'EBIS_HOME_CURRENT',
      payload:axios.get(`${url.API}/ebis_getlopmain_current/div/EBIS`)
    });
    //DES HOME LOP
    this.props.dispatch({
      type:'DES_HOME',
      //payload:axios.get(`${url.API}/ebis_getlopmain_ytd/div/DES`)
      payload:axios.get(`${url.API}/ebis_getlopmain_ytd/div/DES/date1/${date1}/date2/${date2}/treg/ALL/witel/ALL`)
    });
    this.props.dispatch({
      type:'DES_HOME_CURRENT',
      payload:axios.get(`${url.API}/ebis_getlopmain_current/div/DES`)
    });
    //DGS HOME LOP
    this.props.dispatch({
      type:'DGS_HOME',
      //payload:axios.get(`${url.API}/ebis_getlopmain_ytd/div/DGS`)
      payload:axios.get(`${url.API}/ebis_getlopmain_ytd/div/DGS/date1/${date1}/date2/${date2}/treg/ALL/witel/ALL`)
    });
    this.props.dispatch({
      type:'DGS_HOME_CURRENT',
      payload:axios.get(`${url.API}/ebis_getlopmain_current/div/DGS`)
    });
    //DBS HOME LOP
    this.props.dispatch({
      type:'DBS_HOME',
      //payload:axios.get(`${url.API}/ebis_getlopmain_ytd/div/DBS`)
      payload:axios.get(`${url.API}/ebis_getlopmain_ytd/div/DBS/date1/${date1}/date2/${date2}/treg/ALL/witel/ALL`)
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

    //get data Channel -----------------------
    //EBIS CHANNEL 
    this.props.dispatch({
      type:'EBIS_HOME_CHANNEL',
      payload:axios.get(`${url.API2}/ebis_getchannelmain/div/EBIS/startdate/${date1}/enddate/${date2}/treg/ALL/witel/ALL/`)
    });
    this.props.dispatch({
      type:'EBIS_HOME_CURRENT_CHANNEL',
      payload:axios.get(`${url.API2}/ebis_getchannelcurr/div/EBIS/treg/ALL/witel/ALL/`)
    });
    this.props.dispatch({
      type:'EBIS_HOME_SUBMISSION_CHANNEL',
      payload:axios.get(`${url.API2}/ebis_getchannelsub/startdate/${date1}/enddate/${date2}/div/EBIS/treg/ALL/witel/ALL/`)
    });
    this.props.dispatch({
      type:'EBIS_HOME_DOWNLOAD_CHANNEL',
      payload:axios.get(`${url.API2}/ebis_getchannelrawdata/startdate/${date1}/enddate/${date2}/div/EBIS/treg/ALL/witel/ALL`)
    });

    //DES CHANNEL 
    this.props.dispatch({
      type:'DES_HOME_CHANNEL',
      payload:axios.get(`${url.API2}/ebis_getchannelmain/div/DES/startdate/${date1}/enddate/${date2}/treg/ALL/witel/ALL/`)
    });
    this.props.dispatch({
      type:'DES_HOME_CURRENT_CHANNEL',
      payload:axios.get(`${url.API2}/ebis_getchannelcurr/div/DES/treg/ALL/witel/ALL/`)
    });
    this.props.dispatch({
      type:'DES_HOME_SUBMISSION_CHANNEL',
      payload:axios.get(`${url.API2}/ebis_getchannelsub/startdate/${date1}/enddate/${date2}/div/DES/treg/ALL/witel/ALL/`)
    });
    this.props.dispatch({
      type:'DES_HOME_DOWNLOAD_CHANNEL',
      payload:axios.get(`${url.API2}/ebis_getchannelrawdata/startdate/${date1}/enddate/${date2}/div/DES/treg/ALL/witel/ALL`)
    });

    //DBS CHANNEL 
    this.props.dispatch({
      type:'DBS_HOME_CHANNEL',
      payload:axios.get(`${url.API2}/ebis_getchannelmain/div/DBS/startdate/${date1}/enddate/${date2}/treg/ALL/witel/ALL/`)
    });
    this.props.dispatch({
      type:'DBS_HOME_CURRENT_CHANNEL',
      payload:axios.get(`${url.API2}/ebis_getchannelcurr/div/DBS/treg/ALL/witel/ALL/`)
    });
    this.props.dispatch({
      type:'DBS_HOME_SUBMISSION_CHANNEL',
      payload:axios.get(`${url.API2}/ebis_getchannelsub/startdate/${date1}/enddate/${date2}/div/DBS/treg/ALL/witel/ALL/`)
    });
    this.props.dispatch({
      type:'DBS_HOME_DOWNLOAD_CHANNEL',
      payload:axios.get(`${url.API2}/ebis_getchannelrawdata/startdate/${date1}/enddate/${date2}/div/DBS/treg/ALL/witel/ALL`)
    });

    //DGS CHANNEL 
    this.props.dispatch({
      type:'DGS_HOME_CHANNEL',
      payload:axios.get(`${url.API2}/ebis_getchannelmain/div/DGS/startdate/${date1}/enddate/${date2}/treg/ALL/witel/ALL/`)
    });
    this.props.dispatch({
      type:'DGS_HOME_CURRENT_CHANNEL',
      payload:axios.get(`${url.API2}/ebis_getchannelcurr/div/DGS/treg/ALL/witel/ALL/`)
    });
    this.props.dispatch({
      type:'DGS_HOME_SUBMISSION_CHANNEL',
      payload:axios.get(`${url.API2}/ebis_getchannelsub/startdate/${date1}/enddate/${date2}/div/DGS/treg/ALL/witel/ALL/`)
    });
    this.props.dispatch({
      type:'DGS_HOME_DOWNLOAD_CHANNEL',
      payload:axios.get(`${url.API2}/ebis_getchannelrawdata/startdate/${date1}/enddate/${date2}/div/DGS/treg/ALL/witel/ALL`)
    });

    //get data Big Mega Deal -----------------------
    //EBIS BIG MEGA DEAL 
    this.props.dispatch({
      type:'EBIS_HOME_BMD',
      payload:axios.get(`${url.API2}/ebis_getdealmain/div/EBIS/startdate/${date1}/enddate/${date2}/treg/ALL/witel/ALL/`)
    });
    this.props.dispatch({
      type:'EBIS_HOME_CURRENT_BMD',
      payload:axios.get(`${url.API2}/ebis_getdealcurr/div/EBIS/treg/ALL/witel/ALL/`)
    });
    this.props.dispatch({
      type:'EBIS_HOME_SUBMISSION_BMD',
      payload:axios.get(`${url.API2}/ebis_getdealsub/startdate/${date1}/enddate/${date2}/div/EBIS/treg/ALL/witel/ALL/`)
    });
    this.props.dispatch({
      type:'EBIS_HOME_DOWNLOAD_BMD',
      payload:axios.get(`${url.API2}/ebis_getdealrawdata/startdate/${date1}/enddate/${date2}/div/EBIS/treg/ALL/witel/ALL`)
    });

    //DES BIG MEGA DEAL 
    this.props.dispatch({
      type:'DES_HOME_BMD',
      payload:axios.get(`${url.API2}/ebis_getdealmain/div/DES/startdate/${date1}/enddate/${date2}/treg/ALL/witel/ALL/`)
    });
    this.props.dispatch({
      type:'DES_HOME_CURRENT_BMD',
      payload:axios.get(`${url.API2}/ebis_getdealcurr/div/DES/treg/ALL/witel/ALL/`)
    });
    this.props.dispatch({
      type:'DES_HOME_SUBMISSION_BMD',
      payload:axios.get(`${url.API2}/ebis_getdealsub/startdate/${date1}/enddate/${date2}/div/DES/treg/ALL/witel/ALL/`)
    });
    this.props.dispatch({
      type:'DES_HOME_DOWNLOAD_BMD',
      payload:axios.get(`${url.API2}/ebis_getdealrawdata/startdate/${date1}/enddate/${date2}/div/DES/treg/ALL/witel/ALL`)
    });

    //DBS BIG MEGA DEAL 
    this.props.dispatch({
      type:'DBS_HOME_BMD',
      payload:axios.get(`${url.API2}/ebis_getdealmain/div/DBS/startdate/${date1}/enddate/${date2}/treg/ALL/witel/ALL/`)
    });
    this.props.dispatch({
      type:'DBS_HOME_CURRENT_BMD',
      payload:axios.get(`${url.API2}/ebis_getdealcurr/div/DBS/treg/ALL/witel/ALL/`)
    });
    this.props.dispatch({
      type:'DBS_HOME_SUBMISSION_BMD',
      payload:axios.get(`${url.API2}/ebis_getdealsub/startdate/${date1}/enddate/${date2}/div/DBS/treg/ALL/witel/ALL/`)
    });
    this.props.dispatch({
      type:'DBS_HOME_DOWNLOAD_CHANNEL',
      payload:axios.get(`${url.API2}/ebis_getdealrawdata/startdate/${date1}/enddate/${date2}/div/DBS/treg/ALL/witel/ALL`)
    });

    //DGS BIG MEGA DEAL 
    this.props.dispatch({
      type:'DGS_HOME_BMD',
      payload:axios.get(`${url.API2}/ebis_getdealmain/div/DGS/startdate/${date1}/enddate/${date2}/treg/ALL/witel/ALL/`)
    });
    this.props.dispatch({
      type:'DGS_HOME_CURRENT_BMD',
      payload:axios.get(`${url.API2}/ebis_getdealcurr/div/DGS/treg/ALL/witel/ALL/`)
    });
    this.props.dispatch({
      type:'DGS_HOME_SUBMISSION_BMD',
      payload:axios.get(`${url.API2}/ebis_getdealsub/startdate/${date1}/enddate/${date2}/div/DGS/treg/ALL/witel/ALL/`)
    });
    this.props.dispatch({
      type:'DGS_HOME_DOWNLOAD_BMD',
      payload:axios.get(`${url.API2}/ebis_getdealrawdata/startdate/${date1}/enddate/${date2}/div/DGS/treg/ALL/witel/ALL`)
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
          <ComponentDashboard 
            //navigasi LOP screens
            navigation={this.props.navigation} 
          />
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

