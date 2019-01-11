// import { FETCH_PLAYERS, JOIN_GATHERING, LEAVE_GATHERING } from "../actions/types";
import { gatheringActions } from '../actions/types';

export default (state = {}, action) => {
  // console.log('received dispatch in Gathering reducer, state:', state, 'action:', action);
  // if ([FETCH_PLAYERS, JOIN_GATHERING, LEAVE_GATHERING].indexOf(action.type) > -1) {
  // if (Object.keys(gatheringActions).indexOf(action.type) > -1) {
  //   console.log('received dispatch in Gathering reducer, state:', state, 'action:', action);
  // }
  switch (action.type) {
    case gatheringActions.JOIN_GATHERING:
      return action.payload;
    case gatheringActions.FETCH_PLAYERS:
      return { ...state, onlinePlayers: action.payload };
    case gatheringActions.LEAVE_GATHERING:
      return {};
    default:
      return state;
  }
};
