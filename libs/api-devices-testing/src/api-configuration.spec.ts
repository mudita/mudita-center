/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { KompaktProductID, KompaktVendorID } from "app-serialport/models"
import {
  ApiConfigResponseValidator,
  buildApiConfigRequest,
} from "devices/api-device/models"
import { ApiDeviceTestService } from "./helpers/api-device-test-service"
import semver from "semver/preload"

let service: ApiDeviceTestService
let featuresAndEntityTypes: { features: string[]; entityTypes: string[] }

describe("API configuration", () => {
  beforeAll(async () => {
    service = new ApiDeviceTestService()
  }, 30_000)

  beforeEach(async () => {
    await service.init()
    featuresAndEntityTypes = await service.getApiFeaturesAndEntityTypes()
  }, 30_000)

  afterEach(async () => {
    await service.reset()
  }, 30_000)

  it("should receive API configuration", async () => {
    const result = await service.request(buildApiConfigRequest())

    expect(result.status).toBe(200)
  })

  it("should receive valid API configuration response", async () => {
    const result = await service.request(buildApiConfigRequest())

    const apiConfig = ApiConfigResponseValidator.parse(result.body)

    expect(apiConfig.apiVersion).toMatch(/^\d+\.\d+\.\d+$/)
    expect(apiConfig.osVersion).toMatch(/^MuditaOS K/)
    expect(apiConfig.lang).toMatch(/^[a-z]{2}-[A-Z]{2}$/)
    expect(apiConfig.variant?.length).toBeGreaterThan(0)

    if (semver.gte(apiConfig.apiVersion, "1.0.1")) {
      expect(apiConfig.features.sort()).toEqual(featuresAndEntityTypes.features)
    } else {
      expect(apiConfig.features.sort()).toEqual(
        featuresAndEntityTypes.features.filter(
          (type) => type !== "mc-contacts-duplicates"
        )
      )
    }

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
