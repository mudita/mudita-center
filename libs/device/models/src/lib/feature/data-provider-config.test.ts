/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { DataProviderConfig, dataProviderSchema } from "./data-provider-config"

describe("dataProviderSchema", () => {
  it("validates entities-array with sort and filters", () => {
    const validData: DataProviderConfig = {
      source: "entities-array",
      entitiesType: "someType",
      sort: [
        {
          providerField: "someField",
          direction: "asc",
          priority: 1,
          orderingPatterns: ["/pattern/"],
        },
      ],
      filters: [
        {
          providerField: "someField",
          patterns: ["/pattern/"],
        },
      ],
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
    const validData: DataProviderConfig = {
      source: "entities-field",
      entitiesType: "someType",
      fields: [
        {
          providerField: "value1",
          componentField: "dataItemId",
        },
        {
          providerField: "value2",
          componentField: "data.someField",
        },
      ],
    }
    expect(dataProviderSchema.safeParse(validData).success).toBe(true)
  })

  it("fails validation for form-fields with invalid field key", () => {
    const invalidData: DataProviderConfig = {
      source: "form-fields",
      fields: [
        {
          providerField: "invalidField",
          componentField: "invalidField",
          value: "value",
        },
      ],
    }
    expect(dataProviderSchema.safeParse(invalidData).success).toBe(false)
  })

  it("validates form-fields", () => {
    const validData: DataProviderConfig = {
      source: "form-fields",
      fields: [
        {
          providerField: "value1",
          componentField: "dataItemId",
        },
        {
          providerField: "value2",
          componentField: "config.someField",
        },
        {
          providerField: "value3",
          componentField: "config.otherField",
        },
      ],
    }
    expect(dataProviderSchema.safeParse(validData).success).toBe(true)
  })

  it("validates form-fields with extended config", () => {
    const validData: DataProviderConfig = {
      source: "form-fields",
      fields: [
        {
          providerField: "value1",
          componentField: "dataItemId",
        },
        {
          providerField: "value2",
          componentField: "config.someField",
        },
        {
          providerField: "value3",
          componentField: "config.otherField",
          modifier: "boolean",
          condition: "eq",
          value: true,
        },
      ],
    }
    expect(dataProviderSchema.safeParse(validData).success).toBe(true)
  })

  it("fails validation for form-fields with invalid modifier", () => {
    const invalidData = {
      source: "form-fields",
      fields: [
        {
          providerField: "value",
          componentField: "config.someField",
          modifier: "invalid",
          condition: "eq",
          value: "value",
        },
      ],
    }
    expect(dataProviderSchema.safeParse(invalidData).success).toBe(false)
  })

  it("fails validation for form-fields with invalid condition", () => {
    const invalidData = {
      source: "form-fields",
      fields: [
        {
          field: "value",
          componentField: "config.someField",
          modifier: "length",
          condition: "invalid",
          value: "value",
        },
      ],
    }
    expect(dataProviderSchema.safeParse(invalidData).success).toBe(false)
  })

  it("fails validation for form-fields with missing value", () => {
    const invalidData: DataProviderConfig = {
      source: "form-fields",
      fields: [
        {
          providerField: "value",
          componentField: "config.someField",
          modifier: "length",
          condition: "eq",
        },
      ],
    }
    expect(dataProviderSchema.safeParse(invalidData).success).toBe(false)
  })
})
