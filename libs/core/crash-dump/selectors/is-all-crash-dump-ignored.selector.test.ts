/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ReduxRootState } from "Core/__deprecated__/renderer/store"
import { isAllCrashDumpIgnoredSelector } from "Core/crash-dump/selectors/is-all-crash-dump-ignored.selector"

describe("`isAllCrashDumpIgnoredSelector` selector", () => {
  test("when both `settings` and `crashDump` have an empty list of files", () => {
    const state = {
      settings: {
        ignoredCrashDumps: [],
      },
      crashDump: {
        data: {
          files: [],
        },
      },
    } as unknown as ReduxRootState
    expect(isAllCrashDumpIgnoredSelector(state)).toBeTruthy()
  })

  test("when there are no crash dumps in `crashDump`", () => {
    const state = {
      settings: {
        ignoredCrashDumps: ["/pure/logs/crash-dumps/file.hex"],
      },
      crashDump: {
        data: {
          files: [],
        },
      },
    } as unknown as ReduxRootState
    expect(isAllCrashDumpIgnoredSelector(state)).toBeTruthy()
  })

  test("when any crash dump is not ignored in `settings`", () => {
    const state = {
      settings: {
        ignoredCrashDumps: [],
      },
      crashDump: {
        data: {
          files: ["/pure/logs/crash-dumps/file.hex"],
        },
      },
    } as unknown as ReduxRootState
    expect(isAllCrashDumpIgnoredSelector(state)).toBeFalsy()
  })

  test("when a single crash dump is ignored in `settings`", () => {
    const state = {
      settings: {
        ignoredCrashDumps: ["/pure/logs/crash-dumps/file.hex"],
      },
      crashDump: {
        data: {
          files: ["/pure/logs/crash-dumps/file.hex"],
        },
      },
    } as unknown as ReduxRootState
    expect(isAllCrashDumpIgnoredSelector(state)).toBeTruthy()
  })

  test("when `settings` and `crashDump` have non-overlapping files", () => {
    const state = {
      settings: {
        ignoredCrashDumps: ["/pure/logs/crash-dumps/ignored-file.hex"],
      },
      crashDump: {
        data: {
          files: ["/pure/logs/crash-dumps/file.hex"],
        },
      },
    } as unknown as ReduxRootState
    expect(isAllCrashDumpIgnoredSelector(state)).toBeFalsy()
  })

  test("when `settings` and `crashDump` have partially overlapping files", () => {
    const state = {
      settings: {
        ignoredCrashDumps: [
          "/pure/logs/crash-dumps/ignored-file.hex",
          "/pure/logs/crash-dumps/file.hex",
        ],
      },
      crashDump: {
        data: {
          files: [
            "/pure/logs/crash-dumps/file.hex",
            "/pure/logs/crash-dumps/other-file.hex",
          ],
        },
      },
    } as unknown as ReduxRootState
    expect(isAllCrashDumpIgnoredSelector(state)).toBeFalsy()
  })

  test("when `settings` and `crashDump` have completely overlapping files", () => {
    const state = {
      settings: {
        ignoredCrashDumps: [
          "/pure/logs/crash-dumps/file.hex",
          "/pure/logs/crash-dumps/other-file.hex",
        ],
      },
      crashDump: {
        data: {
          files: [
            "/pure/logs/crash-dumps/file.hex",
            "/pure/logs/crash-dumps/other-file.hex",
          ],
        },
      },
    } as unknown as ReduxRootState
    expect(isAllCrashDumpIgnoredSelector(state)).toBeTruthy()
  })
})
