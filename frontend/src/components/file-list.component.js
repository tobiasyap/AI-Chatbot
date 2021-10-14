// List down all the files

import React, { Component } from "react";
import { connect } from "react-redux";
import { retrieveFiles, findFilesByTitle, deleteAllFiles } from "../actions/files";
import { Link } from "react-router-dom";
import { Container, Nav } from "react-bootstrap"

class FileList extends Component {
    constructor(props) {
        super(props);
        this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
        this.refreshData = this.refreshData.bind(this);
        this.setActiveFile = this.setActiveFile.bind(this);
        this.setActiveRoot = this.setActiveRoot.bind(this);
        this.setActiveFolder = this.setActiveFolder.bind(this);
        this.handleSelect = this.handleSelect.bind(this);

        this.findByTitle = this.findByTitle.bind(this);
        this.removeAllFiles = this.removeAllFiles.bind(this);
        // this.listFiles = this.listFiles.bind(this);
    
        this.state = {
          roots: ['RSE'],
          subgrps: ['FS'],
          currentFileList: [],
          currentFile: null,
          currentFileIndex: -1,
          currentRoot: 'RSE',
          currentFolder: 'FS',
        //   currentRoot: null,
          currentRootIndex: -1,
          searchTitle: "",
          folders: ['SP', 'SD']
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
        this.props.retrieveFiles()
        this.setState({
            currentFileList: null,
            currentFile: null,
            currentFileIndex: -1,
            currentRoot: 'RSE',
            currentRootIndex: -1
        });
    }

    // listFiles(files) {
    //     const rootFolders = new Set(files.map(doc => doc.metadata.grp));
    //     console.log(files);
    //     console.log(rootFolders);
    //     // [...rootFolders].reduce();
    //     this.setState({
    //         roots: rootFolders
    //     });
    // }

    setActiveRoot(root, index) {
        // console.log(this.props.data)
        // const displayFiles = this.props.data.filter(doc => doc.metadata.grp == this.state.currentRoot)
        // this.setActiveFolder(this.props.subgrp, 1);
        this.refreshData()
        this.setState({
          currentRoot: root,
          currentRootIndex: index
        //   currentFileList: displayFiles
        //   currentFileList: this.props.filter(doc => doc.metadata.grp == this.state.currentRoot)
        });
    }

    setActiveFolder(folder, index) {
        // const displayFiles = this.props.data.filter(doc => doc.parent == this.state.currentFolder)
        this.setState({
          currentFolder: folder,
          currentFolderIndex: index
        //   currentFileList: displayFiles
        //   currentFileList: this.props.filter(doc => doc.metadata.grp == this.state.currentRoot)
        });
    }

    setActiveFile(file, index) {
        this.setState({
          currentFile: file,
          currentFileIndex: index,
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

    handleSelect(eventKey) {
        this.props.findFilesByTitle(this.state.folders[eventKey]);
        // console.log(displayFiles)
        this.setState({
            currentFolder: this.state.folders[eventKey]
            // currentFileList: displayFiles
        })
    }

    render() {

        const { searchTitle, roots, subgrps, folders, currentFileList, currentFile, currentFileIndex, currentRoot, currentFolder, currentRootIndex } = this.state;
        const { files } = this.props;

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
                    {/* <div className="container"> */}
                        <Nav variant="tabs" activeKey={currentRoot} onSelect={(root, index) => this.setActiveRoot(root, index)}>
                        {/* {files.roots.map((root, index) => ( */}
                            <Nav.Item>
                                <Nav.Link eventKey={currentRoot}>
                                    {currentRoot}
                                </Nav.Link>
                            </Nav.Item>
                        {/* ))} */}
                        </Nav>
                        <div className="col-md-5">
                            <Nav variant="tabs" activeKey={currentFolder} onSelect={this.handleSelect} className="folder-list">
                            {/* <Nav justify variant="tabs" activeKey={folder} onSelect={(folder, index) => this.setActiveFolder(folder, index)} className="folder-list"> */}
                                {folders &&
                                folders.map((folder, index) => (
                                <Nav.Item>
                                <Nav.Link eventKey={folder, index}>
                                    {folder}
                                </Nav.Link>
                            </Nav.Item>
                            ))}
                            </Nav>                      
                        </div>  
                        <div className="container">
                        <div className="col-md-2">
                        <Nav variant="tabs" activeKey={currentFolder} onSelect={(folder, index) => this.setActiveFolder(folder, index)} className="folder-list">
                            <Nav.Item>
                                <Nav.Link eventKey={currentFolder}>
                                    {subgrps[0]}
                                </Nav.Link>
                            </Nav.Item>
                        </Nav>
                        </div>                      
                        {/* </div>   */}
                        <div className="col-md-2">
                            <div className="file-list">
                    <ul className="list-group">
                    {files &&
                        // {currentFileList &&
                        files.map((file, index) => (
                            <li
                            className={
                                "list-group-item " +
                                (index === currentFileIndex ? "active" : "")
                            }
                            onClick={() => this.setActiveFile(file, index)}
                            key={index}
                            >
                            {file.metadata.doc}
                            </li>
                        ))}
                    </ul>
                    </div>
                    </div>
                    </div>

                    {/* <button
                        className="m-3 btn btn-sm btn-danger"
                        onClick={this.removeAllFiles}
                    >
                        Remove All
                    </button> */}
                </div>
                <div className="col-md-6">
                    {currentFile ? (
                        <div>
                        <h4>File Information</h4>
                        <div>
                            <label>
                            <strong>Title:</strong>
                            </label>{" "}
                            {currentFile.metadata.title}
                        </div>
                        <div>
                            <br/>
                            {currentFile.metadata.doc_cat ? (
                            <div>
                                <label>
                                <strong>Document Category:</strong>
                                </label>{" "}
                                {currentFile.metadata.doc_cat}
                            </div>
                            ) : ( <div/> )}
                        </div>
                        <div>
                            {currentFile.metadata.doc_type ? (
                            <div>
                                <label>
                                <strong>Document Type:</strong>
                                </label>{" "}
                                {currentFile.metadata.doc_type}
                            </div>
                            ) : ( <div/> )}
                        </div>
                        <div>
                            <label>
                            <strong>Document Number:</strong>
                            </label>{" "}
                            {currentFile.doc_no}
                        </div>
                        <div>
                            <label>
                            <strong>Download Document:</strong>
                            </label>{" "}
                            <a href={"../../public/files/" + currentFile.metadata.doc} download>
                            {currentFile.metadata.doc}
                            </a>
                        </div>
                        <div>
                            <label>
                            <strong>Group:</strong>
                            </label>{" "}
                            {currentFile.metadata.grp}
                        </div>                                                                                                
                        <div>
                            <label>
                            <strong>Sub Group:</strong>
                            </label>{" "}
                            {currentFile.metadata.subgrp}
                        </div>
                        <div>
                            {currentFile.metadata.revision_no ? (
                            <div>
                                <label>
                                <strong>Revision Number:</strong>
                                </label>{" "}
                                {currentFile.metadata.revision_no}
                            </div>
                            ) : ( <div/> )}
                        </div>
                    {/* missing title (actual), doc_cat, doc_type, effective date*/}
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
            // </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        files: state.files
    };
};

export default connect(mapStateToProps, { retrieveFiles, findFilesByTitle, deleteAllFiles }) (FileList)