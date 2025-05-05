/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { z } from "zod"

const dataValidator = z.undefined()

const configValidator = z.undefined()

export const mcSummaryDeviceVersion = {
  key: "mc-summary-device-version",
  dataValidator,
  configValidator,
} as const
