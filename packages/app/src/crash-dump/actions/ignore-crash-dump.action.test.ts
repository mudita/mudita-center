/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import createMockStore from "redux-mock-store"
import thunk from "redux-thunk"
import { AnyAction } from "@reduxjs/toolkit"
import { ignoreCrashDumpRequest } from "App/crash-dump/requests/ignore-crash-dump.request"
import { ignoreCrashDump } from "./ignore-crash-dump.action"

jest.mock("App/crash-dump/requests/ignore-crash-dump.request")

describe("Crash dumps doesn't exists", () => {
  const mockStore = createMockStore([thunk])({
    crashDump: {
      data: {
        files: [],
      },
    },
  })

  afterEach(() => {
    mockStore.clearActions()
  })

  test("fire `ignoreCrashDump` action doesn't call `ignoreCrashDumpRequest`", async () => {
    const {
      meta: { requestId },
    } = await mockStore.dispatch(ignoreCrashDump() as unknown as AnyAction)

    expect(mockStore.getActions()).toEqual([
      ignoreCrashDump.pending(requestId),
      ignoreCrashDump.fulfilled(undefined, requestId),
    ])

    expect(ignoreCrashDumpRequest).toHaveBeenCalledTimes(0)
  })
})

describe("Crash dumps list isn't empty", () => {
  const mockStore = createMockStore([thunk])({
    crashDump: {
      data: {
        files: ["C:/MuditaOs/crash-dumps"],
      },
    },
  })

  afterEach(() => {
    mockStore.clearActions()
  })

  test("fire `ignoreCrashDump` action calls `ignoreCrashDumpRequest`, and dispatch `resetCrashDump`", async () => {
    const {
      meta: { requestId },
    } = await mockStore.dispatch(ignoreCrashDump() as unknown as AnyAction)

    expect(mockStore.getActions()).toEqual([
      ignoreCrashDump.pending(requestId),
      {
        payload: undefined,
        type: "RESET_CRASH_DUMP",
      },
      ignoreCrashDump.fulfilled(undefined, requestId),
    ])

    expect(ignoreCrashDumpRequest).toHaveBeenCalledTimes(1)
    expect(ignoreCrashDumpRequest).toHaveBeenLastCalledWith(
      "C:/MuditaOs/crash-dumps"
    )
  })
})
