/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Endpoint, Method } from "core-device/models"
import { DiagnosticsFileList } from "Core/device/constants"
import { GetDeviceFilesResponseBody } from "Core/device/types/mudita-os"
import path from "path"
import { ResultObject } from "Core/core/builder"
import getAppPath from "Core/__deprecated__/main/utils/get-app-path"
import { DeviceFileSystemService } from "Core/device-file-system/services"
import {
  RequestResponse,
  RequestResponseStatus,
} from "Core/core/types/request-response.interface"
import { DeviceProtocolService } from "device-protocol/feature"

export class CrashDumpService {
  constructor(
    private deviceManager: DeviceProtocolService,
    private deviceFileSystem: DeviceFileSystemService
  ) {}

  public async getDeviceCrashDumpFiles(): Promise<RequestResponse<string[]>> {
    return this.getDeviceFiles(DiagnosticsFileList.CRASH_DUMPS)
  }

  public async downloadDeviceCrashDumpFiles(): Promise<
    RequestResponse<string[]>
  > {
    return this.downloadDeviceFilesLocally(DiagnosticsFileList.CRASH_DUMPS)
  }

  private async downloadDeviceFilesLocally(
    fileList: DiagnosticsFileList
  ): Promise<RequestResponse<string[]>> {
    const files = await this.getDeviceFiles(fileList)

    if (files.status !== RequestResponseStatus.Ok || !files.data) {
      return {
        status: RequestResponseStatus.Error,
      }
    }

    const downloadDeviceFilesResponse =
      await this.deviceFileSystem.downloadDeviceFilesLocally(files.data, {
        cwd: path.join(getAppPath(), "crash-dumps"),
      })

    if (
      !downloadDeviceFilesResponse.ok ||
      downloadDeviceFilesResponse.data === undefined
    ) {
      return {
        status: RequestResponseStatus.Error,
      }
    }

    return {
      data: downloadDeviceFilesResponse.data,
      status: RequestResponseStatus.Ok,
    }
  }

  private async getDeviceFiles(
    fileList: DiagnosticsFileList
  ): Promise<RequestResponse<string[]>> {
    const getDiagnosticFileListResponse = await this.getDiagnosticFileList(
      fileList
    )

    if (!getDiagnosticFileListResponse.ok) {
      return {
        status: RequestResponseStatus.Error,
      }
    }

    const filePaths = getDiagnosticFileListResponse.data?.files ?? []

    return {
      data: filePaths,
      status: RequestResponseStatus.Ok,
    }
  }

  public async getDiagnosticFileList(
    fileList: DiagnosticsFileList
  ): Promise<ResultObject<GetDeviceFilesResponseBody>> {
    return this.deviceManager.device.request<GetDeviceFilesResponseBody>({
      endpoint: Endpoint.DeviceInfo,
      method: Method.Get,
      body: { fileList },
    })
  }
}
