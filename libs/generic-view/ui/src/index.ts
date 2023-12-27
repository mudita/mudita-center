/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { blocks } from "./lib/blocks/blocks"
import { rows } from "./lib/data-rows/data-rows"
import { predefinedComponents } from "./lib/overview-predefined/overview-predefined"

const apiComponents = {
  ...predefinedComponents,
  ...blocks,
  ...rows,
}

export default apiComponents

export type APIComponents = typeof apiComponents
