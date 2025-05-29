/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createReducer } from "@reduxjs/toolkit"
import { addToast, removeToast } from "./actions"
import { IconType } from "generic-view/utils"

export interface Toast {
  key: string
  text?: string
  icon?: IconType
}

interface GenericState {
  queue: Toast[]
}

const initialState: GenericState = {
  queue: [],
}

export const genericToastsReducer = createReducer(initialState, (builder) => {
  builder.addCase(addToast, (state, action) => {
    state.queue.push(action.payload)
  })
  builder.addCase(removeToast, (state) => {
    state.queue.shift()
  })
})
