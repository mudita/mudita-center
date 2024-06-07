/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { ActionName } from "../action-names"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"
import {
  DataMigrationFeature,
  DataMigrationProgressStep,
} from "generic-view/models"
import {
  incrementTransferProgress,
  setTransferProgress,
  setTransferProgressLabel,
} from "./actions"
import { readAllIndexes } from "Core/data-sync/actions"
import { indexAllRequest } from "Core/data-sync/requests"
import { getDeviceInfoRequest } from "Core/device-info/requests"
import { isEmpty } from "lodash"
import { AllIndexes } from "Core/data-sync/types"
import { transformContacts } from "./contacts/transform-contacts"

export const performDataMigration = createAsyncThunk<
  void,
  undefined,
  { state: ReduxRootState }
>(ActionName.PerformDataMigration, async (_, { dispatch, getState }) => {
  const { dataMigration } = getState()

  const handleError = (message: string) => {
    console.log(message)
    // dispatch error
  }

  const sourceDeviceId = dataMigration.sourceDevice
  if (!sourceDeviceId) {
    handleError("Source device not selected")
    return
  }

  const features = dataMigration.selectedFeatures
  if (isEmpty(features)) {
    handleError("No features selected")
    return
  }

  // Divide 80% of progress by 2 for collecting data and sending data per feature
  const progressStep = Math.floor(80 / 2 / features.length)

  dispatch(setTransferProgressLabel(DataMigrationProgressStep.CollectingData))
  dispatch(setTransferProgress(1))

  const deviceInfo = await getDeviceInfoRequest(sourceDeviceId)
  if (
    !deviceInfo.ok ||
    !deviceInfo.data.serialNumber ||
    !deviceInfo.data.token
  ) {
    handleError("Error getting device info")
    return
  }

  const deviceDatabaseIndexed = await indexAllRequest({
    serialNumber: deviceInfo.data.serialNumber,
    token: deviceInfo.data.token,
  })

  if (!deviceDatabaseIndexed) {
    handleError("Error indexing device database")
    return
  }
  const databaseResponse = await dispatch(readAllIndexes())

  if (!databaseResponse.payload || databaseResponse.payload instanceof Error) {
    handleError("Error reading device database")
    return
  }
  dispatch(setTransferProgress(10))

  for (const feature of features) {
    switch (feature) {
      case DataMigrationFeature.Contacts: {
        dispatch(setTransferProgressLabel(DataMigrationFeature.Contacts))

        const { contacts } = databaseResponse.payload as AllIndexes
        const transformedData = transformContacts(Object.values(contacts))

        dispatch(incrementTransferProgress(progressStep))
        console.log({ transformedData })

        // const response = await getContactsRequest(sourceDeviceId)
        // dispatch(setTransferProgress(50))

        // console.log({ response })

        break
      }
    }
  }
})
