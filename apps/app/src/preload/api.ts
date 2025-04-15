/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { serialPort } from "app-serialport/main"
import { sql } from "app-sql/main"
import { news } from "news/main"
import { appSettings } from "app-settings/main"

export const api = {
  serialPort,
  sql,
  news,
  appSettings,
} as const
