// Interact with chatbot

import React, { Component } from "react";
import { connect } from "react-redux";
import { getModel } from "../actions/chatbot";
// import { Link } from "react-router-dom";
// import { Container, Nav } from "react-bootstrap"

class Chatbot extends Component {
    constructor(props) {
        super(props);
        // this.updateQuery = this.updateQuery.bind(this);
        // this.refreshData = this.refreshData.bind(this);
        // this.getReply = this.getReply.bind(this);
        this.state = {
            query: "",
            // count: 0
            reply: null
        };
    }

    componentDidMount() {
        this.props.getModel(this.props.steps.query.message);        
        console.log(this.props)
        const docsLength = this.props.chatbot.length
        const docs = this.props.chatbot
        console.log(docsLength)
        const modelReply = docs[docsLength]
        console.log(modelReply)
        this.setState({
            reply: modelReply
        })
    }

    updateQuery(e) {
        this.setState({
            query: e.target.value
        });
    }

    // componentDidUpdate() {

    // }

    // getSnapshotBeforeUpdate(prevProps, prevState) {
    //     if (prevProps.chatbot.length > this.props.chatbot.length) {

    //     }

    // }

    async getReply() {
        // this.refreshData()
        await this.props.getModel(this.state.query);
        console.log(this.props);
        const result = this.props.chatbot
        const files = result[result.length]
        this.setState({
            // count: this.state.count + 1,
            reply: files
        });
        // console.log(this.state.reply)
    }

    // async refreshData() {
    //     this.setState()
    //     await this.props.getModel(" ")
    // }

    render() {
        const { reply } = this.state;
        // const { query } = this.props;

        return (
            <div>
                {/* <input placeholder="Enter query:" value={query}
                        className="input"
                        onChange={this.updateQuery}/>
                <button type="button" onClick={this.getReply}>Ask</button> */}

                <div>
                    {this.props.chatbot[0] ? ( 
                    <div>
                        These are likely the documents you are looking for:
                        <ul>
                         {this.props.chatbot[0] && 
                            this.props.chatbot[0].map((res, index) => (
                            <li key={index}>
                                {res['Document Description']}
                            </li>
                        ))}
                    </ul>
                </div>
                  ) : ( <br/> )} 
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        chatbot: state.chatbot
    };
};

export default connect(mapStateToProps, { getModel } )(Chatbot)