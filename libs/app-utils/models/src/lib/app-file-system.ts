/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { WriteFileOptions } from "fs-extra"

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

export interface AppFileSystemMkdirOptions extends AppFileSystemScopeOptions {
  options?: {
    recursive?: boolean | undefined
  }
}

export interface AppFileSystemArchiveOptions extends AppFileSystemScopeOptions {
  scopeDestinationPath: string
}

export interface AppFileSystemWriteOptions extends AppFileSystemScopeOptions {
  data: string
  options?: WriteFileOptions | BufferEncoding | string
}
