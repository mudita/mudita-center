/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent } from "App/__deprecated__/renderer/types/function-component.interface"
import * as React from "react"
import Icon, {
  Props as IconProps,
} from "App/__deprecated__/renderer/components/core/icon/icon.component"
import { IconType } from "App/__deprecated__/renderer/components/core/icon/icon-type"

export interface BatteryIconProps {
  level: number
  charging?: boolean
}

const getInteractiveBatteryIcon = (
  batteryLevel: number,
  charging: boolean,
  size: number,
  rest: Partial<IconProps>
) => {
  switch (true) {
    case charging:
      return <Icon type={IconType.ChargingBattery} {...rest} />
    case batteryLevel === 1:
      return <Icon type={IconType.FullBattery} {...rest} />
    case batteryLevel > 0.8:
      return <Icon type={IconType.VeryHighBattery} {...rest} />
    case batteryLevel > 0.6:
      return <Icon type={IconType.HighBattery} {...rest} />
    case batteryLevel > 0.4:
      return <Icon type={IconType.MediumBattery} {...rest} />
    case batteryLevel > 0.2:
      return <Icon type={IconType.LowBattery} {...rest} />
    case batteryLevel > 0:
      return <Icon type={IconType.VeryLowBattery} {...rest} />
    default:
      return <Icon type={IconType.NoBattery} {...rest} />
  }
}

const BatteryIcon: FunctionComponent<BatteryIconProps & IconProps> = ({
  level,
  charging = false,
  height = 2,
  ...rest
}) => {
  return <>{getInteractiveBatteryIcon(level, charging, height, rest)}</>
}

export default BatteryIcon
