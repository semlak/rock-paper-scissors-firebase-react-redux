export const userActions = {
  FETCH_USER: 'FETCH_USER',
  SIGNIN_REQUEST: 'SIGNIN_REQUEST',
  SIGNIN_SUCCESSFUL: 'SIGNIN_SUCCESSFUL',
  SIGNIN_ERROR: 'SIGNIN_ERROR',
  SIGNOUT_SUCCESSFUL: 'SIGNOUT_SUCCESSFUL',
  SIGNOUT_REQUEST: 'SIGNOUT_REQUEST',
  SIGNOUT_ERROR: 'SIGNOUT_ERROR',
  REGISTER_USER: 'REGISTER_USER',
  LOGIN_USER: 'LOGIN_USER',
  EMAIL_PASSWORD_LOGIN_ATTEMPT: 'EMAIL_PASSWORD_LOGIN_ATTEMPT',
  EMAIL_PASSWORD_LOGIN_SUCCESS: 'EMAIL_PASSWORD_LOGIN_SUCCESS',
  EMAIL_PASSWORD_LOGIN_FAIL: 'EMAIL_PASSWORD_LOGIN_FAIL',
  EMAIL_PASSWORD_REGISTRATION_ATTEMPT: 'EMAIL_PASSWORD_REGISTRATION_ATTEMPT',
  EMAIL_PASSWORD_REGISTRATION_SUCCESS: 'EMAIL_PASSWORD_REGISTRATION_SUCCESS',
  EMAIL_PASSWORD_REGISTRATION_FAIL: 'EMAIL_PASSWORD_REGISTRATION_FAIL',
};

export const gatheringActions = {
  FETCH_PLAYERS: 'FETCH_PLAYERS',
  JOIN_GATHERING: 'JOIN_GATHERING',
  LEAVE_GATHERING: 'LEAVE_GATHERING',
};

export const gameActions = {
  GAME_REQUESTED: 'GAME_REQUESTED',
  GAME_CREATED: 'GAME_CREATED',
  GAME_STARTED: 'GAME_STARTED',
  GAME_ENDED: 'GAME_ENDED',
  MAKE_PLAY: 'MAKE_PLAY',
  PLAY_IN_PROGRESS: 'PLAY_IN_PROGRESS',
  PLAY_RECEIVED: 'PLAY_RECEIVED',
  ROUND_OUTCOME: 'ROUND_OUTCOME',
};

export const modalActions = {
  OPEN_AUTHENTICATION_MODAL: 'OPEN_AUTHENTICATION_MODAL',
  CLOSE_AUTHENTICATION_MODAL: 'CLOSE_AUTHENTICATION_MODAL',
  TOGGLE_AUTHENTICATION_MODAL: 'TOGGLE_AUTHENTICATION_MODAL',
};