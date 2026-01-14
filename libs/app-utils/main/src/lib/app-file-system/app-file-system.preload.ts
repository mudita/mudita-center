/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcRenderer } from "electron"
import {
  AppFileSystemArchiveOptions,
  AppFileSystemCalculateCrc32Options,
  AppFileSystemCpOptions,
  AppFileSystemExtractOptions,
  AppFileSystemFileStatsOptions,
  AppFileSystemGuardOptions,
  AppFileSystemIpcEvents,
  AppFileSystemMkdirOptions,
  AppFileSystemOpenDirectoryOptions,
  AppFileSystemPathExistsOptions,
  AppFileSystemReadDirOptions,
  AppFileSystemReadFileChunkOptions,
  AppFileSystemReadFileOptions,
  AppFileSystemRmOptions,
  AppFileSystemWriteFileChunkOptions,
  AppFileSystemWriteFileOptions,
  AppResult,
} from "app-utils/models"
import fs from "fs-extra"

export const appFileSystem = {
  rm: (options: AppFileSystemRmOptions): Promise<AppResult> => {
    return ipcRenderer.invoke(AppFileSystemIpcEvents.Rm, options)
  },
  mkdir: (options: AppFileSystemMkdirOptions): Promise<AppResult> => {
    return ipcRenderer.invoke(AppFileSystemIpcEvents.Mkdir, options)
  },
  archive: (options: AppFileSystemArchiveOptions): Promise<AppResult> => {
    return ipcRenderer.invoke(AppFileSystemIpcEvents.Archive, options)
  },
  writeFile: (
    options: AppFileSystemWriteFileOptions
  ): Promise<AppResult<string>> => {
    return ipcRenderer.invoke(AppFileSystemIpcEvents.WriteFile, options)
  },
  readFile: (
    options: AppFileSystemReadFileOptions
  ): Promise<AppResult<string>> => {
    return ipcRenderer.invoke(AppFileSystemIpcEvents.ReadFile, options)
  },
  readDir: (
    options: AppFileSystemReadDirOptions
  ): Promise<AppResult<string[]>> => {
    return ipcRenderer.invoke(AppFileSystemIpcEvents.ReadDir, options)
  },
  pathExists: (
    options: AppFileSystemPathExistsOptions
  ): Promise<AppResult<boolean>> => {
    return ipcRenderer.invoke(AppFileSystemIpcEvents.PathExists, options)
  },
  fileStats: (
    options: AppFileSystemFileStatsOptions
  ): Promise<AppResult<fs.Stats>> => {
    return ipcRenderer.invoke(AppFileSystemIpcEvents.FileStats, options)
  },
  calculateFileCrc32: (
    options: AppFileSystemCalculateCrc32Options
  ): Promise<AppResult<string>> => {
    return ipcRenderer.invoke(
      AppFileSystemIpcEvents.CalculateFileCrc32,
      options
    )
  },
  readFileChunk: (
    options: AppFileSystemReadFileChunkOptions
  ): Promise<AppResult<string>> => {
    return ipcRenderer.invoke(AppFileSystemIpcEvents.ReadFileChunk, options)
  },
  writeFileChunk: (
    options: AppFileSystemWriteFileChunkOptions
  ): Promise<AppResult> => {
    return ipcRenderer.invoke(AppFileSystemIpcEvents.WriteFileChunk, options)
  },
  extract: (
    options: AppFileSystemExtractOptions
  ): Promise<AppResult<string[]>> => {
    return ipcRenderer.invoke(AppFileSystemIpcEvents.Extract, options)
  },
  openDirectory: (
    options: AppFileSystemOpenDirectoryOptions
  ): Promise<void> => {
    return ipcRenderer.invoke(AppFileSystemIpcEvents.OpenDirectory, options)
  },
  getPath: (options: AppFileSystemGuardOptions): Promise<AppResult<string>> => {
    return ipcRenderer.invoke(AppFileSystemIpcEvents.GetPath, options)
  },
  cp: (options: AppFileSystemCpOptions): Promise<AppResult> => {
    return ipcRenderer.invoke(AppFileSystemIpcEvents.Cp, options)
  },
}
