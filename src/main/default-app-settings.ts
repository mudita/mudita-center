import { name } from "../../package.json"
import { app } from "electron"
import { Convert } from "Renderer/components/rest/settings/audio-conversion-radio-group.enum"

export interface AppSettings {
  appAutostart: boolean
  appTethering: boolean
  appIncomingCalls: boolean
  appIncomingMessages: boolean
  appLowBattery: boolean
  appOsUpdates: boolean
  appNonStandardAudioFilesConversion: boolean
  appConvert: Convert
  appTray: boolean
  pureOsBackupLocation: string
  pureOsDownloadLocation: string
}

const getDefaultAppSettings = (): AppSettings => {
  const appPath = `${app.getPath("appData")}/${name}`

  return {
    appAutostart: false,
    appTethering: false,
    appIncomingCalls: false,
    appIncomingMessages: false,
    appLowBattery: false,
    appOsUpdates: false,
    appNonStandardAudioFilesConversion: false,
    appConvert: Convert.ConvertAutomatically,
    appTray: true,
    pureOsBackupLocation: `${appPath}/pure/phone/backups/`,
    pureOsDownloadLocation: `${appPath}/pure/os/downloads/`,
  }
}

export default getDefaultAppSettings
