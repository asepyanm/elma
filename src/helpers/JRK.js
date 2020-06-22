import axios from 'axios';
import {AsyncStorage} from "react-native";
import url from "../config/api_service"

import RNFetchBlob from 'react-native-fetch-blob'

class JRK{
    tokentelkom;
    userid="";
    fcmtoken="";
    constructor() {    
     this.userid=this._getStorageValue('user_id')
     this.fcmtoken=this._getStorageValue('fcmtoken')
    }
    async getBackgroundNotification(){
      let fcmtoken = await AsyncStorage.getItem('fcmtoken')
      let userid = await AsyncStorage.getItem('user_id')
      let urldata=url.API+"/backgroundnotif/"+userid+"/"+fcmtoken
      // console.log(urldata)
      // return axios.get(urldata)

      return RNFetchBlob.config({
        trusty:true
      }). fetch('GET', urldata)
    }
    async _getStorageValue(key){
      try{
      const value = await AsyncStorage.getItem(key);
          if (value !== null) {
            // We have data!!
            // console.log(value);
            return value
          }
        } catch (error) {
          return null
          // Error retrieving data
        }
        // let value = await AsyncStorage.getItem(key)
        // console.log('isi val',value)
        // return value
      }
    _setStorageValue(key,val){
        try {
            AsyncStorage.setItem(key,val)
            return true
         } catch (error) {
           console.log(`gagal save ${error}`)
           return false
         }
    }
    postDataFromApiAsync(url="",headers={},data={}) {
        return fetch(url, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(data)
          })
          
      }
      initBackgroundProsess(){
        console.log('init background jrk proses')
        this.getBackgroundNotification()
      }
      async updatedevicestate(status){
        let value = await AsyncStorage.getItem('fcmtoken')
        // console.log(value);
        let urlstate=url.API+"/fcmdevicestate/"+value+"/"+status
        // console.log(urlstate)
        // return axios.get(urlstate)
        return RNFetchBlob.config({
          trusty:true
        }). fetch('GET', urldata)
      }
    telkomToken(){
        var postData = {
            'grant_type':'client_credentials',
            'mode':'x-www-form-urlencoded'
          }
          // axios({
          //   method: 'post',
          //   url: url.APITELKOM+'/token/',
          //   headers:{
          //       'Content-Type':'application/x-www-form-urlencoded',
          //       'Authorization': 'Basic Y3QyM3p6Z1NMVVI5M1J6WWREUENyZ0VYU25zYTpTSXNzVVdNdzdOckhhNU9FUWgzNU1VN2NaVkVh:'
          //   },
          //   params:postData
          // }).then((response) => {
          //   console.log(response)
          // })
          // .catch( (error) =>   console.log(error) ) 

          RNFetchBlob.config({
            trusty:true
          }). fetch('POST', `${url.APITELKOM}/token/`,{
            headers:{
              'Content-Type':'application/x-www-form-urlencoded',
              'Authorization': 'Basic Y3QyM3p6Z1NMVVI5M1J6WWREUENyZ0VYU25zYTpTSXNzVVdNdzdOckhhNU9FUWgzNU1VN2NaVkVh:'
            },
            params:postData
          }).then((response) => {
              console.log(response)
            })
            .catch( (error) =>   console.log(error) ) 
    }

//    // Getter
//   get area() {
//     return this.calcArea();
//   }
//    // Setter
// set height(height) {
//     this.height = height;
//   }
//   // Method
//   calcArea() {
//     return this.height * this.width;
//   }
}
export default new JRK();