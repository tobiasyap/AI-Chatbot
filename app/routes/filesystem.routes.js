module.exports = app => {
    const filesystem = require("../controllers/filesystem.controller.js");

    var router = require("express").Router();

    // Create a new File
    router.post("/", filesystem.create);

    // Retrieve all files
    router.get("/", filesystem.findAll);

    // Retrieve all published files
    router.get("/published", filesystem.findAllPublished);

    // Retrieve a single File with id
    router.get("/:id", filesystem.findOne);

    // Update a File with id
    router.put("/:id", filesystem.update);

    // Delete a File with id
    router.delete("/:id", filesystem.delete);

    // Delete all Files
    router.delete("/", filesystem.deleteAll);

    app.use('/api/filesystem', router);
  };