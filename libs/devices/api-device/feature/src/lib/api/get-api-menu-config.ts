/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ApiDeviceSerialPort } from "devices/api-device/adapters"
import {
  ApiConfig,
  ApiDevice,
  ApiDevicePaths,
  ApiDeviceResponseBody,
} from "devices/api-device/models"
import { MenuGroup, MenuIndex } from "app-routing/models"
import semver from "semver/preload"

export const getApiMenuConfig = async (
  device: ApiDevice,
  config?: ApiConfig
) => {
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
    body: response.ok ? mapMenuConfig(response.body, config?.apiVersion) : null,
  }
}

const mapMenuConfig = (
  menu: ApiDeviceResponseBody<"MENU_CONFIGURATION", "GET">,
  apiVersion = "1.0.0"
): MenuGroup => {
  return {
    index: MenuIndex.Device,
    title: menu.title,
    items: menu.menuItems
      .filter((item) => {
        return item.feature !== "mc-data-migration"
      })
      .map((item) => {
        const submenu = item.submenu
          ?.filter((submenu) => {
            if (
              item.feature === "mc-contacts" &&
              submenu.feature === "mc-contacts-duplicates"
            ) {
              return showsContactsDuplicatesManager(apiVersion)
            }
            return true
          })
          .map((submenu) => ({
            title: submenu.displayName,
            path: `${ApiDevicePaths.Index}/${item.feature}/${submenu.feature}`,
          }))

        if (submenu && submenu.length === 1) {
          return {
            title: item.displayName,
            icon: item.icon,
            path: submenu[0].path,
          }
        }

        return {
          title: item.displayName,
          icon: item.icon,
          path: `${ApiDevicePaths.Index}/${item.feature}`,
          items: submenu,
        }
      }),
  }
}

const showsContactsDuplicatesManager = (apiVersion?: string) => {
  if (!apiVersion) {
    return false
  }
  const minVersion = "1.0.1"
  return semver.gte(apiVersion, minVersion)
}
