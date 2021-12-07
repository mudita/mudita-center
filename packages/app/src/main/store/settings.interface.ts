/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

export enum Convert {
  AlwaysAsk = "Always ask",
  ConvertAutomatically = "Convert automatically",
}

export enum ConversionFormat {
  FLAC = "FLAC",
  WAV = "WAV",
  MP3 = "MP3",
}

export interface SettingsUpdateOption {
  key: AppSettings[string]
  value: unknown
}

export interface AppConfiguration extends Record<string, any> {
  lowestSupportedOsVersion: string | undefined
  lowestSupportedCenterVersion: string | undefined
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
  pureFilesLocation: string
  pureOsDownloadLocation: string
  language: string
  pureNeverConnected: boolean
  appCollectingData: boolean | undefined
  diagnosticSentTimestamp: number
}

export interface SettingsState extends Partial<AppSettings>, AppConfiguration {
  appUpdateAvailable: boolean | undefined
  settingsLoaded: boolean
  appLatestVersion: string
}
