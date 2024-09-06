/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { ActionName } from "../action-names"
import { getEntitiesConfigRequest } from "device/feature"
import { DeviceId } from "Core/device/constants/device-id"
import { setEntitiesConfig } from "./actions"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"
import { getEntitiesMetadataAction } from "./get-entities-metadata.action"

export const getEntitiesConfigAction = createAsyncThunk<
  undefined,
  { deviceId: DeviceId; entityTypes?: string[] },
  { state: ReduxRootState }
>(
  ActionName.GetEntitiesConfig,
  async ({ deviceId, entityTypes = [] }, { rejectWithValue, dispatch }) => {
    for (const entityType of entityTypes) {
      const response = await getEntitiesConfigRequest({
        deviceId,
        entityType,
      })
      if (!response.ok) {
        return rejectWithValue(response.error)
      }
      const config = response.data
      const idFieldKey = Object.entries(config.fields).find(
        ([, field]) => field.type === "id"
      )![0]

      dispatch(
        setEntitiesConfig({
          entityType,
          config,
          idFieldKey,
        })
      )
      dispatch(getEntitiesMetadataAction({ entityType, deviceId }))
    }
    return
  }
)
