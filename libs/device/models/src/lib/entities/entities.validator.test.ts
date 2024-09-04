/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { EntityConfig, entityConfigValidator } from "./entities.validator"
import { ZodError } from "zod"

describe("entityConfigValidator", () => {
  it("validates a correct entity configuration", () => {
    const validConfig: EntityConfig = {
      globalValidators: {
        requiredFieldsCombinations: [
          {
            fields: ["field1", "field2", "field3.field3a", "field4[]"],
            countLogic: "gt",
            fieldsCount: 1,
          },
        ],
      },
      fields: {
        field1: { type: "id" },
        field2: { type: "string", validators: [{ pattern: "/abc/" }] },
        field3: { type: "object", fields: { field3a: { type: "string" } } },
        field4: { type: "array", items: { type: "string" } },
      },
    }
    expect(() => entityConfigValidator.parse(validConfig)).not.toThrow()
  })

  it("throws an error when 'requiredFieldsCombinations' uses wrong fields", () => {
    const invalidConfig: EntityConfig = {
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
    const result = () => entityConfigValidator.parse(invalidConfig)
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
