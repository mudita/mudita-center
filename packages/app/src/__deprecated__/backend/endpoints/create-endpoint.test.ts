/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import getFakeAdapters from "App/__deprecated__/tests/get-fake-adapters"
import Adapters from "App/__deprecated__/backend/adapters/adapters.interface"
import createEndpoint from "App/__deprecated__/backend/endpoints/create-endpoint"
import { IpcRequest } from "App/__deprecated__/common/requests/ipc-request.enum"
import { ipcMain } from "electron-better-ipc"

test("registers an endpoint on IPC", () => {
  const testName = "test name" as unknown as IpcRequest
  const adapters = getFakeAdapters()
  const testValue = "II"
  const handler = ({ app }: Adapters, testData: string) =>
    `${app.getName()} ${testData}`
  createEndpoint<string, string>({ name: testName, handler })(adapters)
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-explicit-any
  const [result] = (ipcMain as any)._flush(testName, testValue)
  expect(result).toBe(`${adapters.app.getName()} ${testValue}`)
})
