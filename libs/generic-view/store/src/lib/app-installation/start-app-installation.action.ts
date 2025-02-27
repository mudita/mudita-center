/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"
import { ActionName } from "../action-names"
import { DeviceId } from "Core/device/constants/device-id"
import { startAppInstallationRequest } from "device/feature"

interface DeleteEntitiesDataActionPayload {
  filePath: string
  deviceId: DeviceId
  fileName: string
  onSuccess?: () => Promise<void> | void
  onError?: () => Promise<void> | void
}

export const startAppInstallationAction = createAsyncThunk<
  { deviceId: string; installationId: number; fileName?: string },
  DeleteEntitiesDataActionPayload,
  { state: ReduxRootState }
>(
  ActionName.StartAppInstallation,
  async (
    { filePath, deviceId, fileName, onSuccess, onError },
    { rejectWithValue }
  ) => {
    const response = await startAppInstallationRequest(filePath, deviceId)

    if (response.ok) {
      await onSuccess?.()
      return {
        deviceId,
        installationId: response.data.installationId,
        fileName,
      }
    }

    await onError?.()
    return rejectWithValue(response.error)
  }
)
