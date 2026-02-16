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

export class ApiDeviceTestService {
  service = new AppSerialPortService()
  apiDevice?: ApiDevice
  private initialized = false

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
    if (this.initialized) {
      return
    }
    this.initialized = true

    if (!this.service) {
      this.service = new AppSerialPortService()
    }

    this.apiDevice = await this.waitForApiDevice()

    if (!this.apiDevice) {
      throw new Error("API device not found")
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

    await this.service.reset(this.apiDevice?.id, false)
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

  async getApiConfig() {
    const response = await this.request({
      ...buildApiConfigRequest(),
      options: { timeout: 5000 },
    })

    if (response.status !== 200) {
      throw new Error(`Failed to get API config: ${response.status}`)
    }

    return ApiConfigResponseValidator.parse(response.body)
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
      "mc-data-migration",
      "mc-file-manager-internal",
    ].sort()

    const optionalFeatures = [
      "mc-file-manager-external",
      "mc-contacts-duplicates",
    ].sort()

    const testEntityTypes = [
      "contacts",
      "audioFiles",
      "imageFiles",
      "ebookFiles",
      "applicationFiles",
    ].sort()

    const apiConfig = await this.getApiConfig()

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

let service: ApiDeviceTestService

export const getService = (): ApiDeviceTestService => {
  if (!service) {
    service = new ApiDeviceTestService()
  }
  return service
}
