/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  buildFeatureConfigRequest,
  buildFeatureDataRequest,
} from "devices/api-device/models"
import { getApiFeaturesAndEntityTypes } from "./helpers/get-api-features-and-entity-types"
import {
  ApiDeviceContext,
  initApiDeviceContext,
} from "./helpers/api-device-context"

let apiDeviceContext: ApiDeviceContext
let featuresAndEntityTypes: { features: string[]; entityTypes: string[] }
const notSupportedDataFeatures: string[] = ["dummy-feature"]

describe("Feature Configuration and Data", () => {
  beforeEach(async () => {
    apiDeviceContext = await initApiDeviceContext()
    featuresAndEntityTypes =
      await getApiFeaturesAndEntityTypes(apiDeviceContext)
    featuresAndEntityTypes.features = featuresAndEntityTypes.features.filter(
      (feature) => feature !== "mc-overview"
    )
  }, 30_000)

  afterEach(async () => {
    await apiDeviceContext.reset()
  }, 30_000)

  it("should receive valid configuration for mc-overview feature", async () => {
    const { service, deviceId } = apiDeviceContext
    const result = await service.request(
      deviceId,
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
    const { service, deviceId } = apiDeviceContext
    for (const feature of featuresAndEntityTypes.features) {
      const result = await service.request(
        deviceId,
        buildFeatureConfigRequest({
          feature: feature,
          lang: "en-US",
        })
      )
      expect(result.status).toBe(200)
    }
  })

  it("should return error for invalid feature", async () => {
    const { service, deviceId } = apiDeviceContext
    const result = await service.request(
      deviceId,
      buildFeatureConfigRequest({
        feature: "dummyFeature",
        lang: "en-US",
      })
    )

    expect(result.status).toBe(500)
  })

  it("should receive valid data for ms-overview feature", async () => {
    const { service, deviceId } = apiDeviceContext
    const result = await service.request(
      deviceId,
      buildFeatureDataRequest({
        feature: "mc-overview",
        lang: "en-US",
      })
    )
    expect(result.status).toBe(200)
  })

  it("should receive valid data for every generic feature", async () => {
    const { service, deviceId } = apiDeviceContext
    for (const feature of featuresAndEntityTypes.features) {
      const result = await service.request(
        deviceId,
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
      const { service, deviceId } = apiDeviceContext
      const result = await service.request(
        deviceId,
        buildFeatureDataRequest({
          feature: feature,
          lang: "en-US",
        })
      )

      expect(result.status).toBe(500)
    }
  )
})
