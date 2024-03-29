/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { SettingsEvent } from "Core/settings/constants"
import {
  settingsReducer,
  initialState,
} from "Core/settings/reducers/settings.reducer"
import {
  fulfilledAction,
  pendingAction,
} from "Core/__deprecated__/renderer/store/helpers"
import { SettingsState } from "Core/settings/reducers"

const settings: SettingsState = {
  applicationId: "app-Nr8uiSV7KmWxX3WOFqZPF7uB",
  autostart: false,
  tethering: false,
  tray: true,
  osBackupLocation: `fake/path/pure/phone/backups/`,
  osDownloadLocation: `fake/path/pure/os/downloads/`,
  language: "en-US",
  neverConnected: true,
  collectingData: false,
  privacyPolicyAccepted: false,
  diagnosticSentTimestamp: 0,
  ignoredCrashDumps: [],
  updateRequired: false,
  currentVersion: "1.4.1",
  lowestSupportedVersions: {
    lowestSupportedCenterVersion: "1.0.0",
    lowestSupportedProductVersion: {
      MuditaHarmony: "1.5.0",
      MuditaPure: "1.0.0",
      APIDevice: "2.0.0",
    },
  },
  checkingForUpdate: false,
  checkingForUpdateFailed: false,
  loaded: false,
  loading: false,
  updateAvailable: undefined,
  latestVersion: undefined,
  updateAvailableSkipped: undefined,
  usbAccessRestartRequired: false,
}

test("empty event returns initial state", () => {
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  expect(settingsReducer(undefined, {} as any)).toEqual(initialState)
})

describe("Functionality: loading settings", () => {
  test("Event: LoadSettings/pending set loading state", () => {
    expect(
      settingsReducer(undefined, {
        type: pendingAction(SettingsEvent.LoadSettings),
      })
    ).toEqual({
      ...initialState,
      loaded: false,
      loading: true,
    })
  })

  test("Event: SetSettings set settings object and change loading state", () => {
    expect(
      settingsReducer(undefined, {
        type: SettingsEvent.SetSettings,
        payload: settings,
      })
    ).toEqual({
      ...initialState,
      ...settings,
      loaded: true,
      loading: false,
    })
  })
})

describe("Functionality: toggle tethering", () => {
  test("Event: ToggleTethering/fulfilled set `tethering` value", () => {
    expect(
      settingsReducer(undefined, {
        type: fulfilledAction(SettingsEvent.ToggleTethering),
        payload: true,
      })
    ).toEqual({
      ...initialState,
      tethering: true,
    })
    expect(
      settingsReducer(undefined, {
        type: fulfilledAction(SettingsEvent.ToggleTethering),
        payload: false,
      })
    ).toEqual({
      ...initialState,
      tethering: false,
    })
  })
})

describe("Functionality: toggle data collection", () => {
  test("Event: ToggleCollectionData/fulfilled set `collectingData` value", () => {
    expect(
      settingsReducer(undefined, {
        type: fulfilledAction(SettingsEvent.ToggleCollectionData),
        payload: true,
      })
    ).toEqual({
      ...initialState,
      collectingData: true,
    })
    expect(
      settingsReducer(undefined, {
        type: fulfilledAction(SettingsEvent.ToggleCollectionData),
        payload: false,
      })
    ).toEqual({
      ...initialState,
      collectingData: false,
    })
  })
})

describe("Functionality: diagnostic data timestamp", () => {
  test("Event: SetDiagnosticTimestamp/fulfilled set `diagnosticSentTimestamp` value", () => {
    const timestamp = new Date().getDate()

    expect(
      settingsReducer(
        {
          ...initialState,
          diagnosticSentTimestamp: 0,
        },
        {
          type: fulfilledAction(SettingsEvent.SetDiagnosticTimestamp),
          payload: timestamp,
        }
      )
    ).toEqual({
      ...initialState,
      diagnosticSentTimestamp: timestamp,
    })
  })
})

describe("Functionality: os backup location", () => {
  test("Event: SetOsBackupLocation/fulfilled set `osBackupLocation` value", () => {
    expect(
      settingsReducer(
        {
          ...initialState,
          osBackupLocation: "/path/#1",
        },
        {
          type: fulfilledAction(SettingsEvent.SetOsBackupLocation),
          payload: "/path/#2",
        }
      )
    ).toEqual({
      ...initialState,
      osBackupLocation: "/path/#2",
    })
  })
})
