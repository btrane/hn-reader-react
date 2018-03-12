import { addStory, clearStories, selectStory } from "./ActionTypes";

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
})

export { addStoryAction, clearStoriesAction, selectStoryAction };