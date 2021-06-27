import { combineReducers } from "redux";
import { memberReducer } from "./memberReducer";

const reducers = combineReducers({
  allMembers: memberReducer,
});

export default reducers;
