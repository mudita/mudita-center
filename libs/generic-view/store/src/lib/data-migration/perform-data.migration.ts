/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { ActionName } from "../action-names"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"
import { DataMigrationFeature } from "generic-view/models"
import {
  setDataMigrationAbort,
  setDataMigrationPureDbIndexing,
  setDataMigrationProgress,
  setDataMigrationStatus,
} from "./actions"
import { readAllIndexes } from "Core/data-sync/actions"
import { indexAllRequest } from "Core/data-sync/requests"
import { getDeviceInfoRequest } from "Core/device-info/requests"
import { isEmpty } from "lodash"
import { AllIndexes } from "Core/data-sync/types"
import { mapPureApi } from "../imports/contacts-mappers/pure/map-pure-api"
import {
  DomainData,
  transferDataToDevice,
} from "../data-transfer/transfer-data-to-device.action"
import logger from "Core/__deprecated__/main/utils/logger"
import { DataMigrationPercentageProgress } from "./data-migration-percentage-progress.interface"
import { abortDataTransfer } from "../data-transfer/abort-data-transfer.action"
import { delay } from "shared/utils"
import { createBackupRequest } from "Core/backup/requests"

export const performDataMigration = createAsyncThunk<
  void,
  undefined,
  { state: ReduxRootState }
>(
  ActionName.PerformDataMigration,
  async (_, { dispatch, getState, signal, abort, rejectWithValue }) => {
    const { dataMigration, settings } = getState()
    const pureOsBackupDesktopFileDir = settings.osBackupLocation

    const dataMigrationAbortController = new AbortController()
    dataMigrationAbortController.abort = abort
    dispatch(setDataMigrationAbort(dataMigrationAbortController))

    const abortListener = async () => {
      dispatch(abortDataTransfer())
      signal.removeEventListener("abort", abortListener)
    }
    signal.addEventListener("abort", abortListener)

    const handleError = (message: string) => {
      logger.error(message)
      dispatch(setDataMigrationStatus("FAILED"))
      dispatch(abortDataTransfer())
      return rejectWithValue(undefined)
    }

    const sourceDeviceId = dataMigration.sourceDevice
    if (!sourceDeviceId) {
      return handleError("Source device not selected")
    }

    const features = dataMigration.selectedFeatures
    if (isEmpty(features)) {
      return handleError("No features selected")
    }

    if (signal.aborted) {
      return rejectWithValue(undefined)
    }
    dispatch(
      setDataMigrationProgress(DataMigrationPercentageProgress.CollectingData)
    )

    const deviceInfo = await getDeviceInfoRequest(sourceDeviceId)
    if (
      !deviceInfo.ok ||
      !deviceInfo.data.serialNumber ||
      !deviceInfo.data.token
    ) {
      return handleError("Error getting device info")
    }

    if (signal.aborted) {
      return rejectWithValue(undefined)
    }
    dispatch(setDataMigrationPureDbIndexing(true))

    const fileBase = `${new Date()
      .toISOString()
      .replace(/\./g, "")
      .replace(/-/g, "")
      .replace(/:/g, "")}`
    const downloadDeviceBackupResponse = await createBackupRequest({
      fileBase: fileBase,
      cwd: pureOsBackupDesktopFileDir,
      // extract: true,
      deviceId: sourceDeviceId,
    })
    console.log(downloadDeviceBackupResponse)

    dispatch(setDataMigrationPureDbIndexing(false))

    return
    // const deviceDatabaseIndexed = await indexAllRequest({
    //   serialNumber: deviceInfo.data.serialNumber,
    //   token: deviceInfo.data.token,
    // })
    //
    // if (signal.aborted) {
    //   return rejectWithValue(undefined)
    // }
    // if (!deviceDatabaseIndexed) {
    //   return handleError("Error indexing device database")
    // }
    // const databaseResponse = await dispatch(readAllIndexes())
    //
    // if (
    //   !databaseResponse.payload ||
    //   databaseResponse.payload instanceof Error
    // ) {
    //   return handleError("Error reading device database")
    // }
    //
    // const domainsData: DomainData[] = []
    //
    // for (const feature of features) {
    //   if (signal.aborted) {
    //     return rejectWithValue(undefined)
    //   }
    //
    //   switch (feature) {
    //     case DataMigrationFeature.Contacts: {
    //       const { contacts } = databaseResponse.payload as AllIndexes
    //       const transformedData = mapPureApi(Object.values(contacts))
    //
    //       domainsData.push({
    //         domain: "contacts-v1", // FIXME: The domain should be returned from Data Migration configuration
    //         data: transformedData,
    //       })
    //       break
    //     }
    //   }
    // }
    //
    // dispatch(
    //   setDataMigrationProgress(DataMigrationPercentageProgress.TransferringData)
    // )
    //
    // if (signal.aborted) {
    //   return rejectWithValue(undefined)
    // }
    // const transferResponse = await dispatch(transferDataToDevice(domainsData))
    //
    // if (transferResponse.meta.requestStatus === "rejected") {
    //   return signal.aborted
    //     ? rejectWithValue(undefined)
    //     : handleError("Error transferring data")
    // }
    // dispatch(setDataMigrationProgress(DataMigrationPercentageProgress.Finished))
    //
    // await delay(500)
    //
    // dispatch(setDataMigrationStatus("COMPLETED"))
    //
    // return
  }
)
