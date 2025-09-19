/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

export type AppFileSystemScope = "userData" | "temp"

export interface AppFileSystemScopeOptions {
  scopeRelativePath: string | string[]
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

export interface AppFileSystemWriteFileOptions
  extends AppFileSystemScopeOptions {
  options?: {
    encoding?: BufferEncoding | string
    writeAsJson?: boolean
  }
  data: Buffer | Record<string, unknown>
}

export type AppFileSystemPathExistsOptions = AppFileSystemScopeOptions
export type AppFileSystemFileStatsOptions = AppFileSystemScopeOptions
export type AppFileSystemCalculateCrc32Options = AppFileSystemScopeOptions

export type AppFileSystemReadFileChunkOptions = AppFileSystemScopeOptions & {
  chunkSize: number
  chunkNo?: number
}