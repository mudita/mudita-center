/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcRenderer } from "electron-better-ipc"

import { getValue } from "./get-value.request"
import { IpcMetadata, MetadataKey } from "App/metadata/constants"

beforeEach(() => {
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
  ;(ipcRenderer as any).__rendererCalls = {
    [IpcMetadata.GetValue]: Promise.resolve("1.0.0"),
  }
})

test("Returns proper data in response", async () => {
  expect(await getValue(MetadataKey.DeviceOsVersion)).toEqual("1.0.0")
})
