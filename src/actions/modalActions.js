import {
  modalActions,
} from './types';


export const openAuthenticationModal = () => dispatch => {
  // console.log('running openAuthenticationModal action');
  dispatch({
    type: modalActions.OPEN_AUTHENTICATION_MODAL,
  });
};

export const closeAuthenticationModal = () => dispatch => {
  return dispatch({
    type: modalActions.CLOSE_AUTHENTICATION_MODAL,
  });
};

export const toggleAuthenticationModal = () => dispatch => {
  // console.log('in toggleAuthenticationModal action');
  return dispatch({
    type: modalActions.TOGGLE_AUTHENTICATION_MODAL,
  });
};

