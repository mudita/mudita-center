/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import fs from "fs"
import { ipcMain } from "electron-better-ipc"
import RequestResponse, {
  RequestResponseStatus,
} from "App/main/functions/request-response.interface"

export interface GetFileDataProps {
  filePath: string
}

export interface FileData {
  filePath: string
  date: Date
}

export enum GetFileDataEvents {
  Get = "get",
}

const registerGetFileDataListener = (): void => {
  ipcMain.answerRenderer<
    GetFileDataProps,
    Promise<RequestResponse<FileData[]>>
  >(GetFileDataEvents.Get, async ({ filePath }) => {
    try {
      const files = fs.readdirSync(filePath)
      return {
        status: RequestResponseStatus.Ok,
        data: files.map((file) => ({
          filePath: file,
          date: new Date(),
        })),
      }
    } catch {
      return {
        status: RequestResponseStatus.Error,
      }
    }
  })
}

export default registerGetFileDataListener
