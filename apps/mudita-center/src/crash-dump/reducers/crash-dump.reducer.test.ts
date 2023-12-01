/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { AppError } from "App/core/errors"
import { State } from "App/core/constants"
import { CrashDumpError, Event } from "App/crash-dump/constants"
import {
  crashDumpReducer,
  initialState,
} from "App/crash-dump/reducers/crash-dump.reducer"
import {
  fulfilledAction,
  pendingAction,
  rejectedAction,
} from "App/__deprecated__/renderer/store/helpers"

test("empty event returns initial state", () => {
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  expect(crashDumpReducer(undefined, {} as any)).toEqual(initialState)
})

describe("Getting crush dumps functionality", () => {
  test("Event: GetCrashDump/pending set loading state", () => {
    expect(
      crashDumpReducer(undefined, {
        type: pendingAction(Event.GetCrashDump),
      })
    ).toEqual({
      ...initialState,
      loadingState: State.Loading,
    })
  })

  test("Event: GetCrashDump/fulfilled set loading state", () => {
    expect(
      crashDumpReducer(undefined, {
        type: fulfilledAction(Event.GetCrashDump),
      })
    ).toEqual({
      ...initialState,
      loadingState: State.Loaded,
    })
  })

  test("Event: GetCrashDump/rejected set loading state and error", () => {
    const errorMock = new AppError(CrashDumpError.Getting, "I'm error")

    expect(
      crashDumpReducer(undefined, {
        type: rejectedAction(Event.GetCrashDump),
        payload: errorMock,
      })
    ).toEqual({
      ...initialState,
      loadingState: State.Failed,
      error: errorMock,
    })
  })

  test("Event: SetCrashDump set crash dump list from devices", () => {
    expect(
      crashDumpReducer(undefined, {
        type: Event.SetCrashDump,
        payload: ["/pure/logs/crash-dumps/file.hex"],
      })
    ).toEqual({
      ...initialState,
      data: {
        ...initialState.data,
        files: ["/pure/logs/crash-dumps/file.hex"],
      },
    })
  })
})

describe("Downloading crush dumps functionality", () => {
  test("Event: DownloadCrashDump/pending set loading state", () => {
    expect(
      crashDumpReducer(undefined, {
        type: pendingAction(Event.DownloadCrashDump),
      })
    ).toEqual({
      ...initialState,
      downloadingState: State.Loading,
    })
  })

  test("Event: DownloadCrashDump/fulfilled set loading state", () => {
    expect(
      crashDumpReducer(undefined, {
        type: fulfilledAction(Event.DownloadCrashDump),
      })
    ).toEqual({
      ...initialState,
      downloadingState: State.Loaded,
    })
  })

  test("Event: DownloadCrashDump/rejected set loading state and error", () => {
    const errorMock = new AppError(CrashDumpError.Downloading, "I'm error")

    expect(
      crashDumpReducer(undefined, {
        type: rejectedAction(Event.DownloadCrashDump),
        payload: errorMock,
      })
    ).toEqual({
      ...initialState,
      downloadingState: State.Failed,
      error: errorMock,
    })
  })

  test("Event: SetCrashDump set crash dump list from devices", () => {
    expect(
      crashDumpReducer(undefined, {
        type: Event.SetDownloadCrashDumpPath,
        payload: ["C:/MuditaOs/crash-dumps"],
      })
    ).toEqual({
      ...initialState,
      data: {
        ...initialState.data,
        downloadedFiles: ["C:/MuditaOs/crash-dumps"],
      },
    })
  })

  test("Event: SendCrashDump/pending set crash dump `sending` state to `true`", () => {
    expect(
      crashDumpReducer(undefined, {
        type: pendingAction(Event.SendCrashDump),
      })
    ).toEqual({
      ...initialState,
      sendingState: State.Loading,
    })
  })

  test("Event: SendCrashDump/fulfilled set crash dump `sent` state to `true`", () => {
    expect(
      crashDumpReducer(undefined, {
        type: fulfilledAction(Event.SendCrashDump),
      })
    ).toEqual({
      ...initialState,
      sendingState: State.Loaded,
    })
  })

  test("Event: SendCrashDump/rejected set crash dump `sent` and `sending` state to `false`", () => {
    const errorMock = new AppError(CrashDumpError.Sending, "I'm error")

    expect(
      crashDumpReducer(undefined, {
        type: rejectedAction(Event.SendCrashDump),
        payload: errorMock,
      })
    ).toEqual({
      ...initialState,
      sendingState: State.Failed,
      error: errorMock,
    })
  })

  test("Event: ResetCrashDump set crash dump state to initial", () => {
    expect(
      crashDumpReducer(undefined, {
        type: Event.ResetCrashDump,
        payload: undefined,
      })
    ).toEqual(initialState)
  })
})
