/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcRenderer } from "electron-better-ipc"
import { ResultObject } from "App/core/builder"
import { IpcReleaseRequest, Product } from "App/update/constants"
import { OsRelease } from "App/update/dto"

export const getLatestReleaseRequest = async (
  product: Product
): Promise<ResultObject<OsRelease>> => {
  return ipcRenderer.callMain(IpcReleaseRequest.GetLatestRelease, product)
}
