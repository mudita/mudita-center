/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createReducer } from "@reduxjs/toolkit"
import {
  clearDataTransfer,
  setDataTransfer,
  setDataTransferStatus,
} from "./actions"
import { transferDataToDevice } from "./transfer-data-to-device.action"

type Domain = string

export type DomainTransferStatus =
  | "IDLE"
  | "READY"
  | "IN-PROGRESS"
  | "PROCESSING"

export type DataTransferStatus =
  | "IDLE"
  | "IN-PROGRESS"
  | "FINALIZING"
  | "FAILED"

export type DataTransfer = Record<Domain, { status: DomainTransferStatus }>

export interface DataTransferState {
  transfer: DataTransfer
  status: DataTransferStatus
}

const initialState: DataTransferState = {
  transfer: {},
  status: "IDLE",
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
    builder.addCase(clearDataTransfer, (state, action) => {
      state.transfer = {}
      state.status = "IDLE"
    })
    builder.addCase(transferDataToDevice.pending, (state, action) => {
      state.status = "IN-PROGRESS"
    })
    builder.addCase(transferDataToDevice.rejected, (state, action) => {
      state.status = "FAILED"
    })
    builder.addCase(setDataTransferStatus, (state, action) => {
      state.status = action.payload
    })
  }
)
