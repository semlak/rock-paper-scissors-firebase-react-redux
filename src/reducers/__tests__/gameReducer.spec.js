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
    player1Name: "Gus",
    player1Wins: 0,
    player1Actions: [],
    player2: "pJa4qrIO46YoGMXUfvj9VFllz142",
    player2Name: "Artie",
    player2Wins: 0,
    player2Actions: [],
    ties: 0,
    round: 1,
  },
  gameKey,
  gameStatus: gameStatuses.GAME_STARTED,
  myUid: "ZhwskGVsLjS8nRqlRqwCoKv1pPu1",
};

const startGameAction = {
  type: gameActions.GAME_STARTED,
  payload: dispatchPayload,
};

const updateGameAction = {
  type: gameActions.GAME_UPDATE,
  payload: {
    ...dispatchPayload,
    player1Actions: ['rock'],
    player2Actions: ['scissors'],
    player1Wins: 1,
    player2Wins: 0,
    round: 1,
  }
};


const updateGameInProgress1 = {
  type: gameActions.GAME_IN_PROGRESS,
  payload: false
};

const updateGameInProgress2 = {
  type: gameActions.GAME_IN_PROGRESS,
  payload: true
};

const { player1: player1Uid, player2: player2Uid } = dispatchPayload.gameData;
const samplePlayAttemptAction = {
  type: gameActions.MAKE_PLAY,
  payload: { player1or2: 'player1', playerAction: 'rock' },
  // payload: { player1or2: 'player1', playerAction: 'rock', status: 'success' },
};

const samplePlayReceived = {
  type: gameActions.PLAY_RECEIVED,
  // payload: { player: 'player1', playerActions: ['rock'] },
  payload: { player: 'player1', playerActions: ['rock'], playerUid: player1Uid },
  // payload: { player1or2: 'player1', playerAction: 'rock', status: 'success' },
};

const samplePlayReceived_1 = {
  type: gameActions.PLAY_RECEIVED,
  // payload: { player: 'player1', playerActions: ['rock', 'paper'] },
  payload: { player: 'player1', playerActions: ['rock', 'paper'], playerUid: player1Uid },
};

const samplePlayReceived_2 = {
  type: gameActions.PLAY_RECEIVED,
  // payload: { player: 'player2', playerActions: ['paper'] },
  payload: { player: 'player2', playerActions: ['paper'], playerUid: player2Uid },
};

const samplePlayReceived_badUid = {
  type: gameActions.PLAY_RECEIVED,
  // payload: { player: 'player2', playerActions: ['paper'] },
  payload: { player: 'player2', playerActions: ['paper'], playerUid: 'asdf1234kjhladsf' },
};

const round1WinReceived = {
  type: gameActions.ROUND_OUTCOME,
  // payload: { player: 'player1', playerUid: player1Uid, player1Score: 1, player2Score: 0, currentRound: 1, nextRound: 2 },
  payload: { ...startGameAction.payload.gameData, player1Wins: 1, round: 1 }
};


const sampleRoundOutcomeData1 = { ...dispatchPayload.gameData, player1Actions: ['rock'], player2Actions: ['paper'], player1Wins: 1, round: 2 };
// const sampleRoundOutcomeData1 = { ...sampleRoundOutcomeData1, player1Wins: 2, round: 3 }


// player 1 wins in 4 rounds
const sampleFinalRoundOutcomeData1 = {
  ...sampleRoundOutcomeData1,
  player1Actions: ['rock', 'paper', 'scissors', 'paper'],
  player2Actions: ['scissors', 'rock', 'rock', 'rock'],
  player1Wins: 3,
  player2Wins: 1,
  round: 4,
  gameInProgress: true,
};


// player 1 wins in 3 rounds
const sampleFinalRoundOutcomeData2 = {
  ...sampleRoundOutcomeData1,
  player1Actions: ['rock', 'paper', 'scissors'],
  player2Actions: ['scissors', 'rock', 'paper'],
  player1Wins: 3,
  player2Wins: 0,
  round: 3,
  gameInProgress: true,
};


// player 2 wins in 7 rounds
const sampleFinalRoundOutcomeData3 = {
  ...sampleRoundOutcomeData1,
  player1Actions: ['rock', 'paper', 'scissors', 'rock', 'rock', 'paper', 'scissors'],
  player2Actions: ['scissors', 'scissors', 'rock', 'rock', 'scissors', 'rock', 'paper'],
  player1Wins: 2,
  player2Wins: 4,
  ties: 1,
  round: 7,
  gameInProgress: true,
};


// gameData:
//  { gameInProgress: true,
//    maxNumberOfGames: 5,
//    player1: 'ZhwskGVsLjS8nRqlRqwCoKv1pPu1',
//    player1Name: 'Gus',
//    player1Wins: 1,
//    player1Actions: [],
//    player2: 'pJa4qrIO46YoGMXUfvj9VFllz142',
//    player2Name: 'Artie',
//    player2Wins: 0,
//    player2Actions: [],
//    ties: 0,
//    round: 2 },

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
      const newState = GameReducer(initialState, startGameAction);
      expect(newState.gameKey).toEqual(gameKey);
      expect(newState.gameStatus).toEqual(gameStatuses.GAME_STARTED);
    });
    it('should initially start with player data, wins, and ties', () => {
      const newState = GameReducer(initialState, startGameAction);
      expect(newState.gameData.player1).toEqual(dispatchPayload.gameData.player1);
      expect(newState.gameData.player1Name).toEqual(dispatchPayload.gameData.player1Name);
      expect(newState.gameData.player1Wins).toEqual(0);
      expect(newState.gameData.player2).toEqual(dispatchPayload.gameData.player2);
      expect(newState.gameData.player2Name).toEqual(dispatchPayload.gameData.player2Name);
      expect(newState.gameData.player2Wins).toEqual(0);
      expect(newState.gameData.ties).toEqual(0);
      expect(newState.myUid).toEqual(player1Uid);
      expect(newState.opponentUid).toEqual(player2Uid);
      // expect(newState.gameData).toEqual(dispatchPayload.gameData);
    });
  });

  describe(gameActions.GAME_ENDED, () => {
    it('should result in state with no gameKey or gameData', () => {
      const activeGameState = GameReducer(initialState, startGameAction);
      // send END_GAME signal
      const newState = GameReducer(activeGameState, { type: gameActions.GAME_ENDED });
      expect(newState.gameKey).toBeFalsy();
      expect(newState.gameData).toBeFalsy();
      expect(newState.gameStatus).toEqual(gameStatuses.GAME_ENDED);
    });
  });

  describe(gameActions.MAKE_PLAY, () => {
    it('should change status of game with no prior actions to PLAY_MADE_WAITING_FOR_OPPONENT', () => {
      const activeGameState = GameReducer(initialState, startGameAction);
      const newState = GameReducer(activeGameState, samplePlayAttemptAction);
      // console.log('newState', newState);
      // expect(newState).toContainEqual(activeGameState);
      // expect(newState.gameData.player1Actions).toContainEqual('rock');
      expect(newState.gameStatus).toEqual(gameStatuses.PLAY_MADE_WAITING_FOR_OPPONENT);
      // expect(newState.gameKey).toBeFalsy();
      // expect(newState.gameData).toBeFalsy();
      // expect(newState.gameStatus).toEqual(gameStatuses.GAME_ENDED);
    });
  });

  describe(gameActions.PLAY_RECEIVED, () => {
    it('should contain an array of plays by the player', () => {
      const activeGameState = GameReducer(initialState, startGameAction);
      const newState = GameReducer(activeGameState, samplePlayReceived);
      // console.log('newState', newState);
      // expect(newState).toContainEqual(activeGameState);
      // const playerActions = newState.gameData.player1Actions;
      // const opponentActions = newState.gameData.player2Actions;
      // const round = 
      const { player1Actions, player2Actions, round } = newState.gameData;
      // expect(newState.gameData.player1Actions).toContainEqual('rock');
      expect(player1Actions).toContainEqual('rock');
      expect(player1Actions.length).toEqual(1);
      expect(player1Actions.length).toBeLessThanOrEqual(round);
      expect(player2Actions.length).toBeLessThanOrEqual(round);
      expect(round).toEqual(1);
      expect(newState.gameStatus).toEqual(gameStatuses.PLAY_MADE_WAITING_FOR_OPPONENT);
    });

    it('should reject plays received if greater than round number', () => {
      // really, this is not the part of the app that prevents this. Because plays received are from firebase.
      const activeGameState = GameReducer(initialState, startGameAction);
      const newState = GameReducer(activeGameState, samplePlayReceived);
      const newState1 = GameReducer(newState, samplePlayReceived_1);
      // console.log('newState1', newState1);
      // expect(newState).toContainEqual(activeGameState);
      // const playerActions = newState.gameData.player1Actions;
      // const opponentActions = newState.gameData.player2Actions;
      // const round = 
      const { player1Actions, player2Actions, round } = newState1.gameData;
      // expect(newState.gameData.player1Actions).toContainEqual('rock');
      expect(player1Actions).toContainEqual('rock');
      expect(player1Actions.length).toEqual(1);
      expect(player1Actions.length).toBeLessThanOrEqual(round);
      expect(player2Actions.length).toBeLessThanOrEqual(round);
      expect(round).toEqual(1);
      expect(newState.gameStatus).toEqual(gameStatuses.PLAY_MADE_WAITING_FOR_OPPONENT);
    });

    it('should handle plays received from the user and then the other player', () => {
      const activeGameState = GameReducer(initialState, startGameAction);
      const newState = GameReducer(activeGameState, samplePlayReceived);
      const newState1 = GameReducer(newState, samplePlayReceived_2);
      // const newState2 = GameReducer(newState, samplePlayReceived_1);
      // console.log('newState1', newState1);
      // expect(newState).toContainEqual(activeGameState);
      // const playerActions = newState.gameData.player1Actions;
      // const opponentActions = newState.gameData.player2Actions;
      // const round = 
      const { player1Actions, player2Actions, round } = newState1.gameData;
      // expect(newState.gameData.player1Actions).toContainEqual('rock');
      expect(player1Actions).toContainEqual('rock');
      expect(player2Actions).toContainEqual('paper');
      expect(player1Actions.length).toEqual(1);
      expect(player2Actions.length).toEqual(1);
      expect(player1Actions.length).toBeLessThanOrEqual(round);
      expect(player2Actions.length).toBeLessThanOrEqual(round);
      expect(round).toEqual(1);
      expect(newState1.gameStatus).toEqual(gameStatuses.DETERMINING_ROUND_WINNER);
    });

    it('should handle plays received from the oppenent first and then user', () => {
      const activeGameState = GameReducer(initialState, startGameAction);
      const newState = GameReducer(activeGameState, samplePlayReceived_2);
      const newState1 = GameReducer(newState, samplePlayReceived);
      // const newState2 = GameReducer(newState, samplePlayReceived_1);
      // console.log('newState1', newState1);
      // expect(newState).toContainEqual(activeGameState);
      // const playerActions = newState.gameData.player1Actions;
      // const opponentActions = newState.gameData.player2Actions;
      // const round = 
      const { player1Actions, player2Actions, round } = newState1.gameData;
      // expect(newState.gameData.player1Actions).toContainEqual('rock');
      expect(player1Actions).toContainEqual('rock');
      expect(player2Actions).toContainEqual('paper');
      expect(player1Actions.length).toEqual(1);
      expect(player2Actions.length).toEqual(1);
      expect(player1Actions.length).toBeLessThanOrEqual(round);
      expect(player2Actions.length).toBeLessThanOrEqual(round);
      expect(round).toEqual(1);
      expect(newState.gameStatus).toEqual(gameStatuses.OPPONENT_PLAY_WAITING_FOR_USER);
      expect(newState1.gameStatus).toEqual(gameStatuses.DETERMINING_ROUND_WINNER);
    });
    // it('should reject plays received that do not have uid of either player', () => {
    //   const activeGameState = GameReducer(initialState, startGameAction);
    //   const newState = GameReducer(activeGameState, samplePlayReceived);
    //   const newState1 = GameReducer(newState, samplePlayReceived_badUid);
    //   // const newState2 = GameReducer(newState, samplePlayReceived_1);
    //   // console.log('newState1', newState1);
    //   // expect(newState).toContainEqual(activeGameState);
    //   // const playerActions = newState.gameData.player1Actions;
    //   // const opponentActions = newState.gameData.player2Actions;
    //   // const round = 
    //   const { player1Actions, player2Actions, round } = newState1.gameData;
    //   // expect(newState.gameData.player1Actions).toContainEqual('rock');
    //   expect(player1Actions).toContainEqual('rock');
    //   // expect(player2Actions).toContainEqual('paper');
    //   expect(player1Actions.length).toEqual(1);
    //   // console.log('player2Actions', player2Actions, 'status', newState1.gameStatus);
    //   expect(player2Actions.length).toEqual(0);
    //   expect(player1Actions.length).toBeLessThanOrEqual(round);
    //   expect(player2Actions.length).toBeLessThanOrEqual(round);
    //   expect(round).toEqual(1);
    //   expect(newState.gameStatus).toEqual(gameStatuses.PLAY_MADE_WAITING_FOR_OPPONENT);
    //   expect(newState1.gameStatus).toEqual(gameStatuses.PLAY_MADE_WAITING_FOR_OPPONENT);
    // });
  });

  describe(gameActions.GAME_UPDATE, () => {
    it('should update game data', () => {
      const newState = GameReducer(initialState, startGameAction);
      expect(newState.gameKey).toEqual(gameKey);
      expect(newState.gameStatus).toEqual(gameStatuses.GAME_STARTED);
      const updatedState = GameReducer(newState, updateGameAction);
      expect(updatedState.gameData.player1Wins).toBe(1);
      expect(updatedState.gameData.player2Wins).toBe(0);
      expect(updatedState.gameData.round).toBe(1);
    });
  });

  describe(gameActions.GAME_IN_PROGRESS, () => {
    it('should update GAME_IN_PROGRESS field', () => {
      const newState = GameReducer(initialState, startGameAction);
      expect(newState.gameKey).toEqual(gameKey);
      expect(newState.gameStatus).toEqual(gameStatuses.GAME_STARTED);
      const updatedState = GameReducer(newState, updateGameInProgress1);
      const updatedState1 = GameReducer(updatedState, updateGameInProgress2);
      // console.log('updatedState.gameData', updatedState.gameData);
      expect(updatedState.gameData.gameInProgress).toBe(false);
      expect(updatedState1.gameData.gameInProgress).toBe(true);
    });
  });

  describe(gameActions.ROUND_OUTCOME, () => {
    it('should receive ROUND_OUTCOME action signal and increment round number (even if tied)', () => {
      const activeGameState = GameReducer(initialState, startGameAction);
      // const newState = GameReducer(activeGameState, samplePlayReceived);
      // const newState1 = GameReducer(newState, samplePlayReceived_2);
      const stateAfterPlayer1Play = GameReducer(activeGameState, samplePlayReceived);
      const stateAfterPlayer2Play = GameReducer(stateAfterPlayer1Play, samplePlayReceived_2);
      const stateAfterRoundWin = GameReducer(stateAfterPlayer2Play, round1WinReceived);
      // console.log('newState', newState);
      // expect(newState).toContainEqual(activeGameState);
      // const playerActions = newState.gameData.player1Actions;
      // const opponentActions = newState.gameData.player2Actions;
      // const round = 
      // const { player1Actions, player2Actions, round } = newState.gameData;
      const { round, player1Wins, player2Wins } = stateAfterRoundWin.gameData;
      // expect(newState.gameData.player1Actions).toContainEqual('rock');
      expect(stateAfterPlayer2Play.gameData.round).toEqual(1);
      expect(round).toEqual(2);
      expect(player1Wins).toEqual(1);
      expect(player2Wins).toEqual(0);
      // expect(player1Wins).toEqual(1);
      // expect(player2Wins).toEqual(0);
      // expect(player1Actions).toContainEqual('rock');
      // expect(player1Actions.length).toEqual(1);
      // expect(player1Actions.length).toBeLessThanOrEqual(round);
      // expect(player2Actions.length).toBeLessThanOrEqual(round);
      // expect(newState.gameStatus).toEqual(gameStatuses.PLAY_MADE_WAITING_FOR_OPPONENT);
    });

    it('should update scores scores and proceed and determine if game is over', () => {
      // would like to have firebase doing this, but not currently using firebase functions
      const activeGameState = GameReducer(initialState, startGameAction);
      // const newState = GameReducer(activeGameState, samplePlayReceived);
      // const newState1 = GameReducer(newState, samplePlayReceived_2);
      const stateAfterPlayer1Play = GameReducer(activeGameState, samplePlayReceived);
      const stateAfterPlayer2Play = GameReducer(stateAfterPlayer1Play, samplePlayReceived_2);
      const stateAfterRoundWin = GameReducer(stateAfterPlayer2Play, round1WinReceived);
      // console.log('stateAfterRoundWin', stateAfterRoundWin);
      const { player1Wins, player2Wins, round, } = stateAfterRoundWin.gameData;
      const { gameStatus } = stateAfterRoundWin;
      // expect(newState.gameData.player1Actions).toContainEqual('rock');
      expect(stateAfterPlayer2Play.gameData.round).toEqual(1);
      expect(round).toEqual(2);
      expect(player1Wins).toEqual(1);
      expect(player2Wins).toEqual(0);
      expect(gameStatus).toEqual(gameStatuses.WAITING_FOR_BOTH_PLAYERS);
    });

    it('should receive ROUND_OUTCOME action signal and update player scores and proceed to next round', () => {
      const activeGameState = GameReducer(initialState, startGameAction);
      // const newState = GameReducer(activeGameState, samplePlayReceived);
      // const newState1 = GameReducer(newState, samplePlayReceived_2);
      const stateAfterPlayer1Play = GameReducer(activeGameState, samplePlayReceived);
      const stateAfterPlayer2Play = GameReducer(stateAfterPlayer1Play, samplePlayReceived_2);
      const stateAfterRoundWin = GameReducer(stateAfterPlayer2Play, round1WinReceived);
      const { player1Wins, player2Wins, round, } = stateAfterRoundWin.gameData;
      const { gameStatus } = stateAfterRoundWin;
      // expect(newState.gameData.player1Actions).toContainEqual('rock');
      expect(stateAfterPlayer2Play.gameData.round).toEqual(1);
      expect(round).toEqual(2);
      expect(player1Wins).toEqual(1);
      expect(player2Wins).toEqual(0);
      expect(gameStatus).toEqual(gameStatuses.WAITING_FOR_BOTH_PLAYERS);
    });
    // it('should identify when a player wins game', () => {
    //   // really, this is not the part of the app that prevents this. Because plays received are from firebase.
    //   // const activeGameState = GameReducer(initialState, startGameAction);
    //   const activeGameState = { ...dispatchPayload, gameData: { ...sampleFinalRoundOutcomeData1, gameInProgress: true }, gameStatus: gameActions.DETERMINING_ROUND_WINNER };
    //   const newState = GameReducer(activeGameState, samplePlayReceived);
    //   const newState1 = GameReducer(newState, samplePlayReceived_1);
    //   // console.log('newState1', newState1);
    //   // expect(newState).toContainEqual(activeGameState);
    //   // const playerActions = newState.gameData.player1Actions;
    //   // const opponentActions = newState.gameData.player2Actions;
    //   // const round = 
    //   const { player1Actions, player2Actions, round } = newState1.gameData;
    //   // expect(newState.gameData.player1Actions).toContainEqual('rock');
    //   expect(player1Actions).toContainEqual('rock');
    //   expect(player1Actions.length).toEqual(1);
    //   expect(player1Actions.length).toBeLessThanOrEqual(round);
    //   expect(player2Actions.length).toBeLessThanOrEqual(round);
    //   expect(newState.gameStatus).toEqual(gameStatuses.PLAY_MADE_WAITING_FOR_OPPONENT);
    // });

    it('should handle plays received from the user and then the other player', () => {
      const activeGameState = GameReducer(initialState, startGameAction);
      const newState = GameReducer(activeGameState, samplePlayReceived);
      const newState1 = GameReducer(newState, samplePlayReceived_2);
      // const newState2 = GameReducer(newState, samplePlayReceived_1);
      // console.log('newState1', newState1);
      // expect(newState).toContainEqual(activeGameState);
      // const playerActions = newState.gameData.player1Actions;
      // const opponentActions = newState.gameData.player2Actions;
      // const round = 
      const { player1Actions, player2Actions, round } = newState1.gameData;
      // expect(newState.gameData.player1Actions).toContainEqual('rock');
      expect(player1Actions).toContainEqual('rock');
      expect(player2Actions).toContainEqual('paper');
      expect(player1Actions.length).toEqual(1);
      expect(player2Actions.length).toEqual(1);
      expect(player1Actions.length).toBeLessThanOrEqual(round);
      expect(player2Actions.length).toBeLessThanOrEqual(round);
      expect(newState1.gameStatus).toEqual(gameStatuses.DETERMINING_ROUND_WINNER);
    });

    // it('should handle plays received from the oppenent first and then user', () => {
    //   const activeGameState = GameReducer(initialState, startGameAction);
    //   const newState = GameReducer(activeGameState, samplePlayReceived_2);
    //   const newState1 = GameReducer(newState, samplePlayReceived);
    //   // const newState2 = GameReducer(newState, samplePlayReceived_1);
    //   // console.log('newState1', newState1);
    //   // expect(newState).toContainEqual(activeGameState);
    //   // const playerActions = newState.gameData.player1Actions;
    //   // const opponentActions = newState.gameData.player2Actions;
    //   // const round = 
    //   const { player1Actions, player2Actions, round } = newState1.gameData;
    //   // expect(newState.gameData.player1Actions).toContainEqual('rock');
    //   expect(player1Actions).toContainEqual('rock');
    //   expect(player2Actions).toContainEqual('paper');
    //   expect(player1Actions.length).toEqual(1);
    //   expect(player2Actions.length).toEqual(1);
    //   expect(player1Actions.length).toBeLessThanOrEqual(round);
    //   expect(player2Actions.length).toBeLessThanOrEqual(round);
    //   expect(newState.gameStatus).toEqual(gameStatuses.OPPONENT_PLAY_WAITING_FOR_USER);
    //   expect(newState1.gameStatus).toEqual(gameStatuses.DETERMINING_ROUND_WINNER);
    // });
  });
});
