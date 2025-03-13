/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createSelector } from "@reduxjs/toolkit"
import { AppState } from "app-store/models"
import { MenuGroup } from "app-routing/models"

export const selectMenuGroups = createSelector(
  (state: AppState) => state.appMenu,
  ({ groups }) => {
    return groups as MenuGroup[]
  }
)

export const checkMenuGroup = createSelector(
  selectMenuGroups,
  (_: AppState, groupIndex: number) => groupIndex,
  (groups, groupIndex) => {
    return groups.some((group) => group.index === groupIndex)
  }
)
