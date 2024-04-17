/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { icon } from "./icon"

const dataValidator = icon.dataValidator

const configValidator = icon.configValidator

export const modalTitleIcon = {
  key: "modal.titleIcon",
  dataValidator,
  configValidator,
} as const
