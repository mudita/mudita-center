/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { ApiFileTransferError } from "device/models"
import { getDeviceStoragesRequest, getMtpDeviceIdRequest } from "device/feature"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"
import { AppError } from "Core/core/errors"
import { DeviceId } from "Core/device/constants/device-id"
import { SendFileViaMTPPayload } from "./send-file-via-mtp.action"
import { ActionName } from "../action-names"
import { selectActiveApiDeviceId } from "../selectors/select-active-api-device-id"
import { selectDeviceById } from "../selectors/select-devices"

interface GetMtpSendFileMetadataPayload {
  destinationPath: string
  isMtpPathInternal: boolean
  customDeviceId?: DeviceId
}

export const getMtpSendFileMetadata = createAsyncThunk<
  Omit<SendFileViaMTPPayload, "file">,
  GetMtpSendFileMetadataPayload,
  { state: ReduxRootState }
>(
  ActionName.GetMtpSendFileMetadata,
  async (
    { destinationPath, customDeviceId, isMtpPathInternal },
    { signal, getState, rejectWithValue }
  ) => {
    const deviceId = customDeviceId || selectActiveApiDeviceId(getState())
    const activeDevice = deviceId
      ? selectDeviceById(getState(), deviceId)
      : undefined

    if (!activeDevice) {
      return rejectWithValue(new AppError("", "Device not found"))
    }

    const mtpDeviceId = await getMtpDeviceIdRequest(activeDevice)
    if (signal.aborted) {
      return rejectWithValue(
        new AppError(ApiFileTransferError.Aborted, "Aborted")
      )
    }

    if (!mtpDeviceId) {
      const error = new AppError(
        ApiFileTransferError.MtpInitializeAccessError,
        "Not found MTP device ID"
      )
      return rejectWithValue(error)
    }

    const mtpDeviceStorages = await getDeviceStoragesRequest(mtpDeviceId)
    if (signal.aborted) {
      return rejectWithValue(
        new AppError(ApiFileTransferError.Aborted, "Aborted")
      )
    }

    if (!mtpDeviceStorages.ok) {
      const error = new AppError(
        mtpDeviceStorages.error.type,
        "Not found MTP device storages"
      )
      return rejectWithValue(error)
    }

    const storageId = mtpDeviceStorages.data.find(
      (s) => s.isInternal === isMtpPathInternal
    )?.id

    if (!storageId) {
      const error = new AppError(
        ApiFileTransferError.MtpInitializeAccessError,
        "Not found MTP device storage ID"
      )
      return rejectWithValue(error)
    }

    return {
      storageId,
      deviceId: mtpDeviceId,
      destinationPath: destinationPath,
    }
  }
)
