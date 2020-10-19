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
  Button,
  List, 
  ListItem,
  AsyncStorage
} from 'react-native';
import {Header, Icon, Left, Right, Body, Title, Tab, Tabs, Content, Segment, Container} from 'native-base';
import url from '../../../../config/api_service';
import Axios from "axios";
import RNFetchBlob from 'rn-fetch-blob'

export default class roomList extends Component {
 static navigationOptions = {
    title: "List Group Chat"
  };

  state = {
    rooms: [
      // {
      //   id: 1,
      //   name: 'DES',
      // },
      // {
      //   id: 2,
      //   name: 'WKD',
      // },
      // {
      //   id: 3,
      //   name: 'Telkom',
      // },
    ],
    user_id:{}
  };


  constructor(props) {
    super(props);
    // console.log(` ini isi state ${this.state.group}`);
    const { navigation } = this.props;
    this.user_id = null;//navigation.getParam("id");
  }

  //

  async componentDidMount() {
    // console.log(`isi state ${this.state}`)
    this._setSession()
  }

_setSession = async () => {
    await AsyncStorage.getItem('user_id', (error, result) => {
      // console.log(`session user: ${JSON.stringify(result)}`)
      if (result) {
        this.user_id=result
         this.getRooms(result)
         this.setState({
        user_id:result
      });
        // console.log(`session user: ${JSON.stringify(result)}`)
      }
    });   
  };
getRooms= async(id)=>{
   await AsyncStorage.getItem('groupchat', (error, result) => {
    // console.log('groupchat',result)
      if (result) {
        console.log('groupchat atas',result)
        this.setState({
          rooms: JSON.parse(result)
        });
      }
        else{
           console.log('groupchat bawah',result)
           console.log(`isi url : ${url.API}/chatroombyuser/${id}`)
          //  Axios.get(`${url.API}/chatroombyuser/${id}`)
          RNFetchBlob.config({
            trusty:true
          }). fetch('GET', `${url.API}/chatroombyuser/${id}`)
            .then(response => {
              // console.log(response.data);
               this.setState({
                  rooms:response.data.data
                });
            })
            .catch(error => {
              console.log(error);
            });
          }
    });   
    
}
  render() {
    const { rooms } = this.state;
    // console.log("jrk rooms",rooms);
    return (
      <View style={styles.container}>
        {
          rooms &&
          <FlatList
            keyExtractor={(item) => item.id.toString()}
            data={rooms}
            renderItem={this.renderRoom}
          />
        }
      </View>

    );
  }

  //

  renderRoom = ({ item }) => {
    return (
      <View style={styles.list_item}>
        <Text style={styles.list_item_text}>{item.nama}</Text>
          <TouchableOpacity style={styles.containerDetailData} onPress={() => {
          this.enterChat(item);
        }}>
                    <View style={{width:64, justifyContent:'center', alignSelf:'center'}}>
                      <Icon type={'MaterialIcons'} name={'group'} style={{fontSize:18}} />
                    </View>
                  </TouchableOpacity>
      </View>
    );
  }

  //

  enterChat = async (room) => {
    try {
      // const response = await axios.post(`${CHAT_SERVER}/user/permissions`, { room_id: room.id, user_id: this.user_id });
      // const { permissions } = response.data;
      // const is_room_admin = (permissions.indexOf('room:members:add') !== -1);

      this.props.navigation.navigate("detailChatRoomScreens", {
        user_id: this.user_id,
        room_id: room.id,
        room_name: room.nama,
        room_deskripsi: room.deskripsi,
        // is_room_admin
      });

    } catch (get_permissions_err) {
      console.log("error getting permissions: ", get_permissions_err);
    }
  }
}
const styles = {
  container: {
    flex: 1,
    backgroundColor: "#FFF"
  },
  list_item: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  list_item_text: {
    marginLeft: 10,
    fontSize: 20,
  }
};


