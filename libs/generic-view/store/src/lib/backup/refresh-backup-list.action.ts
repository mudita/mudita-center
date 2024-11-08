/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { readBackupDirectoryRequest } from "device/feature"
import { DeviceId } from "Core/device/constants/device-id"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"
import { ActionName } from "../action-names"
import { selectActiveApiDeviceId } from "../selectors/select-active-api-device-id"
import { Backup } from "./reducer"

export const refreshBackupList = createAsyncThunk<
  { refreshTimestamp: number; backups: Backup[]; deviceId: DeviceId },
  { disableErrorLog: boolean } | undefined,
  { state: ReduxRootState }
>(
  ActionName.RefreshBackupList,
  async (
    { disableErrorLog } = { disableErrorLog: false },
    { getState, rejectWithValue }
  ) => {
    const refreshTimestamp = new Date().getTime()

    const deviceId = selectActiveApiDeviceId(getState())
    if (!deviceId) {
      return rejectWithValue(undefined)
    }

    const backupsList = await readBackupDirectoryRequest({
      deviceId,
      disableErrorLog,
    })

    if (!backupsList.ok) {
      return rejectWithValue(undefined)
    }

    const backups =
      (backupsList.data
        .map((item) => {
          const isFormatValid = /^\d+[_][a-zA-Z0-9]+[.]mcbackup$/i.test(item)

          if (!isFormatValid) {
            return null
          }

          const [fileName] = item.split(".")
          const [timestamp, serialNumber] = fileName.split("_")
          const result: Backup = {
            date: new Date(Number(timestamp)),
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
