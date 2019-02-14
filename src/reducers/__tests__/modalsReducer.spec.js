import {
  modalActions,
} from "../../actions/types";
import ModalsReducer from '../../reducers/modalsReducer';

// import {
//   openAuthenticationModal,
// } from '../../actions/modalActions';

const initialState = undefined;

const openModalAction = {
  type: modalActions.OPEN_AUTHENTICATION_MODAL,
};

const closeModalAction = {
  type: modalActions.CLOSE_AUTHENTICATION_MODAL,
};


const toggleModalAction = {
  type: modalActions.TOGGLE_AUTHENTICATION_MODAL,
};

const loginSuccessAction = {
  type: modalActions.MODAL_MESSAGE,
  payload: {
    loginError: false,
    message: 'Login was successful!',
  }
};

const loginFailAction = {
  type: modalActions.MODAL_MESSAGE,
  payload: {
    loginError: true,
    message: 'The password is invalid or the user does not have a password.',
  }
};

const registrationSuccessAction = {
  type: modalActions.MODAL_MESSAGE,
  payload: {
    registrationError: false,
    message: 'Registration was successful!',
  }
};

const registrationFailAction = {
  type: modalActions.MODAL_MESSAGE,
  payload: {
    registrationError: true,
    message: 'The email address is already in use by another account.',
  }
};


describe('modalsReducer', () => {
  describe('initial state', () => {
    it('should not be open', () => {
      // const initialState = undefined;
      const unrelatedAction = { type: "LKjasfdklj" };
      // the meaningless action type just means that it is not a relevant modals action.
      const newState = ModalsReducer(initialState, unrelatedAction);
      const newState1 = ModalsReducer({}, unrelatedAction);
      // console.log('newState', newState);
      // expect(newState.gameKey).toBeNull();
      expect(newState.authenticationModalOpen).toBeFalsy();
      expect(newState1.authenticationModalOpen).toBeFalsy();
      // expect(newState.gameStatus).toEqual(gameStatuses.NO_GAME);
    });
  });
  describe(modalActions.OPEN_AUTHENTICATION_MODAL, () => {
    it('should set authenticationModalOpen to true', () => {
      const newState = ModalsReducer(initialState, openModalAction);
      expect(newState.authenticationModalOpen).toBeTruthy();
    });
  });
  describe(modalActions.CLOSE_AUTHENTICATION_MODAL, () => {
    it('should set authenticationModalOpen to false', () => {
      const openState = ModalsReducer(initialState, openModalAction);
      const newState = ModalsReducer(openState, closeModalAction);
      expect(newState.authenticationModalOpen).toBeFalsy();
    });
  });
  describe(modalActions.TOGGLE_AUTHENTICATION_MODAL, () => {
    it('should toggle open authentication modal to closed, and from closed to open', () => {
      const openState = ModalsReducer(initialState, openModalAction);
      const newState = ModalsReducer(openState, toggleModalAction);
      const newState1 = ModalsReducer(newState, toggleModalAction);
      expect(newState.authenticationModalOpen).toBeFalsy();
      expect(newState1.authenticationModalOpen).toBeTruthy();
    });
  });

  describe(modalActions.MODAL_MESSAGE, () => {
    it('should handle received messages for login or registrations', () => {
      const openState = ModalsReducer(initialState, openModalAction);
      const loginSuccessState = ModalsReducer(openState, loginSuccessAction);
      const loginFailState = ModalsReducer(openState, loginFailAction);
      const registrationSuccessState = ModalsReducer(openState, registrationSuccessAction);
      const registrationFailState = ModalsReducer(openState, registrationFailAction);

      expect(loginSuccessState.loginError).toBe(false);
      expect(loginFailState.loginError).toBe(true);
      expect(registrationSuccessState.registrationError).toBe(false);
      expect(registrationFailState.registrationError).toBe(true);
    });
  });
});
