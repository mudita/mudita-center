/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Endpoint, Method } from "App/device/constants"
import DeviceService from "App/__deprecated__/backend/device-service"
import { AppError } from "App/core/errors"
import { Result, ResultObject } from "App/core/builder"
import { BaseCommand } from "App/device-file-system/commands/base.command"
import { RequestResponseStatus } from "App/core/types/request-response.interface"
import { DeviceFileSystemError } from "App/device-file-system/constants"

export class FileDeleteCommand extends BaseCommand {
  constructor(public deviceService: DeviceService) {
    super(deviceService)
  }

  public async exec(path: string): Promise<ResultObject<undefined>> {
    const { status, error } = await this.deviceService.request({
      endpoint: Endpoint.FileSystem,
      method: Method.Delete,
      body: {
        removeFile: path,
      },
    })
    if (status !== RequestResponseStatus.Ok) {
      return Result.failed(
        new AppError(
          DeviceFileSystemError.FileDeleteCommand,
          error ? error.message : "Something went wrong"
        )
      )
    } else {
      return Result.success(undefined)
    }
  }
}
