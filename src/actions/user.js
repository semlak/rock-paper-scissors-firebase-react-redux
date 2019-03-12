// import firebase, { authRef, provider, } from '../firebase';
// import firebase, { provider, } from '../firebase';
import firebase, { googleProvider, githubProvider } from '../firebase';
// import { authRef, provider, } from '../firebase';
import { leaveGathering } from './gatheringActions';
// import { FETCH_USER } from './types';
import { userActions, modalActions } from './types';
// const auuthRef = firebase.auth();

export const fetchUser = () => dispatch => firebase.auth().onAuthStateChanged(user => {
  // This function is not an action or action creator, but just creates a firebase listener, which when fired dispatches actions.
  // I would like to decouple the creation of the listener from the action creators.
  console.log('onAuthStateChanged triggered from fetchUser');
  if (user && user.displayName) {
    dispatch({
      type: userActions.FETCH_USER,
      payload: user
    });
    setTimeout(() => dispatch({
      type: modalActions.CLOSE_AUTHENTICATION_MODAL,
      payload: {
        // loginError: false,
        // registrationError: false,
        loginError: undefined,
        registrationError: undefined,
      }
    }), 1600);
    // dispatch({
    //   type: modalActions.CLOSE_AUTHENTICATION_MODAL,
    //   payload: {
    //     loginError: undefined,
    //   }
    // });
  }
  else {
    dispatch({
      type: userActions.FETCH_USER,
      payload: null
    });
  }
});

const signInMain = (providerName) => dispatch => firebase.auth()
  .signInWithPopup(providerName === 'github' ? githubProvider : providerName === 'google' ? googleProvider : googleProvider)
  .then(result => {
  // .then(() => {
    console.log('singIn result', result);
    // no need to dispatch auth signer, because then is done using the onAuthStateChanged event listener
    dispatch({ type: userActions.SIGNIN_SUCCESSFUL });
  })
  .catch(error => {
    dispatch({ type: userActions.SIGNIN_ERROR, payload: error });
    console.log('signIn action error', error);
  });


export const signIn = () => dispatch => dispatch(signInMain('google'));
export const signInWithGithub = () => dispatch => dispatch(signInMain('github'));


export const handleSignOut = () => dispatch => {
  const authRef = firebase.auth();
  if (authRef.currentUser) {
    authRef.signOut()
      .then(() => {
        dispatch({ type: userActions.SIGNOUT_SUCCESSFUL });
        return Promise.resolve(true);
      })
      .catch(error => {
        dispatch({ type: userActions.SIGNOUT_ERROR, payload: error });
      });
    return Promise.resolve(true);
    // return true;
  }
  else {
    // return false;
    dispatch({ type: userActions.SIGNOUT_ERROR, payload: 'error on signout' });
    return Promise.resolve(false);
  }
};


// export const signOut = ({ auth: user, gathering }) => dispatch => {
export const signOut = ({ gathering }) => dispatch => {
  dispatch({ type: userActions.SIGNOUT_REQUEST });
  if (gathering && Object.keys(gathering).length > 0 && typeof gathering.leave === 'function') {
    dispatch(leaveGathering(gathering));
    // console.log('executed leaveGathering action, now signing out');
  }
  else {
    console.log('not leaving gathering, because it does not appear to be defined');
  }
  // return Promise.resolve(handleSignOut());
  return dispatch(handleSignOut());
};

export const registerUserAction = ({ username, email, password }) => dispatch => {
  // console.log('in registerUser Action');
  const authRef = firebase.auth();
  // console.log('username', username, 'email', email, 'password', password);
  dispatch({
    type: userActions.EMAIL_PASSWORD_REGISTRATION_ATTEMPT,
    // payload: { username, email, password },
  });
  return authRef.createUserWithEmailAndPassword(email, password)
    .then(() => {
    // .then((data) => {
      // console.log('registerUserAction data', data);
      dispatch({
        type: userActions.EMAIL_PASSWORD_REGISTRATION_SUCCESS,
        // payload: { username, email, password },
      });
      // also update user profile in firebase with username
      const authUser = authRef.currentUser;
      authUser.updateProfile({
        uid: authUser.uid,
        displayName: username,
      }).then(() => {
        // console.log('updateProfile result', result)
        setTimeout(() => dispatch({
          type: modalActions.CLOSE_AUTHENTICATION_MODAL,
          payload: {
            registrationError: undefined,
          }
        }), 2000);
        dispatch({
          type: userActions.FETCH_USER,
          payload: firebase.auth().currentUser
        });
        dispatch({
          type: modalActions.MODAL_MESSAGE,
          payload: {
            registrationError: false,
            loginError: false,
            message: "Registration was successful!",
          }
        });
      });
    })
    .catch(err => {
      dispatch({
        type: modalActions.MODAL_MESSAGE,
        payload: {
          registrationError: true,
          message: err.message,
        }
      });
    });
};

export const loginUserWithEmailPassword = ({ email, password }) => dispatch => {
  // console.log('in loginUserWithEmailPassword');
  const authRef = firebase.auth();
  dispatch({
    type: userActions.EMAIL_PASSWORD_LOGIN_ATTEMPT,
  });
  return authRef.signInWithEmailAndPassword(email, password)
    // .then((data) => {
    .then(() => {
      // console.log('login data', data);
      dispatch({
        type: userActions.EMAIL_PASSWORD_LOGIN_SUCCESS,
      });
      dispatch({
        type: modalActions.MODAL_MESSAGE,
        payload: {
          loginError: false,
          registrationError: false,
          message: 'Login was successful!',
        }
      });
      // setTimeout(() => dispatch({
      //   type: modalActions.CLOSE_AUTHENTICATION_MODAL,
      //   payload: {
      //     loginError: undefined,
      //   }
      // }), 1600);
    })
    .catch((err) => {
      // console.log('error on loginUserWithEmailPassword', err);
      // console.log(err);
      // dispatch({
      //   type: userActions.EMAIL_PASSWORD_LOGIN_FAIL,
      //   // payload: err,
      //   payload: { message: err.message },
      // });
      dispatch({
        type: modalActions.MODAL_MESSAGE,
        payload: {
          loginError: true,
          message: err.message,
        }
      });
      // console.log('dispatched userActions.EMAIL_PASSWORD_LOGIN_FAIL in loginUserWithEmailPassword', userActions.EMAIL_PASSWORD_LOGIN_FAIL);
    });

  // return dispatch({
  //   type: 'LOGIN_USER_FAKE',
  //   payload: { email, password },
  // });
};
