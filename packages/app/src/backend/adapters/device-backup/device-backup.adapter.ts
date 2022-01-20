/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import path from "path"
import {
  GetBackupDeviceStatusDataState,
  GetBackupDeviceStatusResponseBody,
} from "@mudita/pure"
import DeviceResponse, {
  DeviceResponseStatus,
} from "Backend/adapters/device-response.interface"
import { isResponsesSuccessWithData } from "Renderer/utils/is-responses-success-with-data.helpers"
import DeviceBackupAdapter from "Backend/adapters/device-backup/device-backup-adapter.class"
import PurePhoneAdapter from "Backend/adapters/pure-phone/pure-phone-adapter.class"
import DeviceFileSystemAdapter, {
  DeviceFile,
} from "Backend/adapters/device-file-system/device-file-system-adapter.class"
import { DeviceBackupService } from "Backend/device-backup-service/device-backup-service"

class DeviceBackup implements DeviceBackupAdapter {
  public backuping = false

  constructor(
    private purePhone: PurePhoneAdapter,
    private deviceBackupService: DeviceBackupService,
    private deviceFileSystem: DeviceFileSystemAdapter
  ) {}

  async downloadDeviceBackupLocally(targetPath: string): Promise<DeviceResponse<string[]>> {
    this.backuping = true
    const runDeviceBackupResponse = await this.runDeviceBackup()

    if (!isResponsesSuccessWithData([runDeviceBackupResponse])) {
      return {
        status: DeviceResponseStatus.Error,
        error: runDeviceBackupResponse.error,
      }
    }

    const filePath = runDeviceBackupResponse.data!

    const downloadDeviceFileResponse =
      await this.deviceFileSystem.downloadLocally([filePath], targetPath)

    if (!isResponsesSuccessWithData([downloadDeviceFileResponse])) {
      return {
        status: DeviceResponseStatus.Error,
        error: {
          message: "Download backup fails",
        },
      }
    }

    this.backuping = false

    return downloadDeviceFileResponse
  }

  async downloadDeviceBackup(): Promise<DeviceResponse<DeviceFile>> {
    this.backuping = true
    const runDeviceBackupResponse = await this.runDeviceBackup()

    if (!isResponsesSuccessWithData([runDeviceBackupResponse])) {
      return {
        status: DeviceResponseStatus.Error,
        error: runDeviceBackupResponse.error,
      }
    }

    const filePath = runDeviceBackupResponse.data!

    const downloadDeviceFileResponse =
      await this.deviceFileSystem.downloadDeviceFiles([filePath])

    if (!isResponsesSuccessWithData([downloadDeviceFileResponse])) {
      return {
        status: DeviceResponseStatus.Error,
        error: {
          message: "Download backup fails",
        },
      }
    }

    this.backuping = false

    return {
      status: DeviceResponseStatus.Ok,
      data: downloadDeviceFileResponse.data![0],
    }
  }

  private async runDeviceBackup(): Promise<DeviceResponse<string>> {
    this.backuping = true
    const getBackupLocationResponse = await this.purePhone.getBackupLocation()

    if (!isResponsesSuccessWithData([getBackupLocationResponse])) {
      return {
        status: DeviceResponseStatus.Error,
        error: {
          message: "Pure OS Backup Pure Location is undefined",
        },
      }
    }
    const startBackupDeviceResponse =
      await this.deviceBackupService.startBackupDevice()

    if (!isResponsesSuccessWithData([startBackupDeviceResponse])) {
      return {
        status: DeviceResponseStatus.Error,
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
        status: DeviceResponseStatus.Error,
        error: {
          message: "One of the getBackupDeviceStatus requests returns error",
        },
      }
    }

    const filePath = path.join(getBackupLocationResponse.data!, backupId)

    return {
      status: DeviceResponseStatus.Ok,
      data: filePath,
    }
  }

  private async waitUntilBackupDeviceFinished(
    id: string
  ): Promise<DeviceResponse<GetBackupDeviceStatusResponseBody>> {
    const response = await this.deviceBackupService.getBackupDeviceStatus({
      id,
    })

    if (
      !isResponsesSuccessWithData([response]) ||
      response.data?.state === GetBackupDeviceStatusDataState.Error
    ) {
      return { status: DeviceResponseStatus.Error }
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
  purePhone: PurePhoneAdapter,
  deviceBackupService: DeviceBackupService,
  deviceFileSystem: DeviceFileSystemAdapter
): DeviceBackup =>
  new DeviceBackup(purePhone, deviceBackupService, deviceFileSystem)

export default createDeviceBackupAdapter
