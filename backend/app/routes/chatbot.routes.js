  // To set up routes for chatbot and their responses

  module.exports = app => {
    const chatbot = require("../controllers/chatbot.controller.js");
  
    var router = require("express").Router();
  
    // Create a new file
    router.post("/nlp-model", chatbot.getModel);
  
    // Retrieve a single file with title
    // router.get("/files?title=:title", filesystem.findAll);
    app.use('/api/chatbot', router);
  }