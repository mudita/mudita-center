/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { defineMessages } from "react-intl"
import { URL_MAIN, URL_TABS } from "Core/__deprecated__/renderer/constants/urls"
import { IconType } from "Core/__deprecated__/renderer/components/core/icon/icon-type"

const messages = defineMessages({
  conversations: { id: "module.messages.conversations" },
  templates: { id: "module.templates" },
  contacts: { id: "module.contacts" },
  connection: { id: "module.settings.connection" },
  backup: { id: "module.settings.backup" },
  about: { id: "module.settings.about" },
})

interface Tab {
  label: {
    id: string
  }
  url: string
  icon: IconType
  hidden?: boolean
}

export interface TabElement {
  parentUrl: string
  tabs: Tab[]
}

export const tabElements: TabElement[] = [
  {
    parentUrl: URL_MAIN.messages,
    tabs: [
      {
        label: messages.conversations,
        url: URL_MAIN.messages,
        icon: IconType.Message,
      },
      {
        label: messages.templates,
        url: `${URL_MAIN.messages}${URL_TABS.templates}`,
        icon: IconType.Templates,
      },
    ],
  },
  {
    parentUrl: URL_MAIN.settings,
    tabs: [
      {
        label: messages.backup,
        url: URL_MAIN.settings,
        icon: IconType.BackupFolder
      },
      {
        label: messages.about,
        url: `${URL_MAIN.settings}${URL_TABS.about}`,
        icon: IconType.MuditaLogo,
      },
    ],
  },
]
