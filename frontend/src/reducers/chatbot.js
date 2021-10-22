import {
    GET_MODEL
} from "../actions/types";
  
const initialState = [];

function chatbotReducer(bot = initialState, action) {
    const { type, payload } = action;
  
    switch (type) {
      case GET_MODEL:
        return [...bot, payload];
  
      default:
        return bot;
    }
};
  
export default chatbotReducer;