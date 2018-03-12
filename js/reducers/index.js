/**
 * Combines redux store reducers
 * 
 * Created 3/11/18 by Ben Thornburg
 * http://github.com/btrane
 */

import { combineReducers } from 'redux';

import NavigationReducer from './NavigationReducer';
import StoryReducer from './StoryReducer';
import LoginReducer from './LoginReducer';

const AppReducer = combineReducers({
  NavigationReducer,
  StoryReducer,
  LoginReducer
});

export default AppReducer;