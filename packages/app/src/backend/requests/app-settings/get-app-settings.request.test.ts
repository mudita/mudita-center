import getFakeAdapters from "App/tests/get-fake-adapters"
import { IpcRequest } from "Common/requests/ipc-request.enum"
import { ipcMain } from "electron-better-ipc"
import registerAppSettingsRequest from "Backend/requests/app-settings/get-app-settings.request"

test("returns required app settings info", async () => {
  registerAppSettingsRequest(getFakeAdapters())
  const [result] = (ipcMain as any)._flush(IpcRequest.GetAppSettings)
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
