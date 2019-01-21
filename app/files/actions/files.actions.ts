export const SET_FILES = 'SET FILES';
export type SET_FILES = typeof SET_FILES

export const SET_CURRENT_PATH = 'SET_CURRENT_PATH';
export type SET_CURRENT_PATH = typeof SET_CURRENT_PATH

export const SET_FILES_WITH_TYPES = 'SET FILES WITH TYPES';
export type SET_FILES_WITH_TYPES = typeof SET_FILES_WITH_TYPES


export interface SetFilesAction {
  readonly type: SET_FILES
  payload: string[]
}

export interface SetCurrentPathAction {
  readonly type: SET_CURRENT_PATH
  payload: string
}

export interface FileType {
  type: string
  name: string
}

interface SetFilesWithTypes {
  readonly type: SET_FILES_WITH_TYPES
  payload: FileType[]
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

export type Actions = SetFilesAction | SetCurrentPathAction | SetFilesWithTypes
