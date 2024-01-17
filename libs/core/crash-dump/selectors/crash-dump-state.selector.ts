/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ReduxRootState } from "Core/__deprecated__/renderer/store"
import { CrashDumpState } from "Core/crash-dump"

export const crashDumpStateSelector = (
  state: ReduxRootState
): CrashDumpState => state.crashDump
