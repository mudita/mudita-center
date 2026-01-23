/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { KompaktProductID, KompaktVendorID } from "app-serialport/models"
import {
  ApiConfigResponseValidator,
  ApiDevice,
  buildApiConfigRequest,
} from "devices/api-device/models"
import { AppSerialPortService } from "app-serialport/main"
import { getApiDevice } from "./helpers/get-api-device"
import { getApiFeaturesAndEntityTypes } from "./helpers/get-api-features-and-entity-types"
import { getSerialPortService } from "./helpers/get-serial-port-service"

let featuresAndEntityTypes: { features: string[]; entityTypes: string[] }

beforeEach(() => {
  jest.resetModules()
})

let device: ApiDevice
let serialPortService: AppSerialPortService

describe("API configuration", () => {
  beforeAll(async () => {
    device = await getApiDevice()
    serialPortService = await getSerialPortService()
    featuresAndEntityTypes = await getApiFeaturesAndEntityTypes(device)
  }, 30000)

  afterAll(async () => {
    serialPortService.close(device.id)
  })

  it("should receive API configuration", async () => {
    const result = await serialPortService.request(device.id, {
      ...buildApiConfigRequest(),
      options: { timeout: 5000 },
    })

    expect(result.status).toBe(200)
  })

  it.skip("should receive API configuration error on invalid deviceId", async () => {
    await expect(
      await serialPortService.request("invalid", buildApiConfigRequest())
    ).rejects.toThrow("Device not found at id invalid.")
  })

  it("should receive valid API configuration response", async () => {
    const result = await serialPortService.request(device.id, {
      ...buildApiConfigRequest(),
      options: { timeout: 5000 },
    })

    const apiConfig = ApiConfigResponseValidator.parse(result.body)

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
