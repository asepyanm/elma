import React, {Component} from 'react'
import { Platform, StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { connect } from "react-redux";
import { 
  Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text, 
} from 'native-base';

//global variable
import { logout } from '../../actions/actionCreator';

class DrawerMenu extends Component {

  render(){
    return(
        <Container>
          <View>
            <View style={styles.menuTitle}>
              <Text style={styles.styleTitleMenu}>MENU</Text>
            </View>

            <TouchableOpacity onPress={() => alert('Under Construction')}>
              <View style={styles.containerItemMenu}>
                <View style={{width:'10%', alignItems:'center'}}>
                  <Icon type={'MaterialIcons'} name={'home'} style={{fontSize:20}}/>
                </View>
                <View style={{width:'90%', alignSelf:'center', marginLeft:10}}>
                  <Text style={{fontSize:14, fontWeight:'500'}}>
                    Home
                  </Text>
                </View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => alert('Under Construction')}>
              <View style={styles.containerItemMenu}>
                <View style={{width:'10%', alignItems:'center'}}>
                  <Icon type={'MaterialIcons'} name={'home'} style={{fontSize:20}}/>
                </View>
                <View style={{width:'90%', alignSelf:'center', marginLeft:10}}>
                  <Text style={{fontSize:14, fontWeight:'500'}}>
                    Profile
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>

          <TouchableOpacity onPress={this.props.logout}>
            <Footer>
              <Text style={styles.textLogoutStyles}>
                LOGOUT
              </Text>
            </Footer>
          </TouchableOpacity>

        </Container>
      )
    }
}

const mapDispatchToProps = {
  logout
};

// const mapStateToProps = (state) => ({

// })

const Logout = connect(null, mapDispatchToProps)(DrawerMenu);

export default Logout;

const styles = StyleSheet.create({
  ContainerNav:{
    width:'100%',
    marginTop:'5%'
  },
  containerUserInfo:{
    height:'12%',
    flexDirection:'column',
    padding:10,
    marginTop:'5%',
    marginBottom:'5%'
  },
  menuTitle:{
    backgroundColor:'#7b7b7b',
    padding:10
  },
  styleTitleMenu:{
    color:'#fff',
    textAlign:'center', 
    fontSize:18,
    fontWeight:'bold'
  },
  containerItemMenu:{
    flexDirection:'row', 
    justifyContent:'center', 
    padding:10,
    borderBottomWidth:2,
    borderBottomColor:'#F5F5F5'
  },
  textLogoutStyles:{
    textAlign:'center',
    fontWeight:'500',
    color:'#FFF'
  },
})
