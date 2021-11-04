// Displays file details 

import React, { Component } from "react";
import { connect } from "react-redux";
import { updateFile, deleteFile } from "../actions/files";
import FileDataService from "../services/file.service";

class File extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.getFile = this.getFile.bind(this);
    this.updateStatus = this.updateStatus.bind(this);
    this.updateContent = this.updateContent.bind(this);
    this.removeFile = this.removeFile.bind(this);

    this.state = {
      currentFile: {
        id: null,
        title: "",
        description: "",
        published: false,
      },
      message: "",
    };
  }

  componentDidMount() {
    this.getFile(this.props.match.params.id);
  }

  onChangeTitle(e) {
    const title = e.target.value;

    this.setState(function (prevState) {
      return {
        currentFile: {
          ...prevState.currentFile,
          title: title,
        },
      };
    });
  }

  onChangeDescription(e) {
    const description = e.target.value;

    this.setState((prevState) => ({
      currentFile: {
        ...prevState.currentFile,
        description: description,
      },
    }));
  }

  getFile(id) {
    FileDataService.get(id)
      .then((response) => {
        this.setState({
          currentFile: response.data,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  updateStatus(status) {
    var data = {
      id: this.state.currentFile.id,
      title: this.state.currentFile.title,
      description: this.state.currentFile.description,
      published: status,
    };

    this.props
      .updateFile(this.state.currentFile.id, data)
      .then((reponse) => {
        console.log(reponse);

        this.setState((prevState) => ({
          currentFile: {
            ...prevState.currentFile,
            published: status,
          },
        }));

        this.setState({ message: "The status was updated successfully!" });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  updateContent() {
    this.props
      .updateFile(this.state.currentFile.id, this.state.currentFile)
      .then((reponse) => {
        console.log(reponse);
        
        this.setState({ message: "The File was updated successfully!" });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  removeFile() {
    this.props
      .deleteFile(this.state.currentFile.id)
      .then(() => {
        this.props.history.push("/Files");
      })
      .catch((e) => {
        console.log(e);
      });
  }

  render() {

    const { currentFile } = this.state;

    return (
      <div>
        {currentFile ? (
          <div className="edit-form">
            <h2>File</h2>
            <form>
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  value={currentFile.title}
                  onChange={this.onChangeTitle}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  value={currentFile.description}
                  onChange={this.onChangeDescription}
                />
              </div>

              <div className="form-group">
                <label>
                  <strong>Status:</strong>
                </label>
                {currentFile.published ? "Published" : "Pending"}
              </div>
            </form>

            {currentFile.published ? (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updateStatus(false)}
              >
                UnPublish
              </button>
            ) : (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updateStatus(true)}
              >
                Publish
              </button>
            )}

            <button
              className="badge badge-danger mr-2"
              onClick={this.removeFile}
            >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateContent}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a file...</p>
          </div>
        )}
      </div>
    );
  }
}

export default connect(null, { updateFile, deleteFile })(File);