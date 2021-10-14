/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcRenderer } from "electron-better-ipc"

import { removeFileRequest } from "./remove-file.request"
import { IpcFileSystem } from "App/device-file-system/constants"

const filePathMock = "C:/MuditaOs/files"

beforeEach(() => {
  ;(ipcRenderer as any).__rendererCalls = {
    [IpcFileSystem.Remove]: Promise.resolve("test"),
  }
})

test("Returns proper data in response", async () => {
  expect(await removeFileRequest(filePathMock)).toEqual("test")
})
