import { name } from "../../package.json"
import { app } from "electron"

export interface AppSettings {
  appAutostart: boolean
  appTray: boolean
  pureTethering: boolean
  pureOsBackupLocation: string
  pureOsDownloadLocation: string
}

const getDefaultAppSettings = (): AppSettings => {
  const appPath = `${app.getPath("appData")}/${name}`

  return {
    appAutostart: true,
    appTray: true,
    pureTethering: false,
    pureOsBackupLocation: `${appPath}/pure/phone/backups/`,
    pureOsDownloadLocation: `${appPath}/pure/os/downloads/`,
  }
}

export default getDefaultAppSettings
