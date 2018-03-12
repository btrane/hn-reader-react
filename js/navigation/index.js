/**
 * Setup navigation for app
 * 
 * Created 3/11/18 by Ben Thornburg
 * http://github.com/btrane
 */

import React, { Component } from "react";
import { connect } from "react-redux";
import { addNavigationHelpers } from "react-navigation";
import NavigationStack from "./NavigationStack";

class AppNavigation extends Component {

  render() {
    
    const {
      navigationState,
      dispatch,
      isLoggedIn,
    } = this.props;

    const state = isLoggedIn ? navigationState.stateForLoggedIn : navigationState.stateForLoggedOut;

    return (
      <NavigationStack
        navigator={
          addNavigationHelpers({
            dispatch,
            state: navigationState
          })}
      />
    );

  }

}

// store props
const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.LoginReducer.isLoggedIn,
    navigationState: state.NavigationReducer
  };
};

export default connect(mapStateToProps)(AppNavigation);
