/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import {
  FilesManagerEvent,
  DeviceDirectory,
  eligibleFormat,
} from "Core/files-manager/constants"
import { getFilesRequest } from "Core/files-manager/requests/get-files.request"
import { File } from "Core/files-manager/dto"

export const getFiles = createAsyncThunk<File[], DeviceDirectory>(
  FilesManagerEvent.GetFiles,
  async (payload, { rejectWithValue }) => {
    const result = await getFilesRequest({
      directory: payload,
      filter: { extensions: eligibleFormat },
    })

    if (!result.ok || !result.data) {
      return rejectWithValue(result.error)
    }

    return result.data
  }
)
