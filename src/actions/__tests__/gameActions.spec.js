import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

// import GameActions from '../../actions/game';
import {
  endGame,
  // createEndGameListener,
  // createOpponentActionListener,
  // createNewGameListener,
  makePlay,
  requestGame,
  // GamesRef,
  // createNewGameListener,
  newGameListenerEvent,
  updateWithRoundOutcome,
  GamesRefChild
} from '../../actions/game';

import {
  // GAME_REQUESTED,
  // GAME_CREATED,
  // GAME_STARTED,
  // MAKE_PLAY,
  // PLAY_RECEIVED,
  // GAME_ENDED,
  gameActions,
} from '../types';

// import firebase from '../../firebase';
// import { refs } from '../../firebase';
import firebase, { refs } from '../../firebase';
// refs.games

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const sampleGameKey = '-LVEt37BYdH4eSgrRlPG';
const badGameKey = '-lkajdsfkljasdkflj';



const sampleUser = {
  displayName: "Artie",
  email: "artie@blah.edu",
  emailVerified: true,
  isAnonymous: false,
  photoURL: "https://lh5.googleusercontent.com/-_w_poSLrAaE/AAAAAAAAAAI/AAAAAAAAAAA/AGDgw-hV44bGwICl_R0v9U_uCYDfZzgaWA/mo/photo.jpg",
  u: "rps-game-d93c5.firebaseapp.com",
  uid: "pJa4qrIO46YoGMXUfvj9VFllz142",
};

const otherPlayer = {
  displayName: "Gus",
  inGame: false,
  photoURL: "https://lh3.googleusercontent.com/-eAHynpDPkO4/AAAAAAAAAAI/AAAAAAAAAAA/kMSNMCbxbvs/photo.jpg",
  uid: "ZhwskGVsLjS8nRqlRqwCoKv1pPu1",
};

const sampleGameReceived = {
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
  round: 1,
  ties: 0,
  gameClosed: false,
  winner: 0,
};


// for the input, the data has plays for one round, and it hasn't been evaluated, so it is still listed as round 1
const sampleRoundOutcomeData1Input = {
  ...sampleGameReceived,
  // player1Actions: ['rock'],
  // player2Actions: ['paper'],
  player1Actions: {
    '-LYEpWfpl6bClXAOl8Pe': "paper",
  },
  player2Actions: {
    '-LYEpaKCOu4cLsZffbgy': "rock",
  },
  round: 2
};

// player1 wins the round, and so player1Wins and round number are incremented
const sampleRoundOutcomeData1Result = {
  ...sampleRoundOutcomeData1Input,
  // player1Actions: ['paper'],
  // player2Actions: ['rock'],
  player1Wins: 1,
  player2Wins: 0,
  round: 2
};


// for the input, the data has plays for one round, and it hasn't been evaluated, so it is still listed as round 1
const sampleRoundOutcomeData2Input = {
  ...sampleGameReceived,
  // player1Actions: ['rock'],
  // player2Actions: ['paper'],
  player1Actions: {
    '-LYEpWfpl6bClXAOl8Pe': "rock",
  },
  player2Actions: {
    '-LYEpaKCOu4cLsZffbgy': "paper",
  },
  round: 2
};

// player2 wins the round, and so player2Wins and round numbers are incremented
const sampleRoundOutcomeData2Result = {
  ...sampleRoundOutcomeData2Input,
  // player1Actions: ['rock'],
  // player2Actions: ['paper'],
  player1Wins: 0,
  player2Wins: 1,
  round: 2,
};


// for the input, the data has plays for one round, and it hasn't been evaluated, so it is still listed as round 1
const sampleRoundOutcomeData3Input = {
  ...sampleGameReceived,
  // player1Actions: ['rock'],
  // player2Actions: ['paper'],
  player1Actions: {
    '-LYEpWfpl6bClXAOl8Pe': "rock",
  },
  player2Actions: {
    '-LYEpaKCOu4cLsZffbgy': "rock",
  },
  round: 2
};

// round is a tie, and so ties and round number are incremented
const sampleRoundOutcomeData3Result = {
  ...sampleRoundOutcomeData3Input,
  // player1Actions: ['rock'],
  // player2Actions: ['rock'],
  player1Wins: 0,
  player2Wins: 0,
  ties: 1,
  round: 2,
};


// for the input, the data has plays for four rounds, but the fourth round hasn't been evaluated
// For the first three games, Player 1 won two of these (round 1 and 2), and since there was no game winner, it moved to round 4,
const sampleFinalRoundOutcomeData1Input = {
  ...sampleGameReceived,
  // player1Actions: ['rock', 'paper', 'scissors', 'paper'],
  // player2Actions: ['scissors', 'rock', 'rock', 'rock'],
  // player1Wins: 3,
  // player2Wins: 1,
  // round: 4,
  // gameInProgress: false,
  player1Actions: {
    '-LYEpWfpl6bClXAOl8Pe': "rock",
    '-LYEpjaC9HArDOEoMzaI': "paper",
    '-LYEpkbF9HArDOEoMzaJ': "scissors",
    '-LYEpatJ9HArDOEoMzaK': "paper",
  },
  player2Actions: {
    '-LYEpaKCOu4cLsZffbgy': "scissors",
    '-LYEph4PIYxtKc_3QuUs': "rock",
    '-LYEph4PIYxtKc_3QuUt': "rock",
    '-LYEph4PIYxtKc_3QuUu': "rock",
  },
  player1Wins: 2,
  player2Wins: 1,
  round: 4,
  gameInProgress: true,
  winner: 0,
};

// player 1 wins in 4 rounds
// because one of the player wins, the round does not advance to round 5.
const sampleFinalRoundOutcomeData1Result = {
  ...sampleFinalRoundOutcomeData1Input,
  player1Wins: 3,
  player2Wins: 1,
  round: 4,
  gameInProgress: false,
  winner: 1,
};


// for the input, the data has plays for seven rounds, but the 7th round hasn't been evaluated
// For the six games games, Player 1 won two of these (round 1 and 5), player2 has won 2 (roundes 2 and 3) and rounds 4 and 6 were ties
// Since there was no game winner, it moved to round 7 (this round),
const sampleFinalRoundOutcomeData7Input = {
  ...sampleGameReceived,
  // player1Actions: ['rock', 'paper', 'scissors', 'paper'],
  // player2Actions: ['scissors', 'rock', 'rock', 'rock'],
  // player1Wins: 3,
  // player2Wins: 1,
  // round: 4,
  // gameInProgress: false,
  // player1Actions: ['rock',      'paper',    'scissors', 'rock', 'rock',     'paper', 'scissors'],
  // player2Actions: ['scissors',  'scissors', 'rock',     'rock', 'scissors', 'paper',  'paper'],
  //                // 1            2          2           0       1           0         1
  player1Actions: {
    '-LYEpWfpl6bClXAOl8Pe': "rock",
    '-LYEpjaC9HArDOEoMzaI': "paper",
    '-LYEpkbF9HArDOEoMzaJ': "scissors",
    '-LYEpatJ9HAxDOEoMzaK': "rock",
    '-LYEpWfpl6bylXAOl8Pe': "rock",
    '-LYEpjaC9HAzDOEoMzaI': "paper",
    '-LYEpkbF9HAtDOEoMzaJ': "scissors",
  },
  player2Actions: {
    '-LYEpaKCOu4cLsZffbgy': "scissors",
    '-LYEpaKCOu4dLaZffbgy': "scissors",
    '-LYEph4PIYxrKc_3QuUs': "rock",
    '-LYEph4PIYxaKc_3QuUt': "rock",
    '-LYEpaKCOu4sLsZffbgy': "scissors",
    '-LYEph4PIYxhKc_3QuUu': "paper",
    '-LYEpaKCOu4zLsZffbgy': "paper",
  },
  player1Wins: 2,
  player2Wins: 2,
  ties: 2,
  round: 7,
  gameInProgress: true,
};

// player 1 wins in 7 rounds, with two ties
// because one of the player wins, the round does not advance to round 8.
const sampleFinalRoundOutcomeData7Result = {
  ...sampleFinalRoundOutcomeData7Input,
  // player1Actions: ['rock', 'paper', 'scissors', 'paper'],
  // player2Actions: ['scissors', 'rock', 'rock', 'rock'],
  player1Wins: 3,
  player2Wins: 2,
  ties: 2,
  round: 7,
  gameInProgress: false,
  winner: 1,
};


// Same as previous test, except match winner is player 2
// for the input, the data has plays for seven rounds, but the 7th round hasn't been evaluated
// For the six games games, Player 1 won two of these (round 1 and 5), player2 has won 2 (roundes 2 and 3) and rounds 4 and 6 were ties
// Since there was no game winner, it moved to round 7 (this round),
const sampleFinalRoundOutcomeData8Input = {
  ...sampleGameReceived,
  player1Actions: {
    '-LYEpWfpl6bClXAOl8Pe': "rock",
    '-LYEpjaC9HArDOEoMzaI': "paper",
    '-LYEpkbF9HArDOEoMzaJ': "scissors",
    '-LYEpatJ9HAxDOEoMzaK': "rock",
    '-LYEpWfpl6bylXAOl8Pe': "rock",
    '-LYEpjaC9HAzDOEoMzaI': "paper",
    '-LYEpkbF9HAtDOEoMzaJ': "scissors",
  },
  player2Actions: {
    '-LYEpaKCOu4cLsZffbgy': "scissors",
    '-LYEpaKCOu4dLaZffbgy': "scissors",
    '-LYEph4PIYxrKc_3QuUs': "rock",
    '-LYEph4PIYxaKc_3QuUt': "rock",
    '-LYEpaKCOu4sLsZffbgy': "scissors",
    '-LYEph4PIYxhKc_3QuUu': "paper",
    '-LYEpaKCOu4zLsZffbgy': "rock",
  },
  player1Wins: 2,
  player2Wins: 2,
  ties: 2,
  round: 7,
  gameInProgress: true,
};

// player 2 wins in 7 rounds, with two ties
// because one of the player wins, the round does not advance to round 8.
const sampleFinalRoundOutcomeData8Result = {
  ...sampleFinalRoundOutcomeData8Input,
  player1Wins: 2,
  player2Wins: 3,
  ties: 2,
  round: 7,
  gameInProgress: false,
  winner: 2,
};


// for the input, the data has plays for seven rounds, but the 7th round hasn't been evaluated
// For the six games games, Player 1 won two of these (round 1 and 5), player2 has won 2 (roundes 2 and 3) and rounds 4 and 6 were ties
// Since there was no game winner, it moved to round 7 (this round),
const sampleTieRoundOutcomeData1Input = {
  ...sampleGameReceived,
  player1Actions: {
    '-LYEpWfpl6bClXAOl8Pe': "rock",
    '-LYEpjaC9HArDOEoMzaI': "paper",
    '-LYEpkbF9HArDOEoMzaJ': "scissors",
    '-LYEpatJ9HAxDOEoMzaK': "rock",
    '-LYEpWfpl6bylXAOl8Pe': "rock",
    '-LYEpjaC9HAzDOEoMzaI': "paper",
    '-LYEpkbF9HAtDOEoMzaJ': "scissors",
  },
  player2Actions: {
    '-LYEpaKCOu4cLsZffbgy': "scissors",
    '-LYEpaKCOu4dLaZffbgy': "scissors",
    '-LYEph4PIYxrKc_3QuUs': "rock",
    '-LYEph4PIYxaKc_3QuUt': "rock",
    '-LYEpaKCOu4sLsZffbgy': "scissors",
    '-LYEph4PIYxhKc_3QuUu': "paper",
    '-LYEpaKCOu4zLsZffbgy': "scissors",
  },
  player1Wins: 2,
  player2Wins: 2,
  ties: 2,
  round: 7,
  gameInProgress: true,
};

// round ties
// because neither player wins match, the round advances to round 8.
const sampleTieRoundOutcomeData1Result = {
  ...sampleTieRoundOutcomeData1Input,
  player1Wins: 2,
  player2Wins: 2,
  ties: 3,
  round: 8,
  gameInProgress: true,
};




// player 1 wins in 3 rounds
const sampleFinalRoundOutcomeData2 = {
  ...sampleGameReceived,
  player1Actions: ['rock', 'paper', 'scissors'],
  player2Actions: ['scissors', 'rock', 'paper'],
  player1Wins: 3,
  player2Wins: 0,
  round: 3,
  gameInProgress: true,
};


// player 1 wins in 7 rounds
const sampleFinalRoundOutcomeData3 = {
  ...sampleGameReceived,
  player1Actions: ['rock', 'paper', 'scissors', 'rock', 'rock', 'paper', 'scissors'],
  player2Actions: ['scissors', 'scissors', 'rock', 'rock', 'scissors', 'rock', 'paper'],
  player1Wins: 2,
  player2Wins: 4,
  ties: 1,
  round: 7,
  gameInProgress: true,
};

var mockFirebaseRef = (dbRef) => ({
  signOut: jest.fn(() => Promise.resolve(true)),
  on: jest.fn(),
  currentUser: true,
  push: jest.fn(() => new Promise((resolve, reject) => {
    // if (dbRef === refs.games) {
    if ([refs.games, 'player1Actions', 'player2Actions'].indexOf(dbRef) > -1) {
      resolve({
        key: sampleGameKey,
      });
    }
    else {
      // return resolve(true);
      console.log('failed mock push');
      reject(new Error(`failed mock push, dbRef: ${dbRef}`));
    }
  })),
  remove: jest.fn((ref) => new Promise((resolve, reject) => {
    // console.log('in mockFirebaseRef remove() promise, dbRef', dbRef);
    if (dbRef === sampleGameKey) {
      resolve(true);
    }
    else {
      reject(new Error('failed to end game'));
    }
  })),
  once: jest.fn((ref) => {
    // console.log('in mockOnce function');
    if (ref === 'value' && dbRef === refs.games) {
      // console.log('in mockOnce function if branch');
      return Promise.resolve(sampleRoundOutcomeData1);
    }
    return Promise.resolve(false);
  }),
  child: jest.fn((ref) => mockFirebaseRef(ref)),
  update: jest.fn((obj) => {
    // console.log('called mockFirebasRef.update, obj:', obj, 'dbRef:', dbRef);
  }),
  // child1: jest.fn((ref) => mockFirebaseRef(ref)),
  ref: jest.fn((ref) => mockFirebaseRef(ref)),
});

const firebaseDatabaseMock = () => jest.fn().mockReturnValue({
  on: jest.fn(),
  currentUser: true,
  signOut: jest.fn(() => Promise.resolve(true)),
  // recurrsive ref
  ref: jest.fn((dbRef) => mockFireBaseRef(dbRef)),
});

const mockOn = () => jest.fn();

const mockPush = dbRef => val => jest.fn((val) => {
  console.log('in mock push, val is', val, 'dbRef', dbRef);
  return new Promise((resolve, reject) => {
    if (dbRef === refs.games) {
      // console.log('successful mock push, val', val);
      console.log('successful mock push, val');
      resolve({
        key: sampleGameKey,
      });
    }
    else {
      console.log('failed mock push');
      reject(new Error('failed mock push'));
    }
  });
});

const mockOnce = dbRef => (ref) => jest.fn((ref) => {
  // console.log('in mockOnce function');
  if (ref === 'value' && dbRef === refs.games) {
    // console.log('in mockOnce function if branch');
    return Promise.resolve(sampleRoundOutcomeData1);
  }
  return Promise.resolve(false);
});

const createDatabaseSpy = () => jest.spyOn(firebase, 'database').mockImplementation(() => ({
  currentUser: true,
  signOut: jest.fn(() => Promise.resolve(true)),
  ref: jest.fn((dbRef) => mockFirebaseRef(dbRef)),
  // ref1: jest.fn((dbRef) => ({
  //   // on: jest.fn().mockReturnValue((onRef) => {
  //   // on: jest.fn((onRef) => {
  //   //   console.log('running firebase.database() ".on" function for onRef', onRef);
  //   //   if (dbRef === refs.game && onRef === 'child_added') {
  //   //     return Promise.resolve(true);
  //   //   }
  //   // }),
  //   on: mockOn(),
  //   on1: jest.fn(),
  //   // on: mockOnCreator(dbRef),
  //   // push: jest.fn().mockReturnValue((val) => {
  //   // push: jest.fn((val) => {
  //   push: mockPush(dbRef)(),
  //   push1: jest.fn(() => {
  //     // console.log('in mock push');
  //     return new Promise((resolve, reject) => {
  //       if (dbRef === refs.games) {
  //         // console.log('successful mock push, val', val);
  //         // console.log('successful mock push, val');
  //         resolve({
  //           key: sampleGameKey,
  //         });
  //       }
  //       else {
  //         console.log('failed mock push');
  //         reject(new Error('failed mock push'));
  //       }
  //     });
  //   }),
  //   child: (childRef) => ({
  //     remove: () => {
  //       // console.log('remove childRef', childRef, 'dbRef:', dbRef);
  //       // return Promise.resolve(true);
  //       return new Promise((resolve, reject) => {
  //         if (childRef === sampleGameKey) {
  //           resolve(true);
  //         }
  //         else {
  //           reject(new Error('failed to end game'));
  //         }
  //       });
  //     },
  //     push: mockPush(dbRef)(),
  //     push1: jest.fn(),
  //     // child: jest.fn(),
  //     child: jest.fn(() => ({
  //       // push: jest.fn(),
  //       // push: jest.fn((val) => {
  //       push: mockPush(dbRef)(),
  //       push1: jest.fn(() => {
  //         // console.log('in mock push');
  //         return new Promise((resolve, reject) => {
  //           if (dbRef === refs.games) {
  //             // console.log('successful mock push, val', val);
  //             // console.log('successful mock push, val');
  //             resolve({
  //               key: sampleGameKey,
  //             });
  //           }
  //           else {
  //             // console.log('failed mock push');
  //             reject(new Error('failed mock push'));
  //           }
  //         });
  //       }),
  //     })),
  //     once2: mockOnce(dbRef)(),
  //     once1: jest.fn((ref) => {
  //       // console.log('in mockOnce function');
  //       if (ref === 'value' && dbRef === refs.games) {
  //         // console.log('in mockOnce function if branch');
  //         return Promise.resolve(sampleRoundOutcomeData1);
  //       }
  //       return Promise.resolve(false);
  //     }),
  //     on: mockOn(),
  //     on1: jest.fn(),
  //     // on: jest.fn((onRef) => {
  //     //   console.log('running firebase.database() ".on" function for onRef', onRef);
  //     //   if (dbRef === refs.game && onRef === 'child_added') {
  //     //     return Promise.resolve(true);
  //     //   }
  //     // }),

  //   }),
  // }))
}));


describe('game actions', () => {
  let store;
  // set up a fake store for all our tests
  beforeEach(() => {
    // store = mockStore({ phoneNumbers: [] });
    store = mockStore({ gathering: {}, auth: {}, game: {} });
    // firebase.database = firebaseMock;
    firebase.database = createDatabaseSpy();
  });

  describe('end game', () => {
    it('should create an action to end game', () => {
      const expectedAction = {
        type: gameActions.GAME_ENDED,
        payload: { gameUID: sampleGameKey }
        // payload: { error: new Error('failed to end game').toString() }
      };
      // expect(1).toEqual(1);
      store.dispatch(endGame(sampleGameKey))
        .then(() => {
          expect(store.getActions()).toContainEqual(expectedAction);
        })
        .catch(err => expect(err).toBeFalsy());
    });

    it('should not create action to end game if proper game key is not passed', () => {
      const expectedAction = {
        type: gameActions.GAME_ENDED,
        payload: { error: new Error('failed to end game').toString() }
        // payload: { gameUID: sampleGameKey }
      };
      store.dispatch(endGame(badGameKey))
        .then(() => {
          expect(store.getActions()).toContainEqual(expectedAction);
        })
        .catch(err => expect(err).toBeFalsy());
      // .catch(err => console.log('error from dispatch of endGame with badGameKey'));
    });
  });

  describe('request game', () => {
    const user = sampleUser;
    it('should dispatch a GAME_REQUESTED signal', () => {
      const expectedAction = {
        type: gameActions.GAME_REQUESTED,
        payload: { user, otherPlayer, }
        // payload: { error: new Error('failed to end game').toString() }
      };
      store.dispatch(requestGame(user, otherPlayer))
        // .then((result) => {
        .then(() => {
          // console.log('requestGame dispatch result:', result);
          expect(store.getActions()).toContainEqual(expectedAction);
          // console.log('store.getState()', store.getState());
        })
        .catch(err => expect(err).toBeFalsy());
    });
    it('should call GamesRef().push with the game data', () => {
      const expectedAction = {
        type: gameActions.GAME_CREATED,
        // payload: { user, otherPlayer, }
        // payload: { error: new Error('failed to end game').toString() }
      };
      // const ref = GamesRef();
      // console.log
      // Object.keys(ref).forEach(key => console.log('GamesRef key:', key, 'value:', ref[key] && ref[key].toString()));
      store.dispatch(requestGame(user, otherPlayer))
        // .then((result) => {
        .then(() => {
          // console.log('requestGame dispatch result:', result);
          expect(store.getActions()).toContainEqual(expectedAction);
          // console.log('store.getState()', store.getState());
          // expect(
          // expect(ref.push).toHaveBeenCalled();

          // expect(result).toEqual(1);
        })
        // .catch(err => expect(err).toBeFalsy());
        .catch(err => {
          console.log('error when testing requestGame for GamesRef().push');
          expect(err).toBeFalsy();
        });
      // .catch(err => console.log('error from dispatch of requestGame'));
    });

    // // Not using
    // it('should result in a new game alert from the newGameListener', () => {
    //   const ref = GamesRef();
    //   // const gameListener = createNewGameListener(user.uid);
    //   store.dispatch(createNewGameListener(user.uid));
    //   store.dispatch(requestGame(user, otherPlayer))
    //     .then((result) => {
    //       expect(ref.on).toHaveBeenCalled();
    //     })
    //     .catch(err => {
    //       console.log('error when testing requestGame for GamesRef().on');
    //       expect(err).toBeFalsy();
    //     });
    //  });
  });

  describe('newGameListenerEvent', () => {
    // this is a listener rather than an action. It should promably move to separate file. 
    // However, it dispatches the new game action, so it is sort of an action creator that runs as a listener
    it('should dispatch received game data when triggered', () => {
      const expectedAction = {
        type: gameActions.GAME_STARTED,
        payload: { gameKey: sampleGameKey, gameData: sampleGameReceived, myUid: otherPlayer.uid }
        // payload: { user, otherPlayer, }
        // payload: { error: new Error('failed to end game').toString() }
      };
      // const ref = GamesRef();
      // const gameListener = createNewGameListener(user.uid);
      store.dispatch(newGameListenerEvent(otherPlayer.uid, sampleGameKey, sampleGameReceived));

      // console.log('store.getActions()', store.getActions());
      expect(store.getActions()).toContainEqual(expectedAction);
      // console.log('store.getState()', store.getState());
      // expect(createEndGameListener).toHaveBeenCalled();
      // store.dispatch(requestGame(user, otherPlayer))
      //   .then((result) => {
      //     expect(ref.on).toHaveBeenCalled();
      //   })
      //   .catch(err => {
      //     console.log('error when testing requestGame for GamesRef().on');
      //     expect(err).toBeFalsy();
      //   });
    });
  });

  describe('makePlay', () => {
    it('should dispatch a MAKE_PLAY action', () => {
      // firebase.database = firebaseDatabaseMock;
      const player1or2 = "player1";
      const playerAction = "scissors";
      const playerUid = sampleUser.uid;
      const expectedAction = {
        type: gameActions.MAKE_PLAY,
        payload: { player1or2, playerAction }
        // payload: { user, otherPlayer, }
        // payload: { error: new Error('failed to end game').toString() }
      };
      // const ref = GamesRef();
      // const gameListener = createNewGameListener(user.uid);
      store.dispatch(makePlay(sampleGameKey, player1or2, playerUid, playerAction));

      // console.log('store.getActions()', store.getActions());
      expect(store.getActions()).toContainEqual(expectedAction);
      // console.log('store.getState()', store.getState());
    });
  });

  describe('receiveRoundOutcome', () => {
    let gameRef;
    beforeEach(() => {
      gameRef = GamesRefChild(sampleGameKey);
    });
    it('should dispatch a ROUND_OUTCOME action containing updated gameData, player1 winning first round', () => {
      const expectedAction = {
        type: gameActions.ROUND_OUTCOME,
        payload: sampleRoundOutcomeData1Result,
      };
      // console.log('expectedAction.payload', expectedAction.payload);
      // store.dispatch(updateWithRoundOutcome(sampleGameKey));
      // console.log('gameRef', gameRef);
      store.dispatch(updateWithRoundOutcome(sampleRoundOutcomeData1Input, sampleGameKey, gameRef));
      // console.log('store.getActions()', store.getActions());
      // const gameRef = firebase.database().ref("Games").child(sampleGameKey);
      // console.log('sampleGameKey', sampleGameKey);
      // expect(store.getActions()).toContainEqual(expectedAction);
      expect(gameRef.update).toHaveBeenCalled();
      const { player1Wins, player2Wins, ties, gameInProgress, round, winner, } = expectedAction.payload;
      const obj = { player1Wins, player2Wins, ties, gameInProgress, round, winner, };
      expect(gameRef.update).toHaveBeenCalledWith(obj);
      // expect(store.getActions()[0].payload.player1Actions).toEqual(expect.arrayContaining(expectedAction.payload.player1Actions));
      // expect(store.getActions()[0].payload.player2Actions).toEqual(expect.arrayContaining(expectedAction.payload.player2Actions));
      // expect(store.getActions()[0].payload.player1Wins).toEqual(expectedAction.payload.player1Wins);
      // expect(store.getActions()[0].payload.player2Wins).toEqual(expectedAction.payload.player2Wins);
      // expect(store.getActions()[0].payload.round).toEqual(expectedAction.payload.round);
      // expect(store.getActions()[0].payload.gameInProgress).toEqual(expectedAction.payload.gameInProgress);
    });

    it('should dispatch a ROUND_OUTCOME action containing updated gameData, player2 winning first round', () => {
      const expectedAction = {
        type: gameActions.ROUND_OUTCOME,
        payload: sampleRoundOutcomeData2Result,
      };
      // console.log('expectedAction.payload', expectedAction.payload);
      // store.dispatch(updateWithRoundOutcome(sampleGameKey));
      store.dispatch(updateWithRoundOutcome(sampleRoundOutcomeData2Input, sampleGameKey, gameRef));
      expect(gameRef.update).toHaveBeenCalled();
      const { player1Wins, player2Wins, ties, gameInProgress, round, winner, } = expectedAction.payload;
      const obj = { player1Wins, player2Wins, ties, gameInProgress, round, winner, };
      expect(gameRef.update).toHaveBeenCalledWith(obj);
      // console.log('store.getActions()', store.getActions());
      // expect(store.getActions()).toContainEqual(expectedAction);
      // expect(store.getActions()[0].payload.player1Actions).toEqual(expect.arrayContaining(expectedAction.payload.player1Actions));
      // expect(store.getActions()[0].payload.player2Actions).toEqual(expect.arrayContaining(expectedAction.payload.player2Actions));
      // expect(store.getActions()[0].payload.player1Wins).toEqual(expectedAction.payload.player1Wins);
      // expect(store.getActions()[0].payload.player2Wins).toEqual(expectedAction.payload.player2Wins);
      // expect(store.getActions()[0].payload.round).toEqual(expectedAction.payload.round);
      // expect(store.getActions()[0].payload.gameInProgress).toEqual(expectedAction.payload.gameInProgress);
    });


    it('should dispatch a ROUND_OUTCOME action containing updated gameData, with first round being a tie', () => {
      const expectedAction = {
        type: gameActions.ROUND_OUTCOME,
        payload: sampleRoundOutcomeData3Result,
      };
      // console.log('expectedAction.payload', expectedAction.payload);
      // store.dispatch(updateWithRoundOutcome(sampleGameKey));
      store.dispatch(updateWithRoundOutcome(sampleRoundOutcomeData3Input, sampleGameKey, gameRef));
      expect(gameRef.update).toHaveBeenCalled();
      const { player1Wins, player2Wins, ties, gameInProgress, round, winner, } = expectedAction.payload;
      const obj = { player1Wins, player2Wins, ties, gameInProgress, round, winner, };
      expect(gameRef.update).toHaveBeenCalledWith(obj);
      // console.log('store.getActions()', store.getActions());
      // expect(store.getActions()).toContainEqual(expectedAction);
      // expect(store.getActions()[0].payload.player1Actions).toEqual(expect.arrayContaining(expectedAction.payload.player1Actions));
      // expect(store.getActions()[0].payload.player2Actions).toEqual(expect.arrayContaining(expectedAction.payload.player2Actions));
      // expect(store.getActions()[0].payload.player1Wins).toEqual(expectedAction.payload.player1Wins);
      // expect(store.getActions()[0].payload.player2Wins).toEqual(expectedAction.payload.player2Wins);
      // expect(store.getActions()[0].payload.round).toEqual(expectedAction.payload.round);
      // expect(store.getActions()[0].payload.gameInProgress).toEqual(expectedAction.payload.gameInProgress);
    });

    // it('should dispatch a ROUND_OUTCOME action containing updated gameData', () => {
    //   const expectedAction = {
    //     type: gameActions.ROUND_OUTCOME,
    //     payload: sampleFinalRoundOutcomeData1Result,
    //   };
    //   // console.log('expectedAction.payload', expectedAction.payload);
    //   // store.dispatch(updateWithRoundOutcome(sampleGameKey));
    //   store.dispatch(updateWithRoundOutcome(sampleFinalRoundOutcomeData1Input));
    //   // console.log('store.getActions()', store.getActions());
    //   expect(store.getActions()).toContainEqual(expectedAction);
    //   // expect(store.getActions()[0].payload.player1Actions).toEqual(expect.arrayContaining(expectedAction.payload.player1Actions));
    //   // expect(store.getActions()[0].payload.player2Actions).toEqual(expect.arrayContaining(expectedAction.payload.player2Actions));
    //   // expect(store.getActions()[0].payload.player1Wins).toEqual(expectedAction.payload.player1Wins);
    //   // expect(store.getActions()[0].payload.player2Wins).toEqual(expectedAction.payload.player2Wins);
    //   // expect(store.getActions()[0].payload.round).toEqual(expectedAction.payload.round);
    //   // expect(store.getActions()[0].payload.gameInProgress).toEqual(expectedAction.payload.gameInProgress);
    // });

    it('should endGame if player has sufficient number of wins, player1 wins after 4 rounds', () => {
      const expectedAction = {
        type: gameActions.ROUND_OUTCOME,
        payload: sampleFinalRoundOutcomeData1Result,
      };
      // console.log('expectedAction.payload', expectedAction.payload);
      // store.dispatch(updateWithRoundOutcome(sampleGameKey));
      store.dispatch(updateWithRoundOutcome(sampleFinalRoundOutcomeData1Input, sampleGameKey, gameRef));
      // console.log('store.getActions()', store.getActions());
      // expect(store.getActions()).toContainEqual(expectedAction);
      expect(gameRef.update).toHaveBeenCalled();
      const { player1Wins, player2Wins, ties, gameInProgress, round, winner, } = expectedAction.payload;
      const obj = { player1Wins, player2Wins, ties, gameInProgress, round, winner, };
      expect(gameRef.update).toHaveBeenCalledWith(obj);
      // expect(store.getActions()[0].payload.player1Actions).toEqual(expect.arrayContaining(expectedAction.payload.player1Actions));
      // expect(store.getActions()[0].payload.player2Actions).toEqual(expect.arrayContaining(expectedAction.payload.player2Actions));
      // expect(store.getActions()[0].payload.player1Wins).toEqual(expectedAction.payload.player1Wins);
      // expect(store.getActions()[0].payload.player2Wins).toEqual(expectedAction.payload.player2Wins);
      // expect(store.getActions()[0].payload.round).toEqual(expectedAction.payload.round);
      // expect(store.getActions()[0].payload.gameInProgress).toEqual(expectedAction.payload.gameInProgress);
    });
    it('should endGame if player has sufficient number of wins, player1 wins after 7 rounds', () => {
      const expectedAction = {
        type: gameActions.ROUND_OUTCOME,
        payload: sampleFinalRoundOutcomeData7Result,
      };
      // console.log('expectedAction.payload', expectedAction.payload);
      // store.dispatch(updateWithRoundOutcome(sampleGameKey));
      store.dispatch(updateWithRoundOutcome(sampleFinalRoundOutcomeData7Input, sampleGameKey, gameRef));
      expect(gameRef.update).toHaveBeenCalled();
      const { player1Wins, player2Wins, ties, gameInProgress, round, winner, } = expectedAction.payload;
      const obj = { player1Wins, player2Wins, ties, gameInProgress, round, winner, };
      expect(gameRef.update).toHaveBeenCalledWith(obj);
      // console.log('store.getActions()', store.getActions());
      // expect(store.getActions()).toContainEqual(expectedAction);
      // expect(store.getActions()[0].payload.player1Actions).toMatchObject(expectedAction.payload.player1Actions);
      // expect(store.getActions()[0].payload.player2Actions).toMatchObject(expectedAction.payload.player2Actions);
      // expect(store.getActions()[0].payload.player1Wins).toEqual(expectedAction.payload.player1Wins);
      // expect(store.getActions()[0].payload.player2Wins).toEqual(expectedAction.payload.player2Wins);
      // expect(store.getActions()[0].payload.round).toEqual(expectedAction.payload.round);
      // expect(store.getActions()[0].payload.gameInProgress).toEqual(expectedAction.payload.gameInProgress);
    });
    it('should endGame if player has sufficient number of wins, player2 wins after 7 rounds', () => {
      const expectedAction = {
        type: gameActions.ROUND_OUTCOME,
        payload: sampleFinalRoundOutcomeData8Result,
      };
      // console.log('expectedAction.payload', expectedAction.payload);
      // store.dispatch(updateWithRoundOutcome(sampleGameKey));
      store.dispatch(updateWithRoundOutcome(sampleFinalRoundOutcomeData8Input, sampleGameKey, gameRef));
      expect(gameRef.update).toHaveBeenCalled();
      const { player1Wins, player2Wins, ties, gameInProgress, round, winner, } = expectedAction.payload;
      const obj = { player1Wins, player2Wins, ties, gameInProgress, round, winner, };
      expect(gameRef.update).toHaveBeenCalledWith(obj);
      // console.log('store.getActions()', store.getActions());
      // expect(store.getActions()).toContainEqual(expectedAction);
      // expect(store.getActions()[0].payload.player1Actions).toMatchObject(expectedAction.payload.player1Actions);
      // expect(store.getActions()[0].payload.player2Actions).toMatchObject(expectedAction.payload.player2Actions);
      // expect(store.getActions()[0].payload.player1Wins).toEqual(expectedAction.payload.player1Wins);
      // expect(store.getActions()[0].payload.player2Wins).toEqual(expectedAction.payload.player2Wins);
      // expect(store.getActions()[0].payload.round).toEqual(expectedAction.payload.round);
      // expect(store.getActions()[0].payload.gameInProgress).toEqual(expectedAction.payload.gameInProgress);
    });
    it('should continue match even after after 7 rounds if round 6 is a tie', () => {
      const expectedAction = {
        type: gameActions.ROUND_OUTCOME,
        payload: sampleTieRoundOutcomeData1Result,
      };
      // console.log('expectedAction.payload', expectedAction.payload);
      // store.dispatch(updateWithRoundOutcome(sampleGameKey));
      store.dispatch(updateWithRoundOutcome(sampleTieRoundOutcomeData1Input, sampleGameKey, gameRef));
      expect(gameRef.update).toHaveBeenCalled();
      const { player1Wins, player2Wins, ties, gameInProgress, round, winner, } = expectedAction.payload;
      const obj = { player1Wins, player2Wins, ties, gameInProgress, round, winner, };
      expect(gameRef.update).toHaveBeenCalledWith(obj);
      // console.log('store.getActions()', store.getActions());
      // expect(store.getActions()).toContainEqual(expectedAction);
      // expect(store.getActions()[0].payload.player1Actions).toMatchObject(expectedAction.payload.player1Actions);
      // expect(store.getActions()[0].payload.player2Actions).toMatchObject(expectedAction.payload.player2Actions);
      // expect(store.getActions()[0].payload.player1Wins).toEqual(expectedAction.payload.player1Wins);
      // expect(store.getActions()[0].payload.player2Wins).toEqual(expectedAction.payload.player2Wins);
      // expect(store.getActions()[0].payload.round).toEqual(expectedAction.payload.round);
      // expect(store.getActions()[0].payload.gameInProgress).toEqual(expectedAction.payload.gameInProgress);
    });
  });
});
