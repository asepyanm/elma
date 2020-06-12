import React, { Component } from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  AsyncStorage,
  TouchableHighlight,
  Image,
  Alert
} from 'react-native';
import { Toast, Icon } from 'native-base';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import axios from 'axios';
import { connect } from "react-redux";

import RNFetchBlob from 'react-native-fetch-blob'

//global component
import renderIf from '../../../components/renderIf';

//global
import url from '../../../../config/api_service';

class Login extends Component {

  constructor(props){
    super(props);
    this.state = {
      username:'',
      password:'',
      token:'',
      user_id:'',
      group:'NOT_LOGGED',
      validationUsername:false,     
      validationPassword:false,
    }
  }

  _storeData = async () => {
    this._storeDataToken();
    const {loginGroup} = this.props;
    try {
      // console.log(`isi login group ${loginGroup}`);
      // console.log(`isi login group string ${JSON.stringify(loginGroup)}`);  
      // console.log(`isi props ${this.props}`);
      // console.log(`isi props string ${JSON.stringify(this.props)}`);
      await AsyncStorage.setItem('loginGroup',loginGroup);
    } catch (error) {
      // Error saving data
    }
    await AsyncStorage.getItem('loginGroup', (error, result) => {
      if (result) {
        console.warn(`AsyncStorage.storeData: ${result} ${loginGroup}`)
      }
    });   
  };
    _storeDataToken = async () => {
    await AsyncStorage.getItem('fcmtoken', (error, result) => {
      if (result) {
       this._saveToken(result)
      }
    });   
  };
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
          await axios.get(`${url.API}/fcmsavetoken/${token}/${this.state.user_id}/${this.state.group}/ya`)
}
  _cekSession= async () => {
    await AsyncStorage.getItem('user_id', (error, result) => {
      console.log(`isi session ${result}`)
    });   
  };
  validationForm(){
    const {username, password, groupID} = this.state;
    
    if (username === '' && password === '')
      {
        this.setState({
          validationUsername:true,
          validationPassword:true,
          group: 'NOT_LOGGED',
        })
        Toast.show({
          text: "Username / Password tidak boleh kosong",
          duration: 3000
        });
      }
    else{

      this.setState({
        validationUsername:false,
        validationPassword:false,
      }, () => {

        this.getLogin();

        //Toast.show({
        //  text: `GroupID: state: ${this.state.group} / ${loginGroup}`,
        //  duration: 1024
        //});
      })
    }
  }
  setSessionLogin = () => {
    const {username, password} = this.state;
    axios.get(`${url.API}/ebis_getlogin?user_id=${username}&user_pass=${password}`).then(async(response) => {
    console.log(`response.data login ${JSON.stringify(response.data)}`);
      const dataSession=response.data[0];
      AsyncStorage.setItem('user_id',response.data[0].USER_ID);
         try {
       AsyncStorage.setItem('user_id',response.data[0].USER_ID);
    } catch (error) {
      console.log(`gagal save ${error}`)
    }
      // try {
      //   await AsyncStorage.setItem('sessionUser',dataSession);
      // } catch (error) {
      //   // Error saving data
      // }
      this._cekSession;
  })
  .catch(error => {
    console.log(error);
  });
  }


  getLogin(){
    const {username, password} = this.state;  
      // console.log(`value username ${username}`);
      // console.log(`value password ${password}`);
      // console.log(`value state ${JSON.stringify(this.state)}`);

    // this.props.dispatch({
    //   type:'LOGIN',
    //   payload:axios.get(`${url.API}/ebis_getlogin?user_id=${username}&user_pass=${password}`),
    // })

    this.props.dispatch({
      type:'LOGIN',
      payload:RNFetchBlob.config({
        trusty:true
      }). fetch('GET', `${url.API}/ebis_getlogin?user_id=${username}&user_pass=${password}`),
    })

  }

  render() {
    const {statusForm,loaderStatus,loginGroup} = this.props;
  
    if(this.state.group!=loginGroup){
      //console.warn(`ELMA AsyncStorage.setItem: ${this.state.group} ${loginGroup}`)
      if(loginGroup!='NOT_LOGGED'){
        this.setState({group:loginGroup})
        this._storeData();
        this.setSessionLogin();
      } else {
        if(this.state.group!='NOT_LOGGED'){
          this.setState({group:'NOT_LOGGED'})
          this._storeData();
        }
      }
    }
    return (
      <View style={styles.container}>
        <Image 
          source={require('../../../../assets/logoLogin/logoLogin.png')}
          style={{width:wp('65%'), height:hp('22%'), marginBottom:hp('1%')}}
          resizeMode={'stretch'}
        />

        {renderIf(!statusForm)(
          <View style={styles.containerStatusError}>
            <Text style={styles.statusError}>
              Username / Password Salah
            </Text>
          </View>
        )}

        <View style={styles.inputContainer}>
          {/* <Image style={styles.inputIcon} source={{uri: 'https://png.icons8.com/ultraviolet/50/000000/user.png'}}/> */}
          <Icon type={'MaterialIcons'} name={'person'} style={styles.inputIcon} />
          <TextInput style={styles.inputs}
            placeholder="User ID"
            keyboardType="email-address"
            underlineColorAndroid='transparent'
            onChangeText={(username) => this.setState({username})}/>
        </View>
        
        <View style={styles.inputContainer}>
          {/* <Image style={styles.inputIcon} source={{uri: 'https://png.icons8.com/key-2/ultraviolet/50/3498db'}}/> */}
          <Icon type={'MaterialIcons'} name={'lock'} style={styles.inputIcon} />          
          <TextInput style={styles.inputs}
            placeholder="Password"
            secureTextEntry={true}
            underlineColorAndroid='transparent'
            onChangeText={(password) => this.setState({password})}/>
        </View>

        <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={() => this.validationForm()}>
          {
            loaderStatus
            ?
            <ActivityIndicator size="small" color="#FFF" />
            :
            <Text style={styles.loginText}>Login</Text>
          }
        </TouchableHighlight>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  loaderStatus:state.LoginReducer.loaderStatus,
  statusForm:state.LoginReducer.statusErrorFrom,
  loginGroup:state.LoginReducer.group_ID,
  isLogged:state.LoginReducer.isLoggedIn,
})

export default connect(mapStateToProps)(Login);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DCDCDC',
  },
  inputContainer: {
    borderBottomColor: '#F5FCFF',
    backgroundColor: '#FFFFFF',
    borderRadius:30,
    borderBottomWidth: 1,
    width:wp('80%'),
    height:hp('6%'),
    marginBottom:hp('2%'),
    flexDirection: 'row',
    alignItems:'center'
  },
  inputs:{
    height:45,
    marginLeft:16,
    borderBottomColor: '#FFFFFF',
    flex:1,
  },
  inputIcon:{
    width:wp('7%'),
    height:hp('4%'),
    marginLeft:15,
    justifyContent: 'center',
    color:'#87878A'
  },
  buttonContainer: {
    height:hp('6%'),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:hp('2%'),
    width:wp('80%'),
    borderRadius:30,
  },
  loginButton: {
    backgroundColor: "#FF0000",
  },
  loginText: {
    color: 'white',
  },

  //keterangan status 
  containerStatusError:{
    justifyContent:'center',
    alignItems:'center',
    marginBottom:hp('2%')
  },
  statusError:{
    textAlign:'center',
    color:'#e74c3c',
    fontWeight:'bold'
  }
});