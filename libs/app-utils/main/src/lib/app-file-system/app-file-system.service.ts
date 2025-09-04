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
  AppFileSystemMkdirOptions,
  AppFileSystemRmOptions,
  AppFileSystemScopeOptions,
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

  static async writeFile(
    filePath: string | string[],
    data: Buffer | Record<string, unknown>,
    encoding: BufferEncoding | string = "utf-8"
  ): Promise<AppResult> {
    try {
      const fullPath = this.resolveScopedPath({
        scopeRelativePath: filePath,
        scope: "userData",
      })
      await fs.ensureDir(path.dirname(fullPath))
      if (Buffer.isBuffer(data)) {
        await fs.writeFile(fullPath, data, { encoding })
      } else {
        await fs.writeJson(fullPath, data, { spaces: 2 })
      }
      return AppResultFactory.success()
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

      archive.finalize()
    })
  }
}
