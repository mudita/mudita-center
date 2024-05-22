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
import { loadDeviceData } from "Core/device"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"

export const getFiles = createAsyncThunk<File[], DeviceDirectory, { state: ReduxRootState }>(
  FilesManagerEvent.GetFiles,
  async (payload, { rejectWithValue, dispatch }) => {
    const result = await getFilesRequest({
      directory: payload,
      filter: { extensions: eligibleFormat },
    })

    if (!result.ok || !result.data) {
      return rejectWithValue(result.error)
    }

    await dispatch(loadDeviceData())

    return result.data
  }
)
