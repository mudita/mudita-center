/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcRenderer } from "electron-better-ipc"
import {
  GetApplicationConfigurationEvents,
  ApplicationConfigurationResponse,
} from "App/__deprecated__/main/functions/register-get-application-configuration-listener"

const getApplicationConfiguration =
  async (): Promise<ApplicationConfigurationResponse> => {
    return await ipcRenderer.callMain(GetApplicationConfigurationEvents.Request)
  }

export default getApplicationConfiguration
