/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  GetBackupDeviceStatusDataState,
  GetBackupDeviceStatusResponseBody,
} from "@mudita/pure"
import { isResponsesSuccessWithData } from "App/core/helpers"
import DeviceBackupAdapter from "App/__deprecated__/backend/adapters/device-backup/device-backup-adapter.class"
import DeviceBaseInfoAdapter from "App/__deprecated__/backend/adapters/device-base-info/device-base-info-adapter.class"
import DeviceFileSystemAdapter, {
  DownloadDeviceFileLocallyOptions,
} from "App/__deprecated__/backend/adapters/device-file-system/device-file-system-adapter.class"
import { DeviceBackupService } from "App/__deprecated__/backend/device-backup-service/device-backup-service"
import logger from "App/__deprecated__/main/utils/logger"
import {
  RequestResponse,
  RequestResponseStatus,
} from "App/core/types/request-response.interface"

export class DeviceBackup implements DeviceBackupAdapter {
  public backuping = false

  constructor(
    private deviceBaseInfo: DeviceBaseInfoAdapter,
    private deviceBackupService: DeviceBackupService,
    private deviceFileSystem: DeviceFileSystemAdapter
  ) {}

  async downloadDeviceBackup(
    options: DownloadDeviceFileLocallyOptions
  ): Promise<RequestResponse<string[]>> {
    if (this.backuping) {
      return {
        status: RequestResponseStatus.Error,
        error: {
          message: "Backup is in progress",
        },
      }
    }

    this.backuping = true
    const runDeviceBackupResponse = await this.runDeviceBackup()

    if (!isResponsesSuccessWithData([runDeviceBackupResponse])) {
      this.backuping = false
      return {
        status: RequestResponseStatus.Error,
        error: runDeviceBackupResponse.error,
      }
    }

    const filePath = runDeviceBackupResponse.data!

    const downloadDeviceFileResponse =
      await this.deviceFileSystem.downloadDeviceFilesLocally(
        [filePath],
        options
      )

    if (!isResponsesSuccessWithData([downloadDeviceFileResponse])) {
      this.backuping = false
      return {
        status: RequestResponseStatus.Error,
        error: {
          message: "Download backup fails",
        },
      }
    }

    // TODO: Moved removing backup logic to OS
    const removeDeviceFileResponse =
      await this.deviceFileSystem.removeDeviceFile(filePath)

    if (removeDeviceFileResponse.status !== RequestResponseStatus.Ok) {
      logger.info("Removing device file during backuping locally fails")
    }

    this.backuping = false

    return downloadDeviceFileResponse
  }

  private async runDeviceBackup(): Promise<RequestResponse<string>> {
    this.backuping = true
    const getBackupLocationResponse = await this.deviceBaseInfo.getDeviceInfo()

    if (!isResponsesSuccessWithData([getBackupLocationResponse])) {
      return {
        status: RequestResponseStatus.Error,
        error: {
          message: "Pure OS Backup Pure Location is undefined",
        },
      }
    }
    const startBackupDeviceResponse =
      await this.deviceBackupService.startBackupDevice()

    if (!isResponsesSuccessWithData([startBackupDeviceResponse])) {
      return {
        status: RequestResponseStatus.Error,
        error: {
          message: "Start backup Device returns error",
        },
      }
    }

    const backupId = startBackupDeviceResponse.data!.id

    const getBackupDeviceStatusResponse =
      await this.waitUntilBackupDeviceFinished(backupId)

    if (!isResponsesSuccessWithData([getBackupDeviceStatusResponse])) {
      return {
        status: RequestResponseStatus.Error,
        error: {
          message: "One of the getBackupDeviceStatus requests returns error",
        },
      }
    }

    const filePath = `${
      getBackupLocationResponse.data!.backupLocation
    }/${backupId}`

    return {
      status: RequestResponseStatus.Ok,
      data: filePath,
    }
  }

  private async waitUntilBackupDeviceFinished(
    id: string
  ): Promise<RequestResponse<GetBackupDeviceStatusResponseBody>> {
    const response = await this.deviceBackupService.getBackupDeviceStatus({
      id,
    })

    if (
      !isResponsesSuccessWithData([response]) ||
      response.data?.state === GetBackupDeviceStatusDataState.Error
    ) {
      return { status: RequestResponseStatus.Error }
    } else if (
      response.data?.state === GetBackupDeviceStatusDataState.Finished
    ) {
      return response
    } else {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(this.waitUntilBackupDeviceFinished(id))
        }, 1000)
      })
    }
  }
}

const createDeviceBackupAdapter = (
  deviceBaseInfo: DeviceBaseInfoAdapter,
  deviceBackupService: DeviceBackupService,
  deviceFileSystem: DeviceFileSystemAdapter
): DeviceBackup =>
  new DeviceBackup(deviceBaseInfo, deviceBackupService, deviceFileSystem)

export default createDeviceBackupAdapter
