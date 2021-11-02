import {
    GET_FEEDBACK
} from "./types";

import FeedbackDataService from "../services/feedback.service";

// calls ChatbotDataService.getModel() and dispatches GET_MODEL
export const postFeedback = (feedback) => async (dispatch) => {
    try {
      const res = await FeedbackDataService.getFeedback({feedback});
      // console.log("Received response", res)
      console.log(res)
  
      dispatch({
        type: GET_FEEDBACK,
        payload: res.data,
      });

      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };