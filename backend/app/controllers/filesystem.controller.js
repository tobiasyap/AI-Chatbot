// Set up functions for filesystem to work with CRUD operations

const db = require("../models");
const File = db.filesystem;
const {spawn} = require('child_process')

// Create and Save a new Document
exports.create = (req, res) => {
    // Validate request
    if (!req.body.title) {
      res.status(400).send({ message: "Content can not be empty!" });
      return;
    }

    // Create a new document by creating an instance of the model
    const file = new File({
      title: req.body.title,       
      doc_cat: req.body.doc_cat,    
      doc_type: req.body.doc_type,   
      doc_no: req.body.doc_no,      
      doc: req.body.doc,       
      grp: req.body.grp,        
      subgrp: req.body.subgrp,   
      created: req.body.created,     
      revision_no: req.body.revision_no,
      text: req.body.text      
    });

    if(req.file) {
      file.doc = req.file.filename
    }

    // Save File in the database
    file
      .save(file)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the File."
        });
      });

    // Update corpus with newly saved file
    try {
      console.log('python', process.cwd() + '/nlp-model/update_tfidf_corpus.py')
      // Mac users change below code to python3
      const python = spawn('python', [process.cwd() + "/nlp-model/update_tfidf_corpus.py"])
      python.stderr.on('data', function(data) {
        console.log("There is an error!");
        console.log(Buffer.from(data, 'utf-8').toString());
      })
    }
    catch(err) {
      console.log(err);
    }
  };

// Create and save all Documents
exports.createAll = (req, res) => {
    // Validate request
    if (!req.body.title) {
      res.status(400).send({ message: "Content can not be empty!" });
      return;
    }
  
    console.log(req.body)
    File.insertMany(req.body, function(error, inserted) {
      if (error) {
        console.log(error.message || "Some error occurred while creating the File.");
      } else {
        console.log("Successfully inserted: ", inserted);
      }
    })
} 

// Retrieve all Files from the database.
exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { "title" : { $regex: new RegExp(title), $options: "i" } } : {};
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
exports.find = (req, res) => {
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
