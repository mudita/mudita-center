/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Result, ResultObject } from "App/core/builder"
import { AppError } from "App/core/errors"
import { BaseCommand } from "App/device-file-system/commands/base.command"
import { DeviceFileSystemError } from "App/device-file-system/constants"
import { DirectoryFile } from "App/device-file-system/types"
import { Endpoint, Method } from "App/device/constants"
import { GetFileSystemDirectoryResponseBody } from "App/device/types/mudita-os"

export class RetrieveFilesCommand extends BaseCommand {
  public async exec(
    directory: string
  ): Promise<ResultObject<Record<string, DirectoryFile[]> | undefined>> {
    const result =
      await this.deviceManager.device.request<GetFileSystemDirectoryResponseBody>(
        {
          endpoint: Endpoint.FileSystem,
          method: Method.Get,
          body: {
            listDir: directory,
          },
        }
      )

    if (!result.ok) {
      return Result.failed(
        new AppError(
          DeviceFileSystemError.FilesRetrieve,
          result.error ? result.error.message : "Something went wrong"
        )
      )
    }

    return Result.success(result.data)
  }
}
