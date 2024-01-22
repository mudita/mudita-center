/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createReducer } from "@reduxjs/toolkit"
import {
  closeAllModals,
  closeDomainModals,
  closeModal,
  openModal,
  replaceModal,
} from "./actions"

export interface Modal {
  key: string
  domain?: string
  permanent?: boolean
}

interface GenericState {
  queue: Modal[]
}

const initialState: GenericState = {
  queue: [],
}

export const genericModalsReducer = createReducer(initialState, (builder) => {
  builder.addCase(openModal, (state, action) => {
    state.queue.push(action.payload)
  })
  builder.addCase(closeModal, (state) => {
    state.queue.splice(-1)
  })
  builder.addCase(closeAllModals, (state) => {
    state.queue = []
  })
  builder.addCase(replaceModal, (state, action) => {
    state.queue.splice(-1, 1, action.payload)
  })
  builder.addCase(closeDomainModals, (state, action) => {
    state.queue = state.queue.filter(
      (modal) => modal.domain !== action.payload.domain
    )
  })
})
