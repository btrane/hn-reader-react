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

export function fetchTopStories() {

  return (dispatch) => {

    dispatch(requestStoriesAction);

    return fetch('https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty')
      .then((res) => res.json())
      .then((resJson) => {

        dispatch(receiveStoriesAction(resJson));

        let idArray = resJson;
        let count = 0;
        let limit = 35; // hardcoded for now
        for (var id of idArray) {
    
          dispatch(fetchStory(id));
          count++;
          if (count >= limit) return;
          
        }
    
      });

  }

}

export function fetchStory(id) {

  return (dispatch) => {

    dispatch(requestStoryAction(id));

    return fetch('https://hacker-news.firebaseio.com/v0/item/'+id+'.json?print=pretty')
      .then((res) => res.json())
      .then((resJson) => {
        dispatch(addStoryAction(resJson));
      });

  }

}

export { addStoryAction, clearStoriesAction, selectStoryAction, requestStoriesAction, receiveStoriesAction, requestStoryAction };