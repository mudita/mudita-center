/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAction } from "@reduxjs/toolkit"
import { ActionName } from "../action-names"
import { ImportStatus } from "./import.types"

export const cleanImportProcess = createAction(ActionName.CleanImportProcess)

export const setImportProcessStatus = createAction<ImportStatus>(
  ActionName.SetImportProcessStatus
)
