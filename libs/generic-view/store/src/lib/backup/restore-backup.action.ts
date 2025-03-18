/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import intersection from "lodash/intersection"
import {
  cancelRestoreRequest,
  checkRestoreRequest,
  preRestoreRequest,
  sendClearRequest,
  startRestorePreSendFileRequest,
  startRestoreRequest,
} from "device/feature"
import { RestoreFeature } from "generic-view/models"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"
import { ActionName } from "../action-names"
import { sendFile } from "../file-transfer/send-file.action"
import { selectActiveApiDeviceId } from "../selectors/select-active-api-device-id"
import { setRestoreProcessFileStatus, setRestoreProcessStatus } from "./actions"
import { BackupProcessFileStatus, RestoreProcessStatus } from "./backup.types"
import { delay } from "shared/utils"
import { refreshEntitiesIfMetadataChanged } from "../entities/refresh-entities-if-metadata-changed.action"
import { cancelLoadEntities } from "../entities/cancel-load-entities.action"

const preRestoreProgressFactor = 0.05
const preSendFileProgressFactor = 0.05
const fileSendProgressFactor = 0.1
const restoringProgressFactor = 0.8

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
    let totalProgress = 0
    let aborted = false
    let abortFileRequest: VoidFunction

    const abortListener = async () => {
      signal.removeEventListener("abort", abortListener)
      aborted = true
      abortFileRequest?.()
      await clearTransfers?.()
      if (restoreId && deviceId) {
        await cancelRestoreRequest(restoreId, deviceId)
      }
    }
    signal.addEventListener("abort", abortListener)

    const deviceId = selectActiveApiDeviceId(getState())
    const restoreFileId =
      getState().genericBackups.restoreProcess?.restoreFileId

    const fileKeys =
      getState().genericBackups.restoreProcess?.metadata?.features

    if (!deviceId || !restoreFileId || !fileKeys || aborted) {
      console.log("invalid deviceId, restoreFileId, or fileKeys")
      return rejectWithValue(undefined)
    }

    await dispatch(cancelLoadEntities({ deviceId }))

    const featuresWithKeys = features
      .map((item) => {
        const keys = intersection(item.keys, fileKeys)
        return { feature: item.feature, key: keys[0] ?? "" }
      })
      .filter((item) => item.key !== "")

    if (featuresWithKeys.length === 0 || aborted) {
      console.log(`restore keys are incompatible with backup keys`)
      return rejectWithValue(undefined)
    }

    dispatch(
      setRestoreProcessStatus({
        status: RestoreProcessStatus.PreRestore,
        progress: 0,
      })
    )

    const preRestoreResponse = await preRestoreRequest(
      featuresWithKeys,
      deviceId
    )

    if (!preRestoreResponse.ok || aborted) {
      console.log(`preRestore failed`)
      return rejectWithValue(undefined)
    }

    const { restoreId, features: featuresPathMap } = preRestoreResponse.data

    const featuresPaths: {
      feature: string
      key: string
      path: string
      transfer?: {
        transferId: number
        chunksCount: number
      }
    }[] = Object.entries(featuresPathMap).map(([feature, path]) => {
      return {
        feature,
        path,
        // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
        key: featuresWithKeys.find((item) => item.feature === feature)?.key!,
      }
    })

    const clearTransfers = () => {
      return Promise.all(
        featuresPaths.map(async (feature) => {
          feature.transfer?.transferId &&
            (await sendClearRequest(feature.transfer.transferId))
        })
      )
    }

    totalProgress += 100 * preRestoreProgressFactor
    dispatch(
      setRestoreProcessStatus({
        status: RestoreProcessStatus.PreRestore,
        progress: totalProgress,
      })
    )

    const singleFilePreSendProgressFactor =
      preSendFileProgressFactor / features.length
    for (let i = 0; i < features.length; ++i) {
      if (aborted) {
        return rejectWithValue(undefined)
      }
      const featurePath = featuresPaths[i]

      const preSendResponse = await startRestorePreSendFileRequest(
        restoreFileId,
        featurePath.key,
        featurePath.path,
        password,
        deviceId
      )

      if (!preSendResponse.ok) {
        console.log("cannot start pre send")
        void clearTransfers()
        return rejectWithValue(undefined)
      }

      featuresPaths[i].transfer = preSendResponse.data
      dispatch(
        setRestoreProcessFileStatus({
          feature: featurePath.feature,
          status: BackupProcessFileStatus.Pending,
        })
      )
      totalProgress += 100 * singleFilePreSendProgressFactor
      dispatch(
        setRestoreProcessStatus({
          status: RestoreProcessStatus.PreRestore,
          progress: totalProgress,
        })
      )
    }

    const singleFileSendProgressFactor =
      fileSendProgressFactor / features.length
    for (let i = 0; i < features.length; ++i) {
      if (aborted) {
        return rejectWithValue(undefined)
      }
      const featurePath = featuresPaths[i]
      dispatch(
        setRestoreProcessFileStatus({
          feature: featurePath.feature,
          status: BackupProcessFileStatus.InProgress,
        })
      )
      const sendFilePromise = dispatch(
        sendFile({
          deviceId,
          // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
          transferId: featurePath.transfer?.transferId!,
          // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
          chunksCount: featurePath.transfer?.chunksCount!,
        })
      )
      abortFileRequest = sendFilePromise.abort
      const sendFileResponse = await sendFilePromise
      if (sendFileResponse.meta.requestStatus !== "fulfilled") {
        clearTransfers()
        return rejectWithValue(undefined)
      }
      if (!aborted) {
        dispatch(
          setRestoreProcessFileStatus({
            feature: featurePath.feature,
            status: BackupProcessFileStatus.Done,
          })
        )
        totalProgress += 100 * singleFileSendProgressFactor
        dispatch(
          setRestoreProcessStatus({
            status: RestoreProcessStatus.PreRestore,
            progress: totalProgress,
          })
        )
      }
    }

    void clearTransfers()

    dispatch(
      setRestoreProcessStatus({
        status: RestoreProcessStatus.Restoring,
        progress: totalProgress,
      })
    )

    if (aborted) {
      return rejectWithValue(undefined)
    }

    const startRestoreResponse = await startRestoreRequest(restoreId, deviceId)

    if (!startRestoreResponse.ok) {
      console.log("start restore failed")
      return rejectWithValue(undefined)
    }

    let restoreProgress = startRestoreResponse.data.progress

    while (restoreProgress < 100) {
      const checkPreRestoreResponse = await checkRestoreRequest(
        restoreId,
        deviceId
      )
      if (aborted) {
        return rejectWithValue(undefined)
      }

      if (!checkPreRestoreResponse.ok) {
        console.log(checkPreRestoreResponse.error)
        return rejectWithValue(undefined)
      }

      restoreProgress = checkPreRestoreResponse.data.progress
      dispatch(
        setRestoreProcessStatus({
          status: RestoreProcessStatus.Restoring,
          progress: totalProgress + restoreProgress * restoringProgressFactor,
        })
      )
      await delay()
    }

    if (aborted) {
      return rejectWithValue(undefined)
    }
    dispatch(
      setRestoreProcessStatus({
        status: RestoreProcessStatus.Done,
        progress: 100,
      })
    )

    await dispatch(
      refreshEntitiesIfMetadataChanged({
        deviceId: deviceId,
        entitiesType: "contacts",
      })
    )

    await delay()

    return undefined
  }
)
