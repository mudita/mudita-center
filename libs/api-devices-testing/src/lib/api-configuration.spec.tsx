/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { DeviceProtocol } from "device-protocol/feature"
import { setKompaktConnection } from "./helpers/set-connection"
import { APIConfigService } from "device/feature"
import {
  ApiConfig,
  GeneralError
} from "device/models"

jest.mock("shared/utils", () => {
  return { callRenderer: () => {} }
})
jest.mock("Core/device-manager/services/usb-devices/usb-devices.helper", () => {
  return { getUsbDevices: () => {} }
})
jest.mock("electron-better-ipc", () => {
  return {
    ipcMain: {
      emit: () => {},
    },
  }
})

describe("API configuration", () => {
  let deviceProtocol: DeviceProtocol | undefined = undefined
  const testFeatures = ["mc-overview","contacts","mc-data-migration","fileManager"].sort()
  const testEntityTypes = ["contacts","audioFiles","imageFiles","ebookFiles"].sort()
  const productId = 

  beforeEach(async () => {
    deviceProtocol = await setKompaktConnection()
  })

  afterEach(async () => {
    await deviceProtocol?.activeDevice?.disconnect()
  }, 10000)

  it("should receive API configuration success on default device id", async () => {
    expect(deviceProtocol?.devices).toHaveLength(1)
    expect(deviceProtocol).toBeTruthy()
    if (deviceProtocol === undefined) {
      return
    }

    deviceProtocol.setActiveDevice(deviceProtocol.devices[0].id)

    const apiConfigService = new APIConfigService(deviceProtocol)

    const result = await apiConfigService.getAPIConfig()

    expect(result.ok).toBeTruthy()
  })

  it("should receive API configuration error on invalid deviceId", async () => {
    expect(deviceProtocol?.devices).toHaveLength(1)

    if (deviceProtocol === undefined) {
      return
    }

    deviceProtocol.setActiveDevice(deviceProtocol.devices[0].id)

    const apiConfigService = new APIConfigService(deviceProtocol)

    const result = await apiConfigService.getAPIConfig("dummyID")
    expect(result.ok).toBeFalsy()
    expect(result.error?.type).toBe(GeneralError.NoDevice)
  })
  
  it("should receive valid API configuration response", async () => {
    expect(deviceProtocol?.devices).toHaveLength(1)

    if (deviceProtocol === undefined) {
      return
    }

    deviceProtocol.setActiveDevice(deviceProtocol.devices[0].id)

    const apiConfigService = new APIConfigService(deviceProtocol)

    const result = await apiConfigService.getAPIConfig()
    const apiConfig = result.data as ApiConfig

    expect(apiConfig.apiVersion).toMatch(/^\d+\.\d+\.\d+$/)
    expect(apiConfig.osVersion).toMatch(/^MuditaOS K/)
    expect(apiConfig.lang).toMatch(/^[a-z]{2}-[A-Z]{2}$/)
    expect(apiConfig.variant?.length).toBeGreaterThan(0)
    expect(apiConfig.features.sort()).toEqual(testFeatures)
    expect(apiConfig.entityTypes?.sort()).toEqual(testEntityTypes)
    expect(apiConfig.productId).toEqual("2006")
    expect(apiConfig.vendorId).toEqual("0e8d")
    expect(apiConfig.serialNumber).toMatch(/^[A-Z0-9]{13}$/)
    expect(apiConfig.otaApiConfig?.otaApiKey.length).toEqual(15)
    expect(apiConfig.otaApiConfig?.osVersionTimestamp.toString().length).toEqual(10)
  })

})
