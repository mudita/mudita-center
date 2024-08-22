/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createReducer } from "@reduxjs/toolkit"
import { startImportAuthorization } from "./start-import-authorization.action"
import {
  cleanImportProcess,
  setImportProcessFileStatus,
  setImportProcessStatus,
} from "./actions"
import { importContactsFromExternalSource } from "./import-contacts-from-external-source.action"
import { ApiFileTransferError, UnifiedContact } from "device/models"
import { startImportToDevice } from "./start-import-to-device.action"
import { importContactsFromFile } from "./import-contacts-from.file"

export type ImportProvider = "GOOGLE" | "FILE" | "OUTLOOK"

export type ImportStatus =
  | "INIT"
  | "FILE-SELECT"
  | "PENDING-AUTH"
  | "AUTH"
  | "IMPORT-INTO-MC-IN-PROGRESS"
  | "IMPORT-INTO-MC-DONE"
  | "IMPORT-INTO-DEVICE-IN-PROGRESS"
  | "IMPORT-INTO-DEVICE-FILES-TRANSFER"
  | "IMPORT-DEVICE-DATA-TRANSFER"
  | "DONE"
  | "FAILED"

export type ProcessFileStatus = "PENDING" | "IN_PROGRESS" | "DONE"

export interface ImportProviderState {
  status: ImportStatus
  contacts?: UnifiedContact[]
  domainFilesTransfer: Record<
    string,
    { transferId?: number; status: ProcessFileStatus }
  >
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
      domainFilesTransfer: {},
      ...state.providers[action.meta.arg],
      status: "PENDING-AUTH",
    }
  })
  builder.addCase(startImportAuthorization.rejected, (state, action) => {
    state.providers[action.meta.arg] = {
      domainFilesTransfer: {},
      ...state.providers[action.meta.arg],
      status: "INIT",
    }
  })
  builder.addCase(startImportAuthorization.fulfilled, (state, action) => {
    state.providers[action.meta.arg] = {
      domainFilesTransfer: {},
      ...state.providers[action.meta.arg],
      status: "AUTH",
    }
  })
  builder.addCase(importContactsFromExternalSource.pending, (state) => {
    const provider = state.currentImportProvider

    if (provider) {
      state.providers[provider] = {
        domainFilesTransfer: {},
        ...state.providers[provider],
        status: "IMPORT-INTO-MC-IN-PROGRESS",
      }
    }
  })
  builder.addCase(
    importContactsFromExternalSource.fulfilled,
    (state, action) => {
      const provider = state.currentImportProvider

      if (provider) {
        state.providers[provider] = {
          domainFilesTransfer: {},
          ...state.providers[provider],
          status: "IMPORT-INTO-MC-DONE",
          contacts: action.payload,
        }
      }
    }
  )
  builder.addCase(importContactsFromExternalSource.rejected, (state) => {
    const provider = state.currentImportProvider

    if (provider) {
      state.providers[provider] = {
        domainFilesTransfer: {},
        ...state.providers[provider],
        status: "FAILED",
      }
    }
  })
  builder.addCase(importContactsFromFile.pending, (state) => {
    state.currentImportProvider = "FILE"
    state.providers.FILE = {
      domainFilesTransfer: {},
      ...state.providers.FILE,
      status: "IMPORT-INTO-MC-IN-PROGRESS",
    }
  })
  builder.addCase(importContactsFromFile.rejected, (state, action) => {
    if (action.payload === "cancelled") {
      state.providers.FILE = {
        domainFilesTransfer: {},
        ...state.providers.FILE,
        status: "INIT",
      }
    } else {
      state.providers.FILE = {
        domainFilesTransfer: {},
        ...state.providers.FILE,
        status: "FAILED",
        ...(action.payload ? { error: action.payload } : {}),
      }
    }
  })
  builder.addCase(importContactsFromFile.fulfilled, (state, action) => {
    state.providers.FILE = {
      domainFilesTransfer: {},
      ...state.providers.FILE,
      status: "IMPORT-INTO-MC-DONE",
      contacts: action.payload,
    }
  })
  builder.addCase(setImportProcessStatus, (state, action) => {
    const provider = state.currentImportProvider as ImportProvider
    if (state.providers[provider]) {
      state.providers[provider] = {
        ...{ domainFilesTransfer: {} },
        ...state.providers[provider],
        status: action.payload.status,
      }
    }
  })
  builder.addCase(startImportToDevice.pending, (state, action) => {
    const provider = state.currentImportProvider as ImportProvider
    if (state.providers[provider]) {
      state.providers[provider] = {
        ...{ domainFilesTransfer: {} },
        ...state.providers[provider],
        status: "IMPORT-INTO-DEVICE-IN-PROGRESS",
      }
    }
  })
  builder.addCase(startImportToDevice.rejected, (state, action) => {
    const provider = state.currentImportProvider as ImportProvider
    if (state.providers[provider]) {
      state.providers[provider] = {
        ...state.providers[provider],
        domainFilesTransfer: {},
        status: "FAILED",
        ...(action.payload
          ? {
              error: action.payload as ImportProviderState["error"],
            }
          : {}),
      }
    }
  })
  builder.addCase(startImportToDevice.fulfilled, (state, action) => {
    const provider = state.currentImportProvider as ImportProvider
    if (state.providers[provider]) {
      state.providers[provider] = {
        ...state.providers[provider],
        domainFilesTransfer: {},
        status: "DONE",
      }
    }
  })
  builder.addCase(setImportProcessFileStatus, (state, action) => {
    const provider = state.currentImportProvider as ImportProvider
    if (state.providers[provider]) {
      state.providers[provider]!.domainFilesTransfer = {
        ...state.providers[provider]!.domainFilesTransfer,
        [action.payload.domain]: { status: action.payload.status },
      }
    }
  })
})
