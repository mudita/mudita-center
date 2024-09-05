/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { ActionName } from "../action-names"
import {
  EntityDataResponseType,
  EntityId,
  getEntitiesDataRequest,
  readEntityDataFromFileRequest,
} from "device/feature"
import { setEntityData } from "./actions"
import { DeviceId } from "Core/device/constants/device-id"
import { EntitiesFileData, EntityJsonData } from "device/models"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"
import { getFile } from "../file-transfer/get-file.action"

export const getEntityDataAction = createAsyncThunk<
  undefined,
  {
    entityType: string
    entityId: EntityId
    deviceId: DeviceId
    responseType?: EntityDataResponseType
  },
  { state: ReduxRootState }
>(
  ActionName.GetEntityData,
  async (
    { responseType = "file", entityId, entityType, deviceId },
    { rejectWithValue, dispatch }
  ) => {
    const response = await getEntitiesDataRequest({
      entityType,
      deviceId,
      responseType,
      entityId,
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

      const readFileResponse = await readEntityDataFromFileRequest({
        transferId: getFileResponse.payload.transferId,
      })
      if (!readFileResponse.ok) {
        return rejectWithValue(readFileResponse.error)
      }
      dispatch(
        setEntityData({
          entityType,
          entityId,
          data: readFileResponse.data.data,
        })
      )
      return
    } else {
      const { data } = response.data as EntityJsonData
      dispatch(
        setEntityData({
          entityType,
          entityId,
          data,
        })
      )
      return
    }
  }
)
