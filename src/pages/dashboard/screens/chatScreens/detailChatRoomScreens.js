import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
  TextInput,
  FlatList,
  AsyncStorage,
  Platform,
  Button
} from 'react-native';
import PropTypes from 'prop-types'
import emojiUtils from 'emoji-utils'
import url from '../../../../config/api_service';
import Axios from "axios";
import RNFetchBlob from 'rn-fetch-blob'
import { GiftedChat } from 'react-native-gifted-chat'
import BackgroundTimer from 'react-native-background-timer';
import SlackMessage from './SlackMessage'
export default class detailChatRoomScreens extends Component {
 static navigationOptions = ({ navigation }) => ({
    title: `${navigation.state.params.room_name} chats`,
     headerTitleStyle : {textAlign: 'center',alignSelf:'center'},
        headerStyle:{
            backgroundColor:'white',
        },
    });


  constructor(props) {
    super(props);
    // console.log(`data param ${JSON.stringify(this.props.navigation.state.params)}`)
    this.state = {
      messages: [],
      firstload:true
    }
    //   const intervalId = BackgroundTimer.setInterval(() => {

      this.getmessageRooms();
      
    //   //console.log('tic');
    // }, 3000);
    const intervalId = BackgroundTimer.setInterval(() => {
      // console.log('sitimer');
      this.getmessageRooms();
      
      //console.log('tic');
    }, 3000);
  }

  componentWillMount() {
    // this.getmessageRooms()
    // this.debugjrk();
  }
  componentDidMount() {
//  this.getmessageRooms()
  }
  // async debugjrk(){
  //   await AsyncStorage.getItem('loginGroup', (error, result) => {
  //       if (result) {
  //         if(this.state.group!==result){
  //           this.setState({
  //             group: result
  //           });
  //         }
  //       }
  //     })
  // }
getmessageRooms=async()=>{
    // console.log('run get message')
    if(this.state.firstload){
      // Axios.get(`${url.API}/chatroommessagebyroomid/${this.props.navigation.state.params.room_id}`)
      RNFetchBlob.config({
        trusty:true
      }). fetch('GET', `${url.API}/chatroommessagebyroomid/${this.props.navigation.state.params.room_id}`)
      .then(response => {
         // console.log(` isi response ${JSON.stringify(response.data.data)}`);
         AsyncStorage.setItem('pesangroupchat', JSON.stringify(response.data.data));
         this.setState({
            messages:response.data.data
          });
      })
      .catch(error => {
        console.log(error);
      });
    }else{
    await AsyncStorage.getItem('pesangroupchat', (error, result) => {
    // console.log('pesangroupchat',result)
      if (result) {
        let tmp=JSON.parse(result)
        // console.log('isichat',tmp[this.props.navigation.state.params.room_id])
        this.setState({
          messages: tmp[this.props.navigation.state.params.room_id]
        });
      }
        else{
           // console.log('groupchat bawah',result)
            // Axios.get(`${url.API}/chatroommessagebyroomid/${this.props.navigation.state.params.room_id}`)
            RNFetchBlob.config({
              trusty:true
            }). fetch('GET', `${url.API}/chatroommessagebyroomid/${this.props.navigation.state.params.room_id}`)
                .then(response => {
                   // console.log(` isi response ${JSON.stringify(response.data.data)}`);
                   this.setState({
                      messages:response.data.data
                    });
                })
                .catch(error => {
                  console.log(error);
                });
          }
    });   
  }
  // console.log(`isi url : ${url.API}/chatroommessagebyroomid/${this.props.navigation.state.params.room_id}`)
    
     
    // } catch (get_rooms_err) {
    //   console.log("error getting rooms: ", get_rooms_err);
    // }
}
saveKeserver (pesan) {
  // return axios.get('/names/?ids=' + id)
  //     .then(response => {
  //       this.response = response.data
  //       return this.response[0].name
  //     })
  // return Axios.post(`${url.API}/savechatroom/${this.props.navigation.state.params.room_id}`, {
    return             RNFetchBlob.config({
      trusty:true
    }). fetch('POST', `${url.API}/savechatroom/${this.props.navigation.state.params.room_id}`,{
      room_id: this.props.navigation.state.params.room_id,
      text: pesan[0].text,
      sender: this.props.navigation.state.params.user_id
  })
  .then(function (response) {
   return true
  })
  .catch(function (error) {
    return false;
  });
  }
  renderMessage(props) {
    const {
      currentMessage: { text: currText },
    } = props

    let messageTextStyle

    // Make "pure emoji" messages much bigger than plain text.
    if (currText && emojiUtils.isPureEmojiString(currText)) {
      messageTextStyle = {
        fontSize: 28,
        // Emoji get clipped if lineHeight isn't increased; make it consistent across platforms.
        lineHeight: Platform.OS === 'android' ? 34 : 30,
      }
    }

    return <SlackMessage {...props} messageTextStyle={messageTextStyle} />
  }
  onSend(messages = []) {
    // console.log(`ini pesan ${JSON.stringify(messages)}`);
    let save=this.saveKeserver(messages)
  .then(async data => {
          let urlgroupchatmessage=url.API+'/chatroommessagebyuserid/'+this.props.navigation.state.params.user_id;
          
            // Axios.get(`${urlgroupchatmessage}`)
            RNFetchBlob.config({
              trusty:true
            }). fetch('GET', `${urlgroupchatmessage}`)
            .then(async response => {
              AsyncStorage.setItem('pesangroupchat',JSON.stringify(response.data.data));
            }).catch(error => {
              console.log(error);
            });
            await AsyncStorage.getItem('pesangroupchat', (error, result) => {
            if (result) {
               console.log(`pesangroupchat: ${result}`)
            }
          });   
  this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
      firstload:false
    })); 
  });
     // this.getmessageRooms()999
  }

  render() {

    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={messages => this.onSend(messages)}
        user={{
          _id: this.props.navigation.state.params.user_id,
        }}
        renderUsernameOnMessage={true}
        // renderMessage={this.renderMessage}
      />
    )
  }
}
