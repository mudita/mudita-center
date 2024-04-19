/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { View } from "generic-view/utils"
import { uiGenerators } from "generic-view/ui-generators"

export const transformGenericComponents = (view: View): View => {
  const fullView = { ...view }
  for (const [key, { component, config, layout }] of Object.entries(fullView)) {
    const transformComponent =
      uiGenerators[component as keyof typeof uiGenerators].config
    if (transformComponent) {
      Object.assign(
        fullView,
        transformComponent({
          key,
          config,
          layout,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } as any)
      )
    }
  }
  return fullView
}
