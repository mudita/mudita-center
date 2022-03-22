/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import Store from "electron-store"
import { AppSettingsService } from "App/app-settings/services/app-settings.service"
import {
  AppSettings,
  ConversionFormat,
  Convert,
} from "App/main/store/settings.interface"

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

const store = {
  store: fakeAppSettings,
  reset: jest.fn(),
  set: jest.fn(),
  get: jest.fn(),
} as unknown as Store<AppSettings>

const subject = new AppSettingsService(store)

afterEach(() => {
  jest.clearAllMocks()
})

describe("`AppSettingsService`", () => {
  test("`getAppSettings` return AppSettings", () => {
    expect(subject.getAppSettings()).toEqual(fakeAppSettings)
  })
  test("`resetAppSettings` cals reset methods ", () => {
    subject.resetAppSettings()
    expect(store.reset).toHaveBeenCalled()
  })

  test("`updateAppSettings` cals set and get methods ", () => {
    subject.updateAppSettings({
      key: "applicationId",
      value: "app-Nr8uiSV7KmWxX3WOFqZPF7uw",
    })
    expect(store.set).toHaveBeenCalled()
    expect(store.get).toHaveBeenCalled()
  })
})
