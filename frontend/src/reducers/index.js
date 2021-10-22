// Combine reducers

import { combineReducers } from "redux";
import files from "./files";
import chatbot from "./chatbot";
// import auth from "./auth";

export default combineReducers({
  files,
  chatbot
  // auth
});