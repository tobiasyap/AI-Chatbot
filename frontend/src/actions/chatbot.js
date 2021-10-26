// For CRUD (create/retrieve/update/delete) actions on chatbot

import {
    GET_MODEL
} from "./types";

import ChatbotDataService from "../services/chatbot.service";

// calls ChatbotDataService.getModel() and dispatches GET_MODEL
export const getModel = (query) => async (dispatch) => {
    try {
      const res = await ChatbotDataService.getModel({query});
      // console.log("Received response", res)
      console.log(res)
  
      dispatch({
        type: GET_MODEL,
        payload: res.data,
      });

      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };