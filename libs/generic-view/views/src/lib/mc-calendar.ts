/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ViewGenerator } from "generic-view/utils"

interface CalendarConfig {
  title: string
}

export const mcCalendarConfig: CalendarConfig = {
  title: "Calendar",
}

export const generateMcCalendarLayout: ViewGenerator<CalendarConfig> = (
  config
) => {
  return {
    main: {
      component: "block-plain",
      parameters: {
        layout: {
          gridLayout: {
            rows: [1],
            columns: [3, 1],
          },
        },
      },
    },
  }
}
