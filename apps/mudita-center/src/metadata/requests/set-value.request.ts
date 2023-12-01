/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcRenderer } from "electron-better-ipc"
import { IpcMetadata, MetadataKey } from "App/metadata/constants"

export const setValue = async (data: {
  key: MetadataKey
  value: string | number | boolean | undefined | null
}): Promise<void> => {
  return ipcRenderer.callMain(IpcMetadata.SetValue, data)
}
