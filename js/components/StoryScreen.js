/**
 * Screen with web view of link or story
 * 
 * Created 3/11/18 by Ben Thornburg
 * http://github.com/btrane
 */

import React, { Component } from 'react';
import {
  Text,
  View,
  WebView,
} from 'react-native';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';

class StoryScreen extends Component {

  render() {

    const {
      stories,
      currentStory,
    } = this.props;

    // use the URL on stories with URLs
    if (stories[currentStory].url) {

      return (
        <WebView
          source={{uri: stories[currentStory].url}}
        />
      );  

    }

    // html for WebView in a text-only story item
    const storyHtml = `<style>
      a {
        text-decoration: none;
        color: #FFF;
      }
    </style>
    <div style="background-color: #111; padding: 15px;">
      <div style="font-size: 48pt; color: #CCC; margin-bottom: 35px;">` + stories[currentStory].title + `</div>
      <div style="font-size: 32pt; color: #CCC;">` + stories[currentStory].text + `</div>
    </div>
    `;

    // fill in the WebView with the generated HTML
    return (
      <WebView
        source={{html: storyHtml}}
      />
    )

  }

}

// store props
const mapStateToProps = (state) => ({
  stories: state.StoryReducer.stories,
  currentStory: state.StoryReducer.currentStory
});

const Story = connect(mapStateToProps, null)(StoryScreen);

export default Story;
