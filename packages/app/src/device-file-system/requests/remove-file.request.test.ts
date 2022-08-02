/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcRenderer } from "electron-better-ipc"

import { removeFileRequest } from "./remove-file.request"
import { IpcDeviceFileSystem } from "App/device-file-system/constants"

const filePathMock = "C:/MuditaOs/files"

beforeEach(() => {
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
  ;(ipcRenderer as any).__rendererCalls = {
    [IpcDeviceFileSystem.Remove]: Promise.resolve("test"),
  }
})

test("Returns proper data in response", async () => {
  expect(await removeFileRequest(filePathMock)).toEqual("test")
})
