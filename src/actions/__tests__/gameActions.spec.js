import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

// import GameActions from '../../actions/game';
import {
  endGame,
  // createEndGameListener,
  // createOpponentActionListener,
  // createNewGameListener,
  // makePlay,
  requestGame,
  GamesRef,
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

const createDatabaseSpy = () => jest.spyOn(firebase, 'database')
  .mockImplementation(() => ({
    currentUser: true,
    signOut: jest.fn(() => Promise.resolve(true)),
    ref: jest.fn((dbRef) => {
      return ({
        on: jest.fn().mockReturnValue((onRef) => {
          if (dbRef === refs.game && onRef === 'child_added') {
            return Promise.resolve(true);
          }
        }),
        push: jest.fn((val) => {
          console.log('in mock push');
          if (dbRef === refs.games) {
            return Promise.resolve({
              key: sampleGameKey,
            });
          }
          else {
            return Promise.resolve(false);
          }
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
        }),
      });
    }),
  }));

// const firebaseMock = jest.fn().mockReturnValue({
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

// firebase.database = firebaseMock;


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
        });
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
        });
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
        .then((result) => {
          console.log('requestGame dispatch result:', result);
          expect(store.getActions()).toContainEqual(expectedAction);
        });
    });
    it('should call GamesRef().push with the game data', () => {
      // const expectedAction = {
      //   type: gameActions.GAME_REQUESTED,
      //   payload: { user, otherPlayer, }
      //   // payload: { error: new Error('failed to end game').toString() }
      // };
      const ref = GamesRef();
      store.dispatch(requestGame(user, otherPlayer))
        .then((result) => {
          console.log('requestGame dispatch result:', result);
          // expect(store.getActions()).toContainEqual(expectedAction);
          // expect(
          expect(ref.push).toHaveBeenCalled();
          // expect(result).toEqual(1);
        });
    });
  });
});
