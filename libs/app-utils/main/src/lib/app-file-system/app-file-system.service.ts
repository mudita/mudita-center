/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { shell } from "electron"
import archiver from "archiver"
import path from "path"
import fs from "fs-extra"
import tar from "tar-stream"
import { isArray } from "lodash"
import {
  AppFileSystemArchiveOptions,
  AppFileSystemCalculateCrc32Options,
  AppFileSystemExtractOptions,
  AppFileSystemFileStatsOptions,
  AppFileSystemGuardOptions,
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
  AppResultFactory,
  mapToAppError,
  Platform,
  platform,
} from "app-utils/models"
import { crc32 } from "node:zlib"
import { execPromise } from "../exec/exec-command"
import { AppFileSystemGuard } from "./app-file-system.guard"

export class AppFileSystemService {
  constructor(private appFileSystemGuard: AppFileSystemGuard) {}

  resolveSafePath = (opts: AppFileSystemGuardOptions) => {
    return this.appFileSystemGuard.resolveSafePath(opts)
  }

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

  async pathExists(
    options: AppFileSystemPathExistsOptions
  ): Promise<AppResult<boolean>> {
    try {
      const filePath = this.resolveSafePath(options)
      const exists = await fs.pathExists(filePath)
      return AppResultFactory.success(exists)
    } catch (error) {
      return AppResultFactory.failed(mapToAppError(error))
    }
  }

  async fileStats(
    options: AppFileSystemFileStatsOptions
  ): Promise<AppResult<fs.Stats>> {
    try {
      const filePath = this.resolveSafePath(options)
      const stats = await fs.stat(filePath)
      return AppResultFactory.success(stats)
    } catch (error) {
      return AppResultFactory.failed(mapToAppError(error))
    }
  }

  async writeFile(
    options: AppFileSystemWriteFileOptions
  ): Promise<AppResult<string>> {
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

  async readDir(
    options: AppFileSystemReadDirOptions
  ): Promise<AppResult<string[]>> {
    try {
      const dirPath = this.resolveSafePath(options)
      const files = await fs.readdir(dirPath)
      return AppResultFactory.success(files)
    } catch (error) {
      return AppResultFactory.failed(mapToAppError(error))
    }
  }

  async readFile(
    options: AppFileSystemReadFileOptions
  ): Promise<AppResult<string | Buffer>> {
    try {
      const fullPath = this.resolveSafePath(options)
      const buffer = await fs.readFile(fullPath)

      const encoding = options.encoding || "utf-8"

      if (encoding !== "buffer") {
        return AppResultFactory.success(buffer.toString(encoding))
      }

      return AppResultFactory.success(buffer)
    } catch (error) {
      return AppResultFactory.failed(mapToAppError(error))
    }
  }

  async calculateFileCrc32(
    options: AppFileSystemCalculateCrc32Options
  ): Promise<AppResult<string>> {
    try {
      let buffer: Buffer
      if (options.data) {
        buffer = Buffer.isBuffer(options.data)
          ? options.data
          : Buffer.from(options.data)
      } else {
        const filePath = this.resolveSafePath(options)
        buffer = await fs.readFile(filePath)
      }
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

  async writeFileChunk(options: AppFileSystemWriteFileChunkOptions) {
    const filePath = this.resolveSafePath(options)
    await fs.ensureDir(path.dirname(filePath))
    const chunkNo = options.chunkNo ?? 0
    const stream = fs.createWriteStream(filePath, {
      highWaterMark: options.chunkSize,
      start: chunkNo * options.chunkSize,
    })

    return new Promise((resolve) => {
      stream.write(options.data, (err) => {
        if (err) {
          resolve(AppResultFactory.failed(mapToAppError(err)))
          return
        }
        stream.end()
      })

      stream.on("finish", () => {
        resolve(AppResultFactory.success())
        stream.close()
      })

      stream.on("error", (err) => {
        resolve(AppResultFactory.failed(mapToAppError(err)))
      })
    })
  }

  writeZip(sourceDir: string, destinationPath: string): Promise<AppResult> {
    return new Promise((resolve) => {
      const output = fs.createWriteStream(destinationPath)
      const archive = archiver("zip", {
        zlib: { level: 9 },
      })

      output.on("close", () => {
        resolve(AppResultFactory.success())
      })
      archive.on("error", (err) => {
        resolve(AppResultFactory.failed(mapToAppError(err)))
      })

      archive.pipe(output)

      archive.directory(sourceDir, false)

      void archive.finalize()
    })
  }

  async extract(
    options: AppFileSystemExtractOptions
  ): Promise<AppResult<string[]>> {
    const sourceFilePath = this.resolveSafePath(options)
    const destinationFilePath = this.resolveSafePath({
      ...options,
      scopeRelativePath:
        options.scopeDestinationPath ?? options.scopeRelativePath,
    })

    try {
      if (sourceFilePath.endsWith(".tar.gz")) {
        return await this.extractTarGz(sourceFilePath, destinationFilePath)
      }

      if (sourceFilePath.endsWith(".tar.xz")) {
        return await this.extractTarXz(sourceFilePath, destinationFilePath)
      }

      return await this.extractTarWithStream(
        sourceFilePath,
        destinationFilePath
      )
    } catch (e) {
      return AppResultFactory.failed(mapToAppError(e))
    }
  }

  async openDirectory(options: AppFileSystemOpenDirectoryOptions) {
    await shell.openPath(
      isArray(options.path) ? path.join(...options.path) : options.path
    )
  }

  private async extractTarGz(
    sourceFilePath: string,
    destinationFilePath: string
  ): Promise<AppResult<string[]>> {
    const baseName = path.basename(sourceFilePath, ".tar.gz")
    const sourceFilePathTar = path.join(destinationFilePath, `${baseName}.tar`)

    const windowsCommand =
      `tar -xzvf "${sourceFilePath}" -C "${destinationFilePath}" ` +
      `&& if exist "${sourceFilePathTar}" tar -xvf "${sourceFilePathTar}" -C "${destinationFilePath}"`

    const posixCommand =
      `tar -xzvf "${sourceFilePath}" -C "${destinationFilePath}" ` +
      `&& if [ -f "${sourceFilePathTar}" ]; then tar -xvf "${sourceFilePathTar}" -C "${destinationFilePath}"; fi`

    const command =
      platform === Platform.windows ? windowsCommand : posixCommand

    await execPromise(command)
    return AppResultFactory.success()
  }

  private async extractTarXz(
    sourceFilePath: string,
    destinationFilePath: string
  ): Promise<AppResult<string[]>> {
    const command = `tar -xf "${sourceFilePath}" -C "${destinationFilePath}"`
    await execPromise(command)
    return AppResultFactory.success()
  }

  private async extractTarWithStream(
    sourceFilePath: string,
    destinationFilePath: string
  ): Promise<AppResult<string[]>> {
    const entryPaths: string[] = []
    const extract = tar.extract({ allowUnknownFormat: true })

    return new Promise((resolve) => {
      extract.on("entry", function (header, entryStream, next) {
        const entryFilePath = path.join(destinationFilePath, header.name)
        if (header.type === "file") {
          const ws = fs.createWriteStream(entryFilePath, { mode: header.mode })

          ws.on("finish", () => {
            entryPaths.push(entryFilePath)
            next()
          })
          ws.on("error", (err) => {
            resolve(AppResultFactory.failed(mapToAppError(err)))
          })
          entryStream.on("error", (err) => {
            resolve(AppResultFactory.failed(mapToAppError(err)))
          })

          entryStream.pipe(ws)
          return
        }
        entryStream.resume()
        next()
      })

      extract.on("finish", () => resolve(AppResultFactory.success(entryPaths)))
      extract.on("error", (err) =>
        resolve(AppResultFactory.failed(mapToAppError(err)))
      )

      const rs = fs.createReadStream(sourceFilePath)
      rs.on("error", (err) =>
        resolve(AppResultFactory.failed(mapToAppError(err)))
      )
      rs.pipe(extract)
    })
  }
}
