/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

/// <reference types="vite-plugin-svgr/client" />

import Svg from "*.svg?react"
import { IconType } from "app-theme/models"
import ArrowBack from "./svg/arrow-back.svg?react"
import Backup from "./svg/backup.svg?react"
import Close from "./svg/close.svg?react"
import Contacts from "./svg/contacts.svg?react"
import DataMigration from "./svg/data-migration.svg?react"
import FileManager from "./svg/file-manager.svg?react"
import Help from "./svg/help.svg?react"
import Messages from "./svg/messages.svg?react"
import MuditaLogo from "./svg/mudita-logo.svg?react"
import MuditaLogoFull from "./svg/mudita-logo-full.svg?react"
import News from "./svg/news.svg?react"
import Overview from "./svg/overview.svg?react"
import PasswordHide from "./svg/password-hide.svg?react"
import PasswordShow from "./svg/password-show.svg?react"
import Phone from "./svg/phone.svg?react"
import RecoveryMode from "./svg/recovery-mode.svg?react"
import Search from "./svg/search.svg?react"
import Settings from "./svg/settings.svg?react"
import Spinner from "./svg/spinner.svg?react"

export const icons = {
  [IconType.ArrowBack]: ArrowBack,
  [IconType.Backup]: Backup,
  [IconType.Close]: Close,
  [IconType.Contacts]: Contacts,
  [IconType.DataMigration]: DataMigration,
  [IconType.FileManager]: FileManager,
  [IconType.Help]: Help,
  [IconType.Messages]: Messages,
  [IconType.MuditaLogo]: MuditaLogo,
  [IconType.MuditaLogoFull]: MuditaLogoFull,
  [IconType.News]: News,
  [IconType.Overview]: Overview,
  [IconType.PasswordHide]: PasswordHide,
  [IconType.PasswordShow]: PasswordShow,
  [IconType.Phone]: Phone,
  [IconType.RecoveryMode]: RecoveryMode,
  [IconType.Search]: Search,
  [IconType.Settings]: Settings,
  [IconType.Spinner]: Spinner,
} as const satisfies Record<IconType, typeof Svg>
