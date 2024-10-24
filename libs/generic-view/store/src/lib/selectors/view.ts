/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createSelector } from "reselect"
import { selectActiveDeviceFeatures } from "./active-device-features"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"

export type ViewConfigSelectorProps = { viewKey: string }

const selectView = createSelector(
  selectActiveDeviceFeatures,
  (state: ReduxRootState, keys: ViewConfigSelectorProps) => keys,
  (features, { viewKey }) => {
    return features?.[viewKey as keyof typeof features]
  }
)

export const selectViewConfig = createSelector(
  selectView,
  (config) => config?.config
)

export const selectViewData = createSelector(
  selectView,
  (config) => config?.data
)
