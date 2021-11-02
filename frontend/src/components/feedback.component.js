// Interact with chatbot

import React, { Component } from "react";
import { connect } from "react-redux";
import { postFeedback } from "../actions/feedback";

class Feedback extends Component {
    constructor(props) {
        super(props);
        // this.selectFile = this.selectFile.bind(this);
        // this.updateDone = this.updateDone.bind(this);
        this.state = {
            query: "",
            done: false,
            reply: []
        };
    }

    async componentDidMount() {
        try { 
            await this.props.postFeedback({
                boolean: 'Yes',
                feedback: this.props.steps.log.message,
                user_query: this.props.steps.query.message
              })
        }
        catch(err) {
            await this.props.postFeedback({
                boolean: 'No',
                user_query: this.props.steps.query.message
              })
        }
        this.props.triggerNextStep();

        
        // const positive = this.props.results ? true : false
        // const results = this.props.results.length > 0 ? this.props.results : []
        // console.log(this.props.steps)

        await this.setState({
            // reply: results,
            // done: positive
        })

        // const xhr = new XMLHttpRequest();
        // const self = this;
        // function readyStateChange() {
        //     console.log(this.readyState)
        //     if (this.readyState === 4) {
        //         if (self.props.results.length > 0) {
        //             self.setState({
        //                 done: true,
        //                 reply: this.props.results
        //             })
        //         }
        //     }
        // }
        // xhr.addEventListener('readystatechange', readyStateChange);
        // xhr.send()

        // this.updateDone();
        this.props.triggerNextStep();
    }

    async selectFile(file) {
        // await this.props.setActiveFile(file['Document ID'])
    }

    async updateDone() {
        await this.setState({
            done: false
        })
    }

    async updateQuery(e) {
        await this.setState({
            query: e.target.value
        });
    }

    // componentDidUpdate() {

    // }

    // getSnapshotBeforeUpdate(prevProps, prevState) {
    //     if (prevProps.chatbot.length > this.props.chatbot.length) {

    //     }

    // }

    // async getReply() {
    //     // this.refreshData()
    //     await this.props.getModel(this.state.query);
    //     console.log(this.props);
    //     const result = this.props.chatbot
    //     const files = result[result.length]
    //     this.setState({
    //         // count: this.state.count + 1,
    //         reply: files
    //     });
    //     // console.log(this.state.reply)
    // }

    // async refreshData() {
    //     this.setState()
    //     await this.props.getModel(" ")
    // }

    render() {
        const { reply, done } = this.state;
        // const { results } = this.props;

        return (
            <div>Thank you for your feedback!</div>
        )
    }
}

const mapStateToProps = (state) => {
    // console.log(state)
    return {
        results: state.chatbot.results,
    };
};

export default connect(mapStateToProps, { postFeedback } )(Feedback)