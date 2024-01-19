/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAction } from "@reduxjs/toolkit"
import { MenuElement } from "Core/__deprecated__/renderer/constants/menu-elements"
import { View } from "generic-view/utils"
import { ActionName } from "./action-names"

export const setMenu = createAction<MenuElement[]>(ActionName.SetMenu)
export const setViewLayout = createAction<{
  feature: string
  layout: View
}>(ActionName.SetViewLayout)
export const setViewData = createAction<{
  feature: string
  data: Record<string, unknown>
}>(ActionName.SetViewData)
