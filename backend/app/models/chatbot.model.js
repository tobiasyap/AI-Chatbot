// Create the mongoDB data model for chatbot

module.exports = mongoose => {
    const Chatbot = mongoose.model("chatbot",
      mongoose.Schema(
        {
          query: String,
          answer: String
        },
        { timestamps: true }
      )
    );
    return Chatbot;
}
