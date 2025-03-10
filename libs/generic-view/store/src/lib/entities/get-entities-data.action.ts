/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { ActionName } from "../action-names"
import {
  EntityDataResponseType,
  getEntitiesDataRequest,
  readEntitiesDataFromFileRequest,
} from "device/feature"
import { DeviceId } from "Core/device/constants/device-id"
import { EntitiesFileData, EntitiesJsonData, EntityData } from "device/models"
import { getFile } from "../file-transfer/get-file.action"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"
import { AppError } from "Core/core/errors"
import { enhanceEntity } from "./helpers/enhance-entity"
import { delay } from "shared/utils"
import { ResponseStatus } from "../../../../../core/device/constants/response-status.constant"
import { setEntitiesProgress } from "./actions"

const readingProgressFactor = 0.9
const fileTransferProgressFactor = 0.1

export const getEntitiesDataAction = createAsyncThunk<
  EntityData[],
  {
    entitiesType: string
    deviceId: DeviceId
    responseType?: EntityDataResponseType
  },
  { state: ReduxRootState; rejectValue?: AppError }
>(
  ActionName.GetEntitiesData,
  async (
    { responseType = "file", entitiesType, deviceId },
    { rejectWithValue, dispatch, getState }
  ) => {
    let data = []
    const { genericEntities } = getState()

    const response = await getEntitiesDataRequest({
      entitiesType,
      deviceId,
      responseType,
    })
    if (!response.ok) {
      return rejectWithValue(response.error)
    }

    if (responseType === "file") {
      let {
        filePath,
        progress = 0,
        status,
      } = response.data as EntitiesFileData & {
        status: ResponseStatus
      }
      dispatch(
        setEntitiesProgress({
          entitiesType,
          progress: progress * readingProgressFactor,
          deviceId,
        })
      )

      while (status !== ResponseStatus.Ok) {
        await delay(250)
        const progressResponse = await getEntitiesDataRequest({
          entitiesType,
          deviceId,
          responseType,
        })
        if (!progressResponse.ok) {
          return rejectWithValue(response.error)
        }
        ;({ filePath, status, progress = 0 } = progressResponse.data)
        dispatch(
          setEntitiesProgress({
            entitiesType,
            progress: progress * readingProgressFactor,
            deviceId,
          })
        )
      }

      if (!filePath) {
        return rejectWithValue(undefined)
      }
      const readingFinalProgress = 100 * readingProgressFactor
      dispatch(
        setEntitiesProgress({
          entitiesType,
          progress: readingFinalProgress,
          deviceId,
        })
      )

      const getFileResponse = await dispatch(
        getFile({
          deviceId,
          filePath,
          onProgress: (progress) => {
            dispatch(
              setEntitiesProgress({
                entitiesType,
                progress:
                  readingFinalProgress + progress * fileTransferProgressFactor,
                deviceId,
              })
            )
          },
        })
      )
      if (
        !getFileResponse.payload ||
        !("transferId" in getFileResponse.payload)
      ) {
        return rejectWithValue(getFileResponse.payload)
      }

      const readFileResponse = await readEntitiesDataFromFileRequest({
        transferId: getFileResponse.payload.transferId,
      })
      if (!readFileResponse.ok) {
        return rejectWithValue(readFileResponse.error)
      }
      data = readFileResponse.data.data
    } else {
      ;({ data } = response.data as EntitiesJsonData)
    }

    const computedFields =
      genericEntities[deviceId]?.[entitiesType]?.config.computedFields || {}
    return data.map((entity) => {
      return enhanceEntity(entity, { computedFields })
    })
  }
)
