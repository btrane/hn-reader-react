/**
 * Reducer for navigation
 * 
 * Created 3/11/18 by Ben Thornburg
 * http://github.com/btrane
 * 
 * h/t https://hackernoon.com/a-comprehensive-guide-for-integrating-react-navigation-with-redux-including-authentication-flow-cb7b90611adf
 * 
 */

import AppNavigator from '../navigation/NavigationStack';

// setup for future login integration
const ActionForLoggedOut = AppNavigator.router.getActionForPathAndParams('home');
const ActionForLoggedIn = AppNavigator.router.getActionForPathAndParams('news');

const stateForLoggedOut = AppNavigator.router.getStateForAction(ActionForLoggedOut);
const stateForLoggedIn = AppNavigator.router.getStateForAction(ActionForLoggedIn);

const initialState = { stateForLoggedOut, stateForLoggedIn };

const navigationReducer = (state = initialState, action) => {

  switch (action.type) {

    case '@@redux/INIT':
      return {
        ...state,
        stateForLoggedIn: AppNavigator.router.getStateForAction(ActionForLoggedIn, stateForLoggedOut)
      };

    case 'LOGIN':
      return {
        ...state,
        stateForLoggedIn: AppNavigator.router.getStateForAction(ActionForLoggedIn, stateForLoggedOut)
      };

    case 'LOGOUT':
      return {
        ...state,
        stateForLoggedOut: AppNavigator.router.getStateForAction(
          NavigationActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({
              routeName: 'home'
            })]
          })
        )
      };

    default:
      return {
        ...state,
        stateForLoggedIn: AppNavigator.router.getStateForAction(action, state.stateForLoggedIn)
      };

  }
  
};

export default navigationReducer;
