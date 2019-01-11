// import firebase, { authRef, provider, } from '../firebase';
import firebase, { provider, } from '../firebase';
// import { authRef, provider, } from '../firebase';
import { leaveGathering } from './gatheringActions';
// import { FETCH_USER } from './types';
import { userActions } from './types';
// const auuthRef = firebase.auth();

export const fetchUser = () => dispatch => firebase.auth().onAuthStateChanged(user => {
// export const fetchUser = () => dispatch => authRef.onAuthStateChanged(user => {
// export const fetchUser = () => dispatch => firebase.auth().onAuthStateChanged(user => {
  console.log('onAuthStateChanged triggered from fetchUser');
  if (user) {
    dispatch({
      type: userActions.FETCH_USER,
      payload: user
    });
  }
  else {
    dispatch({
      type: userActions.FETCH_USER,
      payload: null
    });
  }
});

// export const signIn = () => () => firebase.auth()
export const signIn = () => dispatch => firebase.auth()
// export const signIn = () => dispatch => {
// export const signIn = () => () => authRef
  .signInWithPopup(provider)
  // .then(result => {})
  .then(() => {
    // no need to dispatch auth signer, because then is done using the onAuthStateChanged event listener
    dispatch({ type: userActions.SIGNIN_SUCCESSFUL });
  })
  .catch(error => {
    dispatch({ type: userActions.SIGNIN_ERROR, payload: error });
    console.log('signIn action error', error);
  });


// testable signOut function
// handleSignOut() {
//   if (firebase.auth().currentUser) {
//     firebase.auth().signOut();
export const handleSignOut = () => dispatch => {
// export const handleSignOut = () => {
  // console.log('running handleSignOut action');
  // console.log('authref', authRef.toString());
  // Object.keys(authRef).forEach(key => console.log('authRef key:', key, 'value:', authRef[key] && authRef[key].toString()));
  const authRef = firebase.auth();
  // console.log('authref', authRef.toString());
  // Object.keys(authRef).forEach(key => console.log('authRef key:', key, 'value:', authRef[key] && authRef[key].toString()));
  // if (firebase.auth().currentUser) {
  //   firebase.auth().signOut();
  if (authRef.currentUser) {
    authRef.signOut()
      .then(() => {
        // console.log('sign-out successful');
        // return true;
        // dispatch({ type: 'SIGNOUT_SUCCESSFUL' });
        dispatch({ type: userActions.SIGNOUT_SUCCESSFUL });
        return Promise.resolve(true);
      })
      .catch(error => {
        // dispatch({ type: 'SIGNOUT_ERROR' });
        // dispatch({ type: 'SIGNOUT_ERROR', payload: error });
        dispatch({ type: userActions.SIGNOUT_ERROR, payload: error });
        // console.log('signOut error', error);
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
  // dispatch({ type: 'SIGNOUT_REQUEST' });
  dispatch({ type: userActions.SIGNOUT_REQUEST });
  // export const signOut = () => () => {
  // console.log('received action request to signOut');
  // console.log('gathering in signOut action', gathering);
  // console.log('dispatch in signOut action', dispatch);
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
