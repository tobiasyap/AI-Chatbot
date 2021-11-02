// Set up functions for chatbot to work with CRUD operations

const {spawn} = require('child_process')
const db = require("../models");
const File = db.feedback;

exports.getFeedback = (req, res) => {
    const file = new File({
        feedback:  req.body.feedback,
      });

      file
      .save(file)
      // .save(File, { validateBeforeSave: false })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Feedback."
        });
      });
};