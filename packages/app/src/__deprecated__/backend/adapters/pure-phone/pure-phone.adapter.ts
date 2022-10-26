/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import path from "path"
import {
  GetRestoreDeviceStatusRequestConfig,
  GetPhoneLockTimeResponseBody,
  GetRestoreDeviceStatusResponseBody,
  StartRestoreRequestConfig,
} from "App/device/types/mudita-os"
import { Device } from "App/device/modules/device"
import {
  Endpoint,
  Method,
  DeviceType,
  DiagnosticsFileList,
  PhoneLockCategory,
} from "App/device/constants"
import PurePhoneAdapter, {
  DeviceFilesOption,
} from "App/__deprecated__/backend/adapters/pure-phone/pure-phone-adapter.class"
import DeviceService from "App/__deprecated__/backend/device-service"
import DeviceFileSystemAdapter, {
  DeviceFile,
} from "App/__deprecated__/backend/adapters/device-file-system/device-file-system-adapter.class"
import DeviceFileDiagnosticService from "App/__deprecated__/backend/device-file-diagnostic-service/device-file-diagnostic-service"
import { transformDeviceFilesByOption } from "App/__deprecated__/backend/adapters/pure-phone/pure-phone.helpers"
import DeviceBaseInfoAdapter from "App/__deprecated__/backend/adapters/device-base-info/device-base-info-adapter.class"
import getAppPath from "App/__deprecated__/main/utils/get-app-path"
import {
  RequestResponse,
  RequestResponseStatus,
} from "App/core/types/request-response.interface"

class PurePhone extends PurePhoneAdapter {
  constructor(
    private deviceService: DeviceService,
    private deviceBaseInfo: DeviceBaseInfoAdapter,
    private deviceFileSystem: DeviceFileSystemAdapter,
    private deviceFileDiagnosticService: DeviceFileDiagnosticService
  ) {
    super()
  }

  public disconnectDevice(): Promise<RequestResponse> {
    return this.deviceService.disconnect()
  }

  public connectDevice(): Promise<RequestResponse<Device>> {
    return this.deviceService.connect()
  }

  public async unlockDevice(code: string): Promise<RequestResponse> {
    return await this.deviceService.request({
      endpoint: Endpoint.Security,
      method: Method.Put,
      body: {
        phoneLockCode: code,
      },
    })
  }

  public async getDeviceLockTime(): Promise<
    RequestResponse<GetPhoneLockTimeResponseBody>
  > {
    const { status, data } = await this.deviceService.request({
      endpoint: Endpoint.Security,
      method: Method.Get,
      body: { category: PhoneLockCategory.Time },
    })
    if (status === RequestResponseStatus.Ok && data) {
      return {
        status,
        data: data,
      }
    } else if (status === RequestResponseStatus.UnprocessableEntity) {
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

  public async getUnlockDeviceStatus(): Promise<RequestResponse> {
    return await this.deviceService.request({
      endpoint: Endpoint.Security,
      method: Method.Get,
      body: { category: PhoneLockCategory.Status },
    })
  }

  public async getDeviceLogFiles(
    option?: DeviceFilesOption
  ): Promise<RequestResponse<DeviceFile[]>> {
    return this.downloadDeviceFiles(DiagnosticsFileList.LOGS, option)
  }

  public async getDeviceCrashDumpFiles(): Promise<RequestResponse<string[]>> {
    return this.getDeviceFiles(DiagnosticsFileList.CRASH_DUMPS)
  }

  public async downloadDeviceCrashDumpFiles(): Promise<
    RequestResponse<string[]>
  > {
    return this.downloadDeviceFilesLocally(DiagnosticsFileList.CRASH_DUMPS)
  }

  public async startRestoreDevice(
    config: StartRestoreRequestConfig["body"]
  ): Promise<RequestResponse> {
    return await this.deviceService.request({
      endpoint: Endpoint.Restore,
      method: Method.Post,
      body: config,
    })
  }

  public async getRestoreDeviceStatus(
    config: GetRestoreDeviceStatusRequestConfig["body"]
  ): Promise<RequestResponse<GetRestoreDeviceStatusResponseBody>> {
    return await this.deviceService.request({
      endpoint: Endpoint.Restore,
      method: Method.Get,
      body: config,
    })
  }

  public async updateOs(filePath: string): Promise<RequestResponse> {
    const getDeviceInfoResponse = await this.deviceBaseInfo.getDeviceInfo()

    if (
      getDeviceInfoResponse.status !== RequestResponseStatus.Ok ||
      getDeviceInfoResponse.data === undefined
    ) {
      return {
        status: RequestResponseStatus.Error,
        error: { message: "updateOs: getOsVersion request failed" },
      }
    }

    const beforeUpdateOsVersion = getDeviceInfoResponse.data.osVersion

    const fileResponse = await this.deviceFileSystem.uploadFileLocally({
      filePath,
      targetPath: "/sys/user/update.tar",
    })

    if (fileResponse.status !== RequestResponseStatus.Ok) {
      return {
        status: RequestResponseStatus.Error,
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

    if (pureUpdateResponse.status !== RequestResponseStatus.Ok) {
      return {
        status: RequestResponseStatus.Error,
        error: { message: "updateOs: update request failed" },
      }
    }

    const deviceRestartResponse = await this.waitUntilDeviceRestart()

    if (deviceRestartResponse.status !== RequestResponseStatus.Ok) {
      return deviceRestartResponse
    }

    if (
      this.deviceService.currentDevice?.deviceType === DeviceType.MuditaPure
    ) {
      const deviceUnlockedResponse = await this.waitUntilDeviceUnlocked()

      if (deviceUnlockedResponse.status !== RequestResponseStatus.Ok) {
        return deviceUnlockedResponse
      }
    }

    const afterUpdateGetDeviceInfoResponse =
      await this.deviceBaseInfo.getDeviceInfo()

    if (
      afterUpdateGetDeviceInfoResponse.status !== RequestResponseStatus.Ok ||
      afterUpdateGetDeviceInfoResponse.data === undefined
    ) {
      return {
        status: RequestResponseStatus.Error,
        error: { message: "updateOs: getOsVersion request failed" },
      }
    }

    const afterUpdateOsVersion = afterUpdateGetDeviceInfoResponse.data.osVersion

    if (beforeUpdateOsVersion === afterUpdateOsVersion) {
      return {
        status: RequestResponseStatus.Error,
        error: { message: "updateOs: the version OS isn't changed" },
      }
    }

    return { status: RequestResponseStatus.Ok }
  }

  private async downloadDeviceFiles(
    fileList: DiagnosticsFileList,
    option?: DeviceFilesOption
  ): Promise<RequestResponse<DeviceFile[]>> {
    const files = await this.getDeviceFiles(fileList)

    if (files.status !== RequestResponseStatus.Ok || !files.data) {
      return {
        status: RequestResponseStatus.Error,
      }
    }

    const downloadDeviceFilesResponse =
      await this.deviceFileSystem.downloadDeviceFiles(files.data)
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
      data: option
        ? transformDeviceFilesByOption(deviceFiles, option)
        : deviceFiles,
      status: RequestResponseStatus.Ok,
    }
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
    const getDiagnosticFileListResponse =
      await this.deviceFileDiagnosticService.getDiagnosticFileList(fileList)

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

  private async waitUntilDeviceRestart(
    index = 0,
    deviceType = this.deviceService.currentDevice?.deviceType,
    timeout = 10000,
    callsMax = 60
  ): Promise<RequestResponse> {
    if (index === callsMax) {
      return {
        status: RequestResponseStatus.Error,
        error: {
          message: "updateOs: device no restart successful in 10 minutes",
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
      (response.status === RequestResponseStatus.Ok ||
        response.status === RequestResponseStatus.PhoneLocked)
    ) {
      return {
        status: RequestResponseStatus.Ok,
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
  ): Promise<RequestResponse> {
    if (index === callsMax) {
      return {
        status: RequestResponseStatus.Error,
        error: {
          message: "updateOs: device isn't unlocked by user in 10 minutes",
        },
      }
    }

    const response = await this.getUnlockDeviceStatus()

    if (index !== 0 && response.status === RequestResponseStatus.Ok) {
      return {
        status: RequestResponseStatus.Ok,
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
