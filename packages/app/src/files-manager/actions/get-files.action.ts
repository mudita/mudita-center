/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { FilesManagerEvent } from "App/files-manager/constants"
import { getFilesRequest } from "App/files-manager/requests/get-files.request"
import { File } from "App/files-manager/dto"

export const getFiles = createAsyncThunk<File[]>(
  FilesManagerEvent.GetFiles,
  async (_, { rejectWithValue }) => {
    const result = await getFilesRequest()

    if (!result.ok || !result.data) {
      return rejectWithValue(result.error)
    }

    return result.data
  }
)
