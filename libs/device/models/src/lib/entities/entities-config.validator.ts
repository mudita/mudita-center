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

const defaultValueSchema = z.any().optional()

const idFieldSchema = z
  .object({
    type: z.literal("id"),
  })
  .strict()

const primitiveFieldSchema = z.object({
  type: z.enum(["string", "number", "boolean"]),
  validators: fieldValidatorsSchema,
  defaultValue: defaultValueSchema,
})

const basicFieldSchema = z.discriminatedUnion("type", [
  idFieldSchema,
  primitiveFieldSchema,
])

const nestedArrayFieldSchema = z.object({
  type: z.literal("array"),
  defaultValue: defaultValueSchema,
  items: basicFieldSchema,
  validators: fieldValidatorsSchema,
})

const nestedObjectFieldSchema = z.object({
  type: z.literal("object"),
  defaultValue: defaultValueSchema,
  fields: z.record(z.string(), basicFieldSchema),
  validators: fieldValidatorsSchema,
})

const arrayFieldSchema = z.object({
  type: z.literal("array"),
  defaultValue: defaultValueSchema,
  items: z.union([
    basicFieldSchema,
    nestedArrayFieldSchema,
    nestedObjectFieldSchema,
  ]),
  validators: fieldValidatorsSchema,
})

const objectFieldSchema = z.object({
  type: z.literal("object"),
  defaultValue: defaultValueSchema,
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

// COMPUTED FIELDS SCHEMA
const computedFieldFilterSchema = z
  .object({
    type: z.literal("filter"),
  })
  .merge(patternValidatorSchema.pick({ pattern: true, negatePattern: true }))
type ComputedFieldFilter = z.infer<typeof computedFieldFilterSchema>

const computedFieldClearSchema = z.object({
  type: z.literal("clear"),
  allowEmptyString: z.boolean().optional(),
  allowZero: z.boolean().optional(),
  allowFalse: z.boolean().optional(),
})
type ComputedFieldClear = z.infer<typeof computedFieldClearSchema>

const computedFieldSliceSchema = z.object({
  type: z.literal("slice"),
  start: z.number().optional(),
  end: z.number().optional(),
})
type ComputedFieldSlice = z.infer<typeof computedFieldSliceSchema>

const computedFieldJoinSchema = z.object({
  type: z.literal("join"),
  separator: z.string().optional(),
})
type ComputedFieldJoin = z.infer<typeof computedFieldJoinSchema>

const computedFieldConcatSchema = z.object({
  type: z.literal("concat"),
})
type ComputedFieldConcat = z.infer<typeof computedFieldConcatSchema>

const computedFieldMergeSchema = z.object({
  type: z.literal("merge"),
})
type ComputedFieldMerge = z.infer<typeof computedFieldMergeSchema>

const computedFieldWrapSchema = z.object({
  type: z.literal("wrap"),
  prefix: z.unknown().optional(),
  suffix: z.unknown().optional(),
})
type ComputedFieldWrap = z.infer<typeof computedFieldWrapSchema>

const computedFieldObjectifySchema = z.object({
  type: z.literal("objectify"),
  keys: z.array(z.string()),
})
type ComputedFieldObjectify = z.infer<typeof computedFieldObjectifySchema>

type ComputedFieldMethod =
  | ComputedFieldFilter
  | ComputedFieldClear
  | ComputedFieldSlice
  | ComputedFieldConcat
  | ComputedFieldMerge
  | ComputedFieldJoin
  | ComputedFieldWrap
  | ComputedFieldObjectify

const computedFieldFieldsSchema = z.object({
  fields: z.array(z.union([z.string(), z.lazy(() => computedFieldSchema)])),
})

export type EntityComputedFieldConfig = ComputedFieldMethod & {
  fields: (string | EntityComputedFieldConfig)[]
}
const computedFieldSchema: z.ZodType<EntityComputedFieldConfig> = z.union([
  computedFieldFilterSchema.extend(computedFieldFieldsSchema.shape),
  computedFieldClearSchema.extend(computedFieldFieldsSchema.shape),
  computedFieldSliceSchema.extend(computedFieldFieldsSchema.shape),
  computedFieldJoinSchema.extend(computedFieldFieldsSchema.shape),
  computedFieldConcatSchema.extend(computedFieldFieldsSchema.shape),
  computedFieldMergeSchema.extend(computedFieldFieldsSchema.shape),
  computedFieldWrapSchema.extend(computedFieldFieldsSchema.shape),
  computedFieldObjectifySchema.extend(computedFieldFieldsSchema.shape),
])

export const entitiesConfigValidator = z
  .object({
    fields: z.record(z.union([z.string(), z.number()]), fieldSchema),
    globalValidators: globalValidatorSchema,
    computedFields: z.record(z.string(), computedFieldSchema).optional(),
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
