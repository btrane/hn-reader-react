/**
 * Navigation routes
 * 
 * Created 3/11/18 by Ben Thornburg
 * http://github.com/btrane
 */

import { StackNavigator } from 'react-navigation';

import HomeScreen from '../components/HomeScreen';
import NewsScreen from '../components/NewsScreen';
import StoryScreen from '../components/StoryScreen';

const navigator = StackNavigator({

  home: { screen: HomeScreen },
  news: { screen: NewsScreen },
  story: { screen: StoryScreen },
  
});

export default navigator;