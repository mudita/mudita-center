/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

export type AppFileSystemScope = "userData" | "temp"

export interface RelativeScopeOptions {
  scopeRelativePath: string | string[]
  scope?: AppFileSystemScope
}

export interface AbsolutePathWithGrantOptions {
  fileAbsolutePath: string | string[]
  webContentsId: number
}

export interface AppFileSystemGuardOptions
  extends Partial<RelativeScopeOptions>,
    Partial<AbsolutePathWithGrantOptions> {
  absolute?: boolean
}

export interface AppFileSystemRmOptions extends AppFileSystemGuardOptions {
  options?: {
    force?: boolean | undefined
    maxRetries?: number | undefined
    recursive?: boolean | undefined
    retryDelay?: number | undefined
  }
}

export interface AppFileSystemMkdirOptions extends AppFileSystemGuardOptions {
  options?: {
    recursive?: boolean | undefined
  }
}

export interface AppFileSystemArchiveOptions extends AppFileSystemGuardOptions {
  scopeDestinationPath: string
}

export interface AppFileSystemWriteFileOptions
  extends AppFileSystemGuardOptions {
  options?: {
    encoding?: BufferEncoding | string
    writeAsJson?: boolean
  }
  data: Buffer | Record<string, unknown>
}
export type AppFileSystemReadFileOptions = AppFileSystemGuardOptions
export type AppFileSystemPathExistsOptions = AppFileSystemGuardOptions
export type AppFileSystemFileStatsOptions = AppFileSystemGuardOptions
export type AppFileSystemCalculateCrc32Options = AppFileSystemGuardOptions

export type AppFileSystemReadFileChunkOptions = AppFileSystemGuardOptions & {
  chunkSize: number
  chunkNo?: number
}

export type AppFileSystemWriteFileChunkOptions = AppFileSystemGuardOptions & {
  chunkSize: number
  chunkNo?: number
  data: Buffer
}

export type AppFileSystemExtractOptions = AppFileSystemGuardOptions & {
  scopeDestinationPath?: string | string[]
}
