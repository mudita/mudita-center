import * as filesAction from '../actions/files.actions';

export interface FileExplorerReducer {
  readonly currentFolder: string,
  readonly names: string[]
}

const initState: FileExplorerReducer = {
  currentFolder: '',
  names: []
};

export default function fileExplorer(state: FileExplorerReducer = initState, jobActions: filesAction.Actions) {
  switch (jobActions) {

  }
  return state;
}
