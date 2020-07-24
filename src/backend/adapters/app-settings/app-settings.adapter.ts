import { app, BrowserWindow, dialog } from "electron"
import { name } from "../../../../package.json"
import fs from "fs-extra"
import AppSettingsAdapter from "Backend/adapters/app-settings/app-settings-adapter.class"
import getDefaultAppSettings, {
  AppSettings as AppSettingsInterface,
} from "App/main/default-app-settings"
import { LocationPath } from "Renderer/modules/settings/tabs/backup/location-path.enum"

class AppSettings extends AppSettingsAdapter {
  private readonly win: BrowserWindow
  private readonly settingsFilePath = `${app.getPath(
    "appData"
  )}/${name}/settings.json`
  private readonly defaultSettings = getDefaultAppSettings()

  constructor(win: BrowserWindow) {
    super(win)
    this.win = win

    // If there's no settings file, create one with default settings
    if (!fs.readJsonSync(this.settingsFilePath, { throws: false })) {
      fs.writeJsonSync(this.settingsFilePath, this.defaultSettings)
    }
  }

  public async getAppSettings(): Promise<AppSettingsInterface> {
    return fs.readJson(this.settingsFilePath)
  }

  resetAppSettings(): Promise<void> {
    return fs.writeJson(this.settingsFilePath, this.defaultSettings)
  }

  async updateAppSettings(
    settings: Partial<AppSettingsInterface>
  ): Promise<void> {
    const currentSettings = await fs.readJson(this.settingsFilePath)

    const updatedSettings = {
      ...currentSettings,
      ...settings,
    }

    return fs.writeJson(this.settingsFilePath, updatedSettings)
  }

  async updateLocationSettings(location: LocationPath): Promise<null | string> {
    const {
      filePaths: [path],
      canceled,
    } = await dialog.showOpenDialog(this.win, {
      properties: ["openDirectory"],
    })

    let updatedLocationPath:
      | Pick<AppSettingsInterface, "pureOsBackupLocation">
      | Pick<AppSettingsInterface, "pureOsDownloadLocation">
      | null = null

    if (canceled) {
      return updatedLocationPath
    }

    if (location === LocationPath.PureOsBackup) {
      updatedLocationPath = { pureOsBackupLocation: path }
    } else if (location === LocationPath.PureOsDownload) {
      updatedLocationPath = { pureOsDownloadLocation: path }
    }

    if (updatedLocationPath) {
      await this.updateAppSettings(updatedLocationPath)
    }

    return path
  }
}

const createAppSettingsAdapter = (win: BrowserWindow): AppSettingsAdapter =>
  new AppSettings(win)

export default createAppSettingsAdapter
