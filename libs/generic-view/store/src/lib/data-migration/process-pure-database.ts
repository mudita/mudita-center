/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { ActionName } from "../action-names"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"
import {
  addDataMigrationAbortController,
  setDataMigrationPureBusy,
  setDataMigrationPureDbTempDirectory,
  setDataMigrationPureRestarting,
  setDataMigrationStatus,
} from "./actions"
import logger from "Core/__deprecated__/main/utils/logger"
import { checkPath, getAppPath } from "system-utils/feature"
import { DataMigrationStatus } from "./reducer"
import { createBackupRequest } from "Core/backup/requests"
import { indexAllRequest } from "Core/data-sync/requests"
import { clearMigrationData } from "./clear-migration-data"

export const processPureDatabase = createAsyncThunk<
  void,
  undefined,
  { state: ReduxRootState }
>(
  ActionName.ProcessDataMigrationDatabase,
  async (_, { dispatch, getState, signal, abort, rejectWithValue }) => {
    const { dataMigration } = getState()
    const { sourceDevice } = dataMigration

    const tempBackupDirectory = (await getAppPath("pureBackupTemp")).data
    await checkPath(tempBackupDirectory, true)
    dispatch(setDataMigrationPureDbTempDirectory(tempBackupDirectory))

    const abortController = new AbortController()
    abortController.abort = abort
    dispatch(addDataMigrationAbortController(abortController))

    const abortListener = async () => {
      signal.removeEventListener("abort", abortListener)
      dispatch(clearMigrationData())
      dispatch(setDataMigrationPureRestarting(false))
    }
    signal.addEventListener("abort", abortListener)

    const handleError = (message: string) => {
      logger.error(message)
      dispatch(setDataMigrationStatus(DataMigrationStatus.Failed))
      dispatch(clearMigrationData())
      return rejectWithValue(undefined)
    }

    if (!sourceDevice) {
      return handleError("Source device not selected")
    }

    if (signal.aborted) {
      return rejectWithValue(undefined)
    }

    dispatch(setDataMigrationPureBusy(sourceDevice.serialNumber))
    const downloadDeviceBackupResponse = await createBackupRequest({
      deviceId: sourceDevice.serialNumber,
      fileBase: "backup.tar",
      cwd: tempBackupDirectory,
      extract: true,
    })
    dispatch(setDataMigrationPureBusy(undefined))

    if (signal.aborted) {
      dispatch(clearMigrationData())
      return rejectWithValue(undefined)
    }

    if (downloadDeviceBackupResponse.error) {
      return handleError("Failed to download device backup")
    }

    dispatch(setDataMigrationPureBusy(sourceDevice.serialNumber))
    await indexAllRequest({
      serialNumber: sourceDevice.serialNumber,
      backupDirectory: tempBackupDirectory,
    })
    dispatch(setDataMigrationPureBusy(undefined))

    if (signal.aborted) {
      dispatch(setDataMigrationPureBusy(undefined))
      dispatch(clearMigrationData())
      return rejectWithValue(undefined)
    }

    dispatch(setDataMigrationStatus(DataMigrationStatus.DataReading))
    return
  }
)
