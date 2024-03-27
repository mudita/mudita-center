/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createReducer } from "@reduxjs/toolkit"
import { startGoogleAuthorization } from "./get-google-contacts.action"
import { cleanImportProcess } from "./actions"

interface ImportsState {
  providers: Partial<Record<ImportProviders, ImportProviderState>>
  currentImportProvider?: ImportProviders
}

type ImportProviders = "GOOGLE"

export type ImportStatus = "PENDING-AUTH" | "AUTH" | "DONE" | "FAILED"

interface ImportProviderState {
  status: ImportStatus
}

const initialState: ImportsState = {
  providers: {},
}

export const importsReducer = createReducer(initialState, (builder) => {
  builder.addCase(cleanImportProcess, (state, action) => {
    delete state.currentImportProvider
  })
  builder.addCase(startGoogleAuthorization.pending, (state, action) => {
    state.currentImportProvider = "GOOGLE"
    state.providers.GOOGLE = {
      status: "PENDING-AUTH",
    }
  })
  builder.addCase(startGoogleAuthorization.rejected, (state, action) => {
    state.providers.GOOGLE = {
      status: "FAILED",
    }
  })
  builder.addCase(startGoogleAuthorization.fulfilled, (state, action) => {
    state.providers.GOOGLE = {
      status: "AUTH",
    }
  })
})
