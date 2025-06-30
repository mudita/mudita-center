/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import path from 'path';
import fs from 'fs-extra';
import {
  AggregateLogsToFileOptions,
  APP_LOGGER_SCOPE,
  APP_LOGGER_SCOPE_RELATIVE_PATH,
  AppResult,
  AppResultFactory,
  mapToAppError,
} from 'app-utils/models';
import { AppFileSystemService } from '../app-file-system/app-file-system.service';

export class AppLoggerService {
  private static readonly LOG_FILENAME_REGEX = /^[\w-]+\.log$/;

  static async aggregateLogsToFile(
    options: AggregateLogsToFileOptions
  ): Promise<AppResult> {
    const { maxSizeInBytes, scopeRelativePath } = options;
    try {
      const logsDir = AppFileSystemService.resolveScopedPath({
        scope: APP_LOGGER_SCOPE,
        scopeRelativePath: APP_LOGGER_SCOPE_RELATIVE_PATH,
      });
      const destinationPath = AppFileSystemService.resolveScopedPath({
        scopeRelativePath,
      });

      const entries = await fs.readdir(logsDir);
      const logFiles = await this.filterAndSortLogFiles(logsDir, entries);

      const buffer = await this.buildTrimmedLogsBuffer(
        logsDir,
        logFiles,
        maxSizeInBytes
      );
      await fs.writeFile(destinationPath, buffer, 'utf-8');

      return AppResultFactory.success();
    } catch (error) {
      return AppResultFactory.failed(mapToAppError(error));
    }
  }

  private static async filterAndSortLogFiles(
    logsDir: string,
    entries: string[]
  ): Promise<Array<{ name: string; birthtimeMs: number; size: number }>> {
    const stats = await Promise.all(
      entries
        .filter((name) => this.LOG_FILENAME_REGEX.test(name))
        .map(async (name) => {
          const fullPath = path.join(logsDir, name);
          const { birthtimeMs, size } = await fs.stat(fullPath);
          return { name, birthtimeMs, size };
        })
    );
    return stats.sort((a, b) => a.birthtimeMs - b.birthtimeMs);
  }

  private static async buildTrimmedLogsBuffer(
    logsDir: string,
    logFiles: Array<{ name: string; birthtimeMs: number; size: number }>,
    maxSizeInBytes: number
  ): Promise<Buffer> {
    const buffers: Buffer[] = [];
    let used = 0;

    const tailTotal = logFiles
      .slice(1)
      .reduce((sum, { name, size }) => {
        const divBuf = createDivider(name);
        return sum + divBuf.byteLength + size;
      }, 0);

    function createDivider(name: string): Buffer {
      return Buffer.from(`\n========== ${name} ==========\n`, 'utf-8');
    }

    async function appendChunk(name: string, size: number, toRead: number) {
      const divider = createDivider(name);
      buffers.push(divider);
      used += divider.byteLength;

      const handle = await fs.promises.open(path.join(logsDir, name), 'r');
      const chunk = Buffer.alloc(toRead);

      await handle.read(chunk, 0, toRead, size - toRead);
      await handle.close();

      buffers.push(chunk);
      used += toRead;
    }

    for (let i = 0; i < logFiles.length; i++) {
      const { name, size } = logFiles[i];
      const dividerLen = createDivider(name).byteLength;

      let toRead: number;

      if (i === 0) {
        const available = maxSizeInBytes - tailTotal - dividerLen;
        toRead = Math.max(0, Math.min(size, available));
        if (toRead <= 0) continue;
      } else {
        if (used + dividerLen > maxSizeInBytes) break;
        const remaining = maxSizeInBytes - used - dividerLen;
        toRead = Math.max(0, Math.min(size, remaining));
        if (toRead <= 0) break;
      }

      await appendChunk(name, size, toRead);

      if (used >= maxSizeInBytes) break;
    }

    return Buffer.concat(buffers);
  }
}
