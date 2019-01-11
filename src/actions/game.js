// import firebase from '../firebase';
import firebase, { refs } from '../firebase';
// import { gatheringRef } from '../firebase';
// import Gathering from '../gathering';
import {
  gameActions,
} from './types';

// const GamesRef = firebase.database().ref(refs.games);
export const GamesRef = () => firebase.database().ref(refs.games);

export const endGame = gameUID => dispatch => {
  // console.log('GamesRef', GamesRef && GamesRef().toString());
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
const createOpponentActionListener = (gameRef, opponent) => dispatch => {
  // this is where the app checks for (or waits for) an opponent action
  // opponent is string that says 'player1' or 'player2'
  const refString = `${opponent}Actions`;
  console.log('creating opponent action listener', refString);
  return gameRef.child(refString).on('value', (snapshot) => {
    console.log('received updated on opponent action, snapshot.val()', snapshot.val());
    const play = snapshot.val();
    if (play) {
      dispatch({
        type: gameActions.PLAY_RECEIVED,
        payload: { player: opponent, play: snapshot.val() }
      });
    }
  });
};

export const createNewGameListener = myUid => dispatch => {
  // console.log('creating newGame listener');
  return GamesRef().on("child_added", (snapshot) => {
    const game = snapshot.val();
    console.log('detected new game added to GamesRef, myUid:', myUid, 'game:', game);
    if (game.player1 === myUid || game.player2 === myUid) {
      // console.log('new game is my game');
      // would like to add a check here or somewhere that prevents me from starting a game if I'm in an existing one.
      dispatch({
        type: gameActions.GAME_STARTED,
        payload: { gameKey: snapshot.key, gameData: game }
      });
      // const { player1, player2 } = game;
      const { player1 } = game;
      // const player1or2 = myUid === player1 ? 'player1' : 'player2';
      const opponent = myUid !== player1 ? 'player1' : 'player2';
      const gameRef = GamesRef().child(snapshot.key);

      // createGameListener(GamesRef().child(snapshot.key), player1or2);
      // createOpponentActionListener(dispatch, opponent);
      dispatch(createEndGameListener(gameRef));
      dispatch(createOpponentActionListener(gameRef, opponent));
    }
    else {
      console.log('new game is not my game');
    }
  });
};

// export const createGameListener = (gameRef, player1or2) => dispatch => {
//   // console.log('creating listener for gameRef', gameRef);
//   // GameRef = gameRef;
//   gameRef.on('value', (snapshot) => {
//     console.log('received update for game, snapshot.val()', snapshot.val());
//   });
//   // GameRef.on
// };

export const makePlay = (GameKey, player1or2, playerAction) => dispatch => {
  console.log('in makePlay, gameRef:', GameKey, 'player1or2', player1or2, 'playerAction', playerAction);
  const gameValRef = `${player1or2}Actions`;
  console.log('player1or2:', player1or2, 'gameValRef', gameValRef);
  if (player1or2 && playerAction) {
    dispatch({
      type: gameActions.MAKE_PLAY,
      payload: { player1or2, playerAction },
    });
  }
  const GameRef = GamesRef().child(GameKey);
  // const GameRef = Games

  // only submit the move if the current count of playerMoves in firebase is less than the current round
  // return GameRef.child(gameValRef).

  return GameRef.child(gameValRef).push(playerAction)
    .then(ref => {
      console.log('added player action, playerAction:', playerAction, 'gameValRef', gameValRef, 'ref:', ref);
    });

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
    console.log('creating game');
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
      .then(ref => {
        console.log('created new game, key is', ref.key);
        // rather than dispatch message, will use the firebase listener for new games to signal the new game
        // that way, the user will be notified of games created by other users as well as one the user creates.
      });
  }
  else {
    console.log('not creating new game');
    return Promise.reject(new Error('not creating new game'));
  }
};
