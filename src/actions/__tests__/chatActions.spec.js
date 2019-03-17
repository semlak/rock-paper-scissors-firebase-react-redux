import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import {
  updateMessages,
  sendMessage,
  updatePlayerStatus,
  updateOpponentStatus,
} from '../../actions/chatActions';

import {
  chatActions,
} from '../types';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const some_messages = [{
  direction: 'incoming',
  timestamp: 1528559880000,
  text: "Test which is a new approach to have all solutions",
  imgSrc: "https://ptetutorials.com/images/user-profile.png",
  name: "sunil",
}, {
  direction: 'outgoing',
  timestamp: 1528560000000,
  text: "Test which is a new approach to have all solutions",
  // imgSrc: "https://ptetutorials.com/images/user-profile.png",
  name: "xena",
}, {
  direction: 'incoming',
  timestamp: 1528559880000,
  text: "So does Artie.",
  imgSrc: "https://ptetutorials.com/images/user-profile.png",
  name: "sunil",
}, {
  direction: 'outgoing',
  timestamp: 1528556460000,
  text: "Gus says hi.",
  // imgSrc: "https://ptetutorials.com/images/user-profile.png",
  name: "xena",
}, {
  direction: 'incoming',
  timestamp: 1528555620000,
  text: "We work directly with our designers and suppliers, and sell direct to you, which means quality, exclusive products, at a price anyone can afford.",
  imgSrc: "https://ptetutorials.com/images/user-profile.png",
  name: "sunil",
}];

describe('chat actions', () => {
  let store;
  // set up a fake store for all our tests
  beforeEach(() => {
    // store = mockStore({ phoneNumbers: [] });
    store = mockStore({ gathering: {}, auth: {}, game: {}, modals: {}, chat: {} });
  });

  describe('update messages', () => {
    it('should create an action to update messages', () => {
      const expectedAction = {
        type: chatActions.UPDATE_MESSAGES,
        payload: {
          messages: some_messages,
        },
      };
      // expect(1).toEqual(1);
      expect(store.getActions()).not.toContainEqual(expectedAction);
      store.dispatch(updateMessages(some_messages));
      expect(store.getActions()).toContainEqual(expectedAction);
    });
  });

  describe('send message', () => {
    it('should dispatch action that message is in process', () => {
      const expectedAction = {
        type: chatActions.SEND_MESSAGE,
        payload: {
          message: 'Hello, world!',
        },
      };
      expect(store.getActions()).not.toContainEqual(expectedAction);
      store.dispatch(sendMessage({ message: expectedAction.payload.message }));
      expect(store.getActions()).toContainEqual(expectedAction);
    });
    it('should dispatch action that message is no longer in process', () => {
      const expectedAction = {
        type: chatActions.SEND_MESSAGE,
        payload: {
          message: 'Hello, world!',
        },
      };
      expect(store.getActions()).not.toContainEqual(expectedAction);
      store.dispatch(sendMessage({ message: expectedAction.payload.message }));
      expect(store.getActions()).toContainEqual(expectedAction);
      const nextExpectedAction = {
        type: chatActions.SEND_MESSAGE,
        payload: null,
      };
      expect(store.getActions()).not.toContainEqual(nextExpectedAction);
      store.dispatch(sendMessage({}));
      expect(store.getActions()).toContainEqual(nextExpectedAction);
    });
  });

  describe(chatActions.USER_IS_TYPING, () => {
    it('should dispatch action that user is typing', () => {
      const expectedAction = {
        type: chatActions.USER_IS_TYPING,
        payload: true,
      };
      expect(store.getActions()).not.toContainEqual(expectedAction);
      store.dispatch(updatePlayerStatus({ userIsTyping: true }));
      expect(store.getActions()).toContainEqual(expectedAction);
      const otherExpectedAction = {
        type: chatActions.USER_IS_TYPING,
        payload: false,
      };
      expect(store.getActions()).not.toContainEqual(otherExpectedAction);
      store.dispatch(updatePlayerStatus({ userIsTyping: false }));
      expect(store.getActions()).toContainEqual(otherExpectedAction);
    });
  });

  describe(chatActions.OPPONENT_IS_TYPING, () => {
    it('should update application that opponent is typing chat message', () => {
      const expectedAction = {
        type: chatActions.OPPONENT_IS_TYPING,
        payload: true,
      };
      expect(store.getActions()).not.toContainEqual(expectedAction);
      store.dispatch(updateOpponentStatus({ opponentIsTyping: true }));
      expect(store.getActions()).toContainEqual(expectedAction);
    });
    it('should update application that opponent is no longer typing', () => {
      const expectedAction = {
        type: chatActions.OPPONENT_IS_TYPING,
        payload: true,
      };
      store.dispatch(updateOpponentStatus({ opponentIsTyping: true }));
      expect(store.getActions()).toContainEqual(expectedAction);
      const nextExpectedAction = {
        type: chatActions.OPPONENT_IS_TYPING,
        payload: false,
      };
      expect(store.getActions()).not.toContainEqual(nextExpectedAction);
      store.dispatch(updateOpponentStatus({ opponentIsTyping: false }));
      expect(store.getActions()).toContainEqual(nextExpectedAction);

    });
  });

});
