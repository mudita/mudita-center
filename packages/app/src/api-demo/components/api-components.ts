/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { predefinedComponents } from "./overview-predefined/overview-predefined"
import { blocks } from "./blocks/blocks"
import { rows } from "./data-rows/data-rows"

export const apiComponents = {
  ...predefinedComponents,
  ...blocks,
  ...rows,
}
