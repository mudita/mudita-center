/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ApiDeviceSerialPort } from "devices/api-device/adapters"
import {
  ApiDevice,
  ApiDevicePaths,
  ApiDeviceResponseBody,
} from "devices/api-device/models"
import { MenuGroup, MenuIndex } from "app-routing/models"

export const getMenuConfig = async (device: ApiDevice) => {
  const response = await ApiDeviceSerialPort.request(device, {
    endpoint: "MENU_CONFIGURATION",
    method: "GET",
    body: {
      lang: "en-US",
    },
    options: {
      timeout: 1000,
    },
  })
  return {
    ...response,
    body: response.ok ? mapMenuConfig(response.body) : null,
  }
}

const mapMenuConfig = (
  menu: ApiDeviceResponseBody<"MENU_CONFIGURATION", "GET">
): MenuGroup => {
  return {
    index: MenuIndex.Device,
    title: menu.title,
    items: menu.menuItems.map((item) => {
      const submenu = item.submenu?.map((submenu) => ({
        title: submenu.displayName,
        path: `${ApiDevicePaths.Index}/${item.feature}/${submenu.feature}`,
      }))
      return {
        title: item.displayName,
        icon: item.icon,
        path: `${ApiDevicePaths.Index}/${item.feature}`,
        items: submenu,
      }
    }),
  }
}
