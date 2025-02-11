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
  sendClearRequest,
} from "device/feature"
import { DeviceId } from "Core/device/constants/device-id"
import { EntitiesFileData, EntitiesJsonData, EntityData } from "device/models"
import { getFile } from "../file-transfer/get-file.action"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"
import { AppError } from "Core/core/errors"
import { enhanceEntity } from "./helpers/enhance-entity"
import { selectDeviceEntityAbortController } from "../selectors/entities"

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
    let transferId: number | undefined
    let abortGetFileAction: VoidFunction | undefined

    const abortController = selectDeviceEntityAbortController(getState(), {
      deviceId,
      entitiesType,
    })

    if (abortController?.signal.aborted) {
      return rejectWithValue(undefined)
    }

    abortController?.signal.addEventListener("abort", async () => {
      void getEntitiesDataRequest({
        entitiesType,
        deviceId,
        responseType,
        action: "abort",
      })

      if (transferId) {
        void sendClearRequest(transferId)
      }
      if (abortGetFileAction) {
        abortGetFileAction()
      }
    })

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
      if (abortController?.signal.aborted) {
        return rejectWithValue(undefined)
      }
      const { filePath } = response.data as EntitiesFileData
      const getFilePromise = dispatch(
        getFile({
          deviceId,
          filePath,
        })
      )
      abortGetFileAction = getFilePromise.abort
      const getFileResponse = await getFilePromise
      if (
        !getFileResponse.payload ||
        !("transferId" in getFileResponse.payload)
      ) {
        return rejectWithValue(getFileResponse.payload)
      }

      transferId = getFileResponse.payload.transferId

      if (abortController?.signal.aborted) {
        return rejectWithValue(undefined)
      }
      const readFileResponse = await readEntitiesDataFromFileRequest({
        transferId,
      })
      if (!readFileResponse.ok) {
        return rejectWithValue(readFileResponse.error)
      }
      data = readFileResponse.data.data
    } else {
      ;({ data } = response.data as EntitiesJsonData)
    }

    const computedFields =
      genericEntities[deviceId]?.[entitiesType]?.config?.computedFields || {}
    return data.map((entity) => {
      return enhanceEntity(entity, { computedFields })
    })
  }
)
