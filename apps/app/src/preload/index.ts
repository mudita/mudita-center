/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { contextBridge } from "electron"
import { api } from "./api"

contextBridge.exposeInMainWorld("api", api)
