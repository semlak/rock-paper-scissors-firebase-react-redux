// import { FETCH_USER } from '../actions/types';
// import { userActions } from '../actions/types';
import { chatActions } from '../actions/types';

// export default (state = false, action) => {
const defaultState = {
  messages: [],
  userStatus: {
    isTyping: false
  },
  opponentStatus: {
    isTyping: false,
  },
  sendingMessage: false,
};

export default (state = defaultState, action) => {
  // console.log('in auth reducer, state:', state, 'action:', action);
  // if (Object.keys(chatActions).indexOf(action.type) > -1) {
  //   console.log('in auth reducer, state:', state, 'action:', action);
  // }
  switch (action.type) {
    case chatActions.UPDATE_MESSAGES:
      return { ...state, messages: action.payload.messages };
    case chatActions.OPPONENT_IS_TYPING:
      return { ...state, opponentStatus: { ...state.opponentStatus, isTyping: action.payload } };
    case chatActions.USER_IS_TYPING:
      return { ...state, userStatus: { ...state.userStatus, isTyping: action.payload } };
    case chatActions.SEND_MESSAGE:
      return { ...state, sendingMessage: !!(action.payload && action.payload.message) };
    default:
      return state;
  }
};
