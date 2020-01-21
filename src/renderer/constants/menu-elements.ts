import { defineMessages } from "react-intl"
import { View, views } from "Renderer/constants/views"

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
  { button: views.overview, icon: MenuOverview },
  { button: views.messages, icon: MenuMessages },
  { button: views.phone, icon: MenuPhone },
  { button: views.music, icon: MenuMusic },
  { button: views.calendar, icon: MenuCalendar },
  { button: views.tools, icon: MenuTools },
  { button: views.meditation, icon: MenuMeditation },
  { button: views.filesManager, icon: MenuFilesManager },
]

const DESKTOP_APP_BUTTONS = [
  { button: views.tethering, icon: MenuTethering },
  { button: views.settings, icon: MenuSettings },
  { button: views.help, icon: MenuHelp },
]

interface Item {
  button: typeof views[View]
  icon: FunctionComponent<ImageInterface>
}

export interface MenuElement {
  items?: Item[]
  label?: {
    id: string
  }
  icons?: Array<FunctionComponent<ImageInterface>>
}

export const menuElements: MenuElement[] = [
  {
    items: [{ button: views[View.News], icon: MenuNews }],
  },
  {
    label: messages.yourPure,
    items: YOUR_PURE_BUTTONS,
    icons: [Signal, Battery, Sim, MenuTethering],
  },
  {
    label: messages.desktopApp,
    items: DESKTOP_APP_BUTTONS,
  },
]
