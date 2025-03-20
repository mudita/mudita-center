/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { ActionName } from "../action-names"
import { DeviceId } from "Core/device/constants/device-id"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"
import { getEntitiesConfigAction } from "./get-entities-config.action"
import { getEntitiesMetadataAction } from "./get-entities-metadata.action"
import { getEntitiesDataAction } from "./get-entities-data.action"
import { selectEntitiesLoadingState } from "../selectors/entities"

export const loadEntities = createAsyncThunk<
  void,
  { deviceId: DeviceId; entitiesTypes?: string[] },
  { state: ReduxRootState }
>(
  ActionName.LoadEntities,
  async ({ deviceId, entitiesTypes = [] }, { dispatch, getState }) => {
    for (const entitiesType of entitiesTypes) {
      await dispatch(
        getEntitiesConfigAction({
          deviceId,
          entitiesType,
        })
      )
      const entitiesLoadingStates = selectEntitiesLoadingState(getState(), {
        deviceId,
      })
      const state = entitiesLoadingStates[entitiesType]?.state
      if (state === "loading" || state === "loaded") {
        continue
      }

      await dispatch(getEntitiesMetadataAction({ entitiesType, deviceId }))
      await dispatch(getEntitiesDataAction({ entitiesType, deviceId }))
    }
  }
)
