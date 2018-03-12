/**
 * Hacker News App
 * 
 * Created 3/10/18 by Ben Thornburg
 * http://github.com/btrane
 * 
 */

import React, { Component } from 'react';
import { Text } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react';

import configureStore from './store'; 
import AppNavigation from './navigation';

const { store, persistor } = configureStore();

export default function BaseApp() {

  return (
    <Provider store={store}>
      <PersistGate loading={<Text>Loading...</Text>} persistor={persistor}>
        <AppNavigation />
      </PersistGate>
    </Provider>
  );
  
}
