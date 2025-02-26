/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { contextBridge } from "electron"
import { serialPort } from "app-serialport/main"
import { sql } from "app-sql/main"

const api = {
  serialPort,
  sql,
} as const

contextBridge.exposeInMainWorld("api", api)
