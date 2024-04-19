/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { DeviceId } from "Core/device/constants/device-id"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"
import { FeaturesActions } from "./featues-action-keys"
import { getGenericConfig } from "./get-generic-config.actions"

export const getSingleFeatures = createAsyncThunk<
  undefined,
  { deviceId: DeviceId; feature: string },
  { state: ReduxRootState }
>(
  FeaturesActions.GetSingleFeature,
  async ({ deviceId, feature }, { dispatch }) => {
    await dispatch(getGenericConfig({ deviceId, feature }))
    // switch (feature) {
    //   case "mc-overview":
    //     await dispatch(getGenericConfig({ deviceId, feature }))
    //     await dispatch(getOverviewData({ deviceId }))
    //     break
    //   default:
    //     await dispatch(getGenericConfig({ deviceId, feature }))
    //     break
    // }

    return undefined
  }
)
