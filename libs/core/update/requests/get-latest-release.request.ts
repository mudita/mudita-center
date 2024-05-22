/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcRenderer } from "electron-better-ipc"
import { ResultObject } from "Core/core/builder"
import { IpcReleaseEvent, Product } from "Core/update/constants"
import { OsRelease } from "Core/update/dto"

export const getLatestReleaseRequest = async (
  product: Product,
  deviceSerialNumber?: string
): Promise<ResultObject<OsRelease>> => {
  return ipcRenderer.callMain(IpcReleaseEvent.GetLatestRelease, {
    product,
    deviceSerialNumber,
  })
}
