/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcMain } from "electron-better-ipc"
import { IpcMetadata } from "App/metadata/constants"
import { getMetadataStore } from "App/metadata/containers"

export const registerMetadataAllGetValueListener = (): void => {
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/require-await
  ipcMain.answerRenderer(IpcMetadata.GetAllValues, async () => {
    const store = getMetadataStore()
    return store.metadata
  })
}
