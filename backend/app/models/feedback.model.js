// Create the mongoDB data model for feedback

module.exports = mongoose => {
    const Feedback = mongoose.model("feedback",
      mongoose.Schema(
        {
          boolean: String,
          feedback: String,
          user_query: String,
        },
        { timestamps: true }
      )
    );
    return Feedback;
}
