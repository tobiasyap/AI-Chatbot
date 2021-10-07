// List down all the files

import React, { Component } from "react";
import { connect } from "react-redux";
import { retrieveFiles, findFilesByTitle, deleteAllFiles } from "../actions/files";
import { Link } from "react-router-dom";

class FileList extends Component {
    constructor(props) {
        super(props);
        this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
        this.refreshData = this.refreshData.bind(this);
        this.setActiveFile = this.setActiveFile.bind(this);
        this.findByTitle = this.findByTitle.bind(this);
        this.removeAllFiles = this.removeAllFiles.bind(this);
    
        this.state = {
          currentFile: null,
          currentIndex: -1,
          searchTitle: "",
        };
    }

    componentDidMount() {
        this.props.retrieveFiles();
    }

    onChangeSearchTitle(e) {
        const searchTitle = e.target.value;

        this.setState({
            searchTitle: searchTitle,
        });
    }

    refreshData() {
        this.setState({
            currentFile: null,
            currentIndex: -1,
        });
    }

    setActiveFile(file, index) {
        this.setState({
          currentFile: file,
          currentIndex: index,
        });
    }

    removeAllFiles() {
        this.props
            .deleteAllFiles()
            .then((response) => {
            console.log(response);
            this.refreshData();
            })
            .catch((e) => {
            console.log(e);
            });
    }

    findByTitle() {
        this.refreshData();

        this.props.findFilesByTitle(this.state.searchTitle);
    }

    render() {

        const { searchTitle, currentFile, currentIndex } = this.state;
        const { files } = this.props;
        console.log(files[0])

        return (
            <div className="list row">
                <div className="col-md-8">
                    <div className="input-group mb-3">
                        <input
                        type="text"
                        className="form-control"
                        placeholder="Search by title"
                        value={searchTitle}
                        onChange={this.onChangeSearchTitle}
                        />
                        <div className="input-group-append">
                        <button
                            className="btn btn-outline-secondary"
                            type="button"
                            onClick={this.findByTitle}
                        >
                            Search
                        </button>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <h4>Files List</h4>

                    <ul className="list-group">
                        {files &&
                        files.map((file, index) => (
                            <li
                            className={
                                "list-group-item " +
                                (index === currentIndex ? "active" : "")
                            }
                            onClick={() => this.setActiveFile(file, index)}
                            key={index}
                            >
                            {file.metadata.doc}
                            </li>
                        ))}
                    </ul>

                    <button
                        className="m-3 btn btn-sm btn-danger"
                        onClick={this.removeAllFiles}
                    >
                        Remove All
                    </button>
                </div>
                <div className="col-md-6">
                    {currentFile ? (
                        <div>
                        <h4>File</h4>
                        <div>
                            <label>
                            <strong>Title:</strong>
                            </label>{" "}
                            {currentFile.title}
                        </div>
                        <div>
                            <label>
                            <strong>Description:</strong>
                            </label>{" "}
                            {currentFile.description}
                        </div>
                        <div>
                            <label>
                            <strong>Status:</strong>
                            </label>{" "}
                            {currentFile.published ? "Published" : "Pending"}
                        </div>

                        <Link
                            to={"/files/" + currentFile.id}
                            className="badge badge-warning"
                        >
                            Edit
                        </Link>
                        </div>
                    ) : (
                        <div>
                        <br />
                        {/* <p>Please click on a file...</p> */}
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        files: state.files
    };
};

export default connect(mapStateToProps, { retrieveFiles, findFilesByTitle, deleteAllFiles }) (FileList)