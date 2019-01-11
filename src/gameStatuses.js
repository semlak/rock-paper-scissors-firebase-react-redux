// export const GAME_IN_PROGRESS = 'GAME_IN_PROGRESS';

const gameStatus = {
  NO_GAME: 'NO_GAME',

  // Game has began, but no other player actions have taken place yet
  GAME_STARTED: 'GAME_STARTED',

  // Neither player has made a move since the last round was resolved. This could be used to avoide 'GAME_STARTED' from being necessary
  WAITING_FOR_BOTH_PLAYERS: 'WAITING_FOR_BOTH_PLAYERS',

  // The player has made their move, and app is waiting for opponent. The app should disable user's ability to make another play while waiting
  PLAY_MADE_WAITING_FOR_OPPONENT: 'PLAY_MADE_WAITING_FOR_OPPONENT',

  // The player's opponent has made move and is waiting for user to still play
  OPPONENT_PLAY_WAITING_FOR_USER: 'OPPONENT_PLAY_WAITING_FOR_USER',

  // Both players have made their play. App is determining winner. Neither player should be able to make their next move during this status
  DETERMINING_ROUND_WINNER: 'DETERMINING_ROUND_WINNER',

  // Game is ended. Either due to player selecting to end the game, or because either player has won enough games to win the match (default is best of 5 rounds)
  GAME_ENDED: 'GAME_ENDED',
};

export default gameStatus;
