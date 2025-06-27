/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { app } from "electron"
import path from "path"
import fs from "fs-extra"
import {
  AppFileSystemRmOptions,
  AppFileSystemScope,
  AppResult,
  AppResultFactory,
  mapToAppError,
} from "app-utils/models"

export class AppFileSystemService {
  static async rm({
    scopeRelativePath,
    options,
    scope,
  }: AppFileSystemRmOptions): Promise<AppResult> {
    try {
      const filePath = this.resolveScopedPath(scopeRelativePath, scope)
      await fs.rm(filePath, options)
      return AppResultFactory.success()
    } catch (error) {
      return AppResultFactory.failed(mapToAppError(error))
    }
  }

  private static resolveScopedPath(
    scopeRelativePath: string,
    scope: AppFileSystemScope = "userData"
  ): string {
    const scopeDir = app.getPath(scope)
    const filePath = path.resolve(scopeDir, scopeRelativePath)
    if (!filePath.startsWith(scopeDir)) {
      throw new Error(`File Path escapes the scope: ${scopeRelativePath}`)
    }
    return filePath
  }
}
