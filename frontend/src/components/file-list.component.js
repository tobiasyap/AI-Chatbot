// List down all the files

import React, { Component } from "react";
import { connect } from "react-redux";
import { retrieveFiles, setActiveFile, findFilesByTitle } from "../actions/files";
import { Nav } from "react-bootstrap"

class FileList extends Component {
    constructor(props) {
        super(props);
        this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
        this.refreshData = this.refreshData.bind(this);
        this.setActiveFile = this.setActiveFile.bind(this);
        this.setActiveRoot = this.setActiveRoot.bind(this);
        this.setActiveFolder = this.setActiveFolder.bind(this);
        this.setActiveSubgrp = this.setActiveSubgrp.bind(this);
        this.getDisplayFiles = this.getDisplayFiles.bind(this);
        this.findByTitle = this.findByTitle.bind(this);
    
        this.state = {
        //     files: [],
        //     roots: [],
        //     subgrps: [],
        //     currentFileList: [],
            // currentFile: null,
            currentRoot: null,
            currentFolder: null,
            currentSubgrp: null,
            currentFileList: [],
            searchTitle: "",
        //     folders: []
        }
    }

    async componentDidMount() {
        await this.refreshData();
    }

    onChangeSearchTitle = async (e) => {
        const searchTitle = e.target.value;

        await this.setState({
            searchTitle: searchTitle,
        });
    }

    // getDerivedStateFromProps(props, state) {
    //     this.setState({
    //         currentFileList: this.props.files.currentFileList,
    //         currentRoot: this.props.files.roots[0],
    //         currentFolder: this.props.files.folders[0],
    //         currentSubgrp: this.props.files.subgrps[0],
    //         // currentFile: null
    //     })
    // }

    refreshData = async() => {
        await this.props.retrieveFiles()
        // console.log(this.props)

        await this.setState({
            currentFileList: this.props.currentFileList,
            // currentRoot: this.props.files.roots[0],
            // currentFolder: this.props.files.folders[0],
            // currentSubgrp: this.props.files.subgrps[0],
            // currentFile: null
        })

        // console.log(this.state)
    }

    // listFiles(files) {
    //     const rootFolders = new Set(files.map(doc => doc.grp));
    //     console.log(files);
    //     console.log(rootFolders);
    //     // [...rootFolders].reduce();
    //     this.setState({
    //         roots: rootFolders
    //     });
    // }

    setActiveRoot = async (root) => {
        await this.setState({
          currentRoot: root,
          currentFolder: null,
          currentSubgrp: null
        });
        this.getDisplayFiles()
    }

    setActiveFolder = async (folder) => {
        // const folder = this.props.folders[folderIndex];
        await this.setState({
          currentFolder: folder,
          currentSubgrp: null
        });
        this.getDisplayFiles()
    }

    setActiveSubgrp = async (subgrp) => {
        // const subgrp = this.props.subgrps[subgrpIndex];
        await this.setState({
          currentSubgrp: subgrp,
        });
        this.getDisplayFiles()
    }

    getDisplayFiles = async () => {
        var displayFiles = this.state.currentRoot ? this.props.files.filter(doc => doc.grp === this.state.currentRoot) : this.props.files;
        displayFiles = this.state.currentFolder ? displayFiles.filter(doc => doc.doc_no.includes(this.state.currentFolder)) : displayFiles;
        displayFiles = this.state.currentSubgrp ? displayFiles.filter(doc => doc.parent === this.state.currentSubgrp) : displayFiles;
        await this.setState({
            currentFileList: displayFiles
        })
        return displayFiles
    }

    setActiveFile = async (file) => {
        await this.props.setActiveFile(file.doc_no);

        // await this.setState({
        //   currentFile: file,
        // });
    }

    findByTitle = async () => {
        await this.props.findFilesByTitle(this.state.searchTitle);

        await this.setState({
            currentFileList: this.props.currentFileList
        })
    }

    render() {

        const { searchTitle, currentFileList } = this.state;
        const { roots, subgrps, folders, currentFile } = this.props;

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
                        <Nav variant="tabs" onSelect={this.setActiveRoot}>
                        {roots &&
                        roots.map((root) => (
                            <Nav.Item>
                               {/* {currentRoot ? ( */}
                                <Nav.Link eventKey= {root}>
                                    {root}
                                </Nav.Link>
                               {/* ) : (
                                <Nav.Link eventKey= "">
                                {root}
                            </Nav.Link>
                               )} */}
                            </Nav.Item>
                        ))}
                        </Nav>
                        <div className="col-md-5">
                            {/* <Nav variant="tabs" activeKey={currentFolder} onSelect={this.handleSelect} className="folder-list"> */}
                            <Nav variant="tabs" onSelect={this.setActiveFolder} className="folder-list">
                                {folders &&
                                folders.map((folder) => (
                                <Nav.Item>
                                <Nav.Link eventKey={folder}>
                                    {folder}
                                </Nav.Link>
                            </Nav.Item>
                            ))}
                            </Nav>                      
                        </div>  
                        <div className="container">
                        <div className="col-md-2">
                        <Nav variant="tabs" onSelect={this.setActiveSubgrp} className="folder-list">
                            {subgrps && 
                            subgrps.map((subgrp) => (
                                <Nav.Item>
                                <Nav.Link eventKey={subgrp}>
                                    {subgrp}
                                </Nav.Link>
                            </Nav.Item>
                            ))}
                        </Nav>
                        </div>                      
                        {/* </div>   */}
                        <div className="col-md-2" >
                            <div className="file-list">
                    <ul className="list-group">
                        {currentFileList &&
                        currentFileList.map((file, index) => (
                            <li
                            className={
                                "list-group-item " +
                                (file === currentFile ? "active" : "")
                            }
                            onClick={() => this.setActiveFile(file)}
                            key={index}
                            >
                            {file.title}
                            </li>
                        ))}
                    </ul>
                    </div>
                    </div>
                    </div>
                </div>
                <div className="col-md-6">
                    {currentFile ? (
                        <div>
                        <h4>File Information</h4>
                        <div>
                            <label>
                            <strong>Title:</strong>
                            </label>{" "}
                            {currentFile.title}
                        </div>
                        <div>
                            <br/>
                            {currentFile.doc_cat ? (
                            <div>
                                <label>
                                <strong>Document Category:</strong>
                                </label>{" "}
                                {currentFile.doc_cat}
                            </div>
                            ) : ( <div/> )}
                        </div>
                        <div>
                            {currentFile.doc_type ? (
                            <div>
                                <label>
                                <strong>Document Type:</strong>
                                </label>{" "}
                                {currentFile.doc_type}
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
                            <a href="./files/Project Charter Sample.doc" download="Project Charter Sample.doc"> 
                            {/* <a href={"./files/" + currentFile.doc_no + ".doc"} download={currentFile.doc_no + ".doc"}>  */}
                            {currentFile.doc_no} 
                            </a>
                        </div>
                        <div>
                            <label>
                            <strong>Group:</strong>
                            </label>{" "}
                            {currentFile.grp}
                        </div>                                                                                                
                        <div>
                            <label>
                            <strong>Sub Group:</strong>
                            </label>{" "}
                            {currentFile.subgrp}
                        </div>
                        <div>
                            {currentFile.revision_no ? (
                            <div>
                                <label>
                                <strong>Revision Number:</strong>
                                </label>{" "}
                                {currentFile.revision_no}
                            </div>
                            ) : ( <div/> )}
                        </div>
                        {/* <Link
                            to={"/files/" + currentFile.id}
                            className="badge badge-warning"
                        >
                            Edit
                        </Link> */}
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
        files: state.files.files, // grabbing the files state from the reducer
        roots: state.files.roots,
        folders: state.files.folders,
        subgrps: state.files.subgrps,
        currentFile: state.files.currentFile,
        currentFileList: state.files.currentFileList,

    };
};

export default connect(mapStateToProps, { retrieveFiles, setActiveFile, findFilesByTitle }) (FileList)