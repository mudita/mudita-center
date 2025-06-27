/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

export type AppFileSystemScope = "userData" | "temp"

export interface AppFileSystemScopeOptions {
  scopeRelativePath: string
  scope?: AppFileSystemScope
}

export interface AppFileSystemRmOptions extends AppFileSystemScopeOptions {
  options?: {
    force?: boolean | undefined
    maxRetries?: number | undefined
    recursive?: boolean | undefined
    retryDelay?: number | undefined
  }
}

export interface AppFileSystemArchiveOptions extends AppFileSystemScopeOptions {
  scopeDestinationPath: string
}
