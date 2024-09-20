/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  EntitiesConfig,
  entitiesConfigValidator,
} from "./entities-config.validator"
import { ZodError } from "zod"

describe("entitiesConfigValidator", () => {
  it("validates a correct entity configuration", () => {
    const validConfig: EntitiesConfig = {
      globalValidators: {
        requiredFieldsCombinations: [
          {
            fields: ["field2", "field3", "field4.field4a", "5[]"],
            countLogic: "gt",
            fieldsCount: 1,
          },
        ],
      },
      fields: {
        field1: { type: "string", defaultValue: "default" },
        field2: { type: "id" },
        field3: { type: "string", validators: [{ pattern: "/abc/" }] },
        field4: { type: "object", fields: { field4a: { type: "string" } } },
        5: { type: "array", items: { type: "string" } },
      },
    }
    expect(() => entitiesConfigValidator.parse(validConfig)).not.toThrow()
  })

  it("throws an error when there is no field of 'id' type on the top level", () => {
    const invalidConfig: EntitiesConfig = {
      fields: {
        field1: { type: "string" },
      },
    }
    const result = () => entitiesConfigValidator.parse(invalidConfig)
    expect(result).toThrow()

    try {
      result()
    } catch (error) {
      expect((error as ZodError).errors).toEqual([
        {
          code: "custom",
          message:
            "There must be exactly one field of 'id' type on the top level of the 'fields' object",
          path: ["fields"],
        },
      ])
    }
  })

  it("throws an error when there is more than one field of 'id' type on the top level", () => {
    const invalidConfig: EntitiesConfig = {
      fields: {
        field1: { type: "id" },
        field2: { type: "id" },
      },
    }
    const result = () => entitiesConfigValidator.parse(invalidConfig)
    expect(result).toThrow()

    try {
      result()
    } catch (error) {
      expect((error as ZodError).errors).toEqual([
        {
          code: "custom",
          message:
            "There must be exactly one field of 'id' type on the top level of the 'fields' object",
          path: ["fields"],
        },
      ])
    }
  })

  it("throws an error when `defaultValue` is assigned to 'id' type field", () => {
    const invalidConfig: EntitiesConfig = {
      fields: {
        field1: { type: "id", defaultValue: "default" },
      },
    } as EntitiesConfig
    const result = () => entitiesConfigValidator.parse(invalidConfig)
    expect(result).toThrow()

    try {
      result()
    } catch (error) {
      expect((error as ZodError).errors).toEqual([
        {
          code: "unrecognized_keys",
          keys: ["defaultValue"],
          message: "Unrecognized key(s) in object: 'defaultValue'",
          path: ["fields", "field1"],
        },
      ])
    }
  })

  it("throws an error when 'requiredFieldsCombinations' uses wrong fields", () => {
    const invalidConfig: EntitiesConfig = {
      globalValidators: {
        requiredFieldsCombinations: [
          {
            fields: ["field1", "field2.field3a", "field3"],
            countLogic: "gt",
            fieldsCount: 1,
          },
        ],
      },
      fields: {
        field1: { type: "id" },
        field2: {
          type: "array",
          items: {
            type: "object",
            fields: {
              field3a: { type: "string" },
            },
          },
        },
      },
    }
    const result = () => entitiesConfigValidator.parse(invalidConfig)
    expect(result).toThrow()

    try {
      result()
    } catch (error) {
      expect((error as ZodError).errors).toEqual([
        {
          code: "custom",
          message:
            "global validators are mentioning fields not defined in the 'fields' object",
          path: [
            "globalValidators",
            "requiredFieldsCombinations[0]",
            "fields",
            "[field2.field3a, field3]",
          ],
        },
      ])
    }
  })
})
