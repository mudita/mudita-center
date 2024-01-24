/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { DeviceId } from "Core/device/constants/device-id"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"
import { FeaturesActions } from "./featues-action-keys"
import { getOverviewConfig } from "./get-overview-config.actions"

export const getSingleFeatureConfig = createAsyncThunk<
  undefined,
  { deviceId: DeviceId; feature: string },
  { state: ReduxRootState }
>(
  FeaturesActions.GetSingleFeatureConfig,
  async ({ deviceId, feature }, { getState, dispatch }) => {
    switch (feature) {
      case "mc-overview":
        await dispatch(getOverviewConfig({ deviceId }))
        break
    }

    return undefined
  }
)
