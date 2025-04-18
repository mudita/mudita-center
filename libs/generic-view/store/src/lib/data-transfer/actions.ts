/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAction } from "@reduxjs/toolkit"
import { ActionName } from "../action-names"
import { DataTransferStatus, DataTransfer } from "./data-transfer.types"

export const setDataTransfer = createAction<DataTransfer>(
  ActionName.SetDataTransfer
)

export const setDataTransferStatus = createAction<DataTransferStatus>(
  ActionName.SetDataTransferStatus
)

export const clearDataTransfer = createAction(ActionName.ClearDataTransfer)

export const setDataTransferAbort = createAction<AbortController | undefined>(
  ActionName.SetDataTransferAbort
)

export const setPostProcessingProgress = createAction<number>(
  ActionName.SetDataTransferPostProcessingProgress
)
