/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { FilesManagerEvent } from "App/files-manager/constants"
import { GetFilesError } from "App/files-manager/errors"
import { setFiles } from "App/files-manager/actions/base.action"
import { getFilesRequest } from "App/files-manager/requests/get-files.request"
import { MetadataDeviceFile } from "App/files-manager/reducers"
import { RequestResponseStatus } from "App/core/types"

export const getFiles = createAsyncThunk<Error | MetadataDeviceFile[]>(
  FilesManagerEvent.GetFiles,
  async (_, { dispatch, rejectWithValue }) => {
    const result = await getFilesRequest()

    if (result.status !== RequestResponseStatus.Ok) {
      const message = result.error?.message ?? "Get files request failed"
      return rejectWithValue(new GetFilesError(message))
    }

    const data = result.data ?? []

    dispatch(setFiles(data))

    return data
  }
)
