/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createReducer } from "@reduxjs/toolkit"
import { ExternalProvidersState } from "Core/__deprecated__/renderer/models/external-providers/external-providers.interface"
import { googleAuthorize } from "./google/google-authorize.action"
import { setAuthData } from "./actions"

const initialState: ExternalProvidersState = {
  google: {
    calendar: {},
    contacts: {},
  },
  outlook: {
    calendars: {
      accessToken: "",
      refreshToken: "",
    },
    contacts: {
      accessToken: "",
      refreshToken: "",
    },
  },
}

export const externalProvidersReducer = createReducer(
  initialState,
  (builder) => {
    builder.addCase(googleAuthorize.fulfilled, (state, action) => {
      if (action.payload) {
        state.google.contacts = { ...action.payload }
      }
    })
    builder.addCase(setAuthData, (state, action) => {
      if (action.payload) {
        state.google.contacts = { ...action.payload }
      }
    })
  }
)
