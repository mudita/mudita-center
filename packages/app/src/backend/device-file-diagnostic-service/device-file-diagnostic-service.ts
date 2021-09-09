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
import DeviceService from "Backend/device-service"
import DeviceResponse, {
  DeviceResponseStatus,
} from "Backend/adapters/device-response.interface"

class DeviceFileDiagnosticService {
  private diagnosticsFileListKeys = [
    DiagnosticsFileList.LOGS,
    DiagnosticsFileList.CRASH_DUMPS,
    DiagnosticsFileList.TDB,
  ]

  constructor(private deviceService: DeviceService) {}

  public async getAllDiagnosticFileList(): Promise<DeviceResponse<string[]>> {
    const fileList: string[] = []
    for (let i = 0; i < this.diagnosticsFileListKeys.length; i++) {
      const { status, data } = await this.getDiagnosticFileList(
        this.diagnosticsFileListKeys[i]
      )
      if (status === DeviceResponseStatus.Ok && data?.files !== undefined) {
        data.files.forEach((file) => fileList.push(file))
      } else {
        return {
          status: DeviceResponseStatus.Error,
        }
      }
    }

    return {
      status: DeviceResponseStatus.Ok,
      data: fileList,
    }
  }

  private async getDiagnosticFileList(
    fileList: DiagnosticsFileList
  ): Promise<DeviceResponse<GetFileListResponseBody>> {
    return await this.deviceService.request({
      endpoint: Endpoint.DeviceInfo,
      method: Method.Get,
      body: { fileList },
    })
  }
}

export const createDeviceFileDiagnosticService = (
  deviceService: DeviceService
): DeviceFileDiagnosticService => new DeviceFileDiagnosticService(deviceService)

export default DeviceFileDiagnosticService
