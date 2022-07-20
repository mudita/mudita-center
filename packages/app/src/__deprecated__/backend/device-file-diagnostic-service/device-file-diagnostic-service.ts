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
import DeviceService from "App/__deprecated__/backend/device-service"
import { RequestResponse } from "App/core/types/request-response.interface"

class DeviceFileDiagnosticService {
  constructor(private deviceService: DeviceService) {}

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

export const createDeviceFileDiagnosticService = (
  deviceService: DeviceService
): DeviceFileDiagnosticService => new DeviceFileDiagnosticService(deviceService)

export default DeviceFileDiagnosticService
