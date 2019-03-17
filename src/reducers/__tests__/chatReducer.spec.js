import {
  // modalActions,
  chatActions,
} from "../../actions/types";

import ChatReducer from '../../reducers/chatReducer';

// import { chat as ChatReducer } from '../../reducers';

// import {
//   openAuthenticationModal,
// } from '../../actions/modalActions';

const initialState = undefined;


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

const updateMessagesAction = {
  type: chatActions.UPDATE_MESSAGES,
  payload: {
    messages: some_messages,
  }
};

describe('chatReducer', () => {
  describe('initial state', () => {
    it('should have empty array of messages', () => {
      const newState = ChatReducer(undefined, {});
      expect(newState.messages.length).toEqual(0);
    });
    it('should have no status for user or opponent', () => {
      const newState = ChatReducer(undefined, {});
      expect(newState.userStatus).toMatchObject({ isTyping: false });
      // expect(newState.opponentStatus).toMatchObject({});
    });
    it('should have status for opponent of no typing', () => {
      const newState = ChatReducer(undefined, {});
      // expect(newState.userStatus).toMatchObject({});
      expect(newState.opponentStatus).toMatchObject({});
      expect(newState.opponentStatus).toMatchObject({ isTyping: false });
    });
    it('should have initial sendingMessage status set to false', () => {
      const newState = ChatReducer(undefined, {});
      expect(newState.sendingMessage).toEqual(false);
    });
  });

  describe(chatActions.UPDATE_MESSAGES, () => {
    it('should receive updated messages', () => {
      const newState = ChatReducer(undefined, {});
      const updatedState = ChatReducer(newState, updateMessagesAction);
      expect(updatedState.messages.length).toEqual(5);
      expect(updatedState.messages).toMatchObject(updateMessagesAction.payload.messages);
    });
  });

  /* 
  this action is not actually handled by reducer.
  The action sends the message through firebase. A firebase listener received updated messages, and uses the 'UPDATE_MESSAGES' action to send to reducer
  Similar for USER_IS_TYPING action.
  */
  describe(chatActions.SEND_MESSAGE, () => {
    it('should try to send a new message', () => {
      const sendMessageAction = {
        type: chatActions.SEND_MESSAGE,
        payload: {
          message: "Sample message.",
        }
      };
      const newState = ChatReducer(undefined, sendMessageAction);
      expect(newState.sendingMessage).toEqual(true);
    });
  });

  describe(chatActions.OPPONENT_IS_TYPING, () => {
    it('should receive update when opponent is typing', () => {
      const newState = ChatReducer(initialState, { type: chatActions.OPPONENT_IS_TYPING, payload: true });
      expect(newState.opponentStatus.isTyping).toEqual(true);
      const newState1 = ChatReducer(initialState, { type: chatActions.OPPONENT_IS_TYPING, payload: false });
      expect(newState1.opponentStatus.isTyping).toEqual(false);
    });
  });
});
