/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

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
  appCollectingData: boolean | undefined
}

export interface StoreValues extends AppSettings {
  appUpdateAvailable: boolean | undefined
  appUpdateStepModalDisplayed: boolean
  settingsLoaded: boolean
}
