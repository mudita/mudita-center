/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { MenuGroup, MenuIndex } from "app-routing/models"
import { defineMessages, formatMessage } from "app-localize/utils"
import { HarmonyPaths } from "devices/harmony/models"
import { IconType } from "app-theme/models"

const messages = defineMessages({
  title: {
    id: "menu.app.deviceTitle",
  },
  harmony: {
    id: "general.devices.harmony.name",
  },
  overview: {
    id: "harmony.menu.overview",
  },
  files: {
    id: "harmony.menu.files",
  },
})

export const getHarmonyMenu = (): MenuGroup => {
  return {
    index: MenuIndex.Device,
    title: formatMessage(messages.title, {
      deviceName: formatMessage(messages.harmony),
    }),
    items: [
      {
        title: formatMessage(messages.overview),
        path: HarmonyPaths.Overview,
        icon: IconType.Overview,
      },
      {
        title: formatMessage(messages.files),
        path: HarmonyPaths.Sounds,
        icon: IconType.FileManager,
      },
    ],
  }
}
