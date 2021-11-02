// Set up functions for chatbot to work with CRUD operations

const {spawn} = require('child_process')
const db = require("../models");
const Feedback = db.feedback;

exports.postFeedback = (req, res) => {
    const feedback = new Feedback({
      boolean: req.body.boolean,
      feedback:  req.body.feedback,
      user_query: req.body.user_query
      });

      feedback
      .save(feedback)
      // .save(File, { validateBeforeSave: false })
      .then(data => {
        res.send(data);
        console.log("sending feedback...")
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Feedback."
        });
      });
};