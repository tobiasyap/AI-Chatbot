// Data service that uses axios object to send HTTP requests/ make API calls for filesystem

import http from "../http-common";

class ChatbotDataService {
    getModel(query) {
      return http.post("chatbot/nlp-model", query);
    }
}

export default new ChatbotDataService();
