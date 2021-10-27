// Interact with chatbot

import React, { Component } from "react";
// import { Link } from "react-router-dom";
// import { Link } from "react-bootstrap";
import { connect } from "react-redux";
// import { update } from "../../../backend/app/controllers/filesystem.controller";
import { getModel } from "../actions/chatbot";
import { setActiveFile } from "../actions/files";
// import { store } from "../store"
// import { Link } from "react-router-dom";
// import { Container, Nav } from "react-bootstrap"

class Chatbot extends Component {
    constructor(props) {
        super(props);
        this.selectFile = this.selectFile.bind(this);
        this.updateDone = this.updateDone.bind(this);
        // this.refreshData = this.refreshData.bind(this);
        // this.getReply = this.getReply.bind(this);
        this.state = {
            query: "",
            done: false,
            reply: []
        };
    }

    async componentDidMount() {
        await this.props.getModel(this.props.steps.query.message)
        const positive = this.props.results ? true : false
        const results = this.props.results.length > 0 ? this.props.results : []

        await this.setState({
            reply: results,
            done: positive
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
        await this.props.setActiveFile(file['Document ID'])
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
            <div>
                {/* <input placeholder="Enter query:" value={query}
                        className="input"
                        onChange={this.updateQuery}/>
                <button type="button" onClick={this.getReply}>Ask</button> */}

                <div>
                    {done ? ( 
                    <div>
                        {reply.length > 0 ? (
                            <div>
                            These are likely the documents you are looking for:
                        <ol>
                         {reply && 
                            reply.map((res, index) => (    
                                <div>   
                                    <li class='list-link' href="#" key={index} onClick={() => this.selectFile(res)}> 
                                            {/* {res['Document ID']} */}
                                        <div class='link'>
                                        <strong>
                                            {res['Document ID']}
                                        </strong>
                                        </div>
                                    <div className='info'>
                                        {res['Document Description']}
                                    </div>
                                    </li>
                                </div>
                            ))}
                        </ol>
                    </div>) : (
                    <div> Sorry, I couldn't find anything. Could you enter a more specific query? </div> ) }
                </div>
                    ) : ( <div> Loading... </div> )} 
            </div>
        </div>
        );
    }
}

const mapStateToProps = (state) => {
    // console.log(state)
    return {
        results: state.chatbot.results,
    };
};

export default connect(mapStateToProps, { getModel, setActiveFile } )(Chatbot)