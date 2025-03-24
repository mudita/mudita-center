/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

/// <reference types="vite-plugin-svgr/client" />

import Svg from "*.svg?react"
import { IconType } from "app-theme/models"
import ArrowBack from "./svg/arrow-back.svg?react"
import BackupFolder from "./svg/backup-folder.svg?react"
import ContactsBook from "./svg/contacts-book.svg?react"
import DataMigration from "./svg/data-migration.svg?react"
import FileManager from "./svg/file-manager.svg?react"
import Help from "./svg/help.svg?react"
import Messages from "./svg/messages.svg?react"
import MuditaLogo from "./svg/mudita-logo.svg?react"
import MuditaLogoFull from "./svg/mudita-logo-full.svg?react"
import News from "./svg/news.svg?react"
import Overview from "./svg/overview.svg?react"
import Settings from "./svg/settings.svg?react"

export const icons = {
  [IconType.ArrowBack]: ArrowBack,
  [IconType.BackupFolder]: BackupFolder,
  [IconType.ContactsBook]: ContactsBook,
  [IconType.DataMigration]: DataMigration,
  [IconType.FileManager]: FileManager,
  [IconType.Help]: Help,
  [IconType.Messages]: Messages,
  [IconType.MuditaLogo]: MuditaLogo,
  [IconType.MuditaLogoFull]: MuditaLogoFull,
  [IconType.News]: News,
  [IconType.Overview]: Overview,
  [IconType.Settings]: Settings,
} as const satisfies Record<IconType, typeof Svg>
