/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { z } from "zod"
import {
  customActionValidator,
  modalActionValidator,
  modalSizeValidator,
} from "./common-validators"

const dataValidator = z.undefined()

const modalBaseConfigValidator = z.object({
  width: z.string().or(z.number()).optional(),
  maxHeight: z.string().or(z.number()).optional(),
  padding: z.string().or(z.number()).optional(),
  gap: z.string().or(z.number()).optional(),
})

const modalConfigValidator = z.object({
  closeButtonAction: z
    .union([modalActionValidator, customActionValidator])
    .optional(),
  size: modalSizeValidator.optional(),
  defaultOpened: z.boolean().optional(),
  overlayHidden: z.boolean().optional(),
  modalLayer: z.number().optional(),
})

const configValidator = modalBaseConfigValidator.and(modalConfigValidator)

export type ModalBaseConfig = z.infer<typeof modalBaseConfigValidator>

export type ModalConfig = z.infer<typeof configValidator>

export const modal = {
  key: "modal",
  dataValidator,
  configValidator,
} as const
