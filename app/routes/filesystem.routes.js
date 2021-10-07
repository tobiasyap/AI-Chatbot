module.exports = app => {
    const filesystem = require("../controllers/filesystem.controller.js");
    const upload = require('../middleware/upload')

    var router = require("express").Router();

    // Create a new File
    router.post("/", upload.single('avatar'), filesystem.create);

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

    router.get("/get/:id", async (req, res, next) => {
      const { id: _id } = req.params;
      const file = await filesystem.findOne({ _id }).lean().exec();
      res.send(file);
    });

    app.use('/api/filesystem', router);
  };