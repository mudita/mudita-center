/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { APIFC } from "generic-view/utils"
import { ConditionalRendererData } from "generic-view/models"

export const ConditionalRenderer: APIFC<ConditionalRendererData> = ({
  children,
  data,
}) => {
  if (data?.render) {
    return children
  }
  return null
}
