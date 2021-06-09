/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { defineMessages } from "react-intl"

import { URL_MAIN, URL_ONBOARDING, URL_RECOVERY_MODE } from "./urls"

const messages = defineMessages({
  onboarding: { id: "module.onboarding" },
  connecting: { id: "module.connecting" },
  recoveryMode: { id: "module.recoveryMode" },
  contacts: { id: "module.contacts" },
  news: { id: "module.news" },
  overview: { id: "module.overview" },
  messages: { id: "module.messages" },
  phone: { id: "module.phone" },
  music: { id: "module.music" },
  calendar: { id: "module.calendar" },
  tools: { id: "module.tools" },
  meditation: { id: "module.meditation" },
  filesManager: { id: "module.filesManager" },
  tethering: { id: "module.tethering" },
  settings: { id: "module.settings" },
  help: { id: "module.help" },
  error: { id: "module.error" },
})

export enum View {
  Onboarding = "onboarding",
  Connecting = "connecting",
  RecoveryMode = "recoveryMode",
  News = "news",
  Overview = "overview",
  Messages = "messages",
  Phone = "phone",
  Contacts = "contacts",
  Music = "music",
  Calendar = "calendar",
  Tools = "tools",
  Meditation = "meditation",
  FilesManager = "filesManager",
  Tethering = "tethering",
  Settings = "settings",
  Help = "help",
  Error = "error",
}

export type Views = {
  [key in View]: {
    label: {
      id: string
    }
    url: string
    renderHeaderButton?: boolean
  }
}

export const views: Views = {
  [View.Onboarding]: {
    label: messages.onboarding,
    url: URL_ONBOARDING.root,
  },
  [View.Connecting]: {
    label: messages.connecting,
    url: URL_ONBOARDING.connecting,
  },
  [View.RecoveryMode]: {
    label: messages.recoveryMode,
    url: URL_RECOVERY_MODE.root,
  },
  [View.News]: {
    label: messages.news,
    url: URL_MAIN.news,
    renderHeaderButton: true,
  },
  [View.Overview]: {
    label: messages.overview,
    url: URL_MAIN.overview,
  },
  [View.Messages]: {
    label: messages.messages,
    url: URL_MAIN.messages,
  },
  [View.Phone]: {
    label: messages.phone,
    url: URL_MAIN.phone,
  },
  [View.Contacts]: {
    label: messages.contacts,
    url: URL_MAIN.contacts,
  },
  [View.Music]: {
    label: messages.music,
    url: URL_MAIN.music,
  },
  [View.Calendar]: {
    label: messages.calendar,
    url: URL_MAIN.calendar,
  },
  [View.Tools]: {
    label: messages.tools,
    url: URL_MAIN.tools,
  },
  [View.Meditation]: {
    label: messages.meditation,
    url: URL_MAIN.meditation,
  },
  [View.FilesManager]: {
    label: messages.filesManager,
    url: URL_MAIN.filesManager,
  },
  [View.Tethering]: {
    label: messages.tethering,
    url: URL_MAIN.tethering,
  },
  [View.Settings]: {
    label: messages.settings,
    url: URL_MAIN.settings,
  },
  [View.Help]: {
    label: messages.help,
    url: URL_MAIN.help,
  },
  [View.Error]: {
    label: messages.error,
    url: URL_MAIN.error,
  },
}
