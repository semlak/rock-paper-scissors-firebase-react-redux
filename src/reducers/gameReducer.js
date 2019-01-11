import {
  // GAME_CREATED,
  // GAME_STARTED,
  // GAME_ENDED,
  // MAKE_PLAY,
  // PLAY_RECEIVED,
  gameActions,
} from "../actions/types";
import gameStatuses from '../gameStatuses';

const getGameStateAfterPlayMade = (state, actionPayload) => {
  const { gameStatus } = state;
  const newGameStatus = gameStatus === gameStatuses.OPPONENT_PLAY_WAITING_FOR_USER ? gameStatuses.DETERMINING_ROUND_WINNER : gameStatuses.PLAY_MADE_WAITING_FOR_OPPONENT;
  const newState = { ...state, gameStatus: newGameStatus, playerPlay: actionPayload.playerAction };
  console.log('returning newState', newState);
  return newState;
};

const getGameStateAfterPlayReceived = (state, actionPayload) => {
  const { gameStatus } = state;
  const newGameStatus = gameStatus === gameStatuses.PLAY_MADE_WAITING_FOR_OPPONENT ? gameStatuses.DETERMINING_ROUND_WINNER : gameStatuses.OPPONENT_PLAY_WAITING_FOR_USER;
  const newState = { ...state, gameStatus: newGameStatus, playerPlay: actionPayload.playerAction };
  console.log('returning newState', newState);
  return newState;
};

// export default (state = { gameStatus: gameStatuses.GAME_STARTED }, action) => {
export default (state = { gameStatus: gameStatuses.NO_GAME }, action) => {
  // if ([GAME_CREATED, GAME_STARTED, GAME_ENDED, MAKE_PLAY, PLAY_RECEIVED].indexOf(action.type) > -1) {
  // if ([GAME_STARTED, GAME_ENDED, MAKE_PLAY, PLAY_RECEIVED].indexOf(action.type) > -1) {
  //   console.log('received game action dispatch in gameReducer, state:', state, 'action', action);
  // }
  switch (action.type) {
    // case GAME_CREATED:
    //   // GAME_CREATED is signaled after creation of game. It is separate from the GAME_STARTED signal that listens for every game created and signals if the user is one of the players for that game
    //   console.log('detected GAME_CREATED');
    //   return state;
    //   // return action.payload;
    case gameActions.GAME_STARTED:
      // console.log('detected GAME_STARTED');
      return { ...state, gameKey: action.payload.gameKey, gameData: action.payload.gameData, gameStatus: gameStatuses.GAME_STARTED };
    //   return action.payload;
    case gameActions.GAME_ENDED:
      return { ...state, gameKey: null, gameData: null, gameStatus: gameStatuses.GAME_ENDED };
    case gameActions.MAKE_PLAY:
      console.log('detected MAKE_PLAY, action', action);
      // return state;
      // return { ...state, gameStatus: gameStatus.
      return getGameStateAfterPlayMade(state, action.payload);
    case gameActions.PLAY_RECEIVED:
      console.log('deteced PLAY_RECEIVED, action', action);
      // return state;
      return getGameStateAfterPlayReceived(state, action.payload);
    default:
      return state;
  }
};
