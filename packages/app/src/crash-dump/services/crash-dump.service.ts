/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  DiagnosticsFileList,
  Endpoint,
  GetFileListResponseBody,
  Method,
} from "@mudita/pure"
import path from "path"
import getAppPath from "App/main/utils/get-app-path"
import { DeviceFileSystem } from "App/backend/adapters/device-file-system/device-file-system.adapter"
import {
  RequestResponse,
  RequestResponseStatus,
} from "App/core/types/request-response.interface"
import { DeviceService } from "App/backend/device-service"

export class CrashDumpService {
  constructor(
    private deviceService: DeviceService,
    private deviceFileSystem: DeviceFileSystem
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
    const deviceFiles = downloadDeviceFilesResponse.data

    if (
      downloadDeviceFilesResponse.status !== RequestResponseStatus.Ok ||
      deviceFiles === undefined
    ) {
      return {
        status: RequestResponseStatus.Error,
      }
    }

    return {
      data: deviceFiles,
      status: RequestResponseStatus.Ok,
    }
  }

  private async getDeviceFiles(
    fileList: DiagnosticsFileList
  ): Promise<RequestResponse<string[]>> {
    const getDiagnosticFileListResponse = await this.getDiagnosticFileList(
      fileList
    )

    if (
      getDiagnosticFileListResponse.status !== RequestResponseStatus.Ok ||
      getDiagnosticFileListResponse.data === undefined
    ) {
      return {
        status: RequestResponseStatus.Error,
      }
    }

    const filePaths = getDiagnosticFileListResponse.data.files

    return {
      data: filePaths,
      status: RequestResponseStatus.Ok,
    }
  }

  public async getDiagnosticFileList(
    fileList: DiagnosticsFileList
  ): Promise<RequestResponse<GetFileListResponseBody>> {
    return this.deviceService.request({
      endpoint: Endpoint.DeviceInfo,
      method: Method.Get,
      body: { fileList },
    })
  }
}
