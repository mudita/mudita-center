/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import path from "path"
import fs from "fs-extra"
import {
  AggregateLogsToFileOptions,
  APP_LOGGER_SCOPE,
  APP_LOGGER_SCOPE_RELATIVE_PATH,
  AppResult,
  AppResultFactory,
  mapToAppError,
} from "app-utils/models"
import { AppFileSystemService } from "../app-file-system/app-file-system.service"

export class AppLoggerService {
  static async aggregateLogsToFile({
    maxSizeInBytes,
    scopeRelativePath,
  }: AggregateLogsToFileOptions): Promise<AppResult> {
    try {
      const LOG_FILENAME_REGEX = /\w+/

      const logsDir = AppFileSystemService.resolveScopedPath({
        scope: APP_LOGGER_SCOPE,
        scopeRelativePath: APP_LOGGER_SCOPE_RELATIVE_PATH,
      })

      const destinationPath = AppFileSystemService.resolveScopedPath({
        scopeRelativePath,
      })

      const entries = await fs.readdir(logsDir)
      const logFiles = await Promise.all(
        entries
          .filter((name) => LOG_FILENAME_REGEX.test(name))
          .map(async (name) => {
            const fullPath = path.join(logsDir, name)
            const { birthtimeMs, size } = await fs.stat(fullPath)
            return { name, birthtimeMs, size }
          })
      )
      logFiles.sort((a, b) => a.birthtimeMs - b.birthtimeMs)

      const trimmedBuffer = await this.buildTrimmedLogsBuffer(
        logsDir,
        logFiles,
        maxSizeInBytes
      )

      await fs.writeFile(destinationPath, trimmedBuffer, "utf-8")
      return AppResultFactory.success()
    } catch (error) {
      return AppResultFactory.failed(mapToAppError(error))
    }
  }

  private static async buildTrimmedLogsBuffer(
    logsDir: string,
    logFiles: { name: string; birthtimeMs: number; size: number }[],
    maxSizeInBytes: number
  ): Promise<Buffer> {
    let buffer = Buffer.alloc(0)

    for (const { name, size } of logFiles) {
      const divider = Buffer.from(`\n========== ${name} ==========\n`, "utf-8")

      const remaining = maxSizeInBytes - buffer.length - divider.length
      if (remaining <= 0) break

      const toRead = Math.min(size, remaining)
      const handle = await fs.promises.open(path.join(logsDir, name), "r")
      const chunk = Buffer.alloc(toRead)
      await handle.read(chunk, 0, toRead, size - toRead)
      await handle.close()

      buffer = Buffer.concat([buffer, divider, chunk])

      if (buffer.length > maxSizeInBytes) {
        buffer = buffer.subarray(buffer.length - maxSizeInBytes)
      }
    }

    return buffer
  }
}
