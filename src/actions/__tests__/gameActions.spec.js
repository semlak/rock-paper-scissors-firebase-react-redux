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

// jest.mock('../../firebase', () => ({

// }));


// firebase.database = jest.fn().mockReturnValue({
//   currentUser: true,
//   // signOut: function() { console.log('in mock signout function'); return true; }
//   signOut: () => {
//     // console.log('in mock signout function');
//     return Promise.resolve(true);
//   },
//   ref: jest.fn((dbRef) => {
//   // ref: () => {
//     // console.log('dbRef', dbRef);
//     return ({
//       // on: (onRef) => console.log('onRef:', onRef),
//       // console.log('onRef:', onRef);
//       on: jest.fn().mockReturnValue((onRef) => {
//         if (dbRef === refs.games && onRef === 'child_added') {
//           return Promise.resolve(true);
//         }
//       }),
//       // child: (childRef) => console.log('childRef', childRef),
//       push: jest.fn((val) => {
//         console.log('in mock push')
//         if (dbRef === refs.games) {
//           // return Promise.resolve(true);
//           return Promise.resolve({
//             key: sampleGameKey,
//           });
//         }
//         else {
//           return Promise.resolve(false);
//         }
//         // return new Promise((resolve, reject) => {
//         //   resolve(val);
//         // })
//       }),
//       // push: jest.fn(),
//       child: (childRef) => ({
//         remove: () => {
//           // console.log('remove childRef', childRef, 'dbRef:', dbRef);
//           // return Promise.resolve(true);
//           return new Promise((resolve, reject) => {
//             if (childRef === sampleGameKey) {
//               resolve(true);
//             }
//             else {
//               reject(new Error('failed to end game'));
//             }
//           });
//         },
//       }),
//     });
//   }),
// });

// const {
//   endGame,
//   requestGame,
// } = require('../../actions/game');

// const mockPush = val => jest.fn((val) => {
//   // console.log('in mock push');
//   return new Promise((resolve, reject) => {
//     if (dbRef === refs.games) {
//       // console.log('successful mock push, val', val);
//       console.log('successful mock push, val');
//       resolve({
//         key: sampleGameKey,
//       });
//     }
//     else {
//       console.log('failed mock push');
//       reject(new Error('failed mock push'));
//     }
//   });
// });

// const mockOnCreator = dbRef => onRef => jest.fn(() => {
//   console.log('running firebase.database() ".on" function for onRef', onRef);
//   if (dbRef === refs.game && onRef === 'child_added') {
//     return Promise.resolve(true);
//   }
// });

// const mockChildCreator = dbRef => childRef => jest.fn(() => ({
//   remove: () => {
//     console.log('remove childRef', childRef, 'dbRef:', dbRef);
//     // return Promise.resolve(true);
//     return new Promise((resolve, reject) => {
//       if (childRef === sampleGameKey) {
//         resolve(true);
//       }
//       else {
//         reject(new Error('failed to end game'));
//       }
//     });
//   },
// }));


// const mockRef = dbRef => jest.fn(() => ({
//   on: onVal => mockOn(onVal),
//   push: val => mockPush(val),
//   child: onRef => mockChild(onRef),
// }));


// const createDatabaseSpy = () => jest.spyOn(firebase, 'database')
//   .mockImplementation(() => ({
//     currentUser: true,
//     signOut: jest.fn(() => Promise.resolve(true)),
//     ref: dbRef => mockRef(dbRef),
//     }));

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
};


const sampleRoundOutcomeData1 = { ...sampleGameReceived, player1Actions: ['rock'], player2Actions: ['paper'], player1Wins: 1, round: 2 };
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


const createDatabaseSpy = () => jest.spyOn(firebase, 'database')
  .mockImplementation(() => ({
    currentUser: true,
    signOut: jest.fn(() => Promise.resolve(true)),
    ref: jest.fn((dbRef) => {
      return ({
        // on: jest.fn().mockReturnValue((onRef) => {
        // on: jest.fn((onRef) => {
        //   console.log('running firebase.database() ".on" function for onRef', onRef);
        //   if (dbRef === refs.game && onRef === 'child_added') {
        //     return Promise.resolve(true);
        //   }
        // }),
        on: jest.fn(),
        // on: mockOnCreator(dbRef),
        // push: jest.fn().mockReturnValue((val) => {
        // push: jest.fn((val) => {
        push: jest.fn(() => {
          // console.log('in mock push');
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
        }),
        child: (childRef) => ({
          remove: () => {
            // console.log('remove childRef', childRef, 'dbRef:', dbRef);
            // return Promise.resolve(true);
            return new Promise((resolve, reject) => {
              if (childRef === sampleGameKey) {
                resolve(true);
              }
              else {
                reject(new Error('failed to end game'));
              }
            });
          },
          push: jest.fn(),
          // child: jest.fn(),
          child: jest.fn(() => ({
            // push: jest.fn(),
            // push: jest.fn((val) => {
            push: jest.fn(() => {
              // console.log('in mock push');
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
            }),
          })),
          once: jest.fn((ref) => {
            console.log('in mockOnce function');
            if (ref === 'value' && dbRef === refs.games) {
              console.log('in mockOnce function if branch');
              return Promise.resolve(sampleRoundOutcomeData1);
            }
            return Promise.resolve(false);
          }),
          on: jest.fn(),
          // on: jest.fn((onRef) => {
          //   console.log('running firebase.database() ".on" function for onRef', onRef);
          //   if (dbRef === refs.game && onRef === 'child_added') {
          //     return Promise.resolve(true);
          //   }
          // }),

        }),
      });
    }),
  }));

// const firebaseMock = jest.fn().mockReturnValue({
//   currentUser: true,
//   // signOut: function() { console.log('in mock signout function'); return true; }
//   signOut: jest.fn(() => Promise.resolve(true)),
//   // signOut: () => {
//   //   // console.log('in mock signout function');
//   //   return Promise.resolve(true);
//   // },
//   ref: jest.fn((dbRef) => {
//   // ref: () => {
//     // console.log('dbRef', dbRef);
//     return ({
//       // on: (onRef) => console.log('onRef:', onRef),
//       // console.log('onRef:', onRef);
//       on: jest.fn().mockReturnValue((onRef) => {
//         if (dbRef === refs.games && onRef === 'child_added') {
//           return Promise.resolve(true);
//         }
//       }),
//       // child: (childRef) => console.log('childRef', childRef),
//       push: jest.fn((val) => {
//         console.log('in mock push');
//         if (dbRef === refs.games) {
//           // return Promise.resolve(true);
//           return Promise.resolve({
//             key: sampleGameKey,
//           });
//         }
//         else {
//           return Promise.resolve(false);
//         }
//         // return new Promise((resolve, reject) => {
//         //   resolve(val);
//         // })
//       }),
//       // push: jest.fn(),
//       child: (childRef) => ({
//         remove: () => {
//           // console.log('remove childRef', childRef, 'dbRef:', dbRef);
//           // return Promise.resolve(true);
//           return new Promise((resolve, reject) => {
//             if (childRef === sampleGameKey) {
//               resolve(true);
//             }
//             else {
//               reject(new Error('failed to end game'));
//             }
//           });
//         },
//       }),
//     });
//   }),
// });

// firebase.database = firebaseMock;


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
          // console.log('store.getActions()', store.getActions());
          // const storeActions = store.getActions();
          // console.log('storeActions', storeActions.includes(element => element.type === gameActions.GAME_ENDED));
          // expect(storeActions.includes(element => element.type === gameActions.GAME_ENDED)).toBeTruthy();
          expect(store.getActions()).toContainEqual(expectedAction);
        })
        .catch(err => expect(err).toBeFalsy());
      // expect(endGame(sampleGameKey)).toEqual(expectedAction);
    });

    it('should not create action to end game if proper game key is not passed', () => {
      const expectedAction = {
        type: gameActions.GAME_ENDED,
        payload: { error: new Error('failed to end game').toString() }
        // payload: { gameUID: sampleGameKey }
      };
      store.dispatch(endGame(badGameKey))
        .then(() => {
          // const storeActions = store.getActions();
          // console.log('storeActions', storeActions, storeActions.includes(element => element.type === gameActions.GAME_ENDED));
          // console.log('storeActions', storeActions, storeActions.includes(element => element.type === expectedAction.type));
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
      const player1or2 = "player1";
      const playerAction = "scissors";
      const expectedAction = {
        type: gameActions.MAKE_PLAY,
        payload: { player1or2, playerAction }
        // payload: { user, otherPlayer, }
        // payload: { error: new Error('failed to end game').toString() }
      };
      // const ref = GamesRef();
      // const gameListener = createNewGameListener(user.uid);
      store.dispatch(makePlay(sampleGameKey, player1or2, playerAction));

      // console.log('store.getActions()', store.getActions());
      expect(store.getActions()).toContainEqual(expectedAction);
    });
  });

  describe('receiveRoundOutcome', () => {
    it('should dispatch a ROUND_OUTCOME action containing updated gameData', () => {
      const expectedAction = {
        type: gameActions.ROUND_OUTCOME,
        payload: sampleFinalRoundOutcomeData1,
      };
      // console.log('expectedAction.payload', expectedAction.payload);
      // store.dispatch(updateWithRoundOutcome(sampleGameKey));
      store.dispatch(updateWithRoundOutcome(expectedAction.payload));
      expect(store.getActions()).toContainEqual(expectedAction);
    });

    // it('should endGame if player has sufficient number of wins', () => {
    //   const expectedAction = {
    //     type: gameActions.ROUND_OUTCOME,
    //     payload: sampleFinalRoundOutcomeData1,
    //   };
    //   console.log('expectedAction.payload', expectedAction.payload);
    //   store.dispatch(updateWithRoundOutcome(sampleGameKey));
    //   // store.dispatch(updateWithRoundOutcome(expectedAction.payload));
    //   expect(store.getActions()).toContainEqual(expectedAction);
    // });
    // sampleFinalRoundOutcomeData1
  });
});
