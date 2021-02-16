/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import getFakeAdapters from "App/tests/get-fake-adapters"
import Adapters from "Backend/adapters/adapters.interface"
import createEndpoint from "Backend/endpoints/create-endpoint"
import { IpcRequest } from "Common/requests/ipc-request.enum"
import { ipcMain } from "electron-better-ipc"

test("registers an endpoint on IPC", () => {
  const testName = ("test name" as unknown) as IpcRequest
  const adapters = getFakeAdapters()
  const testValue = "II"
  const handler = ({ app }: Adapters, testData: string) =>
    `${app.getName()} ${testData}`
  createEndpoint<string, string>({ name: testName, handler })(adapters)
  const [result] = (ipcMain as any)._flush(testName, testValue)
  expect(result).toBe(`${adapters.app.getName()} ${testValue}`)
})
