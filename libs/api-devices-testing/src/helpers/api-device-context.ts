/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  SerialPortDeviceInfo,
  SerialPortDeviceType,
} from "app-serialport/models"
import { AppSerialPortService } from "app-serialport/main"
import { ApiDevice } from "devices/api-device/models"

export const DEFAULT_CHUNK_SIZE = 14_336
export const DEFAULT_OUTBOX_EVENTS_COUNT = 100

interface Options {
  chunkSize?: number
  outboxEventsCount?: number
}

let service: AppSerialPortService

const getApiDevice = async () => {
  if (!service) {
    service = new AppSerialPortService()
    await service.init()
  }

  return await new Promise<ApiDevice>((resolve, reject) => {
    service.onDevicesChanged(({ all }) => {
      const deviceInfo = all.find(
        (
          deviceInfo
        ): deviceInfo is SerialPortDeviceInfo<SerialPortDeviceType.ApiDevice> => {
          return deviceInfo.deviceType === SerialPortDeviceType.ApiDevice
        }
      )
      if (deviceInfo) {
        resolve(deviceInfo)
      } else {
        reject()
      }
    })
  })
}

const changePortOptions = async (apiDevice: ApiDevice, options: Options) => {
  if (!apiDevice) {
    throw new Error("API device not initialized")
  }

  if (options?.chunkSize || options?.outboxEventsCount) {
    const serialPortSetup = await service.request(apiDevice.id, {
      endpoint: "SYSTEM",
      method: "POST",
      body: {
        action: "serial-port-setup",
        chunkSizeInBytes: options.chunkSize || DEFAULT_CHUNK_SIZE,
        outboxEventsCounter:
          options.outboxEventsCount || DEFAULT_OUTBOX_EVENTS_COUNT,
      },
    })
    return serialPortSetup.status === 200
  }

  return false
}

export { service, getApiDevice, changePortOptions }
