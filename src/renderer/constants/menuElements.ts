import { defineMessages } from "react-intl"
import { VIEWS } from "Renderer/constants/views"

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

import Battery from "Renderer/svg/battery.svg"
import Signal from "Renderer/svg/signal.svg"
import Sim from "Renderer/svg/sim.svg"

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

export const MENU_ELEMENTS = [
  {
    type: "buttons",
    buttons: [{ button: VIEWS.news, icon: MenuNews }],
  },
  {
    type: "header",
    label: messages.yourPure,
    icons: [Signal, Battery, Sim, MenuTethering],
  },
  {
    type: "buttons",
    buttons: YOUR_PURE_BUTTONS,
  },
  {
    type: "header",
    label: messages.desktopApp,
  },
  {
    type: "buttons",
    buttons: DESKTOP_APP_BUTTONS,
  },
]
