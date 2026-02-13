/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  SerialPortDeviceInfo,
  SerialPortDeviceType,
  SerialPortRequest,
} from "app-serialport/models"
import { AppSerialPortService } from "app-serialport/main"
import {
  ApiConfigResponseValidator,
  ApiDevice,
  buildApiConfigRequest,
  buildSystemPostRequest,
} from "devices/api-device/models"

export const DEFAULT_CHUNK_SIZE = 14_336
export const DEFAULT_OUTBOX_EVENTS_COUNT = 100

export class ApiDeviceTestService {
  service = new AppSerialPortService()
  apiDevice?: ApiDevice

  // apiVersion = "1.0.0"
  chunkSizeInBytes = DEFAULT_CHUNK_SIZE
  outboxEventsCounter = DEFAULT_OUTBOX_EVENTS_COUNT

  private waitForApiDevice(): Promise<ApiDevice> {
    return new Promise((resolve, reject) => {
      this.service.onDevicesChanged(({ all }) => {
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

  async init() {
    if (!this.service) {
      this.service = new AppSerialPortService()
    }

    this.apiDevice = await this.waitForApiDevice()

    if (!this.apiDevice) {
      throw new Error("API device not found")
    }

    if (
      this.chunkSizeInBytes !== DEFAULT_CHUNK_SIZE ||
      this.outboxEventsCounter !== DEFAULT_OUTBOX_EVENTS_COUNT
    ) {
      await this.changePortSetup({
        chunkSizeInBytes: this.chunkSizeInBytes,
        outboxEventsCounter: this.outboxEventsCounter,
      })
    }
  }

  request(data: SerialPortRequest) {
    if (!this.apiDevice) {
      throw new Error("API device not initialized")
    }

    return this.service.request(this.apiDevice.id, data)
  }

  async reset() {
    if (!this.service) {
      return
    }

    await this.service.reset(this.apiDevice?.id)
  }

  async clearDeviceData() {
    if (!this.service) {
      throw new Error("API device not initialized")
    }

    return this.request(
      buildSystemPostRequest({
        action: "clearData",
      })
    )
  }

  async changePortSetup(options: {
    chunkSizeInBytes?: number
    outboxEventsCounter?: number
  }): Promise<boolean> {
    if (!this.apiDevice) {
      throw new Error("API device not initialized")
    }

    if (!options.chunkSizeInBytes && !options.outboxEventsCounter) {
      return false
    }

    const chunkSizeInBytes = options.chunkSizeInBytes || this.chunkSizeInBytes
    const outboxEventsCounter =
      options.outboxEventsCounter || this.outboxEventsCounter

    const serialPortSetup = await this.service.request(this.apiDevice.id, {
      endpoint: "SYSTEM",
      method: "POST",
      body: {
        action: "serial-port-setup",
        chunkSizeInBytes,
        outboxEventsCounter,
      },
    })

    if (serialPortSetup.status === 200) {
      this.chunkSizeInBytes = chunkSizeInBytes
      this.outboxEventsCounter = outboxEventsCounter
      return true
    }
    return false
  }

  async getApiFeaturesAndEntityTypes(): Promise<{
    features: string[]
    entityTypes: string[]
  }> {
    if (!this.apiDevice) {
      throw new Error("API device not initialized")
    }

    const genericFeatures = [
      "mc-overview",
      "mc-contacts",
      "mc-contacts-duplicates",
      "mc-data-migration",
      "mc-file-manager-internal",
    ].sort()

    const optionalFeatures = ["mc-file-manager-external"].sort()

    const testEntityTypes = [
      "contacts",
      "audioFiles",
      "imageFiles",
      "ebookFiles",
      "applicationFiles",
    ].sort()

    const result = await this.request({
      ...buildApiConfigRequest(),
      options: { timeout: 5000 },
    })

    const apiConfig = ApiConfigResponseValidator.parse(result.body)

    optionalFeatures.forEach((feature) => {
      if (
        apiConfig.features.includes(feature) &&
        !genericFeatures.includes(feature)
      ) {
        genericFeatures.push(feature)
      }
    })

    return { features: genericFeatures.sort(), entityTypes: testEntityTypes }
  }
}

// const getApiDevice = async () => {
//   console.log(
//     `[${new Date().toLocaleString()}] Waiting for API device...`,
//     service
//       ? "Service already initialized"
//       : "Service not initialized, initializing now..."
//   )
//   if (!service) {
//     service = new AppSerialPortService()
//     await service.init()
//   }
//
//   return await new Promise<ApiDevice>((resolve, reject) => {
//     service.onDevicesChanged(({ all }) => {
//       const deviceInfo = all.find(
//         (
//           deviceInfo
//         ): deviceInfo is SerialPortDeviceInfo<SerialPortDeviceType.ApiDevice> => {
//           return deviceInfo.deviceType === SerialPortDeviceType.ApiDevice
//         }
//       )
//       if (deviceInfo) {
//         console.log(
//           `[${new Date().toLocaleString()}] API device found:`,
//           deviceInfo
//         )
//         resolve(deviceInfo)
//       } else {
//         reject()
//       }
//     })
//   })
// }

// const changePortOptions = async (apiDevice: ApiDevice, options: Options) => {
//   if (!apiDevice) {
//     throw new Error("API device not initialized")
//   }
//
//   if (options?.chunkSize || options?.outboxEventsCount) {
//     const serialPortSetup = await service.request(apiDevice.id, {
//       endpoint: "SYSTEM",
//       method: "POST",
//       body: {
//         action: "serial-port-setup",
//         chunkSizeInBytes: options.chunkSize || DEFAULT_CHUNK_SIZE,
//         outboxEventsCounter:
//           options.outboxEventsCount || DEFAULT_OUTBOX_EVENTS_COUNT,
//       },
//     })
//     return serialPortSetup.status === 200
//   }
//
//   return false
// }

// export { service, getApiDevice, changePortOptions }
