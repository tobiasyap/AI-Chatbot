// Update files state of the Redux store

import {
    CREATE_FILE,
    RETRIEVE_FILES,
    UPDATE_FILE,
    DELETE_FILE,
    DELETE_ALL_FILES,
} from "../actions/types";
  
const initialState = [];

function fileReducer(files = initialState, action) {
    const { type, payload } = action;
  
    switch (type) {
      case CREATE_FILE:
        return [...files, payload];
  
      case RETRIEVE_FILES:
        return payload;
  
      case UPDATE_FILE:
        return files.map((file) => {
          if (file.id === payload.id) {
            return {
              ...file,
              ...payload,
            };
          } else {
            return file;
          }
        });
  
      case DELETE_FILE:
        return files.filter(({ id }) => id !== payload.id);
  
      case DELETE_ALL_FILES:
        return [];
  
      default:
        return files;
    }
};
  
export default fileReducer;