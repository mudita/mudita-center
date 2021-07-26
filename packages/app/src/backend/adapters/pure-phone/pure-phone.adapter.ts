/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import * as fs from "fs"
import * as CRC32 from "crc-32"
import { Endpoint, Method } from "@mudita/pure"
import PurePhoneAdapter from "Backend/adapters/pure-phone/pure-phone-adapter.class"
import DeviceResponse, {
  DeviceResponseStatus,
} from "Backend/adapters/device-response.interface"
import DeviceService, { DeviceServiceEventName } from "Backend/device-service"
import { noop } from "Renderer/utils/noop"
import timeout from "Backend/timeout"
import DeviceFileSystemService from "Backend/device-file-system-service"

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
    private deviceFileSystemService: DeviceFileSystemService
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
        data: data.gitTag,
      }
    } else {
      return {
        status,
        error: { message: "Get os version: Something went wrong" },
      }
    }
  }

  public getSerialNumber(): string {
    return "1UB13213MN14K1"
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
    return this.deviceFileSystemService.downloadFile("/sys/user/MuditaOS.log")
  }

  public async updateOs(
    filePath: string,
    progressChannel: string
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

      const fileResponse = await this.uploadOsUpdatePackage(filePath)

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

  private async uploadOsUpdatePackage(
    filePath: string
  ): Promise<DeviceResponse> {
    try {
      const fileSize = fs.lstatSync(filePath).size
      const fileBuffer = fs.readFileSync(filePath)
      const fileCrc32 = CRC32.buf(fileBuffer).toString(16)

      const { status, data } = await this.deviceService.request({
        endpoint: Endpoint.FileSystem,
        method: Method.Put,
        body: {
          fileSize,
          fileCrc32,
          fileName: "/sys/user/update.tar",
        },
      })

      if (status !== DeviceResponseStatus.Ok || data === undefined) {
        return {
          status: DeviceResponseStatus.Error,
          error: {
            message:
              "Upload OS update package: Something went wrong in init sending request",
          },
        }
      }

      const { txID, chunkSize } = data
      const fd = fs.openSync(filePath, "r")
      return this.sendFile(fd, txID, chunkSize)
    } catch {
      return {
        status: DeviceResponseStatus.Error,
        error: {
          message:
            "Upload OS update package: Something went wrong in open file",
        },
      }
    }
  }

  private async sendFile(
    fd: number,
    txID: string,
    chunkSize: number,
    chunkNo = 1
  ): Promise<DeviceResponse> {
    try {
      const buffer = Buffer.alloc(chunkSize)
      const nread = fs.readSync(fd, buffer, 0, chunkSize, null)

      if (nread === 0) {
        fs.closeSync(fd)
        return {
          status: DeviceResponseStatus.Ok,
        }
      }

      const lastChunk = nread < chunkSize
      const dataBuffer = lastChunk ? buffer.slice(0, nread) : buffer

      const response = await this.deviceService.request({
        endpoint: Endpoint.FileSystem,
        method: Method.Put,
        body: {
          txID,
          chunkNo,
          data: dataBuffer.toString("base64"),
        },
      })

      if (response.status !== DeviceResponseStatus.Ok) {
        fs.closeSync(fd)

        return {
          status: DeviceResponseStatus.Error,
          error: {
            message:
              "Upload OS update package: Something went wrong in sent chunk fie.",
          },
        }
      } else {
        return this.sendFile(fd, txID, chunkSize, chunkNo + 1)
      }
    } catch {
      return {
        status: DeviceResponseStatus.Error,
        error: {
          message:
            "Upload OS update package: Something went wrong in read file",
        },
      }
    }
  }

  private static getUpdateOsProgress(step: number): number {
    return Math.round((step / PurePhone.osUpdateStepsMax) * 100)
  }
}

const createPurePhoneAdapter = (
  deviceService: DeviceService,
  deviceFileSystemService: DeviceFileSystemService
): PurePhoneAdapter => new PurePhone(deviceService, deviceFileSystemService)

export default createPurePhoneAdapter
