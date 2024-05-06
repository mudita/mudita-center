/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createReducer } from "@reduxjs/toolkit"
import { startGoogleAuthorization } from "./get-google-contacts.action"
import {
  cleanImportProcess,
  setDataTransferProcessFileStatus,
  setDataTransferProcessStatus,
} from "./actions"
import { importContactsFromExternalSource } from "./import-contacts-from-external-source.action"
import { UnifiedContact } from "device/models"
import { startDataTransferToDevice } from "./start-data-transfer-to-device.action"
import { importContactsFromFile } from "./import-contacts-from.file"

interface ImportsState {
  providers: Partial<Record<ImportProvider, ImportProviderState>>
  currentImportProvider?: ImportProvider
}

type ImportProvider = "GOOGLE" | "FILE"

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
  error?: string
}

const initialState: ImportsState = {
  providers: {},
}

export const importsReducer = createReducer(initialState, (builder) => {
  builder.addCase(cleanImportProcess, (state, action) => {
    delete state.currentImportProvider
    state.providers = {}
  })
  builder.addCase(startGoogleAuthorization.pending, (state, action) => {
    state.currentImportProvider = "GOOGLE"
    state.providers.GOOGLE = {
      ...state.providers.GOOGLE,
      domainFilesTransfer: state.providers.GOOGLE?.domainFilesTransfer ?? {},
      status: "PENDING-AUTH",
    }
  })
  builder.addCase(startGoogleAuthorization.rejected, (state, action) => {
    state.providers.GOOGLE = {
      ...state.providers.GOOGLE,
      domainFilesTransfer: state.providers.GOOGLE?.domainFilesTransfer ?? {},
      status: "INIT",
    }
  })
  builder.addCase(startGoogleAuthorization.fulfilled, (state, action) => {
    state.providers.GOOGLE = {
      ...state.providers.GOOGLE,
      domainFilesTransfer: state.providers.GOOGLE?.domainFilesTransfer ?? {},
      status: "AUTH",
    }
  })
  builder.addCase(importContactsFromExternalSource.pending, (state, action) => {
    state.providers.GOOGLE = {
      ...state.providers.GOOGLE,
      domainFilesTransfer: state.providers.GOOGLE?.domainFilesTransfer ?? {},
      status: "IMPORT-INTO-MC-IN-PROGRESS",
    }
  })
  builder.addCase(
    importContactsFromExternalSource.fulfilled,
    (state, action) => {
      state.providers.GOOGLE = {
        ...state.providers.GOOGLE,
        domainFilesTransfer: state.providers.GOOGLE?.domainFilesTransfer ?? {},
        status: "IMPORT-INTO-MC-DONE",
        contacts: action.payload,
      }
    }
  )
  builder.addCase(
    importContactsFromExternalSource.rejected,
    (state, action) => {
      state.providers.GOOGLE = {
        ...state.providers.GOOGLE,
        domainFilesTransfer: state.providers.GOOGLE?.domainFilesTransfer ?? {},
        status: "FAILED",
      }
    }
  )
  builder.addCase(importContactsFromFile.pending, (state, action) => {
    state.currentImportProvider = "FILE"
    state.providers.FILE = {
      ...state.providers.FILE,
      domainFilesTransfer: state.providers.FILE?.domainFilesTransfer ?? {},
      status: "IMPORT-INTO-MC-IN-PROGRESS",
    }
  })
  builder.addCase(importContactsFromFile.rejected, (state, action) => {
    if (action.payload === "cancelled") {
      state.providers.FILE = {
        ...state.providers.FILE,
        domainFilesTransfer: state.providers.FILE?.domainFilesTransfer ?? {},
        status: "INIT",
      }
    } else {
      state.providers.FILE = {
        ...state.providers.FILE,
        domainFilesTransfer: state.providers.FILE?.domainFilesTransfer ?? {},
        status: "FAILED",
        ...(action.payload ? { error: action.payload } : {}),
      }
    }
  })
  builder.addCase(importContactsFromFile.fulfilled, (state, action) => {
    state.providers.FILE = {
      ...state.providers.FILE,
      domainFilesTransfer: state.providers.FILE?.domainFilesTransfer ?? {},
      status: "IMPORT-INTO-MC-DONE",
      contacts: action.payload,
    }
  })
  builder.addCase(setDataTransferProcessStatus, (state, action) => {
    const provider = state.currentImportProvider as ImportProvider
    if (state.providers[provider]) {
      state.providers[provider] = {
        ...state.providers[provider],
        domainFilesTransfer:
          state.providers[provider]!.domainFilesTransfer ?? {},
        status: action.payload.status,
      }
    }
  })
  builder.addCase(startDataTransferToDevice.pending, (state, action) => {
    const provider = state.currentImportProvider as ImportProvider
    if (state.providers[provider]) {
      state.providers[provider] = {
        ...state.providers[provider],
        domainFilesTransfer:
          state.providers[provider]!.domainFilesTransfer ?? {},
        status: "IMPORT-INTO-DEVICE-IN-PROGRESS",
      }
    }
  })
  builder.addCase(startDataTransferToDevice.rejected, (state, action) => {
    const provider = state.currentImportProvider as ImportProvider
    if (state.providers[provider]) {
      state.providers[provider] = {
        ...state.providers[provider],
        domainFilesTransfer: {},
        status: "FAILED",
      }
    }
  })
  builder.addCase(startDataTransferToDevice.fulfilled, (state, action) => {
    const provider = state.currentImportProvider as ImportProvider
    if (state.providers[provider]) {
      state.providers[provider] = {
        ...state.providers[provider],
        domainFilesTransfer: {},
        status: "DONE",
      }
    }
  })
  builder.addCase(setDataTransferProcessFileStatus, (state, action) => {
    const provider = state.currentImportProvider as ImportProvider
    if (state.providers[provider]) {
      state.providers[provider]!.domainFilesTransfer = {
        ...state.providers[provider]!.domainFilesTransfer,
        [action.payload.domain]: { status: action.payload.status },
      }
    }
  })
})
