// Data service that uses axios object to send HTTP requests/ make API calls for feedback

import http from "../http-common";

class FeedbackDataService {
    postFeedback(feedback) {
      return http.post("/feedback", feedback);
    }
}

export default new FeedbackDataService();