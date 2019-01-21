import { combineEpics } from 'redux-observable';
import { setFilesEffect } from "../files/effects/files.effects";

export const rootEpic = combineEpics(
  setFilesEffect
);

