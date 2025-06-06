/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"
import { ActionName } from "../action-names"
import { DeviceId } from "Core/device/constants/device-id"
import { getAppInstallationProgressRequest } from "device/feature"
import { GetAppInstallationProgress } from "device/models"
import { AppError } from "Core/core/errors"

export const getAppinstallationProgressAction = createAsyncThunk<
  {
    deviceId: string
    appInstallationProcessConfig: GetAppInstallationProgress
  },
  { installationId: number; deviceId: DeviceId },
  { state: ReduxRootState }
>(
  ActionName.GetAppInstallationProgress,
  async ({ installationId, deviceId }, { rejectWithValue }) => {
    const response = await getAppInstallationProgressRequest(
      installationId,
      deviceId
    )

    if (response.ok) {
      return { deviceId, appInstallationProcessConfig: response.data }
    }

    return rejectWithValue(response.error as AppError)
  }
)
