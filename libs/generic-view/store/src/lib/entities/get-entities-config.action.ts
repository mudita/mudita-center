/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { ActionName } from "../action-names"
import { getEntitiesConfigRequest } from "device/feature"
import { DeviceId } from "Core/device/constants/device-id"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"
import { EntitiesConfig } from "device/models"
import { selectDeviceEntityAbortController } from "../selectors/entities"

type GetEntitiesConfigActionPayload = {
  config: EntitiesConfig
  idFieldKey: string
}

export const getEntitiesConfigAction = createAsyncThunk<
  GetEntitiesConfigActionPayload,
  { deviceId: DeviceId; entitiesType: string },
  { state: ReduxRootState }
>(
  ActionName.GetEntitiesConfig,
  async ({ deviceId, entitiesType }, { rejectWithValue, getState }) => {
    const abortController = selectDeviceEntityAbortController(getState(), {
      deviceId,
      entitiesType,
    })

    if (abortController?.signal.aborted) {
      return rejectWithValue(undefined)
    }

    const response = await getEntitiesConfigRequest({
      deviceId,
      entitiesType,
    })
    if (!response.ok) {
      return rejectWithValue(response.error)
    }
    const config = response.data
    const idFieldKey = Object.entries(config.fields).find(
      ([, field]) => field.type === "id"
    )![0]

    return {
      config,
      idFieldKey,
    }
  }
)
