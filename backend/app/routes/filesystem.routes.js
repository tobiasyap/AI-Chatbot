// To set up routes and their responses

module.exports = app => {
    const filesystem = require("../controllers/filesystem.controller.js");

    var router = require("express").Router();

    // Create a new file
    router.post("/files", filesystem.create);

    // Retrieve all files
    router.get("/files", filesystem.findAll);

    // Retrieve a single file with title
    router.get("/files?title=:title", filesystem.findAll);

    // Retrieve all published files
    // router.get("/published", filesystem.findAllPublished);

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