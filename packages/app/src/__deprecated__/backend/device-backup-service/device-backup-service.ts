/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Endpoint, Method, BackupCategory } from "App/device/constants"
import {
  GetBackupDeviceStatusRequestConfigBody,
  GetBackupDeviceStatusResponseBody,
  StartBackupResponseBody,
} from "App/device/types/mudita-os"
import DeviceService from "App/__deprecated__/backend/device-service"
import { RequestResponse } from "App/core/types/request-response.interface"
import { Feature, flags } from "App/feature-flags"

export class DeviceBackupService {
  constructor(private deviceService: DeviceService) {}

  public async startBackupDevice(
    category = BackupCategory.Backup
  ): Promise<RequestResponse<StartBackupResponseBody>> {
    return await this.deviceService.request({
      endpoint: Endpoint.Backup,
      method: Method.Post,
      ...(flags.get(Feature.BackupCategoriesEnabled)
        ? {
            body: {
              category,
            },
          }
        : {}),
    })
  }

  public async getBackupDeviceStatus(
    config: GetBackupDeviceStatusRequestConfigBody,
    category = BackupCategory.Backup
  ): Promise<RequestResponse<GetBackupDeviceStatusResponseBody>> {
    return await this.deviceService.request({
      endpoint: Endpoint.Backup,
      method: Method.Get,
      body: {
        ...config,
        ...(flags.get(Feature.BackupCategoriesEnabled)
          ? {
              category,
            }
          : {}),
      },
    })
  }
}

const createDeviceBackupService = (
  deviceService: DeviceService
): DeviceBackupService => new DeviceBackupService(deviceService)

export default createDeviceBackupService
