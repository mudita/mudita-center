/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { z } from "zod"
import { VCardVersion } from "../v-card-parser.types"

const version = z.enum(VCardVersion)

export const versionValidator = z
  .string()
  .startsWith("VERSION")
  .refine((val) => {
    const ver = val.split(/^VERSION./)[1]
    return version.safeParse(ver).success
  }, "Invalid VERSION value")
  .transform((val) => {
    const version = val.split(/^VERSION./)[1]
    return {
      type: "VERSION" as const,
      value: version as VCardVersion,
    }
  })
