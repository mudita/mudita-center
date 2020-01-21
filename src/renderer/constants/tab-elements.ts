import { defineMessages } from "react-intl"
import { URL_MAIN, URL_TABS } from "Renderer/constants/urls"
import { Image as ImageInterface } from "Renderer/interfaces/image.interface"
import TabConnection from "Renderer/svg/connection.svg"
import TabContacts from "Renderer/svg/contacts.svg"
import TabDial from "Renderer/svg/dial.svg"
import TabMessage from "Renderer/svg/menu_messages.svg"
import TabAllSongs from "Renderer/svg/menu_music.svg"
import TabTemplates from "Renderer/svg/menu_overview.svg"
import TabNotes from "Renderer/svg/notes.svg"
import TabNotification from "Renderer/svg/notifications.svg"
import TabCalls from "Renderer/svg/phone.svg"
import TabVoiceRecorder from "Renderer/svg/voice-recorder.svg"
import FunctionComponent from "Renderer/types/function-component.interface"

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
})

interface Tab {
  label: {
    id: string
  }
  url: string
  icon: FunctionComponent<ImageInterface>
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
        icon: TabMessage,
      },
      {
        label: messages.templates,
        url: `${URL_MAIN.messages}${URL_TABS.templates}`,
        icon: TabTemplates,
      },
    ],
  },
  {
    parentUrl: URL_MAIN.phone,
    tabs: [
      {
        label: messages.contacts,
        url: `${URL_MAIN.phone}`,
        icon: TabContacts,
      },
      {
        label: messages.calls,
        url: `${URL_MAIN.phone}${URL_TABS.calls}`,
        icon: TabCalls,
      },
      {
        label: messages.dial,
        url: `${URL_MAIN.phone}${URL_TABS.dial}`,
        icon: TabDial,
      },
    ],
  },
  {
    parentUrl: URL_MAIN.music,
    tabs: [
      {
        label: messages.allSongs,
        url: `${URL_MAIN.music}`,
        icon: TabAllSongs,
      },
      {
        label: messages.playlist,
        url: `${URL_MAIN.music}${URL_TABS.playlist}`,
        icon: TabCalls,
      },
    ],
  },
  {
    parentUrl: URL_MAIN.tools,
    tabs: [
      {
        label: messages.notes,
        url: `${URL_MAIN.tools}`,
        icon: TabNotes,
      },
      {
        label: messages.voiceRecorder,
        url: `${URL_MAIN.tools}${URL_TABS.voiceRecorder}`,
        icon: TabVoiceRecorder,
      },
    ],
  },
  {
    parentUrl: URL_MAIN.settings,
    tabs: [
      {
        label: messages.connection,
        url: `${URL_MAIN.settings}`,
        icon: TabConnection,
      },
      {
        label: messages.notifications,
        url: `${URL_MAIN.settings}${URL_TABS.notifications}`,
        icon: TabNotification,
      },
      {
        label: messages.audioConversion,
        url: `${URL_MAIN.settings}${URL_TABS.audioConversion}`,
        icon: TabAllSongs,
      },
    ],
  },
]
