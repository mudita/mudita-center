/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import {
  DeviceFileSystemError,
  DeviceFileSystemEvent,
} from "Core/device-file-system/constants"
import { removeFileRequest } from "Core/device-file-system/requests/remove-file.request"
import { AppError } from "Core/core/errors"

export const removeFile = createAsyncThunk<void, string>(
  DeviceFileSystemEvent.Remove,
  async (payload, { rejectWithValue }) => {
    const response = await removeFileRequest(payload)

    if (!response.ok || !response.data) {
      return rejectWithValue(
        new AppError(
          DeviceFileSystemError.Removing,
          "Cannot remove the file",
          response
        )
      )
    }

    return
  }
)
