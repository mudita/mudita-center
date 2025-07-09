/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { serialPort } from "app-serialport/main"
import { sql } from "app-sql/main"
import { news } from "news/main"
import { appSettings } from "app-settings/main"
import { appHelp } from "help/main"
import {
  appActions,
  appFileSystem,
  appHttp,
  appLogger,
  jsonStore,
} from "app-utils/main"
import { appUpdater } from "app-updater/main"
import { usbAccess } from "app-init/main"

export const api = {
  serialPort,
  sql,
  news,
  appSettings,
  appActions,
  appFileSystem,
  appHttp,
  appLogger,
  appHelp,
  appUpdater,
  jsonStore,
  usbAccess,
} as const
