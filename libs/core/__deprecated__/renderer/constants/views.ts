/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { defineMessages } from "react-intl"

import { URL_MAIN, URL_ONBOARDING, URL_OVERVIEW } from "./urls"

const messages = defineMessages({
  onboarding: { id: "module.onboarding" },
  connecting: { id: "module.connecting" },
  recoveryMode: { id: "module.recoveryMode" },
  contacts: { id: "module.contacts" },
  news: { id: "module.news" },
  overview: { id: "module.overview" },
  messages: { id: "module.messages" },
  phone: { id: "module.phone" },
  calendar: { id: "module.calendar" },
  tools: { id: "module.tools" },
  filesManager: { id: "module.filesManager" },
  settings: { id: "module.settings" },
  help: { id: "module.help" },
  error: { id: "module.error" },
  pureSystem: { id: "module.overview.pureSystem" },
})

export enum View {
  Onboarding = "onboarding",
  Connecting = "connecting",
  News = "news",
  Overview = "overview",
  Messages = "messages",
  Phone = "phone",
  Contacts = "contacts",
  Tools = "tools",
  FilesManager = "filesManager",
  Settings = "settings",
  Help = "help",
  Error = "error",
  PureSystem = "pure-system",
}

export type Views = {
  [key in View]: {
    label:
      | {
          id: string
        }
      | string
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
  [View.News]: {
    label: messages.news,
    url: URL_MAIN.news,
    renderHeaderButton: true,
  },
  [View.Overview]: {
    label: messages.overview,
    url: URL_OVERVIEW.root,
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
  [View.Tools]: {
    label: messages.tools,
    url: URL_MAIN.tools,
  },
  [View.FilesManager]: {
    label: messages.filesManager,
    url: URL_MAIN.filesManager,
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
  [View.PureSystem]: {
    label: messages.pureSystem,
    url: URL_OVERVIEW.pureSystem,
  },
}
