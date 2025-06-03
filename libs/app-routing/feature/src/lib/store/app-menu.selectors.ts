/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createSelector } from "@reduxjs/toolkit"
import { AppStore } from "app-store/models"
import { MenuGroup } from "app-routing/models"

export const selectMenuGroups = createSelector(
  (state: AppStore) => state.appMenu,
  ({ groups }) => {
    return groups as MenuGroup[]
  }
)

export const checkMenuGroup = createSelector(
  selectMenuGroups,
  (_: AppStore, groupIndex: number) => groupIndex,
  (groups, groupIndex) => {
    return groups.some((group) => group.index === groupIndex)
  }
)
