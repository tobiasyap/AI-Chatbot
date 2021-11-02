// Data service that uses axios object to send HTTP requests/ make API calls for filesystem

import http from "../http-common";

class FeedbackDataService {
    getFeedback(feedback) {
      return http.post("chatbot/feedback", feedback);
    }
}

export default new FeedbackDataService();