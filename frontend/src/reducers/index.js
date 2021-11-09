// Combine reducers (Chatbot and Files)

import { combineReducers } from "redux";
import files from "./files";
import chatbot from "./chatbot";

export default combineReducers({
  files,
  chatbot
});