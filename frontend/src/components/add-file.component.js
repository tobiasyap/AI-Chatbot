// For uploading documents
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import bsCustomFileInput from 'bs-custom-file-input'

const AddFile = () => {
  //bsCustomFileInput.init()
  useEffect(() => {
    bsCustomFileInput.init();
  }, []);

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  const onSubmit = (data) => {
    setSubmitted(false);
    setError(false);
    data.preventDefault();

    const uploadData = new FormData(data.target);
    const backendUrl = "http://localhost:8080"; // change to whatever
    axios.post(`${backendUrl}/api/filesystem/files`, uploadData)
      .then((success) => {
        setSubmitted(true);
      })
      .catch((error) => {
        setError(error);
        console.log(error)
      });
  }

  return <>
    <div class="container">
      <div class="row">
        <div class="col-md-6 m-auto">
          <h1 class="text-center display-4 my-4">Upload to FileSystem</h1>      
          { submitted && <div>Successfully submitted!</div> }
          { error && <div>Error submitting! Please try again :)</div> }
          <form onSubmit={onSubmit}>
            <label for="title" class="form-label mt-3">Title:</label>
            <input type="text" name="title" class="form-control"></input>

            <label for="doc_cat" class="form-label mt-3">Document Category:</label>
            <input type="text" name="doc_cat" class="form-control"></input>
            
            <label for="doc_type" class="form-label mt-3">Document Type:</label>
            <input type="text" name="doc_type" class="form-control"></input>
            
            <label for="doc_no" class="form-label mt-3">Document Number:</label>
            <input type="text" name="doc_no" class="form-control"></input>

            <label for="grp" class="form-label mt-3">Group:</label>
            <input type="text" name="grp" class="form-control"></input>
            
            <label for="subgrp" class="form-label mt-3">Subgroup:</label>
            <input type="text" name="subgrp" class="form-control"></input>

            <label for="created" class="form-label mt-3">Effective Date:</label>
            <input type="date" name="created" class="form-control"></input>

            <label for="revision_no" class="form-label mt-3">Revision Number:</label>
            <input type="text" name="revision_no" class="form-control"></input>
            
            <label for="file" class="form-label mt-3">File:</label>
            <div class="custom-file mb-3">
              <input type="file" name="doc" id="customFile" class="custom-file-input"></input>
              <label for="customFile" class="custom-file-label">Choose File</label>
            </div>
            <input type="submit" value="Submit" class="btn btn-block mb-3"></input>
          </form>
        </div>
      </div>
    </div>
  </>
}

export default AddFile;