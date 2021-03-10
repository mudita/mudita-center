/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import { FunctionComponent } from "Renderer/types/function-component.interface"
import * as React from "react"
import Icon, {
  Props as IconProps,
} from "Renderer/components/core/icon/icon.component"
import { Type } from "Renderer/components/core/icon/icon.config"

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
      return <Icon type={Type.ChargingBattery} {...rest} />
    case batteryLevel === 1:
      return <Icon type={Type.FullBattery} {...rest} />
    case batteryLevel > 0.8:
      return <Icon type={Type.VeryHighBattery} {...rest} />
    case batteryLevel > 0.6:
      return <Icon type={Type.HighBattery} {...rest} />
    case batteryLevel > 0.4:
      return <Icon type={Type.MediumBattery} {...rest} />
    case batteryLevel > 0.2:
      return <Icon type={Type.LowBattery} {...rest} />
    case batteryLevel > 0:
      return <Icon type={Type.VeryLowBattery} {...rest} />
    default:
      return <Icon type={Type.NoBattery} {...rest} />
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
