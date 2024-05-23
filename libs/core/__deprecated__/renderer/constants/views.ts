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
  calendar: { id: "module.calendar" },
  filesManager: { id: "module.filesManager" },
  manageSounds: { id: "module.manageSounds" },
  settings: { id: "module.settings" },
  help: { id: "module.help" },
  error: { id: "module.error" },
  pureSystem: { id: "module.overview.pureSystem" },
  dataMigration: { id: "module.dataMigration.title" },
})

export enum View {
  Onboarding = "onboarding",
  News = "news",
  Overview = "overview",
  Messages = "messages",
  Contacts = "contacts",
  FilesManager = "filesManager",
  ManageSounds = "manageSounds",
  Settings = "settings",
  Help = "help",
  Error = "error",
  PureSystem = "pure-system",
  DataMigration = "dataMigration",
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
  [View.Contacts]: {
    label: messages.contacts,
    url: URL_MAIN.contacts,
  },
  [View.FilesManager]: {
    label: messages.filesManager,
    url: URL_MAIN.filesManager,
  },
  [View.ManageSounds]: {
    label: messages.manageSounds,
    url: URL_MAIN.manageSounds,
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
  [View.DataMigration]: {
    label: messages.dataMigration,
    url: URL_MAIN.dataMigration,
  },
}
