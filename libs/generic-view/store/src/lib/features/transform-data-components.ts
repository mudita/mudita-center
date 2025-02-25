/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Feature } from "generic-view/models"
import { View } from "generic-view/utils"
import { generatedData } from "../../../../ui/src/lib/generated"

export const transformDataComponents = (
  feature: string,
  data: Feature["data"],
  config: View
): Feature["data"] => {
  return generatedData[feature](data, config, feature)
}
