/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAction } from "@reduxjs/toolkit"
import { MenuGroup, MenuItem } from "app-routing/models"

export const registerMenuGroups = createAction<MenuGroup[]>(
  "app-menu/registerMenuGroups"
)

export const registerMenuItems = createAction<{
  groupIndex: number
  items: MenuItem[]
}>("app-menu/registerMenuItems")

export const unregisterMenuGroups = createAction<MenuGroup["index"][]>(
  "app-menu/unregisterMenuGroups"
)

// export const unref = createAction<>("devices/setCurrentDevice")
