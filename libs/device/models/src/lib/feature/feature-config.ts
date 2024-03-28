/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { z } from "zod"

const KEYS = [
  "h3-component",
  "p1-component",
  "button-text",
  "button-primary",
  "button-secondary",
  "text-modal",
  "text-input",
  "radio-input",
  "progress-bar",
  "divider",
  "icon-text",
  "labeled-text",
  "image",
  "text-plain",
  "text-formatted",
  "badge",
  "block-plain",
  "block-box",
  "block-heading",
  // predefined components
  "mc-import-contacts-button",
] as const

export const FeatureConfigValidator = z.record(
  z.string(),
  z
    .object({
      component: z.enum(KEYS),
    })
    .passthrough()
)

export type FeatureConfig = z.infer<typeof FeatureConfigValidator>
