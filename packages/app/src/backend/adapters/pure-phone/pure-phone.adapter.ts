/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Endpoint, Method, timeout } from "@mudita/pure"
import PurePhoneAdapter, {
  DeviceLogFilesOption,
} from "Backend/adapters/pure-phone/pure-phone-adapter.class"
import DeviceResponse, {
  DeviceResponseStatus,
} from "Backend/adapters/device-response.interface"
import DeviceService, { DeviceServiceEventName } from "Backend/device-service"
import { noop } from "Renderer/utils/noop"
import DeviceFileSystemService, {
  DeviceFile,
} from "Backend/device-file-system-service/device-file-system-service"
import DeviceFileDiagnosticService from "Backend/device-file-diagnostic-service/device-file-diagnostic-service"

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

  public disconnectDevice(): Promise<DeviceResponse> {
    return this.deviceService.disconnect()
  }

  public connectDevice(): Promise<DeviceResponse> {
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

  public async getUnlockDeviceStatus(): Promise<DeviceResponse> {
    return await this.deviceService.request({
      endpoint: Endpoint.Security,
      method: Method.Get,
    })
  }

  public async getDeviceLogFiles(
    option?: DeviceLogFilesOption
  ): Promise<DeviceResponse<DeviceFile[]>> {
    const allDiagnosticFileListResponse =
      await this.deviceFileDiagnosticService.getAllDiagnosticFileList()
    if (
      allDiagnosticFileListResponse.status !== DeviceResponseStatus.Ok ||
      allDiagnosticFileListResponse.data === undefined
    ) {
      return {
        status: DeviceResponseStatus.Error,
      }
    }

    const filePaths = allDiagnosticFileListResponse.data
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
        ? this.transformDeviceFilesByOption(deviceFiles, option)
        : deviceFiles,
      status: DeviceResponseStatus.Ok,
      data: [],
    }
  }

  public async updateOs(
    filePath: string,
    progressChannel = ""
  ): Promise<DeviceResponse> {
    let unregisterListeners = noop
    return new Promise<DeviceResponse>(async (resolve) => {
      let step = 0
      let cancelTimeout = noop

      const deviceConnectedListener = () => {
        if (step === PurePhone.osUpdateRestartStep) {
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

      const fileResponse = await this.deviceFileSystemService.uploadFile(
        filePath,
        "/sys/user/update.tar"
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

  private static getUpdateOsProgress(step: number): number {
    return Math.round((step / PurePhone.osUpdateStepsMax) * 100)
  }

  private transformDeviceFilesByOption(
    deviceFile: DeviceFile[],
    option: DeviceLogFilesOption = {}
  ): DeviceFile[] {
    console.log("option: ", option)
    return deviceFile
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
