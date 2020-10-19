import React, { Component } from "react";
import { Platform, StyleSheet, AsyncStorage, Alert, Text, View, AppState,AppRegistry } from "react-native";
import { Toast, Root } from 'native-base';
import { Provider,connect } from "react-redux";
import { PersistGate } from "redux-persist/es/integration/react";
//import axios from 'axios';
import PushNotification from 'react-native-push-notification';
import notificationActionHandler from './helpers/notificationActionHandler'
import BackgroundTimer from 'react-native-background-timer';

import url from './config/api_service';
import AppNavigation from "./navigations";
import configureStore from "./store/store";
import Axios from "axios";
import VirtualizedList from "./pages/components/VirtualizedList";
// import firebase from 'react-native-firebase';
import BackgroundTask from 'react-native-background-task'
import queueFactory from 'react-native-queue';
import JRK from './helpers/JRK'
import detailChatRoomScreens from './pages/dashboard/screens/chatScreens/detailChatRoomScreens'
import  { StackNavigator }  from 'react-navigation';
BackgroundTask.define(async () => {

  // Init queue
  queue = await queueFactory();

  // Register worker
  queue.addWorker('background-example', async (id, payload) => {
    console.log(`run id:${id}` );
    console.log(payload);
    JRK.updatedevicestate('background')
    JRK.initBackgroundProsess()
    // await AsyncStorage.setItem('lukeData', 'Luke Skywalker arbitrary data loaded!')
  });

  // Start the queue with a lifespan
  // IMPORTANT: OS background tasks are limited to 30 seconds or less.
  // NOTE: Queue lifespan logic will attempt to stop queue processing 500ms less than passed lifespan for a healthy shutdown buffer.
  // IMPORTANT: Queue processing started with a lifespan will ONLY process jobs that have a defined timeout set.
  // Additionally, lifespan processing will only process next job if job.timeout < (remainingLifespan - 500).
  await queue.start(20000); // Run queue for at most 20 seconds.

  // finish() must be called before OS hits timeout.
  BackgroundTask.finish();

});
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
    // this.getDataButtonGroup();
    JRK.updatedevicestate(state)
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

 class Main extends Component {
  static navigationOptions = {
    header: null,
    };
  constructor() {
    super();
    this.state = {
      queue: null,
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
      notifid:null,
      curJam:'',
      curMenit:'',
      curDetik:'',
      apigroup:true,
      isLogged: false,
      //djoyo 190315 
      group: 'NOT_LOGGED',
      groupname:'',
      groupdesc:'',
      groupmember:'',
      groupall:'',
      //group: 'G1',
      status: '',
        
    };
    this.getDataButtonGroup()
    JRK.telkomToken()
    queueFactory()
    .then(queue => {
      this.setState({queue});
    });
    AsyncStorage.setItem('lukeData', JSON.stringify('kosong!'))
    this.checkStatus()
    this.initJob()
    this.getDataButtonGroup()
    //https://github.com/ocetnik/react-native-background-timer
    
    //BackgroundTimer.runBackgroundTimer(() => { 

      //code that will be called every 1 seconds 
    //  this.popupAlert();
 
    //}, 1000);

    // Start a timer that runs continuous after X milliseconds
    const intervalId = BackgroundTimer.setInterval(() => {
      // console.log('sitimer');
      this.popupAlert();
      
      //console.log('tic');
    }, 1000);
  // queueFactory()
  //     .then(queue => {
  //       this.setState({queue});
  //     });
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
   makeJob(jobName, payload = {}) {
    if(this.state.queue){
      // JRK.updatedevicestate(this.state.appState)
      // console.log('job is created but will not execute until the above OS background task runs in ~15 min');
      this.state.queue.createJob(jobName, payload, {

        timeout: 5000 // IMPORTANT: If queue processing is started with a lifespan ie queue.start(lifespan) it will ONLY process jobs with a defined timeout.

      }, false); // Pass false so queue doesn't get started here (we want the queue to start only in OS background task in this example).
    }else{
      // JRK.updatedevicestate(this.state.appState)
      this.initJob().then(function(){
      // console.log('job is created but will not execute until the above OS background task runs in ~15 min bawah');
      this.state.queue.createJob(jobName, payload, {

      timeout: 5000 // IMPORTANT: If queue processing is started with a lifespan ie queue.start(lifespan) it will ONLY process jobs with a defined timeout.

    }, false); // Pass false so queue doesn't get started here (we want the queue to start only in OS background task in this example).
      })
    }
      
  }
  async initJob() {
    
    const queue = await queueFactory();
    
    // Add the worker.
    queue.addWorker('background-example', async (id, payload) => {
      console.log('si init')
      console.log(id)
      console.log(payload)
      JRK.initBackgroundProsess()
    });

    // Attach initialized queue to state.
    this.setState({
      queue
    });

  }
    async checkStatus() {
    const status = await BackgroundTask.statusAsync()
    
    if (status.available) {
      // Everything's fine
      return
    }
    
    const reason = status.unavailableReason
    if (reason === BackgroundTask.UNAVAILABLE_DENIED) {
      Alert.alert('Denied', 'Please enable background "Background App Refresh" for this app')
    } else if (reason === BackgroundTask.UNAVAILABLE_RESTRICTED) {
      Alert.alert('Restricted', 'Background tasks are restricted on your device')
    }
  }
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
      this.getDataButtonGroup()
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
          await Axios.get(`${url.API}/fcmsavetoken/${token}/${this.state.user_id}/${this.state.group}/ya`)
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
    await Axios.get(`${url.API}/savenotiflog/${this.state.token}/${title}/${body}/notif/berhasil/${jenis}/${payload}`)
}
  _storeData = async () => {
    const {status} = this.state;
    try {
      await AsyncStorage.setItem('notifStatus', JSON.stringify(status));
    } catch (error) {
      // Error saving data
    }
  }

  componentWillMount(){
    //
    this.getDataButtonGroup();
  }
  getDataButtonGroup(){ 
    var ret='';
    if(this.state.apigroup){
      if(this.state.group==='NOT_LOGGED'){
        AsyncStorage.getItem('loginGroup', (error, result) => {
          if (result) {
            if(this.state.group!==result){
              this.setState({
                group: result
              });
            }
          }
        })
      }
      if(this.state.user_id==""){
        // if(user_id==""){
            AsyncStorage.getItem('user_id', (error, result) => {
                  this.setState({
                                 user_id: result
                               });
           });  
        // }
      }
  
      if(this.state.group==='NOT_LOGGED'){
        // console.log('not login')
        AsyncStorage.getItem('loginGroup', (error, result) => {
          if (result) {
            if(this.state.group!==result){
              this.setState({
                group: result
              });
              var urlgroupdata=url.API+'/groupdetailbyid/'+result;
       Axios.get(`${urlgroupdata}`)
        .then((response) => {
          const res =response.data
          if(res.status=="success"){
            this.setState({ groupname:res.data.nama,
            groupdesc:res.data.deskripsi,
            groupmember:res.data.anggota,
            groupall:res,apigroup:false})
          }
          // console.log(res);
          console.log(this.state.groupmember)
          
        }).catch((err) => {
          console.log(err)
        }) 
            }
          }
        })
      }else{
        // console.log('login bro')
        var urlgroupdata=url.API+'/groupdetailbyid/'+this.state.group;
       Axios.get(`${urlgroupdata}`)
        .then((response) => {
          const res =response.data
          if(res.status=="success"){
            this.setState({ groupname:res.data.nama,
            groupdesc:res.data.deskripsi,
            groupmember:res.data.anggota,
            groupall:res,apigroup:false})
          }
          // console.log(res);
          console.log(this.state.groupmember)
          
        }).catch((err) => {
          console.log(err)
        }) 
      }
    }
  
  }
  // async componentDidMount() {
  componentDidMount() {
     BackgroundTask.schedule();
     this.getDataButtonGroup()
    // setTimeout(() => {
    //   this._scroll.scrollTo({y: 100})
    // }, 1)
    AppState.addEventListener('change', this._handleAppStateChange);
  /*   this.checkPermission();
     this.createNotificationListeners(); 
     const channel = new firebase.notifications.Android.Channel('elma_push', 'elma_push', firebase.notifications.Android.Importance.Max)
            .setDescription('elma_push');

        // Create the channel
        firebase.notifications().android.createChannel(channel);

        // firebase.messaging().subscribeToTopic('news1');
        */
  }
  /*
  async checkPermission() {
  const enabled = await firebase.messaging().hasPermission();
  if (enabled) {
      this.getToken();
  } else {
      this.requestPermission();
  }
}//*/
/*
 //3
async getToken() {
  let fcmToken = await AsyncStorage.getItem('fcmToken');
  if (!fcmToken) {
      fcmToken = await firebase.messaging().getToken();
      if (fcmToken) {
          // user has a device token
          console.log(`fcmtoken ${fcmToken}`)
          await AsyncStorage.setItem('fcmToken', fcmToken);
      }
  }
}//*/
/*
  //2
async requestPermission() {
  try {
      await firebase.messaging().requestPermission();
      // User has authorised
      this.getToken();
  } catch (error) {
      // User has rejected permissions
      console.log('permission rejected');
  }
}//*/
/*
async createNotificationListeners() {

  // Triggered when a particular notification has been received in foreground
  
  this.notificationListener = firebase.notifications().onNotification((notification) => {
      notification
                .android.setChannelId('elma_push')
      const { title, body } = notification;
      this.showAlert(title, body);
  });


  //If your app is in background, you can listen for when a notification is clicked / tapped / opened as follows:
  this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen) => {
      notificationOpen.notification.android.setChannelId('elma_push')
      const { title, body } = notificationOpen.notification;

      this.showAlert(title, body);
  });

  
  //If your app is closed, you can check if it was opened by a notification being clicked / tapped / opened as follows:

  const notificationOpen = await firebase.notifications().getInitialNotification();
  if (notificationOpen) {
     notificationOpen.notification.android.setChannelId('elma_push')
      const { title, body } = notificationOpen.notification;
      this.showAlert(title, body);
  }

  //Triggered for data only payload in foreground

  this.messageListener = firebase.messaging().onMessage((message) => {
    //process data message
    console.log(JSON.stringify(message));
  });
}//*/
/*
showAlert(title, body) {
  Alert.alert(
    title, body,
    [
        { text: 'OK', onPress: () => console.log('OK Pressed') },
    ],
    { cancelable: false },
  );
}//*/
  componentWillUnmount() {
    AppState.removeEventListener('change', this._handleAppStateChange);
    // this.notificationListener();
  // this.notificationOpenedListener();
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
        this.getDataButtonGroup()
        // console.log(`isi notif ${JSON.stringify(notification)}`)
        if(notification.click_action=="chat"){
          const param={
            user_id: notification.user_id,
            room_id: notification.room_id,
            room_name: notification.room_name,
            room_deskripsi: notification.room_deskripsi,
            // is_room_admin
          }
          const namaroute='detailChatRoomScreens'
          this.navigator && this.navigator.dispatch({ type: 'Navigate', namaroute, param });
                    this.props.navigation.navigate("detailChatRoomScreens", {
                    user_id: notification.user_id,
                    room_id: notification.room_id,
                    room_name: notification.room_name,
                    room_deskripsi: notification.room_deskripsi,
                    // is_room_admin
                  });
        }else{
         var judul=notification.title;
        //  if(notification.message){
          var datan=notification.message.split('-')
        //  }else{
          // var datan=notification.body.split('-')
        //  }
         var jenis="rekap";
        if(judul=='EPM Mobile'){
          jenis="ticker"
        }
      //  this._saveLogNotif(datan[0],datan[1],notification.title,jenis);
      //  if(notification.message){
          const status = notification.message.split('-')[0]
      //  }else{
        // const status = notification.body.split('-')[0]
      //  }
          this.setState({
            notificationOpen: true,
            notifid:notification.NOTIF_ID,
            //notificationOpen: false,
            status
          })
        }
          // process the notification
          if(Platform.OS==="ios"){
            notification.finish(PushNotificationIOS.FetchResult.NoData);
          }

          // required on iOS only (see fetchCompletionHandler docs: https://facebook.github.io/react-native/docs/pushnotificationios.html)
      },
  
      // ANDROID ONLY: GCM or FCM Sender ID (product_number) (optional - not required for local notifications, but is need to receive remote push notifications)
      senderID: "117112968207",
      // IOS ONLY (optional): default: all - Permissions to register.
      permissions: {
          alert: true,
          badge: true,
          sound: true
      },
  
      // Should the initial notification be popped automatically
      // default: true
      popInitialNotification: true,
      //popInitialNotification: false,

  
      /**
        * (optional) default: true
        * - Specified if permissions (ios) and token (android and ios) will requested or not,
        * - if not, you must call PushNotificationsHandler.requestPermissions() later
        */
      requestPermissions: true,
  });
  }

  _handleAppStateChange = (nextAppState) => {

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
          notif = await Axios.get(`${url.API}/getnotification/userid/${this.state.user_id}/token/${this.state.token}`)
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
      console.warn(err)
    }
  }



  render() {
    this.getDataButtonGroup()
 this.makeJob('background-example', { name: 'c3po' })
    if(this.state.notificationOpen){

      if(!this.state.pushNotifShow){
        this.setState({pushNotifShow:true,apigroup:true})
      }
      // console.log('navigation')
      // console.log(this.props.navigation)
      return (
        <VirtualizedList
          status={this.state.status}
          group={this.state.group}
          groupname={this.state.groupname}
          groupdesc={this.state.groupdesc}
          groupanggota={this.state.groupmember}
          userid={this.state.user_id}
          notifid={this.state.notifid}
          navigation={this.props.navigation}  
          onBack={() => this.setState({notificationOpen:false})}
        />
      )
    }
    return (
      <Provider store={store}>
        <PersistGate loading={<View style={{justifyContent:'center', alignItems:'center', flex:1}}><Text style={{textAlign:'center'}}>Loading...</Text></View>} persistor={persistor}>
          <Root>
            <AppNavigation />
          </Root>
        </PersistGate>
      </Provider>
    );
  }
}
 
const mapStateToProps = (state) => ({
  loginGroup:state.LoginReducer.group_ID,
  isLoggedIn:state.LoginReducer.isLoggedIn,
})
 
//export default connect(mapStateToProps)(App);
const AppNavigator = StackNavigator({
  Main: { screen: Main,navigationOptions:{
    header:null,
  } },
  detailChatRoomScreens: { screen: detailChatRoomScreens },
},
{
initialRouteName:"Main"
}
);

export default AppNavigator;