/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FeatureConfig, FeatureConfigValidator } from "./feature-config"

const featureConfig: FeatureConfig = {
  "dummy-1": {
    component: "button-text",
    config: {
      text: "dummy",
      action: {
        type: "custom",
        callback: jest.fn,
      },
    },
  },
  "dummy-2": {
    component: "button-primary",
    config: {
      text: "dummy",
      action: {
        type: "custom",
        callback: jest.fn,
      },
    },
  },
}

describe("FeatureConfigValidator", () => {
  it("should return success when correct config is validated", () => {
    const feature = { ...featureConfig }
    const result = FeatureConfigValidator.safeParse(feature)
    expect(result.success).toBeTruthy()
  })
  it("should return fail when correct config is incorrect", () => {
    const feature = {
      ...featureConfig,
      ...{ incorrect: { component: "incorrect" } },
    }
    const result = FeatureConfigValidator.safeParse(feature)
    expect(result.success).toBeFalsy()
  })
})
