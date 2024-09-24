/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createSelector } from "reselect"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"
import {
  selectViewConfig,
  selectViewData,
  ViewConfigSelectorProps,
} from "./view"

type Keys = ViewConfigSelectorProps & { componentKey: string }

const selectComponent = createSelector(
  selectViewConfig,
  (state: ReduxRootState, keys: Keys) => keys,
  (view, { componentKey }) => {
    return view?.[componentKey as keyof typeof view]
  }
)

export const selectComponentConfig = createSelector(
  selectComponent,
  (config) => config?.config
)

export const selectComponentDataProvider = createSelector(
  selectComponent,
  (config) => config?.dataProvider
)

export const selectComponentLayout = createSelector(
  selectComponent,
  (config) => config?.layout
)

export const selectComponentChildrenKeys = createSelector(
  selectComponent,
  (config) => config?.childrenKeys
)

export const selectComponentName = createSelector(
  selectComponent,
  (config) => config?.component
)

export const selectComponentData = createSelector(
  selectViewData,
  (state: ReduxRootState, keys: Keys) => keys,
  (data, { componentKey }) => {
    return data?.[componentKey as keyof typeof data]
  }
)
