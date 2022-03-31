/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { FilesManagerEvent } from "App/files-manager/constants"
import { GetFilesError } from "App/files-manager/errors"
import { setFiles } from "App/files-manager/actions/base.action"
import { getFilesRequest } from "App/files-manager/requests/get-files.request"
import { McUsbFile } from "@mudita/pure"

export const getFiles = createAsyncThunk<Error | McUsbFile[]>(
  FilesManagerEvent.GetFiles,
  async (_, { dispatch, rejectWithValue }) => {
    const data = await getFilesRequest()

    if (data === undefined) {
      return rejectWithValue(new GetFilesError("Import Files request failed"))
    }

    dispatch(setFiles(data))

    return data
  }
)
