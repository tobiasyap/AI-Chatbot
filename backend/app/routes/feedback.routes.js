  // To set up routes for feedback

  module.exports = app => {
    const feedback = require("../controllers/feedback.controller.js");
  
    var router = require("express").Router();
  
    // Create a new file
    router.post("/feedback", feedback.postFeedback);
  
    // Retrieve a single file with title
    // router.get("/files?title=:title", filesystem.findAll);
    app.use('/api', router);
  }