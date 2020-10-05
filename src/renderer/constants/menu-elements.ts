import { defineMessages } from "react-intl"
import { View, views } from "Renderer/constants/views"
import { Type } from "Renderer/components/core/icon/icon.config"
import { MenuGroupTestIds } from "Renderer/components/rest/menu/menu-group-test-ids.enum"

const messages = defineMessages({
  yourPure: { id: "menu.header.yourPure" },
  desktopApp: { id: "menu.header.desktopApp" },
})

const YOUR_PURE_BUTTONS = [
  { button: views.overview, icon: Type.MenuOverview },
  {
    button: views.messages,
    icon: Type.Message,
    testId: MenuGroupTestIds.Messages,
  },
  { button: views.phone, icon: Type.MenuPhone, testId: MenuGroupTestIds.Phone },
  {
    button: views.contacts,
    icon: Type.MenuContacts,
    testId: MenuGroupTestIds.Contacts,
  },
  { button: views.music, icon: Type.MenuMusic },
  { button: views.calendar, icon: Type.Calendar },
  { button: views.tools, icon: Type.MenuTools },
  { button: views.meditation, icon: Type.MenuMeditation },
  { button: views.filesManager, icon: Type.MenuFilesManager },
]

const DESKTOP_APP_BUTTONS = [
  { button: views.tethering, icon: Type.MenuTethering },
  { button: views.settings, icon: Type.MenuSettings },
  { button: views.help, icon: Type.MenuHelp, testId: MenuGroupTestIds.Help },
]

interface Item {
  button: typeof views[View]
  icon: Type
  testId?: MenuGroupTestIds
}

export interface MenuElement {
  items?: Item[]
  label?: {
    id: string
  }
  icons?: Type[]
  connectedPhoneOnly?: boolean
  devModeOnly?: boolean
  openHelpWindow?: () => void
}

export const menuElements: MenuElement[] = [
  {
    items: [{ button: views[View.Onboarding], icon: Type.Send }],
    devModeOnly: true,
  },
  {
    items: [{ button: views[View.News], icon: Type.MenuNews }],
  },
  {
    label: messages.yourPure,
    items: YOUR_PURE_BUTTONS,
    icons: [Type.MenuRange, Type.MenuBattery, Type.Sim, Type.TetheringStatus],
    connectedPhoneOnly: true,
  },
  {
    label: messages.desktopApp,
    items: DESKTOP_APP_BUTTONS,
  },
]
