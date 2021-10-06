// Set up functions to work with CRUD operations

const db = require("../models");
const File = db.filesystem;

// Create and Save a new Document
exports.create = (req, res) => {
    // Validate request
    if (!req.body.parent) {
      res.status(400).send({ message: "Content can not be empty!" });
      return;
    }

    // Create a new document by creating an instance of the model
    const file = new File({
      parent: req.body.parent, // null if root folder
      metadata: req.body.metadata
    });

    // Save document in the database
    file
      .save(file)
      // .save(File, { validateBeforeSave: false })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the File."
        });
      });
  };

// Retrieve all Files from the database.
exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};

    File.find(condition)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Files."
        });
      });
  };

// Find a single File with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    File.findById(id)
      .then(data => {
        if (!data)
          res.status(404).send({ message: "Not found File with id " + id });
        else res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Error retrieving File with id=" + id });
      });
  };

// Update a File by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
      return res.status(400).send({
        message: "Data to update can not be empty!"
      });
    }

    const id = req.params.id;

    File.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot update File with id=${id}. Maybe File was not found!`
          });
        } else res.send({ message: "File was updated successfully." });
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating File with id=" + id
        });
      });
  };

// Delete a File with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    File.findByIdAndRemove(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete File with id=${id}. Maybe File was not found!`
          });
        } else {
          res.send({
            message: "File was deleted successfully!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete File with id=" + id
        });
      });
  };

// Delete all Files from the database.
exports.deleteAll = (req, res) => {
    File.deleteMany({})
      .then(data => {
        res.send({
          message: `${data.deletedCount} Files were deleted successfully!`
        });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all Files."
        });
      });
  };

// Find all published Files
exports.findAllPublished = (req, res) => {
    File.find({ published: true })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Files."
        });
      });
  };