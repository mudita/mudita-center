/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { View } from "generic-view/utils"
import { generated } from "../../../../ui/src/lib/generated"

export const transformGenericComponents = (view: View): View => {
  const fullView = { ...view }
  for (const [key, { component, config, layout }] of Object.entries(fullView)) {
    const transformComponent = generated[component as keyof typeof generated]
    if (transformComponent) {
      Object.assign(
        fullView,
        transformComponent(
          key,
          config as Parameters<typeof transformComponent>[1],
          layout
        )
      )
    }
  }
  return fullView
}
