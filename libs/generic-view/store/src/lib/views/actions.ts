/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAction } from "@reduxjs/toolkit"
import { MenuElement } from "Core/__deprecated__/renderer/constants/menu-elements"
import { View } from "generic-view/utils"

export const setMenu = createAction<MenuElement[]>("generic-views/set-menu")
export const setViewLayout = createAction<{
  feature: string
  layout: View
}>("generic-views/set-view-layout")
export const setViewData = createAction<{
  feature: string
  data: Record<string, unknown>
}>("generic-views/set-view-data")
