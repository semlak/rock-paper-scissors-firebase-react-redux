// import firebase from '../firebase';
import firebase, { refs } from '../firebase';
// import { gatheringRef } from '../firebase';
// import Gathering from '../gathering';
// import {
//   gameActions,
// } from './types';

// const GamesRef = firebase.database().ref(refs.games);
export const GamesRef = () => firebase.database().ref(refs.games);
export const GamesRefChild = (childRef) => firebase.database().ref(`${refs.games}/${childRef}`);

export const createEndGameListeners = gameRef => dispatch => {
  gameRef.child('gameInProgress').on('value', (snapshot) => {
    console.log('received gameInProgress change indicator');
    // do something
    // gameRef.once('value', (snapshot) => {
    //   const gameData1 = snapshot.val();
    //   dispatch({
    //     type: gameActions.GAME_UPDATE,
    //     payload: gameData1,
    //   });
    // });
  });

  return gameRef.child('gameClosed').on('value', (snapshot) => {
    console.log('received endGame indicator from firebase, snapshot.val()', snapshot.val());
    // do something
    // if (snapshot.val() == null || snapshot.val() === true) {
    //   const gameUID = gameRef.key;
    //   dispatch({
    //     type: gameActions.GAME_ENDED,
    //     payload: { gameUID }
    //   });
    // }
  });
};


export const createPlayerActionListener = (gameRef, player) => dispatch => {
  // this is where the app checks for (or waits for) a player action
  // player is string that says 'player1' or 'player2'
  const refString = `${player}Actions`;
  // console.log('creating player action listener', refString);
  return gameRef.child(refString).on('value', (snapshot) => {
    console.log('received updated on player action, snapshot.val()', snapshot.val());
    // do something

    // const plays = snapshot.val();
    // const playerActions = plays && Object.keys(plays).length > 0 ? Object.keys(plays).map(key => plays[key]) : [];
    // // if (play && Object.keys(play).length === 1) {
    // if (playerActions.length > 0) {
    //   console.log('playerActions for player', player, playerActions);
    //   dispatch({
    //     type: gameActions.PLAY_RECEIVED,
    //     payload: { player, playerActions }
    //   });
    // }
  });
};

export const createRoundUpdateListener = (gameRef) => dispatch => {

  // console.log('creating player action listener', refString);
  return gameRef.child('round').on('value', () => {
    console.log('createRoundUpdateListener listener triggered');
    // do something
    // return gameRef.once('value', (snapshot) => {
    //   console.log('createRoundUpdateListener game snapshot', snapshot.val());
    //   const gameData = snapshot.val();
    //   dispatch({
    //     type: gameActions.GAME_UPDATE,
    //     // payload: { gameKey: snapshotKey, gameData: game }
    //     payload: gameData
    //   });
    // });
  });
};

export const createNewGameListener = myUid => dispatch => {
  // console.log('creating newGame listener, myUid', myUid);
  // return dispatch(newGameListenerEvent(myUid
  return GamesRef().on('child_added', (snapshot) => {
    // console.log('newGameListener fired, myUid:', myUid);
    // do something
    // return dispatch(newGameListenerEvent(myUid, snapshot.key, snapshot.val()));
  });
};

export const updateWithRoundOutcome = (gameData, gameKey, gameRef) => (dispatch) => {
  // const refString = `${player}Actions`;
  // console.log('creating player action listener', refString);
  // console.log('in updateWithRoundOutcome, gameData:', gameData);
  const { maxNumberOfGames } = gameData;
  const minNumberOfWins = Math.ceil(maxNumberOfGames / 2);
  // const { player1Actions, player2Actions } = gameData;
  const player1Actions = Object.values(gameData.player1Actions);
  const player2Actions = Object.values(gameData.player2Actions);
  // console.log('player1Actions', player1Actions, 'player2Actions', player2Actions); 
  const wins = player1Actions.map((player1Action, i) => {
    const player2Action = player2Actions[i];
    // console.log('player1Action', player1Action, 'player2Action', player2Action);
    // go through all scenarios where player 1 loses. 
    // If one of them hits, return 2 (for player 2 wins).
    // otherwise, they either tie (return 0) or player 1 wins (return 1)
    if (player1Action === 'rock' && player2Action === 'paper') {
      return 2;
    }
    else if (player1Action === 'paper' && player2Action === 'scissors') {
      return 2;
    }
    else if (player1Action === 'scissors' && player2Action === 'rock') {
      return 2;
    }
    else if (player1Action === player2Action) {
      // tie
      return 0;
    }
    else {
      // player 1 wins
      return 1;
    }
  });
  console.log('wins:', wins);
  const player1Wins = wins.reduce((acc, outcome) => (outcome === 1 ? 1 : 0) + acc, 0);
  const player2Wins = wins.reduce((acc, outcome) => (outcome === 2 ? 1 : 0) + acc, 0);
  const ties = wins.reduce((acc, outcome) => (outcome === 0 ? 1 : 0) + acc, 0);
  // set overall winner equal to the player number, or 0 if game is not over
  const winner = player1Wins >= minNumberOfWins ? 1 : player2Wins >= minNumberOfWins ? 2 : 0;
  const gameInProgress = (winner === 0);
  // increment round unless game is over. Get current round from number of player actions
  const round = player1Actions.length + (winner === 0 ? 1 : 0);
  // console.log('ties', ties, 'winner', winner, 'gameInProgress', gameInProgress, 'minNumberOfWins', minNumberOfWins);
  // const gameRef = GamesRef().child(gameKey);
  const gameRefToUse = typeof gameRef === 'undefined' ? GamesRefChild(gameKey) : gameRef;
  // if (typeof gameRef === 'undefined') {
  //   gameRef = GamesRefChild(gameKey);
  // }
  // console.log('gameRef', gameRef);
  // console.log('gameKey', gameKey);
  gameRefToUse.update({
    player1Wins, player2Wins, ties, gameInProgress, round, winner,
  });
};

export const getRoundOutcome = (GameKey) => (dispatch) => {
  // const refString = `${player}Actions`;
  // console.log('creating player action listener', refString);
  const GameRef = GamesRef().child(GameKey);
  return GameRef.once('value', (snapshot) => {
    console.log('received updated gameData from getRoundOutcome, snapshot.val()', snapshot.val());
    const gameData = snapshot.val();
    return dispatch(updateWithRoundOutcome(gameData, GameKey));
    // const playerActions = plays && Object.keys(plays).length > 0 ? Object.keys(plays).map(key => plays[key]) : [];
    // if (play && Object.keys(play).length === 1) {
    // if (playerActions.length > 0) {
    // return dispatch({
    //   type: gameActions.ROUND_OUTCOME,
    //   payload: { gameData }
    // });
  });
};
