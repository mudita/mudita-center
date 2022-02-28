/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  Endpoint,
  GetBackupDeviceStatusRequestConfigBody,
  GetBackupDeviceStatusResponseBody,
  Method,
  StartBackupResponseBody,
} from "@mudita/pure"
import DeviceService from "Backend/device-service"
import DeviceResponse from "Backend/adapters/device-response.interface"

export class DeviceBackupService {
  constructor(private deviceService: DeviceService) {}

  public async startBackupDevice(): Promise<
    DeviceResponse<StartBackupResponseBody>
  > {
    return await this.deviceService.request({
      endpoint: Endpoint.Backup,
      method: Method.Post,
    })
  }

  public async getBackupDeviceStatus(
    config: GetBackupDeviceStatusRequestConfigBody
  ): Promise<DeviceResponse<GetBackupDeviceStatusResponseBody>> {
    return await this.deviceService.request({
      endpoint: Endpoint.Backup,
      method: Method.Get,
      body: config,
    })
  }
}

const createDeviceBackupService = (
  deviceService: DeviceService
): DeviceBackupService => new DeviceBackupService(deviceService)

export default createDeviceBackupService
