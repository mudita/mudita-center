/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import archiver from "archiver"
import { app } from "electron"
import path from "path"
import fs from "fs-extra"
import {
  AppFileSystemArchiveOptions,
  AppFileSystemFileStatsOptions,
  AppFileSystemMkdirOptions,
  AppFileSystemPathExistsOptions,
  AppFileSystemRmOptions,
  AppFileSystemScopeOptions,
  AppFileSystemWriteFileOptions,
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
      const filePath = this.resolveScopedPath({ scopeRelativePath, scope })
      await fs.rm(filePath, options)
      return AppResultFactory.success()
    } catch (error) {
      return AppResultFactory.failed(mapToAppError(error))
    }
  }

  static async mkdir({
    scopeRelativePath,
    options,
    scope,
  }: AppFileSystemMkdirOptions): Promise<AppResult> {
    try {
      const filePath = this.resolveScopedPath({ scopeRelativePath, scope })
      await fs.mkdir(filePath, options)
      return AppResultFactory.success()
    } catch (error) {
      return AppResultFactory.failed(mapToAppError(error))
    }
  }

  static async archive({
    scopeRelativePath,
    scopeDestinationPath,
    scope,
  }: AppFileSystemArchiveOptions): Promise<AppResult> {
    try {
      const sourceDir = this.resolveScopedPath({ scopeRelativePath, scope })
      const destinationPath = this.resolveScopedPath({
        scopeRelativePath: scopeDestinationPath,
        scope,
      })

      await fs.ensureDir(path.dirname(destinationPath))
      await this.writeZip(sourceDir, destinationPath)
      return AppResultFactory.success()
    } catch (error) {
      return AppResultFactory.failed(mapToAppError(error))
    }
  }

  static async pathExists({
    scopeRelativePath,
    scope,
  }: AppFileSystemPathExistsOptions): Promise<AppResult<boolean>> {
    try {
      const filePath = this.resolveScopedPath({
        scopeRelativePath,
        scope,
      })
      const exists = await fs.pathExists(filePath)
      return AppResultFactory.success(exists)
    } catch (error) {
      return AppResultFactory.failed(mapToAppError(error))
    }
  }

  static async fileStats({
    scopeRelativePath,
    scope,
  }: AppFileSystemFileStatsOptions): Promise<AppResult<fs.Stats>> {
    try {
      const filePath = this.resolveScopedPath({
        scopeRelativePath,
        scope,
      })
      const stats = await fs.stat(filePath)
      return AppResultFactory.success(stats)
    } catch (error) {
      return AppResultFactory.failed(mapToAppError(error))
    }
  }

  static async writeFile({
    data,
    scopeRelativePath,
    scope = "userData",
    options,
  }: AppFileSystemWriteFileOptions): Promise<AppResult<string>> {
    try {
      const fullPath = this.resolveScopedPath({
        scopeRelativePath,
        scope,
      })
      await fs.ensureDir(path.dirname(fullPath))
      if (options?.writeAsJson) {
        await fs.writeJson(fullPath, data, { spaces: 2 })
      } else {
        await fs.writeFile(fullPath, data, {
          encoding: options?.encoding || "utf-8",
        })
      }
      return AppResultFactory.success(fullPath)
    } catch (error) {
      return AppResultFactory.failed(mapToAppError(error))
    }
  }

  static resolveScopedPath({
    scopeRelativePath,
    scope = "userData",
  }: AppFileSystemScopeOptions): string {
    const scopeDir = app.getPath(scope)
    const filePath = path.resolve(
      scopeDir,
      typeof scopeRelativePath === "string"
        ? scopeRelativePath
        : path.join(...scopeRelativePath)
    )
    if (!filePath.startsWith(scopeDir)) {
      throw new Error(`File Path escapes the scope: ${scopeRelativePath}`)
    }
    return filePath
  }

  private static writeZip(
    sourceDir: string,
    destinationPath: string
  ): Promise<void> {
    return new Promise((resolve, reject) => {
      const output = fs.createWriteStream(destinationPath)
      const archive = archiver("zip", {
        zlib: { level: 9 },
      })

      output.on("close", () => {
        resolve()
      })
      archive.on("error", (err) => reject(err))

      archive.pipe(output)

      archive.directory(sourceDir, false)

      void archive.finalize()
    })
  }
}
