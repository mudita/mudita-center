/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcMain } from "electron-better-ipc"
import { createClient } from "App/api/mudita-center-server"
// import logger from "App/main/utils/logger"
import { IpcUpdate } from "App/update/constants"
import { Product } from "App/main/constants"

export const registerGetProductionReleaseListener = () => {
  ipcMain.answerRenderer(
    IpcUpdate.GetProductionRelease,
    async (product: Product) => {
      const client = createClient()
      const { data } = await client.getLatestProductionRelease(product)

      return [data]
    }
  )
}
