/**
 * Reducer for stories
 * 
 * Created 3/11/18 by Ben Thornburg
 * http://github.com/btrane
 * 
 */

import { addStory, clearStories, selectStory, requestStories, receiveStories, requestStory, receiveStory } from '../actions/ActionTypes';

const initialState = {

  stories: [],
  currentStory: 0,
  lastUpdated: 0,
  topStories: [],

};

const storyReducer = (state = initialState, action) => {

  switch (action.type) {

    // add story to story array
    case addStory:
      let story = { ...action.story, index: state.stories.length }
      let stories = [...state.stories, story];
      return { ...state, stories: stories, lastUpdated: Date.now() };

    // clear all stories
    case clearStories:
      return { ...state, stories: [], lastUpdated: Date.now() };

    // set current story
    case selectStory:
      let nextState = { ...state, currentStory: action.currentStory};
      return nextState;

    // fetch stories from API
    case requestStories:
      return state;

    // do something with the data
    case receiveStories:
      return { ...state, topStories: action.topStories };

    case requestStory:
      return state;

      default:
      return state;

  }

};

export default storyReducer;