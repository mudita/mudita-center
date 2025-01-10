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
    join: z.string().optional(),
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

export type SortDirection = z.infer<typeof sortDirectionSchema>

const sortOrderingPatternsSchema = z.array(regexSchema)

export type SortOrderingPatterns = z.infer<typeof sortOrderingPatternsSchema>

// Types come from Intl.CollatorOptions["sensitivity"], used to control text comparison sensitivity
const sortSensitivitySchema = z.enum(["base", "accent", "case", "variant"])

export type SortSensitivity = z.infer<typeof sortSensitivitySchema>

const emptyOrderSchema = z.enum(["first", "last"])

const sortSchema = z
  .array(
    z
      .object({
        field: z.string().optional(),
        fieldGroup: z.array(z.string()).optional(),
        priority: z.number().nonnegative(),
        direction: sortDirectionSchema,
        orderingPatterns: sortOrderingPatternsSchema.optional(),
        sensitivity: sortSensitivitySchema.optional(),
        emptyOrder: emptyOrderSchema.optional(),
      })
      .refine((data) => data.field || data.fieldGroup, {
        message: "Either field or fieldGroup must be provided",
        path: ["field", "fieldGroup"],
      })
  )
  .optional()

export type DataSortConfig = z.infer<typeof sortSchema>

const filtersSchema = z
  .array(
    z.object({
      field: z.string(),
      patterns: z.array(regexSchema),
    })
  )
  .optional()

export type DataProviderFiltersConfig = z.infer<typeof filtersSchema>

export const phraseSourceSchema = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("form-fields"),
    formKey: z.string(),
    field: z.string(),
  }),
])

const searchSchema = z
  .object({
    fields: z.array(
      z.object({
        field: z.string(),
        mode: z.enum(["includes", "exact", "startsWith"]),
        caseSensitive: z.boolean().optional(),
      })
    ),
    phraseSource: phraseSourceSchema,
    minPhraseLength: z.number().nonnegative().optional(),
    separatePhraseWords: z.boolean().optional(),
  })
  .optional()

export type DataProviderSearchConfig = z.infer<typeof searchSchema>

const entitiesMetadataSchema = z.object({
  source: z.literal("entities-metadata"),
  entitiesType: entitiesTypeSchema,
  fields: fieldsSchema,
})
export type EntitiesMetadataConfig = z.infer<typeof entitiesMetadataSchema>

const entitiesArraySchema = z.object({
  source: z.literal("entities-array"),
  entitiesType: entitiesTypeSchema,
  sort: sortSchema,
  filters: filtersSchema,
  search: searchSchema,
  limit: z.number().nonnegative().optional(),
  fields: z
    .array(
      z.union([
        z.object({ componentField: z.string() }).strict(),
        enhancedFieldSchema,
        superEnhancedFieldSchema,
      ])
    )
    .optional(),
})
export type EntitiesArrayConfig = z.infer<typeof entitiesArraySchema>

const entitiesFieldSchema = z.object({
  source: z.literal("entities-field"),
  entitiesType: entitiesTypeSchema,
  fields: fieldsSchema,
})
export type EntitiesFieldConfig = z.infer<typeof entitiesFieldSchema>

const formFieldsSchema = z.object({
  source: z.literal("form-fields"),
  formKey: z.string().optional(),
  fields: fieldsSchema,
})
export type FormFieldsConfig = z.infer<typeof formFieldsSchema>

export const dataProviderSchema = z.union([
  entitiesMetadataSchema,
  entitiesArraySchema,
  entitiesFieldSchema,
  formFieldsSchema,
])

export type DataProviderConfig = z.infer<typeof dataProviderSchema>
