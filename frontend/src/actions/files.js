// For CRUD (create/retrieve/update/delete) actions 

import {
    CREATE_FILE,
    RETRIEVE_FILES,
    UPDATE_FILE,
    DELETE_FILE,
    DELETE_ALL_FILES
} from "./types";
  
import FileDataService from "../services/file.service";

// calls FileDataService.create() and dispatches CREATE_FILE
export const createFile = (title, description) => async (dispatch) => {
    try {
      const res = await FileDataService.create({ title, description });
  
      dispatch({
        type: CREATE_FILE,
        payload: res.data,
      });
  
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };
  
// calls FileDataService.getAll() and dispatches RETRIEVE_FILES
export const retrieveFiles = () => async (dispatch) => {
    try {
      const res = await FileDataService.getAll();
      // console.log(res.data)

      dispatch({
        type: RETRIEVE_FILES,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };

// calls FileDataService.update() and dispatches UPDATE_FILE
export const updateFile = (id, data) => async (dispatch) => {
    try {
      const res = await FileDataService.update(id, data);
  
      dispatch({
        type: UPDATE_FILE,
        payload: data,
      });
  
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };

// calls FileDataService.delete() and dispatches DELETE_FILE  
export const deleteFile = (id) => async (dispatch) => {
    try {
      await FileDataService.delete(id);
  
      dispatch({
        type: DELETE_FILE,
        payload: { id },
      });
    } catch (err) {
      console.log(err);
    }
  };
  
// calls FileDataService.deleteAll() and dispatches DELETE_ALL_FILES 
export const deleteAllFiles = () => async (dispatch) => {
    try {
      const res = await FileDataService.deleteAll();
  
      dispatch({
        type: DELETE_ALL_FILES,
        payload: res.data,
      });
  
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  }
  
// calls FileDataService.findByTitle() and dispatches RETRIEVE_FILES  
export const findFilesByTitle = (title) => async (dispatch) => {
    try {
      const res = await FileDataService.findByTitle(title);
  
      dispatch({
        type: RETRIEVE_FILES,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };

// missing getById