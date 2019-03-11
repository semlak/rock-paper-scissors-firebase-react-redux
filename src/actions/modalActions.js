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

export const modalMessage = (obj) => dispatch => {
  // sampleObj = {
  //   // old values
  //   loginError: false,
  //   registrationError: false,
  //   message: 'Login was successful!',
  //   // more values
  //   loginUsernameError: false,
  //   loginUsernameMessage: 'Must be atleast 1 character',
  //   loginPasswordError: false,
  //   loginPasswordMessage: 'Password length must be atleast 6 characters',
  //
  //   regDisplayNameError: true,
  //   regDisplayNameMessage: 'Must be atleast 1 character',
  //   regUsernameError: false,
  //   regUsernameMessage: 'Must be atleast 1 character',
  //   regPasswordError: false,
  //   regPasswordMessage: 'Password length must be atleast 6 characters',
  //   regPasswordMatchError: false,
  //   regPasswordMatchMessage: 'Passwords must match',
  // };
  return dispatch({
    type: modalActions.MODAL_MESSAGE,
    payload: obj
  });
};
