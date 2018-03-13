/**
 * Initial screen with logo and start button
 * 
 * Created 3/11/18 by Ben Thornburg
 * http://github.com/btrane
 */

import React, { Component } from 'react';
import {
  Text,
  View,
  Button,
  Image,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import { NavigationActions } from 'react-navigation';

export default class HomeScreen extends Component {

  // hide the header on the home page
  static navigationOptions = {
    header: null,
  };

  // go to news page
  _navigate = () => {

    const navigateToNewsPage = NavigationActions.navigate({
      routeName: 'news'
    });
    this.props.navigation.dispatch(navigateToNewsPage);

  }

  render() {

    return (
      <ImageBackground style={styles.homeBackground} source={require('../../img/bg.jpg')}>
        <View style={styles.homeView}>
          <Image 
            source={require('../../img/y.png')} 
            style={styles.logo}
          />
          <Text style={styles.homeTitle}>Hacker News</Text>
          <TouchableOpacity
            onPress={this._navigate}
            style={styles.homeButton}
          >
            <Text style={styles.homeButtonText}>Read</Text>
          </TouchableOpacity>
          <View style={{height: '25%'}} />
          <Text style={styles.homeCredit}>developed by Ben Thornburg for Alchemy</Text>
          <Text style={styles.homeCredit}>photo by Tobias van Schneider on Unsplash</Text>
        </View>
      </ImageBackground>
    );

  }

}

// styles
const styles = StyleSheet.create({

  homeView: {
    alignItems: 'center',
    paddingTop: '20%',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    height: '100%',
  },
  homeBackground: {
    width: '100%',
    height: '100%',
  },
  logo: {
    width: 150,
    height: 150,
    opacity: 1,
    alignItems: 'center',
  },
  homeTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 12,
    marginBottom: 50,
  },
  homeButton: {
    alignItems: 'center',
    backgroundColor: '#fb651e',
    width: 300,
    marginTop: 50,
    padding: 20,
    borderRadius: 30,
  },
  homeButtonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  homeCredit: {
    color: 'white',
    fontSize: 11,
    marginTop: 5,
  },

});
