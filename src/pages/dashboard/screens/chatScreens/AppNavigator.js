import  { StackNavigator }  from 'react-navigation';
import roomList from './roomList';
import detailChatRoomScreens from './detailChatRoomScreens';

const AppNavigator = StackNavigator({
  roomList: { screen: roomList },
  detailChatRoomScreens: { screen: detailChatRoomScreens },
},
{
initialRouteName:"roomList"
}
);

export default AppNavigator;