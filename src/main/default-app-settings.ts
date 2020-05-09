import { name } from "../../package.json"
import { app } from "electron"

export interface AppSettings {
  appAutostart: boolean
  appTethering: boolean
  appIncomingCalls: boolean
  appIncomingMessages: boolean
  appLowBattery: boolean
  appOsUpdates: boolean
  appNonStandardAudioFilesConversion: boolean
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
    appTray: true,
    pureOsBackupLocation: `${appPath}/pure/phone/backups/`,
    pureOsDownloadLocation: `${appPath}/pure/os/downloads/`,
  }
}

export default getDefaultAppSettings
