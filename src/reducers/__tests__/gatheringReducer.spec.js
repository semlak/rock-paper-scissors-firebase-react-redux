import {
  gatheringActions,
  // FETCH_PLAYERS,
  // JOIN_GATHERING,
  // LEAVE_GATHERING
} from "../../actions/types";
import GatheringReducer from '../../reducers/gatheringReducer';

const initialState = {};

const expectedGatheringName = 'OnlineUsers';

const samplePlayers = [{
  displayName: "Joseph",
  inGame: false,
  photoURL: "https://lh3.googleusercontent.com/-eAHynpDPkO4/AAAAAAAAAAI/AAAAAAAAAAA/kMSNMCbxbvs/photo.jpg",
  uid: "ZhwskGVsLjS8nRqlRqwCoKv1pPu1",
}, {
  displayName: "Joseph Semlak",
  inGame: false,
  photoURL: "https://lh5.googleusercontent.com/-_w_poSLrAaE/AAAAAAAAAAI/AAAAAAAAAAA/AGDgw-hV44bGwICl_R0v9U_uCYDfZzgaWA/mo/photo.jpg",
  uid: "pJa4qrIO46YoGMXUfvj9VFllz142",
}];

const sampleGathering = {
  myName: { ...samplePlayers[0] },
  roomName: expectedGatheringName,
  user: { ...samplePlayers[0] },
};

const joinAction = {
  type: gatheringActions.JOIN_GATHERING,
  payload: sampleGathering,
};

const fetchAction = {
  type: gatheringActions.FETCH_PLAYERS,
  payload: samplePlayers,
};

describe('gatheringReducer', () => {
  describe('joining a gathering', () => {
    // note that this reduction does not really do much else. The main part is soon after when the player list is received that that is added to store
    it('should join gathering with expected name', () => {
      const newState = GatheringReducer(initialState, joinAction);
      expect(newState.roomName).toEqual(expectedGatheringName);
    });
  });
  describe('fetchPlayers', () => {
    it('should have onlinePlayers array property', () => {
      const gatheringState = GatheringReducer(initialState, joinAction);
      const newState = GatheringReducer(gatheringState, fetchAction);
      // console.log('onlinePlayers', newState.onlinePlayers);
      expect(Array.isArray(newState.onlinePlayers)).toEqual(true);
      expect(newState.onlinePlayers).toEqual(samplePlayers);
    });
    it('should not affect gathering properties other than onlionePlayers array', () => {
      const gatheringState = GatheringReducer(initialState, joinAction);
      const newState = GatheringReducer(gatheringState, fetchAction);
      expect(gatheringState.roomName).toEqual(newState.roomName);
      expect(gatheringState.myName).toEqual(newState.myName);
      expect(gatheringState.user).toEqual(newState.user);
    });
  });

  describe('leaveGathering', () => {
    describe('leaving the gathering results in gathering data being falsy', () => {
      const gatheringState = GatheringReducer(initialState, joinAction);
      const newState = GatheringReducer(gatheringState, { type: gatheringActions.LEAVE_GATHERING });
      expect(newState.roomName).toBeFalsy();
      expect(newState.onlionePlayers).toBeFalsy();
    });
  });
});
