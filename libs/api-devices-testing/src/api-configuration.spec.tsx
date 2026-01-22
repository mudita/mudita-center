/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { KompaktProductID, KompaktVendorID } from "app-serialport/models"
import { ApiConfig, ApiDevice } from "devices/api-device/models"
import { getApiDevice } from "./helpers/get-api-device"
import { getApiFeaturesAndEntityTypes } from "./helpers/get-api-features-and-entity-types"
import { getApiDeviceConfig } from "./helpers/get-api-device-config"
import { closeApiDevice } from "./helpers/close-api-device"

let featuresAndEntityTypes: { features: string[]; entityTypes: string[] }

beforeEach(() => {
  jest.resetModules()
})

let device: ApiDevice

describe("API configuration", () => {
  beforeAll(async () => {
    device = await getApiDevice()
    featuresAndEntityTypes = await getApiFeaturesAndEntityTypes(device)
  }, 30000)

  afterAll(async () => {
    await closeApiDevice(device)
  })

  it("should receive API configuration", async () => {
    const result = await getApiDeviceConfig(device)

    expect(result.status).toBe(200)
  })

  it("should receive API configuration error on invalid deviceId", async () => {
    await expect(
      getApiDeviceConfig({ id: "invalid" } as unknown as ApiDevice)
    ).rejects.toThrow("Device not found at id invalid.")
  })

  it("should receive valid API configuration response", async () => {
    const result = await getApiDeviceConfig(device)

    const apiConfig = result.body as ApiConfig

    expect(apiConfig.apiVersion).toMatch(/^\d+\.\d+\.\d+$/)
    expect(apiConfig.osVersion).toMatch(/^MuditaOS K/)
    expect(apiConfig.lang).toMatch(/^[a-z]{2}-[A-Z]{2}$/)
    expect(apiConfig.variant?.length).toBeGreaterThan(0)
    expect(apiConfig.features.sort()).toEqual(featuresAndEntityTypes.features)
    expect(apiConfig.entityTypes?.sort()).toEqual(
      featuresAndEntityTypes.entityTypes
    )
    expect(apiConfig.productId).toEqual(KompaktProductID.ChargeHex)
    expect(apiConfig.vendorId).toEqual(KompaktVendorID.Hex)
    expect(apiConfig.serialNumber).toMatch(/^[A-Z0-9]{13}$/)
    expect(apiConfig.otaApiConfig?.otaApiKey.length).toEqual(15)
    expect(
      apiConfig.otaApiConfig?.osVersionTimestamp.toString().length
    ).toEqual(10)
  })
})
