/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Subview, ViewGenerator } from "generic-view/utils"
import { DetailListTextConfig } from "device/models"

export const generateMcAboutListTextLayout: ViewGenerator<
  DetailListTextConfig,
  Subview
> = (config) => {
  return {
    [config.dataKey]: {
      component: "about-data-box",
      config: {
        title: config.title,
      },
    },
  }
}
