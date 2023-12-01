/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Endpoint, Method } from "App/device/constants"
import { AppError } from "App/core/errors"
import { Result, ResultObject } from "App/core/builder"
import { BaseCommand } from "App/device-file-system/commands/base.command"
import { RemoveFileSystemRequestConfig } from "App/device/types/mudita-os"
import { RequestResponseStatus } from "App/core/types/request-response.interface"
import { DeviceFileSystemError } from "App/device-file-system/constants"

export class FileDeleteCommand extends BaseCommand {
  public async exec(path: string): Promise<ResultObject<string>> {
    const { ok, error } =
      await this.deviceManager.device.request<RemoveFileSystemRequestConfig>({
        endpoint: Endpoint.FileSystem,
        method: Method.Delete,
        body: {
          removeFile: path,
        },
      })

    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (!ok && error?.payload?.status !== RequestResponseStatus.Ok) {
      return Result.failed(
        new AppError(
          DeviceFileSystemError.FileDeleteCommand,
          error ? error.message : "Something went wrong"
        )
      )
    } else {
      return Result.success(path)
    }
  }
}
