/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import HighBattery from "Core/__deprecated__/renderer/svg/high-battery.svg"
import HighRange from "Core/__deprecated__/renderer/svg/high-range.svg"
import LowBattery from "Core/__deprecated__/renderer/svg/low-battery.svg"
import MediumBattery from "Core/__deprecated__/renderer/svg/medium-battery.svg"
import MediumRange from "Core/__deprecated__/renderer/svg/medium-range.svg"
import NoRange from "Core/__deprecated__/renderer/svg/no-range.svg"
import VeryHighBattery from "Core/__deprecated__/renderer/svg/very-high-battery.svg"
import VeryHighRange from "Core/__deprecated__/renderer/svg/very-high-range.svg"
import VeryLowBattery from "Core/__deprecated__/renderer/svg/very-low-battery.svg"
import VeryLowRange from "Core/__deprecated__/renderer/svg/very-low-range.svg"
import AirplaneMode from "Core/__deprecated__/renderer/svg/airplane-mode.svg"
import MenuOverview from "Core/__deprecated__/renderer/svg/menu-overview.svg"
import CloseIcon from "Core/__deprecated__/renderer/svg/close.svg"
import Device from "Core/__deprecated__/renderer/svg/device.svg"
import Mudita from "Core/__deprecated__/renderer/svg/mudita.svg"
import Spinner from "Core/__deprecated__/renderer/svg/spinner.svg"
import { IconType } from "generic-view/utils"

const typeToIcon: Record<IconType, typeof HighBattery> = {
  [IconType.Battery1]: VeryLowBattery,
  [IconType.Battery2]: LowBattery,
  [IconType.Battery3]: MediumBattery,
  [IconType.Battery4]: HighBattery,
  [IconType.Battery5]: VeryHighBattery,
  [IconType.BatteryCharging1]: VeryLowBattery,
  [IconType.BatteryCharging2]: LowBattery,
  [IconType.BatteryCharging3]: MediumBattery,
  [IconType.BatteryCharging4]: HighBattery,
  [IconType.BatteryCharging5]: VeryHighBattery,
  [IconType.NetworkSignal0]: NoRange,
  [IconType.NetworkSignal1]: VeryLowRange,
  [IconType.NetworkSignal2]: MediumRange,
  [IconType.NetworkSignal3]: HighRange,
  [IconType.NetworkSignal4]: VeryHighRange,
  [IconType.NoSimCard]: NoRange,
  [IconType.AirplaneMode]: AirplaneMode,
  [IconType.Overview]: MenuOverview,
  [IconType.Close]: CloseIcon,
  [IconType.Device]: Device,
  [IconType.Mudita]: Mudita,
  [IconType.Spinner]: Spinner,
}

export const getIcon = (
  icon: IconType
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
): React.FunctionComponent => typeToIcon[icon]
