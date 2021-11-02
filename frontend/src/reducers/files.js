// Update files state of the Redux store

import {
    CREATE_FILE,
    RETRIEVE_FILES,
    FIND_FILES,
    UPDATE_FILE,
    DELETE_FILE,
    // DELETE_ALL_FILES,
} from "../actions/types";
  
// const initialState = [];
const initState = {
  //   roots: ['RSE'],
    files: [],
    roots: [],
  //   subgrps: ['FS'],
    folders: [],
    subgrps: [],
    currentFileList: [],
    currentFile: null
    // currentFile: null,
    // currentFileIndex: -1, 
    // currentRoot: '',
    // currentFolder: '',
  //   currentRoot: null,
    // currentRootIndex: -1,
    // searchTitle: "",
    // folders: ['SP', 'SD']
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
        const folderList = Array.from(new Set(payload.map(file => file.doc_no.split("/")[1])));
        const subgrpList = Array.from(new Set(payload.map(file => file.parent)));
        const rootList = Array.from(new Set(payload.map(file => file.grp)));

        return {
          ...state, 
          roots: rootList,
          folders: folderList,
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
        // return state.currentFileList.map((file) => {
        //   if (file.doc_no === payload.doc_no) {
        //     return {
        //       ...state,
        //       currentFile: file
        //       // ...payload,
        //     };
          // } else {
          //   return file;
          // }
        // });
        
      case DELETE_FILE: 
        return {
          ...state,
          files: state.files.filter(({ id }) => id !== payload.id)
        }
  
      // case DELETE_ALL_FILES:
      //   return [];
  
      default:
        return state;
    }
};
  
export default fileReducer;