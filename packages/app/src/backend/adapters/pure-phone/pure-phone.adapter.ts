/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import path from "path"
import {
  DeviceType,
  DiagnosticsFileList,
  Endpoint,
  GetBackupDeviceStatusRequestConfigBody,
  GetPhoneLockTimeResponseBody,
  GetRestoreDeviceStatusResponseBody,
  Method,
  MuditaDevice,
  PhoneLockCategory,
  StartRestoreRequestConfigBody,
} from "@mudita/pure"
import PurePhoneAdapter, {
  DeviceFilesOption,
} from "Backend/adapters/pure-phone/pure-phone-adapter.class"
import DeviceResponse, {
  DeviceResponseStatus,
} from "Backend/adapters/device-response.interface"
import DeviceService from "Backend/device-service"
import DeviceFileSystemAdapter, {
  DeviceFile,
} from "Backend/adapters/device-file-system/device-file-system-adapter.class"
import DeviceFileDiagnosticService from "Backend/device-file-diagnostic-service/device-file-diagnostic-service"
import { transformDeviceFilesByOption } from "Backend/adapters/pure-phone/pure-phone.helpers"
import DeviceBaseInfoAdapter from "Backend/adapters/device-base-info/device-base-info-adapter.class"
import getAppPath from "App/main/utils/get-app-path"

class PurePhone extends PurePhoneAdapter {
  constructor(
    private deviceService: DeviceService,
    private deviceBaseInfo: DeviceBaseInfoAdapter,
    private deviceFileSystem: DeviceFileSystemAdapter,
    private deviceFileDiagnosticService: DeviceFileDiagnosticService
  ) {
    super()
  }

  public disconnectDevice(): Promise<DeviceResponse> {
    return this.deviceService.disconnect()
  }

  public connectDevice(): Promise<DeviceResponse<MuditaDevice>> {
    return this.deviceService.connect()
  }

  public async unlockDevice(code: string): Promise<DeviceResponse> {
    return await this.deviceService.request({
      endpoint: Endpoint.Security,
      method: Method.Put,
      body: {
        phoneLockCode: code,
      },
    })
  }

  public async getDeviceLockTime(): Promise<
    DeviceResponse<GetPhoneLockTimeResponseBody>
  > {
    const { status, data } = await this.deviceService.request({
      endpoint: Endpoint.Security,
      method: Method.Get,
      body: { category: PhoneLockCategory.Time },
    })
    if (status === DeviceResponseStatus.Ok && data) {
      return {
        status,
        data: data,
      }
    } else if (status === DeviceResponseStatus.UnprocessableEntity) {
      return {
        status,
        error: {
          message:
            "Get device lock time: phone is unlocked or unlocking phone is possible in this moment",
        },
      }
    } else {
      return {
        status,
        error: { message: "Get device lock time: Something went wrong" },
      }
    }
  }

  public async getUnlockDeviceStatus(): Promise<DeviceResponse> {
    return await this.deviceService.request({
      endpoint: Endpoint.Security,
      method: Method.Get,
      body: { category: PhoneLockCategory.Status },
    })
  }

  public async getDeviceLogFiles(
    option?: DeviceFilesOption
  ): Promise<DeviceResponse<DeviceFile[]>> {
    return this.downloadDeviceFiles(DiagnosticsFileList.LOGS, option)
  }

  public async getDeviceCrashDumpFiles(): Promise<DeviceResponse<string[]>> {
    return this.getDeviceFiles(DiagnosticsFileList.CRASH_DUMPS)
  }

  public async downloadDeviceCrashDumpFiles(): Promise<
    DeviceResponse<string[]>
  > {
    return this.downloadDeviceFilesLocally(DiagnosticsFileList.CRASH_DUMPS)
  }

  public async startRestoreDevice(
    config: StartRestoreRequestConfigBody
  ): Promise<DeviceResponse> {
    return await this.deviceService.request({
      endpoint: Endpoint.Restore,
      method: Method.Post,
      body: config,
    })
  }

  public async getRestoreDeviceStatus(
    config: GetBackupDeviceStatusRequestConfigBody
  ): Promise<DeviceResponse<GetRestoreDeviceStatusResponseBody>> {
    return await this.deviceService.request({
      endpoint: Endpoint.Restore,
      method: Method.Get,
      body: config,
    })
  }

  public async updateOs(filePath: string): Promise<DeviceResponse> {
    const getDeviceInfoResponse = await this.deviceBaseInfo.getDeviceInfo()

    if (
      getDeviceInfoResponse.status !== DeviceResponseStatus.Ok ||
      getDeviceInfoResponse.data === undefined
    ) {
      return {
        status: DeviceResponseStatus.Error,
        error: { message: "updateOs: getOsVersion request failed" },
      }
    }

    const beforeUpdateOsVersion = getDeviceInfoResponse.data.osVersion

    const fileResponse = await this.deviceFileSystem.uploadFileLocally({
      filePath,
      targetPath: "/sys/user/update.tar",
    })

    if (fileResponse.status !== DeviceResponseStatus.Ok) {
      return {
        status: DeviceResponseStatus.Error,
        error: { message: "updateOs: upload OS failed" },
      }
    }

    const pureUpdateResponse = await this.deviceService.request({
      endpoint: Endpoint.Update,
      method: Method.Post,
      body: {
        update: true,
        reboot: true,
      },
    })

    if (pureUpdateResponse.status !== DeviceResponseStatus.Ok) {
      return {
        status: DeviceResponseStatus.Error,
        error: { message: "updateOs: update request failed" },
      }
    }

    const deviceRestartResponse = await this.waitUntilDeviceRestart()

    if (deviceRestartResponse.status !== DeviceResponseStatus.Ok) {
      return deviceRestartResponse
    }

    if (
      this.deviceService.currentDevice?.deviceType === DeviceType.MuditaPure
    ) {
      const deviceUnlockedResponse = await this.waitUntilDeviceUnlocked()

      if (deviceUnlockedResponse.status !== DeviceResponseStatus.Ok) {
        return deviceUnlockedResponse
      }
    }

    const afterUpdateGetDeviceInfoResponse =
      await this.deviceBaseInfo.getDeviceInfo()

    if (
      afterUpdateGetDeviceInfoResponse.status !== DeviceResponseStatus.Ok ||
      afterUpdateGetDeviceInfoResponse.data === undefined
    ) {
      return {
        status: DeviceResponseStatus.Error,
        error: { message: "updateOs: getOsVersion request failed" },
      }
    }

    const afterUpdateOsVersion = afterUpdateGetDeviceInfoResponse.data.osVersion

    if (beforeUpdateOsVersion === afterUpdateOsVersion) {
      return {
        status: DeviceResponseStatus.Error,
        error: { message: "updateOs: the version OS isn't changed" },
      }
    }

    return { status: DeviceResponseStatus.Ok }
  }

  private async downloadDeviceFiles(
    fileList: DiagnosticsFileList,
    option?: DeviceFilesOption
  ): Promise<DeviceResponse<DeviceFile[]>> {
    const files = await this.getDeviceFiles(fileList)

    if (files.status !== DeviceResponseStatus.Ok || !files.data) {
      return {
        status: DeviceResponseStatus.Error,
      }
    }

    const downloadDeviceFilesResponse =
      await this.deviceFileSystem.downloadDeviceFiles(files.data)
    const deviceFiles = downloadDeviceFilesResponse.data

    if (
      downloadDeviceFilesResponse.status !== DeviceResponseStatus.Ok ||
      deviceFiles === undefined
    ) {
      return {
        status: DeviceResponseStatus.Error,
      }
    }
    return {
      data: option
        ? transformDeviceFilesByOption(deviceFiles, option)
        : deviceFiles,
      status: DeviceResponseStatus.Ok,
    }
  }

  private async downloadDeviceFilesLocally(
    fileList: DiagnosticsFileList
  ): Promise<DeviceResponse<string[]>> {
    const files = await this.getDeviceFiles(fileList)

    if (files.status !== DeviceResponseStatus.Ok || !files.data) {
      return {
        status: DeviceResponseStatus.Error,
      }
    }

    const downloadDeviceFilesResponse =
      await this.deviceFileSystem.downloadDeviceFilesLocally(files.data, {
        cwd: path.join(getAppPath(), "crash-dumps"),
      })
    const deviceFiles = downloadDeviceFilesResponse.data

    if (
      downloadDeviceFilesResponse.status !== DeviceResponseStatus.Ok ||
      deviceFiles === undefined
    ) {
      return {
        status: DeviceResponseStatus.Error,
      }
    }

    return {
      data: deviceFiles,
      status: DeviceResponseStatus.Ok,
    }
  }

  private async getDeviceFiles(
    fileList: DiagnosticsFileList
  ): Promise<DeviceResponse<string[]>> {
    const getDiagnosticFileListResponse =
      await this.deviceFileDiagnosticService.getDiagnosticFileList(fileList)

    if (
      getDiagnosticFileListResponse.status !== DeviceResponseStatus.Ok ||
      getDiagnosticFileListResponse.data === undefined
    ) {
      return {
        status: DeviceResponseStatus.Error,
      }
    }

    const filePaths = getDiagnosticFileListResponse.data.files

    return {
      data: filePaths,
      status: DeviceResponseStatus.Ok,
    }
  }

  private async waitUntilDeviceRestart(
    index = 0,
    deviceType = this.deviceService.currentDevice?.deviceType,
    timeout = 5000,
    callsMax = 36
  ): Promise<DeviceResponse> {
    if (index === callsMax) {
      return {
        status: DeviceResponseStatus.Error,
        error: {
          message: "updateOs: device no restart successful in 3 minutes",
        },
      }
    }

    let response

    if (deviceType === DeviceType.MuditaHarmony) {
      response = await this.deviceBaseInfo.getDeviceInfo()
    } else {
      response = await this.getUnlockDeviceStatus()
    }

    if (
      index !== 0 &&
      (response.status === DeviceResponseStatus.Ok ||
        response.status === DeviceResponseStatus.PhoneLocked)
    ) {
      return {
        status: DeviceResponseStatus.Ok,
      }
    } else {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(this.waitUntilDeviceRestart(++index, deviceType))
        }, timeout)
      })
    }
  }

  private async waitUntilDeviceUnlocked(
    index = 0,
    timeout = 5000,
    callsMax = 120
  ): Promise<DeviceResponse> {
    if (index === callsMax) {
      return {
        status: DeviceResponseStatus.Error,
        error: {
          message: "updateOs: device isn't unlocked by user in 10 minutes",
        },
      }
    }

    const response = await this.getUnlockDeviceStatus()

    if (index !== 0 && response.status === DeviceResponseStatus.Ok) {
      return {
        status: DeviceResponseStatus.Ok,
      }
    } else {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(this.waitUntilDeviceUnlocked(++index))
        }, timeout)
      })
    }
  }
}

const createPurePhoneAdapter = (
  deviceService: DeviceService,
  deviceBaseInfo: DeviceBaseInfoAdapter,
  deviceFileSystem: DeviceFileSystemAdapter,
  deviceFileDiagnosticService: DeviceFileDiagnosticService
): PurePhoneAdapter =>
  new PurePhone(
    deviceService,
    deviceBaseInfo,
    deviceFileSystem,
    deviceFileDiagnosticService
  )

export default createPurePhoneAdapter
