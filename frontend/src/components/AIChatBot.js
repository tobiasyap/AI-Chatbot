// For AI Chatbot interaction dialog flow

import React, { Component } from "react";
import ChatBot from "react-simple-chatbot";
import ChatbotComponent from "./ChatbotModel";
import FeedbackComponent from "./ChatbotFeedback";
import { ThemeProvider } from "styled-components";
import botAvatar from "../assets/bot.png";
// import userAvatar from ".png";

const theme = {
  background: "#fff",
  fontFamily: "Arial, Helvetica, sans-serif",
  headerFontColor: "#fff",
  headerFontSize: "20px",
  headerBgColor: "rgb(9, 50, 92)",
  botBubbleColor: "#3BA2AB",
  botFontColor: "#fff",
  // userFontColor: "#3BA2AB" // user font color can be set
};

const config = {
  width: "400px",
  height: "500px",
  floating: true,
};

class AIChatBot extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
    };
  }

  render() {
    return (
      <ThemeProvider theme={theme}>
        <ChatBot
          botAvatar={botAvatar}
          //  floatingIcon={botAvatar} // floatingIcon can be changed
          //  headerTitle="Chat with Filesystem Chatbot" // chat window title can be changed
          //  userAvatar={userAvatar} // user avatar can be changed
          steps={[
            {
              id: "intro",
              message: "Hello there! How can I help you?",
              trigger: "query",
            },
            {
              id: "query",
              user: true,
              trigger: "ans",
            },
            {
              id: "ans",
              component: <ChatbotComponent />,
              waitAction: true,
              asMessage: true,
              trigger: "more",
            },
            {
              id: "more",
              message: "Did I answer your question?",
              trigger: "options",
            },
            {
              id: "options",
              options: [
                { value: "y", label: "Yes", trigger: "endfeedback" },
                { value: "n", label: "No", trigger: "feedback" },
              ],
            },
            {
              id: "feedback",
              message:
                "Could you tell me more about what you have searched and what you were expecting?",
              trigger: "log",
            },
            {
              id: "log",
              user: true,
              trigger: "endfeedback",
            },
            {
              id: "endfeedback",
              component: <FeedbackComponent />,
              waitAction: true,
              asMessage: true,
              trigger: "query"
            }
          ]}
          {...config}
        />
      </ThemeProvider>
    );
  }
}

export default AIChatBot;
