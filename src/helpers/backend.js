import Axios from "axios";
import {AsyncStorage} from "react-native";
export function keysToLowerCase(obj) {
    if(obj instanceof Array) {
        for (var i in obj) {
            obj[i] = keysToLowerCase(obj[i]);
        }
    }
    if (!typeof(obj) === "object" || typeof(obj) === "string" || typeof(obj) === "number" || typeof(obj) === "boolean") {
        return obj;
    }
    var keys = Object.keys(obj);
    var n = keys.length;
    var lowKey;
    while (n--) {
        var key = keys[n];
        if (key === (lowKey = key.toLowerCase()))
            continue;
        obj[lowKey] = keysToLowerCase(obj[key]);
        delete obj[key];
    }
    return (obj);
}
  export async function getSession() {
    await AsyncStorage.getItem('session_single', (error, result) => {
      if (result) {
      return JSON.parse(result)
      }
    });   
  };

export function saveTokenFCM(token,user_id,group_id){

}