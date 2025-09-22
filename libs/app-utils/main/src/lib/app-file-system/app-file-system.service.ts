/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import archiver from "archiver"
import path from "path"
import fs from "fs-extra"
import {
  AppFileSystemArchiveOptions,
  AppFileSystemCalculateCrc32Options,
  AppFileSystemFileStatsOptions,
  AppFileSystemGuardOptions,
  AppFileSystemMkdirOptions,
  AppFileSystemPathExistsOptions,
  AppFileSystemReadFileChunkOptions,
  AppFileSystemRmOptions,
  AppFileSystemWriteFileOptions,
  AppResult,
  AppResultFactory,
  mapToAppError,
} from "app-utils/models"
import { crc32 } from "node:zlib"
import { AppFileSystemGuard } from "./app-file-system.guard"

export class AppFileSystemService {
  constructor(private appFileSystemGuard: AppFileSystemGuard) {}

  resolveSafePath = (opts: AppFileSystemGuardOptions) =>
    this.appFileSystemGuard.resolveSafePath(opts)

  async rm({
    scopeRelativePath,
    options,
    scope,
  }: AppFileSystemRmOptions): Promise<AppResult> {
    try {
      const filePath = this.resolveSafePath({
        scopeRelativePath,
        scope,
      })
      await fs.rm(filePath, options)
      return AppResultFactory.success()
    } catch (error) {
      return AppResultFactory.failed(mapToAppError(error))
    }
  }

  async mkdir({
    scopeRelativePath,
    options,
    scope,
  }: AppFileSystemMkdirOptions): Promise<AppResult> {
    try {
      const filePath = this.resolveSafePath({
        scopeRelativePath,
        scope,
      })
      await fs.mkdir(filePath, options)
      return AppResultFactory.success()
    } catch (error) {
      return AppResultFactory.failed(mapToAppError(error))
    }
  }

  async archive({
    scopeRelativePath,
    scopeDestinationPath,
    scope,
  }: AppFileSystemArchiveOptions): Promise<AppResult> {
    try {
      const sourceDir = this.resolveSafePath({
        scopeRelativePath,
        scope,
      })
      const destinationPath = this.resolveSafePath({
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

  async pathExists({
    scopeRelativePath,
    scope,
  }: AppFileSystemPathExistsOptions): Promise<AppResult<boolean>> {
    try {
      const filePath = this.resolveSafePath({
        scopeRelativePath,
        scope,
      })
      const exists = await fs.pathExists(filePath)
      return AppResultFactory.success(exists)
    } catch (error) {
      return AppResultFactory.failed(mapToAppError(error))
    }
  }

  async fileStats({
    scopeRelativePath,
    scope,
  }: AppFileSystemFileStatsOptions): Promise<AppResult<fs.Stats>> {
    try {
      const filePath = this.resolveSafePath({
        scopeRelativePath,
        scope,
      })
      const stats = await fs.stat(filePath)
      return AppResultFactory.success(stats)
    } catch (error) {
      return AppResultFactory.failed(mapToAppError(error))
    }
  }

  async writeFile({
    data,
    scopeRelativePath,
    scope = "userData",
    options,
  }: AppFileSystemWriteFileOptions): Promise<AppResult<string>> {
    try {
      const fullPath = this.resolveSafePath({
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

  async calculateFileCrc32({
    scopeRelativePath,
    scope,
  }: AppFileSystemCalculateCrc32Options): Promise<AppResult<string>> {
    try {
      const filePath = this.resolveSafePath({
        scopeRelativePath,
        scope,
      })
      const buffer = await fs.readFile(filePath)
      const crc32Value = (crc32(buffer) >>> 0)
        .toString(16)
        .toLowerCase()
        .padStart(8, "0")
      return AppResultFactory.success(crc32Value)
    } catch (error) {
      return AppResultFactory.failed(mapToAppError(error))
    }
  }

  readFileChunk({
    scopeRelativePath,
    scope,
    chunkSize,
    chunkNo = 0,
  }: AppFileSystemReadFileChunkOptions) {
    return new Promise((resolve, reject) => {
      const filePath = this.resolveSafePath({
        scopeRelativePath,
        scope,
      })
      const stream = fs.createReadStream(filePath, {
        highWaterMark: chunkSize,
        start: chunkNo * chunkSize,
      })

      stream.on("data", (chunk) => {
        resolve(AppResultFactory.success(chunk.toString("base64")))
        stream.close()
      })

      stream.on("error", (err) => {
        reject(AppResultFactory.failed(mapToAppError(err)))
      })
    })
  }

  writeZip(sourceDir: string, destinationPath: string): Promise<void> {
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

  async stats(path: string): Promise<AppResult<fs.Stats>> {
    const s = await fs.stat(path)
    return AppResultFactory.success(s)
  }
}
