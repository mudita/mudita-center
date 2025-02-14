/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"
import { ActionName } from "../action-names"
import { DeviceId } from "Core/device/constants/device-id"
import { startAppInstallationRequest } from "device/feature"

export const startAppinstallation = createAsyncThunk<
  { deviceId: string; installationId: number },
  { filePath: string; deviceId: DeviceId },
  { state: ReduxRootState }
>(
  ActionName.StartAppInstallation,
  async ({ filePath, deviceId }, { rejectWithValue }) => {
    const response = await startAppInstallationRequest(filePath, deviceId)

    if (response.ok) {
      return { deviceId, installationId: response.data.installationId }
    }

    return rejectWithValue(response.error)
  }
)
