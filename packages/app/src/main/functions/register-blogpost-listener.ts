/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcMain } from "electron-better-ipc"
import { createClient } from "App/api/mudita-center-server"
import logger from "App/main/utils/logger"

export enum Blogpost {
  GetDate = "get-blogpost-date",
}

export const registerBlogpostListener = () => {
  ipcMain.answerRenderer(Blogpost.GetDate, async () => {
    try {
      const client = createClient()
      const date: any = await client.getNewsDate({
        discussionId: "2239",
      })
      console.log("register date", date)
      return date
    } catch (error) {
      logger.error(error)
      return false
    }
  })
}
