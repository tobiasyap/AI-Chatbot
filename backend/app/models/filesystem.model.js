// Create the mongoDB data model for filesystem

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