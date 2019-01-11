import {
  gameActions,
  // GAME_CREATED,
  // GAME_STARTED,
  // GAME_ENDED,
  // MAKE_PLAY,
  // PLAY_RECEIVED,
} from "../../actions/types";
import gameStatuses from '../../gameStatuses';
import GameReducer from '../../reducers/gameReducer';
// console.log('GameReducer', GameReducer);

// const initialState = {
//   gameData: {
//     gameInProgress: true,
//     maxNumberOfGames: 5,
//     player1: "ZhwskGVsLjS8nRqlRqwCoKv1pPu1",
//     player1Name: "Joseph",
//     player1Wins: 0,
//     player2: "pJa4qrIO46YoGMXUfvj9VFllz142",
//     player2Name: "Joseph Semlak",
//     player2Wins: 0,
//     ties: 0,
//   },
//   gameKey: "-LVAW-ub1RkIiW_oD3aW",
//   gameStatus: "OPPONENT_PLAY_WAITING_FOR_USER",
// };

const gameKey = "-LVAW-ub1RkIiW_oD3aW";

// const initialState = { 
//   gameData: null,
//   gameKey: null,
//   gameStatus: null,
// };
const initialState = undefined;

const dispatchPayload = {
  gameData: {
    gameInProgress: true,
    maxNumberOfGames: 5,
    player1: "ZhwskGVsLjS8nRqlRqwCoKv1pPu1",
    player1Name: "Joseph",
    player1Wins: 0,
    player2: "pJa4qrIO46YoGMXUfvj9VFllz142",
    player2Name: "Joseph Semlak",
    player2Wins: 0,
    ties: 0,
  },
  gameKey,
  gameStatus: gameStatuses.GAME_STARTED,
};

const action = {
  type: gameActions.GAME_STARTED,
  payload: dispatchPayload,
};

describe('gameReducer', () => {
  describe('initial state', () => {
    it('should have no initial game when started', () => {
      // const initialState = undefined;
      const unrelatedAction = { type: "LKjasfdklj" };
      // the meaningless action type just means that it is not a relevant game action.
      const newState = GameReducer(initialState, unrelatedAction);
      // console.log('newState', newState);
      // expect(newState.gameKey).toBeNull();
      expect(newState.gameKey).toBeFalsy();
      expect(newState.gameStatus).toEqual(gameStatuses.NO_GAME);
    });
  });
  describe(gameActions.GAME_STARTED, () => {
    it('should start game', () => {
      const newState = GameReducer(initialState, action);
      expect(newState.gameKey).toEqual(gameKey);
      expect(newState.gameStatus).toEqual(gameStatuses.GAME_STARTED);
    });
    it('should initially start with player data, wins, and tites', () => {
      const newState = GameReducer(initialState, action);
      expect(newState.gameData.player1).toEqual(dispatchPayload.gameData.player1);
      expect(newState.gameData.player1Name).toEqual(dispatchPayload.gameData.player1Name);
      expect(newState.gameData.player1Wins).toEqual(0);
      expect(newState.gameData.player2).toEqual(dispatchPayload.gameData.player2);
      expect(newState.gameData.player2Name).toEqual(dispatchPayload.gameData.player2Name);
      expect(newState.gameData.player2Wins).toEqual(0);
      expect(newState.gameData.ties).toEqual(0);
      // expect(newState.gameData).toEqual(dispatchPayload.gameData);
    });
  });
  describe(gameActions.GAME_ENDED, () => {
    it('should result in state with no gameKey or gameData', () => {
      const activeGameState = GameReducer(initialState, action);
      // send END_GAME signal
      const newState = GameReducer(activeGameState, { type: gameActions.GAME_ENDED });
      expect(newState.gameKey).toBeFalsy();
      expect(newState.gameData).toBeFalsy();
      expect(newState.gameStatus).toEqual(gameStatuses.GAME_ENDED);
    });
  });
});
