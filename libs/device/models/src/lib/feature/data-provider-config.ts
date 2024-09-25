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

const extendedFieldSchema = z.object({
  field: z.string(),
  modifier: z.union([z.literal("length"), z.literal("boolean")]).optional(),
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

export type DataProviderExtendedField = z.infer<typeof extendedFieldSchema>

const fieldsSchema = z.record(
  z.union([
    z.literal("dataItemId"),
    z.string().startsWith("data."),
    z.string().startsWith("config."),
  ]),
  z.union([z.string(), extendedFieldSchema])
)

const sortSchema = z
  .record(
    z.string(),
    z.object({
      priority: z.number().nonnegative(),
      direction: z.union([z.literal("asc"), z.literal("desc")]),
      orderingPatterns: z.array(regexSchema).optional(),
    })
  )
  .optional()

export type DataProviderSortConfig = z.infer<typeof sortSchema>

const filtersSchema = z.record(z.string(), z.array(regexSchema)).optional()

export type DataProviderFilterConfig = z.infer<typeof filtersSchema>

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
  entitiesArraySchema,
  entitiesFieldSchema,
  formFieldsSchema,
])

export type DataProviderConfig = z.infer<typeof dataProviderSchema>
