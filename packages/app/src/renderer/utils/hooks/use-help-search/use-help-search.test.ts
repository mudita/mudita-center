/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { act, renderHook } from "@testing-library/react-hooks"
import { useHelpSearch } from "Renderer/utils/hooks/use-help-search/use-help-search"
import { ipcRenderer } from "electron-better-ipc"
import { HelpActions } from "Common/enums/help-actions.enum"
import { testSeed, testQuestion, testSeedCollectionIds } from "App/seeds/help"
import { defaultHelpItems } from "App/main/store/default-help-items"
import { IpcAppSettingsRequest } from "App/app-settings/constants"
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

const mockIpc = () => {
  ;(ipcRenderer as any).__rendererCalls = {
    [HelpActions.DownloadContentfulData]: Promise.resolve({
      ...testSeed,
    }),
    [IpcAppSettingsRequest.Get]: Promise.resolve(fakeAppSettings),
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
    ;(ipcRenderer as any).__rendererCalls = {}
  })
  test("return correct amount of data", async () => {
    const { result, waitForNextUpdate } = renderer()
    await waitForNextUpdate()
    expect(result.current.data.collection).toHaveLength(
      testSeed.data.collection.length
    )
  })

  test("callback works", async () => {
    const { waitForNextUpdate } = renderer()
    await waitForNextUpdate()
    expect(saveToStore).toBeCalled()
  })

  test("search works", async () => {
    const { result, waitForNextUpdate } = renderer()
    await waitForNextUpdate()
    act(() => {
      result.current.searchQuestion(testQuestion.substring(0, 10))
    })
    expect(result.current.data.collection).toHaveLength(1)
  })

  test("collection contains desired ids", async () => {
    const { result, waitForNextUpdate } = renderer()
    await waitForNextUpdate()
    expect(result.current.data.collection).toEqual(testSeedCollectionIds)
  })
})

test("returns default data when offline", async () => {
  onLine.mockReturnValue(false)
  const { result, waitForNextUpdate } = renderHook(() =>
    useHelpSearch(saveToStore, getStoreData)
  )
  await waitForNextUpdate()
  expect(result.current.data.collection).toHaveLength(
    defaultHelpItems.collection.length
  )
})
