import getDefaultAppSettings, {
  AppSettings,
} from "../../../main/default-app-settings"
import AppSettingsAdapter from "./app-settings-adapter.class"
import { LocationPath } from "Renderer/modules/settings/tabs/backup/location-path.enum"

class AppSettingsFake extends AppSettingsAdapter {
  private settings: AppSettings = getDefaultAppSettings("fake/path")

  public async getAppSettings(): Promise<AppSettings> {
    return this.settings
  }

  resetAppSettings(): Promise<void> {
    this.settings = getDefaultAppSettings("fake/path")
    return Promise.resolve()
  }

  updateAppSettings(settings: Partial<AppSettings>): Promise<void> {
    this.settings = {
      ...this.settings,
      ...settings,
    }
    return Promise.resolve()
  }

  updateLocationSettings(location: LocationPath): Promise<string | null> {
    if (location === LocationPath.PureOsBackup) {
      this.settings.pureOsBackupLocation = "fake/backup/path/"
      return Promise.resolve(this.settings.pureOsBackupLocation)
    } else if (location === LocationPath.PureOsDownload) {
      this.settings.pureOsDownloadLocation = "fake/download/path/"
      return Promise.resolve(this.settings.pureOsDownloadLocation)
    }
    return Promise.resolve(null)
  }
}

const createFakeAppSettingsAdapter = (): AppSettingsAdapter =>
  new AppSettingsFake()

export default createFakeAppSettingsAdapter
