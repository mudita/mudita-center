/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ResultObject, Result } from "App/core/builder"
import { AppError } from "App/core/errors"
import { DeviceFileSystemService } from "App/device-file-system/services"
import { Endpoint, Method, DiagnosticsFileList } from "App/device/constants"
import { GetDeviceFilesResponseBody } from "App/device/types/mudita-os"
import { transformDeviceFilesByOption } from "App/device-log/helpers"
import { DeviceFile } from "App/device-file-system/dto"
import { DeviceEnumError } from "App/device-log/constants"
import { DeviceFilesOption } from "App/device-file-system/types"
import { DeviceManager } from "App/device-manager/services"

export class DeviceLogService {
  constructor(
    private deviceManager: DeviceManager,
    private deviceFileSystem: DeviceFileSystemService
  ) {}

  public async downloadDeviceLogs(
    option?: DeviceFilesOption
  ): Promise<ResultObject<DeviceFile[]>> {
    const files =
      await this.deviceManager.device.request<GetDeviceFilesResponseBody>({
        endpoint: Endpoint.DeviceInfo,
        method: Method.Get,
        body: {
          fileList: DiagnosticsFileList.LOGS,
        },
      })

    if (!files.data || !files.ok) {
      return Result.failed(
        new AppError(
          DeviceEnumError.CannotGetDeviceLogLocation,
          "Device log file location is empty"
        )
      )
    }

    const downloadDeviceFilesResponse =
      await this.deviceFileSystem.downloadDeviceFiles(files.data.files)
    const deviceFiles = downloadDeviceFilesResponse.data

    if (!deviceFiles) {
      return Result.failed(
        new AppError(
          DeviceEnumError.CannotDownloadLogFileFromDevice,
          "Error during download files from device"
        )
      )
    }

    return Result.success(
      option ? transformDeviceFilesByOption(deviceFiles, option) : deviceFiles
    )
  }
}
