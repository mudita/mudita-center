/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { defineMessages } from "react-intl"
import { DeviceType } from "device-protocol/models"
import { View, views } from "Core/__deprecated__/renderer/constants/views"
import { MenuGroupTestIds } from "Core/__deprecated__/renderer/components/rest/menu/menu-group-test-ids.enum"
import { IconType } from "Core/__deprecated__/renderer/components/core/icon/icon-type"

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
    button: views.contacts,
    icon: IconType.MenuContacts,
    testId: MenuGroupTestIds.Contacts,
    visibleOn: [DeviceType.MuditaPure],
    viewKey: View.Contacts,
  },
  {
    button: views.filesManager,
    icon: IconType.MenuFilesManager,
    testId: MenuGroupTestIds.FilesManager,
    visibleOn: [DeviceType.MuditaPure],
    viewKey: View.FilesManager,
  },
  {
    button: views.manageSounds,
    icon: IconType.MenuFilesManager,
    testId: MenuGroupTestIds.ManageSounds,
    visibleOn: [DeviceType.MuditaHarmony],
    viewKey: View.ManageSounds,
  },
  {
    button: views.dataMigration,
    icon: IconType.DataMigration,
    testId: MenuGroupTestIds.DataMigration,
    visibleOn: [DeviceType.MuditaPure],
    viewKey: View.DataMigration,
  },
  {
    button: views.recoveryMode,
    icon: IconType.RecoveryModeBlack,
    testId: MenuGroupTestIds.RecoveryMode,
    visibleOn: [DeviceType.MuditaHarmonyMsc],
    viewKey: View.RecoveryMode,
  },
]

const DESKTOP_APP_BUTTONS: Item[] = [
  {
    button: views.settings,
    icon: IconType.MenuSettings,
    visibleOn: [
      DeviceType.MuditaPure,
      DeviceType.MuditaHarmony,
      DeviceType.MuditaHarmonyMsc,
      DeviceType.APIDevice,
    ],
  },
  {
    button: views.help,
    icon: IconType.MenuHelp,
    testId: MenuGroupTestIds.Help,
    disableWhenActive: false,
    visibleOn: [
      DeviceType.MuditaPure,
      DeviceType.MuditaHarmony,
      DeviceType.MuditaHarmonyMsc,
      DeviceType.APIDevice,
    ],
  },
]

interface Item {
  button: (typeof views)[View]
  icon?: IconType
  testId?: MenuGroupTestIds
  hidden?: boolean
  visibleOn?: DeviceType[]
  viewKey?: View
  disableWhenActive?: boolean
}

export interface MenuElement {
  items?: Item[]
  label?:
    | {
        id: string
      }
    | string
  icons?: IconType[]
  connectedPhoneOnly?: boolean
  simulatePhoneConnection?: boolean
  openHelpWindow?: () => void
  visibleOn?: DeviceType[]
  viewKey?: View
}

export const baseMenuElements: MenuElement[] = [
  {
    items: [
      {
        button: views[View.News],
        icon: IconType.MenuNews,
        visibleOn: [
          DeviceType.MuditaPure,
          DeviceType.MuditaHarmony,
          DeviceType.MuditaHarmonyMsc,
          DeviceType.APIDevice,
        ],
      },
    ],
    viewKey: View.News,
  },
]

export const deviceMenuElements: MenuElement[] = [
  {
    label: messages.yourPure,
    items: YOUR_PURE_BUTTONS,
    icons: [],
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
    label: messages.yourHarmony,
    items: YOUR_PURE_BUTTONS,
    icons: [],
    connectedPhoneOnly: true,
    visibleOn: [DeviceType.MuditaHarmonyMsc],
  },
]

export const centerMenuElements: MenuElement[] = [
  {
    label: messages.desktopApp,
    items: DESKTOP_APP_BUTTONS,
  },
]
