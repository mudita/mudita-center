import { defineMessages } from "react-intl"

import { URL_MAIN } from "./urls"

const messages = defineMessages({
  news: { id: "view.name.news" },
  overview: { id: "view.name.overview" },
  messages: { id: "view.name.messages" },
  phone: { id: "view.name.phone" },
  music: { id: "view.name.music" },
  calendar: { id: "view.name.calendar" },
  tools: { id: "view.name.tools" },
  meditation: { id: "view.name.meditation" },
  filesManager: { id: "view.name.filesManager" },
  tethering: { id: "view.name.tethering" },
  settings: { id: "view.name.settings" },
  help: { id: "view.name.help" },
})

export enum View {
  News = "news",
  Overview = "overview",
  Messages = "messages",
  Phone = "phone",
  Music = "music",
  Calendar = "calendar",
  Tools = "tools",
  Meditation = "meditation",
  FilesManager = "filesManager",
  Tethering = "tethering",
  Settings = "settings",
  Help = "help",
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
}
