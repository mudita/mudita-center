/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Endpoint, Method } from "core-device/models"
import { ResultObject, Result } from "Core/core/builder"
import { AppError } from "Core/core/errors"
import { DeviceFileSystemService } from "Core/device-file-system/services"
import { DiagnosticsFileList } from "Core/device/constants"
import { GetDeviceFilesResponseBody } from "Core/device/types/mudita-os"
import { transformDeviceFilesByOption } from "Core/device-log/helpers"
import { DeviceFile } from "Core/device-file-system/dto"
import { DeviceEnumError } from "Core/device-log/constants"
import { DeviceFilesOption } from "Core/device-file-system/types"
import { DeviceProtocolService } from "device-protocol/feature"

export class DeviceLogService {
  constructor(
    private deviceProtocolService: DeviceProtocolService,
    private deviceFileSystem: DeviceFileSystemService
  ) {}

  public async downloadDeviceLogs(
    option?: DeviceFilesOption
  ): Promise<ResultObject<DeviceFile[]>> {
    try {
      const files =
        await this.deviceProtocolService.device.request<GetDeviceFilesResponseBody>(
          {
            endpoint: Endpoint.DeviceInfo,
            method: Method.Get,
            body: {
              fileList: DiagnosticsFileList.LOGS,
            },
          }
        )

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

      if (!downloadDeviceFilesResponse.ok) {
        return Result.failed(
          new AppError(
            DeviceEnumError.CannotDownloadLogFileFromDevice,
            "Error during download files from device"
          )
        )
      }
      const deviceFiles = downloadDeviceFilesResponse.data

      return Result.success(
        option ? transformDeviceFilesByOption(deviceFiles, option) : deviceFiles
      )
    } catch (error) {
      return Result.failed(
        new AppError(
          DeviceEnumError.CannotGetDeviceLogLocation,
          (error as Error)?.message || "Error during download device logs"
        )
      )
    }
  }
}
