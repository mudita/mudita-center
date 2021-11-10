/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import createMockStore from "redux-mock-store"
import thunk from "redux-thunk"
import { Event } from "App/crash-dump/constants"
import { setCrashDump, setDownloadedCrashDump } from "./base.action"

const mockStore = createMockStore([thunk])()

afterEach(() => {
  mockStore.clearActions()
})

describe("Action: setCrashDump", () => {
  test("fire action with files list and `SetCrashDump` type", () => {
    mockStore.dispatch(setCrashDump(["/pure/logs/crash-dumps/file.hex"]))
    expect(mockStore.getActions()).toEqual([
      {
        type: Event.SetCrashDump,
        payload: ["/pure/logs/crash-dumps/file.hex"],
      },
    ])
  })
})

describe("Action: setDownloadedCrashDump", () => {
  test("fire action with files list and `SetDownloadCrashDumpPath` type", () => {
    mockStore.dispatch(setDownloadedCrashDump(["C:/MuditaOs/crash-dumps"]))
    expect(mockStore.getActions()).toEqual([
      {
        type: Event.SetDownloadCrashDumpPath,
        payload: ["C:/MuditaOs/crash-dumps"],
      },
    ])
  })
})
