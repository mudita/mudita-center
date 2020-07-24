import { AppSettings } from "App/main/default-app-settings"
import { LocationPath } from "Renderer/modules/settings/tabs/backup/location-path.enum"
import { BrowserWindow } from "electron"

export default abstract class AppSettingsAdapter {
  constructor(win?: BrowserWindow) {
    // no empty block
  }
  public abstract getAppSettings(): Promise<AppSettings>
  public abstract resetAppSettings(): Promise<void>
  public abstract updateAppSettings(
    settings: Partial<AppSettings>
  ): Promise<void>
  public abstract updateLocationSettings(
    location: LocationPath
  ): Promise<null | string>
}
