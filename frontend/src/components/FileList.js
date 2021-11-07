// List down all the files

import React, { Component } from "react";
import { connect } from "react-redux";
import { FcDownload } from "react-icons/fc";
import {
  retrieveFiles,
  setActiveFile,
  findFilesByTitle,
} from "../actions/files";
import { Nav } from "react-bootstrap";
import "./FileList.css";

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
      currentRoot: null,
      currentFolder: null,
      currentSubgrp: null,
      currentFileList: [],
      searchTitle: "",
    };
  }

  async componentDidMount() {
    await this.refreshData();
  }

  onChangeSearchTitle = async (e) => {
    const searchTitle = e.target.value;

    await this.setState({
      searchTitle: searchTitle,
    });
  };

  refreshData = async () => {
    await this.props.retrieveFiles();
    await this.setState({
      currentFileList: this.props.currentFileList,
    });
  };

  setActiveRoot = async (root) => {
    await this.setState({
      currentRoot: root,
      currentFolder: null,
      currentSubgrp: null,
    });
    this.getDisplayFiles();
  };

  setActiveFolder = async (folder) => {
    await this.setState({
      currentFolder: folder,
      currentSubgrp: null,
    });
    this.getDisplayFiles();
  };

  setActiveSubgrp = async (subgrp) => {
    await this.setState({
      currentSubgrp: subgrp,
    });
    this.getDisplayFiles();
  };

  getDisplayFiles = async () => {
    var displayFiles = this.state.currentRoot
      ? this.props.files.filter(
          (doc) => doc.grp === this.state.currentRoot
        )
      : this.props.files;
    displayFiles = this.state.currentFolder
      ? displayFiles.filter((doc) =>
          doc.doc_no.includes(this.state.currentFolder)
        )
      : displayFiles;
    displayFiles = this.state.currentSubgrp
      ? displayFiles.filter((doc) => doc.subgrp === this.state.currentSubgrp)
      : displayFiles;
    displayFiles.sort((a, b) => (a.title < b.title ? -1 : 1));
    await this.setState({
      currentFileList: displayFiles,
    });
    return displayFiles;
  };

  setActiveFile = async (file) => {
    await this.props.setActiveFile(file.doc_no);
  };

  findByTitle = async (e) => {
    e.preventDefault();
    await this.props.findFilesByTitle(this.state.searchTitle);

    await this.setState({
      currentFileList: this.props.currentFileList,
    });
  };

  render() {
    const { searchTitle, currentFileList } = this.state;
    const { roots, subgrps, folders, currentFile } = this.props;

    return (
      <div className="container">
        <div/>
        <div className="row">
          <form onSubmit={this.findByTitle} className="search">
            <input
              type="text"
              className="form-control"
              placeholder="Search by title"
              value={searchTitle}
              onChange={this.onChangeSearchTitle}
            />
            <button className="btn btn-outline-secondary" type="submit">
              Search
            </button>
          </form>
        </div>
        <div className="row">
          <div className="col">
            <strong className="title-name">Files List</strong>
            <div className="col">

              {/* root nav */}
              <Nav variant="tabs" onSelect={this.setActiveRoot}>
                {roots &&
                  roots.map((root) => (
                    <Nav.Item>
                      <Nav.Link eventKey={root}>{root}</Nav.Link>
                    </Nav.Item>
                  ))}
              </Nav>

              {/* folder nav */}
              <div className="con">
                {folders &&
                  folders.map((folderLst) => (
                    <div><div>
                    <Nav variant="tabs" onSelect={this.setActiveFolder}>
                      {folderLst &&
                        folderLst.map((folder) => (
                          <Nav.Item>
                            <Nav.Link eventKey={folder}>{folder}</Nav.Link>
                          </Nav.Item>
                        ))}
                    </Nav>
                    </div></div>
                  ))}

                {/* subgrp nav */}
                <div><div>
                <Nav variant="tabs" onSelect={this.setActiveSubgrp}>
                  {subgrps &&
                    subgrps.map((subgrp) => (
                      <Nav.Item>
                        <Nav.Link eventKey={subgrp}>{subgrp}</Nav.Link>
                      </Nav.Item>
                    ))}
                </Nav>
                </div></div>

                {/* filelist */}
                <div>
                  <ul className="list-group">
                    {currentFileList &&
                      currentFileList.map((file, index) => (
                        <li
                          className={
                            "list-group-item " +
                            (file === currentFile ? "active" : "list-group-item")
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
            <div className="col">

              {/* file information */}
              {currentFile ? (
                <div>
                  <strong className="title-name">File Information</strong>
                  <br/><br/>
                  <div>
                    <label>
                      <strong>Title:</strong>
                    </label>{" "}
                    {currentFile.title}
                  </div>
                  <div>
                    <br />
                    {currentFile.doc_cat ? (
                      <div>
                        <label>
                          <strong>Document Category:</strong>
                        </label>{" "}
                        {currentFile.doc_cat}
                      </div>
                    ) : (
                      <div />
                    )}
                  </div>
                  <div>
                    {currentFile.doc_type ? (
                      <div>
                        <label>
                          <strong>Document Type:</strong>
                        </label>{" "}
                        {currentFile.doc_type}
                      </div>
                    ) : (
                      <div />
                    )}
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
                    {/* <a
                      href="./files/RSE_SP_FS_02_640.doc"
                      download="RSE_SP_FS_02_640.doc"
                    > */}
                    <a 
                      href={"./" + currentFile.doc_no + ".doc"} 
                      download={currentFile.doc_no + ".doc"}
                    > 
                      <FcDownload size="25" /> {currentFile.doc_no}
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
                    ) : (
                      <div />
                    )}
                  </div>
                </div>
              ) : (
                <div>
                  <br />
                </div>
              )}
            </div>
        </div>
        <div/>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  state.files.currentFileList.sort((a, b) =>
    a.title < b.title ? -1 : 1
  );

  return {
    files: state.files.files, // grabbing the files state from the reducer
    roots: state.files.roots,
    folders: state.files.folders,
    subgrps: state.files.subgrps,
    currentFile: state.files.currentFile,
    currentFileList: state.files.currentFileList,
  };
};

export default connect(mapStateToProps, {
  retrieveFiles,
  setActiveFile,
  findFilesByTitle,
})(FileList);
