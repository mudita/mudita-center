/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { KompaktProductID, KompaktVendorID } from "app-serialport/models"
import {
  ApiConfigResponseValidator,
  buildApiConfigRequest,
} from "devices/api-device/models"
import { initApiDevice } from "./helpers/api-device-context"
import { getApiFeaturesAndEntityTypes } from "./helpers/get-api-features-and-entity-types"
import { SerialPortDevice } from "app-serialport/main"
import semver from "semver/preload"

let featuresAndEntityTypes: { features: string[]; entityTypes: string[] }

beforeEach(() => {
  jest.resetModules()
})

let apiDevice: SerialPortDevice

describe("API configuration", () => {
  beforeEach(async () => {
    apiDevice = await initApiDevice()
    featuresAndEntityTypes = await getApiFeaturesAndEntityTypes(apiDevice)
  }, 30_000)

  it("should receive API configuration", async () => {
    const result = await apiDevice.request({
      ...buildApiConfigRequest(),
      options: { timeout: 5000 },
    })

    expect(result.status).toBe(200)
  })

  it("should receive valid API configuration response", async () => {
    const result = await apiDevice.request({
      ...buildApiConfigRequest(),
      options: { timeout: 5000 },
    })

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
