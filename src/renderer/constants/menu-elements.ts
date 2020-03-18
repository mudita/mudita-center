import { defineMessages } from "react-intl"
import { View, views } from "Renderer/constants/views"
import { Type } from "Renderer/components/core/icon/icon.config"
import MenuNews from "Renderer/svg/menu_news.svg"

const messages = defineMessages({
  yourPure: { id: "menu.header.yourPure" },
  desktopApp: { id: "menu.header.desktopApp" },
})

const YOUR_PURE_BUTTONS = [
  { button: views.overview, icon: Type.MenuOverview },
  { button: views.messages, icon: Type.Message },
  { button: views.phone, icon: Type.MenuPhone },
  { button: views.music, icon: Type.MenuMusic },
  { button: views.calendar, icon: Type.Calendar },
  { button: views.tools, icon: Type.MenuTools },
  { button: views.meditation, icon: Type.MenuMeditation },
  { button: views.filesManager, icon: Type.MenuFilesManager },
]

const DESKTOP_APP_BUTTONS = [
  { button: views.tethering, icon: Type.MenuTethering },
  { button: views.settings, icon: Type.MenuSettings },
  { button: views.help, icon: Type.MenuHelp },
]

interface Item {
  button: typeof views[View]
  icon: Type
}

export interface MenuElement {
  items?: Item[]
  label?: {
    id: string
  }
  icons?: Type[]
  visibleWithPhone?: boolean
}

export const menuElements: MenuElement[] = [
  {
    items: [{ button: views[View.News], icon: MenuNews }],
    visibleWithPhone: true,
  },
  {
    label: messages.yourPure,
    items: YOUR_PURE_BUTTONS,
    icons: [Type.MediumRange, Type.Battery, Type.Sim, Type.MenuTethering],
    visibleWithPhone: false,
  },
  {
    label: messages.desktopApp,
    items: DESKTOP_APP_BUTTONS,
    visibleWithPhone: true,
  },
]
