import React, { Component } from 'react';
import ChatBot from 'react-simple-chatbot';
import ChatbotComponent from './chatbot.component';
import { ThemeProvider } from "styled-components";
// import { connect } from "react-redux"
import botAvatar from "../bot.png";
// import userAvatar from ".png";

const theme = {
  background: "#fff",
  fontFamily: "Arial, Helvetica, sans-serif",
  headerFontColor: "#fff",
  headerFontSize: "20px",
  headerBgColor:"#014282",
  botBubbleColor: "#3BA2AB",
  botFontColor:"#fff",
  // userFontColor: "#3BA2AB"
};

const config ={
    width: "400px",
    height: "500px",
    floating: true,
  };

class AIChatBot extends Component {
  constructor(props) {
    super(props)
    this.state = {
      results: []
      // selectFile: null
    }
  }

  // async componentDidMount() {
  //   // await this.setState({
  //   //   selectFile: this.props.setActiveFile
  //   // })
  //   console.log(this.props)
  //   // console.log(this.state)
  // }

  render() {
    // const { selectFile } = this.state;

    return (
      <ThemeProvider theme={theme}>
      <ChatBot 
       botAvatar={botAvatar}
      //  floatingIcon={botAvatar}
      //  headerTitle="Chat with Mr FileSystem"
      //  userAvatar={userAvatar}
       steps={[
         {
          id:'intro', 
          message:'Hello there! How can I help you?', 
          trigger:'query',
         },
         {
          id:'query',
          user:true,
          // validator: (value) => {
          //   if (/^[A-Za-z][A-Za-z\'\-]+([\ A-Za-z][A-Za-z\'\-]+)*/.test(value)) {
          //     return true;
          //   } else {
          //     return "Please input alphabet characters only!";
          //   }
          // },
          trigger:'ans'
         },
         {
           id:'ans',
           component: <ChatbotComponent />,
           waitAction: true,
          //  delay: 100,
           asMessage:true,
           trigger: 'query'
         },
        //  {
        //    id:'return',
        //    message: {previousValue},
        //    trigger: 'query'
        //  }
        //  {
        //    id:'more',
        //    message:'Hope I answered your question!',
        //    delay: 5,
        //    trigger:'query'
        //  },
        //  {
        //    id:'options',
        //    options: [
        //      {value: 'y', label:'Yes', trigger:'query'},
        //      {value: 'n', label:'No', trigger:'end'}
        //    ]
        //  },
        //  {
        //    id:'end',
        //    message:'Alright, have a great day ahead!',
        //    trigger: 'query'
        //  }
         ]}
         {...config}
      />
     </ThemeProvider>
    );
  }
       
}
// const mapStateToProps = (state) => {
//   return {
//     results: state.chatbot.results
//   }
// }

export default AIChatBot;
// export default connect(mapStateToProps) (AIChatBot);