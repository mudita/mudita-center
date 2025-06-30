/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  AppFileSystemScope,
  AppFileSystemScopeOptions,
} from "./app-file-system"

export const APP_LOGGER_SCOPE: AppFileSystemScope = "userData" as const
export const APP_LOGGER_SCOPE_RELATIVE_PATH = "new-logs" as const

export interface AggregateLogsToFileOptions extends AppFileSystemScopeOptions {
  maxSizeInBytes: number
}
