/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Endpoint, Method } from "App/device/constants"
import { AppError } from "App/core/errors"
import { Result, ResultObject } from "App/core/builder"
import { RequestResponseStatus } from "App/core/types/request-response.interface"
import { GetFileSystemDirectoryResponseBody } from "App/device/types/mudita-os"
import { BaseCommand } from "App/device-file-system/commands/base.command"
import { DeviceFileSystemError } from "App/device-file-system/constants"
import { DirectoryFile } from "App/device-file-system/types"

export class RetrieveFilesCommand extends BaseCommand {
  public async exec(
    directory: string
  ): Promise<ResultObject<Record<string, DirectoryFile[]> | undefined>> {
    const { data, ok, error } =
      await this.deviceManager.device.request<GetFileSystemDirectoryResponseBody>(
        {
          endpoint: Endpoint.FileSystem,
          method: Method.Get,
          body: {
            listDir: directory,
          },
        }
      )

    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if ((!ok && error?.payload?.status !== RequestResponseStatus.Ok) || !data) {
      return Result.failed(
        new AppError(
          DeviceFileSystemError.FilesRetrieve,
          error ? error.message : "Something went wrong"
        )
      )
    }

    return Result.success(data)
  }
}
