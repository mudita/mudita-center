/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAction } from "@reduxjs/toolkit"
import { ActionName } from "../action-names"
import { ImportStatus, ProcessFileStatus } from "./reducer"

export const cleanImportProcess = createAction(ActionName.CleanImportProcess)

export const setDataTransferProcessStatus = createAction<{
  status: ImportStatus
}>(ActionName.SetDataTransferProcessStatus)

export const setDataTransferProcessFileStatus = createAction<{
  domain: string
  status: ProcessFileStatus
}>(ActionName.SetDataTransferProcessFileStatus)
