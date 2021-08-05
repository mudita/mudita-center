/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcRenderer } from "electron-better-ipc"
import { GetLowestSupportedOsVersionEvents } from "App/main/functions/register-get-lowest-supported-os-version-listener"

const getLowestSupportedOsVersion = async (): Promise<string> => {
  return await ipcRenderer.callMain(GetLowestSupportedOsVersionEvents.Request)
}

export default getLowestSupportedOsVersion
