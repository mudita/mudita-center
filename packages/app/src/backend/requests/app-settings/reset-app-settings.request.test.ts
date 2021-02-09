/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import getFakeAdapters from "App/tests/get-fake-adapters"
import { IpcRequest } from "Common/requests/ipc-request.enum"
import { ipcMain } from "electron-better-ipc"
import registerAppSettingsResetRequest from "Backend/requests/app-settings/reset-app-settings.request"

test("resets app settings properly", async () => {
  registerAppSettingsResetRequest(getFakeAdapters())
  const [result] = (ipcMain as any)._flush(IpcRequest.ResetAppSettings)
  expect(await result).toMatchInlineSnapshot(`
    Object {
      "appAutostart": false,
      "appConversionFormat": "WAV",
      "appConvert": "Convert automatically",
      "appIncomingCalls": false,
      "appIncomingMessages": false,
      "appLowBattery": false,
      "appNonStandardAudioFilesConversion": false,
      "appOsUpdates": false,
      "appTethering": false,
      "appTray": true,
      "language": "en-US",
      "pureNeverConnected": true,
      "pureOsBackupLocation": "fake/path/pure/phone/backups/",
      "pureOsDownloadLocation": "fake/path/pure/os/downloads/",
    }
  `)
})
