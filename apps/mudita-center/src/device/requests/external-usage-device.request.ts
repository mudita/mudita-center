/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcRenderer } from "electron-better-ipc"
import { ExternalDataApiEvent } from "App/device/constants/external-data-api-event.constant"

export const externalUsageDevice = async (
  serialNumber: string
): Promise<boolean> => {
  return ipcRenderer.callMain(
    ExternalDataApiEvent.GetExternalUsageDevice,
    serialNumber
  )
}
