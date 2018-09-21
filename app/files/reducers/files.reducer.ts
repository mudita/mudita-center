import * as filesAction from '../actions/files.actions';
import { FileType } from "../actions/files.actions";

export interface State {
  readonly currentFolder: string,
  readonly filePaths: FileType[]
}

const initState: State = {
  currentFolder: '',
  filePaths: []
};

export function reducer(state: State = initState, action: filesAction.Actions) {
  switch (action.type) {
    case filesAction.SET_CURRENT_PATH:
      return {
        ...state,
        currentFolder: action.payload
      };
    case filesAction.SET_FILES_WITH_TYPES:
      return {
        ...state,
        filePaths: [...action.payload]
      };
    default:
      return state;
  }
}
