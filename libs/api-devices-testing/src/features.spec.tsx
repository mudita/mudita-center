/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  ApiDevice,
  buildFeatureConfigRequest,
  buildFeatureDataRequest,
} from "devices/api-device/models"
import { AppSerialPortService } from "app-serialport/main"
import { getApiDevice } from "./helpers/get-api-device"
import { getSerialPortService } from "./helpers/get-serial-port-service"
import { getApiFeaturesAndEntityTypes } from "./helpers/get-api-features-and-entity-types"

let device: ApiDevice
let serialPortService: AppSerialPortService
let featuresAndEntityTypes: { features: string[]; entityTypes: string[] }
const notSupportedDataFeatures: string[] = ["dummy-feature"]

describe("Feature Configuration and Data", () => {
  beforeAll(async () => {
    device = await getApiDevice()
    serialPortService = await getSerialPortService()
    featuresAndEntityTypes = await getApiFeaturesAndEntityTypes(device)
    featuresAndEntityTypes.features = featuresAndEntityTypes.features.filter(
      (feature) => feature !== "mc-overview"
    )
  }, 10000)

  afterAll(async () => {
    serialPortService.close(device.id)
  })

  it("should receive valid configuration for mc-overview feature", async () => {
    const result = await serialPortService.request(
      device.id,
      buildFeatureConfigRequest({
        feature: "mc-overview",
        lang: "en-US",
      })
    )
    expect(result.status).toBe(200)
  })

  it("should have features defined", () => {
    expect(featuresAndEntityTypes.features).toBeDefined()
    expect(featuresAndEntityTypes.features.length).toBeGreaterThan(0)
  })

  it("should receive valid configuration for every generic feature", async () => {
    for (const feature of featuresAndEntityTypes.features) {
      const result = await serialPortService.request(
        device.id,
        buildFeatureConfigRequest({
          feature: feature,
          lang: "en-US",
        })
      )
      expect(result.status).toBe(200)
    }
  })

  it("should return error for invalid feature", async () => {
    const result = await serialPortService.request(
      device.id,
      buildFeatureConfigRequest({
        feature: "dummyFeature",
        lang: "en-US",
      })
    )

    expect(result.status).toBe(500)
  })

  it("should receive valid data for ms-overview feature", async () => {
    const result = await serialPortService.request(
      device.id,
      buildFeatureDataRequest({
        feature: "mc-overview",
        lang: "en-US",
      })
    )
    console.log(result)
    expect(result.status).toBe(200)
  })

  it("should receive valid data for every generic feature", async () => {
    for (const feature of featuresAndEntityTypes.features) {
      const result = await serialPortService.request(
        device.id,
        buildFeatureDataRequest({
          feature: feature,
          lang: "en-US",
        })
      )
      expect(result.status).toBe(200)
    }
  })

  it.each(notSupportedDataFeatures)(
    "should return error for %s feature",
    async (feature) => {
      const result = await serialPortService.request(
        device.id,
        buildFeatureDataRequest({
          feature: feature,
          lang: "en-US",
        })
      )

      expect(result.status).toBe(500)
    }
  )
})
