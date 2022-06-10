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
} from "App/__deprecated__/main/store/settings.interface"

jest.mock("App/__deprecated__/main/store/settings.schema", () => ({
  applicationId: {
    default: "default-application-id",
  },
}))

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
  ignoredCrashDumps: [],
}

const defaultStore = {
  store: fakeAppSettings,
  reset: jest.fn(),
  set: jest.fn(),
  get: jest.fn(),
} as unknown as Store<AppSettings>

const subject = new AppSettingsService(defaultStore)

afterEach(() => {
  jest.clearAllMocks()
})

describe("`AppSettingsService`", () => {
  test("when `applicationId` property is undefined `init` sets default `applicationId`", () => {
    const store = {
      ...defaultStore,
      store: {
        applicationId: undefined,
      },
    } as unknown as Store<AppSettings>
    const subject = new AppSettingsService(store)
    subject.init()
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
    } as unknown as Store<AppSettings>
    const subject = new AppSettingsService(store)
    subject.init()
    expect(store.set).toHaveBeenCalledWith(
      "applicationId",
      "stored-application-id"
    )
  })

  test("`getAppSettings` return AppSettings", () => {
    expect(subject.getAppSettings()).toEqual(fakeAppSettings)
  })

  test("`resetAppSettings` cals reset methods ", () => {
    subject.resetAppSettings()
    expect(defaultStore.reset).toHaveBeenCalled()
  })

  test("`updateAppSettings` cals set and get methods ", () => {
    subject.updateAppSettings({
      key: "applicationId",
      value: "app-Nr8uiSV7KmWxX3WOFqZPF7uw",
    })
    expect(defaultStore.set).toHaveBeenCalled()
    expect(defaultStore.get).toHaveBeenCalled()
  })
})
