/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { APIFC } from "generic-view/utils"
import {
  ConditionalRendererConfig,
  ConditionalRendererData,
} from "generic-view/models"

export const ConditionalRenderer: APIFC<
  ConditionalRendererData,
  ConditionalRendererConfig
> = ({ children, data, config }) => {
  const render = data?.render || false

  if (typeof render === "boolean") {
    return render ? children : null
  }
  if (config?.multipleConditionsMethod === "and") {
    return render.every(Boolean) ? children : null
  }
  if (config?.multipleConditionsMethod === "or") {
    return render.some(Boolean) ? children : null
  }
  return null
}
