/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { LegacyIcon, Props as IconProps } from "./icon.component"
import { SerialPortDeviceType } from "app-serialport/models"
import { FunctionComponent } from "react"
import { LegacyIconType } from "app-theme/models"

export interface BatteryIconProps {
  level: number
  charging?: boolean
  deviceType: SerialPortDeviceType | null
}

const getInteractiveBatteryIcon = (
  batteryLevel: number,
  charging: boolean,
  size: number,
  rest: Partial<IconProps>,
  deviceType: SerialPortDeviceType | null
) => {
  switch (true) {
    case charging:
      return <LegacyIcon type={LegacyIconType.ChargingBattery} {...rest} />
    case batteryLevel === 1 && deviceType === SerialPortDeviceType.Pure:
      return <LegacyIcon type={LegacyIconType.FullBattery} {...rest} />
    case batteryLevel > 0.95:
      return <LegacyIcon type={LegacyIconType.VeryHighBattery} {...rest} />
    case batteryLevel >= 0.7:
      return <LegacyIcon type={LegacyIconType.HighBattery} {...rest} />
    case batteryLevel >= 0.4:
      return <LegacyIcon type={LegacyIconType.MediumBattery} {...rest} />
    case batteryLevel >= 0.2:
      return <LegacyIcon type={LegacyIconType.LowBattery} {...rest} />
    case batteryLevel >= 0.1:
      return <LegacyIcon type={LegacyIconType.VeryLowBattery} {...rest} />
    default:
      return <LegacyIcon type={LegacyIconType.NoBattery} {...rest} />
  }
}

const BatteryIcon: FunctionComponent<BatteryIconProps & IconProps> = ({
  level,
  charging = false,
  height = 2,
  deviceType,
  ...rest
}) => {
  return (
    <>{getInteractiveBatteryIcon(level, charging, height, rest, deviceType)}</>
  )
}

export default BatteryIcon
