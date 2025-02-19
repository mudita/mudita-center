/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { MenuConfig, MenuItemConfig } from "device/models"
import { IconType as CoreIconType } from "Core/__deprecated__/renderer/components/core/icon/icon-type"
import {
  MenuElement,
  MenuElementItem,
} from "Core/__deprecated__/renderer/constants/menu-elements"
import { IconType } from "../models/icons.types"

const mapIcons: Partial<Record<IconType, CoreIconType>> = {
  [IconType.Battery1]: CoreIconType.VeryLowBattery,
  [IconType.Battery2]: CoreIconType.LowBattery,
  [IconType.Battery3]: CoreIconType.MediumBattery,
  [IconType.Battery4]: CoreIconType.HighBattery,
  [IconType.Battery5]: CoreIconType.VeryHighBattery,
  [IconType.BatteryCharging1]: CoreIconType.VeryLowBattery,
  [IconType.BatteryCharging2]: CoreIconType.LowBattery,
  [IconType.BatteryCharging3]: CoreIconType.MediumBattery,
  [IconType.BatteryCharging4]: CoreIconType.HighBattery,
  [IconType.BatteryCharging5]: CoreIconType.VeryHighBattery,
  [IconType.NetworkSignal0]: CoreIconType.NoRange,
  [IconType.NetworkSignal1]: CoreIconType.VeryLowRange,
  [IconType.NetworkSignal2]: CoreIconType.MediumRange,
  [IconType.NetworkSignal3]: CoreIconType.HighRange,
  [IconType.NetworkSignal4]: CoreIconType.VeryHighRange,
  [IconType.NoSimCard]: CoreIconType.NoRange,
  [IconType.AirplaneMode]: CoreIconType.NoRange,
  [IconType.Overview]: CoreIconType.MenuOverview,
  [IconType.FileManager]: CoreIconType.FilesManager,
  [IconType.Close]: CoreIconType.Close,
  [IconType.Device]: CoreIconType.MenuPhone,
  [IconType.Mudita]: CoreIconType.MuditaLogo,
  [IconType.ContactsBook]: CoreIconType.MenuContacts,
  [IconType.DataMigration]: CoreIconType.DataMigration,
}

const mapDefaultIcons: Record<string, CoreIconType> = {
  "mc-overview": CoreIconType.MenuOverview,
  "mc-data-migration": CoreIconType.DataMigration,
}

const getIcon = (feature: string, iconType?: IconType) => {
  const featureIcon = mapDefaultIcons[feature]

  return (iconType && mapIcons[iconType]) ?? featureIcon
}

const processMenuItem = (item: MenuItemConfig): MenuElementItem => ({
  icon: getIcon(item.feature, item.icon),
  button: {
    label: item.displayName as string,
    url: `/generic/${item.feature}`,
  },
  items: item.submenu?.map((subitem) => processMenuItem(subitem)),
})

export const generateMenu = (config: MenuConfig): MenuElement[] => {
  return [
    {
      items: config.menuItems.map((item) => processMenuItem(item)),
      label: config.title,
    },
  ]
}
