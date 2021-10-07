// Main server script where everything works

const express = require("express");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// // parse requests of content-type - application/json
// app.use(bodyParser.json());

// // parse requests of content-type - application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./app/models");

var fs = require('fs');
const { controller } = require("./app/controllers/filesystem.controller");
var data = fs.readFileSync('docs.txt', 'utf8').toString();
var docs = JSON.parse(data);

// connect to database and insert files
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }, function(err, db) {
    if (err) {
      console.log("Cannot connect to the database:", err)
      process.exit();
    } else {
      console.log(db);
      db.models.filesystem.deleteMany()
        .then(response => {
          console.log("response:", response);
        }).catch(err => {
          console.log("Cannot delete the documents:", err);
        }) // end of deletion
      db.models.filesystem.insertMany(docs, function(error, inserted) {
          // console.log("Successfully inserted: ", inserted);
          console.log("Successfully inserted");
      }).catch(err => {
        console.log("Cannot insert the documents:", err);
      }) // end of insertion
    }
  }) // end of connection

// simple test route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the filesystem application." });
});

// insert all documents 
// app.post("/files", (req, res) => {
//   controller.createAll(docs)
// })

// delete all documents
// app.post("/delete", (req, res) => {
//   controller.deleteAll()
// })

require("./app/routes/filesystem.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});