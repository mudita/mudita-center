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
import { EntitiesFileData, EntitiesJsonData } from "device/models"
import { setEntitiesData } from "./actions"
import { getFile } from "../file-transfer/get-file.action"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"

export const getEntitiesDataAction = createAsyncThunk<
  undefined,
  {
    entityType: string
    deviceId: DeviceId
    responseType?: EntityDataResponseType
  },
  { state: ReduxRootState }
>(
  ActionName.GetEntitiesData,
  async (
    { responseType = "file", entityType, deviceId },
    { rejectWithValue, dispatch }
  ) => {
    const response = await getEntitiesDataRequest({
      entityType,
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
      dispatch(
        setEntitiesData({
          entityType,
          data: readFileResponse.data.data,
        })
      )
      return
    } else {
      const { data } = response.data as EntitiesJsonData
      dispatch(
        setEntitiesData({
          entityType,
          data,
        })
      )
      return
    }
  }
)