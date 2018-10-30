import React, { Component } from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableHighlight,
  Image,
  Alert
} from 'react-native';
import { Toast, Icon } from 'native-base';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import axios from 'axios';
import { connect } from "react-redux";

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
      validationUsername:false,     
      validationPassword:false,   
    }
  }

  validationForm(){
    const {username, password} = this.state;
    
    if (username === '' && password === '')
      {
        this.setState({
          validationUsername:true,
          validationPassword:true,
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
      })
    }
  }

  getLogin(){
    const {username, password} = this.state;	
    
    this.props.dispatch({
      type:'LOGIN',
      payload:axios.get(`${url.API}/ebis_getlogin?user_id=${username}&user_pass=${password}`),
    })
  }

  render() {
    const {statusForm, loaderStatus} = this.props;
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