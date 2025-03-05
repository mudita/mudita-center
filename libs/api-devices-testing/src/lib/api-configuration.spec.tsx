/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { DeviceProtocol } from "device-protocol/feature"
import { setKompaktConnection } from "./helpers/set-connection"
import { getApiFeaturesAndEntityTypes } from "./helpers/api-configuration-data"
import { APIConfigService } from "device/feature"
import { setActiveDevice } from "./helpers/protocol-validator"
import { ApiConfig, GeneralError } from "device/models"
import { VendorID, ProductID } from "Core/device/constants"

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

let deviceProtocol: DeviceProtocol
let featuresAndEntityTypes: { features: string[]; entityTypes: string[] }

describe("API configuration", () => {
  beforeAll(async () => {
    deviceProtocol = setActiveDevice(await setKompaktConnection())
    featuresAndEntityTypes = await getApiFeaturesAndEntityTypes(deviceProtocol)
    await deviceProtocol.activeDevice?.disconnect()
  })

  beforeEach(async () => {
    deviceProtocol = setActiveDevice(await setKompaktConnection())
  })

  afterEach(async () => {
    await deviceProtocol.activeDevice?.disconnect()
  }, 10000)

  it("should receive API configuration", async () => {
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
    const apiConfigService = new APIConfigService(deviceProtocol)

    const result = await apiConfigService.getAPIConfig()

    const apiConfig = result.data as ApiConfig

    expect(apiConfig.apiVersion).toMatch(/^\d+\.\d+\.\d+$/)
    expect(apiConfig.osVersion).toMatch(/^MuditaOS K/)
    expect(apiConfig.lang).toMatch(/^[a-z]{2}-[A-Z]{2}$/)
    expect(apiConfig.variant?.length).toBeGreaterThan(0)
    expect(apiConfig.features.sort()).toEqual(featuresAndEntityTypes.features)
    expect(apiConfig.entityTypes?.sort()).toEqual(
      featuresAndEntityTypes.entityTypes
    )
    expect(apiConfig.productId).toEqual(ProductID.MuditaKompaktChargeHex)
    expect(apiConfig.vendorId).toEqual(VendorID.MuditaKompaktHex)
    expect(apiConfig.serialNumber).toMatch(/^[A-Z0-9]{13}$/)
    expect(apiConfig.otaApiConfig?.otaApiKey.length).toEqual(15)
    expect(
      apiConfig.otaApiConfig?.osVersionTimestamp.toString().length
    ).toEqual(10)
  })
})
