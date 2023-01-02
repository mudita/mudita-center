/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { DeviceType } from "App/device/constants"
import { defineMessages } from "react-intl"
import { View, views } from "App/__deprecated__/renderer/constants/views"
import { MenuGroupTestIds } from "App/__deprecated__/renderer/components/rest/menu/menu-group-test-ids.enum"
import { flags, Feature } from "App/feature-flags"
import { IconType } from "App/__deprecated__/renderer/components/core/icon/icon-type"

const messages = defineMessages({
  yourPure: { id: "component.menuHeaderYourPure" },
  yourHarmony: { id: "component.menuHeaderYourHarmony" },
  desktopApp: { id: "component.menuHeaderDesktopApp" },
})

const YOUR_PURE_BUTTONS = [
  {
    button: views.overview,
    icon: IconType.MenuOverview,
    testId: MenuGroupTestIds.Overview,
    visibleOn: [DeviceType.MuditaPure, DeviceType.MuditaHarmony],
    viewKey: View.Overview,
  },
  {
    button: views.messages,
    icon: IconType.Message,
    testId: MenuGroupTestIds.Messages,
    visibleOn: [DeviceType.MuditaPure],
    viewKey: View.Messages,
  },
  {
    button: views.phone,
    icon: IconType.MenuPhone,
    testId: MenuGroupTestIds.Phone,
    hidden: !flags.get(Feature.PhoneTabEnabled),
    visibleOn: [DeviceType.MuditaPure],
    viewKey: View.Phone,
  },
  {
    button: views.contacts,
    icon: IconType.MenuContacts,
    testId: MenuGroupTestIds.Contacts,
    visibleOn: [DeviceType.MuditaPure],
    viewKey: View.Contacts,
  },
  {
    button: views.tools,
    icon: IconType.MenuTools,
    testId: MenuGroupTestIds.Tools,
    hidden: !flags.get(Feature.ToolsTabEnabled),
    visibleOn: [DeviceType.MuditaPure],
    viewKey: View.Tools,
  },
  {
    button: views.music,
    icon: IconType.MenuMusic,
    testId: MenuGroupTestIds.Music,
    hidden: !flags.get(Feature.MusicTabEnabled),
    visibleOn: [DeviceType.MuditaPure],
    viewKey: View.Music,
  },
  {
    button: views.calendar,
    icon: IconType.Calendar,
    testId: MenuGroupTestIds.Calendar,
    hidden: !flags.get(Feature.CalendarTabEnabled),
    visibleOn: [DeviceType.MuditaPure],
    viewKey: View.Calendar,
  },
  {
    button: views.meditation,
    icon: IconType.MenuMeditation,
    testId: MenuGroupTestIds.Meditation,
    hidden: !flags.get(Feature.MeditationTabEnabled),
    visibleOn: [DeviceType.MuditaPure],
    viewKey: View.Meditation,
  },
  {
    button: views.filesManager,
    icon: IconType.MenuFilesManager,
    testId: MenuGroupTestIds.FilesManager,
    visibleOn: [DeviceType.MuditaPure],
    viewKey: View.FilesManager,
  },
  {
    button: views.recoveryMode,
    icon: IconType.MuditaLogo,
    testId: MenuGroupTestIds.Backup,
    hidden: !flags.get(Feature.RecoveryModeTabEnabled),
    visibleOn: [DeviceType.MuditaPure],
    viewKey: View.RecoveryMode,
  },
]

const DESKTOP_APP_BUTTONS: Item[] = [
  {
    button: views.tethering,
    icon: IconType.MenuTethering,
    testId: MenuGroupTestIds.Tethering,
    hidden: !flags.get(Feature.TetheringEnabled),
    visibleOn: [DeviceType.MuditaPure, DeviceType.MuditaHarmony],
  },
  {
    button: views.settings,
    icon: IconType.MenuSettings,
    visibleOn: [DeviceType.MuditaPure, DeviceType.MuditaHarmony],
  },
  {
    button: views.help,
    icon: IconType.MenuHelp,
    testId: MenuGroupTestIds.Help,
    visibleOn: [DeviceType.MuditaPure, DeviceType.MuditaHarmony],
  },
]

interface Item {
  button: typeof views[View]
  icon: IconType
  testId?: MenuGroupTestIds
  hidden?: boolean
  visibleOn: DeviceType[]
  viewKey?: View
}

export interface MenuElement {
  items?: Item[]
  label?: {
    id: string
  }
  icons?: IconType[]
  connectedPhoneOnly?: boolean
  devModeOnly?: boolean
  simulatePhoneConnection?: boolean
  openHelpWindow?: () => void
  visibleOn?: DeviceType[]
  viewKey?: View
}

export const menuElements: MenuElement[] = [
  {
    items: [
      {
        button: views[View.Connecting],
        icon: IconType.Send,
        testId: MenuGroupTestIds.Connecting,
        visibleOn: [DeviceType.MuditaPure, DeviceType.MuditaHarmony],
      },
    ],
    viewKey: View.Connecting,
    simulatePhoneConnection: true,
  },
  {
    items: [
      {
        button: views[View.Onboarding],
        icon: IconType.Send,
        visibleOn: [DeviceType.MuditaPure, DeviceType.MuditaHarmony],
      },
    ],
    viewKey: View.Onboarding,
    devModeOnly: true,
  },
  {
    items: [
      {
        button: views[View.News],
        icon: IconType.MenuNews,
        visibleOn: [DeviceType.MuditaPure, DeviceType.MuditaHarmony],
      },
    ],
    viewKey: View.News,
  },
  {
    label: messages.yourPure,
    items: YOUR_PURE_BUTTONS,
    icons: flags.get(Feature.YourPureIconsEnabled)
      ? [
          IconType.MenuRange,
          IconType.MenuBattery,
          IconType.Sim,
          IconType.TetheringStatus,
        ]
      : [],
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
