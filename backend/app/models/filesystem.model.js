// Create the data model for mongoDB

module.exports = mongoose => {
    const FileSystem = mongoose.model(
      "filesystem",
      mongoose.Schema(
        {
          parent: String, // null if root folder
          doc: String, // should be the actual file
          metadata: { // for files only
            title: String,
            doc_cat: String,
            doc_type: String,
            doc_no: String,
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