/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { State } from "App/core/constants"

export interface CrashDumpState {
  data: {
    files: string[]
    downloadedFiles: string[]
  }
  loadingState: State
  downloadingState: State
  sendingState: State
  error: Error | string | null
}
