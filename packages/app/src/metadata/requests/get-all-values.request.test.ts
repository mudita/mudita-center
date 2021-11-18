/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcRenderer } from "electron-better-ipc"

import { getAllValues } from "./get-all-values.request"
import { IpcMetadata, MetadataKey } from "App/metadata/constants"

const keyStoreMock: Map<MetadataKey, string | null | undefined> = new Map()

beforeAll(() => {
  keyStoreMock.set(MetadataKey.DeviceOsVersion, "1.0.0")
  keyStoreMock.set(MetadataKey.MuditaCenterVersion, "1.0.0")
})

beforeEach(() => {
  ;(ipcRenderer as any).__rendererCalls = {
    [IpcMetadata.GetAllValues]: Promise.resolve(keyStoreMock),
  }
})

test("Returns proper data in response", async () => {
  expect(await getAllValues()).toEqual(keyStoreMock)
})
