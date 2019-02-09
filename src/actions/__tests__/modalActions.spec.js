import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

// import GameActions from '../../actions/game';
import {
  openAuthenticationModal,
  closeAuthenticationModal,
  toggleAuthenticationModal,
} from '../../actions/modalActions';

import {
  // GAME_REQUESTED,
  // GAME_CREATED,
  // GAME_STARTED,
  // MAKE_PLAY,
  // PLAY_RECEIVED,
  // GAME_ENDED,
  modalActions,
} from '../types';

// refs.games

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);


describe('modal actions', () => {
  let store;
  // set up a fake store for all our tests
  beforeEach(() => {
    // store = mockStore({ phoneNumbers: [] });
    store = mockStore({ gathering: {}, auth: {}, game: {}, modals: {} });
  });

  describe('openAuthenticationModal', () => {
    it('should create an action to open modal', () => {
      const expectedAction = {
        type: modalActions.OPEN_AUTHENTICATION_MODAL,
      };
      // expect(1).toEqual(1);
      store.dispatch(openAuthenticationModal());
      expect(store.getActions()).toContainEqual(expectedAction);
    });
  });

  describe('closeAuthenticationModal', () => {
    it('should create an action to close modal', () => {
      const expectedAction = {
        type: modalActions.CLOSE_AUTHENTICATION_MODAL,
      };
      // expect(1).toEqual(1);
      store.dispatch(closeAuthenticationModal());
      expect(store.getActions()).toContainEqual(expectedAction);
    });
  });

  describe('toggleAuthenticationModal', () => {
    it('should create an action to toggle modal', () => {
      const expectedAction = {
        type: modalActions.TOGGLE_AUTHENTICATION_MODAL,
      };
      // expect(1).toEqual(1);
      store.dispatch(toggleAuthenticationModal());
      expect(store.getActions()).toContainEqual(expectedAction);
    });
  });
});
