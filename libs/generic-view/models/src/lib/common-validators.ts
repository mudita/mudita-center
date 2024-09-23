/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { z } from "zod"

export const modalSizeValidator = z.enum(["small", "medium", "large"])

export const modalActionValidator = z.union([
  z.object({
    type: z.literal("open-modal"),
    domain: z.string().optional(),
    modalKey: z.string(),
    permanent: z.boolean().optional(),
  }),
  z.object({
    type: z.literal("replace-modal"),
    domain: z.string().optional(),
    modalKey: z.string(),
    permanent: z.boolean().optional(),
  }),
  z.object({
    type: z.literal("close-modal"),
    domain: z.string().optional(),
    modalKey: z.string(),
  }),
  z.object({
    type: z.literal("close-domain-modals"),
    domain: z.string(),
  }),
  z.object({
    type: z.literal("close-all-modals"),
  }),
])

export type ModalAction = z.infer<typeof modalActionValidator>

export const navigateActionValidator = z.object({
  type: z.literal("navigate"),
  viewKey: z.string(),
})

export type NavigateAction = z.infer<typeof navigateActionValidator>

export const customActionValidator = z.object({
  type: z.literal("custom"),
  callback: z.function(),
})

export const entityActionValidator = z.object({
  type: z.literal("entities-delete"),
  entitiesType: z.string(),
  ids: z.array(z.string()),
})

export type EntityAction = z.infer<typeof entityActionValidator>

export type CustomAction = z.infer<typeof customActionValidator>

export const formActionValidator = z.union([
  z.object({
    type: z.literal("form-set-field"),
    key: z.string(),
    value: z
      .union([
        z.string(),
        z.number(),
        z.boolean(),
        z.array(z.unknown()),
        z.record(z.union([z.string(), z.number()]), z.unknown()),
      ])
      .optional(),
  }),
  z.object({
    type: z.literal("form-toggle-field"),
    key: z.string(),
  }),
  z.object({
    type: z.literal("form-reset"),
  }),
])

export const buttonActionsValidator = z.array(
  z.union([
    modalActionValidator,
    navigateActionValidator,
    customActionValidator,
    formActionValidator,
    entityActionValidator,
  ])
)

export type ButtonActions = z.infer<typeof buttonActionsValidator>
export type ButtonAction = ButtonActions[number]
