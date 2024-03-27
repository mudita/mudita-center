/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import BatteryEmpty from "Core/__deprecated__/renderer/svg/battery-empty.svg"
import BatteryVeryLow from "Core/__deprecated__/renderer/svg/battery-very-low.svg"
import BatteryLow from "Core/__deprecated__/renderer/svg/battery-low.svg"
import BatteryMedium from "Core/__deprecated__/renderer/svg/battery-medium.svg"
import BatteryHigh from "Core/__deprecated__/renderer/svg/battery-high.svg"
import BatteryFull from "Core/__deprecated__/renderer/svg/battery-full.svg"

import BatteryChargingEmpty from "Core/__deprecated__/renderer/svg/battery-charging-empty.svg"
import BatteryChargingVeryLow from "Core/__deprecated__/renderer/svg/battery-charging-very-low.svg"
import BatteryChargingLow from "Core/__deprecated__/renderer/svg/battery-charging-low.svg"
import BatteryChargingMedium from "Core/__deprecated__/renderer/svg/battery-charging-medium.svg"
import BatteryChargingHigh from "Core/__deprecated__/renderer/svg/battery-charging-high.svg"
import BatteryChargingFull from "Core/__deprecated__/renderer/svg/battery-charging-full.svg"

import SignalNoRange from "Core/__deprecated__/renderer/svg/signal-no-range.svg"
import SignalVeryLowRange from "Core/__deprecated__/renderer/svg/signal-very-low-range.svg"
import SignalMediumRange from "Core/__deprecated__/renderer/svg/signal-medium-range.svg"
import SignalHighRange from "Core/__deprecated__/renderer/svg/signal-high-range.svg"
import SignalVeryHighRange from "Core/__deprecated__/renderer/svg/signal-very-high-range.svg"

import AirplaneMode from "Core/__deprecated__/renderer/svg/airplane-mode.svg"
import MenuOverview from "Core/__deprecated__/renderer/svg/menu-overview.svg"
import CloseIcon from "Core/__deprecated__/renderer/svg/close.svg"
import Device from "Core/__deprecated__/renderer/svg/device.svg"
import Mudita from "Core/__deprecated__/renderer/svg/mudita.svg"
import Spinner from "Core/__deprecated__/renderer/svg/spinner.svg"
import Contact from "Core/__deprecated__/renderer/svg/contact.svg"
import ContactsBook from "Core/__deprecated__/renderer/svg/menu-contacts.svg"

import Backup from "./svg/backup.svg"
import Settings from "./svg/settings.svg"
import PasswordShow from "./svg/password-show.svg"
import PasswordHide from "./svg/password-hide.svg"
import Success from "./svg/confirm.svg"
import Failure from "./svg/failed.svg"
import Folder from "./svg/folder.svg"

import { IconType } from "generic-view/utils"

const typeToIcon: Record<IconType, typeof BatteryHigh> = {
  [IconType.Battery0]: BatteryEmpty,
  [IconType.Battery1]: BatteryVeryLow,
  [IconType.Battery2]: BatteryLow,
  [IconType.Battery3]: BatteryMedium,
  [IconType.Battery4]: BatteryHigh,
  [IconType.Battery5]: BatteryFull,
  [IconType.BatteryCharging0]: BatteryChargingEmpty,
  [IconType.BatteryCharging1]: BatteryChargingVeryLow,
  [IconType.BatteryCharging2]: BatteryChargingLow,
  [IconType.BatteryCharging3]: BatteryChargingMedium,
  [IconType.BatteryCharging4]: BatteryChargingHigh,
  [IconType.BatteryCharging5]: BatteryChargingFull,
  [IconType.NetworkSignal0]: SignalNoRange,
  [IconType.NetworkSignal1]: SignalVeryLowRange,
  [IconType.NetworkSignal2]: SignalMediumRange,
  [IconType.NetworkSignal3]: SignalHighRange,
  [IconType.NetworkSignal4]: SignalVeryHighRange,
  [IconType.NoSimCard]: SignalNoRange,
  [IconType.AirplaneMode]: AirplaneMode,
  [IconType.Overview]: MenuOverview,
  [IconType.Close]: CloseIcon,
  [IconType.Device]: Device,
  [IconType.Mudita]: Mudita,
  [IconType.Spinner]: Spinner,
  [IconType.Backup]: Backup,
  [IconType.Settings]: Settings,
  [IconType.PasswordShow]: PasswordShow,
  [IconType.PasswordHide]: PasswordHide,
  [IconType.Success]: Success,
  [IconType.Failure]: Failure,
  [IconType.Folder]: Folder,
  [IconType.Contact]: Contact,
  [IconType.ContactsBook]: ContactsBook,
}

export const getIcon = (
  icon: IconType
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
): React.FunctionComponent => typeToIcon[icon]
