/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Endpoint, Method } from "@mudita/pure"
import PurePhoneAdapter from "Backend/adapters/pure-phone/pure-phone-adapter.class"
import DeviceResponse, {
  DeviceResponseStatus,
} from "Backend/adapters/device-response.interface"
import DeviceService, { DeviceServiceEventName } from "Backend/device-service"
import { noop } from "Renderer/utils/noop"
import timeout from "Backend/timeout"

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
  constructor(private deviceService: DeviceService) {
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

  public async getDeviceLogs(): Promise<DeviceResponse<string>> {
    const { status, data } = await this.deviceService.request({
      endpoint: Endpoint.FileSystem,
      method: Method.Get,
      body: {
        fileName: "/sys/user/MuditaOS.log",
      },
    })

    if (status !== DeviceResponseStatus.Ok || data === undefined) {
      return {
        status: DeviceResponseStatus.Error,
        error: {
          message:
            "Get device logs: Something went wrong in init downloading request",
        },
      }
    }

    const { rxID, fileSize, chunkSize } = data
    const chunkLength = fileSize > chunkSize ? fileSize / chunkSize : 1
    const downloadFileResponse = await this.downloadEncodedFile(
      rxID,
      chunkLength
    )

    if (
      downloadFileResponse.status === DeviceResponseStatus.Ok &&
      downloadFileResponse.data !== undefined
    ) {
      const buffer = Buffer.from(downloadFileResponse.data, "base64")

      return {
        status: DeviceResponseStatus.Ok,
        data: buffer.toString(),
      }
    } else {
      return {
        status: DeviceResponseStatus.Error,
        error: {
          message:
            "Get device logs: Something went wrong in downloading request",
        },
      }
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
              code:
                deviceUpdateErrorCodeMap[
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

      const fileResponse = await this.deviceService.request({
        endpoint: Endpoint.UploadUpdateFileSystem,
        method: Method.Post,
        filePath,
      })

      if (fileResponse.status === DeviceResponseStatus.Ok) {
        ++step

        this.deviceService.sendToRenderers(progressChannel, {
          progress: PurePhone.getUpdateOsProgress(step),
        })

        const pureUpdateResponse = await this.deviceService.request({
          endpoint: Endpoint.DeviceUpdate,
          method: Method.Post,
          filePath,
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

  private async downloadEncodedFile(
    rxID: string,
    chunkLength: number,
    chunkNo = 1,
    chunkedString = ""
  ): Promise<DeviceResponse<string>> {
    const { status, data } = await this.deviceService.request({
      endpoint: Endpoint.FileSystem,
      method: Method.Get,
      body: {
        rxID,
        chunkNo,
      },
    })

    if (status !== DeviceResponseStatus.Ok || data === undefined) {
      return {
        status: DeviceResponseStatus.Error,
        error: { message: "Download encoded file: Something went wrong" },
      }
    }

    const string = `${chunkedString}${data.data}`

    if (chunkNo < chunkLength) {
      return this.downloadEncodedFile(rxID, chunkLength, chunkNo + 1, string)
    } else {
      return {
        status,
        data: string,
      }
    }
  }

  private static getUpdateOsProgress(step: number): number {
    return Math.round((step / PurePhone.osUpdateStepsMax) * 100)
  }
}

const createPurePhoneAdapter = (
  deviceService: DeviceService
): PurePhoneAdapter => new PurePhone(deviceService)

export default createPurePhoneAdapter
