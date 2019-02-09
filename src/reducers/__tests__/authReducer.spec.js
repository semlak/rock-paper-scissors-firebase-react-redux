import {
  userActions,
} from "../../actions/types";

import AuthReducer from '../../reducers/authReducer';

// import {  
//   openAuthenticationModal,
// } from '../../actions/userActions';

const initialState = undefined;


const sampleUserArtie = {
  displayName: "Artie Kalmas",
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


const fetchUserAction = {
  type: userActions.FETCH_USER,
  payload: googleSignInMockResult,
};

const emailPasswordLoginAttemptAction = {
  type: userActions.EMAIL_PASSWORD_LOGIN_ATTEMPT,
};

const emailPasswordLoginSuccessAction = {
  type: userActions.EMAIL_PASSWORD_LOGIN_SUCCESS,
};


const emailPasswordLoginFailAction = {
  type: userActions.EMAIL_PASSWORD_LOGIN_FAIL,
  payload: { message: "The password is invalid or the user does not have a password." },
};

const emailPasswordRegistrationAttemptAction = {
  type: userActions.EMAIL_PASSWORD_REGISTRATION_ATTEMPT,
};

const emailPasswordRegistrationSuccessAction = {
  type: userActions.EMAIL_PASSWORD_REGISTRATION_SUCCESS,
};


const emailPasswordRegistrationFailAction = {
  type: userActions.EMAIL_PASSWORD_REGISTRATION_FAIL,
  payload: { message: "The email address is already in use by another account." }
};



describe('authReducer', () => {
  describe('initial state', () => {
    it('should be falsy', () => {
      // const initialState = undefined;
      const unrelatedAction = { type: "LKjasfdklj" };
      // the meaningless action type just means that it is not a relevant user action.
      const newState = AuthReducer(initialState, unrelatedAction);
      // const newState1 = AuthReducer({}, unrelatedAction);
      // console.log('newState', newState);
      // expect(newState.gameKey).toBeNull();
      expect(newState).toBeNull();
      // expect(newState).toMatchObject({});
      // expect(newState.gameStatus).toEqual(gameStatuses.NO_GAME);
    });
  });
  describe(userActions.FETCH_USER, () => {
    it('should result in having onlineUser when signed in', () => {
      const newState = AuthReducer({}, fetchUserAction);
      expect(newState).toBeTruthy();
      expect(newState).toMatchObject(fetchUserAction.payload);
    });
    it('should result in having null onlineUser when signed out', () => {
      const newState = AuthReducer({}, { ...fetchUserAction, payload: null });
      expect(newState).toBeNull();
    });
  });
  describe(userActions.EMAIL_PASSWORD_LOGIN_ATTEMPT, () => {
    it('should register EMAIL_PASSWORD_LOGIN_ATTEMPT', () => {
      const unrelatedAction = { type: "LKjasfdklj" };
      const newState = AuthReducer(initialState, unrelatedAction);
      expect(newState).toBeNull();
    });
  });
  // describe(userActions.CLOSE_AUTHENTICATION_MODAL, () => {
  //   it('should set authenticationModalOpen to false', () => {
  //     const openState = AuthReducer(initialState, openModalAction);
  //     const newState = AuthReducer(openState, closeModalAction);
  //     expect(newState.authenticationModalOpen).toBeFalsy();
  //   });
  // });
  // describe(userActions.TOGGLE_AUTHENTICATION_MODAL, () => {
  //   it('should toggle open authentication modal to closed, and from closed to open', () => {
  //     const openState = AuthReducer(initialState, openModalAction);
  //     const newState = AuthReducer(openState, toggleModalAction);
  //     const newState1 = AuthReducer(newState, toggleModalAction);
  //     expect(newState.authenticationModalOpen).toBeFalsy();
  //     expect(newState1.authenticationModalOpen).toBeTruthy();
  //   });
  // });
});
