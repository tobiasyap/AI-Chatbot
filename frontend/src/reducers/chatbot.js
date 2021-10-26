import {
    GET_MODEL
} from "../actions/types";
  
const initState = {
  results: null
};
// const initState= [];

function chatbotReducer(state = initState, action) {
    const { type, payload } = action;
  
    switch (type) {
      case GET_MODEL:
        console.log(payload)
        // return payload
        return {
          ...state,
          results: payload
        }
        // return [...state, payload];
  
      default:
        return state;
    }
};
  
export default chatbotReducer;