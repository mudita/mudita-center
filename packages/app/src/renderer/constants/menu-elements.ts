/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { DeviceType } from "@mudita/pure"
import { defineMessages } from "react-intl"
import { View, views } from "Renderer/constants/views"
import { Type } from "Renderer/components/core/icon/icon.config"
import { MenuGroupTestIds } from "Renderer/components/rest/menu/menu-group-test-ids.enum"
import { flags, Feature } from "App/feature-flags"

const messages = defineMessages({
  yourPure: { id: "component.menuHeaderYourPure" },
  yourHarmony: { id: "component.menuHeaderYourHarmony" },
  desktopApp: { id: "component.menuHeaderDesktopApp" },
})

const YOUR_PURE_BUTTONS = [
  {
    button: views.overview,
    icon: Type.MenuOverview,
    testId: MenuGroupTestIds.Overview,
    visibleOn: [DeviceType.MuditaPure, DeviceType.MuditaHarmony],
  },
  {
    button: views.messages,
    icon: Type.Message,
    testId: MenuGroupTestIds.Messages,
    hidden: flags.get(Feature.MessagesHidden),
    visibleOn: [DeviceType.MuditaPure],
  },
  {
    button: views.phone,
    icon: Type.MenuPhone,
    testId: MenuGroupTestIds.Phone,
    hidden: flags.get(Feature.ProductionAndAlpha),
    visibleOn: [DeviceType.MuditaPure],
  },
  {
    button: views.contacts,
    icon: Type.MenuContacts,
    testId: MenuGroupTestIds.Contacts,
    visibleOn: [DeviceType.MuditaPure],
  },
  {
    button: views.tools,
    icon: Type.MenuTools,
    testId: MenuGroupTestIds.Tools,
    hidden: flags.get(Feature.ProductionAndAlpha),
    visibleOn: [DeviceType.MuditaPure],
  },
  {
    button: views.music,
    icon: Type.MenuMusic,
    testId: MenuGroupTestIds.Music,
    hidden: flags.get(Feature.ProductionAndAlpha),
    visibleOn: [DeviceType.MuditaPure],
  },
  {
    button: views.calendar,
    icon: Type.Calendar,
    testId: MenuGroupTestIds.Calendar,
    hidden: flags.get(Feature.ProductionAndAlpha),
    visibleOn: [DeviceType.MuditaPure],
  },
  {
    button: views.meditation,
    icon: Type.MenuMeditation,
    testId: MenuGroupTestIds.Meditation,
    hidden: flags.get(Feature.ProductionAndAlpha),
    visibleOn: [DeviceType.MuditaPure],
  },
  {
    button: views.filesManager,
    icon: Type.MenuFilesManager,
    testId: MenuGroupTestIds.FilesManager,
    hidden: flags.get(Feature.DisabledOnProduction),
    visibleOn: [DeviceType.MuditaPure],
  },
  {
    button: views.recoveryMode,
    icon: Type.MuditaLogo,
    testId: MenuGroupTestIds.Backup,
    hidden: flags.get(Feature.ProductionAndAlpha),
    visibleOn: [DeviceType.MuditaPure],
  },
]

const DESKTOP_APP_BUTTONS: Item[] = [
  {
    button: views.tethering,
    icon: Type.MenuTethering,
    testId: MenuGroupTestIds.Tethering,
    hidden: flags.get(Feature.ProductionAndAlpha),
    visibleOn: [DeviceType.MuditaPure, DeviceType.MuditaHarmony],
  },
  {
    button: views.settings,
    icon: Type.MenuSettings,
    visibleOn: [DeviceType.MuditaPure, DeviceType.MuditaHarmony],
  },
  {
    button: views.help,
    icon: Type.MenuHelp,
    testId: MenuGroupTestIds.Help,
    visibleOn: [DeviceType.MuditaPure, DeviceType.MuditaHarmony],
  },
]

interface Item {
  button: typeof views[View]
  icon: Type
  testId?: MenuGroupTestIds
  hidden?: boolean
  visibleOn: DeviceType[]
}

export interface MenuElement {
  items?: Item[]
  label?: {
    id: string
  }
  icons?: Type[]
  connectedPhoneOnly?: boolean
  devModeOnly?: boolean
  simulatePhoneConnection?: boolean
  openHelpWindow?: () => void
  visibleOn?: DeviceType[]
}

export const menuElements: MenuElement[] = [
  {
    items: [
      {
        button: views[View.Connecting],
        icon: Type.Send,
        testId: MenuGroupTestIds.Connecting,
        visibleOn: [DeviceType.MuditaPure, DeviceType.MuditaHarmony],
      },
    ],
    simulatePhoneConnection: true,
  },
  {
    items: [
      {
        button: views[View.Onboarding],
        icon: Type.Send,
        visibleOn: [DeviceType.MuditaPure, DeviceType.MuditaHarmony],
      },
    ],
    devModeOnly: true,
  },
  {
    items: [
      {
        button: views[View.News],
        icon: Type.MenuNews,
        visibleOn: [DeviceType.MuditaPure, DeviceType.MuditaHarmony],
      },
    ],
  },
  {
    label: messages.yourPure,
    items: YOUR_PURE_BUTTONS,
    icons: flags.get(Feature.ProductionAndAlpha)
      ? []
      : [Type.MenuRange, Type.MenuBattery, Type.Sim, Type.TetheringStatus],
    connectedPhoneOnly: true,
    visibleOn: [DeviceType.MuditaPure],
  },
  {
    label: messages.yourHarmony,
    items: YOUR_PURE_BUTTONS,
    icons: [],
    connectedPhoneOnly: true,
    visibleOn: [DeviceType.MuditaHarmony],
  },
  {
    label: messages.desktopApp,
    items: DESKTOP_APP_BUTTONS,
  },
]
