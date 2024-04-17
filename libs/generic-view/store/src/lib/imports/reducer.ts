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
import { UnifiedContact } from "Libs/device/models/src"
import { startDataTransferToDevice } from "./start-data-transfer-to-device.action"

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
  | "IMPORT-INTO-DEVICE-IN-PROGRESS"
  | "IMPORT-INTO-DEVICE-FILES-TRANSFER"
  | "IMPORT-DEVICE-DATA-TRANSFER"
  | "DONE"
  | "FAILED"

export type ProcessFileStatus = "PENDING" | "IN_PROGRESS" | "DONE"

interface ImportProviderState {
  status: ImportStatus
  contacts?: UnifiedContact[]
  domainFilesTransfer: Record<
    string,
    { transferId?: number; status: ProcessFileStatus }
  >
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
      ...state.providers.GOOGLE,
      domainFilesTransfer: state.providers.GOOGLE?.domainFilesTransfer ?? {},
      status: "PENDING-AUTH",
    }
  })
  builder.addCase(startGoogleAuthorization.rejected, (state, action) => {
    state.providers.GOOGLE = {
      ...state.providers.GOOGLE,
      domainFilesTransfer: state.providers.GOOGLE?.domainFilesTransfer ?? {},
      status: "FAILED",
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
  builder.addCase(setDataTransferProcessStatus, (state, action) => {
    state.providers.GOOGLE = {
      ...state.providers.GOOGLE,
      domainFilesTransfer: state.providers.GOOGLE?.domainFilesTransfer ?? {},
      status: action.payload.status,
    }
  })
  builder.addCase(startDataTransferToDevice.pending, (state, action) => {
    state.providers.GOOGLE = {
      ...state.providers.GOOGLE,
      domainFilesTransfer: state.providers.GOOGLE?.domainFilesTransfer ?? {},
      status: "IMPORT-INTO-DEVICE-IN-PROGRESS",
    }
  })
  builder.addCase(startDataTransferToDevice.rejected, (state, action) => {
    state.providers.GOOGLE = {
      ...state.providers.GOOGLE,
      domainFilesTransfer: {},
      status: "FAILED",
    }
  })
  builder.addCase(startDataTransferToDevice.fulfilled, (state, action) => {
    state.providers.GOOGLE = {
      ...state.providers.GOOGLE,
      domainFilesTransfer: {},
      status: "DONE",
    }
  })
  builder.addCase(setDataTransferProcessFileStatus, (state, action) => {
    if (state.providers.GOOGLE) {
      state.providers.GOOGLE.domainFilesTransfer = {
        ...state.providers.GOOGLE.domainFilesTransfer,
        [action.payload.domain]: { status: action.payload.status },
      }
    }
  })
})
