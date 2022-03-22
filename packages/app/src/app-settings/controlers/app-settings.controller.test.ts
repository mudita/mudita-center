/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { AppSettingsController } from "App/app-settings/controlers/app-settings.controller"
import {
  AppSettings,
  ConversionFormat,
  Convert,
} from "App/main/store/settings.interface"
import { AppSettingsService } from "App/app-settings/services"

export const fakeAppSettings: AppSettings = {
  applicationId: "app-Nr8uiSV7KmWxX3WOFqZPF7uB",
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
  pureNeverConnected: true,
  appCollectingData: undefined,
  diagnosticSentTimestamp: 0,
}

const appSettingsService = {
  getAppSettings: jest.fn().mockReturnValue(fakeAppSettings),
  resetAppSettings: jest.fn(),
  updateAppSettings: jest.fn(),
} as unknown as AppSettingsService

const subject = new AppSettingsController(appSettingsService)

afterEach(() => {
  jest.clearAllMocks()
})

describe("`AppSettingsController`", () => {
  test("`getAppSettings` return AppSettings", () => {
    expect(subject.getAppSettings()).toEqual(fakeAppSettings)
  })
  test("`resetAppSettings` cals `resetAppSettings` method ", () => {
    subject.resetAppSettings()
    expect(appSettingsService.resetAppSettings).toHaveBeenCalled()
  })

  test("`updateAppSettings` cals `updateAppSettings` method ", () => {
    subject.updateAppSettings({
      key: "applicationId",
      value: "app-Nr8uiSV7KmWxX3WOFqZPF7uw",
    })
    expect(appSettingsService.updateAppSettings).toHaveBeenCalled()
  })
})
