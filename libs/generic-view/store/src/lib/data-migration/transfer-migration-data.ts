/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { ActionName } from "../action-names"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"
import { DataMigrationFeature } from "generic-view/models"
import {
  addDataMigrationAbortController,
  setDataMigrationStatus,
} from "./actions"
import { readAllIndexes } from "Core/data-sync/actions"
import { isEmpty } from "lodash"
import { AllIndexes } from "Core/data-sync/types"
import { pureToUnifiedContact } from "./data-migration-mappers/pure-to-unified-contact"
import {
  DomainData,
  transferDataToDevice,
} from "../data-transfer/transfer-data-to-device.action"
import logger from "Core/__deprecated__/main/utils/logger"
import { abortDataTransfer } from "../data-transfer/abort-data-transfer.action"
import { delay } from "shared/utils"
import { removeDirectory } from "system-utils/feature"
import { DataMigrationStatus } from "./reducer"
import { clearMigrationData } from "./clear-migration-data"
import { pureToUnifiedMessage } from "./data-migration-mappers/pure-to-unified-message"
import { refreshEntitiesIfMetadataChanged } from "../entities/refresh-entities-if-metadata-changed.action"
import { selectActiveApiDeviceId } from "../selectors"

export const transferMigrationData = createAsyncThunk<
  void,
  undefined,
  { state: ReduxRootState }
>(
  ActionName.TransferMigrationData,
  async (_, { dispatch, getState, signal, abort, rejectWithValue }) => {
    try {
      const { dataMigration } = getState()

      const abortController = new AbortController()
      abortController.abort = abort
      dispatch(addDataMigrationAbortController(abortController))

      const abortListener = async () => {
        dispatch(abortDataTransfer())
        dispatch(clearMigrationData())
        signal.removeEventListener("abort", abortListener)
      }
      signal.addEventListener("abort", abortListener)

      const handleError = (message: string) => {
        logger.error(message)
        dispatch(setDataMigrationStatus(DataMigrationStatus.Failed))
        dispatch(abortDataTransfer())
        dispatch(clearMigrationData())
        return rejectWithValue(undefined)
      }

      const deviceId = selectActiveApiDeviceId(getState())

      if (!deviceId) {
        return handleError("Device not found")
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

      const databaseResponse = await dispatch(readAllIndexes())
      await removeDirectory(dataMigration.pureDbTempDirectory!)

      if (
        !databaseResponse.payload ||
        databaseResponse.payload instanceof Error
      ) {
        return handleError("Error reading device database")
      }

      const domainsData: DomainData[] = []

      for (const feature of features) {
        if (signal.aborted) {
          return rejectWithValue(undefined)
        }

        switch (feature) {
          case DataMigrationFeature.Contacts: {
            const { contacts } = databaseResponse.payload as AllIndexes
            const transformedData = pureToUnifiedContact(
              Object.values(contacts)
            )

            if (!isEmpty(transformedData)) {
              domainsData.push({
                domain: "contacts-v1", // TODO: As part of CP-3255: retrieve domain from Data Migration configuration.
                data: transformedData,
              })
            }
            break
          }
          case DataMigrationFeature.CallLog: {
            const { callLog } = databaseResponse.payload as AllIndexes
            const transformedData = Object.values(callLog)

            if (!isEmpty(transformedData)) {
              domainsData.push({
                domain: "callLog-v1", // TODO: As part of CP-3255: retrieve domain from Data Migration configuration.
                data: transformedData,
              })
            }
            break
          }
          case DataMigrationFeature.Messages: {
            const transformedData = pureToUnifiedMessage(
              databaseResponse.payload as AllIndexes
            )

            if (!isEmpty(transformedData)) {
              domainsData.push({
                domain: "messages-v1", // TODO: As part of CP-3255: retrieve domain from Data Migration configuration.
                data: transformedData,
              })
            }
            break
          }
          case DataMigrationFeature.Alarms: {
            const { alarms } = databaseResponse.payload as AllIndexes
            const transformedData = Object.values(alarms)

            if (!isEmpty(transformedData)) {
              domainsData.push({
                domain: "alarms-v1", // TODO: As part of CP-3255: retrieve domain from Data Migration configuration.
                data: transformedData,
              })
            }
            break
          }
          case DataMigrationFeature.Notes: {
            const { notes } = databaseResponse.payload as AllIndexes
            const transformedData = Object.values(notes)

            if (!isEmpty(transformedData)) {
              domainsData.push({
                domain: "notes-v1", // TODO: As part of CP-3255: retrieve domain from Data Migration configuration.
                data: transformedData,
              })
            }
            break
          }
        }
      }

      dispatch(setDataMigrationStatus(DataMigrationStatus.DataTransferring))

      if (signal.aborted) {
        return rejectWithValue(undefined)
      }
      if (!isEmpty(domainsData)) {
        const transferResponse = await dispatch(
          transferDataToDevice(domainsData)
        )
        if (transferResponse.meta.requestStatus === "rejected") {
          return signal.aborted
            ? rejectWithValue(undefined)
            : handleError("Error transferring data")
        }
      }
      dispatch(setDataMigrationStatus(DataMigrationStatus.DataTransferred))

      await delay()

      if (domainsData.some((obj) => obj.domain === "contacts-v1")) {
        await dispatch(
          refreshEntitiesIfMetadataChanged({
            deviceId: deviceId,
            entitiesType: "contacts",
          })
        )
      }

      dispatch(setDataMigrationStatus(DataMigrationStatus.Completed))

      return
    } catch (error) {
      console.error(error)
      return rejectWithValue(undefined)
    }
  }
)
