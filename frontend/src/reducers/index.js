// Combine reducers

import { combineReducers } from "redux";
import files from "./files";
// import auth from "./auth";

export default combineReducers({
  files,
  // auth
});