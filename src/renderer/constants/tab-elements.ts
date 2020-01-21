import { defineMessages } from "react-intl"
import { URL_MAIN, URL_TABS } from "Renderer/constants/urls"
import { Image as ImageInterface } from "Renderer/interfaces/image.interface"
import TabMessage from "Renderer/svg/menu_messages.svg"
import TabTemplates from "Renderer/svg/menu_overview.svg"
import FunctionComponent from "Renderer/types/function-component.interface"

const messages = defineMessages({
  conversations: { id: "view.name.messages.conversations" },
  templates: { id: "view.name.messages.templates" },
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
        url: URL_TABS.conversations,
        icon: TabMessage,
      },
      {
        label: messages.templates,
        url: URL_TABS.templates,
        icon: TabTemplates,
      },
    ],
  },
]
