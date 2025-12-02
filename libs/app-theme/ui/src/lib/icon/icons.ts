/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

/// <reference types="vite-plugin-svgr/client" />

import Svg from "*.svg?react"
import { IconType } from "app-theme/models"
import AirplaneMode from "./svg/airplane-mode.svg?react"
import ArrowBack from "./svg/arrow-back.svg?react"
import BackArrowIcon from "./svg/back-arrow-icon.svg?react"
import Backup from "./svg/backup.svg?react"
import Battery0 from "./svg/battery-0.svg?react"
import Battery1 from "./svg/battery-1.svg?react"
import Battery2 from "./svg/battery-2.svg?react"
import Battery3 from "./svg/battery-3.svg?react"
import Battery4 from "./svg/battery-4.svg?react"
import Battery5 from "./svg/battery-5.svg?react"
import BatteryCharging0 from "./svg/battery-charging-0.svg?react"
import BatteryCharging1 from "./svg/battery-charging-1.svg?react"
import BatteryCharging2 from "./svg/battery-charging-2.svg?react"
import BatteryCharging3 from "./svg/battery-charging-3.svg?react"
import BatteryCharging4 from "./svg/battery-charging-4.svg?react"
import BatteryCharging5 from "./svg/battery-charging-5.svg?react"
import BatteryFlat from "./svg/battery-flat.svg?react"
import Bell from "./svg/bell.svg?react"
import Book from "./svg/book.svg?react"
import Check from "./svg/check.svg?react"
import CheckBold from "./svg/check-bold.svg?react"
import CheckCircle from "./svg/check-circle.svg?react"
import ChevronDown from "./svg/chevron-down.svg?react"
import Confirm from "./svg/confirm.svg?react"
import Close from "./svg/close.svg?react"
import ContactsBook from "./svg/contacts-book.svg?react"
import DataMigration from "./svg/data-migration.svg?react"
import Download from "./svg/download.svg?react"
import Dropdown from "./svg/dropdown.svg?react"
import Error from "./svg/error.svg?react"
import Failed from "./svg/failed.svg?react"
import FileManager from "./svg/file-manager.svg?react"
import FileCopy from "./svg/file-copy.svg?react"
import Grid from "./svg/grid.svg?react"
import Help from "./svg/help.svg?react"
import Info from "./svg/info.svg?react"
import InfoBold from "./svg/info-bold.svg?react"
import lightButtonIcon from "./svg/light-button-icon.svg?react"
import Lock from "./svg/lock.svg?react"
import Messages from "./svg/messages.svg?react"
import Minus from "./svg/minus.svg?react"
import MuditaLogo from "./svg/mudita-logo.svg?react"
import MuditaLogoFull from "./svg/mudita-logo-full.svg?react"
import MusicNote from "./svg/music-note.svg?react"
import Namaste from "./svg/namaste.svg?react"
import News from "./svg/news.svg?react"
import Options from "./svg/options.svg?react"
import Overview from "./svg/overview.svg?react"
import PasswordHide from "./svg/password-hide.svg?react"
import PasswordShow from "./svg/password-show.svg?react"
import Phone from "./svg/phone.svg?react"
import PhotoCatalog from "./svg/photo-catalog.svg?react"
import Plus from "./svg/plus.svg?react"
import Pure from "./svg/pure.svg?react"
import Quote from "./svg/quote.svg?react"
import RecoveryMode from "./svg/recovery-mode.svg?react"
import RecoveryModeFilled from "./svg/recovery-mode-filled.svg?react"
import Refreshing from "./svg/refreshing.svg?react"
import Search from "./svg/search.svg?react"
import Settings from "./svg/settings.svg?react"
import Signal0 from "./svg/signal-0.svg?react"
import Signal1 from "./svg/signal-1.svg?react"
import Signal2 from "./svg/signal-2.svg?react"
import Signal3 from "./svg/signal-3.svg?react"
import Signal4 from "./svg/signal-4.svg?react"
import SignalLte from "./svg/signal-lte.svg?react"
import SignalNoService from "./svg/signal-no-service.svg?react"
import SignalRoaming0 from "./svg/signal-roaming-0.svg?react"
import SignalRoaming1 from "./svg/signal-roaming-1.svg?react"
import SignalRoaming2 from "./svg/signal-roaming-2.svg?react"
import SignalRoaming3 from "./svg/signal-roaming-3.svg?react"
import SignalRoaming4 from "./svg/signal-roaming-4.svg?react"
import Spinner from "./svg/spinner.svg?react"
import Star from "./svg/star.svg?react"
import StarFilled from "./svg/star-filled.svg?react"
import Support from "./svg/support.svg?react"
import ThinFail from "./svg/thin-fail.svg?react"
import Trash from "./svg/trash.svg?react"
import Upload from "./svg/upload.svg?react"

export const icons = {
  [IconType.AirplaneMode]: AirplaneMode,
  [IconType.ArrowBack]: ArrowBack,
  [IconType.BackArrowIcon]: BackArrowIcon,
  [IconType.Backup]: Backup,
  [IconType.Battery0]: Battery0,
  [IconType.Battery1]: Battery1,
  [IconType.Battery2]: Battery2,
  [IconType.Battery3]: Battery3,
  [IconType.Battery4]: Battery4,
  [IconType.Battery5]: Battery5,
  [IconType.BatteryCharging0]: BatteryCharging0,
  [IconType.BatteryCharging1]: BatteryCharging1,
  [IconType.BatteryCharging2]: BatteryCharging2,
  [IconType.BatteryCharging3]: BatteryCharging3,
  [IconType.BatteryCharging4]: BatteryCharging4,
  [IconType.BatteryCharging5]: BatteryCharging5,
  [IconType.BatteryFlat]: BatteryFlat,
  [IconType.Bell]: Bell,
  [IconType.Book]: Book,
  [IconType.Check]: Check,
  [IconType.CheckBold]: CheckBold,
  [IconType.CheckCircle]: CheckCircle,
  [IconType.ChevronDown]: ChevronDown,
  [IconType.Confirm]: Confirm,
  [IconType.Close]: Close,
  [IconType.ContactsBook]: ContactsBook,
  [IconType.DataMigration]: DataMigration,
  [IconType.Download]: Download,
  [IconType.Dropdown]: Dropdown,
  [IconType.Error]: Error,
  [IconType.Failed]: Failed,
  [IconType.FileManager]: FileManager,
  [IconType.FileCopy]: FileCopy,
  [IconType.Grid]: Grid,
  [IconType.Help]: Help,
  [IconType.Info]: Info,
  [IconType.InfoBold]: InfoBold,
  [IconType.LightButtonIcon]: lightButtonIcon,
  [IconType.Lock]: Lock,
  [IconType.Messages]: Messages,
  [IconType.Minus]: Minus,
  [IconType.MuditaLogo]: MuditaLogo,
  [IconType.MuditaLogoFull]: MuditaLogoFull,
  [IconType.MusicNote]: MusicNote,
  [IconType.Namaste]: Namaste,
  [IconType.News]: News,
  [IconType.Options]: Options,
  [IconType.Overview]: Overview,
  [IconType.PasswordHide]: PasswordHide,
  [IconType.PasswordShow]: PasswordShow,
  [IconType.Device]: Phone,
  [IconType.Pure]: Pure,
  [IconType.Quote]: Quote,
  [IconType.RecoveryMode]: RecoveryMode,
  [IconType.RecoveryModeFilled]: RecoveryModeFilled,
  [IconType.Refreshing]: Refreshing,
  [IconType.Search]: Search,
  [IconType.Settings]: Settings,
  [IconType.Signal0]: Signal0,
  [IconType.Signal1]: Signal1,
  [IconType.Signal2]: Signal2,
  [IconType.Signal3]: Signal3,
  [IconType.Signal4]: Signal4,
  [IconType.SignalLte]: SignalLte,
  [IconType.SignalNoService]: SignalNoService,
  [IconType.SignalRoaming0]: SignalRoaming0,
  [IconType.SignalRoaming1]: SignalRoaming1,
  [IconType.SignalRoaming2]: SignalRoaming2,
  [IconType.SignalRoaming3]: SignalRoaming3,
  [IconType.SignalRoaming4]: SignalRoaming4,
  [IconType.Phone]: Phone,
  [IconType.PhotoCatalog]: PhotoCatalog,
  [IconType.Plus]: Plus,
  [IconType.Spinner]: Spinner,
  [IconType.Star]: Star,
  [IconType.StarFilled]: StarFilled,
  [IconType.Support]: Support,
  [IconType.ThinFail]: ThinFail,
  [IconType.Trash]: Trash,
  [IconType.Upload]: Upload,
} as const satisfies Record<IconType, typeof Svg>
