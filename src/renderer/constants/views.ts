import { defineMessages } from "react-intl"

import { URL_MAIN } from "./urls"

const messages = defineMessages({
  news: { id: "view.name.news" },
  overview: { id: "view.name.overview" },
  messages: { id: "view.name.messages" },
  phone: { id: "view.name.phone" },
  music: { id: "view.name.music" },
  tools: { id: "view.name.tools" },
  meditation: { id: "view.name.meditation" },
  filesManager: { id: "view.name.filesManager" },
  tethering: { id: "view.name.tethering" },
  settings: { id: "view.name.settings" },
  help: { id: "view.name.help" },
})

export const VIEWS = {
  news: {
    label: messages.news,
    url: URL_MAIN.news,
  },
  overview: {
    label: messages.overview,
    url: URL_MAIN.overview,
  },
  messages: {
    label: messages.messages,
    url: URL_MAIN.messages,
  },
  phone: {
    label: messages.phone,
    url: URL_MAIN.phone,
  },
  music: {
    label: messages.music,
    url: URL_MAIN.music,
  },
  tools: {
    label: messages.tools,
    url: URL_MAIN.tools,
  },
  meditation: {
    label: messages.meditation,
    url: URL_MAIN.meditation,
  },
  filesManager: {
    label: messages.filesManager,
    url: URL_MAIN.filesManager,
  },
  tethering: {
    label: messages.tethering,
    url: URL_MAIN.tethering,
  },
  settings: {
    label: messages.settings,
    url: URL_MAIN.settings,
  },
  help: {
    label: messages.help,
    url: URL_MAIN.help,
  },
}
