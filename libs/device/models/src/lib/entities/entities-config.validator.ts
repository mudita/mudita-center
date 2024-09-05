/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { z } from "zod"
import { flattenEntityConfiguration } from "./helpers/flatten-entity-configuration"
import { difference } from "lodash"

// FIELDS SCHEMA
const validatorErrorSchema = z.string().optional()

const patternValidatorSchema = z.object({
  pattern: z
    .string()
    .regex(
      /^\/.+\/[gmiyuvsd]*$/m,
      "Regex must be in format /regex/ or /regex/flags"
    ),
  negatePattern: z.boolean().optional(),
  error: validatorErrorSchema,
})

const uniqueValidatorSchema = z.object({
  unique: z.boolean(),
  error: validatorErrorSchema,
})

const requiredValidatorSchema = z.object({
  required: z.boolean(),
  error: validatorErrorSchema,
})

const fieldValidatorsSchema = z
  .array(
    z.union([
      patternValidatorSchema,
      uniqueValidatorSchema,
      requiredValidatorSchema,
    ])
  )
  .optional()

const idFieldSchema = z.object({
  type: z.literal("id"),
})

const primitiveFieldSchema = z.object({
  type: z.enum(["string", "number", "boolean"]),
  validators: fieldValidatorsSchema,
})

const basicFieldSchema = z.discriminatedUnion("type", [
  idFieldSchema,
  primitiveFieldSchema,
])

const nestedArrayFieldSchema = z.object({
  type: z.literal("array"),
  items: basicFieldSchema,
  validators: fieldValidatorsSchema,
})

const nestedObjectFieldSchema = z.object({
  type: z.literal("object"),
  fields: z.record(z.string(), basicFieldSchema),
  validators: fieldValidatorsSchema,
})

const arrayFieldSchema = z.object({
  type: z.literal("array"),
  items: z.union([
    basicFieldSchema,
    nestedArrayFieldSchema,
    nestedObjectFieldSchema,
  ]),
  validators: fieldValidatorsSchema,
})

const objectFieldSchema = z.object({
  type: z.literal("object"),
  fields: z.record(
    z.string(),
    z.union([basicFieldSchema, nestedArrayFieldSchema, nestedObjectFieldSchema])
  ),
  validators: fieldValidatorsSchema,
})

const fieldSchema = z.union([
  idFieldSchema,
  primitiveFieldSchema,
  arrayFieldSchema,
  objectFieldSchema,
  arrayFieldSchema,
])

// GLOBAL VALIDATORS SCHEMA
const requiredFieldsCombinationsSchema = z.object({
  fields: z.array(z.string()).min(1),
  countLogic: z.enum(["gt", "lt", "eq"]),
  fieldsCount: z.number().nonnegative(),
  error: z.string().optional(),
})

const globalValidatorSchema = z
  .object({
    requiredFieldsCombinations: z
      .array(requiredFieldsCombinationsSchema)
      .optional(),
  })
  .optional()

export const entitiesConfigValidator = z
  .object({
    fields: z.record(z.union([z.string(), z.number()]), fieldSchema),
    globalValidators: globalValidatorSchema,
  })
  .refine(
    (data) => {
      const requiredFieldsCombinations =
        data.globalValidators?.requiredFieldsCombinations
      if (!requiredFieldsCombinations) return true

      const availableKeys = flattenEntityConfiguration(data.fields)

      return Object.values(data.globalValidators || {}).every((validator) => {
        return validator.every((combination) => {
          return combination.fields.every((field) => field in availableKeys)
        })
      })
    },
    (data) => {
      let failedValidator: string[] = []
      const availableFields = flattenEntityConfiguration(data.fields)

      for (const [validatorKey, validators] of Object.entries(
        data.globalValidators || {}
      )) {
        if (failedValidator.length) break
        for (const [validatorIndex, validator] of validators.entries()) {
          if (failedValidator.length) break
          if (!validator.fields.every((field) => field in availableFields)) {
            failedValidator = [
              "globalValidators",
              `${validatorKey}[${validatorIndex}]`,
              `fields`,
              `[${difference(
                validator.fields,
                Object.keys(availableFields)
              ).join(", ")}]`,
            ]
            break
          }
        }
      }
      return {
        message: `global validators are mentioning fields not defined in the 'fields' object`,
        path: failedValidator,
      }
    }
  )
  .refine(
    (data) => {
      const fields = data.fields
      const idFieldsCount = Object.values(fields).filter(
        (field) => field.type === "id"
      ).length
      return idFieldsCount === 1
    },
    {
      message:
        "There must be exactly one field of 'id' type on the top level of the 'fields' object",
      path: ["fields"],
    }
  )

export type EntitiesConfig = z.infer<typeof entitiesConfigValidator>
