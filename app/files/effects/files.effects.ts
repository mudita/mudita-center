import { ofType } from "redux-observable"
import { flatMap, map, tap } from "rxjs/operators"
import {
  SET_FILES,
  SET_FILES_WITH_TYPES,
  SetFilesAction,
} from "../actions/files.actions"

const { remote } = require("electron")
const mainRef = remote.require("./main.js")

const fileUtils = mainRef.electronUtils.fileUtils

export const setFilesEffect = (action$: any) =>
  action$.pipe(
    ofType(SET_FILES),
    tap(() => console.log("Setting path type")), // debugging
    flatMap((action: SetFilesAction) => {
      return Promise.all(
        action.payload.map(async (el: string) => {
          return {
            name: el,
            type: await fileUtils.checkType(el),
          }
        })
      )
    }),
    map(data => {
      return {
        type: SET_FILES_WITH_TYPES,
        payload: data,
      }
    })
  )
