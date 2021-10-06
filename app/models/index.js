// Configuring mongoDB to work

const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.filesystem = require("./filesystem.model.js")(mongoose);

module.exports = db;