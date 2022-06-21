/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { serializeFeature } from "App/feature-flags/helpers/serialize-features.helpers"
import { EnvironmentConfig } from "App/feature-flags/types"
import { Feature, Environment } from "App/feature-flags/constants"

const environmentConfigMock = {
  [Feature.LoggerEnabled]: {
    [Environment.Development]: "development",
    [Environment.Production]: "production",
    [Environment.AlphaProduction]: "alpha-production",
  },
} as unknown as EnvironmentConfig

const envMock = { ...process.env }

afterEach(() => {
  process.env = { ...envMock }
})

test("returns serialized feature flags config for `development` environment if FEATURE_TOGGLE_ENVIRONMENT isn't provided", () => {
  process.env = { ...envMock, FEATURE_TOGGLE_ENVIRONMENT: "" }
  expect(serializeFeature(environmentConfigMock)).toEqual({
    [Feature.LoggerEnabled]: {
      criteria: [
        {
          always: "development",
        },
      ],
    },
  })
})

test("returns serialized feature flags config for `development` environment if FEATURE_TOGGLE_ENVIRONMENT is equal to `development`", () => {
  process.env = {
    ...envMock,
    FEATURE_TOGGLE_ENVIRONMENT: Environment.Development,
  }
  expect(serializeFeature(environmentConfigMock)).toEqual({
    [Feature.LoggerEnabled]: {
      criteria: [
        {
          always: "development",
        },
      ],
    },
  })
})

test("returns serialized feature flags config for `production` environment if FEATURE_TOGGLE_ENVIRONMENT is equal to `production`", () => {
  process.env = {
    ...envMock,
    FEATURE_TOGGLE_ENVIRONMENT: Environment.Production,
  }
  expect(serializeFeature(environmentConfigMock)).toEqual({
    [Feature.LoggerEnabled]: {
      criteria: [
        {
          always: "production",
        },
      ],
    },
  })
})

test("returns serialized feature flags config for `alpha-production` environment if FEATURE_TOGGLE_ENVIRONMENT is equal to `alpha-production`", () => {
  process.env = {
    ...envMock,
    FEATURE_TOGGLE_ENVIRONMENT: Environment.AlphaProduction,
  }
  expect(serializeFeature(environmentConfigMock)).toEqual({
    [Feature.LoggerEnabled]: {
      criteria: [
        {
          always: "alpha-production",
        },
      ],
    },
  })
})
