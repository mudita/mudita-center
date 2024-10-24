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

const sortSchema = z
  .array(
    z.object({
      providerField: z.string(),
      priority: z.number().nonnegative(),
      direction: z.union([z.literal("asc"), z.literal("desc")]),
      orderingPatterns: z.array(regexSchema).optional(),
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

const entitiesMetadataSchema = z.object({
  source: z.literal("entities-metadata"),
  entitiesType: entitiesTypeSchema,
  fields: fieldsSchema,
})

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

export const dataProviderSchema = z.union([
  entitiesMetadataSchema,
  entitiesArraySchema,
  entitiesFieldSchema,
  formFieldsSchema,
])

export type DataProviderConfig = z.infer<typeof dataProviderSchema>
