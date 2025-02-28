/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createReducer } from "@reduxjs/toolkit"
import { startImportAuthorization } from "./start-import-authorization.action"
import { cleanImportProcess, setImportProcessStatus } from "./actions"
import { importContactsFromExternalSource } from "./import-contacts-from-external-source.action"
import { ApiFileTransferError, UnifiedContact } from "device/models"
import { importContactsFromFile } from "./import-contacts-from.file"
import { ImportStatus } from "./import.types"

export type ImportProvider = "GOOGLE" | "FILE" | "OUTLOOK"

export interface ImportProviderState {
  status: ImportStatus
  contacts?: UnifiedContact[]
  error?: string | ApiFileTransferError
}

interface ImportsState {
  providers: Partial<Record<ImportProvider, ImportProviderState>>
  currentImportProvider?: ImportProvider
}

const initialState: ImportsState = {
  providers: {},
}

export const importsReducer = createReducer(initialState, (builder) => {
  builder.addCase(cleanImportProcess, (state) => {
    delete state.currentImportProvider
    state.providers = {}
  })
  builder.addCase(startImportAuthorization.pending, (state, action) => {
    state.currentImportProvider = action.meta.arg
    state.providers[action.meta.arg] = {
      ...state.providers[action.meta.arg],
      status: ImportStatus.PendingAuth,
    }
  })
  builder.addCase(startImportAuthorization.rejected, (state, action) => {
    state.providers[action.meta.arg] = {
      ...state.providers[action.meta.arg],
      status: ImportStatus.Init,
    }
  })
  builder.addCase(startImportAuthorization.fulfilled, (state, action) => {
    state.providers[action.meta.arg] = {
      ...state.providers[action.meta.arg],
      status: ImportStatus.Auth,
    }
  })
  builder.addCase(importContactsFromExternalSource.pending, (state) => {
    const provider = state.currentImportProvider

    if (provider) {
      state.providers[provider] = {
        ...state.providers[provider],
        status: ImportStatus.ImportIntoMcInProgress,
      }
    }
  })
  builder.addCase(
    importContactsFromExternalSource.fulfilled,
    (state, action) => {
      const provider = state.currentImportProvider

      if (provider) {
        state.providers[provider] = {
          ...state.providers[provider],
          status: ImportStatus.ImportIntoMcDone,
          contacts: action.payload,
        }
      }
    }
  )
  builder.addCase(importContactsFromExternalSource.rejected, (state) => {
    const provider = state.currentImportProvider

    if (provider) {
      state.providers[provider] = {
        ...state.providers[provider],
        status: ImportStatus.Failed,
      }
    }
  })
  builder.addCase(importContactsFromFile.pending, (state) => {
    state.currentImportProvider = "FILE"
    state.providers.FILE = {
      ...state.providers.FILE,
      status: ImportStatus.ImportIntoMcInProgress,
    }
  })
  builder.addCase(importContactsFromFile.rejected, (state, action) => {
    if (action.payload === "cancelled") {
      state.providers.FILE = {
        ...state.providers.FILE,
        status: ImportStatus.Init,
      }
    } else {
      state.providers.FILE = {
        ...state.providers.FILE,
        status: ImportStatus.Failed,
        ...(action.payload ? { error: action.payload } : {}),
      }
    }
  })
  builder.addCase(importContactsFromFile.fulfilled, (state, action) => {
    state.providers.FILE = {
      ...state.providers.FILE,
      status: ImportStatus.ImportIntoMcDone,
      contacts: action.payload,
    }
  })
  builder.addCase(setImportProcessStatus, (state, action) => {
    const provider = state.currentImportProvider as ImportProvider
    if (state.providers[provider]) {
      state.providers[provider] = {
        ...{ domainFilesTransfer: {} },
        ...state.providers[provider],
        status: action.payload,
      }
    }
  })
})
