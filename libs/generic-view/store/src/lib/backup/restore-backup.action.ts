/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"
import {
  checkRestoreRequest,
  preRestoreRequest,
  sendClearRequest,
  startRestorePreSendFileRequest,
  startRestoreRequest,
} from "device/feature"
import { RestoreFeature } from "device/models"
import intersection from "lodash/intersection"
import { ActionName } from "../action-names"
import { sendFile } from "../file-transfer/send-file.action"

export const restoreBackup = createAsyncThunk<
  undefined,
  {
    features: RestoreFeature[]
    password?: string
  },
  { state: ReduxRootState }
>(
  ActionName.RestoreBackup,
  async (
    { features, password },
    { getState, dispatch, rejectWithValue, signal }
  ) => {
    console.log("restore start")
    console.log(features, password)

    const deviceId = getState().genericViews.activeDevice
    const restoreFileId =
      getState().genericBackups.restoreProcess?.restoreFileId

    const fileKeys =
      getState().genericBackups.restoreProcess?.metadata?.features

    if (!deviceId || !restoreFileId || !fileKeys) {
      console.log("invalid deviceId, restoreFileId, or fileKeys")
      return rejectWithValue(undefined)
    }

    const featuresWithKeys = features
      .map((item) => {
        const keys = intersection(item.keys, fileKeys)
        return { feature: item.feature, key: keys[0] ?? "" }
      })
      .filter((item) => item.key !== "")

    if (featuresWithKeys.length === 0) {
      console.log(`restore keys are incompatible with backup keys`)
      return rejectWithValue(undefined)
    }

    const preRestoreResponse = await preRestoreRequest(
      featuresWithKeys,
      deviceId
    )

    if (!preRestoreResponse.ok) {
      console.log(`preRestore failed`)
      return rejectWithValue(undefined)
    }

    const { restoreId, features: featuresPathMap } = preRestoreResponse.data

    const featuresPaths: {
      feature: string
      path: string
      transfer?: {
        transferId: number
        chunksCount: number
      }
    }[] = Object.entries(featuresPathMap).map(([feature, path]) => {
      return { feature, path }
    })

    const clearTransfers = () => {
      return Promise.all(
        featuresPaths.map(async (feature) => {
          feature.transfer?.transferId &&
            (await sendClearRequest(feature.transfer.transferId))
        })
      )
    }

    for (let i = 0; i < features.length; ++i) {
      const featurePath = featuresPaths[i]

      const preSendResponse = await startRestorePreSendFileRequest(
        restoreFileId,
        featurePath.feature,
        featurePath.path,
        password,
        deviceId
      )

      console.log(preSendResponse)

      if (!preSendResponse.ok) {
        console.log("cannot start pre send")
        clearTransfers()
        return rejectWithValue(undefined)
      }

      featuresPaths[i].transfer = preSendResponse.data
    }

    for (let i = 0; i < features.length; ++i) {
      const featurePath = featuresPaths[i]

      const sendFileResponse = await dispatch(
        sendFile({
          deviceId,
          transferId: featurePath.transfer?.transferId!,
          chunksCount: featurePath.transfer?.chunksCount!,
        })
      )

      if (sendFileResponse.meta.requestStatus !== "fulfilled") {
        clearTransfers()
        return rejectWithValue(undefined)
      }
    }

    clearTransfers()

    const startRestoreResponse = await startRestoreRequest(restoreId, deviceId)

    if (startRestoreResponse.ok) {
      console.log("start restore failed")
      return rejectWithValue(undefined)
    }

    let restoreProgress = 0

    while (restoreProgress < 100) {
      const checkPreRestoreResponse = await checkRestoreRequest(
        restoreId,
        deviceId
      )

      if (!checkPreRestoreResponse.ok) {
        console.log(checkPreRestoreResponse.error)
        return rejectWithValue(undefined)
      }

      restoreProgress = checkPreRestoreResponse.data.progress
    }

    return undefined
  }
)
