/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import * as React from "react"
import { DeviceType } from "device-protocol/models"
import { FunctionComponent } from "Core/core/types/function-component.interface"
import { IconSize } from "Core/__deprecated__/renderer/components/core/icon/icon.component"
import RangeIcon from "Core/__deprecated__/renderer/components/core/icon/range-icon.component"
import BatteryIcon from "Core/__deprecated__/renderer/components/core/icon/battery-icon.component"
import {
  HeaderIcon,
  HiddenIconBg,
} from "Core/__deprecated__/renderer/components/rest/menu/menu-group.styled"
import { IconType } from "Core/__deprecated__/renderer/components/core/icon/icon-type"

const productionEnvironment = process.env.NODE_ENV === "production"

const MenuIcon: FunctionComponent<{
  icon: IconType
  deviceType: DeviceType | null
}> = ({ icon, deviceType }) => {
  if (productionEnvironment) {
    return <HiddenIconBg />
  }

  switch (icon) {
    case IconType.MenuRange:
      return <RangeIcon strength={61} size={IconSize.Medium} />
    case IconType.MenuBattery:
      return (
        <BatteryIcon
          level={0.7}
          size={IconSize.Medium}
          deviceType={deviceType}
        />
      )
    default:
      return <HeaderIcon type={icon} size={IconSize.Medium} />
  }
}

export default MenuIcon
