/**
 * Creates individually styled news item within FlatList component and opens selected story
 * 
 * Created 3/11/18 by Ben Thornburg
 * http://github.com/btrane
 */

import React, { Component } from 'react';
import {
  Text,
  View,
  Button,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import moment from 'moment';
import { selectStoryAction } from '../actions/ActionCreator';

class MyNewsItem extends Component {

  // select story from list and open it
  _openStory = (index) => {

    // set current story so we know which url/text to use
    this.props.selectStoryAction(index);

    // navigate to story screen component
    const navigateToStoryPage = NavigationActions.navigate({
      routeName: "story"
    });
    this.props.navigation.dispatch(navigateToStoryPage);

  }

  // convert source url to short domain.tld format
  _source = (url) => {

    // shorten source URL to domain only
    let domainArr = url.split('/', 3).splice(2,1).toString().split('.');

    // get last two elements
    return domainArr[domainArr.length - 2] + '.' + domainArr[domainArr.length - 1];

  }

  // format comment count (if any)
  _comments = (commentTotal) => {

    if (commentTotal > 0) {

      return (
        commentTotal.toString() + ' comments'
      );

    };

    return '';

  }

  render() {

    const {
      item,
      selectStoryAction,
    } = this.props;

    return (
      <TouchableOpacity
        style={styles.storyButton}
        onPress={() => this._openStory(item.index)}
      >
        <View>
          <Text style={styles.storyTitle}>
            {item.title}
          </Text>
          <Text style={styles.storySource}>
            {item.score} points {item.url ? '(' + this._source(item.url) + ')' : ''}
          </Text>
          <Text style={styles.storyDetail}>
            by {item.by}{' '}
            {moment.unix(item.time).utc().fromNow()}{' '}
            with {this._comments(item.descendants)}
          </Text>
        </View>
      </TouchableOpacity>
    );

  }

}

// store actions
const mapDispatchToProps = {
  selectStoryAction
};

const NewsItem = connect(null, mapDispatchToProps)(MyNewsItem);

export default NewsItem;

// styles
const styles = StyleSheet.create({

  storyTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 1,
  },
  storySource: {
    fontSize: 12,    
    color: '#777777',
    marginBottom: 7,
  },
  storyDetail: {
    fontSize: 11,
  },
  storyButton: {
    padding: 15,
    borderBottomColor: '#CCCCCC',
    borderBottomWidth: 1,
  },

});
