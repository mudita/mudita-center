/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { z } from "zod"

const primitiveValueSchema = z.union([z.string(), z.number()])

export type PrimitiveValue = z.infer<typeof primitiveValueSchema>

const gapSchema = z.object({
  rowGap: z.string().optional(),
  columnGap: z.string().optional(),
})

const gridLayoutSchema = z.intersection(
  gapSchema,
  z.object({
    rows: z.array(primitiveValueSchema),
    columns: z.array(primitiveValueSchema),
    justifyContent: z
      .union([
        z.literal("start"),
        z.literal("end"),
        z.literal("center"),
        z.literal("stretch"),
        z.literal("space-around"),
        z.literal("space-between"),
        z.literal("space-evenly"),
      ])
      .optional(),
    justifyItems: z
      .union([
        z.literal("start"),
        z.literal("end"),
        z.literal("center"),
        z.literal("stretch"),
      ])
      .optional(),
    alignItems: z
      .union([
        z.literal("start"),
        z.literal("end"),
        z.literal("center"),
        z.literal("stretch"),
        z.literal("baseline"),
      ])
      .optional(),
  })
)

const gridLayoutBaseSchema = z.object({
  gridLayout: gridLayoutSchema.optional(),
})

const flexLayoutSchema = z.intersection(
  gapSchema,
  z.object({
    direction: z.union([
      z.literal("row"),
      z.literal("column"),
      z.literal("row-reverse"),
      z.literal("column-reverse"),
    ]),
    justifyContent: z
      .union([
        z.literal("flex-start"),
        z.literal("flex-end"),
        z.literal("center"),
        z.literal("space-between"),
        z.literal("space-around"),
        z.literal("space-evenly"),
      ])
      .optional(),
    alignItems: z
      .union([
        z.literal("flex-start"),
        z.literal("flex-end"),
        z.literal("center"),
        z.literal("stretch"),
        z.literal("baseline"),
      ])
      .optional(),
    alignContent: z
      .union([
        z.literal("flex-start"),
        z.literal("flex-end"),
        z.literal("center"),
        z.literal("stretch"),
        z.literal("space-between"),
        z.literal("space-around"),
      ])
      .optional(),
    wrap: z
      .union([
        z.literal("wrap"),
        z.literal("nowrap"),
        z.literal("wrap-reverse"),
      ])
      .optional(),
  })
)

const flexLayoutBaseSchema = z.object({
  flexLayout: flexLayoutSchema.optional(),
})

const layoutBaseSchema = z.intersection(
  gridLayoutBaseSchema,
  flexLayoutBaseSchema
)

const gridPlacementSchema = z.object({
  row: z.number(),
  column: z.number(),
  width: z.number(),
  height: z.number(),
})

const flexPlacementSchema = z.object({
  grow: primitiveValueSchema.optional(),
  shrink: primitiveValueSchema.optional(),
  basis: primitiveValueSchema.optional(),
  order: primitiveValueSchema.optional(),
  alignSelf: z
    .union([
      z.literal("flex-start"),
      z.literal("flex-end"),
      z.literal("center"),
      z.literal("stretch"),
    ])
    .optional(),
})

export const layoutSchema = z.intersection(
  layoutBaseSchema,
  z.object({
    gridPlacement: gridPlacementSchema.optional(),
    flexPlacement: flexPlacementSchema.optional(),
    margin: z.string().optional(),
    padding: z.string().optional(),
    width: z.string().optional(),
    height: z.string().optional(),
    overflow: z.enum(["visible", "hidden", "scroll", "auto"]).optional(),
    shadow: z.boolean().optional(),
  })
)

export type Layout = z.infer<typeof layoutSchema>
