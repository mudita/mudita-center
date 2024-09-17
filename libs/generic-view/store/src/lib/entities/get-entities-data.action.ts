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
    { rejectWithValue, dispatch }
  ) => {
    const response = await getEntitiesDataRequest({
      entitiesType,
      deviceId,
      responseType,
    })

    if (!response.ok) {
      return rejectWithValue(response.error)
    }

    if (responseType === "file") {
      const { filePath } = response.data as EntitiesFileData
      const getFileResponse = await dispatch(
        getFile({
          deviceId,
          filePath,
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
      return readFileResponse.data.data
    } else {
      const { data } = response.data as EntitiesJsonData
      return data
    }
  }
)
