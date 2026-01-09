/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { DeviceId } from "Core/device/constants/device-id"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"
import { getMenuConfigRequest } from "device/feature"
import { MenuConfig } from "device/models"
import { ActionName } from "./action-names"

export const getMenuConfig = createAsyncThunk<
  { deviceId: string; menuConfig: MenuConfig },
  { deviceId: DeviceId },
  { state: ReduxRootState }
>(ActionName.GetMenuConfig, async ({ deviceId }, { rejectWithValue }) => {
  const response = await getMenuConfigRequest(deviceId)
  if (response.ok) {
    const menuConfig = response.data

    menuConfig.menuItems = menuConfig.menuItems.map((item) => {
      if (
        item.feature === "mc-contacts" &&
        item.submenu?.some(
          (subitem) => subitem.feature === "mc-contacts-duplicates"
        )
      ) {
        const submenuWithoutDuplicates = item.submenu.filter(
          (subitem) => subitem.feature !== "mc-contacts-duplicates"
        )
        return {
          ...item,
          ...(submenuWithoutDuplicates.length > 1
            ? {
                submenu: submenuWithoutDuplicates,
              }
            : {
                submenu: undefined,
              }),
        }
      }
      return item
    })

    return { deviceId, menuConfig }
  }
  return rejectWithValue(response.error)
})
