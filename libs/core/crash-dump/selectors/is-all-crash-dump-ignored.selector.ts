/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createSelector } from "@reduxjs/toolkit"
import { settingsStateSelector } from "Core/settings/selectors"
import { crashDumpStateSelector } from "Core/crash-dump/selectors/crash-dump-state.selector"

export const isAllCrashDumpIgnoredSelector = createSelector(
  settingsStateSelector,
  crashDumpStateSelector,
  (settingsState, crashDumpState): boolean => {
    const { ignoredCrashDumps } = settingsState
    const { data } = crashDumpState
    return data.files.every((file) => ignoredCrashDumps.includes(file))
  }
)
