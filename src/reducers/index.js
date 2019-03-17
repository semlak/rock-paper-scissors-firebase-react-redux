import { combineReducers } from "redux";

// import data from "./dataReducer";
import auth from './authReducer';
import gathering from './gatheringReducer';
import game from './gameReducer';
import modals from './modalsReducer';
import chat from './chatReducer';

export default combineReducers({
  // data,
  auth,
  gathering,
  game,
  modals,
  chat,
});
