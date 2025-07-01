/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"
import { ActionName } from "../action-names"

export interface ExportFileItem {
  id: string
  path: string
  fileName: string
  fileSize: number
}

export interface ExportFilesPayload {
  files: ExportFileItem[]
  destinationPath: string
  actionId: string
  entitiesType?: string
}

export const exportFiles = createAsyncThunk<
  void,
  ExportFilesPayload,
  { state: ReduxRootState }
>(ActionName.ExportFiles, async (payload, thunkAPI) => {
  console.log("📦 exportFiles payload:", payload)

  await new Promise((res) => setTimeout(res, 5500))

  return
})
