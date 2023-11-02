/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { act, renderHook, waitFor } from "@testing-library/react"
import { useHelpSearch } from "App/__deprecated__/renderer/utils/hooks/use-help-search/use-help-search"
import { ipcRenderer } from "electron-better-ipc"
import { HelpActions } from "App/__deprecated__/common/enums/help-actions.enum"
import {
  testSeed,
  testQuestion,
  testSeedCollectionIds,
} from "App/__deprecated__/seeds/help"
import { ConversionFormat, Convert } from "App/settings/constants"
import { Settings } from "App/settings/dto"

export const fakeAppSettings: Settings = {
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
  collectingData: undefined,
  privacyPolicyAccepted: false,
  diagnosticSentTimestamp: 0,
  ignoredCrashDumps: [],
}

const mockIpc = () => {
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
  ;(ipcRenderer as any).__rendererCalls = {
    [HelpActions.DownloadContentfulData]: Promise.resolve({
      ...testSeed,
    }),
  }
}

jest.mock("lodash/debounce", () => (fn: unknown) => fn)

const onLine = jest.spyOn(window.navigator, "onLine", "get")
const mockOnlineStatus = () => onLine.mockReturnValue(true)
const saveToStore = jest.fn()
const getStoreData = jest.fn()

const mockOnlineScenario = () => {
  mockOnlineStatus()
  mockIpc()
  getStoreData.mockReturnValue(testSeed.data)
}

const renderer = () => {
  return renderHook(() => useHelpSearch(saveToStore, getStoreData))
}

describe("Online scenario", () => {
  beforeEach(() => mockOnlineScenario())
  afterEach(() => {
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
    ;(ipcRenderer as any).__rendererCalls = {}
  })
  test("return correct amount of data", async () => {
    const { result } = renderer()
    await waitFor(() => {
      expect(result.current.data.collection).toHaveLength(
        testSeed.data.collection.length
      )
    })
  })

  test("callback works", async () => {
    renderer()
    await waitFor(() => {
      expect(saveToStore).toBeCalled()
    })
  })

  test("search works", async () => {
    const { result } = renderer()
    act(async () => {
      await waitFor(() => {
        result.current.searchQuestion(testQuestion.substring(0, 10))
      })
    })
    await waitFor(() => {
      expect(result.current.data.collection).toHaveLength(1)
    })
  })

  test("collection contains desired ids", async () => {
    const { result } = renderer()
    await waitFor(() => {
      expect(result.current.data.collection).toEqual(testSeedCollectionIds)
    })
  })
})
