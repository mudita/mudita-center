/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { MenuGroup, MenuIndex } from "app-routing/models"
import { defineMessages, formatMessage } from "app-localize/utils"
import { IconType } from "app-theme/models"
import { HarmonyMscPaths } from "devices/harmony-msc/models"

const messages = defineMessages({
  title: {
    id: "menu.app.deviceTitle",
  },
  harmony: {
    id: "general.devices.harmony.name",
  },
  recoveryMode: {
    id: "harmonyMsc.menu.recoveryMode",
  },
})

export const getHarmonyMscMenu = (): MenuGroup => {
  return {
    index: MenuIndex.Device,
    title: formatMessage(messages.title, {
      deviceName: formatMessage(messages.harmony),
    }),
    items: [
      {
        title: formatMessage(messages.recoveryMode),
        path: HarmonyMscPaths.RecoveryMode,
        icon: IconType.RecoveryMode,
      },
    ],
  }
}
