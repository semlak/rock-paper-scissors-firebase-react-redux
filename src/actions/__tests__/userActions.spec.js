import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import {
  // fetchUser,
  signOut,
  // handleSignOut,
} from '../../actions/user';


import {
  // LEAVE_GATHERING,
  // FETCH_USER,
  // FETCH_PLAYERS,
  // JOIN_GATHERING,
  userActions,
  gatheringActions,
} from '../types';

import firebase from '../../firebase';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);


// const mockServiceCreator = (body, succeeds = true) => () =>
//   new Promise((resolve, reject) => {
//     setTimeout(() => (succeeds ? resolve(body) : reject(body)), 10);
//   });


const sampleCurrentUserLoggedIn = true;

// firebase.auth = jest.fn().mockReturnValue({
//   currentUser: sampleCurrentUserLoggedIn,
//   // signOut: function() { console.log('in mock signout function'); return true; }
//   signOut: () => {
//     // console.log('in mock signout function');
//     if (sampleCurrentUserLoggedIn) {
//       return Promise.resolve(true);
//     }
//     else {
//       // return Promise.reject(false);
//       return Promise.reject(new Error('error on mocked signout'));
//     }
//   }
// });

const userSignOutMock = jest.fn().mockReturnValue({
  currentUser: sampleCurrentUserLoggedIn,
  // signOut: function() { console.log('in mock signout function'); return true; }
  signOut: () => {
    // console.log('in mock signout function');
    if (sampleCurrentUserLoggedIn) {
      return Promise.resolve(true);
    }
    else {
      // return Promise.reject(false);
      console.log('error on mocked signout');
      return Promise.reject(new Error('error on mocked signout'));
    }
  }
});


const userSignOutMockToFail = jest.fn().mockReturnValue({
  currentUser: !sampleCurrentUserLoggedIn,
  // signOut: function() { console.log('in mock signout function'); return true; }
  signOut: () => {
    // console.log('in mock signout function');
    if (!sampleCurrentUserLoggedIn) {
      return Promise.resolve(true);
    }
    else {
      // return Promise.reject(false);
      console.log('error on mocked signout');
      return Promise.reject(new Error('error on mocked signout'));
    }
  }
});


describe('authenticate action', () => {
  let store;
  // set up a fake store for all our tests
  beforeEach(() => {
    // store = mockStore({ phoneNumbers: [] });
    store = mockStore({ gathering: {}, auth: {}, game: {} });
  });

  describe('when a user logs out', () => {
    it('fires a signout request action', () => {
      const gathering = { leave: jest.fn(), };
      firebase.auth = userSignOutMock;
      // const gathering = { leave: jest.fn(() => Promise.resolve(true)) };
      // const gathering = { leave: jest.fn(() => ({})), };
      store
        .dispatch(signOut({ gathering }))
        // .dispatch(login(
        //   { username: 'user', password: 'pass' },
        //   mockServiceCreator(REQUIRED_BODY),
        //   mockServiceCreator('XENA'),
        // ))
        .then(() => {
          // console.log('store.getActions()', store.getActions());
          // expect(store.getActions()).toContainEqual({ type: 'SIGNOUT_REQUEST' });
          expect(store.getActions()).toContainEqual({ type: userActions.SIGNOUT_REQUEST });
          expect(store.getActions()).toContainEqual({ type: gatheringActions.LEAVE_GATHERING });
          expect(store.getActions()).toContainEqual({ type: userActions.SIGNOUT_SUCCESSFUL });
          // expect(store.getActions()).toContainEqual({ type: 'SIGNOUT_SUCCESSFUL' });
          // expect(store.getActions()).toContainEqual({ type: 'SIGNOUT_SUCCESSFUL' });
          // expect(store.getActions()).toContain({ type: LEAVE_GATHERING });
          expect(gathering.leave).toHaveBeenCalled();
          //   expect(next).toHaveBeenCalledWith(action);
        });
    });

    it('also fires a LEAVE_GATHERING action request', () => {
      const gathering = { leave: jest.fn(), };
      firebase.auth = userSignOutMock;
      store.dispatch(signOut({ gathering }))
        .then(() => {
          expect(store.getActions()).toContainEqual({ type: userActions.SIGNOUT_REQUEST });
          expect(store.getActions()).toContainEqual({ type: gatheringActions.LEAVE_GATHERING });
          expect(store.getActions()).toContainEqual({ type: userActions.SIGNOUT_SUCCESSFUL });
          expect(gathering.leave).toHaveBeenCalled();
        });
    });

    it('also fires a SIGNOUT_ERROR action when failed', () => {
      const gathering = { leave: jest.fn(), };
      firebase.auth = userSignOutMockToFail;
      store.dispatch(signOut({ gathering }))
        .then(() => {
          // expect(store.getActions()).toContainEqual({ type: userActions.SIGNOUT_REQUEST });
          expect(store.getActions()).toContainEqual({ type: userActions.SIGNOUT_ERROR, payload: 'error on signout' });
          // expect(store.getActions()).toContainEqual({ type: gatheringActions.LEAVE_GATHERING });
          // expect(store.getActions()).toContainEqual({ type: userActions.SIGNOUT_SUCCESSFUL });
          // expect(gathering.leave).toHaveBeenCalled();
        });
    });

    // describe('when login succeeds and OTP is required', () => {
    //   beforeEach(() =>
    //     store.dispatch(login(
    //       { username: 'user', password: 'pass' },
    //       mockServiceCreator(REQUIRED_BODY),
    //     )));

    //   it('dispatches action to store phone numbers and updates the route', () => {
    //     const actions = store.getActions();
    //     const { phoneNumbers } = REQUIRED_BODY;
    //     expect(actions).toContainEqual({
    //       type: ACTION_STORE_PHONE_NUMBERS,
    //       payload: { phoneNumbers },
    //     });
    //     expect(actions).toContainEqual(push('/select-otp-delivery'));
    //   });
    // });
  });
});

// const thunk = ({ dispatch, getState }) => next => action => {
//   // console.log('in fake thunk middleware');
//   if (typeof action === 'function') {
//     // console.log('action is function:', action.toString());
//     return action(dispatch, getState);
//   }
//   // console.log('action was not function, action:', action);
//   return next(action);
// };


// const create = () => {
//   // console.log('in fake create');
//   const store = {
//     getState: jest.fn(() => ({})),
//     dispatch: jest.fn()
//   };
//   const next = jest.fn();

//   const invoke = action => thunk(store)(next)(action);
//   // console.log('store:', store, 'next:', next, 'invoke:', invoke);
//   return { store, next, invoke };
// };

// const sampleUser = {
//   displayName: "Joseph Semlak",
//   email: "seml@blah.edu",
//   emailVerified: true,
//   isAnonymous: false,
//   photoURL: "https://lh5.googleusercontent.com/-_w_poSLrAaE/AAAAAAAAAAI/AAAAAAAAAAA/AGDgw-hV44bGwICl_R0v9U_uCYDfZzgaWA/mo/photo.jpg",
//   u: "rps-game-d93c5.firebaseapp.com",
//   uid: "pJa4qrIO46YoGMXUfvj9VFllz142",
// };

// authRef.onAuthStateChanged = f => {
//   // console.log('in mocked onAuthStateChanged, returning sampleUser', sampleUser);
//   return f(sampleUser);
// };


// const onAuthStateChanged = jest.fn();
// const onAuthStateChanged = jest.fn(() => {
//   // console.log('running mocked onAuthStateChanged function');
//   return Promise.resolve({
//     user: sampleUser
//   })
// });

// const getRedirectResult = jest.fn(() => {
//   return Promise.resolve({
//     user: {
//       displayName: 'redirectResultTestDisplayName',
//       email: 'redirectTest@test.com',
//       emailVerified: true
//     }
//   });
// });

// const sendEmailVerification = jest.fn(() => {
//   return Promise.resolve('result of sendEmailVerification')
// });

// const sendPasswordResetEmail = jest.fn(() => Promise.resolve());

// const createUserWithEmailAndPassword = jest.fn(() => {
//   return Promise.resolve('result of createUserWithEmailAndPassword');
// });

// const signInWithEmailAndPassword = jest.fn(() => {
//   return Promise.resolve('result of signInWithEmailAndPassword');
// });

// const signInWithRedirect = jest.fn(() => {
//   return Promise.resolve('result of signInWithRedirect');
// });

// const initializeApp = jest
//   .spyOn(firebase, 'initializeApp')
//   .mockImplementation(() => {
//     return {
//       auth: () => {
//         return {
//           createUserWithEmailAndPassword,
//           signInWithEmailAndPassword,
//           currentUser: {
//             sendEmailVerification
//           },
//           signInWithRedirect
//         };
//       }
//     };
//   });

// jest.spyOn(firebase, 'auth').mockImplementation(() => {
//   // jest.spyOn(authRef, 'auth').mockImplementation(() => {
//   // console.log('in spyOn calback');
//   return {
//     onAuthStateChanged,
//     currentUser: sampleUser
//     // currentUser: {
//     //   displayName: 'testDisplayName',
//     //   email: 'test@test.com',
//     //   emailVerified: true
//     // },
//     // getRedirectResult,
//     // sendPasswordResetEmail
//   };
// });


// jest.spyOn(authRef, 'onAuthStateChanged').mockImplementation(() => {
//   console.log('in spyOn calback');
//   return {
//     currentUser: sampleUser
//     // currentUser: {
//     //   displayName: 'testDisplayName',
//     //   email: 'test@test.com',
//     //   emailVerified: true
//     // },
//     // getRedirectResult,
//     // sendPasswordResetEmail
//   };
// });


// let sampleCurrentUserLoggedIn = true;
// firebase.auth = jest.fn().mockReturnValue({
//   currentUser: sampleCurrentUserLoggedIn,
//   // signOut: function() { console.log('in mock signout function'); return true; }
//   signOut: () => {
//     // console.log('in mock signout function');
//     if (sampleCurrentUserLoggedIn) {
//       return Promise.resolve(true);
//     }
//     else {
//       return Promise.reject(false);
//     }
//   }
// });


// authRef = jest.fn().mockReturnValue({
//   currentUser: true,
//   signOut: function() { console.log('in mock signout function'); return true; }
// });

// firebase.auth.FacebookAuthProvider = jest.fn(() => {})
// firebase.auth.GoogleAuthProvider = jest.fn(() => {})


// it('passes through non-function action', () => {
//   const { next, invoke } = create();
//   const action = { type: 'TEST' };
//   invoke(action);
//   expect(next).toHaveBeenCalledWith(action);
// });

// it('calls the function', () => {
//   const { invoke } = create();
//   const fn = jest.fn();
//   invoke(fn);
//   expect(fn).toHaveBeenCalled();
// });

// it('passes dispatch and getState', () => {
//   const { store, invoke } = create();
//   invoke((dispatch, getState) => {
//     dispatch('TEST DISPATCH');
//     getState();
//   });
//   expect(store.dispatch).toHaveBeenCalledWith('TEST DISPATCH');
//   expect(store.getState).toHaveBeenCalled();
// });

describe('user actions', () => {
  describe('fetch user', () => {
    it('should run', () => {
      expect(true);
    });
    // it('should handle fetchUser action', () => {
    //   const { next, invoke } = create();
    //   // const action = { type: 'FETCH_USER' };
    //   const action = {
    //     type: FETCH_USER,
    //     payload: sampleUser
    //     // payload: { gameUID: sampleGameKey }
    //   };
    //   invoke(action);
    //   // expect(invoke).toHaveBeenCalledWith(action);
    //   expect(next).toHaveBeenCalledWith(action);
  });
});
