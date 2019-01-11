import { combineReducers } from "redux";

// import data from "./dataReducer";
import auth from './authReducer';
import gathering from './gatheringReducer';
import game from './gameReducer';

export default combineReducers({
  // data,
  auth,
  gathering,
  game,
});
