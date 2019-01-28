// import firebase from '../firebase';
import firebase, { refs } from '../firebase';
// import { gatheringRef } from '../firebase';
// import Gathering from '../gathering';
import {
  gameActions,
} from './types';

// const GamesRef = firebase.database().ref(refs.games);
export const GamesRef = () => firebase.database().ref(refs.games);
export const GamesRefChild = (childRef) => firebase.database().ref(`${refs.games}/${childRef}`);

export const endGame = gameUID => dispatch => {
  // console.log('GamesRef', GamesRef && GamesRef().toString());
  // Object.keys(GamesRef()).forEach(key => console.log('GamesRef key:', key, 'value:', GamesRef()[key] && GamesRef()[key].toString()));
  return GamesRef().child(gameUID).remove()
    .then(() => {
      // console.log('removed game, ref:', gameUID);
      dispatch({
        type: gameActions.GAME_ENDED,
        payload: { gameUID },
      });
    })
    .catch(error => {
      // console.log('error removing game');
      dispatch({
        type: gameActions.GAME_ENDED,
        payload: { error: error.toString() },
      });
    });
  // GamesRef().child(app.gameID).remove();
};

export const createEndGameListener = gameRef => dispatch => {
  console.log('in createEndGameListener');
  return gameRef.child('gameInProgress').on('value', (snapshot) => {
    console.log('received endGame indicator from firebase, snapshot.val()', snapshot.val());
    if (snapshot.val() == null || !snapshot.val()) {
      const gameUID = gameRef.key;
      dispatch({
        type: gameActions.GAME_ENDED,
        payload: { gameUID }
      });
    }
  });
};


// const createOpponentActionListener = (dispatch, opponent) => {
// const createOpponentActionListener = (gameRef, opponent) => dispatch => {
//   // this is where the app checks for (or waits for) an opponent action
//   // opponent is string that says 'player1' or 'player2'
//   const refString = `${opponent}Actions`;
//   console.log('creating opponent action listener', refString);
//   return gameRef.child(refString).on('value', (snapshot) => {
//     console.log('received updated on opponent action, snapshot.val()', snapshot.val());
//     const play = snapshot.val();
//     if (play && Object.keys(play).length === 1) {
//       dispatch({
//         type: gameActions.PLAY_RECEIVED,
//         payload: { player: opponent, play: Object.keys(play)[0] }
//       });
//     }
//   });
// };

const createPlayerActionListener = (gameRef, player) => dispatch => {
  // this is where the app checks for (or waits for) a player action
  // player is string that says 'player1' or 'player2'
  const refString = `${player}Actions`;
  console.log('creating player action listener', refString);
  return gameRef.child(refString).on('value', (snapshot) => {
    console.log('received updated on player action, snapshot.val()', snapshot.val());
    const plays = snapshot.val();
    const playerActions = plays && Object.keys(plays).length > 0 ? Object.keys(plays).map(key => plays[key]) : [];
    // if (play && Object.keys(play).length === 1) {
    if (playerActions.length > 0) {
      dispatch({
        type: gameActions.PLAY_RECEIVED,
        payload: { player, playerActions }
      });
    }
  });
};

export const newGameListenerEvent = (myUid, snapshotKey, snapshotVal) => dispatch => {
  // console.log('in newGameListenerEvent, myUid', myUid, 'snapshotVal', snapshotVal);
  // return GamesRef().on("child_added", (snapshot) => {
  const game = snapshotVal;
  // console.log('detected new game added to GamesRef, myUid:', myUid, 'game:', game);
  if ((game.player1 === myUid || game.player2 === myUid) && myUid.length > 1) {
    console.log('new game is my game');
    // would like to add a check here or somewhere that prevents me from starting a game if I'm in an existing one.
    const player1Actions = game.player1Actions ? Object.keys(game.player1Actions).map(key => game.player1Actions[key]) : [];
    const player2Actions = game.player2Actions ? Object.keys(game.player2Actions).map(key => game.player2Actions[key]) : [];
    const gameData = { ...game, player1Actions, player2Actions };
    dispatch({
      type: gameActions.GAME_STARTED,
      // payload: { gameKey: snapshotKey, gameData: game }
      payload: { gameKey: snapshotKey, gameData, myUid }
    });
    // const { player1, player2 } = game;
    const { player1 } = game;
    const player1or2 = myUid === player1 ? 'player1' : 'player2';
    const opponent = myUid !== player1 ? 'player1' : 'player2';
    // const gameRef = GamesRef().child(snapshotKey);
    const gameRef = GamesRefChild(snapshotKey);

    // createGameListener(GamesRef().child(snapshot.key), player1or2);
    // createOpponentActionListener(dispatch, opponent);
    dispatch(createEndGameListener(gameRef));
    // dispatch(createOpponentActionListener(gameRef, opponent));
    dispatch(createPlayerActionListener(gameRef, opponent));
    dispatch(createPlayerActionListener(gameRef, player1or2));
  }
  else {
    console.log('new game is not my game');
  }
  // });
};


export const createNewGameListener = myUid => dispatch => {
  console.log('creating newGame listener, myUid', myUid);
  // return dispatch(newGameListenerEvent(myUid
  return GamesRef().on('child_added', (snapshot) => {
    console.log('newGameListener fired, myUid:', myUid);
    return dispatch(newGameListenerEvent(myUid, snapshot.key, snapshot.val()));
  });
  // return GamesRef().on("child_added", (snapshot) => {
  //   const game = snapshot.val();
  //   console.log('detected new game added to GamesRef, myUid:', myUid, 'game:', game);
  //   if (game.player1 === myUid || game.player2 === myUid) {
  //     console.log('new game is my game');
  //     // would like to add a check here or somewhere that prevents me from starting a game if I'm in an existing one.
  //     dispatch({
  //       type: gameActions.GAME_STARTED,
  //       payload: { gameKey: snapshot.key, gameData: game }
  //     });
  //     // const { player1, player2 } = game;
  //     const { player1 } = game;
  //     // const player1or2 = myUid === player1 ? 'player1' : 'player2';
  //     const opponent = myUid !== player1 ? 'player1' : 'player2';
  //     const gameRef = GamesRef().child(snapshot.key);

  //     // createGameListener(GamesRef().child(snapshot.key), player1or2);
  //     // createOpponentActionListener(dispatch, opponent);
  //     dispatch(createEndGameListener(gameRef));
  //     dispatch(createOpponentActionListener(gameRef, opponent));
  //   }
  //   else {
  //     console.log('new game is not my game');
  //   }
  // });
};

// export const createGameListener = (gameRef, player1or2) => dispatch => {
//   // console.log('creating listener for gameRef', gameRef);
//   // GameRef = gameRef;
//   gameRef.on('value', (snapshot) => {
//     console.log('received update for game, snapshot.val()', snapshot.val());
//   });
//   // GameRef.on
// };


export const updateWithRoundOutcome = (gameData) => (dispatch) => {
   
  // const refString = `${player}Actions`;
  // console.log('creating player action listener', refString);
  // console.log('in updateWithRoundOutcome, gameData:', gameData);
  return dispatch({
    type: gameActions.ROUND_OUTCOME,
    payload: gameData
  });
};

export const getRoundOutcome = (GameKey) => (dispatch) => {
   
  // const refString = `${player}Actions`;
  // console.log('creating player action listener', refString);
  const GameRef = GamesRef().child(GameKey);
  return GameRef.once('value', (snapshot) => {
    console.log('received updated gameData from updateWithOutcome, snapshot.val()', snapshot.val());
    const gameData = snapshot.val();
    // const playerActions = plays && Object.keys(plays).length > 0 ? Object.keys(plays).map(key => plays[key]) : [];
    // if (play && Object.keys(play).length === 1) {
    // if (playerActions.length > 0) {
    return dispatch({
      type: gameActions.ROUND_OUTCOME,
      payload: { gameData }
    });
  });
};

export const makePlay = (GameKey, player1or2, playerAction) => dispatch => {
  console.log('in makePlay, gameRef:', GameKey, 'player1or2', player1or2, 'playerAction', playerAction);
  const gameValRef = `${player1or2}Actions`;
  console.log('player1or2:', player1or2, 'gameValRef', gameValRef);
  if (player1or2 && playerAction) {
    dispatch({
      type: gameActions.MAKE_PLAY,
      payload: { player1or2, playerAction },
    });
    const GameRef = GamesRef().child(GameKey);
    // const GameRef = Games

    // only submit the move if the current count of playerMoves in firebase is less than the current round
    // return GameRef.child(gameValRef).

    return GameRef.child(gameValRef).push(playerAction)
      .then(ref => {
        console.log('added player action, playerAction:', playerAction, 'gameValRef', gameValRef, 'ref:', ref);
      });
  }
  else {
    return Promise.reject(new Error('unable to make play'));
  }

  // // This is for only having a single player move recorded in Firebase, and just updating on each round. I replaced this with a collection of moves, one for each round
  // return GameRef.update({
  //   // [player1or2 + "_Actions"]: playerAction
  //   [gameValRef]: playerAction
  // }).then((playActionRef) => {
  //   console.log('playActionRef', playActionRef);
  //   // this.setState({ playInProgress: true });
  // });
};

export const requestGame = (user, otherPlayer) => dispatch => {
  // console.log('in requestGame action request, user:', user, 'otherPlayer', otherPlayer);
  dispatch({
    type: gameActions.GAME_REQUESTED,
    payload: { user, otherPlayer }
  });

  const { uid: player1, displayName: player1Name } = user;
  // console.log('player1', player1);
  const maxNumberOfGames = 5;
  
  const { uid: player2, displayName: player2Name } = otherPlayer;
  if (player1 && player2 && player1.length > 0 && player2.length > 0) {
    // console.log('creating game');
    const newGame = {
      player1,
      player2,
      player1Wins: 0,
      player2Wins: 0,
      player1Name,
      player2Name,
      ties: 0,
      maxNumberOfGames,
      gameInProgress: true,
      round: 1,
    };
    // console.log('GamesRef():', GamesRef().toString());
    // Object.keys(GamesRef()).forEach(key => console.log('GamesRef key:', key, 'value:', GamesRef()[key] && GamesRef()[key].toString()));
    // return Promise.resolve(true);
    return GamesRef().push(newGame)
      .then(() => {
      // .then(ref => {
        // console.log('created new game, key is', ref.key);
        // return Promise.resolve(true);
        // rather than dispatch message, will use the firebase listener for new games to signal the new game
        // that way, the user will be notified of games created by other users as well as one the user creates.
        return dispatch({ type: gameActions.GAME_CREATED });
      // });
      })
      .catch(err => {
        console.log('error when creating new game', err);
        return Promise.reject(err);
      });
  }
  else {
    console.log('not creating new game');
    return Promise.reject(new Error('not creating new game'));
  }
};

