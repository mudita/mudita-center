/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { DeviceId } from "Core/device/constants/device-id"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"
import { FeaturesActions } from "./featues-action-keys"
import { getOverviewData } from "./get-overview-data.actions"
import { getGenericData } from "./get-generic-data.actions"

export const getSingleFeatureData = createAsyncThunk<
  undefined,
  { deviceId: DeviceId; feature: string },
  { state: ReduxRootState }
>(
  FeaturesActions.GetSingleFeature,
  async ({ deviceId, feature }, { dispatch }) => {
    switch (feature) {
      case "mc-overview":
        await dispatch(getOverviewData({ deviceId }))
        break
      default:
        await dispatch(getGenericData({ deviceId, feature }))
    }

    return undefined
  }
)
