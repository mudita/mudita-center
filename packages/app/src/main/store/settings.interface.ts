import {
  ConversionFormat,
  Convert,
} from "Renderer/components/rest/settings/audio-conversion-radio-group.enum"

export interface SettingsUpdateOption {
  key: AppSettings[string]
  value: unknown
}

export interface AppSettings extends Record<string, any> {
  appAutostart: boolean
  appTethering: boolean
  appIncomingCalls: boolean
  appIncomingMessages: boolean
  appLowBattery: boolean
  appOsUpdates: boolean
  appNonStandardAudioFilesConversion: boolean
  appConvert: Convert
  appConversionFormat: ConversionFormat
  appTray: boolean
  pureOsBackupLocation: string
  pureOsDownloadLocation: string
  language: string
  pureNeverConnected: boolean
}
