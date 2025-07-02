/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

/// <reference types="vite-plugin-svgr/client" />

import Svg from "*.svg?react"
import { IconType } from "app-theme/models"
import ArrowBack from "./svg/arrow-back.svg?react"
import Backup from "./svg/backup.svg?react"
import BatteryFlat from "./svg/battery-flat.svg?react"
import CheckCircleBlack from "./svg/check-circle-black.svg?react"
import ChevronDown from "./svg/chevron-down.svg?react"
import Confirm from "./svg/confirm.svg?react"
import Close from "./svg/close.svg?react"
import ContactsBook from "./svg/contacts-book.svg?react"
import DataMigration from "./svg/data-migration.svg?react"
import Download from "./svg/download.svg?react"
import Error from "./svg/error.svg?react"
import Failed from "./svg/failed.svg?react"
import FileManager from "./svg/file-manager.svg?react"
import FileCopy from "./svg/file-copy.svg?react"
import Help from "./svg/help.svg?react"
import Info from "./svg/info.svg?react"
import Lock from "./svg/lock.svg?react"
import Messages from "./svg/messages.svg?react"
import MuditaLogo from "./svg/mudita-logo.svg?react"
import MuditaLogoFull from "./svg/mudita-logo-full.svg?react"
import Namaste from "./svg/namaste.svg?react"
import News from "./svg/news.svg?react"
import Overview from "./svg/overview.svg?react"
import PasswordHide from "./svg/password-hide.svg?react"
import PasswordShow from "./svg/password-show.svg?react"
import Phone from "./svg/phone.svg?react"
import Pure from "./svg/pure.svg?react"
import RecoveryMode from "./svg/recovery-mode.svg?react"
import RecoveryModeFilled from "./svg/recovery-mode-filled.svg?react"
import Search from "./svg/search.svg?react"
import Settings from "./svg/settings.svg?react"
import Spinner from "./svg/spinner.svg?react"
import Support from "./svg/support.svg?react"
import ThinFail from "./svg/thin-fail.svg?react"

export const icons = {
  [IconType.ArrowBack]: ArrowBack,
  [IconType.Backup]: Backup,
  [IconType.BatteryFlat]: BatteryFlat,
  [IconType.CheckCircleBlack]: CheckCircleBlack,
  [IconType.ChevronDown]: ChevronDown,
  [IconType.Confirm]: Confirm,
  [IconType.Close]: Close,
  [IconType.ContactsBook]: ContactsBook,
  [IconType.DataMigration]: DataMigration,
  [IconType.Download]: Download,
  [IconType.Error]: Error,
  [IconType.Failed]: Failed,
  [IconType.FileManager]: FileManager,
  [IconType.FileCopy]: FileCopy,
  [IconType.Help]: Help,
  [IconType.Info]: Info,
  [IconType.Lock]: Lock,
  [IconType.Messages]: Messages,
  [IconType.MuditaLogo]: MuditaLogo,
  [IconType.MuditaLogoFull]: MuditaLogoFull,
  [IconType.Namaste]: Namaste,
  [IconType.News]: News,
  [IconType.Overview]: Overview,
  [IconType.PasswordHide]: PasswordHide,
  [IconType.PasswordShow]: PasswordShow,
  [IconType.Phone]: Phone,
  [IconType.Pure]: Pure,
  [IconType.RecoveryMode]: RecoveryMode,
  [IconType.RecoveryModeFilled]: RecoveryModeFilled,
  [IconType.Search]: Search,
  [IconType.Settings]: Settings,
  [IconType.Spinner]: Spinner,
  [IconType.Support]: Support,
  [IconType.ThinFail]: ThinFail,
} as const satisfies Record<IconType, typeof Svg>
