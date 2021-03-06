// Reducer for File related states and actions - update file states in the Redux store

import {
    CREATE_FILE,
    RETRIEVE_FILES,
    FIND_FILES,
    UPDATE_FILE,
    DELETE_FILE,
} from "../actions/types";
  
const initState = {
    files: [],
    roots: [],
    folders: [],
    subgrps: [],
    currentFileList: [],
    currentFile: null
  };

function fileReducer(state = initState, action) {
    const { type, payload } = action;
  
    switch (type) {
      case CREATE_FILE:
        return {
          ...state,
          files: [...state.files, payload]
        }
  
      case RETRIEVE_FILES:
        const subgrpList = Array.from(new Set(payload.map(file => file.subgrp)));
        const rootList = Array.from(new Set(payload.map(file => file.grp)));
        let folderLists = [];
        payload.forEach((file) => {
          let folders = file.doc_no.split("_");
          folders = folders.filter(folder => !parseInt(folder))
          folderLists.push(folders)
        });

        // obtain folders at each level 
        let allFolders = []
        for (let i=1; i < folderLists[0].length - 1; i++) { // max length = number of folders up till parent
          let folderList = new Set(); // at each level
          folderLists.map(folderLst => {
              let folder = folderLst[i]; // folder at that position
              if (!subgrpList.includes(folder) && !rootList.includes(folder)) {
                folderList.add(folder)
              }
              return folderList
          })
          folderList = Array.from(folderList); // unique list of folders at that position
          allFolders.push(folderList)
        }

        return {
          ...state, 
          roots: rootList,
          folders: allFolders,
          subgrps: subgrpList,
          currentFileList: payload,
          files: payload
        }
  
      case FIND_FILES:
        console.log(payload)
        
        return {
          ...state,
          currentFileList: payload
        }

      case UPDATE_FILE:
        const file = state.files.find(doc => doc.doc_no === payload);
        console.log(file)

        return {
          ...state,
          currentFile: file
        }
        
      case DELETE_FILE: 
        return {
          ...state,
          files: state.files.filter(({ id }) => id !== payload.id)
        }
  
      default:
        return state;
    }
};
  
export default fileReducer;