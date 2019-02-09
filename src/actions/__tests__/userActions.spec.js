import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import {
  // fetchUser,
  signOut,
  loginUserWithEmailPassword,
  registerUserAction,
  // handleSignOut,
} from '../../actions/user';


import {
  // LEAVE_GATHERING,
  // FETCH_USER,
  // FETCH_PLAYERS,
  // JOIN_GATHERING,
  userActions,
  gatheringActions,
  modalActions,
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


const sampleUserArtie = {
  displayName: "Artie Kalmes",
  email: "artie@gmail.com",
  emailVerified: true,
  isAnonymous: false,
  photoURL: "https://lh5.googleusercontent.com/-_w_poSLrAaE/AAAAAAAAAAI/AAAAAAAAAAA/ACevoQNXBcWTnhNUiEIZy6h_xNPoZbNC9Q/mo/photo.jpg",
  u: "rps-game-d93c5.firebaseapp.com",
  uid: "pJa4qrIO46YoGMXUfvj9VFllz142",
};

const fakeCredetials = { email: 'artie@gmail.com', password: '12345678', username: 'Artie Kalmes' };

const googleSignInMockResult = {
  additionalUserInfo: {
    isNewUser: false,
    profile: {
      email: "artie@gmail.com",
      family_name: "Kalmes",
      given_name: "Artie",
      hd: "gmail.com",
      id: "111058114021360340494",
      link: "https://plus.google.com/111058114021360340494",
      locale: "en",
      name: "Artie Kalmes",
      picture: "https://lh5.googleusercontent.com/-_w_poSLrAaE/AAAAAAAAAAI/AAAAAAAAAAA/ACevoQNXBcWTnhNUiEIZy6h_xNPoZbNC9Q/mo/photo.jpg",
      verified_email: true,
    },
    providerId: "google.com",
  },
  operationType: "signIn",
  user: sampleUserArtie,
};

const emailPasswordSignInMockResult = {
  operationType: "signIn",
  additionalUserInfo: {
    isNewUser: false,
    providerId: "password",
  },
  credential: null,
  user: sampleUserArtie,
};

const emailPasswordRegistrationMockResult = {
  ...emailPasswordSignInMockResult,
  additionalUserInfo: {
    ...emailPasswordSignInMockResult.additionalUserInfo,
    isNewUser: true,
  }
};


const mockSignout = () => {
  // console.log('in mock signout function');
  if (sampleCurrentUserLoggedIn) {
    return Promise.resolve(true);
  }
  else {
    // return Promise.reject(false);
    console.log('error on mocked signout');
    return Promise.reject(new Error('error on mocked signout'));
  }
};


const userSignOutMock = jest.fn().mockReturnValue({
  currentUser: sampleCurrentUserLoggedIn,
  // signOut: function() { console.log('in mock signout function'); return true; }
  signOut: mockSignout,
});

const mockLoginUserWithEmailPasswordError = {
  // code: "auth/wrong-password",
  message: "The password is invalid or the user does not have a password.",
};


const mockRegisterUserWithEmailPasswordError = {
  message: "The email address is already in use by another account.",
};


const loginUserWithEmailPasswordMock = () => jest.fn().mockReturnValue({
  // signInWithEmailAndPassword: jest.fn((email, password) => Promise.resolve(true)),
  signInWithEmailAndPassword: jest.fn((email, password) => {
    // return Promise.resolve(true);
    // console.log('email', email, 'password', password);
    if (email === fakeCredetials.email && password === fakeCredetials.password) {
      return Promise.resolve(true);
    }
    else {
      return Promise.reject(new Error(mockLoginUserWithEmailPasswordError.message));
    }
  }),
  createUserWithEmailAndPassword: jest.fn((email, password) => {
    // return Promise.resolve(true);
    // console.log('email', email, 'password', password);
    if (email === fakeCredetials.email && password === fakeCredetials.password) {
      return Promise.resolve(emailPasswordRegistrationMockResult);
    }
    else {
      return Promise.reject(new Error(mockRegisterUserWithEmailPasswordError.message));
    }
  }),
  // signInWithEmailAndPassword: (email, password) => {
  //   // return Promise.resolve(emailPasswordSignInMockResult);
  //   return Promise.resolve(true);
  // },
  // currentUser: sampleCurrentUserLoggedIn,
  onAuthStateChanged: jest.fn(() => {
    // console.log('running mocked onAuthStateChanged function');
    return Promise.resolve({
      user: sampleUserArtie,
    });
  }),
  currentUser: ({
    updateProfile: jest.fn(() => Promise.resolve(true)),
  }),
  signOut: mockSignout,
});

// const registerUserWithEmailPasswordMock = jest.fn().mockReturnValue({
//   // signInWithEmailAndPassword: jest.fn((email, password) => Promise.resolve(true)),
//   createUserWithEmailAndPassword: jest.fn((email, password) => {
//     // return Promise.resolve(true);
//     // console.log('email', email, 'password', password);
//     if (email === fakeCredetials.email && password === fakeCredetials.password) {
//       return Promise.resolve(true);
//     }
//     else {
//       return Promise.reject(new Error(mockRegisterUserWithEmailPasswordError.message));
//     }
//   }),
//   // signInWithEmailAndPassword: (email, password) => {
//   //   // return Promise.resolve(emailPasswordSignInMockResult);
//   //   return Promise.resolve(true);
//   // },
//   currentUser: sampleCurrentUserLoggedIn,
//   signOut: mockSignout,
// });


// const loginUserWithEmailPasswordFailMock = jest.fn().mockReturnValue({
//   signInWithEmailAndPassword: jest.fn((email, password) => Promise.resolve(mockLoginUserWithEmailPasswordError)),
//   // signInWithEmailAndPassword: (email, password) => {
//   //   // return Promise.resolve(emailPasswordSignInMockResult);
//   //   return Promise.resolve(true);
//   // },
//   currentUser: sampleCurrentUserLoggedIn,
//   signOut: mockSignout,
// });

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
    it('fires a signOut request action', () => {
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

  describe('when a user logs in with email and password', () => {
    beforeEach(() => {
      // store = mockStore({ phoneNumbers: [] });
      firebase.auth = loginUserWithEmailPasswordMock();
    });

    it('fires EMAIL_PASSWORD_LOGIN_ATTEMPT signal', () => {
      // firebase.auth = loginUserWithEmailPasswordMock;
      // const gathering = { leave: jest.fn(() => Promise.resolve(true)) };
      // const gathering = { leave: jest.fn(() => ({})), };
      store
        .dispatch(loginUserWithEmailPassword(fakeCredetials))
        .then(() => {
          // console.log('store.getActions()', store.getActions());
          // expect(store.getActions()).toContainEqual({ type: 'SIGNOUT_REQUEST' });
          expect(store.getActions()).toContainEqual({ type: userActions.EMAIL_PASSWORD_LOGIN_ATTEMPT });
          // expect(gathering.leave).toHaveBeenCalled();
          //   expect(next).toHaveBeenCalledWith(action);
        })
        .catch(err => expect(err).toBeFalsy());
    });
    it('calls the signInWithEmailAndPassword function of firebase.auth()', () => {
      // firebase.auth = loginUserWithEmailPasswordMock;
      store
        .dispatch(loginUserWithEmailPassword(fakeCredetials))
        .then(() => {
          // console.log('store.getActions()', store.getActions());
          expect(store.getActions()).toContainEqual({ type: userActions.EMAIL_PASSWORD_LOGIN_ATTEMPT });
          expect(firebase.auth().signInWithEmailAndPassword).toHaveBeenCalled();
          const { email, password } = fakeCredetials;
          expect(firebase.auth().signInWithEmailAndPassword).toHaveBeenCalledWith(email, password);
        })
        .catch(err => expect(err).toBeFalsy());
    });
    it('fires EMAIL_PASSWORD_LOGIN_SUCCESS and modalActions.CLOSE_AUTHENTICATION_MODAL for successful login', () => {
      // firebase.auth = loginUserWithEmailPasswordMock;
      store
        .dispatch(loginUserWithEmailPassword(fakeCredetials))
        .then(() => {
          expect(store.getActions()).toContainEqual({ type: userActions.EMAIL_PASSWORD_LOGIN_SUCCESS });
          expect(store.getActions()).toContainEqual({ type: modalActions.CLOSE_AUTHENTICATION_MODAL });
        })
        .catch(err => expect(err).toBeFalsy());
    });
    it('fires EMAIL_PASSWORD_LOGIN_FAIL for failed login', () => {
      // firebase.auth = loginUserWithEmailPasswordMock;
      const badCredentials = { ...fakeCredetials, password: '12345' };
      // const gathering = { leave: jest.fn(() => Promise.resolve(true)) };
      // const gathering = { leave: jest.fn(() => ({})), };
      store
        .dispatch(loginUserWithEmailPassword(badCredentials))
        .then(() => {
          // console.log('store.getActions()!!!', store.getActions());
          expect(store.getActions()).toContainEqual({ type: userActions.EMAIL_PASSWORD_LOGIN_FAIL, payload: { message: mockLoginUserWithEmailPasswordError.message } });
        });
    });
  });


  describe('when a user registeres with email and password', () => {
    beforeEach(() => {
      firebase.auth = loginUserWithEmailPasswordMock();
    });
    it('fires EMAIL_PASSWORD_REGISTRATION_ATTEMPT signal', () => {
      // const gathering = { leave: jest.fn(() => Promise.resolve(true)) };
      // const gathering = { leave: jest.fn(() => ({})), };
      store
        .dispatch(registerUserAction(fakeCredetials))
        .then(() => {
          // console.log('store.getActions()', store.getActions());
          // expect(store.getActions()).toContainEqual({ type: 'SIGNOUT_REQUEST' });
          expect(store.getActions()).toContainEqual({ type: userActions.EMAIL_PASSWORD_REGISTRATION_ATTEMPT });
          // expect(gathering.leave).toHaveBeenCalled();
          //   expect(next).toHaveBeenCalledWith(action);
        })
        .catch(err => expect(err).toBeFalsy());
    });
    it('calls the createUserWithEmailAndPassword function of firebase.auth()', () => {
      store
        .dispatch(registerUserAction(fakeCredetials))
        .then(() => {
          // console.log('store.getActions()', store.getActions());
          expect(store.getActions()).toContainEqual({ type: userActions.EMAIL_PASSWORD_REGISTRATION_ATTEMPT });
          expect(firebase.auth().createUserWithEmailAndPassword).toHaveBeenCalled();
          const { email, password } = fakeCredetials;
          expect(firebase.auth().createUserWithEmailAndPassword).toHaveBeenCalledWith(email, password);
        })
        .catch(err => expect(err).toBeFalsy());
    });
    it('fires EMAIL_PASSWORD_REGISTRATION_SUCCESS and modalActions.CLOSE_AUTHENTICATION_MODAL for successful login', () => {
      store
        .dispatch(registerUserAction(fakeCredetials))
        .then(() => {
          expect(store.getActions()).toContainEqual({ type: userActions.EMAIL_PASSWORD_REGISTRATION_SUCCESS });
          expect(store.getActions()).toContainEqual({ type: modalActions.CLOSE_AUTHENTICATION_MODAL });
          // console.log('firebase.auth().currentUser', firebase.auth().currentUser);
          expect(firebase.auth().currentUser.updateProfile).toHaveBeenCalled();
        })
        .catch(err => expect(err).toBeFalsy());
    });
    it('fires EMAIL_PASSWORD_REGISTRATION_FAIL for failed login', () => {
    //   firebase.auth = loginUserWithEmailPasswordMock;
      const badCredentials = { ...fakeCredetials, password: '1' };
      // const gathering = { leave: jest.fn(() => Promise.resolve(true)) };
      // const gathering = { leave: jest.fn(() => ({})), };
      store
        .dispatch(registerUserAction(badCredentials))
        .then(() => {
          // console.log('store.getActions()!!!', store.getActions());
          expect(store.getActions()).toContainEqual({ type: userActions.EMAIL_PASSWORD_REGISTRATION_FAIL, payload: { message: mockRegisterUserWithEmailPasswordError.message } });
        });
    });


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

// describe('user actions', () => {
//   // this doesn't work because fetch user doesn't create an action, it just creates a firebase listener, which when fired creates an action.
//   let store;
//   // set up a fake store for all our tests
//   beforeEach(() => {
//     // store = mockStore({ phoneNumbers: [] });
//     store = mockStore({ gathering: {}, auth: {}, game: {} });
//     firebase.auth = loginUserWithEmailPasswordMock();
//   });
//   describe('fetch user', () => {
//     it('should run', () => {
//       expect(true);
//     });
//     it('should handle fetchUser action', () => {
//       // const { next, invoke } = create();
//       // const action = { type: 'FETCH_USER' };
//       const expectedAction = {
//         type: userActions.FETCH_USER,
//         payload: sampleUserArtie,
//         // payload: { gameUID: sampleGameKey }
//       };
//       // invoke(action);
//       store
//         .dispatch(fetchUser())
//         .then(() => {
//           expect(store.getActions()).toContainEqual(expectedAction);
//         })
//         .catch(err => expect(err).toBeFalsy());
//       // expect(invoke).toHaveBeenCalledWith(action);
//       // expect(next).toHaveBeenCalledWith(action);
//     });
//   });
// });
