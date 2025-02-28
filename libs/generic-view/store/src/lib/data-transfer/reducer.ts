/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createReducer } from "@reduxjs/toolkit"
import {
  clearDataTransfer,
  setDataTransfer,
  setDataTransferAbort,
  setDataTransferStatus,
  setPostProcessingProgress,
} from "./actions"
import { transferDataToDevice } from "./transfer-data-to-device.action"
import { ApiFileTransferError } from "device/models"
import { DataTransfer, DataTransferStatus } from "./data-transfer.types"

export interface DataTransferState {
  transfer: DataTransfer
  status: DataTransferStatus
  postProcessingProgress: number
  errorType?: ApiFileTransferError
  abortController?: AbortController
}

const initialState: DataTransferState = {
  transfer: {},
  status: "IDLE",
  postProcessingProgress: 0,
}

export const genericDataTransferReducer = createReducer(
  initialState,
  (builder) => {
    builder.addCase(setDataTransfer, (state, action) => {
      state.transfer = {
        ...state.transfer,
        ...action.payload,
      }
    })
    builder.addCase(setPostProcessingProgress, (state, action) => {
      state.postProcessingProgress = action.payload
    })
    builder.addCase(clearDataTransfer, (state) => {
      state.transfer = {}
      state.status = "IDLE"
      state.postProcessingProgress = 0
      delete state.errorType
    })
    builder.addCase(transferDataToDevice.pending, (state) => {
      state.status = "IN-PROGRESS"
    })
    builder.addCase(transferDataToDevice.rejected, (state, action) => {
      state.status = "FAILED"
      state.postProcessingProgress = 0
      state.errorType = action.payload as ApiFileTransferError
    })
    builder.addCase(setDataTransferStatus, (state, action) => {
      state.status = action.payload
    })
    builder.addCase(setDataTransferAbort, (state, action) => {
      state.abortController = action.payload
    })
  }
)
