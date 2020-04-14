import { defineMessages } from "react-intl"
import { URL_MAIN, URL_TABS } from "Renderer/constants/urls"
import { Type } from "Renderer/components/core/icon/icon.config"

const messages = defineMessages({
  conversations: { id: "view.name.messages.conversations" },
  templates: { id: "view.name.messages.templates" },
  contacts: { id: "view.name.phone.contacts" },
  calls: { id: "view.name.phone.calls" },
  dial: { id: "view.name.phone.dial" },
  allSongs: { id: "view.name.music.allSongs" },
  playlist: { id: "view.name.music.playlist" },
  notes: { id: "view.name.tools.notes" },
  voiceRecorder: { id: "view.name.tools.voiceRecorder" },
  connection: { id: "view.name.settings.connection" },
  notifications: { id: "view.name.settings.notifications" },
  audioConversion: { id: "view.name.settings.audioConversion" },
  backup: { id: "view.name.settings.backup" },
})

interface Tab {
  label: {
    id: string
  }
  url: string
  icon: Type
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
        url: `${URL_MAIN.messages}`,
        icon: Type.Message,
      },
      {
        label: messages.templates,
        url: `${URL_MAIN.messages}${URL_TABS.templates}`,
        icon: Type.MenuOverview,
      },
    ],
  },
  {
    parentUrl: URL_MAIN.phone,
    tabs: [
      {
        label: messages.contacts,
        url: `${URL_MAIN.phone}`,
        icon: Type.Contacts,
      },
      {
        label: messages.calls,
        url: `${URL_MAIN.phone}${URL_TABS.calls}`,
        icon: Type.Calls,
      },
      {
        label: messages.dial,
        url: `${URL_MAIN.phone}${URL_TABS.dial}`,
        icon: Type.Dial,
      },
    ],
  },
  {
    parentUrl: URL_MAIN.music,
    tabs: [
      {
        label: messages.allSongs,
        url: `${URL_MAIN.music}`,
        icon: Type.MenuMusic,
      },
      {
        label: messages.playlist,
        url: `${URL_MAIN.music}${URL_TABS.playlist}`,
        icon: Type.Playlist,
      },
    ],
  },
  {
    parentUrl: URL_MAIN.tools,
    tabs: [
      {
        label: messages.notes,
        url: `${URL_MAIN.tools}`,
        icon: Type.Notes,
      },
      {
        label: messages.voiceRecorder,
        url: `${URL_MAIN.tools}${URL_TABS.voiceRecorder}`,
        icon: Type.VoiceRecorder,
      },
    ],
  },
  {
    parentUrl: URL_MAIN.settings,
    tabs: [
      {
        label: messages.connection,
        url: `${URL_MAIN.settings}`,
        icon: Type.Connection,
      },
      {
        label: messages.notifications,
        url: `${URL_MAIN.settings}${URL_TABS.notifications}`,
        icon: Type.Notification,
      },
      {
        label: messages.audioConversion,
        url: `${URL_MAIN.settings}${URL_TABS.audioConversion}`,
        icon: Type.MenuMusic,
      },
      {
        label: messages.backup,
        url: `${URL_MAIN.settings}${URL_TABS.backup}`,
        icon: Type.BackupFolder,
      },
    ],
  },
]
