/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

/// <reference types="vite-plugin-svgr/client" />

import Svg from "*.svg?react"
import { IconType } from "app-theme/models"
import ArrowBack from "./lib/arrow-back.svg?react"
import BackupFolder from "./lib/backup-folder.svg?react"
import Help from "./lib/help.svg?react"
import MuditaLogo from "./lib/mudita-logo.svg?react"
import MuditaLogoFull from "./lib/mudita-logo-full.svg?react"
import News from "./lib/news.svg?react"
import Settings from "./lib/settings.svg?react"

export const icons = {
  [IconType.ArrowBack]: ArrowBack,
  [IconType.BackupFolder]: BackupFolder,
  [IconType.Help]: Help,
  [IconType.MuditaLogo]: MuditaLogo,
  [IconType.MuditaLogoFull]: MuditaLogoFull,
  [IconType.News]: News,
  [IconType.Settings]: Settings,
} as const satisfies Record<IconType, typeof Svg>
