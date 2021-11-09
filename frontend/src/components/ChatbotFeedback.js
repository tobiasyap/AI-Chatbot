// For obtaining and saving feedback from Chatbot to database

import React, { Component } from "react";
import { connect } from "react-redux";
import { postFeedback } from "../actions/feedback";

class Feedback extends Component {
    constructor(props) {
        super(props);
        this.state = {
            query: "",
            done: false,
            reply: []
        };
    }

    async componentDidMount() {
        this.props.steps.options.message === "No" ? 
        await this.props.postFeedback({
            boolean: 'Yes',
            feedback: this.props.steps.log.message,
            user_query: this.props.steps.query.message
            }) : 
        await this.props.postFeedback({
            boolean: 'No',
            user_query: this.props.steps.query.message
            })
        this.props.triggerNextStep();
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

    render() {
        return (
            <div>Thank you for your feedback!</div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        results: state.chatbot.results,
    };
};

export default connect(mapStateToProps, { postFeedback } )(Feedback)
