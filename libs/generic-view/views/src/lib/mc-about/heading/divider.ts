/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Subview, ViewGenerator } from "generic-view/utils"

export const generateMcAboutHeadingDividerLayout: ViewGenerator<
  undefined,
  Subview
> = () => {
  return {
    "heading-divider": {
      component: "divider",
    },
  }
}
