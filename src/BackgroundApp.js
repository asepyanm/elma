import React, { Component } from "react";
import { Platform, StyleSheet, AsyncStorage, Alert, Text, View, AppState,AppRegistry } from "react-native";
import { Toast, Root } from 'native-base';
import { Provider,connect } from "react-redux";
import { PersistGate } from "redux-persist/es/integration/react";
//import axios from 'axios';
import PushNotification from 'react-native-push-notification';
import notificationActionHandler from './helpers/notificationActionHandler'
import BackgroundTimer from 'react-native-background-timer';
import RNFetchBlob from 'rn-fetch-blob'

import url from './config/api_service';
import AppNavigation from "./navigations";
import configureStore from "./store/store";
import Axios from "axios";
import VirtualizedList from "./pages/components/VirtualizedList";
// import firebase from 'react-native-firebase';
import BackgroundTask from 'react-native-background-task'
import queueFactory from 'react-native-queue';

const { store, persistor } = configureStore();
const appStateListener = (state) => {
  if (state === 'background') {
 
      // Do something here on app background.
      console.log("App is in Background Mode.")
    }
 
    if (state === 'active') {
 
      // Do something here on app active foreground mode.
      console.log("App is in Active Foreground Mode.")
    }
 
    if (state === 'inactive') {
 
      // Do something here on app inactive mode.
      console.log("App is in inactive Mode.")
    }
  // if (state === 'active' || state === 'background' || state === 'inactive') {
    PushNotification.popInitialNotification((notification) => {
      if (notification) {
        this.popupAlert();
        // onNotification(notification);
      }
    });
  // }
};

AppState.addEventListener('change', appStateListener);

export default class BackgroundApp extends Component {
  static navigationOptions = {
    header: null,
    };
  constructor() {
    super();
    this.state = {
      isReady: false,
      platformSystem:'',
      versionApps:'',
      appState: AppState.currentState,
      notificationOpen: false,
      pushNotifShow: true,
      token:'',
      user_id:'',
      statusNotif:'',
      curTime:'',
      curHari:'',
      curJam:'',
      curMenit:'',
      curDetik:'',

      isLogged: false,
      //djoyo 190315 
      group: 'NOT_LOGGED',
      //group: 'G1',
      status: '',
        
    };


    //https://github.com/ocetnik/react-native-background-timer
    
    //BackgroundTimer.runBackgroundTimer(() => { 

      //code that will be called every 1 seconds 
    //  this.popupAlert();
 
    //}, 1000);

    // Start a timer that runs continuous after X milliseconds
    const intervalId = BackgroundTimer.setInterval(() => {

      this.popupAlert();
      
      //console.log('tic');
    }, 1000);

    // Cancel the timer when you are done with it
    //BackgroundTimer.clearInterval(intervalId);  

/*     
    const EventEmitter = Platform.select({
      ios: () => NativeAppEventEmitter,
      android: () => DeviceEventEmitter,
    })();   
    
    // start a global timer
    BackgroundTimer.start(1000); // delay in milliseconds only for Android
    // listen for event
    EventEmitter.addListener('backgroundTimer', () => {
      // this will be executed once after 5 seconds
      console.log('toe');
    });    

 */

// AppRegistry.registerHeadlessTask(
//     'RNPushNotificationActionHandlerTask', // you must use the same name
//     () => { return notificationActionHandler }

// );
    this.configureNotif();
    //this.onCheck();
    this._storeDataToken();
    this._handleAppStateChange = this._handleAppStateChange.bind(this)
    this.interval;
  };
      _storeDataToken = async () => {
    await AsyncStorage.getItem('fcmtoken', (error, result) => {
      if (result) {
       this._saveToken(result)
      }
    });   
  };
  async popupAlert(){
    var tanggal = new Date()
    var hari = tanggal.getDay()
    var jam = tanggal.getHours()
    var menit = tanggal.getMinutes()
    var detik = tanggal.getSeconds()

    var sStatusNotif = 'DIHARISENINJAM9PAGI'

    if(this.state.group==='NOT_LOGGED'){
      await AsyncStorage.getItem('loginGroup', (error, result) => {
        if (result) {
          if(this.state.group!==result){
            this.setState({
              group: result
            });
          }
        }
      })
    }else{
    await AsyncStorage.getItem('fcmtoken', (error, result) => {
      if (result) {
        this.setState({
          token: result,
        })
      }
    });   
    }
    if(this.state.group==='NOT_LOGGED'){
      hari = 0
    }
    // console.warn(`isi state ${this.state}`)
    // console.warn(`ELMA localNotification: ${this.state.group} ${hari}${jam}${menit}${detik}`)
    if(hari>0){
       // console.warn(`jrk hari:${hari} ${url.API} - ${jam}`)
       // console.warn(`${url.API}/ebis_getnotification/group/${this.state.group}`)
      //if((jam===8)||(jam===9)||(jam===12)||(jam===16)){
      if(jam >7){

        if(menit===75){
          if(detik < 3){
            if(this.state.group!='NOT_LOGGED'){
              await AsyncStorage.getItem('loginGroup', (error, result) => {
                if (result) {
                  if(this.state.group!==result){
                    this.setState({
                      group: result
                    });
                  }
                }
              })
            }
          }
        }

        if(menit===59){
          if(detik < 30){
            sStatusNotif = `${hari}${jam}${menit}`
            if(sStatusNotif!=this.state.statusNotif){
              if(!this.state.notificationOpen){
                if(this.state.pushNotifShow) {
                  this.setState({
                    statusNotif:sStatusNotif
                  })
                  if(jam===8 && menit===59){
                    if(hari===1){
                      this.onGetNotificationJob('rekap')
                    }
                  } else {
                    this.onGetNotificationJob('check')
                  }
                } 
              }
            }
          } else {
            if (this.state.statusNotif!=''){
              this.setState({statusNotif:''})
            }
          }
        }
        else{
          // console.warn(`jam :${jam} menit : ${menit}`)
        }
      }
      else{
        // console.warn(`jam :${jam}`)
      }
    }
  }
_saveToken=async(token)=>{
         if(this.state.group!='NOT_LOGGED'){
              await AsyncStorage.getItem('loginGroup', (error, result) => {
                if (result) {
                  if(this.state.group!==result){
                    this.setState({
                      group: result
                    });
                  }
                }
              })
            }
            if(this.state.user_id==''){
             await AsyncStorage.getItem('user_id', (error, result) => {
                   this.setState({
                                  user_id: result
                                });
            });   
          }
          // await Axios.get(`${url.API}/fcmsavetoken/${token}/${this.state.user_id}/${this.state.group}/ya`)
          await RNFetchBlob.config({
            trusty:true
          }). fetch('GET', `${url.API}/fcmsavetoken/${token}/${this.state.user_id}/${this.state.group}/ya`)
}
_saveLogNotif= async (statusNotif,totalvalue,title,jenis) =>{
  if(this.state.token==''){
      await AsyncStorage.getItem('fcmtoken', (error, result) => {
      if (result) {
        this.setState({
          token: result,
        })
      }
    });   
    }    
    let body=statusNotif+"-"+totalvalue;
    let payload=statusNotif+"_kres_"+totalvalue+"_titikkoma_";
    // await Axios.get(`${url.API}/savenotiflog/${this.state.token}/${title}/${body}/notif/berhasil/${jenis}/${payload}`)

    await RNFetchBlob.config({
      trusty:true
    }). fetch('GET', `${url.API}/savenotiflog/${this.state.token}/${title}/${body}/notif/berhasil/${jenis}/${payload}`)
}
  _storeData = async () => {
    const {status} = this.state;
    try {
      await AsyncStorage.setItem('notifStatus', JSON.stringify(status) );
    } catch (error) {
      // Error saving data
    }
  }


  configureNotif(){

    PushNotification.configure({

      // (optional) Called when Token is generated (iOS and Android)
      onRegister: function(token) {
         // console.warn(`ELMA onCheck: ${token}S`)
         AsyncStorage.setItem('fcmtoken', JSON.stringify(token.token));
          // this._saveToken(token);
          console.log( 'TOKEN:', token );
      },
  
      // (required) Called when a remote or local notification is opened or received
      onNotification: (notification) => {
         var judul=notification.title;
         var datan=notification.message.split('-')
         var jenis="rekap";
        if(judul=='EPM Mobile'){
          jenis="ticker"
        }
       this._saveLogNotif(datan[0],datan[1],notification.title,jenis);
          const status = notification.message.split('-')[0]
          this.setState({
            notificationOpen: true,
            //notificationOpen: false,
            status
          })
      // }
          // process the notification
          if(Platform.OS==="ios"){
            notification.finish(PushNotificationIOS.FetchResult.NoData);
          }
      },
      senderID: "117112968207",
      permissions: {
          alert: true,
          badge: true,
          sound: true
      },
      popInitialNotification: true,
      requestPermissions: true,
  });
  }

  async onGetNotificationJob(jenis){
 
    var aktif = false
 
    try {

      let notif = []
      if(this.state.group==='NOT_LOGGED'){
          notif = []
      } else {
          await AsyncStorage.getItem('user_id', (error, result) => {this.setState({user_id: result});});  
          await AsyncStorage.getItem('fcmtoken', (error, result) => {
          if (result) {
              this.setState({token: result})
            }
          });   
          // notif = await Axios.get(`${url.API}/getnotification/userid/${this.state.user_id}/token/${this.state.token}`)

          notif = await RNFetchBlob.config({
            trusty:true
          }). fetch('GET', `${url.API}/getnotification/userid/${this.state.user_id}/token/${this.state.token}`)
      } 
      await notif.data.forEach((element, index) => {
          if(jenis=="rekap"){
              aktif = (element.NOTIF_STATUS.trim()==='ALL')
              var datanotif={
              id: element.NOTIF_ID,
              ticker: "ELMA Rekap", 
              largeIcon: "ic_launcher", 
              smallIcon: "ic_notification",
              color: "red", 
              vibrate: false, 
              ongoing: true, 
              priority: "high", 
              visibility: "public",
              importance: "high", 
              title: "Rekap (Senin 09AM)", 
              message: `${element.NOTIF_STATUS}-${element.TOTAL}`, 
              playSound: true, 
              number: 75
            }  
          }else{
            aktif = (element.NOTIF_STATUS.trim()!='ALL')
            var datanotif={
              id: element.NOTIF_ID,
              ticker: "ELMA Ticker",
              largeIcon: "ic_launcher", 
              smallIcon: "ic_notification", 
              subText: "A New Update", 
              color: "red", 
              vibrate: false, 
              ongoing: true, 
              priority: "high", 
              visibility: "public",
              importance: "high", 
              title: "EPM Mobile", 
              message: `${element.NOTIF_STATUS}-${element.TOTAL}`, 
              playSound: true,
              number: 75
            }
          }
          if(aktif){
            PushNotification.localNotification(datanotif)
            this._storeData();
            if(jenis=="rekap"){
                if(this.state.status!='ALL'){
                this.setState({status:'ALL'});
                }
            }else{
                if(this.state.status!='WIN'){
                    this.setState({status:'WIN'});
                }
            }
        }
      });
    } catch (err) {
      console.log(err)
    }
  }
}