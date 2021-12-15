  // To set up routes for filesystem and their responses

module.exports = app => {
  const filesystem = require("../controllers/filesystem.controller.js");
  const upload = require('../middleware/upload')

  var router = require("express").Router();

  // Create a new file
  router.post("/files", upload.single('doc'), filesystem.create);

  // Retrieve all files
  router.get("/files", filesystem.findAll);

  // Retrieve a single file with title
  router.get("/files?title=:title", filesystem.findAll);

  // Retrieve a single file with id
  router.get("/files/:id", filesystem.find);

  // Update a File with id
  router.put("/files/:id", filesystem.update);

  // Delete a File with id
  router.delete("/files/:id", filesystem.delete);

  // Delete all Files
  router.delete("/files", filesystem.deleteAll);

  app.use('/api/filesystem', router);
};