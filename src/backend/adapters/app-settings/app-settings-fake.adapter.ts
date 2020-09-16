import AppSettingsAdapter from "./app-settings-adapter.class"
import {
  ConversionFormat,
  Convert,
} from "Renderer/components/rest/settings/audio-conversion-radio-group.enum"
import {
  AppSettings,
  SettingsUpdateOption,
} from "App/main/store/settings.interface"

export const fakeAppSettings: AppSettings = {
  appAutostart: false,
  appTethering: false,
  appIncomingCalls: false,
  appIncomingMessages: false,
  appLowBattery: false,
  appOsUpdates: false,
  appNonStandardAudioFilesConversion: false,
  appConvert: Convert.ConvertAutomatically,
  appConversionFormat: ConversionFormat.WAV,
  appTray: true,
  pureOsBackupLocation: `fake/path/pure/phone/backups/`,
  pureOsDownloadLocation: `fake/path/pure/os/downloads/`,
  language: "en-US",
}

class AppSettingsFake extends AppSettingsAdapter {
  private settings: AppSettings
  private readonly updateOption: SettingsUpdateOption

  constructor(updateOption: SettingsUpdateOption) {
    super()
    this.updateOption = updateOption
    this.settings = fakeAppSettings
  }

  getAppSettings(): AppSettings {
    return this.settings
  }

  resetAppSettings(): AppSettings {
    this.settings = fakeAppSettings
    return this.settings
  }

  updateAppSettings(): Partial<AppSettings> {
    const { key, value } = this.updateOption
    this.settings[key] = value
    return this.settings[key]
  }
}

const createFakeAppSettingsAdapter = (
  updateOption: SettingsUpdateOption
): AppSettingsAdapter => new AppSettingsFake(updateOption)

export default createFakeAppSettingsAdapter
