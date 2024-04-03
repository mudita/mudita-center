/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createReducer } from "@reduxjs/toolkit"
import { startGoogleAuthorization } from "./get-google-contacts.action"
import { cleanImportProcess } from "./actions"
import { importContactsFromExternalSource } from "./import-contacts-from-external-source.action"
import { UnifiedContact } from "Libs/device/models/src"

interface ImportsState {
  providers: Partial<Record<ImportProviders, ImportProviderState>>
  currentImportProvider?: ImportProviders
}

type ImportProviders = "GOOGLE"

export type ImportStatus =
  | "PENDING-AUTH"
  | "AUTH"
  | "IMPORT-INTO-MC-IN-PROGRESS"
  | "IMPORT-INTO-MC-DONE"
  | "DONE"
  | "FAILED"

interface ImportProviderState {
  status: ImportStatus
  contacts?: UnifiedContact[]
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
  builder.addCase(importContactsFromExternalSource.pending, (state, action) => {
    state.providers.GOOGLE = {
      status: "IMPORT-INTO-MC-IN-PROGRESS",
    }
  })
  builder.addCase(
    importContactsFromExternalSource.fulfilled,
    (state, action) => {
      state.providers.GOOGLE = {
        status: "IMPORT-INTO-MC-DONE",
        contacts: action.payload,
      }
    }
  )
  builder.addCase(
    importContactsFromExternalSource.rejected,
    (state, action) => {
      state.providers.GOOGLE = {
        status: "FAILED",
      }
    }
  )
})
