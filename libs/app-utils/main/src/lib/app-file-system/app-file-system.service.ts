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

  async rm(options: AppFileSystemRmOptions): Promise<AppResult> {
    try {
      const filePath = this.resolveSafePath(options)
      await fs.rm(filePath, options.options)
      return AppResultFactory.success()
    } catch (error) {
      return AppResultFactory.failed(mapToAppError(error))
    }
  }

  async mkdir(options: AppFileSystemMkdirOptions): Promise<AppResult> {
    try {
      const filePath = this.resolveSafePath(options)
      await fs.mkdir(filePath, options.options)
      return AppResultFactory.success()
    } catch (error) {
      return AppResultFactory.failed(mapToAppError(error))
    }
  }

  async archive(options: AppFileSystemArchiveOptions): Promise<AppResult> {
    try {
      const sourceDir = this.resolveSafePath(options)
      const destinationPath = this.resolveSafePath({
        ...options,
        scopeRelativePath: options.scopeDestinationPath,
      })

      await fs.ensureDir(path.dirname(destinationPath))
      await this.writeZip(sourceDir, destinationPath)
      return AppResultFactory.success()
    } catch (error) {
      return AppResultFactory.failed(mapToAppError(error))
    }
  }

  async pathExists(options: AppFileSystemPathExistsOptions): Promise<AppResult<boolean>> {
    try {
      const filePath = this.resolveSafePath(options)
      const exists = await fs.pathExists(filePath)
      return AppResultFactory.success(exists)
    } catch (error) {
      return AppResultFactory.failed(mapToAppError(error))
    }
  }

  async fileStats(options: AppFileSystemFileStatsOptions): Promise<AppResult<fs.Stats>> {
    try {
      const filePath = this.resolveSafePath(options)
      const stats = await fs.stat(filePath)
      return AppResultFactory.success(stats)
    } catch (error) {
      return AppResultFactory.failed(mapToAppError(error))
    }
  }

  async writeFile(options: AppFileSystemWriteFileOptions): Promise<AppResult<string>> {
    try {
      const fullPath = this.resolveSafePath(options)
      await fs.ensureDir(path.dirname(fullPath))
      if (options.options?.writeAsJson) {
        await fs.writeJson(fullPath, options.data, { spaces: 2 })
      } else {
        await fs.writeFile(fullPath, options.data, {
          encoding: options.options?.encoding || "utf-8",
        })
      }
      return AppResultFactory.success(fullPath)
    } catch (error) {
      return AppResultFactory.failed(mapToAppError(error))
    }
  }

  async calculateFileCrc32(options: AppFileSystemCalculateCrc32Options): Promise<AppResult<string>> {
    try {
      const filePath = this.resolveSafePath(options)
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

  readFileChunk(options: AppFileSystemReadFileChunkOptions) {
    return new Promise((resolve, reject) => {
      const filePath = this.resolveSafePath(options)
      const chunkNo = options.chunkNo ?? 0
      const stream = fs.createReadStream(filePath, {
        highWaterMark: options.chunkSize,
        start: chunkNo * options.chunkSize,
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
}
