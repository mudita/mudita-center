/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"
import {
  getBackupPathRequest,
  loadBackupMetadataRequest,
  readFileRequest,
} from "device/feature"
import { ActionName } from "../action-names"
import { RestoreMetadata } from "device/models"
import * as path from "node:path"

export const loadBackupMetadata = createAsyncThunk<
  { restoreMetadata: RestoreMetadata; restoreFileId: string },
  {
    filePath: string
  },
  { state: ReduxRootState; rejectValue: undefined }
>(ActionName.LoadBackupMetadata, async ({ filePath }, { rejectWithValue }) => {
  const backupPathResponse = await getBackupPathRequest()
  if (!backupPathResponse.ok) {
    return rejectWithValue(undefined)
  }

  const backupPath = backupPathResponse.data[0]
    .split(path.sep)
    .slice(0, -1)
    .join(path.sep)

  const readFileResponse = await readFileRequest([backupPath, filePath])
  if (!readFileResponse.ok) {
    console.log(readFileResponse.error)
    return rejectWithValue(undefined)
  }

  const metadataResponse = await loadBackupMetadataRequest(
    readFileResponse.data
  )
  if (!metadataResponse.ok) {
    console.log(metadataResponse.error)
    return rejectWithValue(undefined)
  }

  return {
    restoreMetadata: metadataResponse.data,
    restoreFileId: readFileResponse.data,
  }
})
