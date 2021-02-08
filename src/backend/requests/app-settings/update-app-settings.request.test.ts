/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import getFakeAdapters from "App/tests/get-fake-adapters"
import { IpcRequest } from "Common/requests/ipc-request.enum"
import { ipcMain } from "electron-better-ipc"
import registerAppSettingsUpdateRequest from "Backend/requests/app-settings/update-app-settings.request"
import { fakeAppSettings } from "Backend/adapters/app-settings/app-settings-fake.adapter"

test("updates app settings properly", async () => {
  const fakeAppAutostart = fakeAppSettings.appAutostart
  registerAppSettingsUpdateRequest(
    getFakeAdapters({
      updateOption: {
        key: "appAutostart",
        value: !fakeAppAutostart,
      },
    })
  )
  const [result] = (ipcMain as any)._flush(IpcRequest.UpdateAppSettings)
  expect(await result).toBe(!fakeAppAutostart)
})
