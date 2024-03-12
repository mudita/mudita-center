/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"
import {
  loadBackupMetadataRequest,
  getBackupPathRequest,
  readFileRequest,
} from "device/feature"
import { ActionName } from "../action-names"
import { RestoreMetadata } from "device/models"

export const loadBackupMetadata = createAsyncThunk<
  RestoreMetadata,
  {
    filePath: string
  },
  { state: ReduxRootState; rejectValue: undefined }
>(ActionName.LoadBackupMetadata, async ({ filePath }, { rejectWithValue }) => {
  const backupPathResponse = await getBackupPathRequest()
  if (!backupPathResponse.ok) {
    return rejectWithValue(undefined)
  }

  const readFileResponse = await readFileRequest([
    backupPathResponse.data,
    filePath,
  ])
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

  return metadataResponse.data
})
