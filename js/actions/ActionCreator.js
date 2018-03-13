import { 
  addStory,
  clearStories,
  selectStory,
  requestStories,
  receiveStories,
  requestStory,
  receiveStory,
} from './ActionTypes';

const addStoryAction = (story) => ({
  type: addStory,
  story: story
});

const clearStoriesAction = () => ({
  type: clearStories
});

const selectStoryAction = (index) => ({
  type: selectStory,
  currentStory: index
});

const requestStoriesAction = () => ({
  type: requestStories
});

const receiveStoriesAction = (stories) => ({
  type: receiveStories,
  stories: stories,
  lastUpdated: Date.now(),
});

const requestStoryAction = (id) => ({
  type: requestStory,
  id: id
});

// fetch the stories array from the API and iterate over each story ID
export function fetchTopStories() {

  return (dispatch) => {

    dispatch(requestStoriesAction);

    return fetch('https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty')
      .then((res) => res.json())
      .then((resJson) => {

        // save the array to the store
        dispatch(receiveStoriesAction(resJson));

        // iterate over each story ID
        let idArray = resJson;
        let count = 0;
        let limit = 35; // hardcoded for now
        for (var id of idArray) {
    
          // fetch the individual story
          dispatch(fetchStory(id));
          count++;
          if (count >= limit) return;
          
        }
    
      });

  }

}

// fetch an individual story from the API and add it to the store
export function fetchStory(id) {

  return (dispatch) => {

    // blank for now, may use to let state know what we're doing later
    dispatch(requestStoryAction(id));

    return fetch('https://hacker-news.firebaseio.com/v0/item/'+id+'.json?print=pretty')
      .then((res) => res.json())
      .then((resJson) => {

        // add the story to the store
        dispatch(addStoryAction(resJson));
        
      });

  }

}

export { addStoryAction, clearStoriesAction, selectStoryAction, requestStoriesAction, receiveStoriesAction, requestStoryAction };