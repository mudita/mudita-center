/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { renderHook, waitFor } from "@testing-library/react"
import { useHelpSearch } from "Core/__deprecated__/renderer/utils/hooks/use-help-search/use-help-search"
import {
  testSeed,
  testQuestion,
  testSeedCollectionIds,
} from "Core/__deprecated__/seeds/help"
import { Settings } from "Core/settings/dto"

export const fakeAppSettings: Settings = {
  applicationId: "app-Nr8uiSV7KmWxX3WOFqZPF7uB",
  autostart: false,
  tethering: false,
  incomingCalls: false,
  incomingMessages: false,
  lowBattery: false,
  osUpdates: false,
  tray: true,
  osBackupLocation: `fake/path/pure/phone/backups/`,
  osDownloadLocation: `fake/path/pure/os/downloads/`,
  language: "en-US",
  neverConnected: true,
  collectingData: undefined,
  privacyPolicyAccepted: false,
  diagnosticSentTimestamp: 0,
  ignoredCrashDumps: [],
  usbAccessRestartRequired: false,
}

jest.mock("lodash/debounce", () => (fn: unknown) => fn)

const onLine = jest.spyOn(window.navigator, "onLine", "get")
const mockOnlineStatus = () => onLine.mockReturnValue(true)
const saveToStore = jest.fn()
const getStoreData = jest.fn()

const mockOnlineScenario = () => {
  mockOnlineStatus()
  getStoreData.mockReturnValue(testSeed.data)
}

const renderer = () => {
  return renderHook(() => useHelpSearch(saveToStore, getStoreData))
}

describe("Online scenario", () => {
  beforeEach(() => mockOnlineScenario())
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
    await waitFor(() => {
      result.current.searchQuestion(testQuestion.substring(0, 10))
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
