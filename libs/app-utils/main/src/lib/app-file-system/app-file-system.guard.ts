/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { app } from "electron"
import fs from "fs-extra"
import path from "path"
import {
  AbsolutePathWithGrantOptions,
  AppFileSystemGuardOptions,
  RelativeScopeOptions,
} from "app-utils/models"
import { AppSettingsServiceModel } from "app-settings/models"

const isScopedOptions = (
  options: AppFileSystemGuardOptions
): options is AppFileSystemGuardOptions & RelativeScopeOptions =>
  typeof (options as RelativeScopeOptions).scopeRelativePath !== "undefined" &&
  options.absolute !== true

const isAbsoluteOptions = (
  options: AppFileSystemGuardOptions
): options is AppFileSystemGuardOptions & AbsolutePathWithGrantOptions =>
  options.absolute === true &&
  typeof (options as AbsolutePathWithGrantOptions).fileAbsolutePath !==
    "undefined"

export class AppFileSystemGuard {
  constructor(private appSettingsService: AppSettingsServiceModel) {}

  private grantedPathsMap = new Map<number, Set<string>>()

  grant(webContentsId: number, selectedPaths: string[]): void {
    if (!Number.isInteger(webContentsId) || webContentsId <= 0) {
      console.warn(
        `[AppFileSystemGuard] grant called with invalid webContentsId: ${webContentsId}`
      )
      return
    }

    const grantedPaths =
      this.grantedPathsMap.get(webContentsId) ?? new Set<string>()

    for (const selectedPath of selectedPaths) {
      try {
        grantedPaths.add(this.resolveRealPath(selectedPath))
      } catch {
        // Ignore non-existent/inaccessible at grant time
      }
    }
    this.grantedPathsMap.set(webContentsId, grantedPaths)
  }

  resolveSafePath(options: AppFileSystemGuardOptions): string {
    if (isScopedOptions(options)) {
      return this.resolveScopedSafePath(options)
    }

    if (isAbsoluteOptions(options)) {
      return this.resolveAbsoluteSafePath(options)
    }

    throw new Error(
      "Invalid options: provide either 'scopeRelativePath' (scoped mode) or 'absolute: true' with 'fileAbsolutePath' and 'webContentsId' (absolute mode)"
    )
  }

  private resolveScopedSafePath({
    scopeRelativePath,
    scope = "userData",
  }: RelativeScopeOptions): string {
    const scopeDirectory = app.getPath(scope)

    const pathInput = Array.isArray(scopeRelativePath)
      ? path.join(...scopeRelativePath)
      : scopeRelativePath

    const filePath = path.resolve(scopeDirectory, pathInput)

    if (!filePath.startsWith(scopeDirectory)) {
      throw new Error(`File Path escapes the scope: ${scopeRelativePath}`)
    }

    return filePath
  }

  private resolveAbsoluteSafePath(
    options: AbsolutePathWithGrantOptions
  ): string {
    const absoluteInput = Array.isArray(options.fileAbsolutePath)
      ? path.join(...options.fileAbsolutePath)
      : options.fileAbsolutePath

    if (!path.isAbsolute(absoluteInput)) {
      throw new Error("fileAbsolutePath must be an absolute path")
    }

    if (
      !Number.isInteger(options.webContentsId) ||
      options.webContentsId <= 0
    ) {
      throw new Error("webContentsId must be a positive integer")
    }

    if (
      !this.hasGrantedAccess({
        fileAbsolutePath: absoluteInput,
        webContentsId: options.webContentsId,
      })
    ) {
      throw new Error(`Path not granted for this window: ${absoluteInput}`)
    }
    return absoluteInput
  }

  private hasGrantedAccess(options: AbsolutePathWithGrantOptions): boolean {
    // Always allow access to certain locations, e.g. backup location
    if (
      [this.appSettingsService.get("user.backupLocation")].some((p) => {
        const checkedPath = Array.isArray(options.fileAbsolutePath)
          ? path.join(...options.fileAbsolutePath)
          : options.fileAbsolutePath
        return checkedPath.startsWith(p)
      })
    ) {
      return true
    }

    const grantedPathsSet = this.grantedPathsMap.get(options.webContentsId)
    if (!grantedPathsSet || grantedPathsSet.size === 0) {
      return false
    }

    let targetRealPath: string
    try {
      targetRealPath = this.resolveRealPath(
        Array.isArray(options.fileAbsolutePath)
          ? path.join(...options.fileAbsolutePath)
          : options.fileAbsolutePath
      )
    } catch {
      return false
    }

    for (const grantedRealPath of grantedPathsSet) {
      try {
        const grantedStats = fs.lstatSync(grantedRealPath)

        if (grantedStats.isFile()) {
          if (targetRealPath === grantedRealPath) return true
          continue
        }

        const grantedDirectoryWithSeparator =
          this.ensureTrailingSeparator(grantedRealPath)
        if (
          targetRealPath === grantedRealPath ||
          targetRealPath.startsWith(grantedDirectoryWithSeparator)
        ) {
          return true
        }
      } catch {
        // Ignore non-existent/inaccessible at check time
      }
    }
    return false
  }

  private resolveRealPath(inputPath: string): string {
    return fs.realpathSync.native(inputPath)
  }

  private ensureTrailingSeparator(directoryPath: string): string {
    return directoryPath.endsWith(path.sep)
      ? directoryPath
      : directoryPath + path.sep
  }
}
