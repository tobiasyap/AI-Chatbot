// Configuring mongoDB for connection

const dbConfig = require("../config/db.config.js"); // contains the mongoDB URI

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.filesystem = require("./filesystem.model.js")(mongoose);
db.feedback = require("./feedback.model.js")(mongoose);

module.exports = db;