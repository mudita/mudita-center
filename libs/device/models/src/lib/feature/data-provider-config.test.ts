/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { dataProviderSchema } from "./data-provider-config"

describe("dataProviderSchema", () => {
  it("validates entities-array with sort and filters", () => {
    const validData = {
      source: "entities-array",
      entitiesType: "someType",
      sort: {
        someField: {
          priority: 1,
          direction: "asc",
          orderingPatterns: ["/pattern/"],
        },
      },
      filters: {
        someField: ["/pattern/"],
      },
    }
    expect(dataProviderSchema.safeParse(validData).success).toBe(true)
  })

  it("fails validation for entities-array with invalid sort direction", () => {
    const invalidData = {
      source: "entities-array",
      sort: {
        someField: {
          priority: 1,
          direction: "invalid",
        },
      },
    }
    expect(dataProviderSchema.safeParse(invalidData).success).toBe(false)
  })

  it("fails validation for entities-array with invalid regex in filters", () => {
    const invalidData = {
      source: "entities-array",
      filters: {
        someField: ["invalid-regex"],
      },
    }
    expect(dataProviderSchema.safeParse(invalidData).success).toBe(false)
  })

  it("validates entities-field", () => {
    const validData = {
      source: "entities-field",
      entitiesType: "someType",
      fields: {
        dataItemId: "value1",
        "data.someField": "value2",
      },
    }
    expect(dataProviderSchema.safeParse(validData).success).toBe(true)
  })

  it("fails validation for form-fields with invalid field key", () => {
    const invalidData = {
      source: "form-fields",
      fields: {
        invalidField: "value",
      },
    }
    expect(dataProviderSchema.safeParse(invalidData).success).toBe(false)
  })

  it("validates form-fields", () => {
    const validData = {
      source: "form-fields",
      fields: {
        dataItemId: "value1",
        "config.someField": "value2",
        "config.otherField": {
          field: "value3",
          modifier: "length",
        },
      },
    }
    expect(dataProviderSchema.safeParse(validData).success).toBe(true)
  })

  it("validates form-fields with extended config", () => {
    const validData = {
      source: "form-fields",
      fields: {
        dataItemId: "value1",
        "config.someField": "value2",
        "config.otherField": {
          field: "value3",
          modifier: "boolean",
          condition: "eq",
          value: true,
        },
      },
    }
    expect(dataProviderSchema.safeParse(validData).success).toBe(true)
  })

  it("fails validation for form-fields with invalid modifier", () => {
    const invalidData = {
      source: "form-fields",
      fields: {
        "config.someField": {
          field: "value",
          modifier: "invalid",
          condition: "eq",
          value: "value",
        },
      },
    }
    expect(dataProviderSchema.safeParse(invalidData).success).toBe(false)
  })

  it("fails validation for form-fields with invalid condition", () => {
    const invalidData = {
      source: "form-fields",
      fields: {
        "config.someField": {
          field: "value",
          modifier: "length",
          condition: "invalid",
          value: "value",
        },
      },
    }
    expect(dataProviderSchema.safeParse(invalidData).success).toBe(false)
  })

  it("fails validation for form-fields with missing value", () => {
    const invalidData = {
      source: "form-fields",
      fields: {
        "config.someField": {
          field: "value",
          modifier: "length",
          condition: "eq",
        },
      },
    }
    expect(dataProviderSchema.safeParse(invalidData).success).toBe(false)
  })
})
