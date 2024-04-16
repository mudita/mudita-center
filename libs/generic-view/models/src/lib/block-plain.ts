/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { z } from "zod"

const blockPlainDataValidator = z.undefined()

const blockPlainConfigValidator = z.undefined()

export const blockPlain = {
  key: "block-plain",
  dataValidator: blockPlainDataValidator,
  configValidator: blockPlainConfigValidator,
} as const
