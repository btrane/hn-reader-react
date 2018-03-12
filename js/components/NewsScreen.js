/**
 * Screen with list of news articles
 * Uses API to get articles and put in store
 * 
 * Created 3/11/18 by Ben Thornburg
 * http://github.com/btrane
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import NewsPage from './NewsPage';
import {
  addStoryAction,
  clearStoriesAction,
} from '../actions/ActionCreator';

class News extends Component {

  // header title
  static navigationOptions = {
    title: 'Top Stories',
  };

  // check cache on init
  constructor(props) {

    super(props);

    // how long has it been since last refresh?
    let cacheTime = 15 * 60 * 1000; // 15 minutes
    let timeElapsed = Date.now() - props.lastUpdated;

    // if we don't have any stories (or they're too old), refresh the store from the API
    if (!props.stories || props.stories.length == 0 || (timeElapsed > cacheTime)) {
      this._getTopStoriesFromAPI();
    }

  }

  // top stories API call, returns array of story IDs and calls populateStories on success
  _getTopStoriesFromAPI = () => {

    // clear current stories from store
    this.props.clearStoriesAction();

    // get array of top stories IDs
    fetch('https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty')
      .then((res) => res.json())
      .then((resJson) => {
        this._populateStories(resJson);
      })
      .catch((err) => {
        console.error(err);
      });

  }

  // single story item API call, returns story JSON and adds it to store
  _getItemFromAPI = (id) => {

    fetch('https://hacker-news.firebaseio.com/v0/item/'+id+'.json?print=pretty')
      .then((res) => res.json())
      .then((resJson) => {
        this.props.addStoryAction(resJson);
      })
      .catch((err) => {
        console.error(err);
      });

  }

  // adds each story item to the store, up to the limit
  _populateStories = (idArray, limit = 25) => {

    let count = 0;
    for (var id of idArray) {

      this._getItemFromAPI(id);
      count++;
      if (count >= limit) return;
      
    }

  }
  
  render() {

    return (
      <NewsPage navigation={this.props.navigation} />
    );

  }

}

// store props + actions
const mapStateToProps = (state) => ({
  stories: state.StoryReducer.stories,
  lastUpdated: state.StoryReducer.lastUpdated
})

const mapDispatchToProps = {
  addStoryAction,
  clearStoriesAction
};

const NewsScreen = connect(mapStateToProps, mapDispatchToProps)(News);

export default NewsScreen;
