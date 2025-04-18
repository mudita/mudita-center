/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { delay } from "shared/utils"
import {
  FilesManagerEvent,
  DeviceDirectory,
  eligibleFormat,
} from "Core/files-manager/constants"
import { getFilesRequest } from "Core/files-manager/requests/get-files.request"
import { File } from "Core/files-manager/dto"
import { loadDeviceData } from "Core/device"
import { DeviceType } from "device-protocol/models"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"
import { getActiveDeviceTypeSelector } from "device-manager/feature"
import { FilesManagerState, SoundApp } from "Core/files-manager/reducers"

export const getFiles = createAsyncThunk<
  FilesManagerState["filesMap"],
  undefined,
  { state: ReduxRootState }
>(
  FilesManagerEvent.GetFiles,
  async (_, { rejectWithValue, dispatch, getState }) => {
    await delay()
    const deviceType = getActiveDeviceTypeSelector(getState())
    if (deviceType === undefined) {
      return rejectWithValue("device Type isn't set")
    }

    const directories = getDirectoriesByDeviceType(deviceType)

    const getFilesResults: FilesManagerState["filesMap"] = {}

    for (const directory of directories) {
      const result = await getFilesRequest({
        directory,
        filter: { extensions: eligibleFormat },
      })

      if (!result.ok || !result.data) {
        return rejectWithValue(result.error)
      }

      const filesMapKey = getFilesMapKey(directory, deviceType)

      getFilesResults[filesMapKey] = [...result.data].reverse() as File[]
    }

    await dispatch(loadDeviceData())

    return getFilesResults
  }
)

const getFilesMapKey = (
  directory: DeviceDirectory,
  deviceType: DeviceType
): SoundApp => {
  if (
    directory === DeviceDirectory.Music &&
    deviceType === DeviceType.MuditaPure
  ) {
    return "PURE_MUSIC"
  } else if (
    directory === DeviceDirectory.Relaxation &&
    deviceType === DeviceType.MuditaHarmony
  ) {
    return "HARMONY_RELAXATION"
  } else if (
    directory === DeviceDirectory.Alarm &&
    deviceType === DeviceType.MuditaHarmony
  ) {
    return "HARMONY_ALARM"
  } else {
    return "UNKNOWN"
  }
}

const getDirectoriesByDeviceType = (
  deviceType: DeviceType
): DeviceDirectory[] => {
  if (deviceType === DeviceType.MuditaPure) {
    return [DeviceDirectory.Music]
  } else {
    return [DeviceDirectory.Relaxation, DeviceDirectory.Alarm]
  }
}
