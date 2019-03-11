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
  // if (actionPayload && actionPayload.status === 'attempted') {
  // console.log('in getGameStateAfterPlayMade, state', state);
  const { gameStatus } = state;
  const newGameStatus = gameStatus === gameStatuses.OPPONENT_PLAY_WAITING_FOR_USER ? gameStatuses.DETERMINING_ROUND_WINNER : gameStatuses.PLAY_MADE_WAITING_FOR_OPPONENT;
  const newState = { ...state, gameStatus: newGameStatus, playerPlay: actionPayload.playerAction };
  // console.log('returning newState', newState);
  return newState;
  // }
  // else {
  //   return state;
  // }
};

const getGameStateAfterPlayReceived = (state, actionPayload) => {
  // console.log('in getGameStateAfterPlayReceived, actionPayload', actionPayload);
  // console.log('in getGameStateAfterPlayReceived, state:', state);
  // const { gameStatus } = state;
  // const newGameStatus = gameStatus === gameStatuses.PLAY_MADE_WAITING_FOR_OPPONENT ? gameStatuses.DETERMINING_ROUND_WINNER : gameStatuses.OPPONENT_PLAY_WAITING_FOR_USER;
  // const newState = { ...state, gameStatus: newGameStatus, playerPlay: actionPayload.playerAction };
  // const { currentGameData } = state;
  const { player1: player1Uid, player2: player2Uid, round, gameInProgress, } = state.gameData;
  const { myUid } = state;
  const { player: player1or2 } = actionPayload;
  const playerUid = player1or2 === 'player1' ? player1Uid : player1or2 === 'player2' ? player2Uid : '';
  // console.log('actionPayload', actionPayload, 'player1Uid', player1Uid, 'player2Uid', player2Uid, playerUid);
  if ((playerUid !== player1Uid && playerUid !== player2Uid) || playerUid === '') {
    // console.log('returning early from getGameStateAfterPlayReceived');
    return state;
  }
  // console.log('not returning early from getGameStateAfterPlayReceived');
  // const 
  // const myUid = 
  // const player1or2 = myUid === player1 ? 'player1' : 'player2';
  
  // console.log('key', key);
  // const { playerUid } = actionPayload;
  // const { myUid, opponentUid } = state;
  // const { myUid, } = state;
  const key = `${actionPayload.player}Actions`;
  const playerActions = state.gameData.round >= actionPayload.playerActions.length ? actionPayload.playerActions : state.gameData[key];
  // const gameData = { ...state.gameData, [key]: actionPayload.playerActions };

  const gameData = { ...state.gameData, [key]: playerActions };
  // const gameData = { ...state.gameData, [key]: actionPayload.length <= state.gameData.round ? actionPayload.playerActions : state.gameData[key] };
  // const newGameStatus = gameStatus;
  // console.log('gameData:', gameData);
  // console.log('playerUid', playerUid, 'myUid', myUid, 'check:', playerUid === myUid);
  const player1Actions = gameData.player1Actions || [];
  const player2Actions = gameData.player2Actions || [];
  // const newGameStatus = gameData.player1Actions.length === gameData.player2Actions.length ?
  const newGameStatus = !gameInProgress ?
    gameStatuses.GAME_ENDED :
    player1Actions.length === player2Actions.length ?
      player1Actions.length === round ?
        gameStatuses.DETERMINING_ROUND_WINNER :
        gameStatuses.WAITING_FOR_BOTH_PLAYERS :
      playerUid === myUid ?
        gameStatuses.PLAY_MADE_WAITING_FOR_OPPONENT :
        gameStatuses.OPPONENT_PLAY_WAITING_FOR_USER;
  const newState = { ...state, gameStatus: newGameStatus, gameData };
  // const newState = { ...state, gameStatus: newGameStatus, [key]: actionPayload.playerActions };
  // console.log('returning newState', newState);
  return newState;
};

// export default (state = { gameStatus: gameStatuses.GAME_STARTED }, action) => {
export default (state = { gameStatus: gameStatuses.NO_GAME }, action) => {
  if (Object.keys(gameActions).indexOf(action.type) > -1) {
    // console.log('received game action dispatch in gameReducer, state:', state, 'action', action);
  }
  switch (action.type) {
    // case GAME_CREATED:
    //   // GAME_CREATED is signaled after creation of game. It is separate from the GAME_STARTED signal that listens for every game created and signals if the user is one of the players for that game
    //   console.log('detected GAME_CREATED');
    //   return state;
    //   // return action.payload;
    case gameActions.GAME_STARTED:
      // console.log('detected GAME_STARTED');
      return { ...state, gameKey: action.payload.gameKey, gameData: action.payload.gameData, gameStatus: gameStatuses.GAME_STARTED, myUid: action.payload.myUid, opponentUid: action.payload.gameData.player2 };
    //   return action.payload;
    case gameActions.GAME_ENDED:
      return { ...state, gameKey: null, gameData: null, gameStatus: gameStatuses.GAME_ENDED };
    case gameActions.MAKE_PLAY:
      // console.log('detected MAKE_PLAY, action', action);
      // return state;
      // return { ...state, gameStatus: gameStatus.
      return getGameStateAfterPlayMade(state, action.payload);
    case gameActions.PLAY_RECEIVED:
      // console.log('deteced PLAY_RECEIVED, action', action);
      // return state;
      return state.gameData ? getGameStateAfterPlayReceived(state, action.payload) : state;
    case gameActions.ROUND_OUTCOME:
      // const newGameData = { ...state.gameData, round: 
      const { player1Wins, player2Wins, maxNumberOfGames, round } = action.payload;
      const gameOver = player1Wins + player2Wins >= maxNumberOfGames && Math.abs(player1Wins - player2Wins) >= 2;
      const newRound = gameOver ? round : round + 1;
      // const newRound = action.payload.player1Actions.length + 1
      return { ...state, gameData: { ...action.payload, round: newRound }, gameStatus: gameStatuses.WAITING_FOR_BOTH_PLAYERS };
    case gameActions.GAME_UPDATE:
      // console.log('in reducer GAME_UPDATE, action.payload', action.payload);
      return { ...state, gameData: action.payload, gameStatus: action.payload && action.payload.gameInProgress ? gameStatuses.WAITING_FOR_BOTH_PLAYERS : gameStatuses.GAME_ENDED };
    case gameActions.GAME_IN_PROGRESS:
      // console.log('in reducer GAME_IN_PROGRESS, action.payload', action.payload);
      return { ...state, gameData: { ...state.gameData, gameInProgress: action.payload, }, gameStatus: !action.payload ? gameStatuses.GAME_ENDED : state.gameStatus };
    default:
      return state;
  }
};
