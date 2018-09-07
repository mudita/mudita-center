import * as filesAction from '../actions/files.actions';

export interface FileReducer {
  readonly currentFolder: string,
  readonly names: string[]
}

const initState: FileReducer = {
  currentFolder: '',
  names: []
};

export default function fileExplorer(state: FileReducer = initState, jobActions: filesAction.Actions) {
  switch (jobActions) {

  }
  return state;
}
