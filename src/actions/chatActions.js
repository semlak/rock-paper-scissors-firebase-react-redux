// import firebase from '../firebase';
import firebase, { refs } from '../firebase';
import { chatActions } from './types';

export const GamesRefChild = (childRef) => firebase.database().ref(`${refs.games}/${childRef}`);

// sendMessageThroughFirebase = ({ message, gameUID, playerUID, }) => (dispatch) => {
const sendMessageThroughFirebase = ({ message, gameUID, playerUID, }) => {
  const chatRef = GamesRefChild(`${gameUID}/chat/messages`);
  return chatRef.push({
    message,
    playerUID,
    timestamp: firebase.database.ServerValue && firebase.database.ServerValue.TIMESTAMP,
  });
  // chatRef.push({ message, playerUID }).then(() => {
  // });
};

const sendStatusChange = ({ userIsTyping, userUID, gameUID }) => 
  GamesRefChild(`${gameUID}/chat/statuses/${userUID}`).update({ isTyping: userIsTyping });

// called by firebase listener
export const updateMessages = messages => (dispatch) => {
  const messagesToSend = messages != null && messages !== undefined ? messages : {};
  dispatch({
    type: chatActions.UPDATE_MESSAGES,
    payload: {
      messages: messagesToSend,
    }
  });
};

// called by UI, calls firebase update
export const sendMessage = ({ message }) => (dispatch) => {
  // const payload = {};
  let payload = {};
  if (message != null && message !== undefined) {
    payload.message = message;
  }
  else {
    payload = null;
  }
  dispatch({
    type: chatActions.SEND_MESSAGE,
    payload,
    // payload: {
    //   message,
    // },
  });
};


// called by UI, calls firebase update
export const updatePlayerStatus = ({ userIsTyping }) => (dispatch) => {
  dispatch({
    type: chatActions.USER_IS_TYPING,
    payload: userIsTyping,
  });
};

// called by firebase listener
export const updateOpponentStatus = ({ opponentIsTyping }) => (dispatch) => {
  dispatch({
    type: chatActions.OPPONENT_IS_TYPING,
    payload: opponentIsTyping,
  });
};


export const sendMessageFull = ({ message, gameUID, playerUID }) => (dispatch) => {
  // console.log('in sendMessageFull');
  dispatch(sendMessage({ message }));
  sendMessageThroughFirebase({ message, gameUID, playerUID }).then(() => {
    dispatch(sendMessage({}));
  });
};

export const updateStatus = ({ userIsTyping, userUID, gameUID }) => dispatch => {
  // console.log('userIsTyping', userIsTyping, 'userUID', userUID, 'gameUID', gameUID);
  dispatch(updatePlayerStatus({ userIsTyping }));
  sendStatusChange({ userIsTyping, userUID, gameUID });
  // sendStatusChange({ userIsTyping, userUID, gameUID }).then(() => {
  // });
};

export const createChatUpdateListeners = ({ gameUID, opponentUID, }) => dispatch => {
  // console.log('creating message update listener');
  GamesRefChild(`${gameUID}/chat/messages`).on('value', (snapshot) => {
  // chatRef.on('value', (snapshot) => {
    // console.log('received chat messages update, snapshot:', snapshot.val());
    dispatch(updateMessages(snapshot.val()));
  });
  // console.log('opponentUID listening for', opponentUID);
  GamesRefChild(`${gameUID}/chat/statuses/${opponentUID}`).on('value', (snapshot) => {
    // console.log('received opponent chat status update, snapshot:', snapshot.val());
    if (snapshot.val() != null) {
      const { isTyping: opponentIsTyping } = snapshot.val();
      dispatch(updateOpponentStatus({ opponentIsTyping }));
    }
    else {
      dispatch(updateOpponentStatus({ opponentIsTyping: false }));
    }
  });

};
