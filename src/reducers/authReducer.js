// import { FETCH_USER } from '../actions/types';
import { userActions } from '../actions/types';

// export default (state = false, action) => {
export default (state = null, action) => {
  // console.log('in auth reducer, state:', state, 'action:', action);
  // if (Object.keys(userActions).indexOf(action.type) > -1) {
  //   console.log('in auth reducer, state:', state, 'action:', action);
  // }
  switch (action.type) {
    case userActions.FETCH_USER:
      return action.payload || null;
    default:
      return state;
  }
};
