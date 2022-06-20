/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { defineMessages } from "react-intl"
import { URL_MAIN, URL_TABS } from "App/__deprecated__/renderer/constants/urls"
import { flags } from "App/feature-flags/helpers/feature-flag.helpers"
import { Feature } from "App/feature-flags/constants/feature.enum"
import { IconType } from "App/__deprecated__/renderer/components/core/icon/icon-type"

const messages = defineMessages({
  conversations: { id: "module.messages.conversations" },
  templates: { id: "module.templates" },
  contacts: { id: "module.contacts" },
  calls: { id: "module.phone.calls" },
  dial: { id: "module.dial" },
  allSongs: { id: "module.music.allSongs" },
  playlist: { id: "module.playlist" },
  notes: { id: "module.tools.notes" },
  voiceRecorder: { id: "module.tools.voiceRecorder" },
  connection: { id: "module.settings.connection" },
  notifications: { id: "module.settings.notifications" },
  audioConversion: { id: "module.settings.audioConversion" },
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
        hidden: !flags.get(Feature.MessagesTemplatesTabEnabled),
      },
      {
        label: messages.templates,
        url: `${URL_MAIN.messages}${URL_TABS.templates}`,
        icon: IconType.Templates,
        hidden: !flags.get(Feature.MessagesTemplatesTabEnabled),
      },
    ],
  },
  {
    parentUrl: URL_MAIN.phone,
    tabs: [
      {
        label: messages.calls,
        url: URL_MAIN.phone,
        icon: IconType.Calls,
      },
      {
        label: messages.dial,
        url: `${URL_MAIN.phone}${URL_TABS.dial}`,
        icon: IconType.Dial,
        hidden: !flags.get(Feature.PhoneDialTabEnabled),
      },
    ],
  },
  {
    parentUrl: URL_MAIN.music,
    tabs: [
      {
        label: messages.allSongs,
        url: URL_MAIN.music,
        icon: IconType.MenuMusic,
      },
      {
        label: messages.playlist,
        url: `${URL_MAIN.music}${URL_TABS.playlist}`,
        icon: IconType.Playlist,
      },
    ],
  },
  {
    parentUrl: URL_MAIN.tools,
    tabs: [
      {
        label: messages.notes,
        url: URL_MAIN.tools,
        icon: IconType.Notes,
      },
      {
        label: messages.voiceRecorder,
        url: `${URL_MAIN.tools}${URL_TABS.voiceRecorder}`,
        icon: IconType.VoiceRecorder,
      },
    ],
  },
  {
    parentUrl: URL_MAIN.settings,
    tabs: [
      {
        label: messages.connection,
        url: URL_MAIN.settings,
        icon: IconType.Connection,
      },
      {
        label: messages.notifications,
        url: `${URL_MAIN.settings}${URL_TABS.notifications}`,
        icon: IconType.Notifications,
        hidden: !flags.get(Feature.SettingsNotificationTabEnabled),
      },
      {
        label: messages.audioConversion,
        url: `${URL_MAIN.settings}${URL_TABS.audioConversion}`,
        icon: IconType.MenuMusic,
        hidden: !flags.get(Feature.SettingsAudioConversionTabEnabled),
      },
      {
        label: messages.backup,
        url: `${URL_MAIN.settings}${URL_TABS.backup}`,
        icon: IconType.BackupFolder,
      },
      {
        label: messages.about,
        url: `${URL_MAIN.settings}${URL_TABS.about}`,
        icon: IconType.MuditaLogo,
      },
    ],
  },
]
