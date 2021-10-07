// Create the data model for mongoDB

module.exports = mongoose => {
    const FileSystem = mongoose.model(
      "filesystem",
      mongoose.Schema(
        {
          parent: String, // null if root folder
          avatar: String,
          metadata: { // for files only
            title: String,
            doc_cat: String,
            doc_type: String,
            doc_no: String,
            doc: String, // should be the actual file
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