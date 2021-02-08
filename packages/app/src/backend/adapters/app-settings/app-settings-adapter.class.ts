import {
  AppSettings,
  SettingsUpdateOption,
} from "App/main/store/settings.interface"

export default abstract class AppSettingsAdapter {
  public abstract getAppSettings(): AppSettings
  public abstract resetAppSettings(): AppSettings
  public abstract updateAppSettings(
    option: SettingsUpdateOption
  ): Partial<AppSettings>
}
