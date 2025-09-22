/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { app } from "electron"
import path from "path"
import {
  AbsolutePathWithGrantOptions,
  AppFileSystemGuardOptions,
  RelativeScopeOptions,
} from "app-utils/models"

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

  resolveAbsoluteSafePath(_options: AbsolutePathWithGrantOptions): string {
    // TODO(step 2): implement grant check + realpath normalization
    throw new Error("Absolute path mode is not implemented yet")
  }
}
