// import { FETCH_USER } from '../actions/types';
import { modalActions } from '../actions/types';

const authenticationModalOpenDefault = true;
export default (state = { authenticationModalOpen: authenticationModalOpenDefault }, action) => {
  // console.log('in modals reducer, state:', state, 'action:', action);
  // if (Object.keys(modalActions).indexOf(action.type) > -1) {
  //   console.log('in auth reducer, state:', state, 'action:', action);
  // }
  switch (action.type) {
    case modalActions.OPEN_AUTHENTICATION_MODAL:
      return { ...state, authenticationModalOpen: true, ...action.payload };
    case modalActions.CLOSE_AUTHENTICATION_MODAL:
      return { ...state, authenticationModalOpen: false, ...action.payload };
    case modalActions.TOGGLE_AUTHENTICATION_MODAL:
      return { ...state, authenticationModalOpen: !state.authenticationModalOpen, ...action.payload };
    case modalActions.MODAL_MESSAGE:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
