/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { ActionName } from "../action-names"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"
import { DataMigrationFeature } from "generic-view/models"
import { setDataMigrationStatus, setTransferProgress } from "./actions"
import { readAllIndexes } from "Core/data-sync/actions"
import { indexAllRequest } from "Core/data-sync/requests"
import { getDeviceInfoRequest } from "Core/device-info/requests"
import { isEmpty } from "lodash"
import { AllIndexes } from "Core/data-sync/types"
import { transformContacts } from "./transformers/transform-contacts"
import {
  DomainData,
  transferDataToDevice,
} from "../data-transfer/transfer-data-to-device.action"
import logger from "Core/__deprecated__/main/utils/logger"
import { DataMigrationStatus } from "./reducer"
import { DataMigrationPercentageProgress } from "./data-migration-percentage-progress.interface"

export const performDataMigration = createAsyncThunk<
  void,
  undefined,
  { state: ReduxRootState }
>(
  ActionName.PerformDataMigration,
  async (_, { dispatch, getState, signal, rejectWithValue }) => {
    let aborted = false
    let abortTransfer = () => {}

    const abortListener = async () => {
      aborted = true
      abortTransfer()
      signal.removeEventListener("abort", abortListener)
    }
    signal.addEventListener("abort", abortListener)

    const { dataMigration } = getState()

    const handleError = (
      message: string,
      reason: Extract<DataMigrationStatus, "FAILED" | "CANCELLED"> = "FAILED"
    ) => {
      logger.error(message)
      dispatch(setDataMigrationStatus(reason))
      abortTransfer()
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

    if (aborted) {
      return handleError("Data migration aborted", "CANCELLED")
    }
    dispatch(
      setTransferProgress(DataMigrationPercentageProgress.CollectingData)
    )

    const deviceInfo = await getDeviceInfoRequest(sourceDeviceId)
    if (
      !deviceInfo.ok ||
      !deviceInfo.data.serialNumber ||
      !deviceInfo.data.token
    ) {
      return handleError("Error getting device info")
    }

    if (aborted) {
      return handleError("Data migration aborted", "CANCELLED")
    }
    const deviceDatabaseIndexed = await indexAllRequest({
      serialNumber: deviceInfo.data.serialNumber,
      token: deviceInfo.data.token,
    })

    if (!deviceDatabaseIndexed) {
      return handleError("Error indexing device database")
    }
    if (aborted) {
      return handleError("Data migration aborted", "CANCELLED")
    }
    const databaseResponse = await dispatch(readAllIndexes())

    if (
      !databaseResponse.payload ||
      databaseResponse.payload instanceof Error
    ) {
      return handleError("Error reading device database")
    }

    const domainsData: DomainData[] = []

    for (const feature of features) {
      if (aborted) {
        return handleError("Data migration aborted", "CANCELLED")
      }

      switch (feature) {
        case DataMigrationFeature.Contacts: {
          const { contacts } = databaseResponse.payload as AllIndexes
          const transformedData = transformContacts(Object.values(contacts))

          domainsData.push({
            domain: "contacts-v1", // FIXME: The domain should be returned from Data Migration configuration
            data: transformedData,
          })
          break
        }
      }
    }

    dispatch(
      setTransferProgress(DataMigrationPercentageProgress.TransferringData)
    )

    if (aborted) {
      return handleError("Data migration aborted", "CANCELLED")
    }
    const transferPromise = dispatch(transferDataToDevice(domainsData))
    abortTransfer = () => transferPromise.abort()
    const response = await transferPromise

    if (response.meta.requestStatus === "rejected") {
      return handleError("Error transferring data")
    }
    dispatch(setTransferProgress(DataMigrationPercentageProgress.Finished))

    setTimeout(() => {
      dispatch(setDataMigrationStatus("COMPLETED"))
    }, 500)

    return
  }
)
