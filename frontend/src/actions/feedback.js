// For CRUD (create/retrieve/update/delete) actions for feedback

import {
    POST_FEEDBACK
} from "./types";

import FeedbackDataService from "../services/feedback.service";

// calls ChatbotDataService.getModel() and dispatches GET_MODEL
export const postFeedback = (feedback) => async (dispatch) => {
    try {
      const res = await FeedbackDataService.postFeedback(feedback);
      console.log(res)
  
      dispatch({
        type: POST_FEEDBACK,
        payload: res.data,
      });

      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };