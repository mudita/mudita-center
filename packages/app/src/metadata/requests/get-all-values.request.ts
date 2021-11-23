/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcRenderer } from "electron-better-ipc"
import { IpcMetadata, MetadataKey } from "App/metadata/constants"

export const getAllValues = async (): Promise<
  Record<MetadataKey, string | null>
> => {
  return ipcRenderer.callMain(IpcMetadata.GetAllValues)
}
