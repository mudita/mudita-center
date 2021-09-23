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
import DeviceResponse from "Backend/adapters/device-response.interface"

class DeviceFileDiagnosticService {
  constructor(private deviceService: DeviceService) {}

  public async getDiagnosticFileList(
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
