// Create the mongoDB data model for feedback

module.exports = mongoose => {
    const Feedback = mongoose.model("feedback",
      mongoose.Schema(
        {
          feedback: String,
        },
        { timestamps: true }
      )
    );
    return Feedback;
}
