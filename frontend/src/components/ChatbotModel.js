// For Chatbot to send query to model and return output

import React, { Component } from "react";
import { connect } from "react-redux";
import { getModel } from "../actions/chatbot";
import { setActiveFile } from "../actions/files";

class Chatbot extends Component {
  constructor(props) {
    super(props);
    this.selectFile = this.selectFile.bind(this);
    this.updateDone = this.updateDone.bind(this);
    this.state = {
      query: "",
      done: false,
      reply: [],
    };
  }

  async componentDidMount() {
    await this.props.getModel(this.props.steps.query.message);
    const positive = this.props.results ? true : false;
    const results = this.props.results.length > 0 ? this.props.results : [];

    await this.setState({
      reply: results,
      done: positive,
    });

    if (this.state.reply.length) {
      this.props.triggerNextStep();
    } else {
      this.props.triggerNextStep( {trigger: 'query' });
    }
  }

  async selectFile(file) {
    await this.props.setActiveFile(file["Document ID"]);
  }

  async updateDone() {
    await this.setState({
      done: false,
    });
  }

  async updateQuery(e) {
    await this.setState({
      query: e.target.value,
    });
  }

  render() {
    const { reply, done } = this.state;

    return (
      <div>
        <div>
          {done ? (
            <div>
              {reply.length > 0 ? (
                <div>
                  These are likely the documents you are looking for:
                  <ol className="list">
                    {reply &&
                      reply.map((res, index) => (
                        <div>
                          <li
                            class="list-link"
                            href="#"
                            key={index}
                            onClick={() => this.selectFile(res)}
                          >
                            <div class="link">
                              <b>{res["Document Description"]}</b>
                            </div>
                            <div className="info">{res["Document ID"]}</div>
                          </li>
                        </div>
                      ))}
                  </ol>
                </div>
              ) : (
                <div>
                  {" "}
                  Sorry, I couldn't find anything. Could you enter a more
                  specific query?{" "}
                </div>
              )}
            </div>
          ) : (
            <div> Loading... </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    results: state.chatbot.results,
  };
};

export default connect(mapStateToProps, { getModel, setActiveFile })(Chatbot);
