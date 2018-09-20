export const SET_FILES = 'SET FILES';
export type SET_FILES = typeof SET_FILES

export const SET_CURRENT_PATH = 'SET_CURRENT_PATH';
export type SET_CURRENT_PATH = typeof SET_CURRENT_PATH

interface SetFilesAction {
  readonly type: SET_FILES
  payload: string[]
}

interface SetCurrentPathAction {
  readonly type: SET_CURRENT_PATH
  payload: string
}

export function setFiles(files: string[]): SetFilesAction {
  return {
    type: SET_FILES,
    payload: files
  };
}

export function setCurrentPath(path: string): SetCurrentPathAction {
  return {
    type: SET_CURRENT_PATH,
    payload: path
  };
}

export type Actions = SetFilesAction | SetCurrentPathAction
