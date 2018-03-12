/**
 * Creates redux store
 * 
 * Created 3/11/18 by Ben Thornburg
 * http://github.com/btrane
 * 
 * h/t https://hackernoon.com/a-comprehensive-guide-for-integrating-react-navigation-with-redux-including-authentication-flow-cb7b90611adf
 * 
 */

import { createStore, combineReducers } from "redux";
import {
  persistCombineReducers,
  persistStore,
  persistReducer
} from "redux-persist";
import storage from "redux-persist/es/storage";

import NavigationReducer from "./reducers/NavigationReducer";
import storyReducer from "./reducers/StoryReducer";
import loginReducer from "./reducers/LoginReducer";

// config for story reducer
const config = {
  key: "root",
  storage
};

// config for login reducer (potential future use)
const config1 = {
  key: "primary",
  storage
};

// object of all the reducers for redux-persist
const reducer = {
  storyReducer,
  NavigationReducer,
  loginReducer
};

// we are only persisting the storyReducer and loginReducer
const StoryReducer = persistReducer(config, storyReducer);
const LoginReducer = persistReducer(config1, loginReducer);

// combineReducer applied on persisted(storyReducer) and NavigationReducer
const rootReducer = combineReducers({
  StoryReducer,
  NavigationReducer,
  LoginReducer
});

function configureStore() {

  // allow use of redux debug tools in react native debugger
  let store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
  let persistor = persistStore(store);
  return { persistor, store };

}

export default configureStore;