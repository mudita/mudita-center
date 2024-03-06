/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { DeviceId } from "Core/device/constants/device-id"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"
import { readBackupDirectoryRequest } from "device/feature"

import { ActionName } from "../action-names"
import { Backup } from "./reducer"

export const refreshBackupList = createAsyncThunk<
  { refreshTimestamp: number; backups: Backup[]; deviceId: DeviceId },
  undefined,
  { state: ReduxRootState }
>(
  ActionName.RefreshBackupList,
  async (_, { getState, dispatch, rejectWithValue }) => {
    const refreshTimestamp = new Date().getTime()

    const deviceId = getState().genericViews.activeDevice
    if (!deviceId) {
      return rejectWithValue(undefined)
    }

    const backupsList = await readBackupDirectoryRequest(deviceId)

    if (!backupsList.ok) {
      return rejectWithValue(undefined)
    }

    const backups =
      (backupsList.data
        .map((item) => {
          const isFormatValid =
            /^\d+[_][a-zA-Z0-9]+[.]mcbackup$/.exec(item) !== null

          if (!isFormatValid) {
            return null
          }

          const [fileName] = item.split(".")
          const [timestamp, serialNumber] = fileName.split("_")
          const result: Backup = {
            date: new Date(+timestamp),
            fileName: item,
            serialNumber,
          }
          return result
        })
        .filter(Boolean) as Backup[]) ?? []

    return {
      refreshTimestamp,
      backups,
      deviceId,
    }
  }
)
