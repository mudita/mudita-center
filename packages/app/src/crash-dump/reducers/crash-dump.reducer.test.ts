/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  crashDumpReducer,
  initialState,
} from "App/crash-dump/reducers/crash-dump.reducer"
import {
  rejectedAction,
  fulfilledAction,
  pendingAction,
} from "App/__deprecated__/renderer/store/helpers"
import { Event } from "App/crash-dump/constants"
import {
  GetCrashDumpError,
  DownloadCrashDumpError,
} from "App/crash-dump/errors"

test("empty event returns initial state", () => {
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
      status: {
        ...initialState.status,
        loading: true,
        loaded: false,
      },
    })
  })

  test("Event: GetCrashDump/fulfilled set loading state", () => {
    expect(
      crashDumpReducer(undefined, {
        type: fulfilledAction(Event.GetCrashDump),
      })
    ).toEqual({
      ...initialState,
      status: {
        ...initialState.status,
        loading: false,
        loaded: true,
      },
    })
  })

  test("Event: GetCrashDump/rejected set loading state and error", () => {
    const errorMock = new GetCrashDumpError("I'm error")

    expect(
      crashDumpReducer(undefined, {
        type: rejectedAction(Event.GetCrashDump),
        payload: errorMock,
      })
    ).toEqual({
      ...initialState,
      status: {
        ...initialState.status,
        loading: false,
        loaded: false,
      },
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
      status: {
        ...initialState.status,
        downloading: true,
        downloaded: false,
      },
    })
  })

  test("Event: DownloadCrashDump/fulfilled set loading state", () => {
    expect(
      crashDumpReducer(undefined, {
        type: fulfilledAction(Event.DownloadCrashDump),
      })
    ).toEqual({
      ...initialState,
      status: {
        ...initialState.status,
        downloading: false,
        downloaded: true,
      },
    })
  })

  test("Event: DownloadCrashDump/rejected set loading state and error", () => {
    const errorMock = new DownloadCrashDumpError("I'm error")

    expect(
      crashDumpReducer(undefined, {
        type: rejectedAction(Event.DownloadCrashDump),
        payload: errorMock,
      })
    ).toEqual({
      ...initialState,
      status: {
        ...initialState.status,
        downloading: false,
        downloaded: false,
      },
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
      status: {
        ...initialState.status,
        sending: true,
        sent: false,
      },
    })
  })

  test("Event: SendCrashDump/fulfilled set crash dump `sent` state to `true`", () => {
    expect(
      crashDumpReducer(undefined, {
        type: fulfilledAction(Event.SendCrashDump),
      })
    ).toEqual({
      ...initialState,
      status: {
        ...initialState.status,
        sending: false,
        sent: true,
      },
    })
  })

  test("Event: SendCrashDump/rejected set crash dump `sent` and `sending` state to `false`", () => {
    expect(
      crashDumpReducer(undefined, {
        type: rejectedAction(Event.SendCrashDump),
      })
    ).toEqual({
      ...initialState,
      status: {
        ...initialState.status,
        sending: false,
        sent: false,
      },
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
