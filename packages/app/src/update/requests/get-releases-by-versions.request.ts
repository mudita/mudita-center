/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ResultObject } from "App/core/builder"
import { IpcReleaseRequest } from "App/update/constants"
import { GetReleasesByVersionsInput, OsRelease } from "App/update/dto"
import { ipcRenderer } from "electron-better-ipc"

export const getReleasesByVersions = async (
  params: GetReleasesByVersionsInput
): Promise<ResultObject<OsRelease[]>> => {
  return ipcRenderer.callMain(IpcReleaseRequest.GetReleasesByVersions, params)
}
