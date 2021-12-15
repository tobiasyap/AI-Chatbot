// Set up functions for chatbot feedback to work with CRUD operations

const db = require("../models");
const Feedback = db.feedback;

exports.postFeedback = (req, res) => {
  const feedback = new Feedback({
    boolean: req.body.boolean,
    feedback: req.body.feedback,
    user_query: req.body.user_query,
  });

  feedback
    .save(feedback)
    .then((data) => {
      res.send(data);
      console.log("sending feedback...");
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Feedback.",
      });
    });
};

exports.getFeedback = (req, res) => {
  // Retrieve all Feedback and Queries from the database.
  Feedback.find({})
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Files.",
      });
    });
};
