/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import Store from "electron-store"
import { SettingsService } from "App/settings/services/settings.service"
import { Settings } from "App/settings/dto"
import { ConversionFormat, Convert } from "App/settings/constants"

jest.mock("App/settings/store/schemas", () => ({
  settingsSchema: {
    applicationId: {
      default: "default-application-id",
    },
  },
}))

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
  diagnosticSentTimestamp: 0,
  ignoredCrashDumps: [],
}

const defaultStore = {
  store: fakeSettings,
  reset: jest.fn(),
  set: jest.fn(),
  get: jest.fn(),
} as unknown as Store<Settings>

const subject = new SettingsService(defaultStore)

afterEach(() => {
  jest.clearAllMocks()
})

describe("`SettingsService`", () => {
  test("when `applicationId` property is undefined `init` sets default `applicationId`", () => {
    const store = {
      ...defaultStore,
      store: {
        applicationId: undefined,
      },
    } as unknown as Store<Settings>
    const subject = new SettingsService(store)
    subject.init()
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(store.set).toHaveBeenCalledWith(
      "applicationId",
      "default-application-id"
    )
  })
  test("when `applicationId` property isn't undefined a new `applicationId` isn't created", () => {
    const store = {
      ...defaultStore,
      store: {
        applicationId: "stored-application-id",
      },
    } as unknown as Store<Settings>
    const subject = new SettingsService(store)
    subject.init()
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(store.set).toHaveBeenCalledWith(
      "applicationId",
      "stored-application-id"
    )
  })

  test("`getSettings` return Settings", () => {
    expect(subject.getSettings()).toEqual(fakeSettings)
  })

  test("`resetSettings` calls reset methods ", () => {
    subject.resetSettings()
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(defaultStore.reset).toHaveBeenCalled()
  })

  test("`updateSettings` calls set and get methods ", () => {
    subject.updateSettings({
      key: "applicationId",
      value: "app-Nr8uiSV7KmWxX3WOFqZPF7uw",
    })
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(defaultStore.set).toHaveBeenCalled()
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(defaultStore.get).toHaveBeenCalled()
  })
})
