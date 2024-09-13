/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { dataProviderSchema } from "./data-provider-config"

describe("dataProviderSchema", () => {
  it("validates entities-array with optional entitiesType", () => {
    const validData = {
      source: "entities-array",
      entitiesType: "someType",
    }
    expect(dataProviderSchema.safeParse(validData).success).toBe(true)
  })

  it("validates entities-array without entitiesType", () => {
    const validData = {
      source: "entities-array",
    }
    expect(dataProviderSchema.safeParse(validData).success).toBe(true)
  })

  it("validates entities-field with fields", () => {
    const validData = {
      source: "entities-field",
      entitiesType: "someType",
      fields: {
        dataItemId: "value1",
        "data.someField": "value2",
        "config.someField": "value3",
      },
    }
    expect(dataProviderSchema.safeParse(validData).success).toBe(true)
  })

  it("validates form-fields with fields", () => {
    const validData = {
      source: "form-fields",
      fields: {
        dataItemId: "value1",
        "data.someField": "value2",
        "config.someField": "value3",
      },
    }
    expect(dataProviderSchema.safeParse(validData).success).toBe(true)
  })

  it("fails validation for invalid source", () => {
    const invalidData = {
      source: "invalid-source",
    }
    expect(dataProviderSchema.safeParse(invalidData).success).toBe(false)
  })

  it("fails validation for entities-field without fields", () => {
    const invalidData = {
      source: "entities-field",
      entitiesType: "someType",
    }
    expect(dataProviderSchema.safeParse(invalidData).success).toBe(false)
  })

  it("fails validation for form-fields without fields", () => {
    const invalidData = {
      source: "form-fields",
    }
    expect(dataProviderSchema.safeParse(invalidData).success).toBe(false)
  })
})
