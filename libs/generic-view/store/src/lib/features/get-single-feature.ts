/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { DeviceId } from "Core/device/constants/device-id"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"
import { FeaturesActions } from "./featues-action-keys"
import { getOverviewConfig } from "./get-overview-config.actions"
import { getOverviewData } from "./get-overview-data.actions"
import { getGenericConfig } from "./get-generic-config.actions"
import { getFileManagerData } from "./get-file-manager-data.actions"

export const getSingleFeatures = createAsyncThunk<
  undefined,
  { deviceId: DeviceId; feature: string },
  { state: ReduxRootState }
>(
  FeaturesActions.GetSingleFeature,
  async ({ deviceId, feature }, { getState, dispatch }) => {
    switch (feature) {
      case "mc-overview":
        await dispatch(getOverviewConfig({ deviceId }))
        await dispatch(getOverviewData({ deviceId }))
        break
      case "fileManager":
        await dispatch(getGenericConfig({ deviceId, feature }))
        await dispatch(getFileManagerData({ deviceId }))
        break
      default:
        await dispatch(getGenericConfig({ deviceId, feature }))
        break
    }

    return undefined
  }
)
