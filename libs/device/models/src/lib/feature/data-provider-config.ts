/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { z } from "zod"

const entitiesTypeSchema = z.string().min(1)

const regexSchema = z
  .string()
  .regex(
    /^\/.+\/[gmiyuvsd]*$/m,
    "Regex must be in format /regex/ or /regex/flags"
  )

const componentFieldSchema = z.union([
  z.literal("dataItemId"),
  z.string().startsWith("data."),
  z.string().startsWith("extra-data."),
  z.string().startsWith("config."),
])

const baseFieldSchema = z
  .object({
    providerField: z.string(),
    componentField: componentFieldSchema,
  })
  .strict()
const enhancedFieldSchema = z
  .object({
    modifier: z.union([z.literal("length"), z.literal("boolean")]).optional(),
    slice: z
      .union([z.tuple([z.number()]), z.tuple([z.number(), z.number()])])
      .optional(),
    flat: z.string().optional(),
  })
  .merge(baseFieldSchema)
  .strict()
const superEnhancedFieldSchema = enhancedFieldSchema
  .extend({
    condition: z.union([
      z.literal("eq"),
      z.literal("ne"),
      z.literal("gt"),
      z.literal("lt"),
    ]),
    value: z.union([
      z.string(),
      z.number(),
      z.boolean(),
      z.array(z.unknown()),
      z.record(z.union([z.string(), z.number()]), z.unknown()),
    ]),
  })
  .strict()

const fieldsSchema = z.array(
  z.union([baseFieldSchema, enhancedFieldSchema, superEnhancedFieldSchema])
)

export type DataProviderField =
  | z.infer<typeof baseFieldSchema>
  | z.infer<typeof enhancedFieldSchema>
  | z.infer<typeof superEnhancedFieldSchema>

const sortDirectionSchema = z.union([z.literal("asc"), z.literal("desc")])

export type sortDirection = z.infer<typeof sortDirectionSchema>

const sortOrderingPatternsSchema = z.array(regexSchema)

export type sortOrderingPatterns = z.infer<typeof sortOrderingPatternsSchema>

// Types come from Intl.CollatorOptions["sensitivity"], used to control text comparison sensitivity
const sortSensitivitySchema = z.enum(["base", "accent", "case", "variant"])

export type sortSensitivity = z.infer<typeof sortSensitivitySchema>

const emptyOrderSchema = z.enum(["first", "last"])

const sortSchema = z
  .array(
    z
      .object({
        providerField: z.string().optional(),
        providerGroup: z.array(z.string()).optional(),
        priority: z.number().nonnegative(),
        direction: sortDirectionSchema,
        orderingPatterns: sortOrderingPatternsSchema.optional(),
        sensitivity: sortSensitivitySchema.optional(),
        emptyOrder: emptyOrderSchema.optional(),
      })
      .refine((data) => data.providerField || data.providerGroup, {
        message: "Either providerField or providerGroup must be provided",
        path: ["providerField", "providerGroup"],
      })
  )
  .optional()

export type DataProviderSortConfig = z.infer<typeof sortSchema>

const filtersSchema = z
  .array(
    z.object({
      providerField: z.string(),
      patterns: z.array(regexSchema),
    })
  )
  .optional()

export type DataProviderFiltersConfig = z.infer<typeof filtersSchema>

const entitiesArraySchema = z.object({
  source: z.literal("entities-array"),
  entitiesType: entitiesTypeSchema,
  sort: sortSchema,
  filters: filtersSchema,
})

const entitiesFieldSchema = z.object({
  source: z.literal("entities-field"),
  entitiesType: entitiesTypeSchema,
  fields: fieldsSchema,
})

const formFieldsSchema = z.object({
  source: z.literal("form-fields"),
  formKey: z.string().optional(),
  fields: fieldsSchema,
})

const formFieldsSchemaV2 = z.object({
  source: z.literal("form-fields-v2"),
  formName: z.string(),
  fields: fieldsSchema,
})

export const dataProviderSchema = z.union([
  entitiesArraySchema,
  entitiesFieldSchema,
  formFieldsSchema,
  formFieldsSchemaV2,
])

export type DataProviderConfig = z.infer<typeof dataProviderSchema>
