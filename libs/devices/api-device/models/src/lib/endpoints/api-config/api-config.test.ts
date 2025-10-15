/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ApiConfig, ApiConfigResponseValidator } from "./api-config"

const minimumApiConfig: ApiConfig = {
  apiVersion: "1.0.0",
  osVersion: "0.0.46 MuditaOS K",
  features: ["mc-overview"],
  productId: "productId",
  vendorId: "vendorId",
}

describe("APIConfigValidator", () => {
  it("should return success when correct config is validated", () => {
    const apiConfig: ApiConfig = minimumApiConfig
    const result = ApiConfigResponseValidator.safeParse(apiConfig)
    expect(result.success).toBeTruthy()
  })
  it("should return fail when object is empty", () => {
    const apiConfig = {}
    const result = ApiConfigResponseValidator.safeParse(apiConfig)
    expect(result.success).toBeFalsy()
  })
  it("should return fail when lang is incorrect", () => {
    const apiConfig = { ...minimumApiConfig, lang: "INCORRECT" }

    const result = ApiConfigResponseValidator.safeParse(apiConfig)
    expect(result.success).toBeFalsy()
  })
  it("should return fail when features array is empty", () => {
    const apiConfig = { ...minimumApiConfig, features: [] }

    const result = ApiConfigResponseValidator.safeParse(apiConfig)
    expect(result.success).toBeFalsy()
  })
  it("should return fail when entityTypes array is empty", () => {
    const apiConfig = { ...minimumApiConfig, entityTypes: [] }

    const result = ApiConfigResponseValidator.safeParse(apiConfig)
    expect(result.success).toBeFalsy()
  })
  it.each(["apiVersion", "productId", "vendorId"])(
    "should return fail when %s is missing",
    (fieldName) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const apiConfig: any = { ...minimumApiConfig }
      delete apiConfig[fieldName]
      const result = ApiConfigResponseValidator.safeParse(apiConfig)
      expect(result.success).toBeFalsy()
    }
  )
})
