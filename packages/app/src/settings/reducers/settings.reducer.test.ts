/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

// import { AppError } from "App/core/errors"
import { SettingsEvent } from "App/settings/constants"
import {
  settingsReducer,
  initialState,
} from "App/settings/reducers/settings.reducer"
import {
  fulfilledAction,
  pendingAction,
} from "App/__deprecated__/renderer/store/helpers"
import { SettingsState } from "App/settings/reducers"
import { ConversionFormat, Convert } from "App/settings/constants"

const settings: Omit<
  SettingsState,
  "loaded" | "loading" | "updateAvailable" | "latestVersion"
> = {
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
  updateRequired: false,
  currentVersion: "1.4.1",
  lowestSupportedVersions: {
    lowestSupportedCenterVersion: "1.0.0",
    lowestSupportedProductVersion: {
      MuditaHarmony: "1.5.0",
      MuditaPure: "1.0.0",
    },
  },
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

describe("Functionality: set latest version", () => {
  test("Event: SetLatestVersion set `latestVersion` value", () => {
    expect(
      settingsReducer(undefined, {
        type: SettingsEvent.SetLatestVersion,
        payload: "1.0.0",
      })
    ).toEqual({
      ...initialState,
      latestVersion: "1.0.0",
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

describe("Functionality: toggle update available", () => {
  test("Event: ToggleUpdateAvailable/pending set loading state", () => {
    expect(
      settingsReducer(undefined, {
        type: pendingAction(SettingsEvent.ToggleUpdateAvailable),
      })
    ).toEqual({
      ...initialState,
      loading: true,
      loaded: false,
    })
  })

  test("Event: ToggleUpdateAvailable/fulfilled set updateAvailable value and changing loading state", () => {
    expect(
      settingsReducer(undefined, {
        type: fulfilledAction(SettingsEvent.ToggleUpdateAvailable),
        payload: true,
      })
    ).toEqual({
      ...initialState,
      updateAvailable: true,
      loading: false,
      loaded: true,
    })
    expect(
      settingsReducer(undefined, {
        type: fulfilledAction(SettingsEvent.ToggleUpdateAvailable),
        payload: false,
      })
    ).toEqual({
      ...initialState,
      updateAvailable: false,
      loading: false,
      loaded: true,
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

describe("Functionality: check for update", () => {
  test("Event: CheckUpdateAvailable/fulfilled set `updateAvailable` value", () => {
    expect(
      settingsReducer(
        {
          ...initialState,
          updateAvailable: true,
        },
        {
          type: fulfilledAction(SettingsEvent.CheckUpdateAvailable),
          payload: true,
        }
      )
    ).toEqual({
      ...initialState,
      updateAvailable: undefined,
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

describe("Functionality: conversion format", () => {
  test("Event: SetConversionFormat/fulfilled set `conversionFormat` value", () => {
    expect(
      settingsReducer(
        {
          ...initialState,
          conversionFormat: ConversionFormat.FLAC,
        },
        {
          type: fulfilledAction(SettingsEvent.SetConversionFormat),
          payload: ConversionFormat.MP3,
        }
      )
    ).toEqual({
      ...initialState,
      conversionFormat: ConversionFormat.MP3,
    })
  })
})

describe("Functionality: convert", () => {
  test("Event: SetConvert/fulfilled set `convert` value", () => {
    expect(
      settingsReducer(
        {
          ...initialState,
          convert: Convert.AlwaysAsk,
        },
        {
          type: fulfilledAction(SettingsEvent.SetConvert),
          payload: Convert.ConvertAutomatically,
        }
      )
    ).toEqual({
      ...initialState,
      convert: Convert.ConvertAutomatically,
    })
  })
})

describe("Functionality: non standard audio files conversion", () => {
  test("Event: SetNonStandardAudioFilesConversion/fulfilled set `nonStandardAudioFilesConversion` value", () => {
    expect(
      settingsReducer(
        {
          ...initialState,
          nonStandardAudioFilesConversion: false,
        },
        {
          type: fulfilledAction(
            SettingsEvent.SetNonStandardAudioFilesConversion
          ),
          payload: true,
        }
      )
    ).toEqual({
      ...initialState,
      nonStandardAudioFilesConversion: true,
    })
  })
})

describe("Functionality: os updates", () => {
  test("Event: SetOsUpdates/fulfilled set `osUpdates` value", () => {
    expect(
      settingsReducer(
        {
          ...initialState,
          osUpdates: false,
        },
        {
          type: fulfilledAction(SettingsEvent.SetOsUpdates),
          payload: true,
        }
      )
    ).toEqual({
      ...initialState,
      osUpdates: true,
    })
  })
})

describe("Functionality: low battery level", () => {
  test("Event: SetLowBattery/fulfilled set `lowBattery` value", () => {
    expect(
      settingsReducer(
        {
          ...initialState,
          lowBattery: false,
        },
        {
          type: fulfilledAction(SettingsEvent.SetLowBattery),
          payload: true,
        }
      )
    ).toEqual({
      ...initialState,
      lowBattery: true,
    })
  })
})

describe("Functionality: incoming messages", () => {
  test("Event: SetIncomingMessages/fulfilled set `incomingMessages` value", () => {
    expect(
      settingsReducer(
        {
          ...initialState,
          incomingMessages: false,
        },
        {
          type: fulfilledAction(SettingsEvent.SetIncomingMessages),
          payload: true,
        }
      )
    ).toEqual({
      ...initialState,
      incomingMessages: true,
    })
  })
})

describe("Functionality: incoming calls", () => {
  test("Event: SetIncomingCalls/fulfilled set `incomingCalls` value", () => {
    expect(
      settingsReducer(
        {
          ...initialState,
          incomingCalls: false,
        },
        {
          type: fulfilledAction(SettingsEvent.SetIncomingCalls),
          payload: true,
        }
      )
    ).toEqual({
      ...initialState,
      incomingCalls: true,
    })
  })
})
