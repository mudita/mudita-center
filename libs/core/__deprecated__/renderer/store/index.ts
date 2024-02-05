/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  init,
  RematchDispatch,
  RematchRootState,
  InitConfig,
  Middleware,
} from "@rematch/core"
import selectPlugin from "@rematch/select"
import logger from "redux-logger"
import thunk from "redux-thunk"
import { models, RootModel } from "Core/__deprecated__/renderer/models/models"
import { filesManagerSeed } from "Core/__deprecated__/seeds/filesManager"
import { helpSeed } from "Core/__deprecated__/seeds/help"
import { notesSeed } from "Core/__deprecated__/seeds/notes"

import { reducers, combinedReducers } from "./reducers"

const middlewares: Middleware[] = [thunk]

// if (process.env.DEV_REDUX_LOGGER_ENABLED !== "0") {
//   middlewares.push(logger)
// }

const config: InitConfig<RootModel> = {
  models,
  plugins: [selectPlugin()],
  redux: {
    reducers: reducers,
    middlewares,
  },
}

if (process.env.NODE_ENV !== "test") {
  config.redux = {
    ...config.redux,
    initialState: {
      filesManager: filesManagerSeed,
      help: helpSeed,
      notes: notesSeed,
    },
  }
}

const store = init(config)

export const { select } = store
export type RootState = RematchRootState<typeof models>
export type Store = typeof store
export type Dispatch = RematchDispatch<RootModel>
export type RejectableThunk = {
  abort: () => void
}

// TODO replace `TmpDispatch` with legit `Dispatch`
// AUTO DISABLED - fix me if you like :)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type TmpDispatch = any
export type AppDispatch = typeof store.dispatch

export type ReduxRootState = ReturnType<typeof combinedReducers>

export * from "./helpers"

export default store
