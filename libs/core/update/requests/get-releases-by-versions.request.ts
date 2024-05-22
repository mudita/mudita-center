/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ResultObject } from "Core/core/builder"
import { IpcReleaseEvent } from "Core/update/constants"
import { GetReleasesByVersionsInput, OsRelease } from "Core/update/dto"
import { ipcRenderer } from "electron-better-ipc"

export const getReleasesByVersions = async (
  params: GetReleasesByVersionsInput
): Promise<ResultObject<OsRelease[]>> => {
  return ipcRenderer.callMain(IpcReleaseEvent.GetReleasesByVersions, params)
}
