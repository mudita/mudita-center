/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { IconType as CoreIconType } from "Core/__deprecated__/renderer/components/core/icon/icon-type"
import { MenuElement } from "Core/__deprecated__/renderer/constants/menu-elements"
import { IconType } from "../models/icons.types"
import { MenuConfig } from "Root/demo-data/demo-menu"

const mapIcons: Record<IconType, CoreIconType> = {
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
  [IconType.Close]: CoreIconType.Close,
  [IconType.Device]: CoreIconType.MenuPhone,
}

const mapDefaultIcons: Record<string, CoreIconType> = {
  "mc-overview": CoreIconType.MenuOverview,
}

const getIcon = (feature: string, iconType?: IconType) => {
  const featureIcon = mapDefaultIcons[feature] ?? CoreIconType.VeryLowBattery

  return (iconType && mapIcons[iconType]) ?? featureIcon
}

export const generateMenu = (config: MenuConfig): MenuElement[] => {
  return [
    {
      label: config.title,
      items: config.menuItems
        .filter((item) => item.displayName)
        .map((item) => ({
          icon: getIcon(item.feature, item.icon),
          label: item.displayName as string,
          button: {
            label: item.displayName as string,
            url: `/generic/${item.feature}`,
          },
        })),
    },
  ]
}
