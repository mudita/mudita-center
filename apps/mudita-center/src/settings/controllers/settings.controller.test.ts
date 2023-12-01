/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { SettingsController } from "App/settings/controllers/settings.controller"
import { ConversionFormat, Convert } from "App/settings/constants"
import { Settings } from "App/settings/dto"
import { SettingsService } from "App/settings/services"

export const fakeSettings: Settings = {
  applicationId: "app-Nr8uiSV7KmWxX3WOFqZPF7uB",
  autostart: false,
  tethering: false,
  incomingCalls: false,
  incomingMessages: false,
  lowBattery: false,
  osUpdates: false,
  nonStandardAudioFilesConversion: false,
  convert: Convert.ConvertAutomatically,
  conversionFormat: ConversionFormat.WAV,
  tray: true,
  osBackupLocation: `fake/path/pure/phone/backups/`,
  osDownloadLocation: `fake/path/pure/os/downloads/`,
  language: "en-US",
  neverConnected: true,
  collectingData: false,
  privacyPolicyAccepted: false,
  diagnosticSentTimestamp: 0,
  ignoredCrashDumps: [],
}

const settingsService = {
  getSettings: jest.fn().mockReturnValue(fakeSettings),
  resetSettings: jest.fn(),
  updateSettings: jest.fn(),
} as unknown as SettingsService

const subject = new SettingsController(settingsService)

afterEach(() => {
  jest.clearAllMocks()
})

describe("`SettingsController`", () => {
  test("`getSettings` return Settings", () => {
    expect(subject.getSettings()).toEqual(fakeSettings)
  })
  test("`resetSettings` calls `resetAppSettings` method ", () => {
    subject.resetSettings()
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(settingsService.resetSettings).toHaveBeenCalled()
  })

  test("`updateSettings` calls `settingsService.updateSettings` method ", () => {
    subject.updateSettings({
      key: "applicationId",
      value: "app-Nr8uiSV7KmWxX3WOFqZPF7uw",
    })
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(settingsService.updateSettings).toHaveBeenCalled()
  })
})
