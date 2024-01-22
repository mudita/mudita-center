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

export const getSingleFeatures = createAsyncThunk<
  undefined,
  { deviceId: DeviceId; feature: string },
  { state: ReduxRootState }
>(
  FeaturesActions.GetSingleFeature,
  async ({ deviceId, feature }, { getState, dispatch }) => {
    console.log(deviceId, feature)

    switch (feature) {
      case "mc-overview":
        await dispatch(getOverviewConfig({ deviceId }))
        await dispatch(getOverviewData({ deviceId }))
        break
    }

    return undefined
  }
)
