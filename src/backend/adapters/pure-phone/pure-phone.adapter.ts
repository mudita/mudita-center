/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import { Endpoint, Method } from "pure"
import PurePhoneAdapter from "Backend/adapters/pure-phone/pure-phone-adapter.class"
import DeviceResponse, {
  DeviceResponseStatus,
} from "Backend/adapters/device-response.interface"
import DeviceService, { DeviceServiceEventName } from "Backend/device-service"
import { noop } from "Renderer/utils/noop"

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
        data: data.gitTag,
      }
    } else {
      return { status, error: { message: "Something went wrong" } }
    }
  }

  public getSerialNumber(): string {
    return "1UB13213MN14K1"
  }

  public disconnectDevice(): DeviceResponse {
    return {
      status: DeviceResponseStatus.Ok,
    }
  }

  public connectDevice(): Promise<DeviceResponse> {
    return this.deviceService.connect()
  }

  public async updateOs(
    filePath: string,
    progressChannel: string
  ): Promise<DeviceResponse> {
    let unregisterListeners = noop
    return new Promise<DeviceResponse>(async (resolve) => {
      let step = 0

      const connectedDeviceListener = () => {
        if (step === PurePhone.osUpdateRestartStep) {
          resolve({
            status: DeviceResponseStatus.Ok,
          })
        }
      }

      const disconnectedDeviceListener = () => {
        if (step < PurePhone.osUpdateRestartStep) {
          resolve({
            status: DeviceResponseStatus.Error,
          })
        }
      }
      unregisterListeners = () => {
        this.deviceService.off(
          DeviceServiceEventName.ConnectedDevice,
          connectedDeviceListener
        )
        this.deviceService.off(
          DeviceServiceEventName.DisconnectedDevice,
          disconnectedDeviceListener
        )
      }

      this.deviceService.on(
        DeviceServiceEventName.DisconnectedDevice,
        disconnectedDeviceListener
      )

      this.deviceService.on(
        DeviceServiceEventName.ConnectedDevice,
        connectedDeviceListener
      )

      const fileResponse = await this.deviceService.request({
        endpoint: Endpoint.FileUpload,
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
            DeviceServiceEventName.DisconnectedDevice,
            disconnectedDeviceListener
          )

          this.deviceService.sendToRenderers(progressChannel, {
            progress: PurePhone.getUpdateOsProgress(step),
          })
        } else {
          resolve({
            status: DeviceResponseStatus.Error,
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
}

const createPurePhoneAdapter = (
  deviceService: DeviceService
): PurePhoneAdapter => new PurePhone(deviceService)

export default createPurePhoneAdapter
