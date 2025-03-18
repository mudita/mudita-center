/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

/// <reference types="vite-plugin-svgr/client" />

import Svg from "*.svg?react"
import { IconType } from "app-theme/models"
import ArrowBack from "./lib/arrow-back.svg?react"
import BackupFolder from "./lib/backup-folder.svg?react"
import ContactsBook from "./lib/contacts-book.svg?react"
import DataMigration from "./lib/data-migration.svg?react"
import FileManager from "./lib/file-manager.svg?react"
import Help from "./lib/help.svg?react"
import Messages from "./lib/messages.svg?react"
import MuditaLogo from "./lib/mudita-logo.svg?react"
import MuditaLogoFull from "./lib/mudita-logo-full.svg?react"
import News from "./lib/news.svg?react"
import Overview from "./lib/overview.svg?react"
import Settings from "./lib/settings.svg?react"

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
