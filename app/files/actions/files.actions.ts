import { Action } from "redux";

export const SET_CURRENT_PATH = '[File] Set current path';
export const SET_FILES = '[File] Set files';

export class SetCurrentFiles implements Action {
  readonly type = SET_CURRENT_PATH;

  constructor(public payload: string[]) {}
}

// export function setFiles(payload: any) {
//   return (dispatch: any) => {
//     dispatch(actionCreator(SET_CURRENT_PATH)(payload));
//   };
// }

// export function setCurrentFiles(payload: any) {
//   return (dispatch: any) => {
//     dispatch(actionCreator(SET_FILES)(payload));
//   };
// }

export type Actions = SetCurrentFiles
