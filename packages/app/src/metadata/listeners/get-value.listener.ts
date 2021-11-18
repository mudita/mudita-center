/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcMain } from "electron-better-ipc"
import { IpcMetadata, MetadataKey } from "App/metadata/constants"
import { getMetadataStore } from "App/metadata/containers"

export const registerMetadataGetValueListener = (): void => {
  ipcMain.answerRenderer(IpcMetadata.GetValue, async (key: MetadataKey) => {
    const store = getMetadataStore()
    return store.getValue(key)
  })
}
