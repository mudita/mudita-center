import { defineMessages } from "react-intl"
import { URL_MAIN, URL_TABS } from "Renderer/constants/urls"
import { Image as ImageInterface } from "Renderer/interfaces/image.interface"
import TabContacts from "Renderer/svg/contacts.svg"
import TabDial from "Renderer/svg/dial.svg"
import TabMessage from "Renderer/svg/menu_messages.svg"
import TabAllSongs from "Renderer/svg/menu_music.svg"
import TabTemplates from "Renderer/svg/menu_overview.svg"
import TabCalls from "Renderer/svg/phone.svg"
import FunctionComponent from "Renderer/types/function-component.interface"

const messages = defineMessages({
  conversations: { id: "view.name.messages.conversations" },
  templates: { id: "view.name.messages.templates" },
  contacts: { id: "view.name.phone.contacts" },
  calls: { id: "view.name.phone.calls" },
  dial: { id: "view.name.phone.dial" },
  allSongs: { id: "view.name.music.allSongs" },
  playlist: { id: "view.name.music.playlist" },
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
]
