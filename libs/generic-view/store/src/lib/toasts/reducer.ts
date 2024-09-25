/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createReducer } from "@reduxjs/toolkit"
import { openToast, removeToast } from "./actions"

export interface Toast {
  key: string
}

interface GenericState {
  queue: Toast[]
}

const initialState: GenericState = {
  queue: [],
}

export const genericToastsReducer = createReducer(initialState, (builder) => {
  builder.addCase(openToast, (state, action) => {
    state.queue.push({
      key: action.payload,
    })
  })
  builder.addCase(removeToast, (state) => {
    state.queue.shift()
  })
})
