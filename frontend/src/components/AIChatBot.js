import React, { Component } from 'react';
import ChatBot from 'react-simple-chatbot';

const config ={
    width: "400px",
    height: "500px",
    floating: true,
  };

class AIChatBot extends Component {
  render() {
    return (
      <ChatBot 
       steps={[
         {
          id:'intro', 
          message:'Hello world. I am a chatbot.', 
          end:true,
         },
         ]}
         {...config}
      />
    );
  }
       
}

export default AIChatBot;
