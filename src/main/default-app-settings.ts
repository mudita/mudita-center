import { name } from "../../package.json"
import { app } from "electron"

export interface AppSettings {
  appAutostart: boolean
  appTray: boolean
  pureTethering: boolean
  pureOsBackupLocation: string
  pureOsDownloadLocation: string
  autostart: boolean
  tethering: boolean
  incomingCalls: boolean
  incomingMessages: boolean
  lowBattery: boolean
  osUpdates: boolean
}

const getDefaultAppSettings = (): AppSettings => {
  const appPath = `${app.getPath("appData")}/${name}`

  return {
    appAutostart: true,
    appTray: true,
    pureTethering: false,
    pureOsBackupLocation: `${appPath}/pure/phone/backups/`,
    pureOsDownloadLocation: `${appPath}/pure/os/downloads/`,
    autostart: false,
    tethering: false,
    incomingCalls: false,
    incomingMessages: false,
    lowBattery: false,
    osUpdates: false,
  }
}

export default getDefaultAppSettings
