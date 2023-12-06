/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { DeviceError, DeviceEvent } from "Core/device/constants"
import { RequestResponseStatus } from "Core/core/types"
import getStorageInfo from "Core/__deprecated__/renderer/requests/get-storage-info.request"
import StorageInfo from "Core/__deprecated__/common/interfaces/storage-info.interface"
import { AppError } from "Core/core/errors"

export const loadStorageInfoAction = createAsyncThunk<StorageInfo>(
  DeviceEvent.LoadStorageInfo,
  async (_, { rejectWithValue }) => {
    const { status, data } = await getStorageInfo()
    if (status === RequestResponseStatus.Ok && data !== undefined) {
      return data
    } else {
      return rejectWithValue(
        new AppError(
          DeviceError.LoadStorageInfo,
          "`getStorageInfo` request returns error"
        )
      )
    }
  }
)
