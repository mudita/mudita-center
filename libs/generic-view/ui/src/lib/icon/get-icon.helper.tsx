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
import MenuFilesManager from "Core/__deprecated__/renderer/svg/files-manager.svg"
import CloseIcon from "Core/__deprecated__/renderer/svg/close.svg"
import Device from "Core/__deprecated__/renderer/svg/device.svg"
import Mudita from "Core/__deprecated__/renderer/svg/mudita.svg"
import Spinner from "Core/__deprecated__/renderer/svg/spinner.svg"
import Contact from "Core/__deprecated__/renderer/svg/contact.svg"
import ContactsBook from "Core/__deprecated__/renderer/svg/menu-contacts.svg"

import Backup from "./svg/backup.svg"
import Book from "./svg/book.svg"
import MusicNote from "./svg/music-note.svg"
import Settings from "./svg/settings.svg"
import PasswordShow from "./svg/password-show.svg"
import PasswordHide from "./svg/password-hide.svg"
import PhotoCatalog from "./svg/photo-catalog.svg"
import Success from "./svg/confirm.svg"
import Failure from "./svg/failed.svg"
import Folder from "./svg/folder.svg"
import Grid from "./svg/grid.svg"
import SpinnerDark from "./svg/spinner-dark.svg"
import Confirm from "./svg/confirm.svg"
import Check from "./svg/check.svg"
import CheckCircle from "./svg/check-circle.svg"
import Checkmark from "./svg/checkmark.svg"
import Minus from "./svg/minus.svg"
import Search from "./svg/search.svg"
import Import from "./svg/import.svg"
import DataMigration from "./svg/data-migration.svg"
import Information from "./svg/information.svg"
import RecoveryModeWhite from "./svg/recovery-mode-white.svg"
import RecoveryModeBlack from "./svg/recovery-mode-black.svg"
import ArrowBack from "./svg/arrow-back.svg"
import Support from "./svg/support.svg"
import Exclamation from "./svg/exclamation.svg"
import Namaste from "./svg/namaste.svg"
import Delete from "./svg/delete.svg"
import DropdownArrow from "./svg/dropdown-arrow.svg"
import Export from "./svg/export.svg"

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
  [IconType.Book]: Book,
  [IconType.MusicNote]: MusicNote,
  [IconType.NetworkSignal0]: SignalNoRange,
  [IconType.NetworkSignal1]: SignalVeryLowRange,
  [IconType.NetworkSignal2]: SignalMediumRange,
  [IconType.NetworkSignal3]: SignalHighRange,
  [IconType.NetworkSignal4]: SignalVeryHighRange,
  [IconType.NoSimCard]: SignalNoRange,
  [IconType.AirplaneMode]: AirplaneMode,
  [IconType.Overview]: MenuOverview,
  [IconType.FileManager]: MenuFilesManager,
  [IconType.Close]: CloseIcon,
  [IconType.Device]: Device,
  [IconType.Mudita]: Mudita,
  [IconType.Spinner]: Spinner,
  [IconType.SpinnerDark]: SpinnerDark,
  [IconType.Backup]: Backup,
  [IconType.Settings]: Settings,
  [IconType.PasswordShow]: PasswordShow,
  [IconType.PasswordHide]: PasswordHide,
  [IconType.PhotoCatalog]: PhotoCatalog,
  [IconType.Success]: Success,
  [IconType.Failure]: Failure,
  [IconType.Folder]: Folder,
  [IconType.Grid]: Grid,
  [IconType.Confirm]: Confirm,
  [IconType.Contact]: Contact,
  [IconType.ContactsBook]: ContactsBook,
  [IconType.Check]: Check,
  [IconType.CheckCircle]: CheckCircle,
  [IconType.Checkmark]: Checkmark,
  [IconType.Minus]: Minus,
  [IconType.Search]: Search,
  [IconType.Import]: Import,
  [IconType.DataMigration]: DataMigration,
  [IconType.Information]: Information,
  [IconType.RecoveryModeWhite]: RecoveryModeWhite,
  [IconType.RecoveryModeBlack]: RecoveryModeBlack,
  [IconType.ArrowBack]: ArrowBack,
  [IconType.Support]: Support,
  [IconType.Exclamation]: Exclamation,
  [IconType.Namaste]: Namaste,
  [IconType.Delete]: Delete,
  [IconType.DropdownArrow]: DropdownArrow,
  [IconType.Export]: Export,
}

export const getIcon = (
  icon: IconType
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
): React.FunctionComponent => typeToIcon[icon]
