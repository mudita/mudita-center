/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

export type AppFileSystemScope = "userData" | "temp"

export interface AppFileSystemRmOptions {
  scopeRelativePath: string
  options?: {
    force?: boolean | undefined
    maxRetries?: number | undefined
    recursive?: boolean | undefined
    retryDelay?: number | undefined
  }
  scope?: AppFileSystemScope
}
