/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Endpoint, Method } from "@mudita/pure"
import { AppError } from "App/core/errors"
import { Result, ResultObject } from "App/core/builder"
import { RequestResponseStatus } from "App/core/types/request-response.interface"
import { BaseCommand } from "App/device-file-system/commands/base.command"
import { DeviceFileSystemError } from "App/device-file-system/constants"
import { DirectoryFile } from "App/device-file-system/types"

export class RetrieveFilesCommand extends BaseCommand {
  public async exec(
    directory: string
  ): Promise<ResultObject<Record<string, DirectoryFile[]> | undefined>> {
    const { data, status, error } = await this.deviceService.request({
      endpoint: Endpoint.FileSystem,
      method: Method.Get,
      body: {
        listDir: directory,
      },
    })

    if (status !== RequestResponseStatus.Ok || !data) {
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
