/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { contextBridge } from "electron"
import { api } from "./api"

if (process.env.NODE_ENV === "test") {
  import("wdio-electron-service/preload")
}

contextBridge.exposeInMainWorld("api", api)
