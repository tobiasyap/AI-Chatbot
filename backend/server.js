// Main server script that runs all backend processes

const express = require("express");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const db = require("./app/models");

var fs = require('fs');
// var data = fs.readFileSync('./nlp-model/docs.txt', 'utf8').toString();
// var docs = JSON.parse(data);

// connect to database and insert files
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }, async function(err, db) {
    if (err) {
      console.log("Cannot connect to the database:", err)
      process.exit();
    } else {
      // // delete all files in database
      // await db.models.filesystem.deleteMany().then(response => {
      //   console.log("response:", response);
      // }, error => { 
      //   console.log("Cannot delete the documents:", error);
      // }) // end of deletion 
      // // insert all documents in current version of docs.txt to database
      // await db.models.filesystem.insertMany(docs).then(response => {
      //   console.log("Successfully inserted");
      // }, error => {
      //   console.log("Cannot insert the documents:", error);
      // }) // end of insertion
      // // delete all feedbacks in database
      // await db.models.feedback.deleteMany().then(response => {
      //   console.log("response:", response);
      // }, error => {
      //   console.log("Cannot delete feedbacks:", error);
      // }) // end of deleting feedbacks
    }
  }) // end of connection

// simple test route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the filesystem application." });
});

require("./app/routes/filesystem.routes")(app);
require("./app/routes/chatbot.routes")(app);
require("./app/routes/feedback.routes")(app);
require("./nlp-model/tika")(app);
require("./nlp-model/scheduler")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});