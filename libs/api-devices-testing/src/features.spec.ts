/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  buildFeatureConfigRequest,
  buildFeatureDataRequest,
} from "devices/api-device/models"
import { getService } from "./helpers/api-device-test-service"

let featuresAndEntityTypes: { features: string[]; entityTypes: string[] }
const notSupportedDataFeatures: string[] = ["dummy-feature"]

describe("Feature Configuration and Data", () => {
  beforeEach(async () => {
    featuresAndEntityTypes = await getService().getApiFeaturesAndEntityTypes()
    featuresAndEntityTypes.features = featuresAndEntityTypes.features.filter(
      (feature) => feature !== "mc-overview"
    )
  })

  it("should receive valid configuration for mc-overview feature", async () => {
    const result = await getService().request(
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
      const result = await getService().request(
        buildFeatureConfigRequest({
          feature: feature,
          lang: "en-US",
        })
      )
      expect(result.status).toBe(200)
    }
  })

  it("should return error for invalid feature", async () => {
    const result = await getService().request(
      buildFeatureConfigRequest({
        feature: "dummyFeature",
        lang: "en-US",
      })
    )

    expect(result.status).toBe(500)
  })

  it("should receive valid data for ms-overview feature", async () => {
    const result = await getService().request(
      buildFeatureDataRequest({
        feature: "mc-overview",
        lang: "en-US",
      })
    )
    expect(result.status).toBe(200)
  })

  it("should receive valid data for every generic feature", async () => {
    for (const feature of featuresAndEntityTypes.features) {
      const result = await getService().request(
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
      const result = await getService().request(
        buildFeatureDataRequest({
          feature: feature,
          lang: "en-US",
        })
      )

      expect(result.status).toBe(500)
    }
  )
})
