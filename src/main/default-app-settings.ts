import { name } from "../../package.json"
import { app } from "electron"
import { ToggleState } from "Renderer/modules/settings/settings-toggle-state.enum"

export interface AppSettings {
  appAutostart: boolean
  appTray: boolean
  pureTethering: boolean
  pureOsBackupLocation: string
  pureOsDownloadLocation: string
  autostart: ToggleState
  tethering: ToggleState
}

const getDefaultAppSettings = (): AppSettings => {
  const appPath = `${app.getPath("appData")}/${name}`

  return {
    appAutostart: true,
    appTray: true,
    pureTethering: false,
    pureOsBackupLocation: `${appPath}/pure/phone/backups/`,
    pureOsDownloadLocation: `${appPath}/pure/os/downloads/`,
    autostart: ToggleState.Off,
    tethering: ToggleState.Off,
  }
}

export default getDefaultAppSettings
