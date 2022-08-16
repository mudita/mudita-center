/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { DeviceError, DeviceEvent } from "App/device/constants"
import { RequestResponseStatus } from "App/core/types"
import getStorageInfo from "App/__deprecated__/renderer/requests/get-storage-info.request"
import StorageInfo from "App/__deprecated__/common/interfaces/storage-info.interface"
import { AppError } from "App/core/errors"

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
