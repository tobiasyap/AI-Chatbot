// Create the data model for mongoDB

module.exports = mongoose => {
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
  };

  // Proposed new schema
/* module.exports = mongoose => {
  const FileSystem = mongoose.model(
    "filesystem",
    mongoose.Schema(
      {
        // parent: String, // null if root folder
        title: String,
        doc_cat: String,
        doc_type: String,
        doc_no: String,
        doc: String,         // should be the actual file
        grp: String,         // root
        subgrp: String,      // parent
        created: Date,       // effective date
        revision_no: Number,
        text: String         // document text for processing?
      },
      { timestamps: true }
    )
  );

  return FileSystem;
}; */