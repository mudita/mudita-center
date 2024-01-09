/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ViewGenerator } from "generic-view/utils"

interface CalendarConfig {
  title: string
}

export const generateMcAboutLayout: ViewGenerator<CalendarConfig> = (
  config
) => {
  return {
    main: {
      screenTitle: "About your Kompakt",
      component: "block-box",
      config: {
        title: config.title,
      },
    },
  }
}
