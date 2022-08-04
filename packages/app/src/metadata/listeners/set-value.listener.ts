/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcMain } from "electron-better-ipc"
import { IpcMetadata, MetadataKey } from "App/metadata/constants"
import { getMetadataStore } from "App/metadata/containers"
import logger from "App/__deprecated__/main/utils/logger"

export const registerMetadataSetValueListener = (): void => {
  ipcMain.answerRenderer(
    IpcMetadata.SetValue,
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/require-await
    async (data: { key: MetadataKey; value: string | number | null }) => {
      const store = getMetadataStore()
      const result = store.setValue(data.key, data.value)

      logger.updateMetadata()

      return result
    }
  )
}
