/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { DeviceId } from "Core/device/constants/device-id"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"
import { FeaturesActions } from "./featues-action-keys"
import { getSingleFeatures } from "./get-single-feature"

export const getAllFeatures = createAsyncThunk<
  undefined,
  { deviceId: DeviceId; features: string[] },
  { state: ReduxRootState }
>(
  FeaturesActions.GetAllFeatures,
  ({ deviceId, features }, { getState, dispatch }) => {
    features.forEach((feature) => {
      dispatch(getSingleFeatures({ deviceId, feature }))
    })

    return undefined
  }
)
