/**
 * Reducer for login state
 * 
 * Created 3/12/18 by Ben Thornburg
 * http://github.com/btrane
 */

const initialState = {
  isLoggedIn: false,
};

const loginReducer = (state = initialState, action) => {

  switch (action.type) {

    case "LOGIN":
      return { ...state, isLoggedIn: true };

    case "LOGOUT":
      return { ...state, isLoggedIn: false };

    default:
      return state;

  }

};

export default loginReducer;