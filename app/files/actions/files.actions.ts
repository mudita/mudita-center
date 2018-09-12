import { Action } from "redux";

export const SET_CURRENT_PATH = '[File] Set current path';
export const SET_FILES = '[File] Set files';

export class SetCurrentFiles implements Action {
  readonly type = SET_CURRENT_PATH;

  constructor(public payload: string[]) {}
}

export type Actions = SetCurrentFiles
