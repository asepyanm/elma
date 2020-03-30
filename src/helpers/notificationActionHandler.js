import { Platform, StyleSheet, AsyncStorage, Alert, Text, View, AppState,AppRegistry } from "react-native";
const notificationActionHandler = async (data) => {
  const action = data.notification.action;
  if (action == 'firstAction') { // id of the first action
    // Do work pertaining to Accept action here
    console.log('satu')
  } else if (action == 'secondAction') { // id of the second action
    // Do work pretainng to Reject action here
    console.log('dua')
  }
  // Add all the requuuirede actions handlers
}
AppRegistry.registerHeadlessTask(
    'RNPushNotificationActionHandlerTask', // you must use the same name
    () => { return notificationActionHandler }
);