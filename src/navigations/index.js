import React, { Component } from "react";
import { BackHandler } from "react-native";
import { connect } from "react-redux";
import { addNavigationHelpers, NavigationActions } from "react-navigation";
import NavigationStack from "./router";

class AppNavigation extends Component {
  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this.onBackPress);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.onBackPress);
  }

  onBackPress = () => {
    const { dispatch, navigationState } = this.props;
    
    if (navigationState.stateForLoggedIn.index <= 1) {
      BackHandler.exitApp();
      return;
    }
    dispatch(NavigationActions.back());
    return true;
  };

  render() {
    const { navigationState, dispatch, isLoggedIn, loginGroup } = this.props;
    const state = isLoggedIn
      ? navigationState.stateForLoggedIn
      : navigationState.stateForLoggedOut;
    return (
      <NavigationStack navigation={addNavigationHelpers({ dispatch, state, isLoggedIn, loginGroup })} />
    );
  }
}

const mapStateToProps = state => {
  return {
    isLoggedIn: state.LoginReducer.isLoggedIn,
    navigationState: state.NavigationReducer,
    loginGroup:state.LoginReducer.group_ID,
  };
};

export default connect(mapStateToProps)(AppNavigation);