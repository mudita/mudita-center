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
    entitiesType: string
    deviceId: DeviceId
    responseType?: EntityDataResponseType
  },
  { state: ReduxRootState }
>(
  ActionName.GetEntitiesData,
  async (
    { responseType = "file", entitiesType, deviceId },
    { rejectWithValue, dispatch }
  ) => {
    if (process.env.NODE_ENV === "development") {
      await new Promise((resolve) => setTimeout(resolve, 2000))

      dispatch(
        setEntitiesData({
          entitiesType,
          data: [
            {
              contactId: 1,
              firstName: "John",
              lastName: "Doe",
              namePrefix: "Mr.",
              email: "john.doe@example.com",
              phoneNumbers: [
                {
                  id: 1,
                  phoneNumber: "123456789",
                  phoneType: "home",
                },
                {
                  id: 2,
                  phoneNumber: "987654321",
                  phoneType: "work",
                },
              ],
            },
            {
              contactId: 2,
              firstName: "Jane",
              lastName: "Doe",
              namePrefix: "Mrs.",
              email: "jane.doe@example.com",
              phoneNumbers: [
                {
                  id: 1,
                  phoneNumber: "456789123",
                  phoneType: "home",
                },
                {
                  id: 2,
                  phoneNumber: "654321987",
                  phoneType: "work",
                },
              ],
            },
            {
              contactId: 3,
              firstName: "Alice",
              lastName: "Smith",
              namePrefix: "Ms.",
              email: "alice.smith@example.com",
              phoneNumbers: [
                {
                  id: 1,
                  phoneNumber: "789123456",
                  phoneType: "home",
                },
                {
                  id: 2,
                  phoneNumber: "321987654",
                  phoneType: "work",
                },
              ],
            }
          ],
        })
      )
      return
    }
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
      dispatch(
        setEntitiesData({
          entitiesType,
          data: readFileResponse.data.data,
        })
      )
      return
    } else {
      const { data } = response.data as EntitiesJsonData
      dispatch(
        setEntitiesData({
          entitiesType,
          data,
        })
      )
      return
    }
  }
)
