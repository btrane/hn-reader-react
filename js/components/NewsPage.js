/**
 * Populates a FlatList component with stories from the store
 * 
 * Created 3/11/18 by Ben Thornburg
 * http://github.com/btrane
 */

import React, { Component } from 'react';
import {
  FlatList,
  ActivityIndicator,
  View,
  StyleSheet,
} from 'react-native';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import NewsItem from './NewsItem';

class NewsList extends Component {

  render() {

    const {
      stories,
    } = this.props;

    if (stories.length > 0) {

      return (
        <View style={styles.listView}>
          <FlatList
            data={stories}
            renderItem={({item}) => (
              <NewsItem style={styles.storyListItem} item={item} navigation={this.props.navigation} />
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>      
      )

    }
    
    return (
      <View style={styles.loadingView}>
        <ActivityIndicator />
      </View>
    )

  }

}

// store props
const mapStateToProps = (state) => ({
  stories: state.StoryReducer.stories
});

const NewsPage = connect(mapStateToProps, null)(NewsList);

export default NewsPage;

// styles
const styles = StyleSheet.create({

  listView: {
    flex: 1,
  },
  loadingView: {
    flex: 1,
    paddingTop: '20%',
  },

});
