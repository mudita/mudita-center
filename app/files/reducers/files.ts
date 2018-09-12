import * as filesAction from '../actions/files.actions';

export interface State {
  readonly currentFolder: string,
  readonly names: string[]
}

const initState: State = {
  currentFolder: '',
  names: []
};

export function reducer(state: State = initState, jobActions: filesAction.Actions) {
  switch (jobActions) {

  }
  return state;
}
