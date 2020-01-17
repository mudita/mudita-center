import { defineMessages } from "react-intl"
import { View, VIEWS } from "Renderer/constants/views"

import MenuCalendar from "Renderer/svg/menu_calendar.svg"
import MenuFilesManager from "Renderer/svg/menu_filesManager.svg"
import MenuHelp from "Renderer/svg/menu_help.svg"
import MenuMeditation from "Renderer/svg/menu_meditation.svg"
import MenuMessages from "Renderer/svg/menu_messages.svg"
import MenuMusic from "Renderer/svg/menu_music.svg"
import MenuNews from "Renderer/svg/menu_news.svg"
import MenuOverview from "Renderer/svg/menu_overview.svg"
import MenuPhone from "Renderer/svg/menu_phone.svg"
import MenuSettings from "Renderer/svg/menu_settings.svg"
import MenuTethering from "Renderer/svg/menu_tethering.svg"
import MenuTools from "Renderer/svg/menu_tools.svg"

import { Image as ImageInterface } from "Renderer/interfaces/image.interface"
import Battery from "Renderer/svg/battery.svg"
import Signal from "Renderer/svg/signal.svg"
import Sim from "Renderer/svg/sim.svg"
import FunctionComponent from "Renderer/types/function-component.interface"

const messages = defineMessages({
  yourPure: { id: "menu.header.yourPure" },
  desktopApp: { id: "menu.header.desktopApp" },
})

const YOUR_PURE_BUTTONS = [
  { button: VIEWS.overview, icon: MenuOverview },
  { button: VIEWS.messages, icon: MenuMessages },
  { button: VIEWS.phone, icon: MenuPhone },
  { button: VIEWS.music, icon: MenuMusic },
  { button: VIEWS.calendar, icon: MenuCalendar },
  { button: VIEWS.tools, icon: MenuTools },
  { button: VIEWS.meditation, icon: MenuMeditation },
  { button: VIEWS.filesManager, icon: MenuFilesManager },
]

const DESKTOP_APP_BUTTONS = [
  { button: VIEWS.tethering, icon: MenuTethering },
  { button: VIEWS.settings, icon: MenuSettings },
  { button: VIEWS.help, icon: MenuHelp },
]

interface Item {
  button: typeof VIEWS[View]
  icon: FunctionComponent<ImageInterface>
}

export interface MenuElement {
  items?: Item[]
  label?: {
    id: string
  }
  icons?: Array<FunctionComponent<ImageInterface>>
}

export const MENU_ELEMENTS: MenuElement[] = [
  {
    items: [{ button: VIEWS[View.News], icon: MenuNews }],
  },
  {
    label: messages.yourPure,
    icons: [Signal, Battery, Sim, MenuTethering],
  },
  {
    items: YOUR_PURE_BUTTONS,
  },
  {
    label: messages.desktopApp,
  },
  {
    items: DESKTOP_APP_BUTTONS,
  },
]
