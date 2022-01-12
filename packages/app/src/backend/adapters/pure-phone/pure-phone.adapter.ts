/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  CaseColour,
  DiagnosticsFileList,
  Endpoint,
  GetBackupDeviceStatusRequestConfigBody,
  GetBackupDeviceStatusResponseBody,
  GetPhoneLockTimeResponseBody,
  GetRestoreDeviceStatusResponseBody,
  Method,
  MuditaDevice,
  PhoneLockCategory,
  StartBackupResponseBody,
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
  UploadFileLocallyPayload,
  UploadFilePayload,
} from "Backend/adapters/device-file-system/device-file-system-adapter.class"
import DeviceFileDiagnosticService from "Backend/device-file-diagnostic-service/device-file-diagnostic-service"
import { transformDeviceFilesByOption } from "Backend/adapters/pure-phone/pure-phone.helpers"

class PurePhone extends PurePhoneAdapter {
  static osUpdateStepsMax = 3
  static osUpdateRestartStep = PurePhone.osUpdateStepsMax - 1
  constructor(
    private deviceService: DeviceService,
    private deviceFileSystem: DeviceFileSystemAdapter,
    private deviceFileDiagnosticService: DeviceFileDiagnosticService
  ) {
    super()
  }

  public getModelName(): string {
    return "Ziemniaczek Puree"
  }

  public getModelNumber(): string {
    return "Y0105W4GG1N5"
  }

  public getName(): string {
    return "Mudita Pure"
  }

  //TODO: handle it after add missed fields in API -> https://appnroll.atlassian.net/browse/PDA-590
  public getOsUpdateDate(): string {
    return "2020-01-14T11:31:08.244Z"
  }

  public async getOsVersion(): Promise<DeviceResponse<string>> {
    const { status, data } = await this.deviceService.request({
      endpoint: Endpoint.DeviceInfo,
      method: Method.Get,
    })

    if (status === DeviceResponseStatus.Ok && data) {
      return {
        status,
        data: data.version,
      }
    } else {
      return {
        status,
        error: { message: "Get os version: Something went wrong" },
      }
    }
  }

  public async getSerialNumber(): Promise<DeviceResponse<string>> {
    const { status, data } = await this.deviceService.request({
      endpoint: Endpoint.DeviceInfo,
      method: Method.Get,
    })
    if (status === DeviceResponseStatus.Ok && data) {
      return {
        status,
        data: data.serialNumber,
      }
    } else {
      return {
        status,
        error: { message: "Get serial number: Something went wrong" },
      }
    }
  }

  public async getCaseColour(): Promise<DeviceResponse<CaseColour>> {
    const { status, data } = await this.deviceService.request({
      endpoint: Endpoint.DeviceInfo,
      method: Method.Get,
    })
    if (status === DeviceResponseStatus.Ok && data) {
      return {
        status,
        data: data.caseColour ? data.caseColour : CaseColour.Gray,
      }
    } else {
      return {
        status,
        error: { message: "Get case colour: Something went wrong" },
      }
    }
  }

  public async getBackupLocation(): Promise<DeviceResponse<string>> {
    const { status, data } = await this.deviceService.request({
      endpoint: Endpoint.DeviceInfo,
      method: Method.Get,
    })
    if (status === DeviceResponseStatus.Ok && data) {
      return {
        status,
        data: data.backupLocation ? data.backupLocation : "",
      }
    } else {
      return {
        status,
        error: { message: "Get backup location: Something went wrong" },
      }
    }
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

  public async downloadDeviceFile(
    filePath: string
  ): Promise<DeviceResponse<DeviceFile>> {
    const { status, data } = await this.deviceFileSystem.downloadFile(filePath)

    if (status !== DeviceResponseStatus.Ok || data === undefined) {
      return {
        status: DeviceResponseStatus.Error,
      }
    }
    const name = filePath.split("/").pop() as string

    return {
      status: DeviceResponseStatus.Ok,
      data: { name, data },
    }
  }

  public async uploadDeviceFile(
    payload: UploadFilePayload
  ): Promise<DeviceResponse> {
    return await this.deviceFileSystem.uploadFile(payload)
  }

  public async uploadDeviceFileLocally(
    payload: UploadFileLocallyPayload
  ): Promise<DeviceResponse> {
    return await this.deviceFileSystem.uploadFileLocally(payload)
  }

  public async updateOs(filePath: string): Promise<DeviceResponse> {
    const getDeviceInfoResponse = await this.getOsVersion()

    if (
      getDeviceInfoResponse.status !== DeviceResponseStatus.Ok ||
      getDeviceInfoResponse.data === undefined
    ) {
      return {
        status: DeviceResponseStatus.Error,
        error: { message: "updateOs: getOsVersion request failed" },
      }
    }

    const beforeUpdateOsVersion = getDeviceInfoResponse.data

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

    const deviceUnlockedResponse = await this.waitUntilDeviceUnlocked()

    if (deviceUnlockedResponse.status !== DeviceResponseStatus.Ok) {
      return deviceUnlockedResponse
    }

    const afterUpdateGetDeviceInfoResponse = await this.getOsVersion()

    if (
      afterUpdateGetDeviceInfoResponse.status !== DeviceResponseStatus.Ok ||
      afterUpdateGetDeviceInfoResponse.data === undefined
    ) {
      return {
        status: DeviceResponseStatus.Error,
        error: { message: "updateOs: getOsVersion request failed" },
      }
    }

    const afterUpdateOsVersion = afterUpdateGetDeviceInfoResponse.data

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
      await this.deviceFileSystem.downloadLocally(files.data, "crash-dumps")
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

  public async removeDeviceFile(removeFile: string): Promise<DeviceResponse> {
    if (!removeFile) {
      return {
        status: DeviceResponseStatus.Error,
      }
    }

    const { status } = await this.deviceService.request({
      endpoint: Endpoint.FileSystem,
      method: Method.Delete,
      body: {
        removeFile,
      },
    })

    return {
      status,
    }
  }

  private async waitUntilDeviceRestart(
    index = 0,
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

    const response = await this.getUnlockDeviceStatus()

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
          resolve(this.waitUntilDeviceRestart(++index))
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
  deviceFileSystem: DeviceFileSystemAdapter,
  deviceFileDiagnosticService: DeviceFileDiagnosticService
): PurePhoneAdapter =>
  new PurePhone(deviceService, deviceFileSystem, deviceFileDiagnosticService)

export default createPurePhoneAdapter
