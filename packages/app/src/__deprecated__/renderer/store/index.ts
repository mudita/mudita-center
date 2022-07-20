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
import { models, RootModel } from "App/__deprecated__/renderer/models/models"
import { helpSeed } from "App/__deprecated__/seeds/help"
import { notesSeed } from "App/__deprecated__/seeds/notes"

import { reducers, combinedReducers } from "./reducers"

const middlewares: Middleware[] = [thunk]

if (process.env.NODE_ENV === "development") {
  middlewares.push(logger)
}

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

// TODO replace `TmpDispatch` with legit `Dispatch`
export type TmpDispatch = any

export type ReduxRootState = ReturnType<typeof combinedReducers>

export * from "./helpers"

export default store
