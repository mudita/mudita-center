/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  Endpoint,
  Method,
  DiagnosticsFileList,
  GetPhoneLockTimeResponseBody,
  PhoneLockCategory,
  timeout,
  MuditaDevice,
  CaseColour,
  StartBackupResponseBody,
  GetBackupDeviceStatusResponseBody,
  GetBackupDeviceStatusRequestConfigBody,
  GetRestoreDeviceStatusResponseBody,
  StartRestoreRequestConfigBody,
} from "@mudita/pure"
import PurePhoneAdapter, {
  DeviceFilesOption,
} from "Backend/adapters/pure-phone/pure-phone-adapter.class"
import DeviceResponse, {
  DeviceResponseStatus,
} from "Backend/adapters/device-response.interface"
import DeviceService, { DeviceServiceEventName } from "Backend/device-service"
import { noop } from "Renderer/utils/noop"
import DeviceFileSystemService, {
  DeviceFileDeprecated,
  DeviceFile,
  UploadFileLocallyPayload,
  UploadFilePayload,
} from "Backend/device-file-system-service/device-file-system-service"
import DeviceFileDiagnosticService from "Backend/device-file-diagnostic-service/device-file-diagnostic-service"
import { transformDeviceFilesByOption } from "Backend/adapters/pure-phone/pure-phone.helpers"

export enum DeviceUpdateError {
  RestartTimedOut = "RestartTimedOut",
  DeviceDisconnectionBeforeDone = "DeviceDisconnectionBeforeDone",
}

export const deviceUpdateErrorCodeMap: Record<DeviceUpdateError, number> = {
  [DeviceUpdateError.RestartTimedOut]: 9900,
  [DeviceUpdateError.DeviceDisconnectionBeforeDone]: 9901,
}

class PurePhone extends PurePhoneAdapter {
  static osUpdateStepsMax = 3
  static osUpdateRestartStep = PurePhone.osUpdateStepsMax - 1
  constructor(
    private deviceService: DeviceService,
    private deviceFileSystemService: DeviceFileSystemService,
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
  ): Promise<DeviceResponse<DeviceFileDeprecated[]>> {
    return this.getDeviceFiles(DiagnosticsFileList.LOGS, option)
  }

  public async getDeviceCrashDumpFiles(
    option?: DeviceFilesOption
  ): Promise<DeviceResponse<DeviceFileDeprecated[]>> {
    return this.getDeviceFiles(DiagnosticsFileList.CRASH_DUMPS, option)
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
    const { status, data } = await this.deviceFileSystemService.downloadFile(
      filePath
    )

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
    return await this.deviceFileSystemService.uploadFile(payload)
  }

  public async uploadDeviceFileLocally(
    payload: UploadFileLocallyPayload
  ): Promise<DeviceResponse> {
    return await this.deviceFileSystemService.uploadFileLocally(payload)
  }

  public async updateOs(
    filePath: string,
    progressChannel = ""
  ): Promise<DeviceResponse> {
    const currentVersion = await this.getOsVersion()
    if (currentVersion.status !== DeviceResponseStatus.Ok) {
      return {
        status: DeviceResponseStatus.Error,
      }
    }

    let unregisterListeners = noop
    return new Promise<DeviceResponse>(async (resolve) => {
      let step = 0
      let cancelTimeout = noop
      const deviceConnectedListener = async () => {
        if (step === PurePhone.osUpdateRestartStep) {
          const newVersion = await this.getOsVersion()
          if (newVersion.status !== DeviceResponseStatus.Ok) {
            return resolve({
              status: DeviceResponseStatus.Error,
            })
          }
          if (newVersion.data === currentVersion.data) {
            return resolve({
              status: DeviceResponseStatus.Error,
            })
          }

          resolve({
            status: DeviceResponseStatus.Ok,
          })
        }
      }

      const deviceDisconnectedListener = () => {
        const [promise, cancel] = timeout(30000)
        cancelTimeout = cancel

        promise.then(() => {
          resolve({
            status: DeviceResponseStatus.Error,
            error: {
              code: deviceUpdateErrorCodeMap[DeviceUpdateError.RestartTimedOut],
              message: "restart pure has timed out",
            },
          })
        })

        if (step < PurePhone.osUpdateRestartStep) {
          resolve({
            status: DeviceResponseStatus.Error,
            error: {
              code: deviceUpdateErrorCodeMap[
                DeviceUpdateError.DeviceDisconnectionBeforeDone
              ],
              message: "device has disconnected before updating finish",
            },
          })
        }
      }

      unregisterListeners = () => {
        this.deviceService.off(
          DeviceServiceEventName.DeviceConnected,
          deviceConnectedListener
        )
        this.deviceService.off(
          DeviceServiceEventName.DeviceDisconnected,
          deviceDisconnectedListener
        )
        cancelTimeout()
      }

      this.deviceService.on(
        DeviceServiceEventName.DeviceDisconnected,
        deviceDisconnectedListener
      )

      this.deviceService.on(
        DeviceServiceEventName.DeviceConnected,
        deviceConnectedListener
      )

      const fileResponse = await this.deviceFileSystemService.uploadFileLocally(
        {
          filePath,
          targetPath: "/sys/user/update.tar",
        }
      )

      if (fileResponse.status === DeviceResponseStatus.Ok) {
        ++step

        this.deviceService.sendToRenderers(progressChannel, {
          progress: PurePhone.getUpdateOsProgress(step),
        })

        const pureUpdateResponse = await this.deviceService.request({
          endpoint: Endpoint.Update,
          method: Method.Post,
          body: {
            update: true,
            reboot: true,
          },
        })

        if (pureUpdateResponse.status === DeviceResponseStatus.Ok) {
          ++step
          this.deviceService.off(
            DeviceServiceEventName.DeviceDisconnected,
            deviceDisconnectedListener
          )

          this.deviceService.sendToRenderers(progressChannel, {
            progress: PurePhone.getUpdateOsProgress(step),
          })
        } else {
          resolve({
            status: DeviceResponseStatus.Error,
            error: pureUpdateResponse.error,
          })
        }
      } else {
        resolve({
          status: DeviceResponseStatus.Error,
        })
      }
    }).then((response) => {
      unregisterListeners()
      return response
    })
  }

  private async getDeviceFiles(
    fileList: DiagnosticsFileList,
    option?: DeviceFilesOption
  ): Promise<DeviceResponse<DeviceFileDeprecated[]>> {
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
    const downloadDeviceFilesResponse =
      await this.deviceFileSystemService.downloadDeviceFiles(filePaths)
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

  private static getUpdateOsProgress(step: number): number {
    return Math.round((step / PurePhone.osUpdateStepsMax) * 100)
  }
}

const createPurePhoneAdapter = (
  deviceService: DeviceService,
  deviceFileSystemService: DeviceFileSystemService,
  deviceFileDiagnosticService: DeviceFileDiagnosticService
): PurePhoneAdapter =>
  new PurePhone(
    deviceService,
    deviceFileSystemService,
    deviceFileDiagnosticService
  )

export default createPurePhoneAdapter
