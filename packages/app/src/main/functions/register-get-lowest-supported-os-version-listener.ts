/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import axios from "axios"
import { ipcMain } from "electron-better-ipc"
import { osVersion } from "App/main/default-app-configuration.json"

export enum GetLowestSupportedOsVersionEvents {
  Request = "get-lowest-supported-os-version-request",
}

let defaultData = { osVersion }

try {
  defaultData = require("../app-configuration.json")
} catch {
  console.error("read app-configuration.json is failed")
}

const registerGetLowestSupportedOsVersionListener = (): void => {
  ipcMain.answerRenderer<undefined, string>(
    GetLowestSupportedOsVersionEvents.Request,
    async () => {
      const url = `${process.env.MUDITA_CENTER_SERVER_URL}/app-configuration`

      try {
        const { status, data } = await axios.get<{ osVersion: string }>(url)
        if (status === 200 && data?.osVersion !== undefined) {
          return data.osVersion
        } else {
          return defaultData.osVersion
        }
      } catch (e) {
        return defaultData.osVersion
      }
    }
  )
}

export default registerGetLowestSupportedOsVersionListener
