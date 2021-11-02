// Create the data model for mongoDB
module.exports = mongoose => {
  const FileSystem = mongoose.model(
    "filesystem",
    mongoose.Schema(
      {
        // parent: String, // null if root folder
        title: String,       // document title
        doc_cat: String,     // document category
        doc_type: String,    // document type
        doc_no: String,      // document number i.e. RSE/SP/FS/02/220
        doc: String,         // quality documents - should be the actual file
        grp: String,         // group - root?
        subgrp: String,      // sub group - parent?
        created: Date,       // effective date
        revision_no: Number, // revision number
        text: String         // document text for chatbot processing
      },
      { timestamps: true }
    )
  );

  return FileSystem;
};

// old schema
/* module.exports = mongoose => {
  const FileSystem = mongoose.model(
    "filesystem",
    mongoose.Schema(
      {
        doc_no: String,
        parent: String, // null if root folder
        doc: String, // should be the actual file
        metadata: { // for files only
          title: String,
          doc_cat: String,
          doc_type: String,
          grp: String, // root
          subgrp: String, // parent
          created: Date,
          revision_no: Number
        },
        text: String
      },
      { timestamps: true }
    )
  );

  return FileSystem;
}; */