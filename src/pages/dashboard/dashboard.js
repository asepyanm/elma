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

    //MonitorKB
    //EBIS
    this.props.dispatch({
      type: 'MONITOR_KB_EBIS',
      payload: axios.get(`${url.API}/ebis_getwinsum/div/EBIS/treg/ALL/witel/ALL/startdate/201801/enddate/201811`)
    })

    //EBIS DONE
    this.props.dispatch({
      type: 'MONITOR_KB_EBIS_DONE',
      payload: axios.get(`${url.API}/ebis_getKBstatesum/div/EBIS/treg/ALL/witel/ALL/startdate/201801/enddate/201811/state/DONE`)
    })

    //EBIS OGP
    this.props.dispatch({
      type: 'MONITOR_KB_EBIS_OGP',
      payload: axios.get(`${url.API}/ebis_getKBstatesum/div/EBIS/treg`)
    })

    //DES
    this.props.dispatch({
      type: 'MONITOR_KB_DES',
      payload: axios.get(`${url.API}/ebis_getwinsum/div/DES/treg/ALL/witel/ALL/startdate/201801/enddate/201811`)
    })

    //DES DONE
    this.props.dispatch({
      type: 'MONITOR_KB_DES_DONE',
      payload: axios.get(`${url.API}/ebis_getKBstatesum/div/DES/treg/ALL/witel/ALL/startdate/201801/enddate/201811/state/DONE`)
    })

    //DES OGP
    this.props.dispatch({
      type: 'MONITOR_KB_DES_OGP',
      payload: axios.get(`${url.API}/ebis_getKBstatesum/div/DES/treg`)
    })

     //DBS
     this.props.dispatch({
      type: 'MONITOR_KB_DBS',
      payload: axios.get(`${url.API}/ebis_getwinsum/div/DBS/treg/ALL/witel/ALL/startdate/201801/enddate/201811`)
    })

    //DBS DONE
    this.props.dispatch({
      type: 'MONITOR_KB_DBS_DONE',
      payload: axios.get(`${url.API}/ebis_getKBstatesum/div/DBS/treg/ALL/witel/ALL/startdate/201801/enddate/201811/state/DONE`)
    })

    //DES OGP
    this.props.dispatch({
      type: 'MONITOR_KB_DBS_OGP',
      payload: axios.get(`${url.API}/ebis_getKBstatesum/div/DBS/treg`)
    })

    //DGS
    this.props.dispatch({
      type: 'MONITOR_KB_DGS',
      payload: axios.get(`${url.API}/ebis_getwinsum/div/DGS/treg/ALL/witel/ALL/startdate/201801/enddate/201811`)
    })

    //DGS DONE
    this.props.dispatch({
      type: 'MONITOR_KB_DGS_DONE',
      payload: axios.get(`${url.API}/ebis_getKBstatesum/div/DGS/treg/ALL/witel/ALL/startdate/201801/enddate/201811/state/DONE`)
    })

    //DGS OGP
    this.props.dispatch({
      type: 'MONITOR_KB_DGS_OGP',
      payload: axios.get(`${url.API}/ebis_getKBstatesum/div/DGS/treg`)
    })
    
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

