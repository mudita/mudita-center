/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { MenuGroup, MenuIndex } from "app-routing/models"
import { defineMessages, formatMessage } from "app-localize/utils"
import { IconType } from "app-theme/models"
import { PurePaths } from "devices/pure/models"

const messages = defineMessages({
  title: {
    id: "menu.app.deviceTitle",
  },
  pure: {
    id: "general.devices.pure.name",
  },
  overview: {
    id: "pure.menu.overview",
  },
  messages: {
    id: "pure.menu.messages",
  },
  contacts: {
    id: "pure.menu.contacts",
  },
  files: {
    id: "pure.menu.files",
  },
})

export const getPureMenu = (): MenuGroup => {
  return {
    index: MenuIndex.Device,
    title: formatMessage(messages.title, {
      deviceName: formatMessage(messages.pure),
    }),
    items: [
      {
        title: formatMessage(messages.overview),
        path: PurePaths.Overview,
        icon: IconType.Overview,
      },
      {
        title: formatMessage(messages.messages),
        path: PurePaths.Messages,
        icon: IconType.Messages,
      },
      {
        title: formatMessage(messages.contacts),
        path: PurePaths.Contacts,
        icon: IconType.ContactsBook,
      },
      {
        title: formatMessage(messages.files),
        path: PurePaths.Files,
        icon: IconType.FileManager,
      },
    ],
  }
}
